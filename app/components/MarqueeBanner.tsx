// app/components/MarqueeBanner.tsx
const text =
  "MUAY THAI · BOXE · KICKBOXING · DEFESA PESSOAL · FITNESS COMBAT · KIDS · ";

export default function MarqueeBanner() {
  // Duplicado 3x para loop visual perfeito
  const repeated = text.repeat(3);

  return (
    <div
      className="overflow-hidden py-3"
      style={{ backgroundColor: "#CC0000" }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 22s linear infinite",
          width: "fit-content",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "#F5F5F5",
          }}
        >
          {repeated}
        </span>
        {/* Duplicate for seamless loop */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: "#F5F5F5",
          }}
          aria-hidden="true"
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
