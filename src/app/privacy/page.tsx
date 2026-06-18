import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Venlearn collects, uses, shares, retains, and protects school, student, guardian, staff, account, and platform usage information.",
  path: "/privacy",
});

const privacySections = [
  {
    title: "Scope of this Policy",
    paragraphs: [
      "This Privacy Policy explains how Veracone Technologies Ltd (“Veracone”, “we”, “us”, or “our”) collects, uses, shares, stores, and protects personal information when people use the Venlearn website, applications, school management platform, support channels, and related services (collectively, the “Services”).",
      "Venlearn serves schools and their authorized administrators, staff, parents, guardians, students, and partners. This Policy applies to current and former users and continues to govern information retained after an account or subscription ends.",
    ],
  },
  {
    title: "Our role and the school’s role",
    paragraphs: [
      "For school records entered into Venlearn, the school generally decides why the information is used, which users may access it, and how long it should be retained. Veracone processes that information to provide Venlearn to the school and in accordance with the school’s instructions, our agreements, and applicable law.",
      "Veracone may separately determine how account, security, support, billing, website, partner, and marketing information is used for operating and improving our business. Questions about the content of a school record, or requests to correct it, should usually be directed first to the relevant school.",
    ],
  },
  {
    title: "Information we collect",
    paragraphs: [
      "The information we collect depends on your relationship with a school, the features enabled by that school, and how you interact with Venlearn.",
    ],
    bullets: [
      "Account and identity information, such as names, email addresses, phone numbers, roles, school affiliation, profile details, login credentials, and authentication information.",
      "School records, such as admissions data, student and guardian details, staff records, attendance, classes, timetables, assessments, results, report cards, fees, invoices, receipts, communications, documents, library or hostel records, transport details, and authorized medical or incident information.",
      "Usage and device information, such as actions taken in an account, pages and features used, dates and times of access, IP address, browser type, device type, operating system, diagnostic logs, and identifiers associated with a device or session.",
      "Support, sales, and partner information, including enquiries, demo requests, referral details, correspondence, survey responses, and records of interactions with our team.",
      "Billing and transaction information, such as subscription plan, invoices, payment status, transaction references, and limited billing details. Payment providers may process card, bank, or other payment information under their own privacy policies.",
      "Cookie and similar technology data used to remember preferences, maintain sessions, understand website performance, prevent misuse, and improve the Services.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: [
      "We use personal information only where we have a lawful and appropriate reason to do so, including to perform our agreements, follow a school’s instructions, comply with legal obligations, protect legitimate interests, or act with consent where required.",
    ],
    bullets: [
      "Provide, configure, maintain, secure, and support Venlearn and its school workflows.",
      "Authenticate users, apply roles and permissions, prevent fraud, investigate abuse, and protect schools, users, and the Services.",
      "Process school-authorized records, communications, reminders, reports, assessments, billing workflows, and other requested features.",
      "Respond to enquiries, provide customer support, manage subscriptions, process partner referrals, and administer payments or commissions.",
      "Analyze performance, diagnose faults, develop features, and improve the reliability and usability of Venlearn.",
      "Send service notices and, where permitted, product news or marketing communications. You may opt out of marketing messages while continuing to receive necessary service communications.",
      "Comply with law, enforce our agreements, establish or defend legal claims, and protect rights, safety, property, and the public interest.",
    ],
  },
  {
    title: "How we share information",
    paragraphs: [
      "We do not sell personal information to advertisers. We share information only where necessary to provide the Services, follow authorized instructions, operate our business, or meet legal obligations.",
    ],
    bullets: [
      "With the relevant school and its authorized users, according to roles, permissions, and school settings.",
      "With trusted service providers that support hosting, storage, security, communications, analytics, customer support, payments, and other operational functions. They may process information only for agreed purposes and under appropriate safeguards.",
      "With other Veracone products or affiliated entities where necessary to operate, secure, support, or improve our services and where permitted by law.",
      "With another service or platform when a school or user expressly requests or authorizes an integration or transfer.",
      "With regulators, courts, law-enforcement bodies, professional advisers, or other parties where disclosure is required by law or reasonably necessary to prevent fraud, protect safety, enforce agreements, or defend legal rights.",
      "In connection with a proposed or completed merger, financing, acquisition, reorganization, or sale of all or part of our business, subject to appropriate confidentiality and notice requirements.",
    ],
  },
  {
    title: "Cookies and analytics",
    paragraphs: [
      "Venlearn and its service providers may use cookies, local storage, pixels, and similar technologies to keep users signed in, remember settings, understand interactions, measure performance, and detect misuse. Browser settings can be used to block or remove cookies, but some Venlearn features may not work correctly without essential cookies.",
      "Analytics may include information about pages or features viewed, interaction frequency, session duration, device and browser details, and technical errors. We use this information to understand and improve the Services rather than to sell individual profiles to advertisers.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We use administrative, organizational, and technical safeguards designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure. These may include access controls, role permissions, encryption, secure storage, monitoring, backups, authentication measures, and incident-response procedures.",
      "No online service can guarantee absolute security. Schools and users also help protect information by using strong credentials, limiting account sharing, assigning appropriate permissions, securing their devices, and reporting suspected incidents promptly.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      "We retain information for as long as needed to provide the Services, keep school records available under the customer’s agreement, meet legal and accounting obligations, resolve disputes, prevent abuse, and enforce agreements. Retention periods vary according to the type of information, school instructions, account status, contractual commitments, backup cycles, and applicable law.",
      "When information is no longer required, we take reasonable steps to delete, anonymize, or securely isolate it. Deletion from active systems and backups may not happen immediately, and some information may be retained where the law permits or requires it.",
    ],
  },
  {
    title: "Your choices and rights",
    paragraphs: [
      "Depending on applicable law and our role in handling the information, you may have rights to access, correct, update, obtain a copy of, object to, restrict, or request deletion of your personal information, and to withdraw consent where processing relies on consent.",
      "Many account details can be reviewed or updated through Venlearn or through a school administrator. Requests relating to student, guardian, staff, academic, or other school-managed records should usually be sent to the relevant school, which may then instruct us as needed. We may verify identity and authority before acting on a request and may retain information where lawfully required.",
    ],
  },
  {
    title: "Children and student information",
    paragraphs: [
      "Venlearn processes information about children and students so schools can provide education and manage authorized school operations. Schools are responsible for ensuring they have an appropriate legal basis, notices, permissions, or consent for that processing and for giving access only to authorized people.",
      "We do not use school-provided student information for unrelated advertising. A parent, guardian, or student who has a question about a school record should contact the school that supplied or manages the information.",
    ],
  },
  {
    title: "International processing",
    paragraphs: [
      "Some service providers may process or store information in countries other than the country where a user or school is located. Where required, we use contractual, organizational, or technical safeguards intended to protect information during international processing in accordance with applicable law.",
    ],
  },
  {
    title: "Changes to this Policy",
    paragraphs: [
      "We may update this Privacy Policy as Venlearn, our practices, or applicable requirements change. The current version will be posted on this page with its effective date. If a change materially affects privacy rights or how information is used, we may also notify the relevant school or users through the Services, by email, or by another appropriate method.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-[#f3f7fc] p-8 sm:p-12">
          <ShieldCheck className="h-10 w-10 text-[#2661ac]" />
          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">
            Last updated June 18, 2026
          </p>
          <h1 className="mt-3 text-5xl font-black leading-tight text-[#101828] sm:text-7xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#667085]">
            This Policy explains how Venlearn handles account information and the student, guardian, staff, academic, financial, and operational data schools manage through our Services.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {privacySections.map((section, index) => (
            <section key={section.title} className="rounded-[1.5rem] border border-[#eaecf0] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-black text-[#101828]">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base font-medium leading-7 text-[#667085]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[1.5rem] bg-[#101828] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-black !text-white">Contact us</h2>
          <p className="mt-3 max-w-3xl font-medium leading-7 text-white/70">
            If you have questions or concerns about Venlearn, this Privacy Policy, or how Veracone handles personal information, email info@veracone.com. For a record managed by a school, please contact the school first.
          </p>
          <a
            href="mailto:info@veracone.com"
            className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-[#101828]"
          >
            Email us about privacy
            <ArrowRight className="h-5 w-5" />
          </a>
        </section>

        <Link href="/terms" className="mt-8 inline-flex items-center gap-2 font-black text-[#2661ac]">
          Read our Terms of Use
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
