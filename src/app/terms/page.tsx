import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Read the Venlearn terms of use for platform access, school accounts, subscriptions, responsible use, partner referrals, and data protection.",
  path: "/terms",
});

const termsSections = [
  {
    title: "Acceptance and eligibility",
    paragraphs: [
      "These Terms of Use govern access to the Venlearn website, applications, school management platform, and related services (collectively, the “Services”). Venlearn is a product of Veracone Technologies Ltd, also referred to as “Veracone”, “we”, “us”, or “our”.",
      "By accessing or using the Services, you agree to these Terms without modification. If you use Venlearn on behalf of a school or another organization, you confirm that you have authority to bind that organization to these Terms. You must have the legal capacity to enter a binding agreement and must not be prohibited by law from using the Services.",
    ],
  },
  {
    title: "Purpose of Venlearn",
    paragraphs: [
      "Venlearn provides software that helps schools manage admissions, student and guardian records, staff, attendance, academics, fees, communications, computer-based testing, reporting, and other authorized school operations.",
      "Venlearn supports school administration and decision-making, but it does not guarantee particular academic, financial, regulatory, enrollment, or operational outcomes. Schools remain responsible for their policies, decisions, records, and compliance obligations.",
    ],
  },
  {
    title: "Schools, users, and account access",
    paragraphs: [
      "A school or organization that subscribes to Venlearn is the customer. Administrators, staff, parents, guardians, students, and other people invited by that customer are authorized users. Each user may only access the information and workflows permitted by the school and their assigned role.",
      "When creating or using an account, you must provide accurate information, keep it current, protect your login details, and promptly notify us or your school administrator if you suspect unauthorized access. You are responsible for activity performed through your account. You may not impersonate another person, share access improperly, or attempt to bypass role permissions or security controls.",
    ],
  },
  {
    title: "Subscriptions, fees, and payment",
    paragraphs: [
      "Access to some Services requires a paid subscription or another commercial arrangement agreed with Veracone. The applicable plan, fees, billing period, renewal terms, taxes, implementation scope, and payment terms will be stated in the relevant order, invoice, proposal, or agreement.",
      "Unless an applicable agreement or law provides otherwise, fees already paid are non-refundable. We may restrict paid features or suspend access when undisputed amounts remain overdue after notice. A school remains responsible for exporting any information it requires before its subscription ends, subject to available export tools and its agreement with us.",
    ],
  },
  {
    title: "School content and responsible use",
    paragraphs: [
      "Schools and users may upload or create records, results, invoices, notices, messages, documents, questions, images, and other content through Venlearn (“School Content”). The school retains its rights in School Content and grants us the limited permission needed to host, process, back up, transmit, and display it solely to provide, secure, support, and improve the Services.",
      "Schools are responsible for the accuracy, legality, and appropriate collection of School Content, for assigning suitable permissions, and for obtaining any notices or consents required from staff, parents, guardians, students, or other individuals.",
    ],
    bullets: [
      "Do not use the Services for unlawful, fraudulent, abusive, discriminatory, or harmful activity.",
      "Do not upload malicious code, probe vulnerabilities, disrupt the Services, or access another user’s or school’s data without authorization.",
      "Do not copy, scrape, resell, reverse engineer, or commercially exploit the Services except where we have expressly authorized it or applicable law permits it.",
    ],
  },
  {
    title: "Partner and referral program",
    paragraphs: [
      "Individuals and organizations may apply to refer schools to Venlearn. A partner may earn commission when a qualified referral subscribes, subject to the referral rules, eligibility requirements, commission terms, and payment conditions communicated for the program.",
      "Partners are independent referrers and are not employees, agents, or legal representatives of Veracone. They may not make unauthorized promises, misrepresent Venlearn, inflate pricing, misuse school information, or engage in fraudulent or disruptive conduct. We may reject ineligible or duplicate referrals and may suspend or remove a partner for abuse of the program.",
    ],
  },
  {
    title: "Service availability, suspension, and termination",
    paragraphs: [
      "We may maintain, update, replace, or modify parts of the Services to improve performance, security, or functionality. Temporary interruptions may occur for maintenance, third-party outages, internet failures, security incidents, or circumstances outside our reasonable control.",
      "We may suspend or terminate access where these Terms are breached, fees are overdue, use creates a security or legal risk, or continued access could harm the Services or other users. A customer may stop using the Services in accordance with its subscription or written agreement. Provisions that should reasonably survive termination—including intellectual property, confidentiality, payment obligations, disclaimers, indemnity, and limits of liability—will continue to apply.",
    ],
  },
  {
    title: "Changes to these Terms",
    paragraphs: [
      "We may revise these Terms from time to time. The latest version will be posted on this page with an updated effective date. Where a change is material, we may also provide notice through the Services, by email, or through the school’s administrator. Continued use after the revised Terms take effect constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "Intellectual property and licence",
    paragraphs: [
      "The Services—including the Venlearn and Veracone names, software, source code, interfaces, databases, designs, text, graphics, documentation, trademarks, and other materials—are owned by Veracone or its licensors and are protected by applicable intellectual property laws.",
      "Subject to these Terms and payment of applicable fees, we grant authorized users a limited, non-exclusive, non-transferable, revocable licence to use the Services for the customer’s internal school operations. No other right is granted. Feedback or suggestions may be used by us without restriction or payment, provided we do not identify the contributor without permission.",
    ],
  },
  {
    title: "Privacy and data protection",
    paragraphs: [
      "Personal information collected or processed through the Services is handled in accordance with our Privacy Policy and any applicable data-processing agreement. Schools must use Venlearn in accordance with applicable privacy and child-protection laws and should only grant access to people who need it for legitimate school purposes.",
    ],
  },
  {
    title: "Third-party services and links",
    paragraphs: [
      "Venlearn may connect to or display services, links, content, or integrations provided by third parties. Their own terms and privacy policies apply to their services. We do not control and are not responsible for third-party services, although we take reasonable care when selecting providers that support Venlearn.",
    ],
  },
  {
    title: "Disclaimer of warranties",
    paragraphs: [
      "To the extent permitted by law, the Services are provided on an “as is” and “as available” basis. We do not warrant that every feature will always be uninterrupted or error-free, that all third-party content will be accurate, or that the Services will meet every customer’s particular requirements.",
      "Nothing in these Terms excludes warranties or rights that cannot lawfully be excluded. No statement or advice creates a warranty unless it is expressly included in a written agreement signed by Veracone.",
    ],
  },
  {
    title: "Indemnity and limitation of liability",
    paragraphs: [
      "To the extent permitted by law, a customer or user will indemnify Veracone, its affiliates, officers, employees, and agents against third-party claims, losses, or reasonable legal costs arising from unlawful use of the Services, infringement by School Content, or a material breach of these Terms.",
      "To the maximum extent permitted by law, Veracone and its suppliers will not be liable for indirect, incidental, special, punitive, or consequential loss, or for loss of profits, revenue, goodwill, or data, arising from use of or inability to use the Services. Any liability that cannot be excluded will be limited to the extent permitted by applicable law and any written commercial agreement with the customer.",
    ],
  },
  {
    title: "Applicable law and dispute resolution",
    paragraphs: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria. The parties should first attempt in good faith to resolve a dispute through direct discussion. If it cannot be resolved, the dispute may be referred to confidential arbitration in Nigeria, in English, before a single independent arbitrator, in accordance with applicable Nigerian arbitration law.",
      "Nothing prevents either party from seeking urgent injunctive or equitable relief from a court of competent jurisdiction to protect intellectual property, confidential information, data, or system security.",
    ],
  },
  {
    title: "General terms",
    paragraphs: [
      "If any provision is found invalid or unenforceable, it will be limited or removed only to the minimum extent necessary, and the remaining provisions will continue in effect. A failure to enforce a provision is not a waiver. These Terms, together with any applicable order, proposal, data-processing agreement, or written service agreement, form the agreement governing the Services.",
    ],
  },
];

export default function TermsOfUse() {
  return (
    <div className="bg-white px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-[#f3f7fc] p-8 sm:p-12">
          <Scale className="h-10 w-10 text-[#2661ac]" />
          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#2661ac]">
            Last updated June 18, 2026
          </p>
          <h1 className="mt-3 text-5xl font-black leading-tight text-[#101828] sm:text-7xl">Terms of Use</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#667085]">
            These Terms explain the rules for using Venlearn’s website, applications, school management platform, and partner program.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {termsSections.map((section, index) => (
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
            If you have questions about Venlearn, the Services, or these Terms, contact Veracone Technologies Ltd at info@veracone.com.
          </p>
          <a
            href="mailto:info@veracone.com"
            className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-[#101828]"
          >
            Email us about these Terms
            <ArrowRight className="h-5 w-5" />
          </a>
        </section>

        <Link href="/privacy" className="mt-8 inline-flex items-center gap-2 font-black text-[#2661ac]">
          Read our Privacy Policy
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
