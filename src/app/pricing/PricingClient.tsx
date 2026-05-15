"use client";

import Link from "next/link";
import { ArrowRight, Check, Layers3, Sparkles } from "lucide-react";
import { productFeatures } from "@/data/productFeatures";

const plans = [
  {
    name: "Essentials",
    label: "Daily school administration",
    bestFor: "Small and growing schools ready to replace paper registers and scattered spreadsheets.",
    description: "Start with the records, access, attendance, communication, and scheduling tools every school needs first.",
    accent: "bg-[#2661ac]",
    slugs: [
      "students-management",
      "staff-management",
      "guardians-management",
      "attendance",
      "timetable",
      "event-calendar",
      "messaging-communication",
      "parents-students-portal",
    ],
  },
  {
    name: "Growth",
    label: "Academics, finance, and resources",
    bestFor: "Schools that want classrooms, fees, report cards, resources, and parent updates connected.",
    description: "Bring bursary, academic, library, learning, transport, and welfare workflows into the same operating system.",
    accent: "bg-[#f47b20]",
    highlight: true,
    slugs: [
      "fee-collection",
      "results-report-cards",
      "lesson-planner",
      "digital-learning-elibrary",
      "library-management",
      "school-bus-routes-management",
      "medicals-incidents-reporting",
    ],
    includesPrevious: "Everything in Essentials",
  },
  {
    name: "Complete",
    label: "Full school operating system",
    bestFor: "Schools that need CBT, boarding, inventory, activities, offline deployment, and deeper rollout support.",
    description: "Run the full Venlearn workspace across cloud or offline/local deployment, then sync when needed.",
    accent: "bg-[#174a86]",
    slugs: [
      "cbt-offline-online",
      "hostel-management",
      "inventory-facility-management",
      "extracurricular-activities",
    ],
    includesPrevious: "Everything in Growth",
    extras: ["Offline/local deployment with optional cloud sync", "Onboarding, migration guidance, and workflow setup"],
  },
];

const featureBySlug = new Map(productFeatures.map((feature) => [feature.slug, feature]));

const allFeatureGroups = [
  {
    title: "People and access",
    slugs: ["students-management", "staff-management", "guardians-management", "parents-students-portal"],
  },
  {
    title: "Academics and assessment",
    slugs: ["results-report-cards", "cbt-offline-online", "digital-learning-elibrary", "lesson-planner"],
  },
  {
    title: "Daily operations",
    slugs: [
      "attendance",
      "timetable",
      "fee-collection",
      "library-management",
      "hostel-management",
      "event-calendar",
      "medicals-incidents-reporting",
      "school-bus-routes-management",
      "messaging-communication",
      "inventory-facility-management",
      "extracurricular-activities",
    ],
  },
];

function getFeatures(slugs: string[]) {
  return slugs.map((slug) => featureBySlug.get(slug)).filter(Boolean);
}

export default function PricingClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-152 bg-[radial-gradient(circle_at_12%_16%,rgba(38,97,172,0.14),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(38,97,172,0.08),transparent_28%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <Sparkles className="h-4 w-4" />
            Plans that scale with your school
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Start small. Converge everything.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Pick the workflow set that matches your next term, then expand into a full school operating system as your team grows. No public
            price list here: the right setup depends on your modules, deployment model, and rollout needs.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-4xl border bg-white p-6 shadow-xl shadow-[#101828]/5 ${
                plan.highlight ? "border-[#2661ac] ring-4 ring-[#2661ac]/10" : "border-[#eaecf0]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-8 rounded-full bg-[#ff7a00] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Popular path
                </span>
              )}
              <div className={`h-2 rounded-full ${plan.accent}`} />
              <h2 className="mt-7 text-3xl font-black text-[#101828]">{plan.name}</h2>
              <p className="mt-2 text-lg font-black text-[#2661ac]">{plan.label}</p>
              <p className="mt-4 text-sm font-bold leading-6 text-[#475467]">{plan.bestFor}</p>
              <p className="mt-4 min-h-24 text-base font-medium leading-7 text-[#667085]">{plan.description}</p>
              <div className="mt-6 space-y-3">
                {plan.includesPrevious && (
                  <div className="flex items-center gap-3 rounded-2xl bg-[#fff5eb] p-3 text-[#9a4a00]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#ff7a00]">
                      <Layers3 className="h-4 w-4" />
                    </span>
                    <span className="font-black">{plan.includesPrevious}</span>
                  </div>
                )}
                {getFeatures(plan.slugs).map((feature) => (
                  <div key={feature?.slug} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-bold text-[#344054]">{feature?.title}</span>
                  </div>
                ))}
                {plan.extras?.map((extra) => (
                  <div key={extra} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0e3] text-[#ff7a00]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-bold text-[#344054]">{extra}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/book-demo"
                className="mt-8 flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#174a86] px-7 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5"
              >
                Book a demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-4xl bg-[#101828] p-6 text-white sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f9fd3]">Included platform</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white! sm:text-5xl">
                Choose by modules. Keep one unified workspace.
              </h2>
              <p className="mt-5 text-base font-medium leading-7 text-white/70">
                Every tier is designed from the same Venlearn feature library, so schools can start focused and add more operations without
                moving to another system.
              </p>
            </div>
            <div className="grid gap-4">
              {allFeatureGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-white/10 bg-white/6 p-5">
                <h3 className="text-lg font-black text-white! [-webkit-text-fill-color:#fff]">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {getFeatures(group.slugs).map((feature) => (
                      <Link
                        key={feature?.slug}
                        href={`/features/${feature?.slug}`}
                        className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm font-extrabold text-white/85 transition hover:border-[#ff7a00]/50 hover:text-white"
                      >
                        {feature?.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
