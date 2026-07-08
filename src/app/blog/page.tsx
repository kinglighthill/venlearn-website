import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { blogPosts } from "@/data/blogPosts";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Venlearn Blog | School Management Software Insights",
  description:
    "Read Venlearn articles about school management software, school ERP, CBT, report cards, school fees, portals, attendance, and digital operations for Nigerian schools.",
  path: "/blog",
  keywords: [
    "Venlearn blog",
    "school management software blog",
    "school ERP Nigeria",
    "school software articles",
  ],
});

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  return (
    <main className="overflow-hidden bg-[#fbfbff] px-5 pb-24 pt-32 text-[#101828] sm:px-8 lg:px-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": absoluteUrl("/blog#blog"),
            name: "Venlearn Blog",
            url: absoluteUrl("/blog"),
            description:
              "Articles about school management software, school ERP, CBT, report cards, fees, portals, attendance, and digital school operations.",
            publisher: {
              "@id": absoluteUrl("/#organization"),
            },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              description: post.excerpt,
            })),
          },
        ]}
      />

      <section className="relative mx-auto max-w-7xl">
        <div className="absolute inset-x-0 -top-32 -z-10 h-[36rem] bg-[radial-gradient(circle_at_14%_16%,rgba(38,97,172,0.12),transparent_28%),radial-gradient(circle_at_86%_10%,rgba(255,128,0,0.14),transparent_24%),linear-gradient(180deg,#f3f7fc_0%,#fbfbff_78%)]" />
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <BookOpenText className="h-4 w-4" />
            Venlearn Blog
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-normal text-[#101828] sm:text-7xl">
            School software insights for modern Nigerian schools
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl sm:leading-9">
            Guides on school management software, school ERP, CBT, digital records, fees, results, portals, and the workflows that help schools run with less paperwork.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-[1.5rem] border border-[#e8e9f4] bg-white shadow-xl shadow-[#101828]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#101828]/10"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="overflow-hidden bg-[#f3f7fc]">
                  <Image
                    src={post.heroImage.src}
                    alt={post.heroImage.alt}
                    width={post.heroImage.width}
                    height={post.heroImage.height}
                    priority
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm font-black text-[#667085]">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#2661ac]" />
                      {dateFormatter.format(new Date(post.publishedAt))}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff8000]" />
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#101828] transition group-hover:text-[#2661ac]">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base font-medium leading-7 text-[#667085]">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#2661ac]">
                    Read article
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
