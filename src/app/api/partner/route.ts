import { NextRequest, NextResponse } from "next/server";
import {
  addData,
  hasFirestoreAdminCredentials,
} from "@/services/firestore.service";
import { createZohoPartnerLead, PartnerLead } from "@/services/zoho.service";

const requiredFields: Array<
  keyof Pick<PartnerLead, "fullName" | "email" | "phone" | "partnerCategory">
> = ["fullName", "email", "phone", "partnerCategory"];

const optionalFields: Array<
  keyof Pick<PartnerLead, "organizationName" | "referralExperience">
> = ["organizationName", "referralExperience"];

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "RECAPTCHA_SECRET_KEY is not defined. Skipping reCAPTCHA verification for partner signup.",
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

    const requiredLeadFields = requiredFields.reduce((lead, field) => {
      lead[field] = typeof body[field] === "string" ? body[field].trim() : "";
      return lead;
    }, {} as Pick<PartnerLead, (typeof requiredFields)[number]>);

    const optionalLeadFields = optionalFields.reduce((lead, field) => {
      lead[field] = typeof body[field] === "string" ? body[field].trim() : "";
      return lead;
    }, {} as Pick<PartnerLead, (typeof optionalFields)[number]>);

    const missingField = requiredFields.find(
      (field) => !requiredLeadFields[field],
    );

    if (missingField) {
      return NextResponse.json(
        { success: false, message: `Missing ${missingField}` },
        { status: 400 },
      );
    }

    const partnerLead: PartnerLead = {
      ...requiredLeadFields,
      ...optionalLeadFields,
      type: "partner",
    };

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
      await createZohoPartnerLead(partnerLead);
    } catch (zohoError) {
      zohoSyncStatus = "failed";
      zohoSyncError =
        zohoError instanceof Error
          ? zohoError.message
          : "Unable to sync Zoho CRM lead.";
      console.warn("Zoho CRM partner sync failed:", zohoSyncError);
    }

    let firestoreDocId = "";
    let firestoreSyncStatus: "synced" | "skipped" | "failed" = "skipped";
    let firestoreSyncError = "";

    if (hasFirestoreAdminCredentials()) {
      try {
        firestoreDocId = await addData(
          {
            type: partnerLead.type,
            source: "partner_signup",
            full_name: partnerLead.fullName,
            email: partnerLead.email,
            phone: partnerLead.phone,
            organization_name: partnerLead.organizationName,
            partner_category: partnerLead.partnerCategory,
            referral_experience: partnerLead.referralExperience,
            url_path: body.urlPath,
            zoho_sync_status: zohoSyncStatus,
            zoho_sync_error: zohoSyncError,
          },
          "partners",
          { requireAdmin: true },
        );
        firestoreSyncStatus = "synced";
      } catch (firestoreError) {
        firestoreSyncStatus = "failed";
        firestoreSyncError =
          firestoreError instanceof Error
            ? firestoreError.message
            : "Unable to save partner signup backup.";
        console.warn("Firestore partner backup pending:", firestoreSyncError);
      }
    } else {
      console.warn(
        "Skipping Firestore partner backup because Firebase Admin credentials are not configured.",
      );
    }

    if (zohoSyncStatus === "failed") {
      const isZohoDisconnected = isZohoConnectionError(zohoSyncError);

      return NextResponse.json(
        {
          success: false,
          message: isZohoDisconnected
            ? "Zoho CRM needs to be connected before partner signups can be sent to Leads."
            : `Partner signup was received, but Zoho CRM sync failed: ${zohoSyncError}`,
          firestoreDocId,
          firestoreSyncError,
          firestoreSyncStatus,
          zohoSyncStatus,
          zohoConnectUrl: isZohoDisconnected
            ? "/api/zoho/oauth/start"
            : undefined,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({
      success: true,
      firestoreDocId,
      firestoreSyncError,
      firestoreSyncStatus,
      zohoSyncStatus,
    });
  } catch (error) {
    console.error("Partner signup submission error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
