"use client";

import { ArrowRight, Check, Mail, MessageSquareText, Sparkles } from "lucide-react";
import { useState } from "react";
import useRecaptcha from "@/hooks/useRecaptcha";

const reasons = [
  "See the school workspace in action",
  "Map modules to your current processes",
  "Plan migration, training, and launch timing",
];

export default function ContactClient() {
  const verifyUser = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const verification = await verifyUser("contact_form", data, "/contact");

      if (verification?.success) {
        setSubmitStatus({
          type: "success",
          message: "Thanks. Your message is verified and ready for our team.",
        });
        e.currentTarget.reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: verification?.message || "Verification failed. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_18%_18%,rgba(123,104,238,0.20),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(255,95,109,0.16),transparent_28%),linear-gradient(180deg,#f8f7ff_0%,#ffffff_82%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7fb] bg-white px-4 py-2 text-sm font-extrabold text-[#5146d8] shadow-lg shadow-[#7b68ee]/10">
            <Sparkles className="h-4 w-4" />
            Launch your school workspace
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Let&apos;s build your VenLearn rollout.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Tell us about your school, campuses, workflows, and priorities. We&apos;ll help you shape the right setup for admissions, academics, finance, and communication.
          </p>

          <div className="mt-9 grid gap-3">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-center gap-3 rounded-2xl border border-[#eaecf0] bg-white p-4 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecfdf3] text-[#039855]">
                  <Check className="h-5 w-5" />
                </span>
                <p className="font-black text-[#101828]">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 rounded-[1.75rem] bg-[#101828] p-6 text-white">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Mail className="h-6 w-6 text-[#ffc371]" />
              </span>
              <div>
                <p className="font-black">Email us directly</p>
                <a href="mailto:info@venlearn.com" className="font-bold text-white/70 hover:text-white">
                  info@venlearn.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#7b68ee,#2f80ed_45%,#ff5f6d)] p-1 shadow-2xl shadow-[#7b68ee]/20">
          <form className="rounded-[1.8rem] bg-white p-5 sm:p-8" onSubmit={handleSubmit}>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7b68ee]">Contact sales</p>
                <h2 className="mt-2 text-3xl font-black text-[#101828]">Start the conversation</h2>
              </div>
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f3ff] text-[#5146d8] sm:flex">
                <MessageSquareText className="h-7 w-7" />
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-[#344054]">First name</span>
                <input
                  name="firstName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#7b68ee] focus:ring-4 focus:ring-[#7b68ee]/10"
                  placeholder="Ada"
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#344054]">Last name</span>
                <input
                  name="lastName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#7b68ee] focus:ring-4 focus:ring-[#7b68ee]/10"
                  placeholder="Okafor"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">Email address</span>
              <input
                name="email"
                required
                type="email"
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#7b68ee] focus:ring-4 focus:ring-[#7b68ee]/10"
                placeholder="ada@school.edu"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#7b68ee] focus:ring-4 focus:ring-[#7b68ee]/10"
                placeholder="Tell us about your school, campuses, and the workflows you want to improve..."
              />
            </label>

            {submitStatus && (
              <div
                className={`mt-5 rounded-2xl border p-4 text-sm font-black ${
                  submitStatus.type === "success"
                    ? "border-[#abefc6] bg-[#ecfdf3] text-[#027a48]"
                    : "border-[#fecdca] bg-[#fef3f2] text-[#b42318]"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#101828] px-7 py-4 font-black text-white shadow-xl shadow-[#101828]/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
