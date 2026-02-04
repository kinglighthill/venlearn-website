import { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = {
  title: "Powerful Features",
  description: "Explore the capabilities of the VenLearn ecosystem. From centralized command centers to fortified testing environments, discover how we secure your examinations.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
