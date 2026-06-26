// app/components/Sobre.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const valores = [
  { title: "DISCIPLINA", desc: "A base de toda evolução." },
  { title: "RESPEITO", desc: "Com os professores, colegas e consigo mesmo." },
  { title: "HONRA", desc: "Agir com caráter dentro e fora da academia." },
  { title: "SUPERAÇÃO", desc: "Desafiar seus limites diariamente." },
  { title: "EVOLUÇÃO", desc: "Buscar constantemente a melhor versão de si mesmo." },
];

export default function Sobre() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const valoresRef = useRef<HTMLDivElement>(null);
  const mvRef = useRef<HTMLDivElement>(null);
  const lemaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax na imagem
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      // Entrada do texto
      gsap.from(Array.from(textRef.current?.children ?? []), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });
      // Entrada dos valores
      gsap.from(Array.from(valoresRef.current?.children ?? []), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        scrollTrigger: { trigger: valoresRef.current, start: "top 82%" },
      });
      // Entrada missão/visão
      gsap.from(Array.from(mvRef.current?.children ?? []), {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        scrollTrigger: { trigger: mvRef.current, start: "top 82%" },
      });
      // Lema
      gsap.from(lemaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: { trigger: lemaRef.current, start: "top 85%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="sobre"
      className="section-pad"
      style={{ background: "var(--black-2)", padding: "160px 0 140px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5vw" }}>

        {/* ── HISTÓRIA: layout 60/40 ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "60% 40%",
            gap: "60px",
            alignItems: "center",
            marginBottom: "140px",
          }}
          className="sobre-grid"
        >
          {/* Texto */}
          <div ref={textRef}>
            <span className="eyebrow" style={{ display: "block", marginBottom: "16px" }}>
              Nossa História
            </span>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(52px, 6vw, 84px)",
                lineHeight: 0.9,
                color: "var(--white)",
                marginBottom: "32px",
              }}
            >
              UMA ACADEMIA.
              <br />
              <span style={{ color: "var(--red)" }}>UMA MISSÃO.</span>
            </h2>
            <span className="red-line" style={{ marginBottom: "28px" }} />

            {[
              "Fundada em 2012, a Elite Fight Club nasceu com um propósito claro: oferecer treinamento de alto nível em Muay Thai e Boxe para todos — desde quem está dando os primeiros passos até atletas que buscam competir em alto rendimento.",
              "Inspirada na tradição das grandes academias da Tailândia e nos centros de treinamento mais respeitados do mundo, a Elite Fight Club foi construída sobre valores sólidos: disciplina, respeito, honra, superação e evolução. Mais do que uma academia, criamos um ambiente onde pessoas comuns desenvolvem confiança, condicionamento físico e força mental através das artes marciais.",
              "Ao longo de mais de 14 anos de história, formamos mais de 42 campeões regionais e nacionais, consolidando nossa reputação como uma das principais referências em treinamento de esportes de combate. Cada título representa o trabalho diário, a dedicação dos nossos atletas e o compromisso da nossa equipe com a excelência técnica.",
              "Mas acreditamos que os maiores resultados vão além das medalhas. Todos os dias, vemos alunos transformarem suas vidas, superarem desafios pessoais, conquistarem saúde, disciplina e autoconfiança. É essa evolução que nos move.",
              "Hoje, a Elite Fight Club continua crescendo, mantendo a mesma essência que deu origem à academia: treinamento de qualidade, acompanhamento profissional e uma comunidade forte onde cada aluno encontra suporte para alcançar seus objetivos.",
            ].map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "15px",
                  color: "var(--gray)",
                  lineHeight: 1.85,
                  maxWidth: "540px",
                  marginBottom: i < 4 ? "18px" : 0,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Foto */}
          <div
            ref={imgRef}
            style={{
              position: "relative",
              height: "580px",
              clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/gym-exterior.jpg"
              alt="Fachada da Elite Fight Club"
              fill
              sizes="40vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.65))",
              }}
            />
          </div>
        </div>

        {/* ── VALORES ── */}
        <div style={{ marginBottom: "120px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "12px" }}>
            Nossos Valores
          </span>
          <h3
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(28px, 3vw, 40px)",
              color: "rgba(240,240,240,0.55)",
              marginBottom: "48px",
              letterSpacing: "4px",
            }}
          >
            O QUE NOS DEFINE
          </h3>

          <div
            ref={valoresRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "2px",
            }}
            className="valores-grid"
          >
            {valores.map((v, i) => (
              <div
                key={v.title}
                style={{
                  background: "var(--black)",
                  padding: "48px 32px",
                  position: "relative",
                  borderTop: "2px solid transparent",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderTopColor = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderTopColor = "transparent";
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "13px",
                    letterSpacing: "3px",
                    color: "var(--red)",
                    marginBottom: "14px",
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "22px",
                    letterSpacing: "2px",
                    color: "var(--white)",
                    marginBottom: "10px",
                  }}
                >
                  {v.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "13px",
                    color: "var(--gray)",
                    lineHeight: 1.7,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MISSÃO / VISÃO ── */}
        <div
          ref={mvRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            marginBottom: "64px",
          }}
          className="mv-grid"
        >
          {[
            {
              label: "Nossa Missão",
              title: "MISSÃO",
              text: "Transformar vidas através do Muay Thai e do Boxe, oferecendo treinamento de excelência, desenvolvimento físico e mental, e um ambiente que inspire crescimento pessoal e esportivo.",
            },
            {
              label: "Nossa Visão",
              title: "VISÃO",
              text: "Ser referência nacional em artes marciais e esportes de combate, reconhecida pela qualidade técnica, formação de campeões e impacto positivo na vida de nossos alunos.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--black)",
                padding: "52px 44px",
                borderLeft: "3px solid var(--red)",
              }}
            >
              <span className="eyebrow" style={{ display: "block", marginBottom: "10px" }}>
                {item.label}
              </span>
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(32px, 3.5vw, 48px)",
                  color: "var(--white)",
                  marginBottom: "20px",
                  letterSpacing: "2px",
                }}
              >
                {item.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "15px",
                  color: "var(--gray)",
                  lineHeight: 1.85,
                  maxWidth: "480px",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── LEMA ── */}
        <div
          ref={lemaRef}
          style={{
            textAlign: "center",
            padding: "64px 5vw",
            background: "var(--black)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "2px",
              background: "var(--red)",
            }}
          />
          <span className="eyebrow" style={{ display: "block", marginBottom: "16px" }}>
            Nosso Lema
          </span>
          <blockquote
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(32px, 5vw, 64px)",
              color: "var(--white)",
              letterSpacing: "2px",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            "FORJANDO CAMPEÕES
            <br />
            <span style={{ color: "var(--red)" }}>DENTRO E FORA DO RINGUE."</span>
          </blockquote>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .valores-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          #sobre { padding: 64px 0 80px !important; }
          .sobre-grid { grid-template-columns: 1fr !important; gap: 32px !important; margin-bottom: 64px !important; }
          .sobre-grid > div:last-child { height: 260px !important; }
          .mv-grid { grid-template-columns: 1fr !important; }
          .valores-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
