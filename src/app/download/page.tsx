import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Access VenLearn",
  description: "Learn how schools access VenLearn as a secure cloud workspace for administration, academics, finance, communication, and reporting.",
};

export default function DownloadPage() {
  return <DownloadClient />;
}
