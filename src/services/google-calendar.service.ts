import { randomUUID } from "crypto";
import { getDataDoc, setDataDoc } from "@/services/firestore.service";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
};

type StoredGoogleCalendarToken = {
  access_token?: string;
  expires_at_ms?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
};

type GoogleCalendarEventResponse = {
  conferenceData?: {
    entryPoints?: Array<{
      entryPointType?: string;
      uri?: string;
    }>;
  };
  hangoutLink?: string;
  htmlLink?: string;
  id?: string;
};

export type DemoCalendarEventInput = {
  address: string;
  bookingId: string;
  demoEndTimeUtc: string;
  demoStartTimeUtc: string;
  demoTimeZone?: string;
  designation: string;
  email: string;
  fullName: string;
  phone: string;
  schoolName: string;
  studentsPopulation: string;
};

export type DemoCalendarEvent = {
  eventId: string;
  eventLink: string;
  meetLink: string;
};

const tokenCollection = "integration_tokens";
const googleCalendarTokenDoc = "google_calendar";
const googleOAuthBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const googleCalendarApiBaseUrl = "https://www.googleapis.com/calendar/v3";
const googleCalendarScope = "https://www.googleapis.com/auth/calendar.events";
const tokenExpiryBufferMs = 2 * 60 * 1000;

const getAppBaseUrl = (requestUrl?: string) => {
  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL;
  }

  if (process.env.NEXT_PUBLIC_APP_BASE_URL) {
    return process.env.NEXT_PUBLIC_APP_BASE_URL;
  }

  if (requestUrl) {
    return new URL(requestUrl).origin;
  }

  return "http://localhost:3000";
};

export const getGoogleCalendarRedirectUri = (requestUrl?: string) =>
  process.env.GOOGLE_CALENDAR_REDIRECT_URI ||
  new URL(
    "/api/google-calendar/oauth/callback",
    getAppBaseUrl(requestUrl),
  ).toString();

const getGoogleCalendarConfig = () => {
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  if (!clientId || !clientSecret) {
    throw new Error(
      "Google Calendar is not configured. Set GOOGLE_CALENDAR_CLIENT_ID and GOOGLE_CALENDAR_CLIENT_SECRET.",
    );
  }

  return { calendarId, clientId, clientSecret };
};

const postGoogleToken = async (body: URLSearchParams) => {
  const response = await fetch(googleTokenUrl, {
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  const data = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || data.error) {
    throw new Error(
      data.error_description ||
        data.error ||
        "Unable to authorize Google Calendar.",
    );
  }

  return data;
};

const readStoredGoogleCalendarToken = async () =>
  (await getDataDoc(tokenCollection, googleCalendarTokenDoc, {
    requireAdmin: true,
  })) as StoredGoogleCalendarToken | null;

const writeStoredGoogleCalendarToken = async (
  token: StoredGoogleCalendarToken,
) => {
  await setDataDoc(
    tokenCollection,
    googleCalendarTokenDoc,
    {
      provider: "google_calendar",
      ...token,
    },
    { merge: true, requireAdmin: true },
  );
};

export const getGoogleCalendarAuthorizationUrl = (requestUrl: string) => {
  const { clientId } = getGoogleCalendarConfig();
  const url = new URL(googleOAuthBaseUrl);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", getGoogleCalendarRedirectUri(requestUrl));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", googleCalendarScope);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("include_granted_scopes", "true");

  return url.toString();
};

export const exchangeGoogleCalendarCode = async (
  code: string,
  redirectUri: string,
) => {
  const { clientId, clientSecret } = getGoogleCalendarConfig();
  const storedToken = await readStoredGoogleCalendarToken();
  const data = await postGoogleToken(
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  );
  const expiresAtMs =
    Date.now() + Math.max((data.expires_in || 3600) - 120, 60) * 1000;
  const refreshToken = data.refresh_token || storedToken?.refresh_token;

  if (!refreshToken) {
    throw new Error(
      "Google did not return a refresh token. Revoke the app access in Google, then authorize again.",
    );
  }

  await writeStoredGoogleCalendarToken({
    access_token: data.access_token,
    expires_at_ms: expiresAtMs,
    refresh_token: refreshToken,
    scope: data.scope,
    token_type: data.token_type,
  });
};

const refreshGoogleCalendarToken = async (
  token: StoredGoogleCalendarToken,
) => {
  const { clientId, clientSecret } = getGoogleCalendarConfig();

  if (!token.refresh_token) {
    throw new Error(
      "Google Calendar is not connected. Visit /api/google-calendar/oauth/start to authorize your Google account.",
    );
  }

  const data = await postGoogleToken(
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    }),
  );
  const refreshedToken = {
    access_token: data.access_token,
    expires_at_ms:
      Date.now() + Math.max((data.expires_in || 3600) - 120, 60) * 1000,
    refresh_token: token.refresh_token,
    scope: data.scope || token.scope,
    token_type: data.token_type || token.token_type,
  };

  await writeStoredGoogleCalendarToken(refreshedToken);

  return refreshedToken;
};

const getGoogleCalendarAccessToken = async () => {
  const token = await readStoredGoogleCalendarToken();

  if (!token?.refresh_token) {
    throw new Error(
      "Google Calendar is not connected. Visit /api/google-calendar/oauth/start to authorize your Google account.",
    );
  }

  if (
    token.access_token &&
    token.expires_at_ms &&
    token.expires_at_ms - tokenExpiryBufferMs > Date.now()
  ) {
    return token.access_token;
  }

  const refreshedToken = await refreshGoogleCalendarToken(token);

  if (!refreshedToken.access_token) {
    throw new Error("Unable to refresh Google Calendar access token.");
  }

  return refreshedToken.access_token;
};

const getMeetLinkFromEvent = (event: GoogleCalendarEventResponse) =>
  event.hangoutLink ||
  event.conferenceData?.entryPoints?.find(
    (entryPoint) => entryPoint.entryPointType === "video" && entryPoint.uri,
  )?.uri ||
  "";

export const createGoogleMeetDemoEvent = async (
  input: DemoCalendarEventInput,
): Promise<DemoCalendarEvent> => {
  const { calendarId } = getGoogleCalendarConfig();
  const accessToken = await getGoogleCalendarAccessToken();
  const calendarUrl = new URL(
    `${googleCalendarApiBaseUrl}/calendars/${encodeURIComponent(
      calendarId,
    )}/events`,
  );

  calendarUrl.searchParams.set("conferenceDataVersion", "1");
  calendarUrl.searchParams.set("sendUpdates", "none");

  const response = await fetch(calendarUrl, {
    body: JSON.stringify({
      attendees: [{ email: input.email, displayName: input.fullName }],
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: { type: "hangoutsMeet" },
          requestId: `venlearn-demo-${input.bookingId}-${randomUUID()}`,
        },
      },
      description: [
        "Venlearn demo booking",
        `School: ${input.schoolName}`,
        `Contact: ${input.fullName}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone}`,
        `Designation: ${input.designation}`,
        `Students population: ${input.studentsPopulation}`,
        `Address: ${input.address}`,
      ].join("\n"),
      end: {
        dateTime: input.demoEndTimeUtc,
        timeZone: input.demoTimeZone || "UTC",
      },
      start: {
        dateTime: input.demoStartTimeUtc,
        timeZone: input.demoTimeZone || "UTC",
      },
      summary: `Venlearn demo: ${input.schoolName}`,
    }),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = (await response.json()) as GoogleCalendarEventResponse & {
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Unable to create Google Calendar demo event.",
    );
  }

  const meetLink = getMeetLinkFromEvent(data);

  if (!data.id || !meetLink) {
    throw new Error("Google Calendar did not return a Google Meet link.");
  }

  return {
    eventId: data.id,
    eventLink: data.htmlLink || "",
    meetLink,
  };
};
