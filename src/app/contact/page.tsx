import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Book a Demo",
  description: "This page redirects to the Venlearn demo booking page.",
  path: "/book-demo",
  noIndex: true,
});

export default function ContactPage() {
  redirect("/book-demo");
}
