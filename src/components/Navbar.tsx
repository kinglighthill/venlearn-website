"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Lock } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" }, // Renamed from Features for context
  { name: "Pricing", href: "/pricing" }, // Contextual rename
  { name: "Demo", href: "/demo" }, // Contextual rename
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 pointer-events-none flex justify-center`}
      >
        <div
          className={`pointer-events-auto mx-4 w-full max-w-7xl rounded-2xl transition-all duration-300 ${isScrolled
              ? "bg-white/80 backdrop-blur-lg shadow-lg border border-slate-200 py-3 px-6"
              : "bg-white/50 backdrop-blur-sm border border-transparent py-4 px-6 md:px-12"
            } flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Custom Logo Icon or Image would go here, using a placeholder icon for now */}
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold">
              V
            </div>
            <span className="font-bold text-2xl tracking-tight text-brand-primary">
              VenLearn
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/download"
              className="px-6 py-2.5 rounded-full bg-brand-primary text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
            >
              Download
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-slate-800 text-xl font-bold py-3 border-b border-slate-100"
                >
                  {link.name}
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              ))}
              <Link
                href="/download"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 w-full py-4 text-center font-bold rounded-xl bg-brand-primary text-white shadow-lg"
              >
                Download
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
