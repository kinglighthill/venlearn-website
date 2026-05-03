"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const primaryLinks = [
  { name: "Product", href: "/features", hasMenu: true },
  { name: "Solutions", href: "/features", hasMenu: true },
  { name: "Resources", href: "/demo", hasMenu: true },
  { name: "Enterprise", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
];

const mobileLinks = [
  ...primaryLinks,
  { name: "Get a Demo", href: "/demo" },
  { name: "Login", href: "/contact" },
];

function VenLearnLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span className="absolute left-1 top-1 h-5 w-7 rounded-[0.45rem] bg-[#7b68ee] shadow-lg shadow-[#7b68ee]/25" />
        <span className="absolute bottom-1 right-1 h-5 w-7 rounded-[0.45rem] bg-[#00c48c] shadow-lg shadow-[#00c48c]/20" />
        <span className="absolute h-4 w-4 rotate-45 rounded-sm bg-white" />
      </span>
      <span className="text-[1.38rem] font-black tracking-normal text-[#101828]">VenLearn</span>
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#eef2f7] bg-white/95 backdrop-blur-2xl">
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 xl:px-10">
        <Link href="/" aria-label="VenLearn home" className="shrink-0">
          <VenLearnLogo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-[#292d34] transition hover:bg-[#f4f3ff] hover:text-[#5146d8]"
            >
              {link.name}
              {link.hasMenu && (
                <ChevronDown className="h-4 w-4 text-[#98a2b3] transition group-hover:text-[#5146d8]" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex xl:gap-3">
          <Link
            href="/demo"
            className="rounded-full px-3 py-2.5 text-sm font-extrabold text-[#292d34] transition hover:bg-[#f4f3ff] hover:text-[#5146d8] xl:px-4 xl:text-[15px]"
          >
            Get a Demo
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-3 py-2.5 text-sm font-extrabold text-[#292d34] transition hover:bg-[#f4f3ff] hover:text-[#5146d8] xl:px-4 xl:text-[15px]"
          >
            Login
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-[linear-gradient(90deg,#7b68ee,#2f80ed_45%,#00c48c)] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#7b68ee]/20 transition hover:-translate-y-0.5 hover:shadow-[#7b68ee]/30 xl:px-6 xl:text-[15px]"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#eaecf0] bg-white text-[#101828] shadow-sm md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-[#eef2f7] bg-white px-5 py-4 shadow-2xl shadow-[#101828]/10 md:hidden">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-1">
              {mobileLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-black text-[#292d34] hover:bg-[#f4f3ff]"
                >
                  {link.name}
                  {"hasMenu" in link && link.hasMenu && <ChevronDown className="h-4 w-4 text-[#98a2b3]" />}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(90deg,#7b68ee,#2f80ed_45%,#00c48c)] px-6 py-4 text-base font-black text-white shadow-xl shadow-[#7b68ee]/20"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
