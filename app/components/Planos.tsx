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
  const [hovered, setHovered] = useState<number | null>(null);

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
    <section id="planos" className="section-pad" style={{ background: "var(--black)", padding: "160px 5vw" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>
          Investimento
        </span>
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
        <div className="planos-toggle" style={{ display: "flex", gap: "4px", marginBottom: "56px" }}>
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
          {current.map((plan, i) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--black-2)",
                padding: "48px 40px",
                position: "relative",
                overflow: "hidden",
                borderLeft: plan.highlight ? "3px solid var(--red)" : "3px solid transparent",
                transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            >
              {/* Top line draw on hover */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "2px",
                  background: "var(--red)",
                  width: hovered === i ? "100%" : "0%",
                  transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />

              {/* Highlight badge */}
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

              {/* Plan name */}
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

              {/* Price — floats up on hover */}
              <div
                style={{
                  marginBottom: "32px",
                  transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                  transition: "transform 0.35s ease",
                }}
              >
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

              {/* Benefits */}
              <ul style={{ listStyle: "none", marginBottom: "36px" }}>
                {plan.benefits.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "14px",
                      color: hovered === i ? "rgba(240,240,240,0.75)" : "var(--gray)",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--gray-dark)",
                      transition: "color 0.3s",
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>

              <button
                className="btn-angular btn-angular--red"
                style={{ width: "100%", justifyContent: "center", fontSize: "15px" }}
                onClick={() =>
                  window.open(
                    "https://wa.me/5511999999999?text=Quero%20o%20plano%20" + plan.name,
                    "_blank"
                  )
                }
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
          .planos-toggle { flex-direction: column !important; }
          .planos-toggle button { width: 100% !important; text-align: center !important; clip-path: none !important; }
        }
      `}</style>
    </section>
  );
}
