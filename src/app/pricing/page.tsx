import PricingClient from "./PricingClient";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pricing Plans",
  description:
    "Flexible Venlearn pricing for schools that want to connect admissions, academics, attendance, finance, communication, CBT, offline deployment, and reporting.",
  path: "/pricing",
  keywords: ["Venlearn pricing", "school software pricing", "school ERP pricing Nigeria"],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absoluteUrl("/pricing#webpage"),
            name: "Venlearn pricing plans",
            url: absoluteUrl("/pricing"),
            description:
              "Flexible Venlearn plans for schools that want to connect admissions, academics, attendance, finance, communication, CBT, and reporting.",
            about: { "@id": absoluteUrl("/#software") },
            mainEntity: {
              "@type": "OfferCatalog",
              name: "Venlearn plans",
              itemListElement: ["Essentials", "Growth", "Complete"].map((name) => ({
                "@type": "Offer",
                name,
                url: absoluteUrl("/book-demo"),
                availability: "https://schema.org/InStock",
              })),
            },
          },
        ]}
      />
      <PricingClient />
    </>
  );
}
