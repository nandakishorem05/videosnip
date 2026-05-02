import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipBoost — Turn 1 Video Into 10 Viral Clips",
  description:
    "Transform your long-form videos into engaging Reels, Shorts, and TikToks. AI-powered repurposing for creators and small businesses.",
  keywords: ["video repurposing", "reels", "shorts", "tiktok", "content creator", "video editor"],
  authors: [{ name: "ClipBoost" }],
  openGraph: {
    title: "ClipBoost — Turn 1 Video Into 10 Viral Clips",
    description:
      "Transform your long-form videos into engaging Reels, Shorts, and TikToks.",
    type: "website",
    url: "https://clipboost.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipBoost — Turn 1 Video Into 10 Viral Clips",
    description:
      "Transform your long-form videos into engaging Reels, Shorts, and TikToks.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0a1e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              background: "rgba(18, 12, 35, 0.92)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              color: "#f8fafc",
            },
          }}
        />
      </body>
    </html>
  );
}
