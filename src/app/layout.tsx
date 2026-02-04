import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter for a clean, premium look
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://venlearn.com"),
  title: {
    default: "VenLearn | Secure Exam Proctoring for Modern Education",
    template: "%s | VenLearn",
  },
  description: "Advanced proctoring solution for modern education. Secure, scalable, and reliable exam monitoring ecosystem for institutions worldwide.",
  keywords: ["VenLearn", "Exam Proctoring", "Secure Exam Browser", "Online Assessments", "EDTech", "Educational Security", "Virtual Exam Monitoring"],
  authors: [{ name: "VenLearn Team" }],
  creator: "Veracone Technologies Ltd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://venlearn.com",
    siteName: "VenLearn",
    title: "VenLearn | Secure Exam Proctoring Suite",
    description: "Advanced proctoring solution for modern education.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VenLearn - Secure Exam Proctoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VenLearn | Secure Exam Proctoring Suite",
    description: "Advanced proctoring solution for modern education.",
    images: ["/og-image.jpg"],
    creator: "@venlearn",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CaptchaProvider from "@/components/CaptchaProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-brand-primary/20`}>
        <CaptchaProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CaptchaProvider>
      </body>
    </html>
  );
}
