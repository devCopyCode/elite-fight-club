// app/components/LangToggle.tsx
"use client";

type Lang = "pt" | "en";

interface Props {
  lang: Lang;
  onToggle: () => void;
}

export default function LangToggle({ lang, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Mudar idioma para ${lang === "pt" ? "inglês" : "português"}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 border border-[#333] bg-[#0A0A0A] text-xs font-semibold tracking-widest uppercase overflow-hidden"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span
        className="px-3 py-2 transition-colors duration-200"
        style={{
          backgroundColor: lang === "pt" ? "#CC0000" : "transparent",
          color: lang === "pt" ? "#F5F5F5" : "#555",
        }}
      >
        PT
      </span>
      <span
        className="px-3 py-2 transition-colors duration-200"
        style={{
          backgroundColor: lang === "en" ? "#CC0000" : "transparent",
          color: lang === "en" ? "#F5F5F5" : "#555",
        }}
      >
        EN
      </span>
    </button>
  );
}
