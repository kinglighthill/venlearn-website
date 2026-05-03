"use client";

import Link from "next/link";
import { ArrowRight, Bell, Check, Cloud, LockKeyhole, Smartphone } from "lucide-react";

const accessCards = [
  ["Web workspace", "Run every school operation from the browser with no desktop installer.", Cloud],
  ["Mobile portals", "Parents, students, teachers, and leaders stay connected on the go.", Smartphone],
  ["Secure access", "Role permissions, audit trails, and protected records are built in.", LockKeyhole],
  ["Live notifications", "Announcements, attendance alerts, invoices, and approvals arrive instantly.", Bell],
];

export default function DownloadClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_14%_16%,rgba(123,104,238,0.20),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(0,196,140,0.16),transparent_28%),linear-gradient(180deg,#f8f7ff_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7b68ee]">No old downloads needed</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            VenLearn is a modern school workspace in the cloud.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Instead of separate desktop tools, your school gets one secure web platform for administrators, teachers, parents, students, and leadership.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/demo" className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#101828] px-8 py-4 font-black text-white">
              See the workspace
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="flex min-h-14 items-center justify-center rounded-full border border-[#eaecf0] bg-white px-8 py-4 font-black text-[#101828] shadow-sm">
              Ask about onboarding
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {accessCards.map(([title, description, Icon]) => (
            <article key={title as string} className="rounded-[1.75rem] border border-[#eaecf0] bg-white p-6 shadow-xl shadow-[#101828]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7b68ee] to-[#2f80ed] text-white">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-xl font-black text-[#101828]">{title as string}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#667085]">{description as string}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-[2rem] bg-[#101828] p-6 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffc371]">Implementation included</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                We help your team move from scattered tools to one workspace.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Data import", "Role setup", "Teacher training", "Parent launch", "Finance configuration", "Leadership reporting"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4">
                  <Check className="h-5 w-5 text-[#00c48c]" />
                  <p className="font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
