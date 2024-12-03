import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Mea_Culpa, Inter } from "next/font/google";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mea_culpa = Mea_Culpa({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mea-culpa",
});

export const metadata: Metadata = {
  title: "Design Observations",
  description: "Reflecting on the beauty of designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto_sans.className} ${mea_culpa.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
