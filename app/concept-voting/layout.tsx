import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./theme.css";

const displayFont = Sora({
  variable: "--font-concept-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = DM_Sans({
  variable: "--font-concept-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Concept voting · Reforger",
  description: "Vote on Reforger concepts and leave optional feedback.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function ConceptVotingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} concept-voting-theme`}>
      {children}
    </div>
  );
}
