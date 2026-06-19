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
