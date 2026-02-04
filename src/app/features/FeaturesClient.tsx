"use client";

import { motion } from "framer-motion";
import { Server, Monitor, Edit, UserCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function FeaturesClient() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Powerful <span className="gradient-text">Features</span></h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Explore the capabilities of the VenLearn ecosystem. Designed for security, stability, and scale.
                </p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-32"
            >
                {/* Server */}
                <motion.div variants={item} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 text-blue-400 mb-4 font-semibold">
                            <Server size={20} /> VenLearn Server
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Centralized Command Center</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            The backbone of the operation. The server handles thousands of concurrent connections with minimal latency. ensuring real-time data flow between the proctors and students.
                        </p>
                        <ul className="space-y-3">
                            {["High concurrency support (10k+ users)", "Real-time socket monitoring", "Automated log rotation & backup", "Encrypted data transmission (AES-256)"].map(f => (
                                <li key={f} className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={16} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2 h-64 md:h-96 w-full relative rounded-2xl overflow-hidden glass border border-blue-500/20 shadow-2xl shadow-blue-900/20 group hover:scale-[1.02] transition-transform duration-500 p-4">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="/images/server-mockup.png"
                                alt="VenLearn Server Dashboard"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Manager */}
                <motion.div variants={item} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="h-64 md:h-96 w-full relative rounded-2xl overflow-hidden glass border border-purple-500/20 shadow-2xl shadow-purple-900/20 group hover:scale-[1.02] transition-transform duration-500 p-4">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="/images/manager-mockup.png"
                                alt="Manager App Dashboard"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 text-purple-400 mb-4 font-semibold">
                            <Monitor size={20} /> Manager App
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Complete Exam Oversight</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Give your administrators and proctors the tools they need. Monitor live feeds, manage student eligibility, and analyze results instantly.
                        </p>
                        <ul className="space-y-3">
                            {["Live webcam & screen grid view", "One-click intervention/pause", "Detailed student activity logs", "Instant result generation"].map(f => (
                                <li key={f} className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle2 className="text-purple-500 shrink-0 mt-1" size={16} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Editor */}
                <motion.div variants={item} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 text-amber-400 mb-4 font-semibold">
                            <Edit size={20} /> Content Editor
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Intuitive Exam Creation</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Create complex exams with ease. Support for code blocks, mathematical equations, and multimedia integration makes it perfect for any subject.
                        </p>
                        <ul className="space-y-3">
                            {["Rich text & Markdown support", "Code syntax highlighting", "LaTeX Equation support", "Question Bank import/export"].map(f => (
                                <li key={f} className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle2 className="text-amber-500 shrink-0 mt-1" size={16} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2 h-64 md:h-96 w-full relative rounded-2xl overflow-hidden glass border border-amber-500/20 shadow-2xl shadow-amber-900/20 group hover:scale-[1.02] transition-transform duration-500 p-4">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="/images/editor-mockup.png"
                                alt="Content Editor Interface"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Client */}
                <motion.div variants={item} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="h-64 md:h-96 w-full relative rounded-2xl overflow-hidden glass border border-emerald-500/20 shadow-2xl shadow-emerald-900/20 group hover:scale-[1.02] transition-transform duration-500 p-4">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="/images/client-mockup.png"
                                alt="Student Client Interface"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 text-emerald-400 mb-4 font-semibold">
                            <UserCheck size={20} /> Student Client
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Fortified Testing Environment</h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Ensure integrity with our lock-down browser technology. It prevents cheating mechanism by controlling the OS environment during the exam.
                        </p>
                        <ul className="space-y-3">
                            {["Full Kiosk Mode (Block Alt+Tab, etc)", "Dual-camera monitoring (Webcam + Phone)", "Clipboard clearing & restriction", "Background process blocking"].map(f => (
                                <li key={f} className="flex items-start gap-2 text-slate-300">
                                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={16} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
