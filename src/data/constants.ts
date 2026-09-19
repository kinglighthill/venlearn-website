export type OS = "windows" | "android" | "ios" | "macos" | "linux" | "unknown";

export const OS_DOWNLOAD: Record<OS, { label: string; available: boolean }> = {
  windows: { label: "Download for Windows", available: true },
  android: { label: "Download for Android", available: false },
  ios: { label: "Download for iOS", available: false },
  macos: { label: "Download for macOS", available: false },
  linux: { label: "Download for Linux", available: false },
  unknown: { label: "Download for Windows", available: true },
};
