// app/components/Instrutores.tsx
"use client";
import { useEffect, useRef, useState } from "react";
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
    img: "/professor-1.png",
  },
  {
    name: "PROF. ANA LIMA",
    role: "Head Coach — Boxe",
    exp: "12 anos de experiência",
    titles: "Campeã Brasileira 2019 · Seleção Nacional",
    img: "/professor-3.png",
  },
  {
    name: "COACH THIAGO",
    role: "Instrutor Infantil",
    exp: "8 anos de experiência",
    titles: "Esp. em Educação Física · CREF Ativo",
    img: "/professor-2.png",
  },
];

export default function Instrutores() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

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
    <section id="instrutores" className="section-pad" style={{ background: "var(--black-2)", padding: "160px 5vw" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>
          Time de Elite
        </span>
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
          className="inst-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {team.map((member, i) => (
            <div
              key={member.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                marginTop: i === 1 ? "48px" : "0",
              }}
            >
              {/* Watermark */}
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

              {/* Photo container — hover is on parent div, not <Image> */}
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
                  loading="lazy"
                  sizes="(max-width: 768px) 90vw, 33vw"
                  style={{
                    objectFit: "cover",
                    filter: hovered === i ? "grayscale(0%)" : "grayscale(100%)",
                    transform: hovered === i ? "scale(1.05)" : "scale(1)",
                    transition: "filter 0.65s ease, transform 0.65s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(to top, var(--black-2), transparent)",
                    zIndex: 1,
                  }}
                />
                {/* Red line draws across bottom on hover */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    background: "var(--red)",
                    width: hovered === i ? "100%" : "0%",
                    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 2,
                  }}
                />
              </div>

              {/* Text block — lifts on hover */}
              <div
                style={{
                  transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                  transition: "transform 0.4s ease",
                }}
              >
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
                    color: hovered === i ? "rgba(240,240,240,0.7)" : "var(--gray)",
                    lineHeight: 1.6,
                    transition: "color 0.3s",
                  }}
                >
                  {member.exp}
                  <br />
                  {member.titles}
                </div>
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
