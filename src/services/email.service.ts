type ResendEmailResponse = {
  id?: string;
  message?: string;
  name?: string;
};

type DemoEmailInput = {
  bookingId: string;
  demoEndTimeUtc: string;
  demoStartTimeUtc: string;
  demoTimeZone?: string;
  email: string;
  firstName: string;
  googleCalendarEventLink?: string;
  meetLink: string;
  schoolName: string;
};

type ResendAttachment = {
  content: string;
  filename: string;
};

type EmailDeliveryResult = {
  emailId?: string;
  error?: string;
  scheduledAt?: string;
  status: "failed" | "scheduled" | "sent" | "skipped";
};

export type DemoEmailWorkflowResult = {
  confirmation: EmailDeliveryResult;
  reminder_24h: EmailDeliveryResult;
  reminder_30m: EmailDeliveryResult;
};

const resendApiUrl = "https://api.resend.com/emails";
const twentyFourHoursMs = 24 * 60 * 60 * 1000;
const thirtyMinutesMs = 30 * 60 * 1000;
const venlearnFeatureHighlights = [
  "students, staff, and guardians management",
  "fee collection, invoices, receipts, and payment reminders",
  "results, report cards, attendance, and timetable",
  "offline and online CBT with question banks and exam controls",
  "digital learning, eLibrary, lesson planning, and assignments",
  "parents and students portal, messaging, and announcements",
  "library, hostel, event calendar, transport, inventory, medicals, incidents, and extracurricular activities",
];

const getEmailConfig = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY and EMAIL_FROM.");
  }

  return { apiKey, from };
};

const formatDemoDateTime = (input: DemoEmailInput) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: input.demoTimeZone || "UTC",
  }).format(new Date(input.demoStartTimeUtc));

const getEmailText = (
  input: DemoEmailInput,
  intro: string,
  includeVenlearnOverview = false,
) => `${intro}

School: ${input.schoolName}
Demo time: ${formatDemoDateTime(input)}
Google Meet: ${input.meetLink}

${includeVenlearnOverview ? `${getVenlearnOverviewText()}\n\n` : ""}\
You can join the demo with the Google Meet link above.`;

const getVenlearnOverviewText = () =>
  [
    "About Venlearn",
    "Venlearn is all-in-one school management software by Veracone Technologies Ltd. It helps schools manage academic, administrative, finance, learning, communication, and reporting workflows in one workspace.",
    "During the demo, we can walk through:",
    ...venlearnFeatureHighlights.map((feature) => `- ${feature}`),
    "Venlearn can run online, offline on a local area network, or in a setup that syncs online when needed.",
  ].join("\n");

const getVenlearnOverviewHtml = () => `
  <div style="margin:24px 0;padding:18px;border:1px solid #d9e8fb;border-radius:16px;background:#f3f7fc;">
    <h2 style="margin:0 0 10px;font-size:18px;line-height:1.3;color:#101828;">What Venlearn helps schools manage</h2>
    <p style="margin:0 0 12px;color:#344054;">
      Venlearn is all-in-one school management software by Veracone Technologies Ltd. It brings academic, administrative, finance, learning, communication, and reporting workflows into one school workspace.
    </p>
    <ul style="margin:0;padding-left:20px;color:#344054;">
      ${venlearnFeatureHighlights
        .map((feature) => `<li style="margin:6px 0;">${feature}</li>`)
        .join("")}
    </ul>
    <p style="margin:12px 0 0;color:#344054;">
      Venlearn can run online, offline on a local area network, or in a setup that syncs online when needed.
    </p>
  </div>
`;

const getEmailHtml = (
  input: DemoEmailInput,
  intro: string,
  includeVenlearnOverview = false,
) => {
  const demoTime = formatDemoDateTime(input);

  return `
    <div style="font-family: Arial, sans-serif; color: #101828; line-height: 1.6;">
      <p>${intro}</p>
      <p><strong>School:</strong> ${input.schoolName}</p>
      <p><strong>Demo time:</strong> ${demoTime}</p>
      <p>
        <a href="${input.meetLink}" style="background:#174a86;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:999px;display:inline-block;font-weight:700;">
          Join Google Meet
        </a>
      </p>
      <p>Google Meet link: <a href="${input.meetLink}">${input.meetLink}</a></p>
      ${
        input.googleCalendarEventLink
          ? `<p>Calendar event: <a href="${input.googleCalendarEventLink}">${input.googleCalendarEventLink}</a></p>`
          : ""
      }
      ${includeVenlearnOverview ? getVenlearnOverviewHtml() : ""}
      <p>We look forward to speaking with you.</p>
      <p style="color:#667085;">Venlearn Team</p>
    </div>
  `;
};

const escapeCalendarText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

const formatCalendarDate = (value: string) =>
  new Date(value)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

const getSenderEmail = () => {
  const from = process.env.EMAIL_FROM || "";
  const match = from.match(/<([^>]+)>/);

  return match?.[1] || from || "noreply@mail.venlearn.com";
};

const getCalendarInviteAttachment = (
  input: DemoEmailInput,
): ResendAttachment => {
  const organizerEmail = getSenderEmail();
  const summary = `Venlearn demo: ${input.schoolName}`;
  const description = [
    "Venlearn demo booking",
    `School: ${input.schoolName}`,
    `Google Meet: ${input.meetLink}`,
  ].join("\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Venlearn//Demo Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:venlearn-demo-${input.bookingId}@venlearn.com`,
    `DTSTAMP:${formatCalendarDate(new Date().toISOString())}`,
    `DTSTART:${formatCalendarDate(input.demoStartTimeUtc)}`,
    `DTEND:${formatCalendarDate(input.demoEndTimeUtc)}`,
    `SUMMARY:${escapeCalendarText(summary)}`,
    `DESCRIPTION:${escapeCalendarText(description)}`,
    `LOCATION:${escapeCalendarText(input.meetLink)}`,
    `URL:${input.meetLink}`,
    `ORGANIZER;CN=Venlearn:mailto:${organizerEmail}`,
    `ATTENDEE;CN=${escapeCalendarText(
      input.firstName,
    )};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${input.email}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return {
    content: Buffer.from(ics, "utf8").toString("base64"),
    filename: "venlearn-demo.ics",
  };
};

const sendResendEmail = async (payload: {
  attachments?: ResendAttachment[];
  html: string;
  scheduledAt?: string;
  subject: string;
  text: string;
  to: string;
}) => {
  const { apiKey, from } = getEmailConfig();
  const response = await fetch(resendApiUrl, {
    body: JSON.stringify({
      attachments: payload.attachments,
      from,
      html: payload.html,
      scheduled_at: payload.scheduledAt,
      subject: payload.subject,
      text: payload.text,
      to: [payload.to],
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = (await response.json()) as ResendEmailResponse;

  if (!response.ok || !data.id) {
    throw new Error(
      data.message || data.name || "Unable to send email with Resend.",
    );
  }

  return data.id;
};

const sendDemoEmail = async (
  input: DemoEmailInput,
  options: {
    includeCalendarInvite?: boolean;
    includeVenlearnOverview?: boolean;
    intro: string;
    scheduledAt?: Date;
    subject: string;
  },
): Promise<EmailDeliveryResult> => {
  const scheduledAtIso = options.scheduledAt?.toISOString();

  if (options.scheduledAt && options.scheduledAt.getTime() <= Date.now()) {
    return {
      scheduledAt: scheduledAtIso,
      status: "skipped",
    };
  }

  try {
    const emailId = await sendResendEmail({
      attachments: options.includeCalendarInvite
        ? [getCalendarInviteAttachment(input)]
        : undefined,
      html: getEmailHtml(
        input,
        options.intro,
        options.includeVenlearnOverview,
      ),
      scheduledAt: scheduledAtIso,
      subject: options.subject,
      text: getEmailText(
        input,
        options.intro,
        options.includeVenlearnOverview,
      ),
      to: input.email,
    });

    return {
      emailId,
      scheduledAt: scheduledAtIso,
      status: scheduledAtIso ? "scheduled" : "sent",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to send email.",
      scheduledAt: scheduledAtIso,
      status: "failed",
    };
  }
};

export const sendDemoBookingEmails = async (
  input: DemoEmailInput,
): Promise<DemoEmailWorkflowResult> => {
  const demoStartAt = new Date(input.demoStartTimeUtc).getTime();

  return {
    confirmation: await sendDemoEmail(input, {
      includeCalendarInvite: true,
      includeVenlearnOverview: true,
      intro: `Hi ${input.firstName}, your Venlearn demo has been booked.`,
      subject: "Your Venlearn demo is confirmed",
    }),
    reminder_24h: await sendDemoEmail(input, {
      intro: `Hi ${input.firstName}, this is a reminder that your Venlearn demo is tomorrow.`,
      scheduledAt: new Date(demoStartAt - twentyFourHoursMs),
      subject: "Reminder: Your Venlearn demo is tomorrow",
    }),
    reminder_30m: await sendDemoEmail(input, {
      intro: `Hi ${input.firstName}, your Venlearn demo starts in 30 minutes.`,
      scheduledAt: new Date(demoStartAt - thirtyMinutesMs),
      subject: "Reminder: Your Venlearn demo starts soon",
    }),
  };
};
