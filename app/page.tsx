// app/page.tsx
"use client";

import { useState } from "react";
import LangToggle from "./components/LangToggle";

type Lang = "pt" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <>
      <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh" }}>
        <p style={{ color: "#F5F5F5", padding: "2rem" }}>
          Elite Fight Club — em construção
        </p>
      </main>
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
