import { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = {
  title: "School Management Features",
  description: "Explore VenLearn features for admissions, student records, attendance, academics, fees, communication, transport, library, reports, and security.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
