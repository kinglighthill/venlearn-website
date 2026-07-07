import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Sparkles,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { blogPosts, getBlogPost } from "@/data/blogPosts";
import {
  getProductFeatureImage,
  productFeatures,
  type ProductFeature,
} from "@/data/productFeatures";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  companyName,
  createPageMetadata,
} from "@/lib/seo";
import BlogImageViewer from "./BlogImageViewer";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type TocItem = {
  id: string;
  label: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const featureCopy: Record<string, string> = {
  "students-management":
    "Student records are the foundation of every good school system. Venlearn helps schools keep admission details, class placement, academic history, documents, guardian links, status changes, and custom fields in one organized record so administrators can find the right information quickly.",
  "staff-management":
    "A growing school needs clear staff records and role visibility. Venlearn gives proprietors, administrators, HR teams, and heads of department a structured way to manage teacher profiles, departments, class assignments, workload, contact details, and permission levels.",
  "guardians-management":
    "Parents and guardians are part of the daily school workflow. Venlearn connects guardians to learners with accurate contact details, pickup permissions, emergency contacts, sibling relationships, billing contacts, portal access, and communication history.",
  "fee-collection":
    "Fee collection is one of the most sensitive areas in school administration. Venlearn helps bursary teams create invoices, record payments, issue receipts, monitor balances, track arrears, apply discounts, and remind parents about outstanding fees without relying on scattered notebooks or spreadsheets.",
  "results-report-cards":
    "Report card preparation can drain weeks from a school calendar. Venlearn brings assessment scores, exam marks, grading scales, remarks, class positions, attendance summaries, approvals, result analysis, and report card publishing into one connected academic workflow.",
  "cbt-offline-online":
    "Many Nigerian schools need exams that can work in a computer lab, on a local network, or online. Venlearn CBT supports question banks, timing, randomized questions, shuffled options, secure access rules, MS Word imports, automatic marking, manual review, and online result publishing.",
  "digital-learning-elibrary":
    "Venlearn extends learning beyond the classroom by helping schools share notes, books, videos, assignments, past questions, and resources by class, subject, topic, term, or teacher. Students get structured access to learning materials for revision and guided study.",
  attendance:
    "Attendance data should be more than a register. Venlearn helps schools track student, staff, class, subject, hostel, and daily attendance, then turn that data into absence reports, lateness patterns, guardian notifications, and leadership summaries.",
  timetable:
    "A good timetable protects teaching time. Venlearn helps schools plan class schedules, teacher allocations, rooms, periods, substitutions, and term structures while reducing double-booking conflicts across teachers, rooms, subjects, and classes.",
  "library-management":
    "Venlearn keeps the school library accountable with catalog records, borrowers, renewals, reservations, due dates, overdue returns, fines, availability, missing books, damaged books, and reading activity reports.",
  "hostel-management":
    "Boarding schools need visibility into rooms, residents, welfare, movement, attendance, and emergencies. Venlearn helps schools assign hostels, rooms, beds, boarding status, capacity, leave requests, incident notes, and guardian contacts.",
  "event-calendar":
    "Schools run on dates. Venlearn gives administrators a shared calendar for terms, holidays, exams, meetings, open days, activities, clubs, departments, and reminders so staff, students, and parents can stay aligned.",
  "medicals-incidents-reporting":
    "Student wellbeing records must be accurate and properly controlled. Venlearn supports medical profiles, allergies, clinic visits, medications, incident reports, follow-up actions, guardian notifications, and confidential access controls.",
  "school-bus-routes-management":
    "Transport teams can use Venlearn to manage routes, buses, stops, drivers, attendants, student manifests, pickup details, drop-off details, route changes, delay notices, and transport-related reporting.",
  "parents-students-portal":
    "A strong portal reduces repeated office calls because parents and students can securely access results, report cards, fees, receipts, attendance, announcements, assignments, learning resources, timetables, calendars, and messages.",
  "lesson-planner":
    "Venlearn helps teachers prepare structured lesson plans with objectives, topics, activities, resources, assessments, department review, approval flows, reusable templates, and progress tracking across subjects, classes, weeks, and terms.",
  "messaging-communication":
    "Communication works best when it is targeted. Venlearn helps schools send announcements, notices, reminders, emergency alerts, fee reminders, event updates, attendance messages, and result notices to the right parents, staff, students, classes, departments, hostels, routes, or clubs.",
  "inventory-facility-management":
    "School assets and facilities need accountability. Venlearn helps administrators track supplies, equipment, classrooms, stock levels, issue logs, returns, purchases, maintenance requests, repairs, facility usage, and operational reports.",
  "extracurricular-activities":
    "Clubs, societies, sports, houses, competitions, and activities are easier to manage when participation, coordinators, schedules, achievements, awards, attendance, and communication live in one system.",
};

const leadSections: TocItem[] = [
  {
    id: "why-school-management-software-matters",
    label: "Why school management software matters",
  },
  {
    id: "why-venlearn-is-built-for-nigerian-schools",
    label: "Why Venlearn is built for Nigerian schools",
  },
  {
    id: "venlearn-features",
    label: "Venlearn features",
  },
];

const closingSections: TocItem[] = [
  {
    id: "benefits-for-schools",
    label: "Benefits for Nigerian schools",
  },
  {
    id: "frequently-asked-questions",
    label: "Frequently asked questions",
  },
];

const tableOfContents: TocItem[] = [
  ...leadSections,
  ...productFeatures.map((feature) => ({
    id: `feature-${feature.slug}`,
    label: feature.title,
  })),
  ...closingSections,
];

const summaryBenefits = [
  "One platform for administrators, teachers, bursary teams, parents, students, librarians, hostel teams, transport teams, and leadership.",
  "Cloud, offline LAN, and sync-friendly workflows for schools that need flexibility around internet access.",
  "Cleaner records across admissions, fees, attendance, results, communication, CBT, learning resources, and operations.",
  "Role-aware access so each user sees the tools and records that match their responsibility.",
  "Better parent experience through portals, reminders, receipts, report cards, announcements, and school updates.",
];

const faqs = [
  {
    question: "What is the best school management software in Nigeria?",
    answer:
      "Venlearn is a strong choice for Nigerian schools because it combines school records, fees, report cards, CBT, attendance, portals, learning resources, communication, timetable, library, hostel, transport, and operations in one platform.",
  },
  {
    question: "Can Venlearn work for schools with unstable internet?",
    answer:
      "Yes. Venlearn is designed for cloud use, offline LAN use, and sync-friendly school operations, which makes it useful for schools that need reliable workflows even when internet access is limited.",
  },
  {
    question: "Does Venlearn include CBT and report cards?",
    answer:
      "Yes. Venlearn includes offline and online CBT, question banks, exam timing, grading, result publishing, assessment records, remarks, result analysis, and report card generation.",
  },
  {
    question: "Can parents and students use Venlearn?",
    answer:
      "Yes. Venlearn includes parents and students portal access for results, fees, receipts, attendance, announcements, assignments, learning resources, calendars, timetables, and messages.",
  },
];

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createPageMetadata({
      title: "Blog Post Not Found",
      description: "The Venlearn blog post you requested could not be found.",
      path: "/blog",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

function FeatureSection({ feature, index }: { feature: ProductFeature; index: number }) {
  const Icon = feature.icon;
  const image = getProductFeatureImage(feature.slug);
  const imageFirst = index % 2 === 1;

  return (
    <section id={`feature-${feature.slug}`} className="scroll-mt-28 border-t border-[#e8e9f4] py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className={imageFirst ? "lg:order-2" : undefined}>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
            <Icon className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
            Feature {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-3xl font-black leading-tight text-[#101828] sm:text-4xl">
            {feature.title}
          </h3>
          <p className="mt-5 text-lg font-medium leading-8 text-[#475467]">
            {featureCopy[feature.slug] ?? feature.description}
          </p>
          <div className="mt-6 grid gap-3">
            {feature.subFeatures.slice(0, 4).map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <p className="text-base font-semibold leading-7 text-[#344054]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={imageFirst ? "lg:order-1" : undefined}>
          <div className="overflow-hidden rounded-[1.5rem] border border-[#d9e8fb] bg-white p-3 shadow-xl shadow-[#101828]/5">
            <BlogImageViewer
              src={image.src}
              alt={`${feature.title} screenshot in Venlearn`}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 42vw, 100vw"
              imageClassName="aspect-[16/10] w-full rounded-[1.1rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postPath = `/blog/${post.slug}`;
  const articleImage = absoluteUrl(post.heroImage.src);

  return (
    <main className="overflow-hidden bg-[#fbfbff] px-5 pb-24 pt-32 text-[#101828] sm:px-8 lg:px-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: postPath },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": absoluteUrl(`${postPath}#article`),
            headline: post.title,
            description: post.excerpt,
            image: articleImage,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: {
              "@type": "Organization",
              name: post.author,
            },
            publisher: {
              "@id": absoluteUrl("/#organization"),
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": absoluteUrl(postPath),
            },
            keywords: post.keywords.join(", "),
            articleSection: "School Management Software",
            inLanguage: "en-NG",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <article className="relative mx-auto max-w-7xl">
        <div className="absolute inset-x-0 -top-32 -z-10 h-[42rem] bg-[radial-gradient(circle_at_12%_18%,rgba(38,97,172,0.14),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(255,128,0,0.16),transparent_24%),linear-gradient(180deg,#f3f7fc_0%,#fbfbff_80%)]" />

        <header className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Blog
            </Link>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-normal text-[#101828] sm:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg font-medium leading-8 text-[#475467] sm:text-xl sm:leading-9">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-black text-[#667085]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#2661ac]" />
                {dateFormatter.format(new Date(post.publishedAt))}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#2661ac]" />
                {post.readingTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#2661ac] p-1 shadow-[0_44px_120px_rgba(38,97,172,0.18)]">
            <div className="rounded-[1.75rem] bg-white/90 p-3 shadow-inner shadow-white">
              <div className="overflow-hidden rounded-[1.35rem] border border-[#eef2f7] bg-[#f8fafc]">
                <BlogImageViewer
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  width={post.heroImage.width}
                  height={post.heroImage.height}
                  priority
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  imageClassName="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mt-14 rounded-[1.5rem] border border-[#d9e8fb] bg-white p-6 shadow-xl shadow-[#101828]/5 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf2fb] text-[#2661ac]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
                Table of contents
              </p>
              <h2 className="text-2xl font-black text-[#101828]">What this guide covers</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-2xl border border-[#eef2f7] bg-[#fbfbff] px-4 py-3 text-sm font-black leading-5 text-[#344054] transition hover:border-[#2661ac]/40 hover:bg-[#eaf2fb] hover:text-[#2661ac]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <div className="mt-14 grid gap-10 xl:grid-cols-[250px_minmax(0,1fr)] xl:items-start">
          <aside className="hidden xl:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[1.25rem] border border-[#d9e8fb] bg-white p-5 shadow-xl shadow-[#101828]/5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2661ac]">
                In this article
              </p>
              <nav className="mt-4 grid gap-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-xl px-3 py-2 text-sm font-bold leading-5 text-[#667085] transition hover:bg-[#eaf2fb] hover:text-[#2661ac]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 rounded-[1.5rem] border border-[#e8e9f4] bg-white p-6 shadow-xl shadow-[#101828]/5 sm:p-10">
            <section id="why-school-management-software-matters" className="scroll-mt-28">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
                School ERP in Nigeria
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828]">
                Why school management software matters
              </h2>
              <div className="mt-6 space-y-5 text-lg font-medium leading-8 text-[#475467]">
                <p>
                  The best school management software in Nigeria should do more than store student names. A school needs a reliable system for admissions, records, staff, guardians, fees, results, report cards, attendance, timetable, CBT, learning resources, communication, library, hostel, transport, inventory, and reporting.
                </p>
                <p>
                  Nigerian schools also need software that fits real operating conditions. Internet access may be strong in one campus and unreliable in another. Some schools need cloud access, some need offline LAN support for computer labs, and many need a platform that can support both daily administration and long-term growth.
                </p>
              </div>
            </section>

            <section id="why-venlearn-is-built-for-nigerian-schools" className="scroll-mt-28 border-t border-[#e8e9f4] py-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
                Why Venlearn
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828]">
                Why Venlearn is built for Nigerian schools
              </h2>
              <div className="mt-6 space-y-5 text-lg font-medium leading-8 text-[#475467]">
                <p>
                  Venlearn is an all-in-one school management software by {companyName}. It is built to help schools move from paper registers, disconnected spreadsheets, manual reminders, and repeated parent calls into one organized workspace for every team.
                </p>
                <p>
                  What makes Venlearn especially practical for Nigerian schools is its breadth. A school can manage core academic work, finance, parent communication, digital learning, CBT, operations, and reporting without buying separate tools for every department.
                </p>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {summaryBenefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-[1.25rem] border border-[#eef2f7] bg-[#fbfbff] p-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-base font-bold leading-7 text-[#344054]">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="venlearn-features" className="scroll-mt-28 border-t border-[#e8e9f4] py-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
                Complete feature set
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828]">
                Venlearn features that make school management easier
              </h2>
              <p className="mt-6 text-lg font-medium leading-8 text-[#475467]">
                Below are the major Venlearn modules, with the same feature areas and screenshots used across the website. Together, they show why Venlearn is a complete school management software for Nigerian schools that want one platform for academics, finance, communication, learning, and operations.
              </p>
            </section>

            {productFeatures.map((feature, index) => (
              <FeatureSection key={feature.slug} feature={feature} index={index} />
            ))}

            <section id="benefits-for-schools" className="scroll-mt-28 border-t border-[#e8e9f4] py-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
                Business benefits
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828]">
                Benefits for Nigerian schools
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  "Less paperwork across admissions, attendance, fees, results, report cards, and communication.",
                  "Faster decision-making because administrators can see cleaner school records and reports.",
                  "Better parent trust through receipts, balances, results, attendance updates, reminders, and portal access.",
                  "Stronger teacher productivity with lesson plans, attendance tools, score entry, timetable, resources, and communication.",
                  "More reliable exams with offline and online CBT, question banks, exam timing, grading, and analysis.",
                  "Operational visibility for library, hostel, transport, medicals, incidents, inventory, facilities, events, and activities.",
                ].map((benefit) => (
                  <div key={benefit} className="rounded-[1.25rem] border border-[#d9e8fb] bg-[#f8fbff] p-5">
                    <p className="text-base font-bold leading-7 text-[#344054]">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="frequently-asked-questions" className="scroll-mt-28 border-t border-[#e8e9f4] py-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2661ac]">
                FAQ
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828]">
                Frequently asked questions
              </h2>
              <div className="mt-8 space-y-4">
                {faqs.map((item) => (
                  <div key={item.question} className="rounded-[1.25rem] border border-[#eef2f7] bg-[#fbfbff] p-5">
                    <h3 className="text-xl font-black leading-7 text-[#101828]">{item.question}</h3>
                    <p className="mt-3 text-base font-medium leading-7 text-[#475467]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] bg-[#101828] p-6 text-white shadow-2xl shadow-[#101828]/15 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f9fd3]">
                See Venlearn in action
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight !text-white sm:text-4xl">
                Ready to choose the best school management software for your school?
              </h2>
              <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-white/70">
                Book a Venlearn demo to see how the platform can support your school records, fees, report cards, CBT, portals, attendance, communication, and daily operations.
              </p>
              <Link
                href="/book-demo"
                className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-7 py-4 text-base font-black text-white shadow-xl shadow-[#2661ac]/20 transition hover:-translate-y-0.5"
              >
                Book a demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
