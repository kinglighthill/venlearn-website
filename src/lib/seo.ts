import type { Metadata } from "next";

export const siteUrl = "https://venlearn.com";
export const siteName = "Venlearn";
export const companyName = "Veracone Technologies Ltd";
export const contactEmail = "info@veracone.com";

const ogImage = "/og-image.png";

const defaultKeywords = [
  "Venlearn",
  "school management software",
  "school ERP",
  "student information system",
  "school fees management",
  "attendance management",
  "report card software",
  "offline CBT software",
  "parent portal",
  "school administration software",
  "Nigeria school software",
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(ogImage);

  return {
    title,
    description,
    keywords: [...new Set([...defaultKeywords, ...keywords])],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Venlearn school management software for admissions, academics, attendance, fees, CBT, communication, and reports",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@venlearn",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: companyName,
    alternateName: "Veracone",
    url: siteUrl,
    email: contactEmail,
    brand: {
      "@type": "Brand",
      name: siteName,
      url: siteUrl,
      logo: absoluteUrl("/images/venlearn-logo.svg"),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: contactEmail,
        contactType: "sales and customer support",
        areaServed: "NG",
        availableLanguage: ["English"],
      },
    ],
    sameAs: ["https://www.myprepmate.com"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    inLanguage: "en-NG",
  };
}

export function softwareJsonLd(featureList: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": absoluteUrl("/#software"),
    name: siteName,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, Android, iOS, Windows, macOS",
    url: siteUrl,
    image: absoluteUrl(ogImage),
    description:
      "Venlearn is school management software for admissions, student records, staff records, guardians, fee collection, results, report cards, offline and online CBT, digital learning, attendance, timetable, library, hostel, transport, portals, communication, inventory, and reporting.",
    creator: {
      "@id": absoluteUrl("/#organization"),
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      description: "Custom pricing is available after a school demo and needs review.",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "NGN",
        description: "Pricing depends on school size, selected modules, deployment, and support needs.",
      },
      url: absoluteUrl("/book-demo"),
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: ["Administrator", "Teacher", "Student", "Parent"],
    },
    featureList,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
