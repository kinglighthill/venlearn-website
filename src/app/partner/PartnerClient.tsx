"use client";

import {
  ArrowRight,
  Check,
  Handshake,
  Mail,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useRecaptcha from "@/hooks/useRecaptcha";

const reasons = [
  "Earn commission from school referrals that subscribe",
  "Introduce schools while our team handles the product conversation",
  "Build a long-term channel with a school technology partner",
];

type SubmitStatus = {
  type: "success" | "error";
  message: string;
  actionUrl?: string;
  actionLabel?: string;
};

export default function PartnerClient() {
  const router = useRouter();
  const verifyUser = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(form);
    const phoneCode = String(formData.get("phoneCode") || "+234").trim();
    const phoneNumber = String(formData.get("phone") || "").trim();
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: phoneNumber.startsWith("+")
        ? phoneNumber
        : `${phoneCode} ${phoneNumber}`,
      organizationName: formData.get("organizationName"),
      partnerCategory: formData.get("partnerCategory"),
      referralExperience: formData.get("referralExperience"),
    };

    try {
      const verification = await verifyUser(
        "partner_signup_form",
        data,
        "/partner",
        "/api/partner",
      );

      if (verification?.success) {
        form.reset();
        router.push("/partner-success");
      } else {
        const zohoConnectUrl =
          typeof verification?.zohoConnectUrl === "string"
            ? verification.zohoConnectUrl
            : undefined;

        setSubmitStatus({
          type: "error",
          message:
            verification?.message ||
            "Partner signup failed. Please try again.",
          actionUrl: zohoConnectUrl,
          actionLabel: zohoConnectUrl ? "Connect Zoho CRM" : undefined,
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
      <div className="absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(circle_at_18%_18%,rgba(38,97,172,0.14),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(38,97,172,0.08),transparent_28%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_82%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <Sparkles className="h-4 w-4" />
            Venlearn partner program
          </div>
          <h1 className="mt-6 max-w-4xl break-words text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Refer schools. Earn commission.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Partner with Venlearn by introducing schools that need stronger
            tools for admissions, fees, attendance, CBT, communication, and
            reporting. Our team will reach out to align on the next steps.
          </p>

          <div className="mt-9 grid gap-3">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-center gap-3 rounded-2xl border border-[#eaecf0] bg-white p-4 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                  <Check className="h-5 w-5" />
                </span>
                <p className="font-black text-[#101828]">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 rounded-[1.75rem] bg-[#101828] p-6 text-white">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Mail className="h-6 w-6 text-[#6f9fd3]" />
              </span>
              <div>
                <p className="font-black">Email us directly</p>
                <a
                  href="mailto:info@veracone.com"
                  className="font-bold text-white/70 hover:text-white"
                >
                  info@veracone.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[1.5rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15 sm:rounded-[2rem]">
          <form
            className="min-w-0 rounded-[1.3rem] bg-white p-4 sm:rounded-[1.8rem] sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">
                  Partner signup
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#101828]">
                  Join the referral program
                </h2>
              </div>
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f7fc] text-[#2661ac] sm:flex">
                <Handshake className="h-7 w-7" />
              </span>
            </div>

            <label className="block min-w-0">
              <span className="text-sm font-black text-[#344054]">
                Full name
              </span>
              <input
                name="fullName"
                required
                type="text"
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                placeholder="John Doe"
              />
            </label>

            <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 [&>*]:min-w-0">
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  Email address
                </span>
                <input
                  name="email"
                  required
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="john.doe@example.com"
                />
              </label>
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  Phone number
                </span>
                <div className="mt-2 flex min-w-0 rounded-2xl border border-[#d0d5dd] bg-white focus-within:border-[#2661ac] focus-within:ring-4 focus-within:ring-[#2661ac]/10">
                  <select
                    name="phoneCode"
                    defaultValue="+234"
                    aria-label="Phone country code"
                    className="w-28 shrink-0 rounded-l-2xl border-r border-[#d0d5dd] bg-[#f3f7fc] px-3 py-4 font-black text-[#101828] outline-none sm:w-32 sm:px-4"
                  >
                    <option value="+234">NG +234</option>
                    <option value="+233">GH +233</option>
                    <option value="+254">KE +254</option>
                    <option value="+27">ZA +27</option>
                    <option value="+44">UK +44</option>
                    <option value="+1">US +1</option>
                  </select>
                  <input
                    name="phone"
                    required
                    type="tel"
                    className="min-w-0 flex-1 rounded-r-2xl bg-white px-4 py-4 font-semibold text-[#101828] outline-none"
                    placeholder="801 234 5678"
                  />
                </div>
              </label>
            </div>

            <label className="mt-5 block min-w-0">
              <span className="text-sm font-black text-[#344054]">
                Organization or business name{" "}
                <span className="font-bold text-[#667085]">(Optional)</span>
              </span>
              <input
                name="organizationName"
                type="text"
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                placeholder="Your company, school, or network"
              />
            </label>

            <div className="mt-5 grid min-w-0 gap-4 [&>*]:min-w-0">
              <label className="block min-w-0">
                <span className="text-sm font-black text-[#344054]">
                  Partner type
                </span>
                <select
                  name="partnerCategory"
                  required
                  defaultValue=""
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                >
                  <option value="" disabled>
                    Select partner type
                  </option>
                  <option value="Education consultant">
                    Education consultant
                  </option>
                  <option value="School owner or administrator">
                    School owner or administrator
                  </option>
                  <option value="Technology vendor">Technology vendor</option>
                  <option value="Community or alumni network">
                    Community or alumni network
                  </option>
                  <option value="Individual referrer">Individual referrer</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">
                Referral experience{" "}
                <span className="font-bold text-[#667085]">(Optional)</span>
              </span>
              <textarea
                name="referralExperience"
                rows={3}
                className="mt-2 w-full resize-none rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                placeholder="Tell us about your school network or past referral work"
              />
            </label>

            {submitStatus && (
              <div
                className={`mt-5 rounded-2xl border p-4 text-sm font-black ${
                  submitStatus.type === "success"
                    ? "border-[#d9e8fb] bg-[#f3f7fc] text-[#174a86]"
                    : "border-[#fecdca] bg-[#fef3f2] text-[#b42318]"
                }`}
              >
                <p>{submitStatus.message}</p>
                {submitStatus.actionUrl && (
                  <a
                    href={submitStatus.actionUrl}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#2661ac] px-4 py-2 text-white transition hover:bg-[#174a86]"
                  >
                    {submitStatus.actionLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#174a86] px-7 py-4 font-black text-white shadow-xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending
                </>
              ) : (
                <>
                  Sign Up
                  <UserPlus className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
