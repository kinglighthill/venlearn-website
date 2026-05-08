import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaptchaProvider from "@/components/CaptchaProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://venlearn.com"),
  title: {
    default: "Venlearn | School Management Software",
    template: "%s | Venlearn",
  },
  description: "A complete school management platform for admissions, academics, attendance, fees, communication, reporting, and daily operations.",
  keywords: ["Venlearn", "School Management Software", "Student Information System", "School ERP", "Attendance Management", "School Fees", "Parent Portal"],
  authors: [{ name: "Venlearn Team" }],
  creator: "Veracone Technologies Ltd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://venlearn.com",
    siteName: "Venlearn",
    title: "Venlearn | School Management Software",
    description: "School management software for admissions, academics, attendance, billing, communication, reporting, and operations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Venlearn school management software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venlearn | School Management Software",
    description: "A complete school management platform for modern schools.",
    images: ["/og-image.jpg"],
    creator: "@venlearn",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-[#fbfbff] font-[var(--font-saas)] text-[#24223e] antialiased selection:bg-[#2661ac]/20 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CaptchaProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
