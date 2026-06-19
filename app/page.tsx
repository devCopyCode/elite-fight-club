// app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import Sobre from "./components/Sobre";
import Modalidades from "./components/Modalidades";
import Instrutores from "./components/Instrutores";
import Horarios from "./components/Horarios";
import Planos from "./components/Planos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import LangToggle from "./components/LangToggle";

type Lang = "pt" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ backgroundColor: "#0A0A0A" }}>
        <Hero lang={lang} />
        <MarqueeBanner />
        <Sobre lang={lang} />
        <Modalidades lang={lang} />
        <Instrutores lang={lang} />
        <Horarios lang={lang} />
        <Planos lang={lang} />
        <Contato lang={lang} />
      </main>
      <Footer lang={lang} />
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
