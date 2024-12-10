import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Mea_Culpa, Inter } from "next/font/google";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: ["200", "300", "400"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inter",
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
        className={`${noto_sans.className} ${mea_culpa.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
