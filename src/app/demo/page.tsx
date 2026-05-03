import { Metadata } from "next";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "See how VenLearn school management software connects admissions, attendance, fees, academics, communication, and reporting in one workspace.",
};

export default function DemoPage() {
  return <DemoClient />;
}
