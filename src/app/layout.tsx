import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaptchaProvider from "@/components/CaptchaProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://venlearn.com"),
  title: {
    default: "VenLearn | School Management Software",
    template: "%s | VenLearn",
  },
  description: "A complete school management platform for admissions, academics, attendance, fees, communication, reporting, and daily operations.",
  keywords: ["VenLearn", "School Management Software", "Student Information System", "School ERP", "Attendance Management", "School Fees", "Parent Portal"],
  authors: [{ name: "VenLearn Team" }],
  creator: "Veracone Technologies Ltd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://venlearn.com",
    siteName: "VenLearn",
    title: "VenLearn | School Management Software",
    description: "School management software for admissions, academics, attendance, billing, communication, reporting, and operations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VenLearn school management software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VenLearn | School Management Software",
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
      <body className="min-h-screen flex flex-col bg-white text-[#101828] antialiased selection:bg-[#7b68ee]/20 transition-colors duration-300">
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
