import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Flexible pricing plans for institutions of all sizes. Choose the perfect plan for your educational needs, from free trials to enterprise solutions.",
};

export default function PricingPage() {
  return <PricingClient />;
}
