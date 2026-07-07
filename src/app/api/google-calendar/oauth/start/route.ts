import { NextRequest, NextResponse } from "next/server";
import { getGoogleCalendarAuthorizationUrl } from "@/services/google-calendar.service";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.redirect(
      getGoogleCalendarAuthorizationUrl(request.url),
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to start Google Calendar OAuth.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
