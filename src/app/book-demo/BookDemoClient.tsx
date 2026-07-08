"use client";

import {
  ArrowRight,
  Check,
  Mail,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useRecaptcha from "@/hooks/useRecaptcha";

const reasons = [
  "See the school workspace in action",
  "Map modules to your current processes",
  "Plan migration, training, and launch timing",
];

const meetingDurationMs = 30 * 60 * 1000;
const blockedWindowMs = 60 * 60 * 1000;
const firstStartHour = 9;
const lastStartHour = 20;
const timeSlots = Array.from(
  { length: lastStartHour - firstStartHour + 1 },
  (_, index) => `${String(firstStartHour + index).padStart(2, "0")}:00`,
);

type SubmitStatus = {
  type: "success" | "error";
  message: string;
  actionUrl?: string;
  actionLabel?: string;
};

type BookedSlot = {
  id: string;
  startAtMs: number;
  endAtMs: number;
};

type AvailabilityExclusion = {
  id: string;
  active: boolean;
  scope: "weekly" | "date";
  weekday?: number;
  date?: string;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
};

const formatDateInputValue = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

const formatTimeLabel = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const start = new Date(2000, 0, 1, hour, minute, 0, 0);
  const end = new Date(start.getTime() + meetingDurationMs);
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const startLabel = formatter.format(start);
  const endLabel = formatter.format(end);

  return `${startLabel} - ${endLabel}`;
};

const getBrowserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
};

const getSlotWindow = (date: string, time: string) => {
  const start = new Date(`${date}T${time}:00`);
  const startAtMs = start.getTime();

  if (!Number.isFinite(startAtMs)) {
    return null;
  }

  return {
    startAtMs,
    endAtMs: startAtMs + blockedWindowMs,
  };
};

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

const isBookedSlot = (slot: unknown): slot is BookedSlot => {
  if (!slot || typeof slot !== "object") {
    return false;
  }

  const maybeSlot = slot as Partial<BookedSlot>;

  return (
    typeof maybeSlot.id === "string" &&
    typeof maybeSlot.startAtMs === "number" &&
    typeof maybeSlot.endAtMs === "number"
  );
};

const isAvailabilityExclusion = (
  exclusion: unknown,
): exclusion is AvailabilityExclusion => {
  if (!exclusion || typeof exclusion !== "object") {
    return false;
  }

  const maybeExclusion = exclusion as Partial<AvailabilityExclusion>;

  return (
    typeof maybeExclusion.id === "string" &&
    maybeExclusion.active !== false &&
    (maybeExclusion.scope === "weekly" || maybeExclusion.scope === "date")
  );
};

const isExcludedByRule = (
  date: string,
  time: string,
  exclusions: AvailabilityExclusion[],
) => {
  const startMinutes = parseTimeToMinutes(time);
  const weekday = getWeekdayFromDateString(date);

  if (startMinutes === null || weekday === null) {
    return true;
  }

  const endMinutes = startMinutes + blockedWindowMs / 60000;

  return exclusions.some((exclusion) => {
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

const isTimeUnavailable = (
  date: string,
  time: string,
  bookedSlots: BookedSlot[],
  exclusions: AvailabilityExclusion[],
) => {
  const slot = getSlotWindow(date, time);

  if (!slot) {
    return true;
  }

  if (slot.startAtMs <= Date.now()) {
    return true;
  }

  if (isExcludedByRule(date, time, exclusions)) {
    return true;
  }

  return bookedSlots.some(
    (booking) =>
      slot.startAtMs < booking.endAtMs && slot.endAtMs > booking.startAtMs,
  );
};

export default function BookDemoClient() {
  const router = useRouter();
  const verifyUser = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [exclusions, setExclusions] = useState<AvailabilityExclusion[]>([]);
  const [slotsStatus, setSlotsStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [slotsMessage, setSlotsMessage] = useState("");
  const [slotRefreshIndex, setSlotRefreshIndex] = useState(0);
  const todayDate = useMemo(() => formatDateInputValue(new Date()), []);
  const selectedDemoSlot = useMemo(() => {
    if (!selectedDate || !selectedTime) {
      return null;
    }

    const slot = getSlotWindow(selectedDate, selectedTime);

    if (!slot) {
      return null;
    }

    return {
      localValue: `${selectedDate}T${selectedTime}`,
      timezoneOffsetMinutes: new Date(slot.startAtMs).getTimezoneOffset(),
      utcValue: new Date(slot.startAtMs).toISOString(),
    };
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      setExclusions([]);
      setSlotsStatus("idle");
      setSlotsMessage("");
      return;
    }

    const controller = new AbortController();
    const rangeStart = new Date(`${selectedDate}T00:00:00`);
    const rangeEnd = new Date(`${selectedDate}T23:59:59.999`);

    const loadBookedSlots = async () => {
      setSlotsStatus("loading");
      setSlotsMessage("");

      try {
        const response = await fetch(
          `/api/book-demo?start=${encodeURIComponent(
            rangeStart.toISOString(),
          )}&end=${encodeURIComponent(rangeEnd.toISOString())}`,
          { cache: "no-store", signal: controller.signal },
        );
        const data = (await response.json().catch(() => ({}))) as {
          bookings?: unknown[];
          exclusions?: unknown[];
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message || "Unable to load demo times.");
        }

        setBookedSlots(
          Array.isArray(data.bookings)
            ? data.bookings.filter(isBookedSlot)
            : [],
        );
        setExclusions(
          Array.isArray(data.exclusions)
            ? data.exclusions.filter(isAvailabilityExclusion)
            : [],
        );
        setSlotsStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setBookedSlots([]);
        setExclusions([]);
        setSlotsStatus("error");
        setSlotsMessage(
          error instanceof Error
            ? error.message
            : "Unable to load demo times.",
        );
      }
    };

    loadBookedSlots();

    return () => controller.abort();
  }, [selectedDate, slotRefreshIndex]);

  useEffect(() => {
    if (
      selectedDate &&
      selectedTime &&
      isTimeUnavailable(selectedDate, selectedTime, bookedSlots, exclusions)
    ) {
      setSelectedTime("");
    }
  }, [bookedSlots, exclusions, selectedDate, selectedTime]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitStatus(null);

    if (!selectedDemoSlot) {
      setSubmitStatus({
        type: "error",
        message: "Please select a preferred demo date and 30-minute time slot.",
      });
      return;
    }

    if (slotsStatus === "loading") {
      setSubmitStatus({
        type: "error",
        message: "Please wait for the available demo times to load.",
      });
      return;
    }

    if (isTimeUnavailable(selectedDate, selectedTime, bookedSlots, exclusions)) {
      setSubmitStatus({
        type: "error",
        message:
          "That demo time is no longer available. Please select another 30-minute slot.",
      });
      setSlotRefreshIndex((refreshIndex) => refreshIndex + 1);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(form);
    const phoneCode = String(formData.get("phoneCode") || "+234").trim();
    const phoneNumber = String(formData.get("phone") || "").trim();
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      schoolName: formData.get("schoolName"),
      email: formData.get("email"),
      phone: phoneNumber.startsWith("+")
        ? phoneNumber
        : `${phoneCode} ${phoneNumber}`,
      address: formData.get("address"),
      studentsPopulation: formData.get("studentsPopulation"),
      designation: formData.get("designation"),
      demoDateTime: selectedDemoSlot.localValue,
      demoDateTimeUtc: selectedDemoSlot.utcValue,
      demoTimeZone: getBrowserTimeZone(),
      demoTimezoneOffsetMinutes: String(
        selectedDemoSlot.timezoneOffsetMinutes,
      ),
    };

    try {
      const verification = await verifyUser(
        "book_demo_form",
        data,
        "/book-demo",
        "/api/book-demo",
      );
      console.log("Verification result:", verification);

      if (verification?.success) {
        form.reset();
        router.push("/book-demo-success");
      } else {
        const zohoConnectUrl =
          typeof verification?.zohoConnectUrl === "string"
            ? verification.zohoConnectUrl
            : undefined;
        const googleCalendarConnectUrl =
          typeof verification?.googleCalendarConnectUrl === "string"
            ? verification.googleCalendarConnectUrl
            : undefined;
        const actionUrl = googleCalendarConnectUrl || zohoConnectUrl;

        if (verification?.status === 409) {
          setSelectedTime("");
          setSlotRefreshIndex((refreshIndex) => refreshIndex + 1);
        }

        console.log("Demo booking failed. Zoho connect URL:", zohoConnectUrl);

        setSubmitStatus({
          type: "error",
          message:
            verification?.message || "Demo booking failed. Please try again.",
          actionUrl,
          actionLabel: googleCalendarConnectUrl
            ? "Connect Google Calendar"
            : zohoConnectUrl
              ? "Connect Zoho CRM"
              : undefined,
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_18%_18%,rgba(38,97,172,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(38,97,172,0.08),transparent_28%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <Sparkles className="h-4 w-4" />
            Launch your school workspace
          </div>
          <h1 className="mt-6 max-w-4xl break-words text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Let&apos;s build your Venlearn rollout.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Tell us about your school, campuses, workflows, and priorities.
            We&apos;ll help you shape the right setup for admissions, academics,
            finance, and communication.
          </p>

          <div className="mt-9 grid gap-3">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-center gap-3 rounded-2xl border border-[#eaecf0] bg-white p-4 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                  <Check className="h-5 w-5" />
                </span>
                <p className="font-black text-[#101828]">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 rounded-[1.75rem] bg-[#101828] p-6 text-white">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Mail className="h-6 w-6 text-[#6f9fd3]" />
              </span>
              <div>
                <p className="font-black">Email us directly</p>
                <a
                  href="mailto:info@veracone.com"
                  className="font-bold text-white/70 hover:text-white"
                >
                  info@veracone.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[1.5rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15 sm:rounded-[2rem]">
          <form
            className="min-w-0 rounded-[1.3rem] bg-white p-4 sm:rounded-[1.8rem] sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">
                  Book a demo
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#101828]">
                  Pick a time to see Venlearn
                </h2>
              </div>
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f7fc] text-[#2661ac] sm:flex">
                <MessageSquareText className="h-7 w-7" />
              </span>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2 [&>*]:min-w-0">
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  First name
                </span>
                <input
                  name="firstName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="John"
                />
              </label>
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  Last name
                </span>
                <input
                  name="lastName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="Doe"
                />
              </label>
            </div>

            <label className="mt-5 block min-w-0">
              <span className="text-sm font-black text-[#344054]">
                Email address
              </span>
              <input
                name="email"
                required
                type="email"
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                placeholder="john.doe@venlearn.com"
              />
            </label>

            <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 [&>*]:min-w-0">
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  Phone number
                </span>
                <div className="mt-2 flex min-w-0 rounded-2xl border border-[#d0d5dd] bg-white focus-within:border-[#2661ac] focus-within:ring-4 focus-within:ring-[#2661ac]/10">
                  <select
                    name="phoneCode"
                    defaultValue="+234"
                    aria-label="Phone country code"
                    className="w-28 shrink-0 rounded-l-2xl border-r border-[#d0d5dd] bg-[#f3f7fc] px-3 py-4 font-black text-[#101828] outline-none sm:w-32 sm:px-4"
                  >
                    <option value="+234">NG +234</option>
                    <option value="+233">GH +233</option>
                    <option value="+254">KE +254</option>
                    <option value="+27">ZA +27</option>
                    <option value="+44">UK +44</option>
                    <option value="+1">US +1</option>
                  </select>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="min-w-0 flex-1 rounded-r-2xl bg-white px-4 py-4 font-semibold text-[#101828] outline-none"
                    placeholder="801 234 5678"
                  />
                </div>
              </label>
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  School name
                </span>
                <input
                  name="schoolName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="Venlearn International School"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">
                Address
              </span>
              <textarea
                name="address"
                required
                rows={3}
                className="mt-2 w-full resize-none rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                placeholder="School address"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">
                Students population
              </span>
              <select
                name="studentsPopulation"
                required
                defaultValue=""
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
              >
                <option value="" disabled>
                  Select range
                </option>
                <option value="Below 100 students">Below 100 students</option>
                <option value="100 - 300 students">100 - 300 students</option>
                <option value="301 - 600 students">301 - 600 students</option>
                <option value="601 - 1,000 students">
                  601 - 1,000 students
                </option>
                <option value="1,001 - 2,000 students">
                  1,001 - 2,000 students
                </option>
                <option value="Above 2,000 students">
                  Above 2,000 students
                </option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">
                Designation
              </span>
              <select
                name="designation"
                required
                defaultValue=""
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Director">Director</option>
                <option value="Principal">Principal</option>
                <option value="Administrator">Administrator</option>
                <option value="IT Manager">IT Manager</option>
                <option value="Teacher">Teacher</option>
                <option value="Proprietor">Proprietor</option>
                <option value="Proprietress">Proprietress</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <div className="mt-5">
              <span className="text-sm font-black text-[#344054]">
                Preferred demo date and time
              </span>
              <div className="mt-2 grid min-w-0 gap-4 sm:grid-cols-2 [&>*]:min-w-0">
                <label className="block min-w-0">
                  <span className="sr-only">Preferred demo date</span>
                  <input
                    name="demoDate"
                    required
                    type="date"
                    min={todayDate}
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value);
                      setSelectedTime("");
                    }}
                    className="w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  />
                </label>
                <label className="block min-w-0">
                  <span className="sr-only">Preferred demo time</span>
                  <select
                    name="demoTime"
                    required
                    value={selectedTime}
                    disabled={!selectedDate || slotsStatus === "loading"}
                    onChange={(event) => setSelectedTime(event.target.value)}
                    className="w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition disabled:cursor-not-allowed disabled:bg-[#f9fafb] disabled:text-[#98a2b3] focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  >
                    <option value="" disabled>
                      {slotsStatus === "loading"
                        ? "Loading times"
                        : "Select time"}
                    </option>
                    {timeSlots.map((time) => {
                      const unavailable =
                        selectedDate &&
                        isTimeUnavailable(
                          selectedDate,
                          time,
                          bookedSlots,
                          exclusions,
                        );

                      return (
                        <option
                          key={time}
                          value={time}
                          disabled={Boolean(unavailable)}
                        >
                          {formatTimeLabel(time)}
                          {unavailable ? " unavailable" : ""}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              {slotsStatus === "error" && (
                <p className="mt-3 text-sm font-bold text-[#b42318]">
                  {slotsMessage}
                </p>
              )}
            </div>

            {submitStatus && (
              <div
                className={`mt-5 rounded-2xl border p-4 text-sm font-black ${
                  submitStatus.type === "success"
                    ? "border-[#d9e8fb] bg-[#f3f7fc] text-[#174a86]"
                    : "border-[#fecdca] bg-[#fef3f2] text-[#b42318]"
                }`}
              >
                <p>{submitStatus.message}</p>
                {submitStatus.actionUrl && (
                  <a
                    href={submitStatus.actionUrl}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#2661ac] px-4 py-2 text-white transition hover:bg-[#174a86]"
                  >
                    {submitStatus.actionLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || slotsStatus === "loading"}
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#174a86] px-7 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending
                </>
              ) : (
                <>
                  Book Demo
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
