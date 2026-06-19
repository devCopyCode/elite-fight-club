// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
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
