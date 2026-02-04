"use client";

import { motion } from "framer-motion";
import { Server, Monitor, Edit, UserCheck, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

const apps = [
  {
    id: "server",
    title: "VenLearn Server",
    description: "The central nervous system. Manages connections, exam distribution, and real-time monitoring logs.",
    icon: Server,
    color: "bg-blue-100 text-blue-600",
    image: "/images/server-mockup.png",
    features: ["Real-time Logging", "Secure Socket Connection", "Exam Distribution"]
  },
  {
    id: "admin",
    title: "Manager App",
    description: "For administrators to schedule exams, manage students, and view real-time proctoring data.",
    icon: Monitor,
    color: "bg-purple-100 text-purple-600",
    image: "/images/manager-mockup.png",
    features: ["Student Management", "Live Proctoring View", "Result Analytics"]
  },
  {
    id: "editor",
    title: "Content Editor",
    description: "Powerful rich-text editor for creating exams with support for various question types and media.",
    icon: Edit,
    color: "bg-orange-100 text-orange-600",
    image: "/images/editor-mockup.png",
    features: ["Rich Text Support", "Question Bank", "Media Integration"]
  },
  {
    id: "client",
    title: "Venlearn Client",
    description: "Locked-down testing environment ensuring integrity. Blocks unauthorized apps and key combinations.",
    icon: UserCheck,
    color: "bg-green-100 text-green-600",
    image: "/images/client-mockup.png",
    features: ["Kiosk Mode", "Screen Recording", "Anti-Cheat Mechanisms"]
  }
];

export default function AppShowcase() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium shadow-sm">
              <Zap size={14} className="text-orange-500 fill-orange-500" />
              <span>Powerful Ecosystem</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
          >
            Complete <span className="text-brand-primary">Proctoring Suite</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Four powerful applications working in perfect harmony to deliver a seamless and secure examination experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center mb-6`}>
                  <app.icon size={28} />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{app.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {app.description}
                </p>

                <ul className="mb-8 space-y-2">
                  {app.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-slate-600 font-medium">
                      <div className={`w-2 h-2 rounded-full ${app.color.split(' ')[0]} mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a href="/features" className="inline-flex items-center text-sm font-bold text-brand-primary group-hover:underline decoration-2 underline-offset-4 transition-all">
                  Learn more <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* App Interface Placeholder */}
              <div className="bg-slate-50 h-56 mx-8 rounded-t-xl border-t border-x border-slate-200 mt-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-8 bg-white border-b border-slate-100 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
                <Image
                  src={app.image}
                  alt={`${app.title} - ${app.description}`}
                  fill
                  className="object-cover object-top pt-8 opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
