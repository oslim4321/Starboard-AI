import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./(landingPage)/shared/component/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deal Overview | Starboard AI",
  description:
    "Starboard AI’s Deal Overview page — interactive real‑estate deal cards with live rent PSF data, underwriting model selector, and responsive UI built in Next.js & Tailwind.",
  keywords: [
    "Starboard AI",
    "deal overview",
    "real estate",
    "Next.js",
    "Tailwind CSS",
    "underwriting model",
    "rent PSF",
    "responsive UI",
  ],
  authors: [{ name: "Starboard AI", url: "https://starboard.ai" }],
  openGraph: {
    title: "Deal Overview | Starboard AI",
    description:
      "Interactive deal cards with real‑estate insights, live rent PSF from api.rentometer, and underwriting model integration.",
    url: "https://your-domain.com/deal-overview",
    siteName: "Starboard AI",
    images: [
      {
        url: "/og/deal-overview.png",
        width: 1200,
        height: 630,
        alt: "Starboard AI Deal Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deal Overview | Starboard AI",
    description:
      "Real‑estate deal overview cards with live rent data and underwriting model selector.",
    images: ["/og/deal-overview.png"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Navbar />
          {children}
          <main></main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
