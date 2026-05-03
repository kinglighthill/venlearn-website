import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";

const terms = [
  ["Platform access", "VenLearn provides school management software for authorized school teams, parents, students, and administrators."],
  ["Responsible use", "Users should only access records and workflows they are permitted to use and should keep account credentials secure."],
  ["School content", "Schools remain responsible for the accuracy of records, notices, invoices, academic results, and uploaded documents."],
  ["Service support", "VenLearn may update, maintain, and improve the platform to keep school operations reliable and secure."],
];

export default function TermsOfService() {
  return (
    <div className="bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#f4f3ff,#ecfeff_55%,#fff1f3)] p-8 sm:p-12">
          <Scale className="h-10 w-10 text-[#7b68ee]" />
          <h1 className="mt-6 text-5xl font-black leading-tight text-[#101828] sm:text-7xl">Terms of Service</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#667085]">
            These terms outline the expected use of VenLearn as a secure school management workspace.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {terms.map(([title, body], index) => (
            <section key={title} className="rounded-[1.5rem] border border-[#eaecf0] bg-white p-6 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7b68ee]">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-black text-[#101828]">{title}</h2>
              <p className="mt-3 text-base font-medium leading-7 text-[#667085]">{body}</p>
            </section>
          ))}
        </div>

        <Link href="/contact" className="mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#101828] px-7 py-4 font-black text-white">
          Ask about terms
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
