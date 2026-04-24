import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./theme.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-est-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-est-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Childhood OCD CBT manual overview",
  description:
    "Structured overview of Piacentini, Langley, and Roblek’s manual Cognitive Behavioral Treatment of Childhood OCD: It’s Only a False Alarm—sessions and treatment sequence for clinical psychology coursework.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function EstResearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`est-research-theme min-h-screen ${plexSans.variable} ${plexSerif.variable}`}
      style={{
        fontFamily: "var(--font-est-sans), system-ui, sans-serif",
      }}
    >
      {children}
    </div>
  );
}
