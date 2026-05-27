import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "../spotify-wrapped-poc/theme.css";

const wrappedFont = DM_Sans({
  variable: "--font-wrapped-app",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weekly Recap v1",
  description:
    "Full-variable weekly recovery recap — compare with the simplified wrapped POC.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function WeeklyRecapV1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`spotify-wrapped-poc-theme min-h-screen ${wrappedFont.variable}`}>
      {children}
    </div>
  );
}
