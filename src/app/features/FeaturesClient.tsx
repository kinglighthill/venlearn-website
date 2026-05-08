"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { productFeatures } from "@/data/productFeatures";

const groups = [
  {
    title: "People records",
    color: "bg-[#2661ac]",
    features: ["Students Management", "Staff Management", "Guardians Management", "Parents & Students portal"],
  },
  {
    title: "Academic operations",
    color: "bg-[#2f74c0]",
    features: ["Results & Report Cards", "CBT (Offline & Online)", "Digital Learning & eLibrary", "Lesson Planner", "Timetable"],
  },
  {
    title: "Finance and administration",
    color: "bg-[#174a86]",
    features: ["Fee collection", "Attendance", "Library Management", "Inventory and Facility Management"],
  },
  {
    title: "Campus services",
    color: "bg-[#6f9fd3]",
    features: ["Hostel management", "Event Calendar", "Medicals and Incidents Reporting", "School bus routes management", "Messaging and Communication", "Extracurricular activities"],
  },
];

export default function FeaturesClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_16%_18%,rgba(38,97,172,0.14),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(38,97,172,0.08),transparent_28%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Feature universe</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Every school workflow, beautifully connected.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Venlearn gives administrators, teachers, finance teams, parents, and students one colorful workspace for daily school operations.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {groups.map((group) => (
            <section key={group.title} className="rounded-[1.75rem] border border-[#eaecf0] bg-white p-6 shadow-xl shadow-[#101828]/5">
              <div className={`h-2 rounded-full ${group.color}`} />
              <h2 className="mt-6 text-2xl font-black text-[#101828]">{group.title}</h2>
              <div className="mt-5 space-y-3">
                {group.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl bg-[#f9fafb] p-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-black text-[#344054]">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.slug} className="flex h-full flex-col rounded-[1.5rem] border border-[#eaecf0] bg-[#fbfcff] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#101828]/5">
                <Icon className="h-7 w-7 text-[#2661ac]" />
                <h3 className="mt-5 text-xl font-black text-[#101828]">{feature.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#667085]">{feature.description}</p>
                <Link href={`/features/${feature.slug}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-[#2661ac] transition hover:text-[#2f80ed]">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
