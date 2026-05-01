import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./theme.css";

const sleepVideosFont = Nunito_Sans({
  variable: "--font-sleep-videos",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sleep Videos",
  description: "A focused page of embedded videos for bedtime listening.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SleepVideosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`sleep-videos-theme min-h-screen ${sleepVideosFont.variable}`}>
      {children}
    </div>
  );
}
