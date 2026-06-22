# Elite Fight Club — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site completo da academia Elite Fight Club — Muay Thai premium, São Paulo — com visual editorial esportivo dark, bilíngue PT/EN, e animações framer-motion.

**Architecture:** App Router Next.js 16 com um único page.tsx orquestrando 10 componentes independentes. Estado de idioma (`'pt' | 'en'`) vive no page.tsx e desce como prop. Sem backend, sem API routes — site estático com imagens Unsplash.

**Tech Stack:** Next.js 16.2.9 · Tailwind v4 (`@tailwindcss/postcss`) · TypeScript · framer-motion 12 · lucide-react 1.21 · next/font/google (Bebas Neue + Barlow Condensed + Inter)

---

## Arquivo: estrutura completa

```
app/
  layout.tsx               ← html/body, fonts, metadata
  page.tsx                 ← orquestra seções + estado lang
  globals.css              ← @import tailwindcss + @theme tokens + keyframes marquee
  components/
    Navbar.tsx             ← fixo topo, mobile drawer, link CTA
    Hero.tsx               ← split 50/50, animações entrada, stats bar
    MarqueeBanner.tsx      ← faixa vermelha CSS marquee
    Sobre.tsx              ← countup stats + história + foto diagonal
    Modalidades.tsx        ← grid 3x2 cards com hover border
    Instrutores.tsx        ← grid 3 cards foto + overlay hover
    Horarios.tsx           ← tabela HTML semanal estilizada
    Planos.tsx             ← tabs Adulto/Kids, 3 cards cada
    Contato.tsx            ← formulário + endereço + sociais
    Footer.tsx             ← logo, links, copyright
    LangToggle.tsx         ← botão flutuante PT/EN bottom-right
next.config.ts             ← remotePatterns Unsplash
```

---

## Task 1: Fundação (globals.css + next.config.ts + layout.tsx)

**Files:**
- Create: `app/globals.css`
- Modify: `next.config.ts`
- Create: `app/layout.tsx`

- [ ] **Step 1: Criar globals.css**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-black: #0A0A0A;
  --color-red: #CC0000;
  --color-white: #F5F5F5;
  --color-gray: #1A1A1A;
  --color-gray-mid: #555555;
  --font-display: var(--font-bebas);
  --font-accent: var(--font-barlow);
  --font-body: var(--font-inter);
}

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0A0A0A;
    color: #F5F5F5;
    font-family: var(--font-inter), sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  .font-display {
    font-family: var(--font-bebas), sans-serif;
  }

  .font-accent {
    font-family: var(--font-barlow), sans-serif;
    font-style: italic;
    font-weight: 700;
  }

  .btn-red {
    background-color: #CC0000;
    color: #F5F5F5;
    font-family: var(--font-inter), sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.75rem 1.5rem;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
    transition: background-color 0.2s ease;
    display: inline-block;
  }

  .btn-red:hover {
    background-color: #aa0000;
  }

  .btn-outline {
    border: 1px solid #333;
    color: #888;
    font-family: var(--font-inter), sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.75rem 1.5rem;
    transition: border-color 0.2s ease, color 0.2s ease;
    display: inline-block;
  }

  .btn-outline:hover {
    border-color: #CC0000;
    color: #F5F5F5;
  }

  .section-label {
    font-family: var(--font-inter), sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #CC0000;
  }

  .section-title {
    font-family: var(--font-bebas), sans-serif;
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 0.9;
    text-transform: uppercase;
    color: #F5F5F5;
  }

  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

- [ ] **Step 2: Adicionar remotePatterns ao next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Criar layout.tsx com fontes**

```tsx
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
```

- [ ] **Step 4: Verificar que o servidor inicia sem erros**

```bash
cd elite-fight-club
npx next dev -p 3002
```

Esperado: servidor sobe em http://localhost:3002 sem erros de TypeScript ou módulos.

- [ ] **Step 5: Commit**

```bash
git init
git add app/globals.css app/layout.tsx next.config.ts
git commit -m "feat: foundation — globals.css tokens, layout.tsx fonts, next.config remotePatterns"
```

---

## Task 2: LangToggle + page.tsx base

**Files:**
- Create: `app/components/LangToggle.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Criar LangToggle.tsx**

```tsx
// app/components/LangToggle.tsx
"use client";

type Lang = "pt" | "en";

interface Props {
  lang: Lang;
  onToggle: () => void;
}

export default function LangToggle({ lang, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Mudar idioma para ${lang === "pt" ? "inglês" : "português"}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 border border-[#333] bg-[#0A0A0A] text-xs font-semibold tracking-widest uppercase overflow-hidden"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span
        className="px-3 py-2 transition-colors duration-200"
        style={{
          backgroundColor: lang === "pt" ? "#CC0000" : "transparent",
          color: lang === "pt" ? "#F5F5F5" : "#555",
        }}
      >
        PT
      </span>
      <span
        className="px-3 py-2 transition-colors duration-200"
        style={{
          backgroundColor: lang === "en" ? "#CC0000" : "transparent",
          color: lang === "en" ? "#F5F5F5" : "#555",
        }}
      >
        EN
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Criar page.tsx base (placeholder de seções)**

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import LangToggle from "./components/LangToggle";

type Lang = "pt" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <>
      <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
        <p style={{ color: "#F5F5F5", padding: "2rem" }}>
          Elite Fight Club — em construção
        </p>
      </main>
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
```

- [ ] **Step 3: Verificar no browser**

Abrir http://localhost:3002 — deve mostrar texto e toggle PT/EN no canto inferior direito. Clicar no toggle deve alternar a cor entre PT e EN.

- [ ] **Step 4: Commit**

```bash
git add app/components/LangToggle.tsx app/page.tsx
git commit -m "feat: LangToggle + page.tsx skeleton with lang state"
```

---

## Task 3: Navbar

**Files:**
- Create: `app/components/Navbar.tsx`
- Modify: `app/page.tsx` (adicionar `<Navbar>`)

- [ ] **Step 1: Criar Navbar.tsx**

```tsx
// app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type Lang = "pt" | "en";

const t = {
  pt: {
    links: ["Sobre", "Modalidades", "Instrutores", "Horários", "Planos"],
    cta: "Agende Aula",
  },
  en: {
    links: ["About", "Modalities", "Instructors", "Schedule", "Plans"],
    cta: "Book Class",
  },
};

const hrefs = ["#sobre", "#modalidades", "#instrutores", "#horarios", "#planos"];

interface Props {
  lang: Lang;
}

export default function Navbar({ lang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const labels = t[lang];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,10,10,0.96)"
            : "rgba(10,10,10,0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl tracking-wider text-[#F5F5F5]"
            aria-label="Elite Fight Club — início"
          >
            ELITE <span className="text-[#CC0000]">FIGHT</span> CLUB
          </a>

          {/* Links desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {labels.links.map((label, i) => (
              <a
                key={label}
                href={hrefs[i]}
                className="text-xs font-semibold tracking-widest uppercase text-[#888] hover:text-[#F5F5F5] transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <a href="#contato" className="hidden md:block btn-red">
            {labels.cta}
          </a>

          {/* Hamburguer mobile */}
          <button
            className="md:hidden text-[#F5F5F5] p-2"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0A]"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#1a1a1a]">
            <span className="font-display text-xl tracking-wider text-[#F5F5F5]">
              ELITE <span className="text-[#CC0000]">FIGHT</span> CLUB
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#F5F5F5] p-2"
              aria-label="Fechar menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-8" aria-label="Menu mobile">
            {labels.links.map((label, i) => (
              <a
                key={label}
                href={hrefs[i]}
                onClick={() => setOpen(false)}
                className="font-display text-4xl tracking-wide text-[#F5F5F5] hover:text-[#CC0000] transition-colors duration-200 py-2"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="px-6 pt-8">
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="btn-red"
            >
              {labels.cta}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Adicionar Navbar ao page.tsx**

Substituir o conteúdo de `app/page.tsx`:

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import LangToggle from "./components/LangToggle";

type Lang = "pt" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", paddingTop: "4rem" }}>
        <p style={{ color: "#F5F5F5", padding: "2rem" }}>
          Em construção...
        </p>
      </main>
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
```

- [ ] **Step 3: Verificar no browser**

- Navbar fixa no topo com blur
- Scroll down → background escurece + borda aparece
- Mobile: hamburguer abre drawer full-screen
- Toggle PT/EN muda os labels dos links

- [ ] **Step 4: Commit**

```bash
git add app/components/Navbar.tsx app/page.tsx
git commit -m "feat: Navbar — fixed, scroll blur, mobile drawer, bilíngue"
```

---

## Task 4: Hero

**Files:**
- Create: `app/components/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Hero.tsx**

```tsx
// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Lang = "pt" | "en";

const t = {
  pt: {
    label: "MUAY THAI · EST. 2018",
    line1: "ELITE",
    line2: "FIGHT",
    line3: "CLUB",
    body: "A arte marcial mais completa do mundo.\nTreine com os melhores de São Paulo.",
    cta1: "Comece Agora",
    cta2: "Ver Planos",
    stat1: { value: "500+", label: "Alunos" },
    stat2: { value: "15+", label: "Instrutores" },
    stat3: { value: "8", label: "Anos" },
    stat4: { value: "3", label: "Unidades" },
    imgAlt: "Lutador de Muay Thai em ação",
  },
  en: {
    label: "MUAY THAI · EST. 2018",
    line1: "ELITE",
    line2: "FIGHT",
    line3: "CLUB",
    body: "The most complete martial art in the world.\nTrain with the best in São Paulo.",
    cta1: "Start Now",
    cta2: "See Plans",
    stat1: { value: "500+", label: "Students" },
    stat2: { value: "15+", label: "Instructors" },
    stat3: { value: "8", label: "Years" },
    stat4: { value: "3", label: "Locations" },
    imgAlt: "Muay Thai fighter in action",
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface Props {
  lang: Lang;
}

export default function Hero({ lang }: Props) {
  const c = t[lang];

  return (
    <section
      id="hero"
      className="relative flex flex-col"
      style={{ backgroundColor: "#0A0A0A", minHeight: "100svh" }}
      aria-label="Hero — Elite Fight Club"
    >
      {/* Main split: left text / right image */}
      <div className="flex flex-1 flex-col md:flex-row" style={{ minHeight: "calc(100svh - 56px)" }}>
        {/* LEFT — text */}
        <motion.div
          className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-0 w-full md:w-1/2"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            className="section-label mb-4"
            variants={fadeUp}
          >
            {c.label}
          </motion.p>

          <motion.h1
            className="font-display leading-none uppercase"
            style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
            variants={stagger}
          >
            <motion.span className="block text-[#F5F5F5]" variants={fadeUp}>
              {c.line1}
            </motion.span>
            <motion.span
              className="block font-accent"
              style={{ color: "#CC0000", fontFamily: "var(--font-barlow)" }}
              variants={fadeUp}
            >
              {c.line2}
            </motion.span>
            <motion.span className="block text-[#F5F5F5]" variants={fadeUp}>
              {c.line3}
            </motion.span>
          </motion.h1>

          {/* Red divider line */}
          <motion.div
            className="my-6"
            style={{ width: "2.5rem", height: "1px", backgroundColor: "#CC0000" }}
            variants={fadeUp}
          />

          <motion.p
            className="text-sm leading-relaxed text-[#555] max-w-xs"
            style={{ fontFamily: "var(--font-inter)", whiteSpace: "pre-line" }}
            variants={fadeUp}
          >
            {c.body}
          </motion.p>

          <motion.div className="flex items-center gap-4 mt-8" variants={fadeUp}>
            <a href="#contato" className="btn-red">{c.cta1}</a>
            <a href="#planos" className="btn-outline">{c.cta2}</a>
          </motion.div>
        </motion.div>

        {/* Vertical red divider — desktop only */}
        <div
          className="hidden md:block w-px self-stretch mx-0"
          style={{
            background: "linear-gradient(to bottom, transparent 5%, #CC0000 30%, #CC0000 70%, transparent 95%)",
          }}
          aria-hidden="true"
        />

        {/* RIGHT — image */}
        <motion.div
          className="relative w-full md:w-1/2 overflow-hidden"
          style={{ minHeight: "340px" }}
          initial="hidden"
          animate="visible"
          variants={fadeRight}
        >
          <Image
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&q=80"
            alt={c.imgAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Dark overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 50%), linear-gradient(to top, #0A0A0A 0%, transparent 30%)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* STATS BAR — full width, breaks the grid */}
      <motion.div
        className="flex items-center border-t"
        style={{ borderColor: "#1a1a1a", backgroundColor: "rgba(10,10,10,0.95)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
      >
        {[c.stat1, c.stat2, c.stat3, c.stat4].map((stat, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center py-4 px-2"
            style={{
              borderRight: i < 3 ? "1px solid #1a1a1a" : "none",
            }}
          >
            <span
              className="font-display tabular-nums text-[#CC0000] leading-none"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {stat.value}
            </span>
            <span
              className="section-label mt-1"
              style={{ color: "#444", fontSize: "0.6rem" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Adicionar Hero ao page.tsx**

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LangToggle from "./components/LangToggle";

type Lang = "pt" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ backgroundColor: "#0A0A0A" }}>
        <Hero lang={lang} />
      </main>
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
```

- [ ] **Step 3: Verificar no browser**

- Hero renderiza split 50/50 com foto de lutador no lado direito
- Animações de entrada: texto da esquerda, imagem da direita
- Stats bar aparece na base, full width
- "FIGHT" em itálico vermelho
- Mobile: coluna única, imagem acima do texto

- [ ] **Step 4: Commit**

```bash
git add app/components/Hero.tsx app/page.tsx
git commit -m "feat: Hero — split editorial, framer-motion entrada, stats bar, bilíngue"
```

---

## Task 5: MarqueeBanner + Sobre

**Files:**
- Create: `app/components/MarqueeBanner.tsx`
- Create: `app/components/Sobre.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar MarqueeBanner.tsx**

```tsx
// app/components/MarqueeBanner.tsx
const text =
  "MUAY THAI · BOXE · KICKBOXING · DEFESA PESSOAL · FITNESS COMBAT · KIDS · ";

export default function MarqueeBanner() {
  // Duplicado 3x para loop visual perfeito
  const repeated = text.repeat(3);

  return (
    <div
      className="overflow-hidden py-3"
      style={{ backgroundColor: "#CC0000" }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 22s linear infinite",
          width: "fit-content",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "#F5F5F5",
          }}
        >
          {repeated}
        </span>
        {/* Duplicate for seamless loop */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "#F5F5F5",
          }}
          aria-hidden="true"
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Criar Sobre.tsx com countup**

```tsx
// app/components/Sobre.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

type Lang = "pt" | "en";

const t = {
  pt: {
    label: "— SOBRE NÓS",
    title1: "ONDE NASCE",
    title2: "CAMPEÕES",
    body: "Fundada em 2018 por mestres tailandeses com décadas de experiência, a Elite Fight Club é hoje referência em Muay Thai autêntico no Brasil. Nossa metodologia une tradição ancestral com treinamento de alta performance, formando atletas completos e pessoas melhores.",
    stats: [
      { value: 500, suffix: "+", label: "Alunos Ativos" },
      { value: 15, suffix: "+", label: "Instrutores" },
      { value: 8, suffix: "", label: "Anos de História" },
      { value: 3, suffix: "", label: "Unidades" },
    ],
    imgAlt: "Treino de Muay Thai na Elite Fight Club",
  },
  en: {
    label: "— ABOUT US",
    title1: "WHERE",
    title2: "CHAMPIONS ARE MADE",
    body: "Founded in 2018 by Thai masters with decades of experience, Elite Fight Club is today a reference in authentic Muay Thai in Brazil. Our methodology unites ancestral tradition with high-performance training, forming complete athletes and better people.",
    stats: [
      { value: 500, suffix: "+", label: "Active Students" },
      { value: 15, suffix: "+", label: "Instructors" },
      { value: 8, suffix: "", label: "Years of History" },
      { value: 3, suffix: "", label: "Locations" },
    ],
    imgAlt: "Muay Thai training at Elite Fight Club",
  },
};

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

interface Props {
  lang: Lang;
}

export default function Sobre({ lang }: Props) {
  const c = t[lang];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: "#0A0A0A" }}
      aria-labelledby="sobre-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1a1a1a] mb-20">
          {c.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{
                borderRight: i < c.stats.length - 1 ? "1px solid #1a1a1a" : "none",
              }}
            >
              <span
                className="font-display text-[#CC0000] leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="section-label mt-2" style={{ color: "#444", fontSize: "0.6rem" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content: text left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <p className="section-label mb-4">{c.label}</p>
            <h2 id="sobre-titulo" className="section-title mb-6">
              {c.title1}
              <br />
              <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
                {c.title2}
              </span>
            </h2>
            <div
              style={{ width: "2.5rem", height: "1px", backgroundColor: "#CC0000", marginBottom: "1.5rem" }}
              aria-hidden="true"
            />
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#888", fontFamily: "var(--font-inter)", maxWidth: "38ch" }}
            >
              {c.body}
            </p>
          </div>

          {/* Image with diagonal clip */}
          <div
            className="relative overflow-hidden"
            style={{
              height: "380px",
              clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=80"
              alt={c.imgAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.6) 100%)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Adicionar ao page.tsx**

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import Sobre from "./components/Sobre";
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
      </main>
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
```

- [ ] **Step 4: Verificar no browser**

- Marquee vermelho rola suavemente
- Stats animam contando ao scrollar até a seção
- Imagem com corte diagonal
- "CAMPEÕES" em itálico vermelho Barlow Condensed

- [ ] **Step 5: Commit**

```bash
git add app/components/MarqueeBanner.tsx app/components/Sobre.tsx app/page.tsx
git commit -m "feat: MarqueeBanner + Sobre com countup e imagem diagonal"
```

---

## Task 6: Modalidades

**Files:**
- Create: `app/components/Modalidades.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Modalidades.tsx**

```tsx
// app/components/Modalidades.tsx
"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Swords, Target, Zap, Shield, Flame, Star } from "lucide-react";

type Lang = "pt" | "en";

const icons = [Swords, Target, Zap, Shield, Flame, Star];

const t = {
  pt: {
    label: "— MODALIDADES",
    title1: "O QUE",
    title2: "ENSINAMOS",
    cards: [
      { name: "Muay Thai", desc: "A arte das oito armas. Socos, chutes, joelhadas e cotoveladas em treino técnico e intenso." },
      { name: "Boxe", desc: "Fundamentos sólidos de pugilismo. Técnica, timing e condicionamento de elite." },
      { name: "Kickboxing", desc: "Dinamismo e potência. União de boxe com chutes explosivos e movimentação de ringue." },
      { name: "Defesa Pessoal", desc: "Técnicas práticas para situações reais. Foco em eficiência e consciência situacional." },
      { name: "Fitness Combat", desc: "Alta intensidade com movimentos marciais. Queima calórica máxima, sem contato." },
      { name: "Kids", desc: "Disciplina, respeito e foco para crianças de 5 a 14 anos. Metodologia adaptada e segura." },
    ],
  },
  en: {
    label: "— MODALITIES",
    title1: "WHAT WE",
    title2: "TEACH",
    cards: [
      { name: "Muay Thai", desc: "The art of eight limbs. Punches, kicks, knees and elbows in technical and intense training." },
      { name: "Boxing", desc: "Solid pugilism fundamentals. Technique, timing and elite conditioning." },
      { name: "Kickboxing", desc: "Dynamism and power. Union of boxing with explosive kicks and ring movement." },
      { name: "Self Defense", desc: "Practical techniques for real situations. Focus on efficiency and situational awareness." },
      { name: "Fitness Combat", desc: "High intensity with martial movements. Maximum caloric burn, no contact." },
      { name: "Kids", desc: "Discipline, respect and focus for children aged 5 to 14. Adapted and safe methodology." },
    ],
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

interface Props {
  lang: Lang;
}

export default function Modalidades({ lang }: Props) {
  const c = t[lang];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="modalidades"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: "#0d0d0d" }}
      aria-labelledby="modalidades-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="modalidades-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
          {c.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={card.name}
                custom={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                className="group flex flex-col gap-4 p-8 bg-[#0d0d0d] transition-colors duration-300 cursor-default"
                style={{ borderBottom: "1px solid #1a1a1a" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(204,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.outline = "1px solid #CC0000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "#0d0d0d";
                  (e.currentTarget as HTMLDivElement).style.outline = "1px solid transparent";
                }}
              >
                <Icon
                  size={24}
                  color="#CC0000"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3
                  className="font-display text-2xl text-[#F5F5F5] uppercase tracking-wide"
                >
                  {card.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#666", fontFamily: "var(--font-inter)" }}
                >
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Adicionar ao page.tsx**

Adicionar `import Modalidades` e `<Modalidades lang={lang} />` após `<Sobre>` em `app/page.tsx`.

- [ ] **Step 3: Verificar no browser**

- Grid 3×2 de cards
- Hover: borda vermelha aparece sem escalar o card
- Ícones lucide-react em vermelho
- Cards animam em stagger ao scrollar

- [ ] **Step 4: Commit**

```bash
git add app/components/Modalidades.tsx app/page.tsx
git commit -m "feat: Modalidades — grid 3x2, hover borda vermelha, stagger animation"
```

---

## Task 7: Instrutores

**Files:**
- Create: `app/components/Instrutores.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Instrutores.tsx**

```tsx
// app/components/Instrutores.tsx
"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import Image from "next/image";

type Lang = "pt" | "en";

const instructors = [
  {
    name: "Mestre Kru Somchai",
    titlePt: "Head Coach · Muay Thai",
    titleEn: "Head Coach · Muay Thai",
    years: "22",
    img: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=600&q=80",
  },
  {
    name: "Felipe Carvalho",
    titlePt: "Boxe & Kickboxing",
    titleEn: "Boxing & Kickboxing",
    years: "14",
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
  },
  {
    name: "Ana Beatriz Lima",
    titlePt: "Kids & Fitness Combat",
    titleEn: "Kids & Fitness Combat",
    years: "9",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
];

const t = {
  pt: { label: "— INSTRUTORES", title1: "NOSSO", title2: "TIME", years: "anos" },
  en: { label: "— INSTRUCTORS", title1: "OUR", title2: "TEAM", years: "years" },
};

interface Props {
  lang: Lang;
}

export default function Instrutores({ lang }: Props) {
  const c = t[lang];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="instrutores"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: "#111" }}
      aria-labelledby="instrutores-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="instrutores-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructors.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="group relative overflow-hidden"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ height: "320px" }}>
                <Image
                  src={inst.img}
                  alt={inst.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "grayscale(30%)" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Red overlay on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: "rgba(204,0,0,0.15)",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, #0d0d0d 0%, transparent 50%)" }}
                  aria-hidden="true"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div
                  className="mb-1 text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#CC0000", fontFamily: "var(--font-inter)" }}
                >
                  {lang === "pt" ? inst.titlePt : inst.titleEn}
                </div>
                <h3 className="font-display text-2xl text-[#F5F5F5] uppercase tracking-wide">
                  {inst.name}
                </h3>
                <p
                  className="text-xs mt-2"
                  style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                >
                  {inst.years} {c.years}
                </p>
              </div>

              {/* Bottom red accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                style={{ backgroundColor: "#CC0000", transform: "scaleX(0)", transformOrigin: "left" }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Adicionar ao page.tsx**

Adicionar `import Instrutores` e `<Instrutores lang={lang} />` após `<Modalidades>`.

- [ ] **Step 3: Verificar no browser**

- 3 cards de instrutores com foto
- Hover: leve zoom na foto + overlay vermelho

- [ ] **Step 4: Commit**

```bash
git add app/components/Instrutores.tsx app/page.tsx
git commit -m "feat: Instrutores — cards com foto, overlay vermelho no hover"
```

---

## Task 8: Horários + Planos

**Files:**
- Create: `app/components/Horarios.tsx`
- Create: `app/components/Planos.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Horarios.tsx**

```tsx
// app/components/Horarios.tsx
"use client";

type Lang = "pt" | "en";

const t = {
  pt: {
    label: "— HORÁRIOS",
    title1: "GRADE",
    title2: "SEMANAL",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    schedule: [
      { time: "06:00", classes: ["Muay Thai", "", "Muay Thai", "", "Muay Thai", "Boxe"] },
      { time: "08:00", classes: ["Boxe", "Kickboxing", "Boxe", "Kickboxing", "Boxe", "Muay Thai"] },
      { time: "12:00", classes: ["Fitness", "", "Fitness", "", "Fitness", ""] },
      { time: "18:00", classes: ["Muay Thai", "Kids", "Muay Thai", "Kids", "Muay Thai", ""] },
      { time: "19:00", classes: ["Kickboxing", "Muay Thai", "Kickboxing", "Muay Thai", "Kickboxing", ""] },
      { time: "20:00", classes: ["Def. Pessoal", "Boxe", "Def. Pessoal", "Boxe", "Def. Pessoal", ""] },
    ],
  },
  en: {
    label: "— SCHEDULE",
    title1: "WEEKLY",
    title2: "SCHEDULE",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    schedule: [
      { time: "06:00", classes: ["Muay Thai", "", "Muay Thai", "", "Muay Thai", "Boxing"] },
      { time: "08:00", classes: ["Boxing", "Kickboxing", "Boxing", "Kickboxing", "Boxing", "Muay Thai"] },
      { time: "12:00", classes: ["Fitness", "", "Fitness", "", "Fitness", ""] },
      { time: "18:00", classes: ["Muay Thai", "Kids", "Muay Thai", "Kids", "Muay Thai", ""] },
      { time: "19:00", classes: ["Kickboxing", "Muay Thai", "Kickboxing", "Muay Thai", "Kickboxing", ""] },
      { time: "20:00", classes: ["Self Defense", "Boxing", "Self Defense", "Boxing", "Self Defense", ""] },
    ],
  },
};

const classColor: Record<string, string> = {
  "Muay Thai": "#CC0000",
  "Boxe": "#444",
  "Boxing": "#444",
  "Kickboxing": "#333",
  "Kids": "#553300",
  "Fitness": "#1a3a1a",
  "Def. Pessoal": "#2a2a44",
  "Self Defense": "#2a2a44",
  "Fitness Combat": "#1a3a1a",
};

interface Props {
  lang: Lang;
}

export default function Horarios({ lang }: Props) {
  const c = t[lang];

  return (
    <section
      id="horarios"
      className="py-20 md:py-32"
      style={{ backgroundColor: "#0A0A0A" }}
      aria-labelledby="horarios-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="horarios-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]" role="grid" aria-label={c.title1 + " " + c.title2}>
            <thead>
              <tr>
                <th
                  className="text-left py-3 pr-4 text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#444", fontFamily: "var(--font-inter)", width: "72px" }}
                  scope="col"
                >
                  {lang === "pt" ? "Hora" : "Time"}
                </th>
                {c.days.map((day) => (
                  <th
                    key={day}
                    className="py-3 px-2 text-center text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "#888", fontFamily: "var(--font-inter)" }}
                    scope="col"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.schedule.map((row) => (
                <tr key={row.time} style={{ borderTop: "1px solid #1a1a1a" }}>
                  <td
                    className="py-4 pr-4 text-xs font-semibold tabular-nums"
                    style={{ color: "#444", fontFamily: "var(--font-inter)" }}
                  >
                    {row.time}
                  </td>
                  {row.classes.map((cls, i) => (
                    <td key={i} className="py-2 px-2 text-center">
                      {cls ? (
                        <span
                          className="inline-block px-2 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: classColor[cls] || "#1a1a1a",
                            color: "#F5F5F5",
                            fontFamily: "var(--font-inter)",
                            letterSpacing: "0.05em",
                            fontSize: "0.65rem",
                          }}
                        >
                          {cls}
                        </span>
                      ) : (
                        <span style={{ color: "#222", fontSize: "0.75rem" }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Criar Planos.tsx**

```tsx
// app/components/Planos.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Lang = "pt" | "en";
type Tab = "adulto" | "kids";

const t = {
  pt: {
    label: "— PLANOS",
    title1: "ESCOLHA",
    title2: "SEU PLANO",
    tabs: { adulto: "Adulto", kids: "Kids" },
    popular: "MAIS POPULAR",
    cta: "Assinar Plano",
    plans: {
      adulto: [
        {
          name: "Básico",
          price: "R$ 189",
          period: "/mês",
          features: ["2 aulas por semana", "Acesso à academia", "Equipamento básico", "App de treino"],
        },
        {
          name: "Intermediário",
          price: "R$ 279",
          period: "/mês",
          popular: true,
          features: ["Aulas ilimitadas", "Todas as modalidades", "Equipamento completo", "Avaliação mensal", "App de treino"],
        },
        {
          name: "Premium",
          price: "R$ 399",
          period: "/mês",
          features: ["Aulas ilimitadas", "Todas as modalidades", "Personal trainer", "Nutrição esportiva", "Avaliação semanal", "App premium"],
        },
      ],
      kids: [
        {
          name: "Básico Kids",
          price: "R$ 149",
          period: "/mês",
          features: ["2 aulas por semana", "Uniforme incluído", "Material didático", "App parental"],
        },
        {
          name: "Intermediário Kids",
          price: "R$ 219",
          period: "/mês",
          popular: true,
          features: ["Aulas ilimitadas", "Uniforme incluído", "Material didático", "Avaliação mensal", "App parental"],
        },
        {
          name: "Premium Kids",
          price: "R$ 319",
          period: "/mês",
          features: ["Aulas ilimitadas", "Uniforme premium", "Acompanhamento individual", "Nutrição infantil", "Competições", "App parental"],
        },
      ],
    },
  },
  en: {
    label: "— PLANS",
    title1: "CHOOSE",
    title2: "YOUR PLAN",
    tabs: { adulto: "Adult", kids: "Kids" },
    popular: "MOST POPULAR",
    cta: "Subscribe",
    plans: {
      adulto: [
        {
          name: "Basic",
          price: "R$ 189",
          period: "/mo",
          features: ["2 classes per week", "Academy access", "Basic equipment", "Training app"],
        },
        {
          name: "Intermediate",
          price: "R$ 279",
          period: "/mo",
          popular: true,
          features: ["Unlimited classes", "All modalities", "Full equipment", "Monthly assessment", "Training app"],
        },
        {
          name: "Premium",
          price: "R$ 399",
          period: "/mo",
          features: ["Unlimited classes", "All modalities", "Personal trainer", "Sports nutrition", "Weekly assessment", "Premium app"],
        },
      ],
      kids: [
        {
          name: "Basic Kids",
          price: "R$ 149",
          period: "/mo",
          features: ["2 classes per week", "Uniform included", "Learning materials", "Parental app"],
        },
        {
          name: "Intermediate Kids",
          price: "R$ 219",
          period: "/mo",
          popular: true,
          features: ["Unlimited classes", "Uniform included", "Learning materials", "Monthly assessment", "Parental app"],
        },
        {
          name: "Premium Kids",
          price: "R$ 319",
          period: "/mo",
          features: ["Unlimited classes", "Premium uniform", "Individual coaching", "Child nutrition", "Competitions", "Parental app"],
        },
      ],
    },
  },
};

interface Props {
  lang: Lang;
}

export default function Planos({ lang }: Props) {
  const [tab, setTab] = useState<Tab>("adulto");
  const c = t[lang];
  const plans = c.plans[tab];

  return (
    <section
      id="planos"
      className="py-20 md:py-32"
      style={{ backgroundColor: "#0d0d0d" }}
      aria-labelledby="planos-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-10">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="planos-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-12 border border-[#1a1a1a] w-fit" role="tablist">
          {(["adulto", "kids"] as Tab[]).map((t_) => (
            <button
              key={t_}
              role="tab"
              aria-selected={tab === t_}
              onClick={() => setTab(t_)}
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: tab === t_ ? "#CC0000" : "transparent",
                color: tab === t_ ? "#F5F5F5" : "#555",
              }}
            >
              {c.tabs[t_]}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col p-8 relative"
              style={{
                backgroundColor: "#0d0d0d",
                border: "popular" in plan && plan.popular ? "1px solid #CC0000" : "1px solid transparent",
                outline: "popular" in plan && plan.popular ? "none" : "none",
              }}
            >
              {"popular" in plan && plan.popular && (
                <div
                  className="absolute top-0 right-6 px-3 py-1 text-xs font-semibold tracking-widest"
                  style={{
                    backgroundColor: "#CC0000",
                    color: "#F5F5F5",
                    fontFamily: "var(--font-inter)",
                    transform: "translateY(-50%)",
                  }}
                >
                  {c.popular}
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="font-display text-2xl text-[#F5F5F5] uppercase tracking-wide mb-4"
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display text-[#CC0000]"
                    style={{ fontSize: "2.5rem", lineHeight: 1 }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <div
                style={{ width: "2rem", height: "1px", backgroundColor: "#CC0000", marginBottom: "1.5rem" }}
                aria-hidden="true"
              />

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={14} color="#CC0000" strokeWidth={2} aria-hidden="true" className="mt-0.5 flex-shrink-0" />
                    <span
                      className="text-sm"
                      style={{ color: "#888", fontFamily: "var(--font-inter)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#contato" className="btn-red text-center">
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Adicionar ao page.tsx**

Adicionar imports e componentes `<Horarios lang={lang} />` e `<Planos lang={lang} />` após `<Instrutores>`.

- [ ] **Step 4: Verificar no browser**

- Tabela de horários renderiza corretamente, scroll horizontal em mobile
- Tabs Adulto/Kids alternam os planos
- Card "Intermediário" tem borda vermelha e badge "MAIS POPULAR"

- [ ] **Step 5: Commit**

```bash
git add app/components/Horarios.tsx app/components/Planos.tsx app/page.tsx
git commit -m "feat: Horarios tabela semanal + Planos com tabs Adulto/Kids"
```

---

## Task 9: Contato + Footer

**Files:**
- Create: `app/components/Contato.tsx`
- Create: `app/components/Footer.tsx`
- Modify: `app/page.tsx` (versão final completa)

- [ ] **Step 1: Criar Contato.tsx**

```tsx
// app/components/Contato.tsx
"use client";

import { useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";

type Lang = "pt" | "en";

const t = {
  pt: {
    label: "— CONTATO",
    title1: "FALE",
    title2: "CONOSCO",
    fields: {
      name: "Nome completo",
      email: "E-mail",
      phone: "WhatsApp",
      message: "Mensagem",
    },
    cta: "Enviar Mensagem",
    sending: "Enviando...",
    sent: "Mensagem enviada!",
    address: "Rua das Artes Marciais, 123 — Vila Madalena, São Paulo/SP",
    phone: "+55 (11) 99999-9999",
    socials: [
      { label: "IG", href: "#" },
      { label: "YT", href: "#" },
      { label: "FB", href: "#" },
    ],
  },
  en: {
    label: "— CONTACT",
    title1: "GET IN",
    title2: "TOUCH",
    fields: {
      name: "Full name",
      email: "Email",
      phone: "WhatsApp",
      message: "Message",
    },
    cta: "Send Message",
    sending: "Sending...",
    sent: "Message sent!",
    address: "Rua das Artes Marciais, 123 — Vila Madalena, São Paulo/SP",
    phone: "+55 (11) 99999-9999",
    socials: [
      { label: "IG", href: "#" },
      { label: "YT", href: "#" },
      { label: "FB", href: "#" },
    ],
  },
};

interface Props {
  lang: Lang;
}

export default function Contato({ lang }: Props) {
  const c = t[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  }

  return (
    <section
      id="contato"
      className="py-20 md:py-32"
      style={{ backgroundColor: "#111" }}
      aria-labelledby="contato-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="contato-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label
                  htmlFor={`field-${field}`}
                  className="section-label"
                  style={{ fontSize: "0.6rem" }}
                >
                  {c.fields[field]}
                </label>
                <input
                  id={`field-${field}`}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  required
                  autoComplete={field === "email" ? "email" : field === "phone" ? "tel" : "name"}
                  className="bg-transparent border border-[#1a1a1a] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors duration-200 focus:border-[#CC0000]"
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-required="true"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="field-message"
                className="section-label"
                style={{ fontSize: "0.6rem" }}
              >
                {c.fields.message}
              </label>
              <textarea
                id="field-message"
                rows={4}
                required
                className="bg-transparent border border-[#1a1a1a] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors duration-200 focus:border-[#CC0000] resize-none"
                style={{ fontFamily: "var(--font-inter)" }}
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              disabled={status !== "idle"}
              className="btn-red mt-2 text-center"
              style={{ opacity: status !== "idle" ? 0.7 : 1 }}
            >
              {status === "idle" ? c.cta : status === "sending" ? c.sending : c.sent}
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin size={18} color="#CC0000" strokeWidth={1.5} aria-hidden="true" className="mt-1 flex-shrink-0" />
              <p className="text-sm leading-relaxed" style={{ color: "#888", fontFamily: "var(--font-inter)" }}>
                {c.address}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} color="#CC0000" strokeWidth={1.5} aria-hidden="true" className="flex-shrink-0" />
              <a
                href={`tel:${c.phone.replace(/\D/g, "")}`}
                className="text-sm"
                style={{ color: "#888", fontFamily: "var(--font-inter)" }}
              >
                {c.phone}
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-4">
              {c.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center gap-1 text-xs font-semibold tracking-widest border border-[#1a1a1a] px-3 py-2 hover:border-[#CC0000] hover:text-[#CC0000] transition-colors duration-200"
                  style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                  <ExternalLink size={10} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Map embed */}
            <div className="relative overflow-hidden" style={{ height: "220px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0774442539393!2d-46.6908!3d-23.5558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzIwLjkiUyA0NsKwNDEnMjYuOSJX!5e0!3m2!1spt!2sbr!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Elite Fight Club"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Criar Footer.tsx**

```tsx
// app/components/Footer.tsx
type Lang = "pt" | "en";

const t = {
  pt: {
    tagline: "Forjando campeões desde 2018.",
    links: [
      { label: "Sobre", href: "#sobre" },
      { label: "Modalidades", href: "#modalidades" },
      { label: "Instrutores", href: "#instrutores" },
      { label: "Horários", href: "#horarios" },
      { label: "Planos", href: "#planos" },
    ],
    copyright: "© 2026 Elite Fight Club. Todos os direitos reservados.",
  },
  en: {
    tagline: "Forging champions since 2018.",
    links: [
      { label: "About", href: "#sobre" },
      { label: "Modalities", href: "#modalidades" },
      { label: "Instructors", href: "#instrutores" },
      { label: "Schedule", href: "#horarios" },
      { label: "Plans", href: "#planos" },
    ],
    copyright: "© 2026 Elite Fight Club. All rights reserved.",
  },
};

interface Props {
  lang: Lang;
}

export default function Footer({ lang }: Props) {
  const c = t[lang];

  return (
    <footer
      className="py-12"
      style={{ backgroundColor: "#0A0A0A", borderTop: "1px solid #CC0000" }}
      aria-label="Rodapé"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <p className="font-display text-2xl tracking-wider text-[#F5F5F5] mb-2">
              ELITE <span className="text-[#CC0000]">FIGHT</span> CLUB
            </p>
            <p className="text-xs" style={{ color: "#444", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
              {c.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap gap-6">
              {c.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold tracking-widest uppercase hover:text-[#CC0000] transition-colors duration-200"
                    style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          style={{ borderTop: "1px solid #1a1a1a", paddingTop: "2rem" }}
        >
          <p
            className="text-xs text-center"
            style={{ color: "#333", fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
          >
            {c.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: page.tsx final completo**

```tsx
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
```

- [ ] **Step 4: Verificar no browser**

- Formulário renderiza com labels visíveis, focus em vermelho
- Mapa embed renderiza (com filtro grayscale)
- Botão "Enviar" mostra estado "Enviando..." e "Enviada!"
- Footer com linha vermelha no topo

- [ ] **Step 5: Commit**

```bash
git add app/components/Contato.tsx app/components/Footer.tsx app/page.tsx
git commit -m "feat: Contato formulário + mapa + Footer — site completo"
```

---

## Task 10: Verificação final

**Files:** nenhum novo

- [ ] **Step 1: Build de produção**

```bash
cd elite-fight-club
npx next build
```

Esperado: build completa sem erros TypeScript ou de compilação.

- [ ] **Step 2: Checar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: 0 erros.

- [ ] **Step 3: Checklist visual no browser (http://localhost:3002)**

Verificar cada item:
- [ ] Navbar fixa, blur, hamburguer mobile funciona
- [ ] Hero: foto carrega, animações entram suavemente, stats bar visível
- [ ] "FIGHT" em itálico vermelho Barlow Condensed (não Arial)
- [ ] Marquee vermelho rola sem parar
- [ ] Sobre: countup anima ao scrollar
- [ ] Modalidades: hover borda vermelha, sem scale
- [ ] Instrutores: 3 cards, hover overlay funciona
- [ ] Horários: tabela legível, scroll horizontal no mobile
- [ ] Planos: tabs alternam, badge "MAIS POPULAR" no card intermediário
- [ ] Contato: form com labels, focus vermelho, submit funciona
- [ ] Footer: linha vermelha no topo, copyright
- [ ] Toggle PT/EN: todos os textos mudam corretamente
- [ ] Sem erros no console do browser

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat: Elite Fight Club — site completo, verificado, bilíngue PT/EN"
```
