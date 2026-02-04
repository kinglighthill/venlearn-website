import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the VenLearn team. Interested in deploying our proctoring solution for your institution? Request a custom quote and demo today.",
};

export default function ContactPage() {
  return <ContactClient />;
}
