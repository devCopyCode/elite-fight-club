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

// 4 cópias garantem que a tira cobre qualquer largura de tela sem espaço vazio
const words = ["DISCIPLINA", "RESPEITO", "HONRA", "PERSEVERANÇA", "FORÇA", "FOCO"];
const marqueeWords = [...words, ...words, ...words, ...words];

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
      {/* ── MARQUEE ── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--gray-dark)",
          borderBottom: "1px solid var(--gray-dark)",
          padding: "14px 0",
          marginBottom: "64px",
        }}
      >
        <div className="marquee-track">
          {marqueeWords.map((w, i) => (
            <span
              key={i}
              className="marquee-word"
              style={{ color: i % 7 === 0 ? "var(--red)" : "var(--gray-dark)" }}
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
        .marquee-track {
          display: flex;
          gap: 48px;
          width: max-content;
          animation: efc-marquee 24s linear infinite;
          will-change: transform;
        }
        .marquee-word {
          font-family: var(--font-bebas);
          font-size: 14px;
          letter-spacing: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        @keyframes efc-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
