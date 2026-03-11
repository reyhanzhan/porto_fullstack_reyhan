import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Reyhan | Full Stack & AI Engineer",
    template: "%s | Reyhan",
  },
  description:
    "I build AI-powered business systems for B2B. Full Stack Engineer delivering enterprise-grade solutions with measurable business impact.",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "B2B SaaS",
    "Next.js",
    "TypeScript",
    "MySQL",
  ],
  authors: [{ name: "Reyhan" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "reyhan.dev",
    title: "Reyhan | Full Stack & AI Engineer",
    description:
      "I build AI-powered business systems for B2B companies that drive measurable outcomes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
