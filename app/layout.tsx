import "./globals.css";

import { Noto_Sans, Mea_Culpa, Viaoda_Libre, Oxanium } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const display = Oxanium({
  subsets: ["latin"],
  variable: "--font-display",
});

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const decorative = Viaoda_Libre({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-viaoda-libre",
});

const cursive = Mea_Culpa({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mea-culpa",
});

export const metadata: Metadata = {
  title: "Design Observations",
  description: "Reflecting on the beauty of user interface designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto_sans.className} ${cursive.variable} ${decorative.variable} ${display.variable} antialiased`}
      >
        <div className="w-screen h-[100svh] md:h-screen flex justify-center items-center bg-black">
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
