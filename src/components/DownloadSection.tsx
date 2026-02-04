"use client";

import { motion } from "framer-motion";
import { Download, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";

export default function DownloadSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight"
                >
                    Download VenLearn <br /> and Start Learning Today
                </motion.h2>

                {/* Platform Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto mt-12"
                >
                    {/* Windows */}
                    <button className="flex items-center gap-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all hover:scale-105 group text-left">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                <Image src="/images/icons/windows.avif" alt="VenLearn for Windows Download" width={18} height={18} />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Download for</div>
                            <div className="text-lg font-bold text-slate-800">Windows PC</div>
                        </div>
                    </button>

                    {/* Mac OS */}
                    <button className="flex items-center gap-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all hover:scale-105 group text-left">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                <Image src="/images/icons/mac.svg" alt="VenLearn for Mac OS Download" width={18} height={18} />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Download for</div>
                            <div className="text-lg font-bold text-slate-800">Mac OS</div>
                        </div>
                    </button>

                    {/* Linux OS */}
                    <button className="flex items-center gap-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all hover:scale-105 group text-left">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                <Image src="/images/icons/linux2.png" alt="VenLearn for Linux Download" width={18} height={18} />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Download for</div>
                            <div className="text-lg font-bold text-slate-800">Linux</div>
                        </div>
                    </button>

                    {/* Google Play */}
                    <button className="flex items-center gap-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all hover:scale-105 group text-left">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                <Image src="/images/icons/android.svg" alt="VenLearn for Android Download" width={18} height={18} />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Download for</div>
                            <div className="text-lg font-bold text-slate-800">Android</div>
                        </div>
                    </button>

                    {/* App Store */}
                    <button className="flex items-center gap-5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all hover:scale-105 group text-left">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                <Image src="/images/icons/ios.avif" alt="VenLearn for iOS App Store Download" width={18} height={18} />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium">Download on the</div>
                            <div className="text-lg font-bold text-slate-800">App Store</div>
                        </div>
                    </button>

                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16 text-slate-600 font-medium"
                >
                    <a
                        href="mailto:info@venlearn.com"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                    >
                        <span>✉️ info@venlearn.com</span>
                    </a>
                    <a
                        href="tel:+2348107993604"
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                    >
                        <span>📞 +2348107993604</span>
                    </a>
                </motion.div>

                {/* Bottom Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-4 mt-8"
                >
                    {['Features', 'Pricing', 'Demo'].map(text => (
                        <span key={text} className="px-6 py-2 rounded-full bg-slate-100 text-slate-700 font-semibold">{text}</span>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
