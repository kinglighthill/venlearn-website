"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type VerificationResult = {
  success: boolean;
  message?: string;
  status?: number;
  [key: string]: unknown;
};

const parseEndpointResponse = async (response: Response): Promise<VerificationResult> => {
  const text = await response.text();

  if (!text) {
    return { success: response.ok, status: response.status };
  }

  try {
    const data = JSON.parse(text) as Partial<VerificationResult>;

    return {
      success: typeof data.success === "boolean" ? data.success : response.ok,
      status: response.status,
      ...data,
    };
  } catch {
    console.error("Expected JSON from form endpoint but received a different response.", {
      status: response.status,
      statusText: response.statusText,
      bodyPreview: text.slice(0, 300),
    });

    return {
      success: false,
      status: response.status,
      message: response.ok
        ? "The server returned an unreadable response. Please try again."
        : `Unable to submit the form right now (${response.status}). Please try again.`,
    };
  }
};

export default function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyUser = async (
    action: string,
    formData: object,
    urlPath: string,
    endpoint = "/api/recaptcha",
  ) => {
    try {
      let token: string | undefined;

      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha(action);
        } catch (recaptchaError) {
          console.error("ReCaptcha execution failed; submitting without token.", recaptchaError);
        }
      }

      const body = token ? { ...formData, urlPath, token } : { ...formData, urlPath };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await parseEndpointResponse(response);

      if (!response.ok) {
        return { ...data, success: false, status: response.status };
      }

      return data;
    } catch (error) {
      console.error("An error occurred in useRecaptcha.ts:", error);

      return {
        success: false,
        message:
          error instanceof TypeError
            ? "Unable to reach the booking server. Please check your connection and try again."
            : "Unable to submit the form. Please try again.",
      };
    }
  };

  return verifyUser;
}
