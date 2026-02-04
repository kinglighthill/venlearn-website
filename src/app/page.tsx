import { Metadata } from "next";
import Hero from "@/components/Hero";
import AppShowcase from "@/components/AppShowcase";
import ExploreScreens from "@/components/ExploreScreens";
import Testimonials from "@/components/Testimonials";
import DownloadSection from "@/components/DownloadSection";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Secure Exam Proctoring for Modern Education",
  description: "VenLearn empowers institutions with a complete ecosystem for secure proctoring. Manage, deliver, and monitor exams with confidence.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VenLearn",
    "operatingSystem": "Windows",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "NGN"
    },
    "description": "Advanced proctoring solution for modern education. Secure, scalable, and reliable exam monitoring ecosystem.",
    "publisher": {
      "@type": "Organization",
      "name": "Veracone Technologies Ltd",
      "url": "https://venlearn.com"
    }
  };

  return (
    <div className="flex flex-col gap-0 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ExploreScreens />
      <AppShowcase />
      <DownloadSection />
      {/* <Testimonials />
      <FAQ /> */}
    </div>
  );
}
