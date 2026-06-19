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
