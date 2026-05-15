import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaptchaProvider from "@/components/CaptchaProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import {
  createPageMetadata,
  organizationJsonLd,
  softwareJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { productFeatures } from "@/data/productFeatures";

export const metadata: Metadata = {
  metadataBase: new URL("https://venlearn.com"),
  ...createPageMetadata({
    title: "Venlearn | School Management Software",
    description:
      "A complete school management platform for admissions, academics, attendance, fees, communication, reporting, CBT, portals, and daily school operations.",
    path: "/",
  }),
  title: {
    default: "Venlearn | School Management Software",
    template: "%s | Venlearn",
  },
  authors: [{ name: "Veracone Technologies Ltd" }],
  applicationName: "Venlearn",
  creator: "Veracone Technologies Ltd",
  publisher: "Veracone Technologies Ltd",
  category: "Education software",
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6F46LKPC80"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6F46LKPC80');
        `}
      </Script>
      <body className="flex min-h-screen flex-col bg-[#fbfbff] font-[var(--font-saas)] text-[#24223e] antialiased selection:bg-[#2661ac]/20 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CaptchaProvider>
            <JsonLd
              data={[
                organizationJsonLd(),
                websiteJsonLd(),
                softwareJsonLd(productFeatures.map((feature) => feature.title)),
              ]}
            />
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
