import { Metadata } from "next";
import BookDemoClient from "./BookDemoClient";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Book a Venlearn demo for your school and choose a preferred date and time.",
};

export default function BookDemoPage() {
  return <BookDemoClient />;
}
