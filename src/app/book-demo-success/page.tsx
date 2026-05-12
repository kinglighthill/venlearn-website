import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Demo Booked",
  description: "Your Venlearn demo request has been received.",
  path: "/book-demo-success",
  noIndex: true,
});

export default function BookDemoSuccessPage() {
  return (
    <div className="relative overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_18%_18%,rgba(38,97,172,0.14),transparent_30%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />
      <section className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#2661ac] text-white shadow-2xl shadow-[#2661ac]/20">
          <CalendarCheck className="h-10 w-10" />
        </div>
        <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Demo request received</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
          Thanks. Your Venlearn demo is in the queue.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
          We have received your preferred date and time. A Venlearn team member will reach out to confirm the session and share the next steps.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          {["We will confirm availability", "Your request has been saved"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#e8e9f4] bg-white p-4 text-left shadow-xl shadow-[#101828]/5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <p className="font-black text-[#344054]">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-8 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5"
          >
            Back home
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/features"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#e8e9f4] bg-white px-8 py-4 font-black text-[#101828] shadow-lg shadow-[#101828]/5 transition hover:-translate-y-0.5 hover:text-[#2661ac]"
          >
            Explore features
          </Link>
        </div>
      </section>
    </div>
  );
}
