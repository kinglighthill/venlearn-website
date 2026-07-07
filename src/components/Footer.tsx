import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      ["Features", "/#features"],
      ["Pricing", "/pricing"],
      ["Book demo", "/book-demo"],
      ["Blog", "/blog"],
      ["FAQ", "/faq"],
      ["Tutorials", "https://www.youtube.com/@venlearn"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Book demo", "/book-demo"],
      ["Become a partner", "/partner"],
      ["Blog", "/blog"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#ff8000]/30 bg-[linear-gradient(180deg,#fff8f2_0%,#fbfbff_22%)] px-5 py-16 text-[#24223e] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-[#ff8000]/35 bg-[radial-gradient(circle_at_12%_20%,rgba(38,97,172,0.10),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(255,128,0,0.14),transparent_28%),#ffffff] p-8 shadow-2xl shadow-[#24223e]/6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff8000] shadow-[0_0_0_5px_rgba(255,128,0,0.14)]" />
                Ready to converge your school?
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#24223e] sm:text-5xl">
                Build one workspace for admissions, classrooms, finance, and parents.
              </h2>
            </div>
            <Link
              href="/book-demo"
              className="inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full border border-[#ff8000]/55 bg-[#2661ac] px-7 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5"
            >
              Book demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/venlearn-logo.svg" alt="Venlearn" width={202} height={40} className="h-10 w-auto" />
            </Link>
            <p className="mt-5 max-w-md text-base font-medium leading-7 text-[#6c6f85]">
              School management software for teams that want every workflow, person, and decision in one beautiful place.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#a34700]">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="font-black text-[#6c6f85] transition hover:text-[#a34700]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#e8e9f4] pt-6 text-sm font-bold text-[#9a9eb5] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Venlearn. All rights reserved. A product by Veracone Technologies Ltd.</p>
          <p>One school workspace. Every team aligned.</p>
        </div>
      </div>
    </footer>
  );
}
