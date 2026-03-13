import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./theme.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-grace-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grace and Growth Poster",
  description:
    "Conference poster: research and practical integration for supporting children with ADHD in ministry settings. References, contact, and feedback.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function GraceAndGrowthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`grace-and-growth-theme min-h-screen font-sans ${sourceSerif.variable}`}
      style={{ fontFamily: "var(--font-grace-serif), serif" }}
    >
      {children}
    </div>
  );
}
