// app/components/Galeria.tsx
"use client";
import Image from "next/image";

const photos = [
  { src: "/gym-interior.jpg",    label: "A Academia" },
  { src: "/galeria-1.png",       label: "Treinamento" },
  { src: "/galeria-2.png",       label: "Equipamentos" },
  { src: "/galeria-3.png",       label: "Sparring" },
  { src: "/galeria-4.png",       label: "Competição" },
  { src: "/galeria-infantil.png",label: "Infantil" },
];

// 2 cópias para loop seamless em -50%
const loop = [...photos, ...photos];

export default function Galeria() {
  return (
    <section
      id="ambiente"
      style={{ background: "var(--black)", padding: "120px 0", overflow: "hidden", position: "relative" }}
    >
      {/* Header */}
      <div style={{ padding: "0 5vw", marginBottom: "56px" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>
          Conheça o Espaço
        </span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
          }}
        >
          O AMBIENTE
        </h2>
      </div>

      {/* Carrossel */}
      <div style={{ position: "relative" }}>
        <div className="galeria-track">
          {loop.map((p, i) => (
            <div key={i} className="galeria-item">
              <Image
                src={p.src}
                alt={p.label}
                fill
                sizes="360px"
                style={{ objectFit: "cover" }}
              />
              {/* Overlay gradiente bottom */}
              <div className="galeria-overlay" />
              <span className="galeria-label">{p.label}</span>
            </div>
          ))}
        </div>

        {/* Vinhetas esquerda e direita */}
        <div className="galeria-vignette-left" />
        <div className="galeria-vignette-right" />
      </div>

      <style>{`
        .galeria-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: galeria-loop 45s linear infinite;
          will-change: transform;
        }
        .galeria-track:hover {
          animation-play-state: paused;
        }
        .galeria-item {
          position: relative;
          width: 320px;
          height: 420px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .galeria-item img {
          transition: transform 0.6s ease;
        }
        .galeria-item:hover img {
          transform: scale(1.05);
        }
        .galeria-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 50%);
          z-index: 1;
        }
        .galeria-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          z-index: 2;
          font-family: var(--font-barlow-condensed);
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--white);
          opacity: 0.8;
        }
        .galeria-vignette-left,
        .galeria-vignette-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 180px;
          z-index: 10;
          pointer-events: none;
        }
        .galeria-vignette-left {
          left: 0;
          background: linear-gradient(to right, var(--black) 0%, transparent 100%);
        }
        .galeria-vignette-right {
          right: 0;
          background: linear-gradient(to left, var(--black) 0%, transparent 100%);
        }
        @keyframes galeria-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .galeria-track { animation: none; overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}
