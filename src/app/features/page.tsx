import { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = {
  title: "School Management Features",
  description: "Explore Venlearn features for students, staff, guardians, fees, report cards, CBT, eLibrary, attendance, timetable, transport, portals, communication, inventory, and more.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
