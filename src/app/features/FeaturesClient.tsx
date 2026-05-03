"use client";

import {
  BarChart3,
  BookOpenCheck,
  CalendarClock,
  Check,
  ClipboardCheck,
  CreditCard,
  FileText,
  Library,
  MessageSquareText,
  Route,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const groups = [
  {
    title: "Student lifecycle",
    color: "from-[#7b68ee] to-[#2f80ed]",
    features: ["Admissions CRM", "Student records", "Guardian profiles", "Document vault", "Transfers and alumni"],
  },
  {
    title: "Academic operations",
    color: "from-[#ff5f6d] to-[#ffc371]",
    features: ["Timetables", "Lesson plans", "Assignments", "Assessments", "Report cards"],
  },
  {
    title: "Finance and admin",
    color: "from-[#00c48c] to-[#00a3ff]",
    features: ["Invoices", "Receipts", "Discounts", "Payment plans", "Payroll-ready exports"],
  },
  {
    title: "Communication",
    color: "from-[#fd71af] to-[#9b5cff]",
    features: ["Parent portal", "SMS and email", "Announcements", "Homework notices", "Emergency alerts"],
  },
];

const featureGrid = [
  ["Attendance", "Daily, subject, hostel, event, and staff attendance with instant alerts.", ClipboardCheck],
  ["Academics", "Subjects, grading scales, continuous assessment, exams, remarks, and results.", BookOpenCheck],
  ["Fees", "Invoices, balances, receipts, scholarships, discounts, and payment reminders.", CreditCard],
  ["Reports", "Leadership dashboards for enrollment, finance, attendance, and performance.", BarChart3],
  ["Communication", "Target parents, classes, staff, houses, clubs, and entire campuses.", MessageSquareText],
  ["Transport", "Routes, stops, manifests, delays, pickup notes, and guardian updates.", Route],
  ["Library", "Inventory, borrowing, returns, fines, reservations, and reading activity.", Library],
  ["Security", "Roles, permissions, audit logs, approvals, and encrypted school records.", ShieldCheck],
  ["Timetable", "Conflict-aware schedules for teachers, rooms, classes, and substitutions.", CalendarClock],
  ["Documents", "A secure place for certificates, medical notes, letters, and forms.", FileText],
  ["People", "Students, guardians, staff, departments, houses, clubs, and groups.", UsersRound],
  ["Approvals", "Review sensitive changes before records, invoices, notices, or results go live.", Check],
];

export default function FeaturesClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_16%_18%,rgba(123,104,238,0.20),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(255,95,109,0.15),transparent_28%),linear-gradient(180deg,#f8f7ff_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#7b68ee]">Feature universe</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Every school workflow, beautifully connected.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            VenLearn gives administrators, teachers, finance teams, parents, and students one colorful workspace for daily school operations.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {groups.map((group) => (
            <section key={group.title} className="rounded-[1.75rem] border border-[#eaecf0] bg-white p-6 shadow-xl shadow-[#101828]/5">
              <div className={`h-2 rounded-full bg-gradient-to-r ${group.color}`} />
              <h2 className="mt-6 text-2xl font-black text-[#101828]">{group.title}</h2>
              <div className="mt-5 space-y-3">
                {group.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl bg-[#f9fafb] p-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ecfdf3] text-[#039855]">
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
          {featureGrid.map(([title, description, Icon]) => (
            <article key={title as string} className="rounded-[1.5rem] border border-[#eaecf0] bg-[#fbfcff] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#101828]/5">
              <Icon className="h-7 w-7 text-[#7b68ee]" />
              <h3 className="mt-5 text-xl font-black text-[#101828]">{title as string}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#667085]">{description as string}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
