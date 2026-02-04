"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Demo", href: "/demo" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getThemeIcon = () => {
    if (!mounted) return <Sun size={18} />;
    if (theme === "dark") return <Moon size={18} />;
    if (theme === "system") return <Monitor size={18} />;
    return <Sun size={18} />;
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 pointer-events-none flex justify-center`}
      >
        <div
          className={`pointer-events-auto mx-4 w-full max-w-7xl rounded-2xl transition-all duration-300 ${isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg border border-slate-200 dark:border-slate-700 py-3 px-6"
            : "bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-transparent py-4 px-6 md:px-12"
            } flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Chips */}
            {mounted && (
              <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-full transition-all ${theme === "light"
                      ? "bg-white dark:bg-slate-600 text-amber-500 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                  aria-label="Light mode"
                  title="Light mode"
                >
                  <Sun size={16} />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-full transition-all ${theme === "dark"
                      ? "bg-white dark:bg-slate-600 text-indigo-500 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                  aria-label="Dark mode"
                  title="Dark mode"
                >
                  <Moon size={16} />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`p-2 rounded-full transition-all ${theme === "system"
                      ? "bg-white dark:bg-slate-600 text-emerald-500 shadow-sm"
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                  aria-label="System preference"
                  title="System preference"
                >
                  <Monitor size={16} />
                </button>
              </div>
            )}
            <Link
              href="/download"
              className="px-6 py-2.5 rounded-full bg-brand-primary text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
            >
              Download
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 dark:text-slate-200 p-2"
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
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-slate-800 dark:text-slate-100 text-xl font-bold py-3 border-b border-slate-100 dark:border-slate-800"
                >
                  {link.name}
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              ))}

              {/* Theme Toggle in Mobile */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-800 dark:text-slate-100 text-xl font-bold">Theme</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme("light")}
                    className={`p-2 rounded-lg ${theme === 'light' ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <Sun size={18} />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <Moon size={18} />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`p-2 rounded-lg ${theme === 'system' ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <Monitor size={18} />
                  </button>
                </div>
              </div>

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
