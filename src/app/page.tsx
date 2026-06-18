import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CreditCard,
  Download,
  MessageSquareText,
  Sparkles,
  Stars,
  Smartphone,
} from "lucide-react";
import { productFeatures } from "@/data/productFeatures";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "School Management Software for Modern Schools",
  description:
    "Venlearn is an all-in-one school management software for admissions, student records, staff, guardians, fees, attendance, report cards, CBT, portals, communication, and offline or cloud school operations.",
  path: "/",
  keywords: [
    "all in one school management software",
    "offline school management software",
    "school management software Nigeria",
    "CBT software for schools",
    "school fee collection software",
  ],
});

const paperworkHighlights = [
  "Generate report cards in minutes after score approval",
  "Reduce fee record confusion with invoices and balances",
  "Find student, guardian, and staff records instantly",
  "Mark student and staff attendance without paper registers",
  "Keep term data organized across sessions and classes",
];

const automationCards = [
  {
    title: "Report cards",
    description: "Generate polished reports in minutes after score approval",
  },
  {
    title: "Fee collection",
    description: "Organize invoices, balances, reminders, receipts, and debtor lists",
  },
  {
    title: "Record keeping",
    description: "Replace registers and spreadsheets with searchable live records",
  },
];

const reminderHighlights = [
  {
    title: "Payment reminders before and after due dates",
    icon: CreditCard,
  },
  {
    title: "Event and public holiday notices",
    icon: CalendarDays,
  },
  {
    title: "Birthday messages and student updates",
    icon: MessageSquareText,
  },
  {
    title: "Attendance and incident notifications",
    icon: Bell,
  },
];

const reminderCards = [
  {
    title: "Fee reminder",
    message: "Second term balance is due this Friday.",
    tone: "bg-[#fff7ed] text-[#c2410c]",
  },
  {
    title: "Event reminder",
    message: "Inter-house sports starts at 10:00 AM.",
    tone: "bg-[#eff6ff] text-[#175cd3]",
  },
  {
    title: "Auto reminders",
    message: "Turn reminders on once. Venlearn handles the follow-up.",
    tone: "bg-[#eaf2fb] text-[#2661ac]",
  },
];

const mobileAppFeatures = [
  "Access fees, receipts, attendance, results, assignments, and messages from anywhere.",
  "Parents, staff, and students can stay connected without needing to log in through the web.",
  "Get school notices, event updates, reminders, and learning resources directly on mobile.",
];

const roleViews = [
  {
    number: "01",
    title: "Admins",
    description:
      "Get super-user access to school-wide data, approvals, finance health, staff activity, alerts, and reports, while adding staff, parents, and students and deciding what each user can see.",
  },
  {
    number: "02",
    title: "Staff",
    description:
      "Academic and non-academic staff can access the tools they need, from class lists, attendance, lesson plans, and score entry to timetables, resources, and operational tasks.",
  },
  {
    number: "03",
    title: "Parents",
    description:
      "View their wards' data, fee balances, receipts, attendance, results, messages, events, transport updates, and school notices, while communicating with the school.",
  },
  {
    number: "04",
    title: "Students",
    description:
      "Check timetables, assignments, eLibrary materials, results, announcements, CBT activities, and learning resources.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfbff] text-[#24223e]">
      <section className="relative px-5 pb-20 pt-36 sm:px-8 lg:px-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[48rem] bg-[radial-gradient(circle_at_15%_18%,rgba(38,97,172,0.10),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(38,97,172,0.10),transparent_27%),linear-gradient(180deg,#f3f7fc_0%,#ffffff_76%)]" />
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#e8e9f4] bg-white px-4 py-2 text-sm font-extrabold text-[#2661ac] shadow-lg shadow-[#2661ac]/10">
            <Sparkles className="h-4 w-4" />
            One workspace for every school team
          </div>
          <h1 className="mx-auto mt-6 max-w-6xl text-5xl font-black leading-[0.95] tracking-normal text-[#24223e] sm:text-7xl lg:text-8xl">
            One software for <span className="brand-highlight text-[#2661ac]">all your school needs</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-8 text-[#6c6f85] sm:text-2xl sm:leading-10">
            Venlearn brings admissions, academics, attendance, billing, communication, reports, and campus operations into one fast, colorful command center.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-demo"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-8 py-4 text-base font-black text-white shadow-2xl shadow-[#2661ac]/20 transition hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="rounded-[2rem] bg-[#2661ac] p-1 shadow-[0_44px_120px_rgba(38,97,172,0.14)]">
            <div className="rounded-[1.75rem] bg-white/90 p-3 shadow-inner shadow-white sm:p-4">
              <div className="overflow-hidden rounded-[1.35rem] border border-[#eef2f7] bg-[#f8fafc]">
                <Image
                  src="/images/demo-dashboard-generated.png"
                  alt="Venlearn school management dashboard screen"
                  width={1024}
                  height={1024}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="features" className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Everything in one place</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#24223e] sm:text-6xl">
              All in one tool for your school operations
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {productFeatures.slice(0, 8).map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="flex h-full flex-col rounded-[1.5rem] border border-[#e8e9f4] bg-white p-6 shadow-xl shadow-[#24223e]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#2661ac]/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black leading-7 text-[#24223e]">{feature.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#6c6f85]">{feature.description}</p>
                  <Link href={`/features/${feature.slug}`} className="mt-auto inline-flex pt-5 text-sm font-black text-[#2661ac] transition hover:text-[#174a86]">
                    Learn more
                  </Link>
                </article>
              );
            })}
          </div>

          <details className="group mt-5 flex flex-col">
            <summary className="order-last mx-auto mt-8 flex min-h-12 w-fit cursor-pointer list-none items-center justify-center rounded-full border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-black text-[#111827] shadow-lg shadow-[#101828]/5 transition hover:-translate-y-0.5 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">More features</span>
              <span className="hidden group-open:inline">Show fewer features</span>
            </summary>
            <div className="order-first mt-8 hidden gap-4 group-open:grid md:grid-cols-2 lg:grid-cols-4">
              {productFeatures.slice(8).map((feature) => {
                const Icon = feature.icon;

                return (
                  <article key={feature.title} className="flex h-full flex-col rounded-[1.5rem] border border-[#eef2f7] bg-white p-6 shadow-xl shadow-[#101828]/5 transition hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-black leading-7 text-[#101828]">{feature.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#667085]">{feature.description}</p>
                    <Link href={`/features/${feature.slug}`} className="mt-auto inline-flex pt-5 text-sm font-black text-[#2661ac] transition hover:text-[#2f80ed]">
                      Learn more
                    </Link>
                  </article>
                );
              })}
            </div>
          </details>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-[#e8e9f4] bg-white shadow-2xl shadow-[#2661ac]/10">
          <div className="grid gap-8 bg-[radial-gradient(circle_at_12%_16%,rgba(38,97,172,0.08),transparent_26%),radial-gradient(circle_at_86%_22%,rgba(38,97,172,0.08),transparent_24%),linear-gradient(135deg,#ffffff_0%,#f3f7fc_100%)] p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Role-aware access</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-[#24223e] sm:text-6xl">
                Every user sees what matters to them
              </h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-[#6c6f85]">
                Venlearn keeps access focused, so admins get control, staff get speed, parents get clarity, and students stay connected.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {roleViews.map((role) => (
                <article key={role.title} className="rounded-[1.6rem] border border-[#e8e9f4] bg-white/90 p-6 shadow-xl shadow-[#24223e]/5 backdrop-blur">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2661ac] text-sm font-black text-white shadow-lg shadow-[#2661ac]/15">
                    {role.number}
                  </span>
                  <h3 className="mt-6 text-2xl font-black text-[#24223e]">{role.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#6c6f85]">{role.description}</p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Computer based testing</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#24223e] sm:text-6xl">
              CBT that works offline, not only online.
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 text-[#6c6f85]">
              Venlearn helps schools organize computer based tests without depending on internet access, unlike many online-only tools or basic Google Forms setups.
            </p>
            <div className="mt-7 grid gap-3">
              {[
                "Run exams over a local area network with a school server and connected exam computers.",
                "Use the same offline CBT approach trusted by JAMB UTME-style testing environments.",
                "Switch to online delivery when needed for remote learners or distributed campuses.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-[#e8e9f4] bg-white p-4 shadow-sm">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-bold leading-6 text-[#344054]">{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/features/cbt-offline-online"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#2661ac] px-8 py-4 font-black text-white shadow-2xl shadow-[#2661ac]/15 transition hover:-translate-y-0.5"
            >
              Learn more about CBT
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="rounded-[2rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15">
            <div className="rounded-[1.8rem] bg-white p-3 sm:p-4">
              <div className="overflow-hidden rounded-[1.4rem] border border-[#eef2f7] bg-[#fbfcff]">
                <Image
                  src="/images/cbt-lan-generated.png"
                  alt="Offline CBT local area network diagram"
                  width={1792}
                  height={1024}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-[#e8e9f4] bg-white p-6 text-[#24223e] shadow-2xl shadow-[#24223e]/8 sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Automate the admin load</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-[#24223e] sm:text-6xl">
                Spend less time on repetitive school paperwork
              </h2>
            </div>
            <div className="rounded-[1.5rem] border border-[#e8e9f4] bg-[#fbfbff] p-5 lg:p-6">
              <p className="text-lg font-medium leading-8 text-[#6c6f85]">
                Venlearn automates monotonous tasks like result and report card generation, student and staff record management, fee tracking, and routine reminders. It replaces old Excel sheets, student registers, fee record books, lesson notes, and scattered files with one searchable source of truth.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.75rem] border border-[#e8e9f4] bg-[#fbfbff] p-4 sm:p-5">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#2661ac]">Quick wins</p>
              <div className="grid gap-3">
                {paperworkHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-4 rounded-2xl border border-[#eef0fb] bg-white p-4 shadow-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-bold leading-6 text-[#2f3450]">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#e8e9f4] bg-[#fbfbff] p-4 sm:p-5">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#2661ac]">Automation focus</p>
              <div className="grid gap-3">
                {automationCards.map((card, index) => (
                  <div key={card.title} className="rounded-2xl border border-[#eef0fb] bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2661ac] text-sm font-black text-white shadow-lg shadow-[#2661ac]/15">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-4 h-2 rounded-full bg-[#eef0fb]">
                          <div
                            className="h-full rounded-full bg-[#2661ac]"
                            style={{ width: `${64 + index * 12}%` }}
                          />
                        </div>
                        <p className="font-black text-[#24223e]">{card.title}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-[#6c6f85]">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#2661ac] transition hover:text-[#174a86]"
          >
            See more features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-[#d9e8fb] bg-[#f3f7fc] shadow-2xl shadow-[#2661ac]/10">
          <div className="grid gap-10 bg-[radial-gradient(circle_at_16%_20%,rgba(38,97,172,0.10),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(38,97,172,0.08),transparent_24%),linear-gradient(135deg,#f8fbff_0%,#f3f7fc_100%)] p-6 sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:p-14">
            <div className="flex flex-col">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101828] text-white shadow-xl shadow-[#101828]/15">
                <Bell className="h-7 w-7" />
              </div>
              <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Automated reminders</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
                Toggle reminders on and let Venlearn follow up
              </h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-[#667085]">
                Send alerts to parents, staff, or students for school fee payment reminders, event reminders, birthdays, public holidays, attendance, incidents, and other school updates without human intervention.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {reminderHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-lg shadow-[#101828]/5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf2fb] text-[#2661ac]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-sm font-black leading-6 text-[#344054]">{item.title}</p>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/features"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#2661ac] transition hover:text-[#2661ac] lg:mt-auto lg:pt-8"
              >
                Find more features
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[2rem] bg-[#101828] p-4 text-white shadow-2xl shadow-[#101828]/20 sm:p-6">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#76e4c0]">Reminder center</p>
                    <h3 className="mt-3 text-2xl font-black">Scheduled follow-ups</h3>
                  </div>
                  <span className="rounded-full bg-[#ecfdf3] px-4 py-2 text-xs font-black text-[#2661ac]">
                    Active
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  {reminderCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-white/10 bg-white p-4 text-[#101828] shadow-xl shadow-[#101828]/10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${card.tone}`}>
                            {card.title}
                          </span>
                          <p className="mt-4 text-base font-black leading-6">{card.message}</p>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7] text-[#2661ac]">
                          <Check className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-[#2661ac] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em]">Reminders enabled</p>
                    <p className="mt-2 text-base font-black leading-6">
                      Parents, staff, and students receive the right alert automatically.
                    </p>
                  </div>
                  <span className="flex h-9 w-16 shrink-0 items-center justify-end rounded-full bg-white/80 p-1">
                    <span className="h-7 w-7 rounded-full bg-[#101828] shadow-lg" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.25rem] border border-[#eef2f7] bg-white p-6 shadow-2xl shadow-[#101828]/8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-14">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-xl shadow-[#2661ac]/15">
              <Smartphone className="h-7 w-7" />
            </div>
            <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">Mobile app</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
              Venlearn on mobile is coming soon
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#667085]">
              Several Venlearn features will be available from the mobile app, so parents, staff, and students can keep up with school updates wherever they are without needing to log in through the web.
            </p>

            <div className="mt-8 grid gap-3">
              {mobileAppFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-bold leading-6 text-[#344054]">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {[
                ["App Store badge", "App Store"],
                ["Playstore coming soon badge", "Playstore"],
              ].map(([label, store]) => (
                <span key={store} aria-label={label} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#e5e7eb] bg-[#101828] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#101828]/10">
                  <Download className="h-5 w-5" />
                  {store}
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-white/70">
                    Coming soon
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/images/mobile-dashboard-generated.png"
              alt="Venlearn mobile school dashboard app preview"
              width={864}
              height={1821}
              className="h-auto w-full max-w-[24rem] rounded-[1.45rem] shadow-[0_42px_110px_rgba(16,24,40,0.20)]"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-[#e8e9f4] bg-[#101828] text-white shadow-2xl shadow-[#101828]/20">
          <div className="grid gap-10 bg-[radial-gradient(circle_at_12%_18%,rgba(255,128,0,0.24),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(38,97,172,0.30),transparent_30%)] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-14">
            <div>
              <a
                href="https://www.myprepmate.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#ffb15c] transition hover:bg-white/15"
              >
                From the makers of Prepmate
                <ArrowRight className="h-4 w-4" />
              </a>
              <h2 className="mt-6 max-w-4xl text-4xl font-black leading-tight !text-white sm:text-6xl">
                The team who built <span className="text-[#ffb15c]">Prepmate</span>, built{" "}
                <span className="text-[#9fc5f8]">Venlearn</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/70">
                Prepmate helps students prepare for UTME and WASSCE with past questions, CBT mode, study tools, notes, syllabuses, and literary texts across Android, iOS, and desktop.
              </p>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/60">
                The people who made Prepmate brought the same education experience, product discipline, and care for everyday users into Venlearn.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ["400k+", "Users"],
                  ["4.6", "Average rating"],
                  ["UTME & WASSCE", "Exam preparation"],
                  ["Android, iOS, Desktop", "Major platforms"],
                ].map(([value, label]) => (
                  <div key={value} className="min-w-0 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="break-words text-2xl font-black leading-tight text-[#ffb15c]">{value}</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/60">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://www.myprepmate.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#ffb15c]/60 bg-white/10 px-7 py-4 font-black text-[#ffb15c] transition hover:-translate-y-0.5 hover:border-[#ffb15c] hover:bg-white/15"
                >
                  Visit Prepmate
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative min-h-[34rem] sm:min-h-[40rem] lg:min-h-[46rem]">
              <Image
                src="/images/prepmate-home.png"
                alt="Prepmate app home screen"
                width={1224}
                height={2570}
                className="absolute left-0 top-6 h-auto w-[58%] min-w-[14rem] max-w-[20rem] rotate-[-5deg] drop-shadow-2xl"
              />
              <Image
                src="/images/prepmate-past-questions.png"
                alt="Prepmate past questions screen"
                width={1224}
                height={2570}
                className="absolute bottom-0 right-0 h-auto w-[58%] min-w-[14rem] max-w-[20rem] rotate-[4deg] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#2661ac] p-1 text-center shadow-2xl shadow-[#2661ac]/15">
          <div className="rounded-[1.8rem] bg-white px-6 py-16 sm:px-10">
            <Stars className="mx-auto h-10 w-10 text-[#6f9fd3]" />
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-[#101828] sm:text-6xl">
              Give your school the workspace everyone actually wants to use.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-[#667085]">
              Start with admissions, attendance, fees, or academics, then expand into a full school operating system.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#111827] px-8 py-4 font-black text-white"
              >
                Book a demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#e5e7eb] px-8 py-4 font-black text-[#111827]"
              >
                View plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
