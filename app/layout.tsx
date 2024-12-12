import "./globals.css";
import { Noto_Sans, Mea_Culpa, Viaoda_Libre } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const decorative = Viaoda_Libre({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-decorative",
});

const mea_culpa = Mea_Culpa({
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
        className={`${noto_sans.className} ${mea_culpa.variable} ${decorative.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
