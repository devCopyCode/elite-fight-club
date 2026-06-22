// app/components/PlanosOverlay.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const plans = {
  adulto: {
    muaythai: [
      {
        name: "BÁSICO",
        price: "159",
        highlight: false,
        benefits: ["2 aulas por semana", "Muay Thai — Adulto", "Acesso ao vestiário", "Kimono não incluso"],
      },
      {
        name: "AVANÇADO",
        price: "239",
        highlight: false,
        benefits: ["Aulas ilimitadas", "Muay Thai — Adulto", "Kit de treino incluso", "Sparring semanal", "Acesso ao vestiário"],
      },
      {
        name: "ELITE",
        price: "329",
        highlight: true,
        benefits: ["Aulas ilimitadas", "Muay Thai + 1 modalidade", "Personal training mensal", "Kit completo incluso", "Sparring + competição", "Acesso 24/7"],
      },
    ],
    boxe: [
      {
        name: "BÁSICO",
        price: "139",
        highlight: false,
        benefits: ["2 aulas por semana", "Boxe — Adulto", "Acesso ao vestiário", "Luvas não inclusas"],
      },
      {
        name: "AVANÇADO",
        price: "209",
        highlight: false,
        benefits: ["Aulas ilimitadas", "Boxe — Adulto", "Kit de treino incluso", "Trabalho de pads semanal", "Acesso ao vestiário"],
      },
      {
        name: "ELITE",
        price: "299",
        highlight: true,
        benefits: ["Aulas ilimitadas", "Boxe + 1 modalidade", "Personal training mensal", "Kit completo incluso", "Sparring + competição", "Acesso 24/7"],
      },
    ],
  },
  infantil: {
    muaythai: [
      {
        name: "BÁSICO",
        price: "99",
        highlight: false,
        benefits: ["2 aulas por semana", "Muay Thai — Infantil", "Acesso ao vestiário", "4 a 12 anos", "Kimono não incluso"],
      },
      {
        name: "AVANÇADO",
        price: "149",
        highlight: false,
        benefits: ["Aulas ilimitadas", "Muay Thai — Infantil", "Kit básico incluso", "Treino lúdico", "4 a 12 anos"],
      },
      {
        name: "ELITE KIDS",
        price: "199",
        highlight: true,
        benefits: ["Aulas ilimitadas", "Muay Thai + Boxe", "Kit completo incluso", "Prep para competição", "12 a 17 anos"],
      },
    ],
    boxe: [
      {
        name: "BÁSICO",
        price: "89",
        highlight: false,
        benefits: ["2 aulas por semana", "Boxe — Infantil", "Acesso ao vestiário", "4 a 12 anos", "Luvas não inclusas"],
      },
      {
        name: "AVANÇADO",
        price: "129",
        highlight: false,
        benefits: ["Aulas ilimitadas", "Boxe — Infantil", "Kit básico incluso", "Treino lúdico", "4 a 12 anos"],
      },
      {
        name: "ELITE KIDS",
        price: "179",
        highlight: true,
        benefits: ["Aulas ilimitadas", "Boxe + Muay Thai", "Kit completo incluso", "Prep para competição", "12 a 17 anos"],
      },
    ],
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PlanosOverlay({ open, onClose }: Props) {
  const [tab, setTab] = useState<"adulto" | "infantil">("adulto");
  const [modality, setModality] = useState<"muaythai" | "boxe">("muaythai");
  const [hovered, setHovered] = useState<number | null>(null);

  const switchTab = (next: "adulto" | "infantil") => {
    if (next === tab) return;
    gsap.to(".overlay-planos-list", {
      opacity: 0,
      y: 16,
      duration: 0.18,
      onComplete: () => {
        setTab(next);
        gsap.to(".overlay-planos-list", { opacity: 1, y: 0, duration: 0.28 });
      },
    });
  };

  const switchModality = (next: "muaythai" | "boxe") => {
    if (next === modality) return;
    gsap.to(".overlay-planos-list", {
      opacity: 0,
      y: 12,
      duration: 0.15,
      onComplete: () => {
        setModality(next);
        setHovered(null);
        gsap.to(".overlay-planos-list", { opacity: 1, y: 0, duration: 0.22 });
      },
    });
  };

  // Fechar com Escape + lock scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const current = plans[tab][modality];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop escuro */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 8999,
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Painel principal */}
          <motion.div
            key="panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.9 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9000,
              background: "var(--black)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {/* Linha vermelha no topo */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "3px",
              background: "var(--red)",
              zIndex: 10,
            }} />

            {/* Header sticky */}
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 9,
                background: "rgba(8,8,8,0.96)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--gray-dark)",
                padding: "18px 5vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Voltar */}
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--gray)",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
              >
                ← VOLTAR
              </button>

              {/* Título central */}
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "20px",
                  letterSpacing: "5px",
                  color: "var(--white)",
                }}
              >
                PLANOS
              </div>

              {/* Fechar */}
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "1px solid var(--gray-dark)",
                  cursor: "pointer",
                  color: "var(--gray)",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-barlow)",
                  fontSize: "16px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.color = "var(--white)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--gray-dark)";
                  e.currentTarget.style.color = "var(--gray)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Conteúdo */}
            <div style={{ padding: "80px 5vw 100px", maxWidth: "1200px", margin: "0 auto" }}>
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
                ESCOLHA SEU PLANO
              </h2>

              {/* Toggle principal: ADULTO / INFANTIL */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "24px", flexWrap: "wrap" }}>
                {([
                  { key: "adulto",   label: "ADULTO" },
                  { key: "infantil", label: "INFANTIL" },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => switchTab(key)}
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "18px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      padding: "10px 32px",
                      background: tab === key ? "var(--red)" : "var(--gray-dark)",
                      color: tab === key ? "var(--white)" : "var(--gray)",
                      border: "none",
                      cursor: "pointer",
                      clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Sub-toggle: MUAY THAI / BOXE */}
              <div style={{ display: "flex", gap: "2px", marginBottom: "56px" }}>
                {([
                  { key: "muaythai", label: "MUAY THAI" },
                  { key: "boxe",     label: "BOXE" },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => switchModality(key)}
                    style={{
                      fontFamily: "var(--font-barlow-condensed)",
                      fontSize: "12px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      padding: "8px 22px",
                      background: "none",
                      color: modality === key ? "var(--white)" : "var(--gray)",
                      border: `1px solid ${modality === key ? "var(--white)" : "var(--gray-dark)"}`,
                      cursor: "pointer",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (modality !== key) {
                        e.currentTarget.style.borderColor = "var(--gray)";
                        e.currentTarget.style.color = "rgba(240,240,240,0.7)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (modality !== key) {
                        e.currentTarget.style.borderColor = "var(--gray-dark)";
                        e.currentTarget.style.color = "var(--gray)";
                      }
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Cards */}
              <div
                className="overlay-planos-list"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2px",
                }}
              >
                {current.map((plan, i) => (
                  <div
                    key={plan.name + i}
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
                    {/* Linha no topo ao hover */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0, left: 0,
                        height: "2px",
                        background: "var(--red)",
                        width: hovered === i ? "100%" : "0%",
                        transition: "width 0.45s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />

                    {plan.highlight && (
                      <div
                        style={{
                          position: "absolute",
                          top: "20px", right: "20px",
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
                          "https://wa.me/5511999999999?text=Quero%20o%20plano%20" + encodeURIComponent(plan.name),
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
                .overlay-planos-list { grid-template-columns: 1fr !important; }
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
