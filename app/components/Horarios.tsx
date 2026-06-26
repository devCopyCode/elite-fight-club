// app/components/Horarios.tsx
"use client";
import { useState } from "react";

const days = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

type Cell = { modalidade: "Muay Thai" | "Boxe"; nivel: string; vagas: boolean } | null;

const grid: { time: string; cells: Cell[] }[] = [
  {
    time: "06:00",
    cells: [
      { modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
      null,
      { modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
      null,
      { modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
      null,
    ],
  },
  {
    time: "07:00",
    cells: [
      null,
      { modalidade: "Boxe", nivel: "Adulto", vagas: false },
      null,
      { modalidade: "Boxe", nivel: "Adulto", vagas: false },
      null,
      null,
    ],
  },
  {
    time: "09:00",
    cells: [
      null,
      null,
      null,
      null,
      null,
      { modalidade: "Muay Thai", nivel: "Infantil", vagas: true },
    ],
  },
  {
    time: "11:00",
    cells: [
      null,
      null,
      null,
      null,
      null,
      { modalidade: "Boxe", nivel: "Infantil", vagas: true },
    ],
  },
  {
    time: "18:30",
    cells: [
      { modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
      null,
      { modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
      null,
      { modalidade: "Muay Thai", nivel: "Adulto", vagas: true },
      null,
    ],
  },
  {
    time: "19:00",
    cells: [
      null,
      { modalidade: "Boxe", nivel: "Adulto", vagas: true },
      null,
      { modalidade: "Boxe", nivel: "Adulto", vagas: true },
      null,
      null,
    ],
  },
];

export default function Horarios() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section
      id="horarios"
      className="section-pad horarios-section"
      style={{ background: "var(--black)", padding: "160px 5vw" }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <span
          className="eyebrow"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Grade de Aulas
        </span>
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 80px)",
            color: "var(--white)",
            marginBottom: "8px",
          }}
        >
          CRONOGRAMA
        </h2>
        <p
          style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "13px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "var(--gray)",
            marginBottom: "72px",
          }}
        >
          Semanal 2025
        </p>

        {/* Scroll horizontal em mobile */}
        <div style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "72px repeat(6, 1fr)",
              gap: "2px",
              background: "rgba(255,255,255,0.05)",
              minWidth: "640px",
            }}
          >
            {/* Corner vazio */}
            <div style={{ background: "var(--black-3)" }} />

            {/* Cabeçalho — dias */}
            {days.map((day) => (
              <div
                key={day}
                style={{
                  background: "var(--red)",
                  padding: "14px 8px",
                  textAlign: "center",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "17px",
                  letterSpacing: "3px",
                  color: "var(--white)",
                }}
              >
                {day}
              </div>
            ))}

            {/* Linhas de horário */}
            {grid.map((row, rowIdx) => (
              <div
                key={rowIdx}
                style={{ display: "contents" }}
                onMouseEnter={() => setActiveRow(rowIdx)}
                onMouseLeave={() => setActiveRow(null)}
              >
                {/* Célula de horário */}
                <div
                  style={{
                    background:
                      activeRow === rowIdx ? "var(--red)" : "var(--black-3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "22px 8px",
                    transition: "background 0.25s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "20px",
                      letterSpacing: "1px",
                      color:
                        activeRow === rowIdx ? "var(--white)" : "var(--gray)",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {row.time}
                  </span>
                </div>

                {/* Células de modalidade */}
                {row.cells.map((cell, dayIdx) => (
                  <div
                    key={dayIdx}
                    style={{
                      position: "relative",
                      padding: "16px 14px",
                      background: activeRow === rowIdx
                        ? "rgba(200,16,46,0.07)"
                        : cell
                          ? cell.modalidade === "Muay Thai"
                            ? "rgba(200,16,46,0.1)"
                            : "rgba(255,255,255,0.04)"
                          : "var(--black-2)",
                      borderLeft: cell
                        ? `2px solid ${
                            cell.modalidade === "Muay Thai"
                              ? "var(--red)"
                              : "rgba(240,240,240,0.18)"
                          }`
                        : "2px solid transparent",
                      transition: "background 0.25s ease",
                    }}
                  >
                    {cell ? (
                      <>
                        <div
                          style={{
                            fontFamily: "var(--font-bebas)",
                            fontSize: "15px",
                            letterSpacing: "1.5px",
                            color:
                              cell.modalidade === "Muay Thai"
                                ? "var(--red)"
                                : "var(--white)",
                            marginBottom: "3px",
                          }}
                        >
                          {cell.modalidade}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-barlow-condensed)",
                            fontSize: "10px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "var(--gray)",
                          }}
                        >
                          {cell.nivel}
                        </div>
                        {!cell.vagas && (
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              fontFamily: "var(--font-barlow-condensed)",
                              fontSize: "8px",
                              letterSpacing: "1.5px",
                              textTransform: "uppercase",
                              color: "var(--red)",
                              border: "1px solid var(--red)",
                              padding: "1px 5px",
                            }}
                          >
                            LOTADO
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          color: "rgba(255,255,255,0.07)",
                          fontFamily: "var(--font-barlow)",
                          fontSize: "20px",
                          textAlign: "center",
                          lineHeight: 1,
                          paddingTop: "6px",
                        }}
                      >
                        ·
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legenda */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "24px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "var(--red)",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gray)",
              }}
            >
              Muay Thai
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                background: "rgba(240,240,240,0.18)",
                border: "1px solid rgba(240,240,240,0.18)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gray)",
              }}
            >
              Boxe
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .horarios-section { padding: 64px 4vw !important; }
        }
      `}</style>
    </section>
  );
}
