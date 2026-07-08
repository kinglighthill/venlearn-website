import { NextRequest, NextResponse } from "next/server";
import { getGoogleCalendarAuthorizationUrl } from "@/services/google-calendar.service";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.redirect(
      getGoogleCalendarAuthorizationUrl(request.url),
    );
  } catch (error) {
    console.log("E:", error)
    const message =
      error instanceof Error
        ? error
        : "Unable to start Google Calendar OAuth.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
