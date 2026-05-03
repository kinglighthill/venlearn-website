import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

const sections = [
  ["School data we protect", "Student records, guardian details, attendance, academic results, invoices, communications, staff records, and operational reports."],
  ["How data is used", "VenLearn uses school data to operate the platform, provide support, improve reliability, configure workflows, and deliver authorized notifications."],
  ["Access controls", "Schools can assign roles and permissions so administrators, teachers, parents, students, and finance teams only access the records relevant to them."],
  ["Your choices", "Schools may request exports, corrections, configuration changes, or account support through the VenLearn team."],
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#f4f3ff,#ecfeff_55%,#fff1f3)] p-8 sm:p-12">
          <ShieldCheck className="h-10 w-10 text-[#7b68ee]" />
          <h1 className="mt-6 text-5xl font-black leading-tight text-[#101828] sm:text-7xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#667085]">
            VenLearn is designed for schools that need clear governance around student, guardian, staff, academic, and financial information.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {sections.map(([title, body], index) => (
            <section key={title} className="rounded-[1.5rem] border border-[#eaecf0] bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7b68ee]">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-black text-[#101828]">{title}</h2>
              <p className="mt-3 text-base font-medium leading-7 text-[#667085]">{body}</p>
            </section>
          ))}
        </div>

        <Link href="/contact" className="mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#101828] px-7 py-4 font-black text-white">
          Ask a privacy question
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
