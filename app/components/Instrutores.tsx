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
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" as const }}
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
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: "rgba(204,0,0,0.15)" }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
