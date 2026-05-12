import DownloadClient from "./DownloadClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Access the Platform",
  description:
    "Learn how schools access Venlearn for secure cloud, offline, and sync-ready school administration, academics, finance, communication, CBT, and reporting.",
  path: "/download",
  keywords: ["Venlearn access", "offline school software", "cloud school management software"],
});

export default function DownloadPage() {
  return <DownloadClient />;
}
