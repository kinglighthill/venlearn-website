"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyUser = async (action: string, formData: object, urlPath: string) => {
    if (!executeRecaptcha) {
      console.log("ReCaptcha not yet available");
      return;
    }

    try {
      // Retrieve Recaptcha token
      const token = await executeRecaptcha(action);
      if (token) {
        const body = { ...formData, urlPath, token };
        
        // Using native fetch since postRequest wasn't found in the codebase
        const response = await fetch('/api/recaptcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error('ReCaptcha verification failed');
        }

        const data = await response.json();
        return data;
      }
    }
    catch (error) {
      console.log("An error occurred in useRecaptcha.ts: " + error);
      return null;
    }
  }

  return verifyUser;
}
