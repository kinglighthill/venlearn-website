"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors">

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
            <span>The New Standard for Learning Institutions</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-brand-primary"
        >
          Secure. Scalable. <br />
          <span className="text-slate-900 dark:text-white text-4xl sm:text-6xl md:text-7xl">Uncompromised.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          VenLearn empowers institutions with a complete ecosystem for secure proctoring.
          Manage, deliver, and monitor exams with confidence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/download"
            className="px-10 py-4.5 rounded-2xl bg-brand-primary text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 flex items-center gap-3"
          >
            <Download size={22} className="stroke-[2.5]" />
            Download
          </Link>
          <Link
            href="/contact"
            className="px-10 py-4.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
          >
            Request Demo
          </Link>
        </motion.div>
      </div>

      {/* Optional minimal decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-orange-50/50 dark:bg-orange-900/20 rounded-full blur-3xl opacity-60" />
      </div>
    </section>
  );
}
