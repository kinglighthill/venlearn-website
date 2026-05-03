import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Flexible VenLearn plans for schools that want to connect admissions, academics, attendance, finance, communication, and reporting.",
};

export default function PricingPage() {
  return <PricingClient />;
}
