// app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue, Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

// Substituiu Barlow Condensed — mais agressivo, industrial, próprio de fight sport
const rajdhani = Rajdhani({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

// Substituiu Barlow — Space Grotesk tem personalidade própria, não parece IA
const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Fight Club — Muay Thai & Boxe",
  description: "Academia de Muay Thai e Boxe em alto nível. Treinamento para adultos e crianças.",
  openGraph: {
    title: "Elite Fight Club",
    description: "Muay Thai & Boxe — Forje Campeões",
    images: ["/hero-fighter.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${rajdhani.variable} ${spaceGrotesk.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
