import Link from "next/link";
import { ArrowRight, School } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      ["Features", "/#features"],
      ["Pricing", "/pricing"],
      ["Demo", "/demo"],
    ],
  },
  {
    title: "Workflows",
    links: [
      ["Admissions", "/#features"],
      ["Academics", "/#features"],
      ["Finance", "/#features"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#eaecf0] bg-white px-5 py-16 text-[#101828] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#f4f3ff,#ecfeff_55%,#fff1f3)] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#5146d8]">Ready to converge your school?</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                Build one workspace for admissions, classrooms, finance, and parents.
              </h2>
            </div>
            <Link
              href="/demo"
              className="inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-[#101828] px-7 py-4 font-black text-white shadow-xl shadow-[#101828]/15"
            >
              Book demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7b68ee,#2f80ed,#00c48c)] text-white">
                <School className="h-5 w-5" />
              </span>
              <span className="text-2xl font-black">VenLearn</span>
            </Link>
            <p className="mt-5 max-w-md text-base font-medium leading-7 text-[#667085]">
              School management software for teams that want every workflow, person, and decision in one beautiful place.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#98a2b3]">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="font-black text-[#667085] transition hover:text-[#5146d8]">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#eaecf0] pt-6 text-sm font-bold text-[#98a2b3] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} VenLearn. All rights reserved.</p>
          <p>One school workspace. Every team aligned.</p>
        </div>
      </div>
    </footer>
  );
}
