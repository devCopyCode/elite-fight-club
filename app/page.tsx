// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "./components/Nav";
import StatsBar from "./components/StatsBar";
import Sobre from "./components/Sobre";
import Programas from "./components/Programas";
import Galeria from "./components/Galeria";
import Horarios from "./components/Horarios";
import Planos from "./components/Planos";
import Instrutores from "./components/Instrutores";
import Depoimentos from "./components/Depoimentos";
import CTAFinal from "./components/CTAFinal";
import Footer from "./components/Footer";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import Cursor from "@/components/ui/cursor";
import PlanosOverlay from "./components/PlanosOverlay";

const Intro3D = dynamic(() => import("./components/Intro3D"), { ssr: false });

function HeroContent() {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 5vw 80px" }}>
      {/* Stats */}
      <div className="hero-stats" style={{ marginBottom: "48px" }}>
        {[
          { num: "600+", label: "Alunos Ativos" },
          { num: "14",   label: "Anos de Arte" },
          { num: "42",   label: "Títulos" },
          { num: "2",    label: "Modalidades" },
        ].map(({ num, label }) => (
          <div
            key={label}
            style={{
              background: "rgba(8,8,8,0.85)",
              padding: "24px 20px",
              borderLeft: "3px solid var(--red)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "var(--white)",
                lineHeight: 1,
              }}
            >
              {num}
            </div>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gray)",
                marginTop: "6px",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Description + CTA */}
      <div className="hero-desc">
        <div>
          <span className="red-line" style={{ marginBottom: "20px" }} />
          <p
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(14px, 1.6vw, 16px)",
              color: "var(--gray)",
              lineHeight: 1.8,
              maxWidth: "420px",
            }}
          >
            Fundada em 2012, a Elite Fight Club é referência em Muay Thai e
            Boxe no Brasil. Aqui, campeões são forjados com disciplina, técnica
            e respeito.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            className="btn-angular btn-angular--red"
            style={{ fontSize: "16px", alignSelf: "flex-start" }}
            onClick={() =>
              document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            CONHEÇA AGORA &#9658;
          </button>
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gray)",
              opacity: 0.6,
            }}
          >
            Primeira aula gratuita · Sem compromisso
          </span>
        </div>
      </div>

      <style>{`
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }
        .hero-desc {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 640px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 2px;
          }
          .hero-desc {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [planosOpen, setPlanosOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introComplete ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [introComplete]);

  return (
    <>
      <Cursor />
      <PlanosOverlay open={planosOpen} onClose={() => setPlanosOpen(false)} />
      {!introComplete && <Intro3D onComplete={() => setIntroComplete(true)} />}

      <div style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <Nav />
        <main>
          <ScrollExpandMedia
            mediaType="image"
            mediaSrc="/hero-fighter.jpg"
            bgImageSrc="/gym-interior.jpg"
            title="FORJE CAMPEOES"
            date="MUAY THAI · BOXE · DESDE 2012"
            scrollToExpand="ROLE PARA DESCOBRIR"
          >
            <HeroContent />
          </ScrollExpandMedia>
          <Sobre />
          <Programas onOpenPlanos={() => setPlanosOpen(true)} />
          <Galeria />
          <Horarios />
          <Instrutores />
          <StatsBar />
          <Depoimentos />
          <CTAFinal />
        </main>
        <Footer />
      </div>
    </>
  );
}
