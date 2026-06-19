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
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
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
