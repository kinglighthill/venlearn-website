import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircleQuestion, Minus, Plus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Venlearn school management software, features, setup, offline use, CBT, pricing, support, and data privacy.",
  path: "/faq",
  keywords: ["Venlearn FAQ", "Venlearn support", "Venlearn pricing questions", "Venlearn offline questions"],
});

const faqs = [
  {
    question: "What is Venlearn?",
    answer:
      "Venlearn is school management software that brings admissions, student records, staff records, guardians, attendance, fees, results, report cards, communication, CBT, learning resources, and campus operations into one connected workspace.",
  },
  {
    question: "Who is Venlearn built for?",
    answer:
      "Venlearn is built for school owners, directors, principals, administrators, bursars, teachers, non-academic staff, parents, students, and multi-campus leadership teams.",
  },
  {
    question: "Can schools choose which users can access the software?",
    answer:
      "Yes. Admins can add users such as staff, parents, and students, then decide what each person can see or do using role-based access controls.",
  },
  {
    question: "Does Venlearn work offline?",
    answer:
      "Yes. Venlearn can be deployed for offline use on a local area network, so schools can keep working even without internet. Data can be synced online later when needed.",
  },
  {
    question: "Can Venlearn also run in the cloud?",
    answer:
      "Yes. Schools can use Venlearn online, offline, or in a setup that combines local control with online sync depending on their data, internet, and operational needs.",
  },
  {
    question: "Does Venlearn support computer based testing?",
    answer:
      "Yes. Venlearn includes CBT for offline and online exams. Schools can run CBT over a local area network without relying on Google Forms or constant internet access.",
  },
  {
    question: "Can Venlearn generate report cards?",
    answer:
      "Yes. Once scores are entered and approved, Venlearn can generate polished report cards quickly, helping schools reduce manual formatting and spreadsheet work.",
  },
  {
    question: "Does Venlearn manage school fees?",
    answer:
      "Yes. Venlearn supports invoices, balances, receipts, fee reminders, debtor lists, and finance reporting so schools can track fee collection clearly.",
  },
  {
    question: "Can parents and students use Venlearn?",
    answer:
      "Yes. Parents can view information for their wards, receive messages, check fees, attendance, results, events, and communicate with the school. Students can access timetables, assignments, results, eLibrary materials, CBT activities, and notices.",
  },
  {
    question: "Is there a Venlearn mobile app?",
    answer:
      "The Venlearn mobile app is coming soon. Several features will be available on mobile so parents, staff, and students can stay connected without always logging in through the web.",
  },
  {
    question: "How does setup or migration work?",
    answer:
      "The Venlearn team helps schools understand their current workflows, configure the right modules, import records where needed, set user roles, and prepare staff for launch.",
  },
  {
    question: "How much does Venlearn cost?",
    answer:
      "Pricing depends on the school size, selected modules, deployment needs, and support requirements. The best next step is to book a demo so the team can recommend the right plan.",
  },
  {
    question: "Is Venlearn customer support reliable?",
    answer:
      "Yes. Venlearn support is designed to help schools during setup, launch, training, and day-to-day use. Schools can reach the team for guidance, troubleshooting, workflow questions, and account support.",
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer:
      "Yes. Schools can request plan changes as their needs change. The Venlearn team will help review the modules, users, deployment requirements, and billing impact before updating the plan.",
  },
  {
    question: "Is Venlearn secure?",
    answer:
      "Yes. Venlearn is built with role-based permissions, controlled access, data privacy, accountability, and secure workflows in mind so schools can protect sensitive student, staff, guardian, academic, and financial records.",
  },
  {
    question: "What makes Venlearn stand out from other similar products?",
    answer:
      "Venlearn combines broad school management features, offline and online deployment options, CBT support, role-aware access, fee management, report cards, communication, and practical workflows in one connected system.",
  },
  {
    question: "Does Venlearn offer software training?",
    answer:
      "Yes. Venlearn can provide training for administrators, staff, and other users so each team understands the workflows, permissions, reports, and day-to-day actions they need.",
  },
  {
    question: "Can I request custom features?",
    answer:
      "Yes. Schools can request custom features or workflow adjustments. The team reviews each request based on feasibility, product fit, timeline, and whether it should be configured, customized, or added to the roadmap.",
  },
];

export default function FAQPage() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 text-[#101828] sm:px-8 lg:px-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-[#e8e9f4] bg-[#f3f7fc] p-8 shadow-2xl shadow-[#101828]/6 sm:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
            <MessageCircleQuestion className="h-7 w-7" />
          </div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Frequently asked questions</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-[#24223e] sm:text-7xl">
            Answers to common Venlearn questions.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085]">
            Learn how Venlearn helps schools manage operations, users, data, payments, communication, CBT, offline deployment, and day-to-day school workflows.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-8 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15"
            >
              Book a demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:info@veracone.com"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#d6e4f5] bg-white px-8 py-4 font-black text-[#2661ac] shadow-lg shadow-[#101828]/5"
            >
              Ask a question
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group rounded-[1.5rem] border border-[#e8e9f4] bg-white p-6 shadow-lg shadow-[#101828]/4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                <span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff8000]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block text-2xl font-black leading-tight text-[#24223e]">{faq.question}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac] transition group-open:bg-[#2661ac] group-open:text-white">
                  <Plus className="h-5 w-5 group-open:hidden" />
                  <Minus className="hidden h-5 w-5 group-open:block" />
                </span>
              </summary>
              <p className="mt-5 max-w-4xl text-base font-semibold leading-8 text-[#667085]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl rounded-[2rem] bg-[#101828] p-8 text-white shadow-2xl shadow-[#101828]/20 sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffb15c]">Still have questions?</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight !text-white">
          Talk to us about your school setup.
        </h2>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/70">
          Share your school size, workflows, and priorities. We will help you understand how Venlearn can fit your operations.
        </p>
        <Link
          href="/book-demo"
          className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-[#101828] shadow-xl shadow-black/10"
        >
          Book a demo
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
