import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WizeLens } from "@/components/wizelens";
import "../styles/globals.css";

/* Self-hosted by next/font — no external font request at runtime.
   docs/design.md §10 prefers Inter or Geist for product implementation. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WizeWorks",
    template: "%s · WizeWorks",
  },
  description: "We make things that work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="wizeworks" className={inter.variable}>
      <body>
        {children}
        {/* Tracing (WizeLens): on only when this page's server traces it; no HUD outside development. */}
        <WizeLens />
      </body>
    </html>
  );
}
