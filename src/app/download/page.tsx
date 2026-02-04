import { Metadata } from "next";
import DownloadClient from "./DownloadClient";

export const metadata: Metadata = {
  title: "Download VenLearn",
  description: "Get the latest version of the VenLearn proctoring suite. Secure exam browser for students, proctoring tools for admins, and server management for institutions.",
};

export default function DownloadPage() {
  return <DownloadClient />;
}
