"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Launch",
    price: "Starter",
    description: "For schools moving admissions, attendance, and communication into one place.",
    accent: "from-[#7b68ee] to-[#2f80ed]",
    features: ["Student records", "Attendance", "Parent messaging", "Basic reports", "Setup support"],
  },
  {
    name: "Growth",
    price: "Most popular",
    description: "For schools that want academics, finance, and operations fully connected.",
    accent: "from-[#ff5f6d] to-[#ffc371]",
    highlight: true,
    features: ["Everything in Launch", "Fees and payments", "Report cards", "Timetable", "Approvals"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-campus groups with deeper security, integrations, and reporting needs.",
    accent: "from-[#00c48c] to-[#00a3ff]",
    features: ["Everything in Growth", "Multi-campus controls", "Custom workflows", "Data migration", "Priority support"],
  },
];

const comparison = [
  "Admissions pipeline",
  "Student information system",
  "Attendance alerts",
  "Academic reports",
  "Fees and invoicing",
  "Parent and student portals",
  "Transport, hostel, and library",
  "Leadership dashboards",
  "Role permissions and audit logs",
];

export default function PricingClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_12%_16%,rgba(123,104,238,0.20),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(0,196,140,0.16),transparent_28%),linear-gradient(180deg,#f8f7ff_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7fb] bg-white px-4 py-2 text-sm font-extrabold text-[#5146d8] shadow-lg shadow-[#7b68ee]/10">
            <Sparkles className="h-4 w-4" />
            Plans that scale with your school
          </div>
          <h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Start small. Converge everything.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Pick the workflow set that matches your next term, then expand into a full school operating system as your team grows.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-[2rem] border bg-white p-6 shadow-xl shadow-[#101828]/5 ${
                plan.highlight ? "border-[#7b68ee] ring-4 ring-[#7b68ee]/10" : "border-[#eaecf0]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-8 rounded-full bg-[#101828] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Recommended
                </span>
              )}
              <div className={`h-2 rounded-full bg-gradient-to-r ${plan.accent}`} />
              <h2 className="mt-7 text-3xl font-black text-[#101828]">{plan.name}</h2>
              <p className="mt-2 text-lg font-black text-[#7b68ee]">{plan.price}</p>
              <p className="mt-4 min-h-20 text-base font-medium leading-7 text-[#667085]">{plan.description}</p>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ecfdf3] text-[#039855]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-bold text-[#344054]">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="mt-8 flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#101828] px-7 py-4 font-black text-white"
              >
                Talk to sales
                <ArrowRight className="h-5 w-5" />
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-[2rem] bg-[#101828] p-6 text-white sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffc371]">Included platform</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                The core system stays unified across every plan.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {comparison.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4 font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
