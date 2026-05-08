import { NextRequest, NextResponse } from "next/server";
import { getZohoAuthorizationUrl } from "@/services/zoho.service";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.redirect(getZohoAuthorizationUrl(request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start Zoho OAuth.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
