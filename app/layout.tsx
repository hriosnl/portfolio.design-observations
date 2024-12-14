import "./globals.css";
import { Noto_Sans, Mea_Culpa, Viaoda_Libre, Oxanium } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const viaoda_libre = Viaoda_Libre({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-viaoda-libre",
});

const mea_culpa = Mea_Culpa({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mea-culpa",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
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
        className={`${noto_sans.className} ${mea_culpa.variable} ${viaoda_libre.variable} ${oxanium.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
