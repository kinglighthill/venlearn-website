import BookDemoClient from "./BookDemoClient";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Book a Demo",
  description:
    "Book a Venlearn demo for your school, choose a preferred date and time, and see how Venlearn can support admissions, fees, attendance, CBT, communication, and reporting.",
  path: "/book-demo",
  keywords: ["book Venlearn demo", "school software demo", "request Venlearn demo"],
});

export default function BookDemoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Book a Demo", path: "/book-demo" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": absoluteUrl("/book-demo#webpage"),
            name: "Book a Venlearn demo",
            url: absoluteUrl("/book-demo"),
            description:
              "Request a Venlearn demo for your school and choose a preferred date and time.",
            mainEntity: {
              "@type": "SoftwareApplication",
              "@id": absoluteUrl("/#software"),
            },
          },
        ]}
      />
      <BookDemoClient />
    </>
  );
}
