// app/components/StatsBar.tsx
"use client";
import { useCountUp } from "../../hooks/useCountUp";

function StatItem({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "0 24px" }}>
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(48px, 8vw, 80px)",
          color: "var(--white)",
          lineHeight: 1,
          letterSpacing: "2px",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          width: "24px",
          height: "1px",
          background: "rgba(255,255,255,0.35)",
          margin: "10px auto 8px",
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "10px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section
      id="stats"
      style={{
        background: "var(--red)",
        padding: "64px 5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr 1px 1fr 1px 1fr",
          width: "100%",
          maxWidth: "1100px",
          alignItems: "center",
        }}
      >
        <StatItem target={600} suffix="+" label="Alunos Ativos" />
        <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.18)", justifySelf: "center" }} />
        <StatItem target={14} label="Anos de Excelência" />
        <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.18)", justifySelf: "center" }} />
        <StatItem target={42} label="Títulos Conquistados" />
        <div style={{ width: "1px", height: "48px", background: "rgba(255,255,255,0.18)", justifySelf: "center" }} />
        <StatItem target={2} label="Modalidades" />
      </div>

      <style>{`
        @media (max-width: 640px) {
          #stats { padding: 48px 5vw !important; }
          #stats > div {
            grid-template-columns: 1fr 1px 1fr !important;
            grid-template-rows: auto auto;
            gap: 32px 0;
          }
          #stats > div > div:nth-child(4),
          #stats > div > div:nth-child(6) { display: none; }
        }
      `}</style>
    </section>
  );
}
