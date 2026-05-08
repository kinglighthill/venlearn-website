"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function DemoClient() {
  return (
    <div className="overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_16%_18%,rgba(38,97,172,0.14),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(38,97,172,0.08),transparent_28%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Product tour</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            See how Venlearn runs a school day.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Preview the workspace your administrators, teachers, finance team, parents, and leadership will use every day.
          </p>
        </div>

        <div className="mt-14 rounded-[2rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15">
          <div className="rounded-[1.8rem] bg-[#101828] p-3 sm:p-5">
            <div className="overflow-hidden rounded-[1.45rem] bg-white">
              <Image
                src="/images/demo-dashboard-generated.png"
                alt="Venlearn school management dashboard screen"
                width={1792}
                height={1024}
                priority
                className="h-auto w-full"
              />
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
