import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  School,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Veracone Technologies Ltd",
  description:
    "Learn about Veracone Technologies Ltd, the software company behind Venlearn and Prepmate, building practical products that solve real problems across industries.",
  path: "/company",
  keywords: ["Veracone Technologies Ltd", "Veracone", "Venlearn company", "Prepmate company"],
});

const products = [
  {
    title: "Venlearn",
    eyebrow: "School management",
    description:
      "An all-in-one school operations platform for admissions, records, fees, academics, attendance, communication, reporting, CBT, and campus workflows.",
    href: "/",
    icon: School,
  },
  {
    title: "Prepmate",
    eyebrow: "Exam preparation",
    description:
      "A popular UTME and WASSCE exam preparation app with past questions, CBT mode, study tools, notes, syllabuses, and literary texts across major platforms.",
    href: "https://www.myprepmate.com",
    icon: BookOpenCheck,
    external: true,
  },
];

const values = [
  {
    title: "Build for real work",
    description:
      "We design around the day-to-day needs of people, teams, and organizations, not abstract software checklists.",
    icon: GraduationCap,
  },
  {
    title: "Keep tools simple and useful",
    description:
      "Our products should feel clear from the first use, while still handling the serious workflows teams depend on.",
    icon: Lightbulb,
  },
  {
    title: "Protect trust and data",
    description:
      "Organizations rely on sensitive information, so permissions, security, accountability, and privacy guide our decisions.",
    icon: ShieldCheck,
  },
  {
    title: "Keep improving with users",
    description:
      "We listen closely, ship practically, and improve our products around the realities of growing users and organizations.",
    icon: UsersRound,
  },
];

const culture = [
  "We stay close to the people using our products every day.",
  "We prefer practical progress over complicated software theatre.",
  "We care about speed, clarity, reliability, and long-term trust.",
  "We build software that can grow from local needs to national scale.",
];

export default function CompanyPage() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 text-[#101828] sm:px-8 lg:px-10">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Company", path: "/company" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": absoluteUrl("/company#webpage"),
            name: "About Veracone Technologies Ltd",
            url: absoluteUrl("/company"),
            description:
              "Veracone Technologies Ltd is a software company building practical products that solve real problems across industries.",
            about: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_16%_18%,rgba(38,97,172,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(255,128,0,0.10),transparent_28%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />

      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <Sparkles className="h-4 w-4" />
            Veracone Technologies Ltd
          </div>
          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Building practical software for real problems across industries.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Veracone is a software company creating products that make everyday work simpler, faster, and more dependable. Our first two products are Venlearn and Prepmate, both built from real needs in education.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-8 py-4 font-black text-white shadow-2xl shadow-[#2661ac]/20 transition hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:info@veracone.com"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-8 py-4 font-black text-[#111827] shadow-lg shadow-[#101828]/5 transition hover:-translate-y-0.5 hover:text-[#2661ac]"
            >
              Contact us
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15">
          <div className="rounded-[1.8rem] bg-white p-6 sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff8000] text-white shadow-lg shadow-[#ff8000]/20">
              <HeartHandshake className="h-7 w-7" />
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Who we are</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828]">
              A product company focused on useful software.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-[#667085]">
              Veracone builds software for people solving practical problems at work. Education is where our first products started, but the company is built to serve useful workflows in any industry.
            </p>
            <div className="mt-6 rounded-2xl bg-[#f3f7fc] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2661ac]">Contact email</p>
              <a href="mailto:info@veracone.com" className="mt-2 inline-flex text-2xl font-black text-[#101828] hover:text-[#2661ac]">
                info@veracone.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Our products</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
            Two first products, one practical software company behind them.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon;
            const card = (
              <article className="h-full rounded-[1.75rem] border border-[#eef2f7] bg-white p-6 shadow-xl shadow-[#101828]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#2661ac]/10 sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-8 text-sm font-black uppercase tracking-[0.2em] text-[#ff8000]">{product.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-black text-[#101828]">{product.title}</h3>
                <p className="mt-4 text-base font-semibold leading-8 text-[#667085]">{product.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#2661ac]">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            );

            return product.external ? (
              <a key={product.title} href={product.href} target="_blank" rel="noreferrer">
                {card}
              </a>
            ) : (
              <Link key={product.title} href={product.href}>
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#101828] p-6 text-white shadow-2xl shadow-[#101828]/20 sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffb15c]">Mission</p>
          <h2 className="mt-4 text-4xl font-black leading-tight !text-white">
            Build dependable software that solves real operational problems.
          </h2>
          <p className="mt-5 text-base font-semibold leading-8 text-white/70">
            Our mission is to create practical products that reduce busywork, improve access to information, and help teams in any industry work with more clarity, speed, and confidence.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#d9e8fb] bg-[#f3f7fc] p-6 shadow-xl shadow-[#2661ac]/10 sm:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Vision</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828]">
            Become a trusted software company for practical, high-impact products across Africa and beyond.
          </h2>
          <p className="mt-5 text-base font-semibold leading-8 text-[#667085]">
            We see a future where organizations can choose simple, reliable software that respects their context, works where they work, and grows with their needs.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Core values</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
            The principles behind how we build.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-[1.75rem] border border-[#eef2f7] bg-white p-6 shadow-xl shadow-[#101828]/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-[#101828]">{value.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#667085]">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl rounded-[2rem] bg-[#101828] p-6 text-white shadow-2xl shadow-[#101828]/20 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffb15c]">Culture</p>
            <h2 className="mt-4 text-4xl font-black leading-tight !text-white sm:text-5xl">
              Practical, user-aware, and product-led.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-white/70">
              Our culture is shaped by the belief that good software should be dependable, understandable, and close to real user needs.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {culture.map((item) => (
              <div key={item} className="flex gap-4 rounded-[1.35rem] bg-white/10 p-5">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                  <Check className="h-4 w-4" />
                </span>
                <p className="text-sm font-bold leading-6 text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto mt-24 max-w-7xl overflow-hidden rounded-[2rem] bg-[#2661ac] p-6 text-white shadow-2xl shadow-[#2661ac]/20 sm:p-10 lg:p-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff8000]/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-[#101828]/10">
              <HeartHandshake className="h-7 w-7" />
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#ffd3a3]">
              Venlearn partner program
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight !text-white sm:text-5xl">
              Know a school that could benefit from Venlearn?
            </h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
              Individuals can join our partner program, refer schools that need better tools for managing their operations, and earn commission when a referred school subscribes.
            </p>
            <Link
              href="/partner"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-[#2661ac] shadow-xl shadow-[#101828]/15 transition hover:-translate-y-0.5 hover:bg-[#f3f7fc]"
            >
              Become a Venlearn partner
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
            {[
              ["01", "Refer a school", "Introduce a school that could benefit from Venlearn."],
              ["02", "We take it from there", "Our team handles the product conversation and next steps."],
              ["03", "Earn commission", "Get rewarded when your qualified referral subscribes."],
            ].map(([number, title, description]) => (
              <div key={number} className="flex gap-4 rounded-2xl bg-white p-4 text-[#101828] shadow-lg shadow-[#101828]/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1e3] text-sm font-black text-[#d96d00]">
                  {number}
                </span>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#667085]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-5xl rounded-[2rem] border border-[#e8e9f4] bg-white p-6 text-center shadow-2xl shadow-[#101828]/6 sm:p-10">
        <Mail className="mx-auto h-10 w-10 text-[#2661ac]" />
        <p className="mt-5 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Contact Veracone</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
          Want to talk about Venlearn, Prepmate, or partnership opportunities?
        </h2>
        <a
          href="mailto:info@veracone.com"
          className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-8 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5"
        >
          info@veracone.com
          <ArrowRight className="h-5 w-5" />
        </a>
      </section>
    </div>
  );
}
