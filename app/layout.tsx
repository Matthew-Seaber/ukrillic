import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/page-structures/Navbar";
import Footer from "@/components/page-structures/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const IBMPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ukrillic",
  description:
    "Fast and free transliteration tool from Latin to Cyrillic script.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${IBMPlexSans.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Ukrillic" />
      </head>

      <body className="max-w-6xl mx-auto min-h-full flex flex-col selection:bg-primary/20">
        <Navbar />

        <main className="w-full mx-auto mt-2 px-6 py-10 flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
