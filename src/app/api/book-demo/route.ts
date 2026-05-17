import { NextRequest, NextResponse } from "next/server";
import { addData } from "@/services/firestore.service";
import { createZohoDemoLead, DemoLead } from "@/services/zoho.service";

const requiredFields: Array<keyof DemoLead> = [
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

const isZohoConnectionError = (error: string) => {
  const normalizedError = error.toLowerCase();

  return [
    "Zoho CRM is not connected",
    "invalid_code",
    "invalid_grant",
    "invalid_token",
    "invalid oauth token",
    "invalid token",
  ].some((message) => normalizedError.includes(message.toLowerCase()));
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = body.token;

    const demoLead = requiredFields.reduce((lead, field) => {
      lead[field] = typeof body[field] === "string" ? body[field].trim() : "";
      return lead;
    }, {} as DemoLead);

    const missingField = requiredFields.find((field) => !demoLead[field]);

    if (missingField) {
      return NextResponse.json(
        { success: false, message: `Missing ${missingField}` },
        { status: 400 },
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

    let zohoSyncStatus: "synced" | "failed" = "synced";
    let zohoSyncError = "";

    try {
      await createZohoDemoLead(demoLead);
    } catch (zohoError) {
      zohoSyncStatus = "failed";
      zohoSyncError =
        zohoError instanceof Error
          ? zohoError.message
          : "Unable to sync Zoho CRM lead.";
      console.warn("Zoho CRM sync failed:", zohoSyncError);
    }

    try {
      await addData({
        type: "book_demo",
        first_name: demoLead.firstName,
        last_name: demoLead.lastName,
        school_name: demoLead.schoolName,
        email: demoLead.email,
        phone: demoLead.phone,
        address: demoLead.address,
        students_population: demoLead.studentsPopulation,
        designation: demoLead.designation,
        demo_date_time: demoLead.demoDateTime,
        url_path: body.urlPath,
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

    console.log("ZohoSyncStatus: ", zohoSyncStatus);

    if (zohoSyncStatus === "failed") {
      const isZohoDisconnected = isZohoConnectionError(zohoSyncError);
      console.log("Is Zoho disconnected?", isZohoDisconnected);

      return NextResponse.json(
        {
          success: false,
          message: isZohoDisconnected
            ? "Zoho CRM needs to be connected before demo requests can be sent to Leads."
            : `Demo request was received, but Zoho CRM sync failed: ${zohoSyncError}`,
          zohoSyncStatus,
          zohoConnectUrl: isZohoDisconnected
            ? "/api/zoho/oauth/start"
            : undefined,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ success: true, zohoSyncStatus });
  } catch (error) {
    console.error("Book demo submission error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
