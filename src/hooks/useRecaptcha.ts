"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyUser = async (action: string, formData: object, urlPath: string, endpoint = "/api/recaptcha") => {
    try {
      let token: string | undefined;

      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha(action);
        } catch (recaptchaError) {
          console.log("ReCaptcha execution failed, submitting without token: " + recaptchaError);
        }
      }

      const body = token ? { ...formData, urlPath, token } : { ...formData, urlPath };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : { success: response.ok };

      if (!response.ok) {
        return data;
      }

      return data;
    }
    catch (error) {
      console.log("An error occurred in useRecaptcha.ts: " + error);
      return { success: false, message: "Unable to submit the form. Please try again." };
    }
  }

  return verifyUser;
}
