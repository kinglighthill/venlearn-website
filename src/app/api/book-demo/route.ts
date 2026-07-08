import { NextRequest, NextResponse } from "next/server";
import {
  addData,
  DEMO_MEETING_DURATION_MS,
  DEMO_SLOT_DURATION_MS,
  DemoAvailabilityExclusion,
  DemoSlotUnavailableError,
  listDemoAvailabilityExclusions,
  listDemoBookingsInRange,
  releaseDemoBooking,
  reserveDemoBooking,
  updateDemoBooking,
} from "@/services/firestore.service";
import { sendDemoBookingEmails } from "@/services/email.service";
import { createGoogleMeetDemoEvent } from "@/services/google-calendar.service";
import { createZohoDemoLead, DemoLead } from "@/services/zoho.service";

const requiredFields: Array<keyof Omit<DemoLead, "type">> = [
  "schoolName",
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "studentsPopulation",
  "designation",
  "demoDateTime",
];

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "RECAPTCHA_SECRET_KEY is not defined. Skipping reCAPTCHA verification for demo booking.",
    );
    return true;
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  const response = await fetch(verificationUrl, { method: "POST" });
  const data = await response.json();

  return data.success && data.score >= 0.5;
};

const getStringValue = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const allowedStartHour = 9;
const latestStartHour = 20;

const parseTimeToMinutes = (time: string) => {
  const match = time.match(/^(\d{2}):(\d{2})$/);

  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
};

const getWeekdayFromDateString = (date: string) => {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match.map(Number);

  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
};

const getMatchingExclusion = (
  date: string,
  startMinutes: number,
  endMinutes: number,
  exclusions: DemoAvailabilityExclusion[],
) => {
  const weekday = getWeekdayFromDateString(date);

  return exclusions.find((exclusion) => {
    const appliesToDate =
      exclusion.scope === "date"
        ? exclusion.date === date
        : exclusion.weekday === weekday;

    if (!appliesToDate) {
      return false;
    }

    if (exclusion.allDay) {
      return true;
    }

    const exclusionStart = exclusion.startTime
      ? parseTimeToMinutes(exclusion.startTime)
      : null;
    const exclusionEnd = exclusion.endTime
      ? parseTimeToMinutes(exclusion.endTime)
      : null;

    if (exclusionStart === null || exclusionEnd === null) {
      return false;
    }

    return startMinutes < exclusionEnd && endMinutes > exclusionStart;
  });
};

const isFirestorePermissionError = (error: unknown) => {
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";
  const message = getErrorMessage(error, "").toLowerCase();

  return (
    code.includes("permission-denied") ||
    message.includes("missing or insufficient permissions")
  );
};

class DemoSlotValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DemoSlotValidationError";
  }
}

const parseDemoSlot = (body: Record<string, unknown>) => {
  const demoDateTime = getStringValue(body.demoDateTime);
  const demoDateTimeUtc = getStringValue(body.demoDateTimeUtc);
  const demoTimeZone = getStringValue(body.demoTimeZone);
  const demoTimezoneOffsetMinutes = Number(body.demoTimezoneOffsetMinutes);
  const localDateTimeMatch = demoDateTime.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/,
  );

  if (!localDateTimeMatch) {
    throw new DemoSlotValidationError(
      "Please select a valid demo date and time.",
    );
  }

  const selectedMinute = Number(localDateTimeMatch[5]);
  const selectedHour = Number(localDateTimeMatch[4]);
  const demoDate = `${localDateTimeMatch[1]}-${localDateTimeMatch[2]}-${localDateTimeMatch[3]}`;

  if (selectedMinute !== 0) {
    throw new DemoSlotValidationError(
      "Please select one of the available hourly demo start times.",
    );
  }

  const isBeforeBusinessHours = selectedHour < allowedStartHour;
  const isAfterBusinessHours = selectedHour > latestStartHour;

  if (isBeforeBusinessHours || isAfterBusinessHours) {
    throw new DemoSlotValidationError(
      "Please select a demo start time from 9:00 AM to 8:00 PM.",
    );
  }

  const startAtMs = Date.parse(demoDateTimeUtc || demoDateTime);

  if (!Number.isFinite(startAtMs)) {
    throw new DemoSlotValidationError(
      "Please select a valid demo date and time.",
    );
  }

  if (startAtMs <= Date.now()) {
    throw new DemoSlotValidationError("Please select a future demo time.");
  }

  const endAtMs = startAtMs + DEMO_SLOT_DURATION_MS;
  const meetingEndAtMs = startAtMs + DEMO_MEETING_DURATION_MS;

  return {
    demoDateTime,
    demoDate,
    demoDateTimeUtc: new Date(startAtMs).toISOString(),
    demoEndTimeUtc: new Date(meetingEndAtMs).toISOString(),
    demoBlockedUntilUtc: new Date(endAtMs).toISOString(),
    demoTimeZone,
    demoTimezoneOffsetMinutes: Number.isFinite(demoTimezoneOffsetMinutes)
      ? demoTimezoneOffsetMinutes
      : undefined,
    startAtMs,
    meetingEndAtMs,
    endAtMs,
    startMinutes: selectedHour * 60 + selectedMinute,
    endMinutes:
      selectedHour * 60 + selectedMinute + DEMO_SLOT_DURATION_MS / 60000,
  };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startAtMs = Date.parse(searchParams.get("start") || "");
    const endAtMs = Date.parse(searchParams.get("end") || "");

    if (!Number.isFinite(startAtMs) || !Number.isFinite(endAtMs)) {
      return NextResponse.json(
        { success: false, message: "A valid start and end range is required." },
        { status: 400 },
      );
    }

    if (endAtMs <= startAtMs) {
      return NextResponse.json(
        { success: false, message: "End range must be after start range." },
        { status: 400 },
      );
    }

    const [bookings, exclusions] = await Promise.all([
      listDemoBookingsInRange(startAtMs, endAtMs),
      listDemoAvailabilityExclusions(),
    ]);

    return NextResponse.json({ success: true, bookings, exclusions });
  } catch (error) {
    console.error("Demo slot lookup error:", error);

    const message = isFirestorePermissionError(error)
      ? "Demo time availability cannot be loaded because Firestore permissions are not configured for this environment."
      : getErrorMessage(error, "Unable to load demo slots.");
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("start")
    const body = (await request.json()) as Record<string, unknown>;
    const token = body.token;

    const demoLeadFields = requiredFields.reduce((lead, field) => {
      lead[field] = getStringValue(body[field]);
      return lead;
    }, {} as Omit<DemoLead, "type">);

    const demoLead: DemoLead = {
      ...demoLeadFields,
      type: "customer",
    };

    const missingField = requiredFields.find((field) => !demoLead[field]);

    if (missingField) {
      return NextResponse.json(
        { success: false, message: `Missing ${missingField}` },
        { status: 400 },
      );
    }

    console.log("start-2")
    const demoSlot = parseDemoSlot(body);
    const exclusions = await listDemoAvailabilityExclusions();
    const matchingExclusion = getMatchingExclusion(
      demoSlot.demoDate,
      demoSlot.startMinutes,
      demoSlot.endMinutes,
      exclusions,
    );
    console.log("start-3")

    if (matchingExclusion) {
      return NextResponse.json(
        {
          success: false,
          message: matchingExclusion.reason
            ? `That demo time is unavailable: ${matchingExclusion.reason}. Please select another time.`
            : "That demo time is unavailable. Please select another time.",
        },
        { status: 409 },
      );
    }

    const isVerified = await verifyRecaptcha(
      typeof token === "string" ? token : "",
    );

    if (!isVerified) {
      return NextResponse.json(
        { success: false, message: "CAPTCHA verification failed" },
        { status: 403 },
      );
    }

    let firestoreBookingId = "";
    let googleMeetLink = "";
    let googleCalendarEventId = "";
    let googleCalendarEventLink = "";

    console.log("1")
    try {
      firestoreBookingId = await reserveDemoBooking({
        type: demoLead.type,
        source: "book_demo",
        first_name: demoLead.firstName,
        last_name: demoLead.lastName,
        school_name: demoLead.schoolName,
        email: demoLead.email,
        phone: demoLead.phone,
        address: demoLead.address,
        students_population: demoLead.studentsPopulation,
        designation: demoLead.designation,
        demo_date_time: demoLead.demoDateTime,
        demo_start_at_iso: demoSlot.demoDateTimeUtc,
        demo_end_at_iso: demoSlot.demoEndTimeUtc,
        demo_blocked_until_iso: demoSlot.demoBlockedUntilUtc,
        demo_time_zone: demoSlot.demoTimeZone,
        demo_timezone_offset_minutes: demoSlot.demoTimezoneOffsetMinutes,
        start_at_ms: demoSlot.startAtMs,
        meeting_end_at_ms: demoSlot.meetingEndAtMs,
        end_at_ms: demoSlot.endAtMs,
        url_path: body.urlPath,
        zoho_sync_status: "pending",
        zoho_sync_error: "",
      });
    } catch (firestoreError) {
      if (firestoreError instanceof DemoSlotUnavailableError) {
        return NextResponse.json(
          {
            success: false,
            message:
              "That demo time has already been booked. Please select another 30-minute slot.",
          },
          { status: 409 },
        );
      }

      throw firestoreError;
    }

    console.log("2")
    try {
      const calendarEvent = await createGoogleMeetDemoEvent({
        address: demoLead.address,
        bookingId: firestoreBookingId,
        demoEndTimeUtc: demoSlot.demoEndTimeUtc,
        demoStartTimeUtc: demoSlot.demoDateTimeUtc,
        demoTimeZone: demoSlot.demoTimeZone,
        designation: demoLead.designation,
        email: demoLead.email,
        fullName: `${demoLead.firstName} ${demoLead.lastName}`.trim(),
        phone: demoLead.phone,
        schoolName: demoLead.schoolName,
        studentsPopulation: demoLead.studentsPopulation,
      });

      googleMeetLink = calendarEvent.meetLink;
      googleCalendarEventId = calendarEvent.eventId;
      googleCalendarEventLink = calendarEvent.eventLink;

      await updateDemoBooking(firestoreBookingId, {
        google_calendar_event_id: googleCalendarEventId,
        google_calendar_event_link: googleCalendarEventLink,
        google_meet_link: googleMeetLink,
        google_calendar_sync_status: "synced",
        google_calendar_sync_error: "",
      });
    } catch (calendarError) {
      await releaseDemoBooking(demoSlot.startAtMs, demoSlot.endAtMs);

      const calendarSyncError =
        calendarError instanceof Error
          ? calendarError.message
          : "Unable to create Google Calendar event.";

      console.warn("Google Calendar demo event failed:", calendarSyncError);

      return NextResponse.json(
        {
          success: false,
          message: `Demo time could not be booked because the Google Meet link could not be created: ${calendarSyncError}`,
          googleCalendarConnectUrl: "/api/google-calendar/oauth/start",
        },
        { status: 502 },
      );
    }

    let zohoSyncStatus: "synced" | "failed" = "synced";
    let zohoSyncError = "";
    let emailSyncStatus: "sent" | "failed" | "partial" = "sent";
    let emailSyncError = "";
    let emailWorkflow:
      | Awaited<ReturnType<typeof sendDemoBookingEmails>>
      | undefined;

    console.log("3")
    try {
      await createZohoDemoLead({
        ...demoLead,
        googleCalendarEventLink,
        googleMeetLink,
      });
    } catch (zohoError) {
      zohoSyncStatus = "failed";
      zohoSyncError =
        zohoError instanceof Error
          ? zohoError.message
          : "Unable to sync Zoho CRM lead.";
      console.warn("Zoho CRM sync failed:", zohoSyncError);
    }

    console.log("4")
    try {
      emailWorkflow = await sendDemoBookingEmails({
        bookingId: firestoreBookingId,
        demoEndTimeUtc: demoSlot.demoEndTimeUtc,
        demoStartTimeUtc: demoSlot.demoDateTimeUtc,
        demoTimeZone: demoSlot.demoTimeZone,
        email: demoLead.email,
        firstName: demoLead.firstName,
        googleCalendarEventLink,
        meetLink: googleMeetLink,
        schoolName: demoLead.schoolName,
      });
      const emailResults = Object.values(emailWorkflow);
      const failedEmails = emailResults.filter(
        (result) => result.status === "failed",
      );

      emailSyncStatus =
        failedEmails.length === 0
          ? "sent"
          : failedEmails.length === emailResults.length
            ? "failed"
            : "partial";
      emailSyncError = failedEmails
        .map((result) => result.error)
        .filter(Boolean)
        .join("; ");
    } catch (emailError) {
      emailSyncStatus = "failed";
      emailSyncError =
        emailError instanceof Error
          ? emailError.message
          : "Unable to send demo booking emails.";
      console.warn("Demo booking email workflow failed:", emailSyncError);
    }

    try {
      await updateDemoBooking(firestoreBookingId, {
        email_sync_error: emailSyncError,
        email_sync_status: emailSyncStatus,
        email_workflow: emailWorkflow,
        zoho_sync_status: zohoSyncStatus,
        zoho_sync_error: zohoSyncError,
      });
    } catch (firestoreError) {
      console.warn(
        "Firestore demo booking sync-status update failed:",
        firestoreError instanceof Error
          ? firestoreError.message
          : "Unable to update demo booking sync status.",
      );
    }

    console.log("5")
    try {
      await addData({
        type: demoLead.type,
        source: "book_demo",
        first_name: demoLead.firstName,
        last_name: demoLead.lastName,
        school_name: demoLead.schoolName,
        email: demoLead.email,
        phone: demoLead.phone,
        address: demoLead.address,
        students_population: demoLead.studentsPopulation,
        designation: demoLead.designation,
        demo_date_time: demoLead.demoDateTime,
        demo_start_at_iso: demoSlot.demoDateTimeUtc,
        demo_end_at_iso: demoSlot.demoEndTimeUtc,
        demo_blocked_until_iso: demoSlot.demoBlockedUntilUtc,
        google_calendar_event_id: googleCalendarEventId,
        google_calendar_event_link: googleCalendarEventLink,
        google_meet_link: googleMeetLink,
        demo_time_zone: demoSlot.demoTimeZone,
        demo_timezone_offset_minutes: demoSlot.demoTimezoneOffsetMinutes,
        start_at_ms: demoSlot.startAtMs,
        meeting_end_at_ms: demoSlot.meetingEndAtMs,
        end_at_ms: demoSlot.endAtMs,
        firestore_booking_id: firestoreBookingId,
        url_path: body.urlPath,
        email_sync_error: emailSyncError,
        email_sync_status: emailSyncStatus,
        email_workflow: emailWorkflow,
        zoho_sync_status: zohoSyncStatus,
        zoho_sync_error: zohoSyncError,
      });
    } catch (firestoreError) {
      console.warn(
        "Firestore demo backup pending:",
        firestoreError instanceof Error
          ? firestoreError.message
          : "Unable to save demo request backup.",
      );
    }

    console.log("6")
    return NextResponse.json({
      success: true,
      bookingId: firestoreBookingId,
      emailSyncStatus,
      googleCalendarEventId,
      googleMeetLink,
      zohoSyncStatus,
    });
  } catch (error) {
    console.error("Book demo submission error:", error);

    if (error instanceof DemoSlotValidationError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }

    const message = isFirestorePermissionError(error)
      ? "Unable to reserve the selected demo time because Firestore permissions are not configured for this environment."
      : getErrorMessage(error, "Internal server error");
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
