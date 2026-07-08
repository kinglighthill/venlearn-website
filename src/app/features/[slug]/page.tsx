import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LucideIcon, MonitorPlay } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  getProductFeature,
  getProductFeatureImage,
  ProductFeature,
  ProductFeatureImage,
  productFeatures,
} from "@/data/productFeatures";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { Capabilities, ExploreMore, Header, HeaderLink } from "./components";
import {
  SuiteSwitcher,
  Apps,
  Downloads,
  Walkthrough,
  Lifecycle,
} from "./components-cbt";

type FeaturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export type FeatureProp = {
  icon: LucideIcon;
  feature: ProductFeature;
  featureImage: ProductFeatureImage;
  otherFeatures: ProductFeature[];
};

export function generateStaticParams() {
  return productFeatures.map((feature) => ({
    slug: feature.slug,
  }));
}

export async function generateMetadata({
  params,
}: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getProductFeature(slug);

  if (!feature) {
    return createPageMetadata({
      title: "Feature Not Found",
      description: "The Venlearn feature you requested could not be found.",
      path: "/features",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${feature.title} Software`,
    description: `Venlearn ${feature.title} helps schools ${feature.description.toLowerCase()}`,
    path: `/features/${feature.slug}`,
    keywords: [
      feature.title,
      `Venlearn ${feature.title}`,
      ...feature.subFeatures.slice(0, 4),
    ],
  });
}

export default async function FeatureDetailPage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = getProductFeature(slug);

  if (!feature) {
    notFound();
  }

  const Icon = feature.icon;
  const featureImage = getProductFeatureImage(feature.slug);
  const otherFeatures = productFeatures.filter(
    (item) => item.slug !== feature.slug,
  );
  const featurePath = `/features/${feature.slug}`;

  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 text-[#101828] sm:px-8 lg:px-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: feature.title, path: featurePath },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absoluteUrl(`${featurePath}#webpage`),
            name: `${feature.title} Software`,
            url: absoluteUrl(featurePath),
            description: feature.description,
            isPartOf: { "@id": absoluteUrl("/#website") },
            about: { "@id": absoluteUrl("/#software") },
            mainEntity: {
              "@type": "SoftwareApplication",
              "@id": absoluteUrl(`${featurePath}#feature`),
              name: `Venlearn ${feature.title}`,
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web, Android, iOS, Windows, macOS",
              url: absoluteUrl(featurePath),
              description: feature.description,
              featureList: feature.subFeatures,
            },
          },
        ]}
      />

      {feature.slug === "cbt-offline-online" ? (
        <Cbt
          icon={Icon}
          feature={feature}
          featureImage={featureImage}
          otherFeatures={otherFeatures}
        />
      ) : (
        <DefaultPage
          icon={Icon}
          feature={feature}
          featureImage={featureImage}
          otherFeatures={otherFeatures}
        />
      )}
    </div>
  );
}

function Cbt(featureProp: FeatureProp) {
  const { icon: Icon, feature, featureImage, otherFeatures } = featureProp;

  return (
    <>
      <div className="absolute inset-x-0 top-0 -z-10 h-184 bg-[radial-gradient(circle_at_12%_20%,rgba(38,97,172,0.14),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(38,97,172,0.08),transparent_25%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_78%)]" />

      <Header feature={feature} featureImage={featureImage} hideImage={true}>
        <>
          <HeaderLink />
          {/* <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HeaderLink />
            <a
              href="#walkthrough"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-8 py-4 text-base font-black text-[#111827] shadow-lg shadow-[#101828]/5 transition hover:-translate-y-0.5"
            >
              <MonitorPlay className="h-5 w-5 text-[#2661ac]" />
              Watch the walkthrough
            </a>
          </div> */}

          <SuiteSwitcher />
        </>
      </Header>

      <Apps />

      <Capabilities icon={Icon} feature={feature} />

      <Lifecycle />

      {/* <Walkthrough /> */}

      {/* <Downloads /> */}

      <ExploreMore otherFeatures={otherFeatures} />
    </>
  );
}

function DefaultPage(featureProp: FeatureProp) {
  const { icon: Icon, feature, featureImage, otherFeatures } = featureProp;

  return (
    <>
      <div className="absolute inset-x-0 top-0 -z-10 h-184 bg-[radial-gradient(circle_at_12%_20%,rgba(38,97,172,0.14),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(38,97,172,0.08),transparent_25%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_78%)]" />

      <Header feature={feature} featureImage={featureImage}>
        <>
          <HeaderLink />
        </>
      </Header>

      <Capabilities icon={Icon} feature={feature} />

      <ExploreMore otherFeatures={otherFeatures} />
    </>
  );
}
