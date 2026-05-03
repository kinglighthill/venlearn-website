import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with VenLearn to explore school management software for admissions, academics, fees, attendance, and communication.",
};

export default function ContactPage() {
  return <ContactClient />;
}
