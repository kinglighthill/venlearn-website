import PartnerClient from "./PartnerClient";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Partner With Venlearn",
  description:
    "Join the Venlearn partner program, refer schools that subscribe, and earn commission from qualified school referrals.",
  path: "/partner",
  keywords: [
    "Venlearn partner program",
    "school software referral",
    "education technology partner",
  ],
});

export default function PartnerPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Partner", path: "/partner" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": absoluteUrl("/partner#webpage"),
            name: "Partner with Venlearn",
            url: absoluteUrl("/partner"),
            description:
              "Sign up to refer schools to Venlearn and earn commission when qualified referrals subscribe.",
            mainEntity: {
              "@type": "Organization",
              "@id": absoluteUrl("/#organization"),
            },
          },
        ]}
      />
      <PartnerClient />
    </>
  );
}
