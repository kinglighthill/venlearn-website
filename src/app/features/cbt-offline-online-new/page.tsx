import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import CbtOfflineOnlineClient from "./CbtOfflineOnlineClient";

const featurePath = "/features/cbt-offline-online-new";

const featureList = [
  "Offline LAN-based exams for school labs and online tests for remote candidates",
  "Question banks with objective, theory, image-based, and audio-based questions",
  "Import questions from Microsoft Word documents",
  "Locked-down student client with kiosk mode and anti-cheat controls",
  "Live proctoring view with candidate monitoring and activity logs",
  "Automatic marking, result analytics, and online result publishing",
];

export const metadata: Metadata = createPageMetadata({
  title: "CBT (Offline & Online) Software",
  description:
    "Run computer-based tests in school or remotely with question banks, timing, grading, result summaries, MS Word imports, and online result publishing.",
  path: featurePath,
  keywords: [
    "CBT software",
    "computer-based testing",
    "offline exam software",
    "online exams",
    "exam proctoring",
    "Venlearn CBT",
  ],
});

export default function CbtOfflineOnlinePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "CBT (Offline & Online)", path: featurePath },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absoluteUrl(`${featurePath}#webpage`),
            name: "CBT (Offline & Online) Software",
            url: absoluteUrl(featurePath),
            description:
              "Run computer-based tests in school or remotely with question banks, timing, grading, live monitoring, and online result publishing.",
            isPartOf: { "@id": absoluteUrl("/#website") },
            about: { "@id": absoluteUrl("/#software") },
            mainEntity: {
              "@type": "SoftwareApplication",
              "@id": absoluteUrl(`${featurePath}#feature`),
              name: "Venlearn CBT (Offline & Online)",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web, Windows, macOS, Linux, Android, iOS",
              url: absoluteUrl(featurePath),
              description:
                "Run computer-based tests in school or remotely with question banks, timing, grading, live monitoring, and online result publishing.",
              featureList,
            },
          },
        ]}
      />
      <CbtOfflineOnlineClient />
    </>
  );
}
