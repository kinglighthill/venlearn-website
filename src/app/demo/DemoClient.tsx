"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Check, CreditCard, Play, UsersRound } from "lucide-react";

const demoFlow = [
  ["1", "Import your school data", "Students, guardians, staff, classes, subjects, and fee balances."],
  ["2", "Configure your workspace", "Roles, approvals, grading scales, terms, notifications, and campuses."],
  ["3", "Launch with every team", "Admin, teachers, bursary, parents, students, and leadership in one place."],
];

export default function DemoClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_16%_18%,rgba(123,104,238,0.20),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,95,109,0.16),transparent_28%),linear-gradient(180deg,#f8f7ff_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7b68ee]">Product tour</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            See how VenLearn runs a school day.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Preview the workspace your administrators, teachers, finance team, parents, and leadership will use every day.
          </p>
        </div>

        <div className="mt-14 rounded-[2rem] bg-[linear-gradient(135deg,#7b68ee,#2f80ed_45%,#ff5f6d)] p-1 shadow-2xl shadow-[#7b68ee]/20">
          <div className="rounded-[1.8rem] bg-[#101828] p-4 sm:p-8">
            <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] bg-white p-6">
                <div className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#101828] text-white shadow-2xl">
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7b68ee]">Live walkthrough</p>
                <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
                  From morning attendance to end-of-day leadership reports.
                </h2>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Students", "1,842", UsersRound],
                    ["Collected", "₦42.6m", CreditCard],
                    ["Reports", "96%", BarChart3],
                  ].map(([label, value, Icon]) => (
                    <div key={label as string} className="rounded-2xl border border-[#eaecf0] bg-[#fbfcff] p-4">
                      <Icon className="h-6 w-6 text-[#7b68ee]" />
                      <p className="mt-5 text-3xl font-black text-[#101828]">{value as string}</p>
                      <p className="text-sm font-bold text-[#667085]">{label as string}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5 text-white">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ffc371]">Demo agenda</p>
                <div className="mt-5 space-y-4">
                  {demoFlow.map(([step, title, detail]) => (
                    <div key={step} className="rounded-2xl bg-white p-4 text-[#101828]">
                      <div className="flex gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] font-black text-[#5146d8]">
                          {step}
                        </span>
                        <div>
                          <p className="font-black">{title}</p>
                          <p className="mt-1 text-sm font-medium leading-6 text-[#667085]">{detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-[#101828]">
                  Book this demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {["No generic slideshow", "School-specific workflow mapping", "Migration and launch plan"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#eaecf0] bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecfdf3] text-[#039855]">
                <Check className="h-5 w-5" />
              </span>
              <p className="font-black text-[#101828]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
