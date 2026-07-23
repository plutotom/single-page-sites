import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./theme.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-grace-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ethical and Developmental Considerations of AI in Neuropsychology",
  description:
    "APA poster: narrative review of ethical considerations for AI-supported diagnostic and treatment practices in neuropsychology across pediatric, adult, and geriatric populations.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AiNeuropsychologyEthicsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`ai-neuro-ethics-theme min-h-screen font-sans ${sourceSerif.variable}`}
      style={{ fontFamily: "var(--font-grace-serif), serif" }}
    >
      {children}
    </div>
  );
}
