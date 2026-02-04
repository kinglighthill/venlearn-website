import { Metadata } from "next";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Product Walkthroughs",
  description: "Watch deep-dive tutorials and feature overviews to understand how VenLearn can transform your educational institution. See our platform in action.",
};

export default function DemoPage() {
  return <DemoClient />;
}
