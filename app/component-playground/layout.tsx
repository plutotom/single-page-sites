import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./theme.css";

const appFont = Nunito_Sans({
  variable: "--font-playground-app",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Component Playground",
  description:
    "A route-scoped lab for trying component design directions in isolation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ComponentPlaygroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`component-playground-theme min-h-screen ${appFont.variable}`}
    >
      {children}
    </div>
  );
}
