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

interface Props {
  onOpenPlanos?: () => void;
}

export default function Programas({ onOpenPlanos }: Props) {
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
      className="section-pad"
      style={{ background: "var(--black)", padding: "160px 0", overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 5vw",
          marginBottom: "96px",
        }}
      >
        <span className="eyebrow">Modalidades</span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(56px, 8vw, 100px)",
            color: "var(--white)",
            marginTop: "12px",
            lineHeight: 0.9,
          }}
        >
          ESCOLHA<br />
          <span style={{ color: "var(--red)" }}>SUA ARTE</span>
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
              <ul style={{ listStyle: "none", marginBottom: "40px" }}>
                {m.benefits.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "var(--font-barlow-condensed)",
                      fontSize: "14px",
                      letterSpacing: "1.5px",
                      color: "var(--white)",
                      padding: "16px 0",
                      borderBottom: "1px solid var(--gray-dark)",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <span style={{ color: "var(--red)", fontSize: "9px", flexShrink: 0 }}>&#9654;</span>
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
                onClick={() => onOpenPlanos?.()}
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
