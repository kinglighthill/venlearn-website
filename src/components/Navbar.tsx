"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { productFeatures } from "@/data/productFeatures";

const primaryLinks = [
  { name: "Features", href: "/features", hasMenu: true },
  { name: "Pricing", href: "/pricing" },
  { name: "Company", href: "/company" },
  { name: "Tutorials", href: "https://www.youtube.com/@venlearn", external: true },
];

const mobileLinks = [
  { name: "Pricing", href: "/pricing" },
  { name: "Company", href: "/company" },
  { name: "Tutorials", href: "https://www.youtube.com/@venlearn", external: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:px-5">
      <div className="pointer-events-auto mx-auto max-w-[1240px]" onMouseLeave={() => setIsFeaturesOpen(false)}>
      <nav className="clickup-surface flex h-[68px] items-center justify-between rounded-full px-4 backdrop-blur-2xl sm:px-6 xl:px-7">
        <Link href="/" aria-label="Venlearn home" className="shrink-0">
          <Image src="/images/venlearn-logo.svg" alt="Venlearn" width={182} height={36} priority className="h-8 w-auto sm:h-9" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <div className="group inline-flex items-center rounded-full transition hover:bg-[#f3f7fc]">
            <Link
              href="/features"
              onMouseEnter={() => setIsFeaturesOpen(true)}
              className="inline-flex items-center rounded-l-full py-2.5 pl-4 pr-1 text-[15px] font-extrabold text-[#24223e] transition group-hover:text-[#2661ac]"
            >
              Features
            </Link>
            <button
              type="button"
              onClick={() => setIsFeaturesOpen((value) => !value)}
              onMouseEnter={() => setIsFeaturesOpen(true)}
              className="inline-flex h-10 items-center rounded-r-full py-2.5 pl-1 pr-4 text-[#9a9eb5] transition group-hover:text-[#2661ac]"
              aria-label="Open features menu"
              aria-expanded={isFeaturesOpen}
            >
              <ChevronDown className={`h-4 w-4 transition ${isFeaturesOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          {primaryLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={"external" in link && link.external ? "_blank" : undefined}
              rel={"external" in link && link.external ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-extrabold text-[#24223e] transition hover:bg-[#f3f7fc] hover:text-[#2661ac]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex xl:gap-3">
          <Link
            href="/book-demo"
            className="rounded-full bg-[#2661ac] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5 hover:shadow-[#2661ac]/25 xl:px-6 xl:text-[15px]"
          >
            Request a demo
          </Link>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8e9f4] bg-white text-[#24223e] shadow-sm md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isFeaturesOpen && (
        <div
          className="mt-3 hidden overflow-hidden rounded-[2rem] border border-[#e8e9f4] bg-white/95 shadow-2xl shadow-[#24223e]/10 backdrop-blur-2xl md:block"
          onMouseEnter={() => setIsFeaturesOpen(true)}
        >
          <div className="px-8 py-6 xl:px-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">Features</p>
                <p className="mt-1 text-sm font-semibold text-[#667085]">Jump into any Venlearn workflow.</p>
              </div>
              <Link
                href="/features"
                onClick={() => setIsFeaturesOpen(false)}
                className="rounded-full border border-[#e8e9f4] px-4 py-2 text-sm font-black text-[#24223e] transition hover:bg-[#f3f7fc] hover:text-[#2661ac]"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {productFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Link
                    key={feature.slug}
                    href={`/features/${feature.slug}`}
                    onClick={() => setIsFeaturesOpen(false)}
                    className="group rounded-2xl border border-[#e8e9f4] bg-[#fbfbff] p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-[#24223e]/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-black leading-5 text-[#24223e] group-hover:text-[#2661ac]">
                        {feature.title}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="mt-3 rounded-[2rem] border border-[#e8e9f4] bg-white/95 px-5 py-4 shadow-2xl shadow-[#24223e]/10 backdrop-blur-2xl md:hidden">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-1">
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileFeaturesOpen((value) => !value)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-black text-[#24223e] hover:bg-[#f3f7fc]"
                  aria-expanded={isMobileFeaturesOpen}
                >
                  Features
                  <ChevronDown className={`h-4 w-4 text-[#98a2b3] transition ${isMobileFeaturesOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileFeaturesOpen && (
                  <div className="mt-2 grid max-h-[44vh] gap-2 overflow-y-auto rounded-3xl border border-[#eef2f7] bg-[#fbfcff] p-3">
                    {productFeatures.map((feature) => {
                      const Icon = feature.icon;

                      return (
                        <Link
                          key={feature.slug}
                          href={`/features/${feature.slug}`}
                          onClick={() => {
                            setIsOpen(false);
                            setIsMobileFeaturesOpen(false);
                          }}
                          className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-black text-[#344054] shadow-sm"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2661ac] text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          {feature.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              {mobileLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={"external" in link && link.external ? "_blank" : undefined}
                  rel={"external" in link && link.external ? "noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-black text-[#24223e] hover:bg-[#f3f7fc]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/book-demo"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex min-h-14 items-center justify-center rounded-full bg-[#2661ac] px-6 py-4 text-base font-black text-white shadow-xl shadow-[#2661ac]/15"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
