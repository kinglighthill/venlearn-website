"use client";

import { Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import useRecaptcha from "@/hooks/useRecaptcha";

export default function ContactClient() {
    const verifyUser = useRecaptcha();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            // Verify with ReCaptcha
            const verification = await verifyUser('contact_form', data, '/contact');

            if (verification?.success) {
                // Here you would normally send the data to your actual contact API
                console.log("Form data verified and ready to send:", data);

                setSubmitStatus({
                    type: 'success',
                    message: "Thank you! Your message has been sent successfully."
                });
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: verification?.message || "Verification failed. Please try again."
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: "An error occurred. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-24 max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Let&apos;s <span className="gradient-text">Talk</span></h1>
                    <p className="text-slate-400 text-lg mb-12">
                        Interested in deploying VenLearn for your institution? Get in touch with our sales team for a custom viewing and quote.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Email Us</h3>
                                <p className="text-slate-400 mb-2">Our team usually responds within 24 hours.</p>
                                <a href="mailto:info@venlearn.com" className="text-indigo-400 font-semibold hover:underline">info@venlearn.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-3xl glass border border-white/10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-slate-400">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500"
                                    placeholder="John"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-slate-400">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-400">Email Address</label>
                            <input id="email" name="email" required type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-500" placeholder="john@school.edu" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-400">Message</label>
                            <textarea id="message" name="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none placeholder:text-slate-500" placeholder="Tell us about your needs..." />
                        </div>

                        {submitStatus && (
                            <div className={`p-4 rounded-xl text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-xl bg-indigo-500 font-bold text-white hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Sending...
                                </>
                            ) : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

