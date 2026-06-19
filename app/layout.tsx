// app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Fight Club | Academia de Muay Thai — São Paulo",
  description:
    "A melhor academia de Muay Thai de São Paulo. Treine com campeões. Adulto e Kids.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
