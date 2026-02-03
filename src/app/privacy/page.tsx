"use client";

import Link from "next/link";
import { Shield, Clock } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 text-brand-primary mb-4">
                        <Shield size={24} />
                        <span className="font-bold tracking-wider uppercase text-sm">Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Privacy <span className="text-brand-primary">Policy</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                        Our Privacy Policy outlines how we collect, use, and protect your personal information. Your privacy and security are our priorities.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="prose prose-slate prose-lg max-w-none">
                    <p className="text-slate-600 leading-relaxed mb-8">
                        We appreciate your use of VenLearn (formerly Prepmate)! This is our explanation of the gathering, utilization, and management of any personal data of existing and prior VenLearn clientele when utilizing our website, software, and services (&ldquo;Services&rdquo;). Post your duration as our customer, we persist in distributing your information as illustrated in this policy. The term &ldquo;Services&rdquo; signifies products, services, content, aspects, technologies, or functions, along with any relevant websites, applications, and services furnished by VenLearn concerning your account.
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center text-sm">01</span>
                            What & Why
                        </h2>
                        <div className="space-y-6 text-slate-600">
                            <p>The following details are encompassed within our data collection and utilization practices aimed at enhancing, safeguarding, and promoting our Services.</p>

                            <div className="grid gap-6">
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-2">Account Details</h3>
                                    <p>We gather and relate to your account the facts supplied by you during activities like registration, and setting up dual-factor authentication (like your name, email id, contact number, payment data, and residential address).</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-2">Utilization Data</h3>
                                    <p>We gather data corresponding to your utilization of the Services, including actions taken in your account (like sharing, editing, viewing, creating and other transactions). This information assists us in enhancing, promoting, and safeguarding our Services, as well as in protecting our users.</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-2">Device Details</h3>
                                    <p>Information about the devices used to access the Services, including things like IP addresses, the kind of browser and device, the webpage visited prior to our sites, and identifiers associated with your devices, is also collected by us.</p>
                                </div>
                            </div>

                            <p className="mt-6">Registration for our Services will occasionally result in information about improvements or updates being sent to you, where permissible. Opting out is possible for users receiving these marketing materials.</p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center text-sm">02</span>
                            With Whom
                        </h2>
                        <div className="space-y-4 text-slate-600">
                            <p>Information may be disseminated as outlined below, but we guarantee not to sell it to advertisers or any other third parties.</p>
                            <ul className="list-disc pl-6 space-y-3">
                                <li><strong className="text-slate-900">Trusted Partners:</strong> We rely on a trusted network of third-party associates to support our business strategy.</li>
                                <li><strong className="text-slate-900">Legal Obligations:</strong> Your information might be released to third parties if deemed necessary to adhere to prevailing laws or regulations.</li>
                                <li><strong className="text-slate-900">Consent-based sharing:</strong> Your data can be shared with other users, or linked with a third-party account or platform, but only with your consent.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center text-sm">03</span>
                            How We Protect You
                        </h2>
                        <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-4 text-xl">Safety Measures</h3>
                            <p className="text-indigo-800/80 mb-6">Our team is committed to safeguarding your data and actively seeks out potential threats. We consistently create and implement safety options like:</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-indigo-900 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    Two-step verification
                                </div>
                                <div className="flex items-center gap-2 text-indigo-900 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    Secure storage encryption
                                </div>
                                <div className="flex items-center gap-2 text-indigo-900 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    Malicious intent detection
                                </div>
                                <div className="flex items-center gap-2 text-indigo-900 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                    Device link notifications
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center text-sm">04</span>
                            Your Control
                        </h2>
                        <p className="text-slate-600 mb-6">You have control over your personal data and how it&apos;s collected, used, and shared. For example, you can:</p>
                        <div className="space-y-4">
                            {['Delete your materials', 'Change or correct personal data', 'Access and transfer your data elsewhere', 'Object to processing'].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200">
                                    <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-20 pt-12 border-t border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Questions?</h3>
                        <p className="text-slate-600 mb-6">If you have questions or concerns about VenLearn, our Services, or this privacy policy, please reach out to us.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-primary text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
