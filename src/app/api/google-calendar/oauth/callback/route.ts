import { NextRequest, NextResponse } from "next/server";
import {
  exchangeGoogleCalendarCode,
  getGoogleCalendarRedirectUri,
} from "@/services/google-calendar.service";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");

  if (error) {
    return NextResponse.json(
      { success: false, message: `Google authorization failed: ${error}` },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      { success: false, message: "Google authorization code is missing." },
      { status: 400 },
    );
  }

  try {
    await exchangeGoogleCalendarCode(
      code,
      getGoogleCalendarRedirectUri(request.url),
    );

    return NextResponse.json({
      success: true,
      message:
        "Google Calendar is connected. Demo bookings can now generate Google Meet links.",
    });
  } catch (callbackError) {
    const message =
      callbackError instanceof Error
        ? callbackError.message
        : "Unable to finish Google Calendar OAuth.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
