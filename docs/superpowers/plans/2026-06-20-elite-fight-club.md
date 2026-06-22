# Elite Fight Club — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site premium da academia Elite Fight Club com 13 seções, Three.js intro, GSAP ScrollTrigger e design dark-cinematic agressivo.

**Architecture:** Next.js 16 App Router com TypeScript. Componentes animados isolados com `"use client"`. Three.js e GSAP rodam exclusivamente em `useEffect` com cleanup rigoroso. Lenis smooth scroll como provider global.

**Tech Stack:** Next.js 16, TypeScript, Tailwind v4, GSAP + ScrollTrigger, Three.js, Lenis, next/font (Bebas Neue + Barlow), @phosphor-icons/react

**Pasta do projeto:** `C:\Users\vinicius\portifolio\elite-fight-club`

---

## Mapa de Arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/globals.css` | Modificar | CSS variables, reset global, animações utilitárias |
| `app/layout.tsx` | Modificar | Fonts, Lenis provider, metadata |
| `app/page.tsx` | Substituir | Orquestração das 13 seções, sem lang toggle |
| `app/components/Intro3D.tsx` | Substituir | Three.js canvas — partículas formando "EFC" |
| `app/components/Nav.tsx` | Substituir | Nav fixa, transparente → sólida no scroll |
| `app/components/Hero.tsx` | Substituir | Full bleed, Bebas Neue, GSAP entrada |
| `app/components/StatsBar.tsx` | Substituir | Seção vermelha, 4 contadores animados |
| `app/components/Sobre.tsx` | Substituir | Layout 60/40, parallax na foto |
| `app/components/Programas.tsx` | Substituir | Split diagonal, slide-in dos lados |
| `app/components/Galeria.tsx` | Substituir | GSAP horizontal pin + scrub |
| `app/components/Horarios.tsx` | Substituir | Tabela editorial |
| `app/components/Planos.tsx` | Substituir | Toggle adulto/infantil, GSAP crossfade |
| `app/components/Instrutores.tsx` | Substituir | Grid staggered, hover P&B → cor |
| `app/components/Depoimentos.tsx` | Substituir | Drag scroll + marquee |
| `app/components/CTAFinal.tsx` | Substituir | Full-width impactante |
| `app/components/Footer.tsx` | Substituir | 3 colunas, redes sociais |
| `app/components/LangToggle.tsx` | Deletar | PT-BR only, não necessário |
| `app/components/MarqueeBanner.tsx` | Deletar | Absorvido em Depoimentos |
| `app/components/Showreel.tsx` | Deletar | Absorvido em Hero |
| `app/components/Modalidades.tsx` | Renomear para Programas | |
| `app/components/Contato.tsx` | Absorvido no Footer | |
| `public/gym-exterior.jpg` | Copiar | De referencia para public |
| `hooks/useLenis.ts` | Criar | Hook para instância do Lenis |
| `hooks/useCountUp.ts` | Criar | Counter animado com IntersectionObserver |

---

## Task 0: Instalar dependências e copiar imagens

**Files:**
- Modify: `package.json`
- Copy: `public/gym-exterior.jpg`

- [ ] **Step 1: Instalar pacotes**

```bash
cd "C:\Users\vinicius\portifolio\elite-fight-club"
npm install gsap three lenis @phosphor-icons/react
npm install --save-dev @types/three
```

Resultado esperado: `added N packages` sem erros.

- [ ] **Step 2: Copiar imagem da fachada para public**

```bash
cp "C:\Users\vinicius\portifolio\academia\referencia\ChatGPT Image 20 de jun. de 2026, 00_35_22.png" "C:\Users\vinicius\portifolio\elite-fight-club\public\gym-exterior.jpg"
cp "C:\Users\vinicius\portifolio\academia\referencia\ChatGPT Image 19 de jun. de 2026, 00_05_47.png" "C:\Users\vinicius\portifolio\elite-fight-club\public\hero-fighter.jpg"
```

- [ ] **Step 3: Verificar que os arquivos estão em public/**

```bash
ls "C:\Users\vinicius\portifolio\elite-fight-club\public"
```

Resultado esperado: `hero-fighter.jpg`, `gym-exterior.jpg` presentes.

---

## Task 1: globals.css — CSS Variables e Reset

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Substituir globals.css completamente**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --black: #080808;
  --black-2: #111111;
  --black-3: #0D0D0D;
  --red: #C8102E;
  --white: #F0F0F0;
  --gray: #444444;
  --gray-dark: #1A1A1A;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  border-radius: 0 !important;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: auto; /* Lenis cuida disso */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--black);
  color: var(--white);
  overflow-x: hidden;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--black); }
::-webkit-scrollbar-thumb { background: var(--red); }

/* Botão base — clip angular */
.btn-angular {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%);
  font-family: var(--font-bebas);
  font-size: 18px;
  letter-spacing: 3px;
  transition: opacity 0.2s, transform 0.1s;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
}
.btn-angular:active { transform: scale(0.97); }
.btn-angular--red { background: var(--red); color: var(--white); }
.btn-angular--outline {
  background: transparent;
  color: var(--white);
  clip-path: none;
  border: 1px solid var(--gray-dark);
}

/* Linha vermelha decorativa */
.red-line {
  display: block;
  width: 40px;
  height: 3px;
  background: var(--red);
}

/* Eyebrow */
.eyebrow {
  font-family: var(--font-barlow-condensed);
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--red);
}

/* Seção com corte diagonal */
.section-diagonal {
  clip-path: polygon(0 4%, 100% 0, 100% 96%, 0 100%);
  margin: -40px 0;
  padding: 80px 0;
}

/* Grain overlay — apenas em pseudo-elemento fixo */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.4;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Rodar dev server para verificar sem erros de CSS**

```bash
cd "C:\Users\vinicius\portifolio\elite-fight-club"
npm run dev
```

Acesse `http://localhost:3000`. Resultado: tela preta sem erros no console.

---

## Task 2: layout.tsx — Fonts e Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Substituir layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400"],
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
    <html lang="pt-BR" className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
```

---

## Task 3: hooks/useCountUp.ts

**Files:**
- Create: `hooks/useCountUp.ts`

- [ ] **Step 1: Criar hook de counter animado**

```ts
// hooks/useCountUp.ts
import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();

          function update(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}
```

---

## Task 4: Intro3D.tsx — Three.js Particles

**Files:**
- Modify: `app/components/Intro3D.tsx`

- [ ] **Step 1: Substituir Intro3D.tsx**

```tsx
// app/components/Intro3D.tsx
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface Props {
  onComplete: () => void;
}

export default function Intro3D({ onComplete }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = mountRef.current;
    if (!el) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x080808, 1);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Gera posições alvo via canvas 2D
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 600;
    textCanvas.height = 200;
    const ctx = textCanvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 160px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("EFC", 300, 100);

    const imageData = ctx.getImageData(0, 0, 600, 200);
    const targetPositions: number[] = [];

    for (let y = 0; y < 200; y += 5) {
      for (let x = 0; x < 600; x += 5) {
        const i = (y * 600 + x) * 4;
        if (imageData.data[i + 3] > 128) {
          targetPositions.push(
            (x / 600 - 0.5) * 10,
            -(y / 200 - 0.5) * 3.5,
            0
          );
        }
      }
    }

    const count = targetPositions.length / 3;
    const initArr = new Float32Array(count * 3);
    const targetArr = new Float32Array(targetPositions);

    for (let i = 0; i < count * 3; i++) {
      initArr[i] = (Math.random() - 0.5) * 20;
    }

    const currentArr = initArr.slice();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(currentArr, 3));

    const material = new THREE.PointsMaterial({
      color: 0xc8102e,
      size: window.innerWidth < 768 ? 0.08 : 0.05,
      transparent: true,
      opacity: 1,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animação das partículas
    const proxy = { t: 0 };
    const tween = gsap.to(proxy, {
      t: 1,
      duration: 2,
      ease: "power3.out",
      onUpdate() {
        const t = proxy.t;
        for (let i = 0; i < count * 3; i++) {
          currentArr[i] = initArr[i] + (targetArr[i] - initArr[i]) * t;
        }
        geometry.attributes.position.needsUpdate = true;
      },
      onComplete() {
        // Segura 0.5s depois faz fade out
        gsap.delayedCall(0.5, () => {
          gsap.to(material, {
            opacity: 0,
            duration: 0.8,
            onComplete: onComplete,
          });
        });
      },
    });

    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      tween.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [onComplete]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        background: "#080808",
      }}
    />
  );
}
```

---

## Task 5: Nav.tsx — Navegação Fixa

**Files:**
- Modify: `app/components/Nav.tsx`

- [ ] **Step 1: Substituir Nav.tsx**

```tsx
// app/components/Nav.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = ["Programas", "Horários", "Planos", "Instrutores", "Contato"];
const ids   = ["programas", "horarios", "planos", "instrutores", "footer"];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: "72px",
          transition: "background 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "22px",
            letterSpacing: "4px",
            color: "var(--white)",
          }}
        >
          ELITE{" "}
          <span style={{ color: "var(--red)" }}>FIGHT</span> CLUB
        </div>

        {/* Links desktop */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
          className="nav-links"
        >
          {links.map((label, i) => (
            <button
              key={label}
              onClick={() => scrollTo(ids[i])}
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gray)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("planos")}
            className="btn-angular btn-angular--red"
            style={{ fontSize: "13px", padding: "8px 20px" }}
          >
            AULA GRÁTIS
          </button>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: "5px",
          }}
          className="hamburger"
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--white)",
                transition: "transform 0.2s, opacity 0.2s",
                transform:
                  menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "scaleX(0)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Menu fullscreen mobile */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "#080808",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {links.map((label, i) => (
            <button
              key={label}
              onClick={() => scrollTo(ids[i])}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "48px",
                letterSpacing: "4px",
                color: "var(--white)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("planos")}
            className="btn-angular btn-angular--red"
            style={{ fontSize: "18px" }}
          >
            AULA GRÁTIS
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
```

---

## Task 6: Hero.tsx — Full Bleed com GSAP

**Files:**
- Modify: `app/components/Hero.tsx`

- [ ] **Step 1: Substituir Hero.tsx**

```tsx
// app/components/Hero.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6 })
        .from(headlineRef.current, { y: 60, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(statsRef.current?.children ?? [], {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.5,
        }, "-=0.3")
        .from(ctaRef.current?.children ?? [], {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.5,
        }, "-=0.2");
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/hero-fighter.jpg"
          alt="Lutador de Muay Thai"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: 0.5,
            filter: "grayscale(20%)",
          }}
        />
      </div>

      {/* Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(8,8,8,0.97) 35%, rgba(8,8,8,0.4) 70%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 40%)",
        }}
      />

      {/* Red diagonal accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "25%",
          height: "100%",
          background: "rgba(200,16,46,0.12)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Bottom red line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, var(--red) 30%, transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 5vw",
          maxWidth: "800px",
        }}
      >
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <span className="red-line" />
          <span className="eyebrow">Muay Thai · Desde 2012</span>
        </div>

        <div
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(72px, 12vw, 130px)",
            lineHeight: 0.88,
            color: "var(--white)",
            marginBottom: "32px",
          }}
        >
          FORJE
          <br />
          <span style={{ color: "var(--red)" }}>CAMPEÕES</span>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: "flex",
            gap: "40px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "600+", label: "Alunos Ativos" },
            { num: "14", label: "Anos de Arte" },
            { num: "42", label: "Títulos" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "36px",
                  color: "var(--white)",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "9px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--gray)",
                  marginTop: "2px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            className="btn-angular btn-angular--red"
            onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })}
          >
            COMEÇAR AGORA &#9658;
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--gray)",
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid var(--gray-dark)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              &#9654;
            </span>
            Ver Trailer
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

## Task 7: StatsBar.tsx — Seção Vermelha com Contadores

**Files:**
- Modify: `app/components/StatsBar.tsx`

- [ ] **Step 1: Criar StatsBar.tsx**

```tsx
// app/components/StatsBar.tsx
"use client";
import { useCountUp } from "../../hooks/useCountUp";

function StatItem({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 8vw, 80px)",
          color: "var(--white)",
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
          marginTop: "6px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section
      id="stats"
      style={{
        background: "var(--red)",
        padding: "56px 5vw",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }}
    >
      <StatItem target={600} suffix="+" label="Alunos Ativos" />
      <StatItem target={14} label="Anos de Excelência" />
      <StatItem target={42} label="Títulos Conquistados" />
      <StatItem target={2} label="Modalidades" />

      <style>{`
        @media (max-width: 640px) {
          #stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 8: Sobre.tsx — Layout 60/40 com Parallax

**Files:**
- Modify: `app/components/Sobre.tsx`

- [ ] **Step 1: Substituir Sobre.tsx**

```tsx
// app/components/Sobre.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Sobre() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax na foto
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      // Reveal do texto
      gsap.from(textRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="sobre"
      style={{
        background: "var(--black-2)",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 5vw",
          gap: "60px",
          alignItems: "center",
        }}
        className="sobre-grid"
      >
        {/* Texto */}
        <div ref={textRef}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "16px" }}>
            Nossa História
          </span>
          <h2
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(56px, 7vw, 88px)",
              lineHeight: 0.9,
              color: "var(--white)",
              marginBottom: "32px",
            }}
          >
            UMA ACADEMIA.
            <br />
            <span style={{ color: "var(--red)" }}>UMA MISSAO.</span>
          </h2>
          <span className="red-line" style={{ marginBottom: "24px" }} />
          <p style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "16px",
            color: "var(--gray)",
            lineHeight: 1.8,
            maxWidth: "520px",
            marginBottom: "20px",
          }}>
            Fundada em 2012, a Elite Fight Club nasceu com um propósito claro: oferecer treinamento de alto nível em Muay Thai e Boxe para todos — do iniciante ao atleta de competição.
          </p>
          <p style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "16px",
            color: "var(--gray)",
            lineHeight: 1.8,
            maxWidth: "520px",
            marginBottom: "20px",
          }}>
            Em mais de 14 anos, formamos mais de 42 campeões regionais e nacionais, mantendo o compromisso com disciplina, respeito e excelência técnica.
          </p>
          <p style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "16px",
            color: "var(--gray)",
            lineHeight: 1.8,
            maxWidth: "520px",
          }}>
            Aqui, cada soco, cada chute, cada treino é um passo em direção à sua melhor versão.
          </p>
        </div>

        {/* Foto */}
        <div
          ref={imgRef}
          style={{
            position: "relative",
            height: "550px",
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
            overflow: "hidden",
          }}
        >
          <Image
            src="/gym-exterior.jpg"
            alt="Fachada da Elite Fight Club"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.6))",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sobre-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 9: Programas.tsx — Split Diagonal com Slide-in

**Files:**
- Modify: `app/components/Programas.tsx` (era Modalidades.tsx)

- [ ] **Step 1: Criar Programas.tsx (substituir Modalidades.tsx)**

```tsx
// app/components/Programas.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const modalities = [
  {
    roman: "I",
    tag: "Modalidade 01",
    title: "MUAY\nTHAI",
    desc: "A arte das oito armas. Socos, chutes, joelhadas e cotoveladas em um sistema completo de luta em pé. Do iniciante ao competidor.",
    benefits: ["Técnica das 8 armas", "Condicionamento físico total", "Defesa pessoal eficaz", "Competição amadora e profissional"],
    schedule: "Seg / Qua / Sex — 06h e 18h30",
  },
  {
    roman: "II",
    tag: "Modalidade 02",
    title: "BOXE",
    desc: "O esporte nobre. Velocidade, timing e potência. Treinamento focado em técnica de punhos, esquivas e posicionamento.",
    benefits: ["Técnica de punhos avançada", "Velocidade e reflexo", "Resistência cardiovascular", "Trabalho de pads e sparring"],
    schedule: "Ter / Qui — 07h e 19h",
  },
];

export default function Programas() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(leftRef.current, {
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 75%" },
      });
      gsap.from(rightRef.current, {
        x: 80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 75%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="programas"
      style={{ background: "var(--black)", padding: "120px 0", overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 5vw",
          marginBottom: "60px",
        }}
      >
        <span className="eyebrow">Modalidades</span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
            marginTop: "8px",
          }}
        >
          ESCOLHA SUA ARTE
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
        }}
        className="programas-grid"
      >
        {/* Linha diagonal central */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "10%",
            bottom: "10%",
            width: "2px",
            background: "var(--red)",
            transform: "rotate(3deg)",
            zIndex: 2,
          }}
          className="programas-divider"
        />

        {modalities.map((m, i) => (
          <div
            key={m.roman}
            ref={i === 0 ? leftRef : rightRef}
            style={{
              background: i === 0 ? "var(--black)" : "var(--black-2)",
              padding: "80px 5vw",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Roman numeral background */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: i === 0 ? "20px" : "auto",
                left: i === 1 ? "20px" : "auto",
                fontFamily: "var(--font-bebas)",
                fontSize: "200px",
                color: "var(--white)",
                opacity: 0.03,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {m.roman}
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="eyebrow" style={{ marginBottom: "12px", display: "block" }}>
                {m.tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(56px, 8vw, 96px)",
                  color: "var(--white)",
                  lineHeight: 0.88,
                  marginBottom: "24px",
                  whiteSpace: "pre-line",
                }}
              >
                {m.title}
              </h3>
              <span className="red-line" style={{ marginBottom: "20px" }} />
              <p
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "15px",
                  color: "var(--gray)",
                  lineHeight: 1.8,
                  marginBottom: "28px",
                  maxWidth: "400px",
                }}
              >
                {m.desc}
              </p>
              <ul style={{ listStyle: "none", marginBottom: "32px" }}>
                {m.benefits.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "var(--font-barlow-condensed)",
                      fontSize: "13px",
                      letterSpacing: "1px",
                      color: "var(--white)",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--gray-dark)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "var(--red)", fontSize: "10px" }}>&#9654;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--gray)",
                  marginBottom: "24px",
                }}
              >
                {m.schedule}
              </div>
              <button
                className="btn-angular btn-angular--red"
                onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })}
                style={{ fontSize: "15px" }}
              >
                VER PLANOS
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .programas-grid { grid-template-columns: 1fr !important; }
          .programas-divider { display: none !important; }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 10: Galeria.tsx — GSAP Horizontal Pin

**Files:**
- Modify: `app/components/Galeria.tsx`

- [ ] **Step 1: Criar Galeria.tsx (scroll horizontal pinado)**

```tsx
// app/components/Galeria.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: "/gym-exterior.jpg", h: "500px", label: "A Academia" },
  { src: "/hero-fighter.jpg", h: "320px", label: "Treinamento" },
  { src: "/gym-exterior.jpg", h: "420px", label: "Equipamentos" },
  { src: "/hero-fighter.jpg", h: "380px", label: "Sparring" },
  { src: "/gym-exterior.jpg", h: "450px", label: "Competição" },
  { src: "/hero-fighter.jpg", h: "300px", label: "Infantil" },
];

export default function Galeria() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      const distance = track.scrollWidth - window.innerWidth;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, wrap);

      // Fade hint
      if (hintRef.current) {
        gsap.to(hintRef.current, { opacity: 0, delay: 2, duration: 0.5 });
      }

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="ambiente"
      style={{ background: "var(--black)", position: "relative" }}
    >
      {/* Título lateral */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          fontFamily: "var(--font-bebas)",
          fontSize: "14px",
          letterSpacing: "8px",
          color: "var(--gray-dark)",
          textTransform: "uppercase",
          zIndex: 10,
          userSelect: "none",
        }}
      >
        O AMBIENTE
      </div>

      <div ref={wrapRef} style={{ position: "relative", overflow: "hidden" }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "100dvh",
            paddingLeft: "80px",
            paddingRight: "40px",
            width: "max-content",
          }}
        >
          {photos.map((p, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                width: "clamp(240px, 25vw, 380px)",
                height: p.h,
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                style={{
                  objectFit: "cover",
                  filter: "grayscale(40%)",
                  transition: "filter 0.4s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(40%)")}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--white)",
                  opacity: 0.7,
                }}
              >
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hint mobile */}
      <div
        ref={hintRef}
        style={{
          textAlign: "center",
          padding: "16px",
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "var(--gray)",
        }}
        className="galeria-hint"
      >
        &#8592; DESLIZE &#8594;
      </div>

      {/* Mobile: scroll horizontal normal */}
      <style>{`
        @media (max-width: 768px) {
          #ambiente > div:first-of-type { overflow-x: auto !important; overflow-y: hidden; }
          #ambiente > div:first-of-type > div { height: 60dvh !important; padding-left: 20px !important; }
          .galeria-hint { display: block; }
        }
        @media (min-width: 769px) {
          .galeria-hint { display: none; }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 11: Horarios.tsx — Tabela Editorial

**Files:**
- Modify: `app/components/Horarios.tsx`

- [ ] **Step 1: Substituir Horarios.tsx**

```tsx
// app/components/Horarios.tsx
"use client";

const schedule = [
  { dias: "SEG / QUA / SEX", horario: "06:00 - 07:30", modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
  { dias: "SEG / QUA / SEX", horario: "18:30 - 20:00", modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
  { dias: "TER / QUI",       horario: "07:00 - 08:00", modalidade: "Boxe",      nivel: "Adulto", vagas: false },
  { dias: "TER / QUI",       horario: "19:00 - 20:30", modalidade: "Boxe",      nivel: "Adulto", vagas: true },
  { dias: "SÁBADO",          horario: "09:00 - 10:30", modalidade: "Muay Thai", nivel: "Infantil", vagas: true },
  { dias: "SÁBADO",          horario: "11:00 - 12:00", modalidade: "Boxe",      nivel: "Infantil", vagas: true },
];

export default function Horarios() {
  return (
    <section
      id="horarios"
      style={{ background: "var(--black-2)", padding: "120px 5vw" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>Grade de Aulas</span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
            marginBottom: "56px",
          }}
        >
          HORARIOS
        </h2>

        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 120px",
            padding: "12px 0",
            borderBottom: "1px solid var(--red)",
            marginBottom: "4px",
          }}
          className="horarios-row"
        >
          {["DIA", "HORÁRIO", "MODALIDADE", "NÍVEL", "STATUS"].map((h) => (
            <div
              key={h}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "13px",
                letterSpacing: "3px",
                color: "var(--red)",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {schedule.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 120px",
              padding: "20px 0",
              borderBottom: "1px solid var(--gray-dark)",
              background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              alignItems: "center",
            }}
            className="horarios-row"
          >
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "12px",
                letterSpacing: "2px",
                color: "var(--gray)",
              }}
            >
              {row.dias}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "24px",
                color: "var(--white)",
              }}
            >
              {row.horario}
            </div>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--white)",
              }}
            >
              {row.modalidade}
            </div>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "12px",
                letterSpacing: "2px",
                color: "var(--gray)",
              }}
            >
              {row.nivel}
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: row.vagas ? "#22c55e" : "var(--red)",
                  padding: "4px 10px",
                  border: `1px solid ${row.vagas ? "#22c55e" : "var(--red)"}`,
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 0 100%)",
                }}
              >
                {row.vagas ? "VAGAS" : "LOTADO"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .horarios-row { grid-template-columns: 1fr 1fr !important; gap: 8px; }
          .horarios-row > *:nth-child(5) { display: none; }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 12: Planos.tsx — Toggle Adulto/Infantil

**Files:**
- Modify: `app/components/Planos.tsx`

- [ ] **Step 1: Substituir Planos.tsx**

```tsx
// app/components/Planos.tsx
"use client";
import { useState } from "react";
import { gsap } from "gsap";

const plans = {
  adulto: [
    {
      name: "INICIANTE",
      price: "149",
      highlight: false,
      benefits: ["2 aulas por semana", "1 modalidade", "Acesso ao vestiário", "Kimono não incluso"],
    },
    {
      name: "INTERMEDIÁRIO",
      price: "219",
      highlight: false,
      benefits: ["Aulas ilimitadas", "2 modalidades", "Acesso ao vestiário", "Kit de treino incluso", "Sparring semanal"],
    },
    {
      name: "ELITE",
      price: "299",
      highlight: true,
      benefits: ["Aulas ilimitadas", "Todas as modalidades", "Personal training mensal", "Kit completo incluso", "Sparring + competição", "Acesso 24/7"],
    },
  ],
  infantil: [
    {
      name: "PEQUENO GUERREIRO",
      price: "119",
      highlight: false,
      benefits: ["2 aulas por semana", "1 modalidade", "Kimono não incluso", "4 a 7 anos"],
    },
    {
      name: "JOVEM CAMPEÃO",
      price: "169",
      highlight: false,
      benefits: ["Aulas ilimitadas", "2 modalidades", "Kit de treino incluso", "8 a 12 anos"],
    },
    {
      name: "ELITE KIDS",
      price: "229",
      highlight: true,
      benefits: ["Aulas ilimitadas", "Todas as modalidades", "Kit completo incluso", "Prep para competição", "12 a 17 anos"],
    },
  ],
};

export default function Planos() {
  const [tab, setTab] = useState<"adulto" | "infantil">("adulto");

  const switchTab = (next: "adulto" | "infantil") => {
    if (next === tab) return;
    gsap.to(".planos-list", {
      opacity: 0, y: 20, duration: 0.2,
      onComplete: () => {
        setTab(next);
        gsap.to(".planos-list", { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  };

  const current = plans[tab];

  return (
    <section
      id="planos"
      style={{ background: "var(--black)", padding: "120px 5vw" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>Investimento</span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
            marginBottom: "40px",
          }}
        >
          PLANOS
        </h2>

        {/* Toggle */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "56px" }}>
          {(["adulto", "infantil"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "18px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                padding: "10px 28px",
                background: tab === t ? "var(--red)" : "var(--gray-dark)",
                color: tab === t ? "var(--white)" : "var(--gray)",
                border: "none",
                cursor: "pointer",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {t === "adulto" ? "ADULTO" : "INFANTIL"}
            </button>
          ))}
        </div>

        {/* Plans */}
        <div
          className="planos-list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
        >
          {current.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: "var(--black-2)",
                padding: "48px 40px",
                position: "relative",
                borderLeft: plan.highlight ? "3px solid var(--red)" : "3px solid transparent",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: "9px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "var(--red)",
                    border: "1px solid var(--red)",
                    padding: "3px 8px",
                  }}
                >
                  POPULAR
                </div>
              )}
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "28px",
                  color: plan.highlight ? "var(--red)" : "var(--white)",
                  letterSpacing: "2px",
                  marginBottom: "20px",
                }}
              >
                {plan.name}
              </div>
              <div style={{ marginBottom: "32px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: "14px",
                    color: "var(--gray)",
                    verticalAlign: "top",
                    marginTop: "8px",
                    display: "inline-block",
                  }}
                >
                  R$
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(48px, 6vw, 64px)",
                    color: "var(--white)",
                    lineHeight: 1,
                    marginLeft: "4px",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "13px",
                    color: "var(--gray)",
                    marginLeft: "4px",
                  }}
                >
                  /mês
                </span>
              </div>
              <ul style={{ listStyle: "none", marginBottom: "36px" }}>
                {plan.benefits.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "14px",
                      color: "var(--gray)",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--gray-dark)",
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <button
                className="btn-angular btn-angular--red"
                style={{ width: "100%", justifyContent: "center", fontSize: "15px" }}
                onClick={() => window.open("https://wa.me/5511999999999?text=Quero%20o%20plano%20" + plan.name, "_blank")}
              >
                MATRICULAR
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .planos-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 13: Instrutores.tsx — Grid Staggered

**Files:**
- Modify: `app/components/Instrutores.tsx`

- [ ] **Step 1: Substituir Instrutores.tsx**

```tsx
// app/components/Instrutores.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "MESTRE RICARDO",
    role: "Head Coach — Muay Thai",
    exp: "20 anos de experiência",
    titles: "Ex-Campeão Estadual · 3x Ouro Nacional",
    img: "/hero-fighter.jpg",
  },
  {
    name: "PROF. ANA LIMA",
    role: "Head Coach — Boxe",
    exp: "12 anos de experiência",
    titles: "Campeã Brasileira 2019 · Seleção Nacional",
    img: "/gym-exterior.jpg",
  },
  {
    name: "COACH THIAGO",
    role: "Instrutor Infantil",
    exp: "8 anos de experiência",
    titles: "Esp. em Educação Física · CREF Ativo",
    img: "/hero-fighter.jpg",
  },
];

export default function Instrutores() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(gridRef.current?.children ?? [], {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="instrutores"
      style={{ background: "var(--black-2)", padding: "120px 5vw" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>Time de Elite</span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
            marginBottom: "64px",
          }}
        >
          NOSSOS MESTRES
        </h2>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
          className="inst-grid"
        >
          {team.map((member, i) => (
            <div
              key={member.name}
              style={{
                position: "relative",
                marginTop: i === 1 ? "48px" : "0",
              }}
            >
              {/* Name as background watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(48px, 7vw, 80px)",
                  color: "var(--white)",
                  opacity: 0.03,
                  lineHeight: 1,
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {member.name}
              </div>

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  height: "380px",
                  overflow: "hidden",
                  marginBottom: "20px",
                }}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                    transition: "filter 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(to top, var(--black-2), transparent)",
                  }}
                />
              </div>

              <span className="red-line" style={{ marginBottom: "12px" }} />
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "24px",
                  letterSpacing: "2px",
                  color: "var(--white)",
                  marginBottom: "4px",
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--red)",
                  marginBottom: "8px",
                }}
              >
                {member.role}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "13px",
                  color: "var(--gray)",
                  lineHeight: 1.6,
                }}
              >
                {member.exp}
                <br />
                {member.titles}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .inst-grid { grid-template-columns: 1fr !important; }
          .inst-grid > *:nth-child(2) { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 14: Depoimentos.tsx — Drag Scroll + Marquee

**Files:**
- Modify: `app/components/Depoimentos.tsx`

- [ ] **Step 1: Criar Depoimentos.tsx**

```tsx
// app/components/Depoimentos.tsx
"use client";
import { useRef } from "react";

const testimonials = [
  { quote: "Treinei em várias academias, mas a Elite Fight Club tem um nível técnico que não encontrei em outro lugar. Em 6 meses evoluí mais do que em 2 anos.", name: "Carlos M.", since: "Aluno desde 2022" },
  { quote: "Minha filha de 9 anos amou as aulas infantis. O Thiago tem uma paciência incrível com as crianças e a metodologia é excelente.", name: "Fernanda R.", since: "Aluna desde 2023" },
  { quote: "Comecei sem nunca ter treinado luta. Hoje sou competidor amador e já ganhei dois torneios regionais. A academia mudou minha vida.", name: "Lucas P.", since: "Aluno desde 2020" },
  { quote: "O ambiente é profissional mas acolhedor. Os professores respeitam o seu ritmo mas te desafiam sempre. Recomendo sem hesitar.", name: "Amanda S.", since: "Aluna desde 2021" },
  { quote: "Melhor investimento que fiz na minha saúde. Perdi 15kg em 4 meses e me tornei muito mais confiante. Obrigado a toda a equipe.", name: "Roberto K.", since: "Aluno desde 2023" },
];

const words = ["DISCIPLINA", "RESPEITO", "HONRA", "PERSEVERANÇA", "FORÇA", "FOCO"];

export default function Depoimentos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };

  return (
    <section
      id="depoimentos"
      style={{ background: "var(--black)", padding: "120px 0", overflow: "hidden" }}
    >
      {/* Marquee */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--gray-dark)",
          borderBottom: "1px solid var(--gray-dark)",
          padding: "14px 0",
          marginBottom: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            animation: "marquee 18s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...words, ...words, ...words].map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "6px",
                color: i % 7 === 0 ? "var(--red)" : "var(--gray-dark)",
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 5vw", marginBottom: "40px" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>Quem Treina</span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
          }}
        >
          DEPOIMENTOS
        </h2>
      </div>

      {/* Drag scroll */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          cursor: "grab",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingBottom: "20px",
          scrollbarWidth: "none",
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "clamp(280px, 40vw, 440px)",
              scrollSnapAlign: "start",
              background: "var(--black-2)",
              padding: "40px",
              borderLeft: "3px solid var(--red)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "15px",
                fontStyle: "italic",
                color: "var(--white)",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              "{t.quote}"
            </p>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "13px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--red)",
                marginBottom: "4px",
              }}
            >
              {t.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "10px",
                letterSpacing: "2px",
                color: "var(--gray)",
              }}
            >
              {t.since}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marquee { from, to { transform: none; } }
        }
      `}</style>
    </section>
  );
}
```

---

## Task 15: CTAFinal.tsx

**Files:**
- Modify: `app/components/CTAFinal.tsx`

- [ ] **Step 1: Criar CTAFinal.tsx**

```tsx
// app/components/CTAFinal.tsx
"use client";
import Image from "next/image";

export default function CTAFinal() {
  return (
    <section
      id="cta-final"
      style={{ position: "relative", padding: "140px 5vw", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/hero-fighter.jpg"
          alt=""
          fill
          aria-hidden
          style={{
            objectFit: "cover",
            filter: "grayscale(100%)",
            opacity: 0.2,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8,8,8,0.88)",
        }}
      />

      {/* Red lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--red)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "var(--red)" }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(56px, 10vw, 112px)",
            lineHeight: 0.9,
            color: "var(--white)",
            marginBottom: "24px",
          }}
        >
          SUA JORNADA
          <br />
          <span style={{ color: "var(--red)" }}>COMECA AQUI</span>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "18px",
            color: "var(--gray)",
            marginBottom: "48px",
          }}
        >
          Primeira aula gratuita. Sem compromisso.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://wa.me/5511999999999?text=Quero%20agendar%20minha%20aula%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-angular btn-angular--red"
            style={{
              fontSize: "16px",
              textDecoration: "none",
              background: "#25D366",
            }}
          >
            FALAR NO WHATSAPP
          </a>
          <a
            href="tel:+5511999999999"
            className="btn-angular btn-angular--outline"
            style={{ fontSize: "16px", textDecoration: "none" }}
          >
            LIGAR AGORA
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## Task 16: Footer.tsx

**Files:**
- Modify: `app/components/Footer.tsx`

- [ ] **Step 1: Substituir Footer.tsx**

```tsx
// app/components/Footer.tsx
import { InstagramLogo, YoutubeLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "#050505",
        padding: "80px 5vw 40px",
        borderTop: "3px solid var(--red)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "6px",
            color: "var(--white)",
            marginBottom: "56px",
          }}
        >
          ELITE <span style={{ color: "var(--red)" }}>FIGHT</span> CLUB
        </div>

        {/* 3 colunas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "4px",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              NAVEGAÇÃO
            </div>
            {["Programas", "Horários", "Planos", "Instrutores"].map((l) => (
              <div
                key={l}
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "var(--gray)",
                  marginBottom: "10px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
              >
                {l}
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "4px",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              MODALIDADES
            </div>
            {["Muay Thai — Adulto", "Muay Thai — Infantil", "Boxe — Adulto", "Boxe — Infantil"].map((m) => (
              <div
                key={m}
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "var(--gray)",
                  marginBottom: "10px",
                }}
              >
                {m}
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "4px",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              CONTATO
            </div>
            {[
              "(11) 99999-9999",
              "contato@elitefightclub.com.br",
              "Rua das Artes Marciais, 123",
              "São Paulo - SP",
            ].map((c) => (
              <div
                key={c}
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "13px",
                  color: "var(--gray)",
                  marginBottom: "10px",
                  lineHeight: 1.5,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--gray-dark)",
            paddingTop: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "11px",
              color: "#333",
              letterSpacing: "1px",
            }}
          >
            &copy; {new Date().getFullYear()} Elite Fight Club. Todos os direitos reservados.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { Icon: InstagramLogo, href: "#", label: "Instagram" },
              { Icon: YoutubeLogo, href: "#", label: "YouTube" },
              { Icon: FacebookLogo, href: "#", label: "Facebook" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{ color: "var(--gray)", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--red)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gray)")}
              >
                <Icon size={20} weight="light" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
```

---

## Task 17: page.tsx — Orquestração Final

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Substituir page.tsx — orquestrar todas as 13 seções**

```tsx
// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Sobre from "./components/Sobre";
import Programas from "./components/Programas";
import Galeria from "./components/Galeria";
import Horarios from "./components/Horarios";
import Planos from "./components/Planos";
import Instrutores from "./components/Instrutores";
import Depoimentos from "./components/Depoimentos";
import CTAFinal from "./components/CTAFinal";
import Footer from "./components/Footer";

const Intro3D = dynamic(() => import("./components/Intro3D"), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Bloqueia scroll durante intro
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [introComplete]);

  return (
    <>
      {!introComplete && (
        <Intro3D onComplete={() => setIntroComplete(true)} />
      )}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <Nav />
        <main>
          <Hero />
          <StatsBar />
          <Sobre />
          <Programas />
          <Galeria />
          <Horarios />
          <Planos />
          <Instrutores />
          <Depoimentos />
          <CTAFinal />
        </main>
        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Deletar componentes não usados**

```bash
cd "C:\Users\vinicius\portifolio\elite-fight-club\app\components"
rm -f LangToggle.tsx MarqueeBanner.tsx Showreel.tsx Contato.tsx Modalidades.tsx
rm -rf ui
```

- [ ] **Step 3: Criar Programas.tsx como cópia do Modalidades (se ainda não criado)**

Verificar se `Programas.tsx` foi criado na Task 9. Se não, criar agora com o conteúdo da Task 9.

---

## Task 18: Verificação Final

- [ ] **Step 1: Rodar dev server**

```bash
cd "C:\Users\vinicius\portifolio\elite-fight-club"
npm run dev
```

Acesse `http://localhost:3001` (ou porta disponível).

- [ ] **Step 2: Verificar checklist visual**

- [ ] Intro 3D carrega e desaparece em ~3s
- [ ] Nav fica transparente no topo, escura ao scrollar
- [ ] Hero tem imagem full bleed, texto esquerdo, CTA visível sem scroll
- [ ] StatsBar vermelho com contadores animados
- [ ] Galeria: scroll horizontal pinado no desktop
- [ ] Planos: toggle adulto/infantil funciona
- [ ] Zero border-radius em qualquer elemento
- [ ] Mobile (375px): todos os layouts em coluna única
- [ ] Console sem erros

- [ ] **Step 3: Testar mobile no Chrome DevTools**

Abrir DevTools (F12) > Toggle Device Toolbar > iPhone SE (375px). Scrollar toda a página verificando layout.

- [ ] **Step 4: Build de produção**

```bash
npm run build
```

Resultado esperado: `Route (app) / ✓` sem erros de TypeScript ou ESLint.

---

## Self-Review

**Cobertura da spec:**
- [x] Intro 3D — Task 4
- [x] Nav transparente → sólida — Task 5
- [x] Hero full bleed + GSAP — Task 6
- [x] Stats vermelho com counter — Task 7
- [x] Sobre 60/40 parallax — Task 8
- [x] Programas split diagonal — Task 9
- [x] Galeria GSAP horizontal — Task 10
- [x] Horarios tabela editorial — Task 11
- [x] Planos toggle adulto/infantil — Task 12
- [x] Instrutores staggered — Task 13
- [x] Depoimentos drag + marquee — Task 14
- [x] CTA Final — Task 15
- [x] Footer 3 colunas — Task 16
- [x] Mobile responsive — Tasks 5-16 (cada um com `<style>` de media query)
- [x] PT-BR only — sem LangToggle

**Sem placeholders:** todas as tasks têm código completo.

**Tipos consistentes:** `onComplete: () => void` em Intro3D é o mesmo tipo aceito em page.tsx. `useCountUp` retorna `{ count, ref }` e é consumido assim em StatsBar.

**Componentes a criar (não existiam antes):** StatsBar, Galeria, Depoimentos, CTAFinal — não há no mapa original, precisam ser criados como novos arquivos.
