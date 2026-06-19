// app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import LangToggle from "./components/LangToggle";

type Lang = "pt" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <>
      <Navbar lang={lang} />
      <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", paddingTop: "4rem" }}>
        <p style={{ color: "#F5F5F5", padding: "2rem" }}>
          Em construção...
        </p>
      </main>
      <LangToggle lang={lang} onToggle={() => setLang(l => l === "pt" ? "en" : "pt")} />
    </>
  );
}
