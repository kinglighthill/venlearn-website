import { NextRequest, NextResponse } from "next/server";
import { exchangeZohoGrantTokenForRefreshToken, getZohoRedirectUri } from "@/services/zoho.service";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");

  if (error) {
    return NextResponse.json({ success: false, message: `Zoho authorization failed: ${error}` }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ success: false, message: "Zoho authorization code is missing." }, { status: 400 });
  }

  try {
    await exchangeZohoGrantTokenForRefreshToken(code, getZohoRedirectUri(request.url));

    return NextResponse.json({
      success: true,
      message: "Zoho CRM is connected for this server session. Demo submissions can now create leads.",
    });
  } catch (callbackError) {
    const message = callbackError instanceof Error ? callbackError.message : "Unable to finish Zoho OAuth.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
