import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpenCheck,
  CalendarDays,
  Check,
  ClipboardCheck,
  CreditCard,
  FileText,
  LockKeyhole,
  MessageSquareText,
  Route,
  School,
  ShieldCheck,
  Sparkles,
  Stars,
  UserRoundCheck,
  UsersRound,
  WandSparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "VenLearn | School Management Software",
  description:
    "School management software for admissions, academics, attendance, fees, communication, reporting, and campus operations.",
};

const featureCards = [
  {
    eyebrow: "Admissions",
    title: "Convert every enquiry into a clean enrolment pipeline.",
    icon: UserRoundCheck,
    accent: "from-[#7b68ee] to-[#2f80ed]",
  },
  {
    eyebrow: "Academics",
    title: "Plan lessons, assessments, grading, report cards, and class progress.",
    icon: BookOpenCheck,
    accent: "from-[#ff5f6d] to-[#ffc371]",
  },
  {
    eyebrow: "Finance",
    title: "Invoices, receipts, discounts, balances, reminders, and payment plans.",
    icon: CreditCard,
    accent: "from-[#00c48c] to-[#00a3ff]",
  },
  {
    eyebrow: "Communication",
    title: "Reach parents, students, staff, and leadership from one notice center.",
    icon: MessageSquareText,
    accent: "from-[#fd71af] to-[#9b5cff]",
  },
];

const modules = [
  ["Student records", UsersRound],
  ["Attendance", ClipboardCheck],
  ["Timetable", CalendarDays],
  ["Reports", BarChart3],
  ["Transport", Route],
  ["Documents", FileText],
  ["Security", ShieldCheck],
  ["Parent portal", Bell],
];

const workflows = [
  "Admissions CRM",
  "Student information",
  "Attendance tracking",
  "Lesson planning",
  "Exam results",
  "Fee collection",
  "Parent messaging",
  "Transport routes",
  "Library inventory",
  "Staff payroll",
  "Hostel allocation",
  "Multi-campus reporting",
];

const outcomes = [
  ["40%", "fewer admin follow-ups"],
  ["3x", "faster report preparation"],
  ["24/7", "parent and staff access"],
  ["1", "shared school workspace"],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VenLearn",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "School management software for admissions, academics, attendance, billing, communication, reporting, and operations.",
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#101828]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(circle_at_12%_20%,rgba(123,104,238,0.20),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,95,109,0.18),transparent_25%),linear-gradient(180deg,#f8f7ff_0%,#ffffff_78%)]" />
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#e5e7fb] bg-white px-4 py-2 text-sm font-extrabold text-[#5146d8] shadow-lg shadow-[#7b68ee]/10">
            <Sparkles className="h-4 w-4" />
            One workspace for every school team
          </div>
          <h1 className="mx-auto mt-6 max-w-6xl text-5xl font-black leading-[0.95] tracking-normal text-[#101828] sm:text-7xl lg:text-8xl">
            School management, finally converged.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-2xl sm:leading-10">
            VenLearn brings admissions, academics, attendance, billing, communication, reports, and campus operations into one fast, colorful command center.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/demo"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#111827] px-8 py-4 text-base font-black text-white shadow-2xl shadow-[#111827]/20 transition hover:-translate-y-0.5"
            >
              Get started
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#e5e7eb] bg-white px-8 py-4 text-base font-black text-[#111827] shadow-lg shadow-[#101828]/5 transition hover:-translate-y-0.5"
            >
              Book a demo
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative rounded-[2rem] bg-[linear-gradient(135deg,#7b68ee,#2f80ed_34%,#00c48c_67%,#ff5f6d)] p-1 shadow-[0_40px_120px_rgba(47,43,128,0.22)]">
            <div className="rounded-[1.75rem] bg-[#0f172a] p-3">
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
                <div className="flex items-center justify-between border-b border-[#eef2f7] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f6d]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffc371]" />
                    <span className="h-3 w-3 rounded-full bg-[#00c48c]" />
                  </div>
                  <div className="hidden rounded-full bg-[#f4f3ff] px-4 py-2 text-xs font-black text-[#5146d8] sm:block">
                    Greenfield International School
                  </div>
                </div>
                <div className="grid min-h-[34rem] lg:grid-cols-[17rem_1fr]">
                  <aside className="hidden border-r border-[#eef2f7] bg-[#fbfcff] p-5 lg:block">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7b68ee] text-white">
                        <School className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black text-[#101828]">VenLearn</p>
                        <p className="text-xs font-bold text-[#98a2b3]">School OS</p>
                      </div>
                    </div>
                    <div className="mt-7 space-y-2">
                      {["Dashboard", "Admissions", "Attendance", "Fees", "Reports"].map((item, index) => (
                        <div
                          key={item}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black ${
                            index === 0 ? "bg-[#ede9fe] text-[#5146d8]" : "text-[#667085]"
                          }`}
                        >
                          <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-[#7b68ee]" : "bg-[#d0d5dd]"}`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </aside>

                  <div className="bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
                    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eef2f7]">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7b68ee]">Live command center</p>
                            <h2 className="mt-2 text-2xl font-black text-[#101828] sm:text-3xl">Today across campus</h2>
                          </div>
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ecfdf3] px-4 py-2 text-sm font-black text-[#039855]">
                            <span className="h-2 w-2 rounded-full bg-[#12b76a]" />
                            Synced
                          </span>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-4">
                          {outcomes.map(([value, label]) => (
                            <div key={label} className="rounded-2xl border border-[#eef2f7] bg-[#fbfcff] p-4">
                              <p className="text-3xl font-black text-[#101828]">{value}</p>
                              <p className="mt-1 text-sm font-bold leading-5 text-[#667085]">{label}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 space-y-3">
                          {[
                            ["Publish JSS 2 results", "Academics", "bg-[#ede9fe] text-[#5146d8]"],
                            ["Confirm Route B delay notice", "Transport", "bg-[#e0f2fe] text-[#026aa2]"],
                            ["Send fee reminders", "Finance", "bg-[#fff1f3] text-[#c01048]"],
                          ].map(([task, team, badge]) => (
                            <div key={task} className="grid gap-3 rounded-2xl border border-[#eef2f7] bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2f4f7]">
                                  <Check className="h-5 w-5 text-[#12b76a]" />
                                </span>
                                <p className="font-black text-[#101828]">{task}</p>
                              </div>
                              <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ${badge}`}>{team}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="rounded-3xl bg-[#111827] p-5 text-white shadow-sm">
                          <div className="flex items-center justify-between">
                            <p className="font-black">AI school assistant</p>
                            <WandSparkles className="h-5 w-5 text-[#ffc371]" />
                          </div>
                          <p className="mt-4 text-sm font-medium leading-6 text-white/70">
                            Summarize attendance risks, fee balances, parent messages, and class performance before morning assembly.
                          </p>
                          <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-bold leading-6 text-white/80">
                            14 students need follow-up, 6 invoices are overdue, and Primary 5 math improved by 18%.
                          </div>
                        </div>
                        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eef2f7]">
                          <p className="font-black text-[#101828]">Attendance trend</p>
                          <div className="mt-5 flex h-36 items-end gap-3">
                            {[44, 68, 58, 86, 74, 92, 80].map((height, index) => (
                              <div key={height + index} className="flex flex-1 flex-col items-center gap-2">
                                <div
                                  className="w-full rounded-t-xl bg-gradient-to-t from-[#7b68ee] to-[#00c48c]"
                                  style={{ height: `${height}%` }}
                                />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#d0d5dd]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7b68ee]">Everything in one place</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
              The colorful workspace for school operations.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {featureCards.map((feature) => (
              <article key={feature.eyebrow} className="group rounded-[1.75rem] border border-[#eef2f7] bg-white p-6 shadow-xl shadow-[#101828]/5 transition hover:-translate-y-1">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#98a2b3]">{feature.eyebrow}</p>
                <h3 className="mt-3 text-xl font-black leading-7 text-[#101828]">{feature.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#101828] p-6 text-white shadow-2xl shadow-[#101828]/20 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffc371]">Replace app sprawl</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                One system instead of twelve disconnected tools.
              </h2>
              <p className="mt-6 text-lg font-medium leading-8 text-white/70">
                VenLearn keeps every workflow visible, assignable, searchable, and reportable, so school teams stop chasing updates across spreadsheets and chat threads.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {workflows.map((workflow, index) => (
                <div key={workflow} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="mb-5 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7b68ee] via-[#00c48c] to-[#ff5f6d]"
                      style={{ width: `${48 + (index % 5) * 10}%` }}
                    />
                  </div>
                  <p className="font-black">{workflow}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modules.map(([module, Icon]) => (
              <div key={module as string} className="rounded-[1.5rem] border border-[#eef2f7] bg-[#fbfcff] p-6">
                <Icon className="h-7 w-7 text-[#7b68ee]" />
                <p className="mt-5 text-xl font-black text-[#101828]">{module as string}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#667085]">
                  Built into the same workspace, permissions, notifications, analytics, and reporting layer.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ede9fe] text-[#7b68ee]">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
              Simple for users. Serious about school data.
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 text-[#667085]">
              Role permissions, audit logs, approvals, encrypted records, guardian access controls, and campus-level reporting keep sensitive operations governed.
            </p>
          </div>
          <div className="rounded-[2rem] border border-[#eef2f7] bg-white p-5 shadow-xl shadow-[#101828]/5">
            {[
              ["Role-based access", "Control what bursars, teachers, parents, and students can see."],
              ["Approval workflows", "Review invoices, notices, results, and record changes before they go live."],
              ["Audit history", "Know who changed what, when it changed, and where it happened."],
              ["Leadership dashboards", "Track attendance, finance, admissions, and academics across campuses."],
            ].map(([title, description]) => (
              <div key={title} className="flex gap-4 border-b border-[#eef2f7] py-5 first:pt-0 last:border-0 last:pb-0">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ecfdf3] text-[#039855]">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-black text-[#101828]">{title}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#667085]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[linear-gradient(135deg,#7b68ee,#2f80ed_45%,#ff5f6d)] p-1 text-center shadow-2xl shadow-[#7b68ee]/20">
          <div className="rounded-[1.8rem] bg-white px-6 py-16 sm:px-10">
            <Stars className="mx-auto h-10 w-10 text-[#ffc371]" />
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
              Give your school the workspace everyone actually wants to use.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-[#667085]">
              Start with admissions, attendance, fees, or academics, then expand into a full school operating system.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#111827] px-8 py-4 font-black text-white"
              >
                See VenLearn
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#e5e7eb] px-8 py-4 font-black text-[#111827]"
              >
                View plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
