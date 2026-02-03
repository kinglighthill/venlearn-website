"use client";

import Link from "next/link";
import { Scale, Clock, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center gap-3 text-brand-secondary mb-4">
                        <Scale size={24} />
                        <span className="font-bold tracking-wider uppercase text-sm">Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Terms of <span className="text-brand-primary">Service</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                        These terms regulate the use of VenLearn platforms and services. By using our platforms, you agree to abide by these terms.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="prose prose-slate prose-lg max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-50 text-brand-secondary flex items-center justify-center text-sm">01</span>
                            Eligibility
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            To utilize the Services, it&apos;s necessary for you to affirm that you possess the legal capability to be party to a binding agreement with Veracone Technologies Ltd, and there is no legal impediment to your using or receiving the Services as per this Agreement.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-50 text-brand-secondary flex items-center justify-center text-sm">02</span>
                            Accounts & Security
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Account Setup</h3>
                                <p className="text-slate-600">While users are not obligated to set up an account, doing so provides access to exclusive features. You affirm that registration details are authentic and accurate.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2">Account Obligations</h3>
                                <p className="text-slate-600">It falls to you to safeguard the confidentiality of your login details. The Company disclaims any liability for loss or damage provoked by failure to respect these requisites.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-50 text-brand-secondary flex items-center justify-center text-sm">03</span>
                            Activation & Subscriptions
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle2 size={20} className="text-brand-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Duration</h4>
                                    <p className="text-slate-600 text-sm italic">Approximately 7 to 8 months (Academic Year).</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle2 size={20} className="text-brand-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Refund Policy</h4>
                                    <p className="text-slate-600 text-sm">Non-refundable once activation pin is delivered.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle2 size={20} className="text-brand-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Transfers</h4>
                                    <p className="text-slate-600 text-sm">Activation is unique to each device and not transferable.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 flex-shrink-0">
                                    <CheckCircle2 size={20} className="text-brand-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Termination</h4>
                                    <p className="text-slate-600 text-sm">Rights may be suspended for non-compliance with terms.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-orange-50 text-brand-secondary flex items-center justify-center text-sm">04</span>
                            Intellectual Property
                        </h2>
                        <div className="bg-slate-900 rounded-3xl p-8 text-slate-300">
                            <p className="mb-4">
                                All intellectual property rights and database rights in the Site, including text, graphics, software, and underlying source code, remain at all times vested in us or our licensors.
                            </p>
                            <p>
                                Any unauthorised use of the material and content of this website is strictly prohibited. You agree not to copy, reproduce, transmit, publish, or commercially exploit such material.
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Limitation of Liability</h2>
                        <p className="text-slate-600">
                            To the maximum extent permitted by law, Veracone shall not be liable for any lost profits, lost data, or indirect damages arising from your use of the site. Access to and use of the site is at your own discretion and risk.
                        </p>
                    </section>

                    <div className="mt-20 pt-12 border-t border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Questions about these terms?</h3>
                        <p className="text-slate-600 mb-6">Please contact us if you need clarification on any aspect of these Terms and Conditions.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-all"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
