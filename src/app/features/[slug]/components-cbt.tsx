"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Download,
  Edit3,
  ExternalLink,
  Play,
  Server,
  ShieldCheck,
  Users,
} from "lucide-react";

const suiteApps = [
  {
    id: "server",
    name: "Server",
    title: "Venlearn Server",
    icon: Server,
    image: "/images/server-mockup.png",
    alt: "Venlearn Server dashboard showing real-time proctoring logs",
    description:
      "The command center. Distributes exams over the school network, manages connections, and records every proctoring event in real time.",
    highlights: [
      "Real-time logging",
      "Secure socket connections",
      "Exam distribution",
    ],
  },
  {
    id: "manager",
    name: "Admin",
    title: "Venlearn Admin",
    icon: Users,
    image: "/images/features/cbt-offline-online.png",
    alt: "Venlearn Admin with candidate scheduling and live proctoring view",
    description:
      "For administrators and proctors. Schedule exams, manage candidates, and watch live proctoring feeds as the exam runs.",
    highlights: [
      "Candidate management",
      "Live proctoring view",
      "Result analytics",
    ],
  },
  {
    id: "editor",
    name: "Editor",
    title: "Content Editor",
    icon: Edit3,
    image: "/images/editor-mockup.png",
    alt: "Content Editor with rich-text questions and media support",
    description:
      "Author rich exams with objective, theory, image-based, and audio-based questions, or import them straight from Microsoft Word.",
    highlights: ["Rich text and media", "Question banks", "Word import"],
  },
  {
    id: "client",
    name: "Student Client",
    title: "Student Client",
    icon: ShieldCheck,
    image: "/images/client-mockup.png",
    alt: "Student Client running an exam in locked-down kiosk mode",
    description:
      "The locked-down app candidates sit exams in. Blocks app switching and restricted key combinations for the whole session.",
    highlights: ["Kiosk mode", "Screen recording", "Anti-cheat controls"],
  },
];

const lifecycle = [
  {
    stage: "Author",
    app: suiteApps[2],
    heading: "Write exams once, reuse them everywhere.",
    body: "Build question banks in the Content Editor with support for every subject: code blocks, mathematical equations, images, and audio. Existing papers come in from Microsoft Word without retyping.",
    points: [
      "Rich text and Markdown question authoring",
      "LaTeX equation and code syntax support",
      "Import questions from Microsoft Word documents",
      "Question bank import and export for reuse across terms",
    ],
  },
  {
    stage: "Deliver",
    app: suiteApps[0],
    heading: "Built for a full hall of candidates.",
    body: "The Server runs exams over your school LAN with no internet required, or online for remote candidates, handling thousands of concurrent connections with minimal latency.",
    points: [
      "Offline LAN exams for labs, online exams for remote candidates",
      "High concurrency support for large candidate pools",
      "Encrypted data transmission (AES-256)",
      "Automated log rotation and backup",
    ],
  },
  {
    stage: "Sit",
    app: suiteApps[3],
    heading: "A testing environment candidates can't break out of.",
    body: "The Student Client controls the machine for the length of the exam. Timed papers, randomized questions, and shuffled options keep every seat honest.",
    points: [
      "Full kiosk mode with app switching and shortcut keys blocked",
      "Tab and application switch alerts for online exams",
      "Clipboard clearing and background process blocking",
      "Timed exams with randomized questions and shuffled options",
    ],
  },
  {
    stage: "Oversee",
    app: suiteApps[1],
    heading: "Watch every candidate, intervene in one click.",
    body: "Proctors see the whole hall from Venlearn Admin: live activity, session logs, and instant results the moment the exam closes.",
    points: [
      "Live candidate monitoring grid",
      "One-click pause and intervention",
      "Detailed per-candidate activity logs",
      "Automatic marking with instant result publishing",
    ],
  },
];

const downloads = [
  {
    name: "Venlearn Suite",
    slug: "suite",
    version: "v1.0.0",
    size: "139 MB",
    icon: "/images/icons/server.png",
    description: "Every app in one installer.",
  },
  {
    available: false,
    name: "Venlearn Server",
    slug: "server",
    version: "v1.0.0",
    size: "53 MB",
    icon: "/images/icons/server.png",
    description: "The exam command center.",
  },
  {
    available: false,
    name: "Venlearn Admin",
    slug: "manager",
    version: "v1.0.0",
    size: "26 MB",
    icon: "/images/icons/manager.png",
    description: "Scheduling, proctoring, and results.",
  },
  {
    available: true,
    name: "Venlearn Editor",
    slug: "editor",
    version: "v1.0.0",
    size: "31 MB",
    icon: "/images/icons/editor.png",
    description: "Exam authoring and question banks.",
  },
  {
    available: true,
    name: "Venlearn Client",
    slug: "client",
    version: "v1.0.0",
    size: "26 MB",
    icon: "/images/icons/client.png",
    description: "The locked-down exam seat.",
  },
];

const walkthrough = {
  title: "Getting started with the Venlearn Editor",
  description:
    "A short guide to authoring your first exam, from blank page to question bank.",
  duration: "5:30",
  videoUrl:
    "https://venlearn.fra1.cdn.digitaloceanspaces.com/editor/videos/overview.mp4",
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function SuiteSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % suiteApps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion]);

  const selectApp = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  }, []);

  const activeApp = suiteApps[activeIndex];

  return (
    <div className="mx-auto mt-14 max-w-6xl">
      <div
        role="tablist"
        aria-label="Venlearn CBT apps"
        className="mx-auto mb-5 flex w-fit max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white p-1.5 shadow-lg shadow-[#101828]/5"
      >
        {suiteApps.map((app, index) => (
          <button
            key={app.id}
            role="tab"
            aria-selected={index === activeIndex}
            onClick={() => selectApp(index)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              index === activeIndex
                ? "bg-[#101828] text-white shadow-md"
                : "text-[#667085] hover:text-[#101828]"
            }`}
          >
            {app.name}
          </button>
        ))}
      </div>

      <div className="rounded-4xl bg-[#2661ac] p-1 shadow-[0_44px_120px_rgba(47,43,128,0.20)]">
        <div className="rounded-[1.8rem] bg-[#101828] p-3 sm:p-5">
          <div className="relative aspect-16/10 overflow-hidden rounded-[1.45rem] bg-white">
            {suiteApps.map((app, index) => (
              <Image
                key={app.id}
                src={app.image}
                alt={app.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1152px) 100vw, 1152px"
                className={`object-cover object-top transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p
        className="mt-5 text-center text-sm font-bold text-[#667085]"
        aria-live="polite"
      >
        {activeApp.title} · {activeApp.description}
      </p>
    </div>
  );
}

export function WalkthroughPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-black">
      {isPlaying ? (
        <video
          src={walkthrough.videoUrl}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full"
        />
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          className="group relative flex aspect-video w-full items-center justify-center bg-[#182338]"
          aria-label={`Play video: ${walkthrough.title}`}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition group-hover:scale-110">
            <Play className="ml-1 h-8 w-8 fill-[#2661ac] stroke-[#2661ac]" />
          </span>
          <span className="absolute bottom-0 inset-x-0 flex flex-col gap-1 bg-gradient-to-t from-black/70 to-transparent p-6 text-left sm:p-8">
            <span className="text-lg font-black text-white sm:text-xl">
              {walkthrough.title}
            </span>
            <span className="text-sm font-semibold text-white/70">
              {walkthrough.description} · {walkthrough.duration}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export function Apps() {
  return (
    <section className="mx-auto mt-24 max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">
          The suite
        </p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
          One exam day, four connected apps.
        </h2>
        <p className="mt-5 text-base font-medium leading-7 text-[#667085] sm:text-lg">
          Each app does one job and shares the same exam data, so nothing is
          retyped between authoring, delivery, sitting, and marking.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {suiteApps.map((app) => (
          <motion.div
            key={app.id}
            {...fadeUp}
            className="rounded-[1.35rem] border border-[#eef2f7] bg-white p-6 shadow-xl shadow-[#101828]/5 sm:p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2661ac] text-white shadow-lg shadow-[#2661ac]/15">
              <app.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-black leading-tight text-[#101828]">
              {app.title}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#667085]">
              {app.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {app.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full bg-[#f3f7fc] px-3 py-1.5 text-xs font-black text-[#2661ac]"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Lifecycle() {
  return (
    <section className="mx-auto mt-24 max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">
          How an exam runs
        </p>
        <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
          From blank paper to published results.
        </h2>
      </div>

      <div className="mt-14 space-y-20">
        {lifecycle.map((step, index) => {
          const StepIcon = step.app.icon;
          const imageFirst = index % 2 === 1;

          return (
            <motion.div
              key={step.stage}
              {...fadeUp}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={imageFirst ? "lg:order-2" : undefined}>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf2fb] px-4 py-2 text-sm font-black text-[#2661ac]">
                  <StepIcon className="h-4 w-4" />
                  {step.stage} · {step.app.title}
                </div>
                <h3 className="mt-5 text-3xl font-black leading-tight text-[#101828] sm:text-4xl">
                  {step.heading}
                </h3>
                <p className="mt-4 text-base font-medium leading-7 text-[#667085]">
                  {step.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] text-[#2661ac]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm font-bold leading-6 text-[#344054]">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={imageFirst ? "lg:order-1" : undefined}>
                <div className="rounded-[1.75rem] bg-[#2661ac] p-1 shadow-2xl shadow-[#2661ac]/15">
                  <div className="rounded-[1.55rem] bg-[#101828] p-2.5 sm:p-3.5">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] bg-white">
                      <Image
                        src={step.app.image}
                        alt={step.app.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function Walkthrough() {
  return (
    <section id="walkthrough" className="mx-auto mt-24 max-w-7xl scroll-mt-28">
      <div className="rounded-4xl bg-[#101828] p-6 shadow-2xl shadow-[#101828]/20 sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f9fd3]">
            Product walkthrough
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white! sm:text-5xl">
            See the suite in action.
          </h2>
          <p className="mt-4 text-base font-medium leading-7 text-white/70">
            Watch a short walkthrough of the exam-authoring flow, then explore
            the rest of the suite on our channel.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <WalkthroughPlayer />
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 bg-white/5 p-6 sm:flex-row">
          <p className="text-center text-sm font-bold text-white/80 sm:text-left">
            More tutorials, feature overviews, and release walkthroughs on
            YouTube.
          </p>
          <a
            href="https://www.youtube.com/@venlearn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#101828] transition hover:-translate-y-0.5"
          >
            Visit the channel
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Downloads() {
  return (
    <>
      <section id="download" className="mx-auto mt-24 max-w-7xl scroll-mt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2661ac]">
            Download
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
            Install the suite on your exam machines.
          </h2>
          <p className="mt-5 text-base font-medium leading-7 text-[#667085] sm:text-lg">
            Windows installers are available today; macOS and Linux are coming
            soon. Not sure what you need? The Suite installer includes
            everything.
          </p>
        </div>

        {/* <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"> */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {downloads
            .filter((app) => app.available)
            .map((app) => (
              <motion.div
                key={app.slug}
                {...fadeUp}
                // className="flex flex-col rounded-[1.35rem] border border-[#eef2f7] bg-white p-6 text-center shadow-xl shadow-[#101828]/5"
                className="flex min-w-65 max-w-sm flex-1 flex-col rounded-[1.35rem] border border-[#eef2f7] bg-white p-6 text-center shadow-xl shadow-[#101828]/5"
              >
                <div className="relative mx-auto h-16 w-16">
                  <Image
                    src={app.icon}
                    alt={`${app.name} app icon`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 text-base font-black leading-6 text-[#101828]">
                  {app.name}
                </h3>
                <p className="mt-1.5 grow text-sm font-semibold leading-6 text-[#667085]">
                  {app.description}
                </p>
                <p className="mx-auto mt-3 rounded-full bg-[#f3f7fc] px-3 py-1 text-xs font-black text-[#2661ac]">
                  {app.version} · {app.size}
                </p>
                <a
                  href={`/api/download?app=${app.slug}&platform=windows`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#111827]/15 transition hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Windows
                </a>
                <p className="mt-3 text-xs font-bold text-[#98a2b3]">
                  macOS &amp; Linux coming soon
                </p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* <section className="mx-auto mt-24 max-w-7xl">
        <div className="rounded-4xl border border-[#eef2f7] bg-[#f8fafc] p-8 text-center sm:p-14">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight text-[#101828] sm:text-5xl">
            Run your next exam on Venlearn.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-[#667085] sm:text-lg">
            Book a walkthrough with our team, or download the apps and set up
            your first computer-based test today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-demo"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#111827] px-8 py-4 text-base font-black text-white shadow-2xl shadow-[#111827]/20 transition hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#download"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-8 py-4 text-base font-black text-[#111827] shadow-lg shadow-[#101828]/5 transition hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5 text-[#2661ac]" />
              Download the apps
            </a>
          </div>
        </div>
      </section> */}
    </>
  );
}
