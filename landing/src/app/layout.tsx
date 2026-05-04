import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZERO AI NEET | AI-Powered NEET Preparation Platform",
  description: "India's most advanced AI-powered NEET preparation platform. 50,000+ questions, expert mentors, and real-time performance analytics. Crack NEET 2026 with ZERO AI.",
  keywords: "NEET preparation, AI learning, medical entrance exam, NEET mock tests, biology quiz, physics practice, chemistry simulation, ZERO AI NEET",
  openGraph: {
    title: "ZERO AI NEET | AI-Powered NEET Preparation Platform",
    description: "Experience personalized NEET preparation with adaptive AI and 3D visualizations. Join 50,000+ aspirants today.",
    url: "https://neet.zeroai.org.in",
    siteName: "ZERO AI NEET",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NP: NEET Prep Dashboard Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crack NEET with AI-Powered Learning | ZERO AI",
    description: "Adaptive practice, expert mentors, and 3D biology models. The future of NEET prep is here.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://neet.zeroai.org.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { SchemaOrg } from "@/components/SchemaOrg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <SchemaOrg />
        {children}
      </body>
    </html>
  );
}
