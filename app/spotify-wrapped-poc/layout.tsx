import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./theme.css";

const wrappedFont = Nunito_Sans({
  variable: "--font-wrapped-app",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spotify Wrapped-Style POC",
  description:
    "A proof-of-concept year-in-review page with randomized music recap data.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SpotifyWrappedPocLayout({
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
