"use client";

import { ArrowRight, Check, Mail, MessageSquareText, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useRecaptcha from "@/hooks/useRecaptcha";

const reasons = [
  "See the school workspace in action",
  "Map modules to your current processes",
  "Plan migration, training, and launch timing",
];

type SubmitStatus = {
  type: "success" | "error";
  message: string;
  actionUrl?: string;
  actionLabel?: string;
};

export default function BookDemoClient() {
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
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      schoolName: formData.get("schoolName"),
      email: formData.get("email"),
      phone: phoneNumber.startsWith("+") ? phoneNumber : `${phoneCode} ${phoneNumber}`,
      studentsPopulation: formData.get("studentsPopulation"),
      designation: formData.get("designation"),
      demoDateTime: formData.get("demoDateTime"),
    };

    try {
      const verification = await verifyUser("book_demo_form", data, "/book-demo", "/api/book-demo");

      if (verification?.success) {
        form.reset();
        router.push("/book-demo-success");
      } else {
        setSubmitStatus({
          type: "error",
          message: verification?.message || "Demo booking failed. Please try again.",
          actionUrl: verification?.zohoConnectUrl,
          actionLabel: verification?.zohoConnectUrl ? "Connect Zoho CRM" : undefined,
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
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e8fb] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <Sparkles className="h-4 w-4" />
            Launch your school workspace
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-normal text-[#101828] sm:text-7xl">
            Let&apos;s build your Venlearn rollout.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#667085] sm:text-xl">
            Tell us about your school, campuses, workflows, and priorities. We&apos;ll help you shape the right setup for admissions, academics, finance, and communication.
          </p>

          <div className="mt-9 grid gap-3">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-center gap-3 rounded-2xl border border-[#eaecf0] bg-white p-4 shadow-sm">
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
                <a href="mailto:info@veracone.com" className="font-bold text-white/70 hover:text-white">
                  info@veracone.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15">
          <form className="rounded-[1.8rem] bg-white p-5 sm:p-8" onSubmit={handleSubmit}>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">Book a demo</p>
                <h2 className="mt-2 text-3xl font-black text-[#101828]">Pick a time to see Venlearn</h2>
              </div>
              <span className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f7fc] text-[#2661ac] sm:flex">
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
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="John"
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#344054]">Last name</span>
                <input
                  name="lastName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="Doe"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">Email address</span>
              <input
                name="email"
                required
                type="email"
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                placeholder="john.doe@venlearn.com"
              />
            </label>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-[#344054]">Phone number</span>
                <div className="mt-2 flex rounded-2xl border border-[#d0d5dd] bg-white focus-within:border-[#2661ac] focus-within:ring-4 focus-within:ring-[#2661ac]/10">
                  <select
                    name="phoneCode"
                    defaultValue="+234"
                    aria-label="Phone country code"
                    className="w-36 shrink-0 rounded-l-2xl border-r border-[#d0d5dd] bg-[#f3f7fc] px-4 py-4 font-black text-[#101828] outline-none sm:w-32"
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
              <label className="block">
                <span className="text-sm font-black text-[#344054]">School name</span>
                <input
                  name="schoolName"
                  required
                  type="text"
                  className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
                  placeholder="Venlearn International School"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">Students population</span>
              <select
                name="studentsPopulation"
                required
                defaultValue=""
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
              >
                <option value="" disabled>
                  Select range
                </option>
                <option value="Below 100 students">Below 100 students</option>
                <option value="100 - 300 students">100 - 300 students</option>
                <option value="301 - 600 students">301 - 600 students</option>
                <option value="601 - 1,000 students">601 - 1,000 students</option>
                <option value="1,001 - 2,000 students">1,001 - 2,000 students</option>
                <option value="Above 2,000 students">Above 2,000 students</option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">Designation</span>
              <select
                name="designation"
                required
                defaultValue=""
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Director">Director</option>
                <option value="Principal">Principal</option>
                <option value="Administrator">Administrator</option>
                <option value="IT Manager">IT Manager</option>
                <option value="Teacher">Teacher</option>
                <option value="Proprietor">Proprietor</option>
                <option value="Proprietress">Proprietress</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-black text-[#344054]">Preferred demo date and time</span>
              <input
                name="demoDateTime"
                required
                type="datetime-local"
                className="mt-2 w-full rounded-2xl border border-[#d0d5dd] bg-white px-4 py-4 font-semibold text-[#101828] outline-none transition focus:border-[#2661ac] focus:ring-4 focus:ring-[#2661ac]/10"
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
                  Book Demo
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
