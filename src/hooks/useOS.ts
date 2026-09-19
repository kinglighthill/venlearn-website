"use client";

import { useEffect, useState } from "react";
import type { OS } from "../data/constants";

/**
 * Detects the visitor's operating system on the client.
 * Returns "unknown" during SSR / first paint, then resolves after mount.
 */
export function useOS(): OS {
  const [os, setOS] = useState<OS>("unknown");

  useEffect(() => {
    setOS(detectOS());
  }, []);

  return os;
}

function detectOS(): OS {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent || "";
  const platform =
    // userAgentData is the modern API; fall back to platform string
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ||
    navigator.platform ||
    "";
  const haystack = `${ua} ${platform}`.toLowerCase();

  // iOS - iPhone/iPod, plus iPadOS (which reports as "Macintosh" but is touch)
  const isIPadOS =
    /macintosh/.test(haystack) &&
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1;
  if (/iphone|ipad|ipod/.test(haystack) || isIPadOS) return "ios";

  if (/android/.test(haystack)) return "android";
  if (/win/.test(haystack)) return "windows";
  if (/mac/.test(haystack)) return "macos";
  if (/linux|x11|cros/.test(haystack)) return "linux";

  return "unknown";
}
