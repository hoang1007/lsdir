import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/themeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "lsdir — Dead Simple Drive Index",
  description:
    "Stream, preview, and access your Google Drive like a hacker. Built for minimalists.",
  keywords: [
    "lsdir",
    "Google Drive Index",
    "stream Google Drive",
    "Next.js Drive Viewer",
    "open source drive indexer",
  ],
  authors: [{ name: "Suryakant Upadhyay" }],
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://drive.givenby.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
