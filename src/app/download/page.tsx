import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Access Venlearn",
  description: "Learn how schools access Venlearn as a secure cloud workspace for administration, academics, finance, communication, and reporting.",
};

export default function DownloadPage() {
  return <DownloadClient />;
}
