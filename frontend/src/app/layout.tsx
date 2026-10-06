import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smile Care — Repair your smile. Restore your confidence.",
  description:
    "From whitening and fillings to implants, veneers, and crowns, Smile Care provides modern dental treatments designed around the result you want.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <body>
        {/* Flags JS so animated elements stay hidden until GSAP reveals them (no flash of content) */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        {children}
      </body>
    </html>
  );
}
