import Hero from "@/components/Hero";
import AppShowcase from "@/components/AppShowcase";
import ExploreScreens from "@/components/ExploreScreens";
import Testimonials from "@/components/Testimonials";
import DownloadSection from "@/components/DownloadSection";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 min-h-screen">
      <Hero />
      <ExploreScreens />
      <AppShowcase />
      <DownloadSection />
      {/* <Testimonials />
      <FAQ /> */}
    </div>
  );
}
