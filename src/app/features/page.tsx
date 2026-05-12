import FeaturesClient from "./FeaturesClient";
import JsonLd from "@/components/JsonLd";
import { productFeatures } from "@/data/productFeatures";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "School Management Features",
  description:
    "Explore Venlearn school management features for students, staff, guardians, fee collection, report cards, CBT, eLibrary, attendance, timetable, transport, portals, communication, inventory, and more.",
  path: "/features",
  keywords: ["Venlearn features", "school ERP features", "school administration modules"],
});

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": absoluteUrl("/features#webpage"),
            name: "Venlearn school management features",
            url: absoluteUrl("/features"),
            description:
              "A complete list of Venlearn features for school management, including admissions, fees, attendance, report cards, CBT, portals, communication, and offline operations.",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: productFeatures.map((feature, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: feature.title,
                url: absoluteUrl(`/features/${feature.slug}`),
                description: feature.description,
              })),
            },
          },
        ]}
      />
      <FeaturesClient />
    </>
  );
}
