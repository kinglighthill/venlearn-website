import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  getProductFeature,
  getProductFeatureImage,
  productFeatures,
} from "@/data/productFeatures";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

type FeaturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return productFeatures.map((feature) => ({
    slug: feature.slug,
  }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
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
    keywords: [feature.title, `Venlearn ${feature.title}`, ...feature.subFeatures.slice(0, 4)],
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
  const otherFeatures = productFeatures.filter((item) => item.slug !== feature.slug);
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
      <div className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(circle_at_12%_20%,rgba(38,97,172,0.14),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(38,97,172,0.08),transparent_25%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_78%)]" />

      <section className="mx-auto max-w-7xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
          <Sparkles className="h-4 w-4" />
          Feature detail
        </div>
        <h1 className="mx-auto mt-6 max-w-6xl text-5xl font-black leading-[0.95] tracking-normal text-[#101828] sm:text-7xl lg:text-8xl">
          {feature.title}
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-2xl sm:leading-10">
          {feature.description}
        </p>
        <Link
          href="/book-demo"
          className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#111827] px-8 py-4 text-base font-black text-white shadow-2xl shadow-[#111827]/20 transition hover:-translate-y-0.5"
        >
          Book a demo
          <ArrowRight className="h-5 w-5" />
        </Link>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="rounded-[2rem] bg-[#2661ac] p-1 shadow-[0_44px_120px_rgba(47,43,128,0.20)]">
            <div className="rounded-[1.75rem] bg-white/90 p-3 shadow-inner shadow-white sm:p-4">
              <div className="overflow-hidden rounded-[1.35rem] border border-[#eef2f7] bg-[#f8fafc]">
                <Image
                  src={featureImage.src}
                  alt={`${feature.title} feature preview`}
                  width={featureImage.width}
                  height={featureImage.height}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="rounded-[1.75rem] bg-[#101828] p-6 text-white shadow-2xl shadow-[#101828]/20 sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/25">
              <Icon className="h-7 w-7" />
            </div>
            <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-[#6f9fd3]">What it includes</p>
            <h2 className="mt-4 text-4xl font-black leading-tight !text-white sm:text-5xl">
              Practical tools for daily school work.
            </h2>
            <p className="mt-5 text-base font-medium leading-7 text-white/70">
              Each function is connected to the same permissions, reporting, communication, and records layer, so teams can work without jumping across disconnected tools.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {feature.subFeatures.map((item) => (
              <div key={item} className="flex gap-4 rounded-[1.35rem] border border-[#eef2f7] bg-white p-5 shadow-xl shadow-[#101828]/5">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-sm font-bold leading-6 text-[#344054]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Explore more</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
              Other Venlearn features
            </h2>
          </div>
          <Link href="/features" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-black text-[#111827] shadow-lg shadow-[#101828]/5">
            Back to all features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {otherFeatures.map((item) => {
            const OtherIcon = item.icon;

            return (
              <Link
                key={item.slug}
                href={`/features/${item.slug}`}
                className="group rounded-[1.35rem] border border-[#eef2f7] bg-white p-5 shadow-xl shadow-[#101828]/5 transition hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
                  <OtherIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-black leading-6 text-[#101828]">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#667085]">{item.description}</p>
                <span className="mt-4 inline-flex text-sm font-black text-[#2661ac] transition group-hover:text-[#2f80ed]">
                  View feature
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
