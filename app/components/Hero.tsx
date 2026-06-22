// app/components/Hero.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6 })
        .from(headlineRef.current, { y: 60, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(statsRef.current?.children ?? [], {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.5,
        }, "-=0.3")
        .from(ctaRef.current?.children ?? [], {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.5,
        }, "-=0.2");
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/hero-fighter.jpg"
          alt="Lutador de Muay Thai"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: 0.5,
            filter: "grayscale(20%)",
          }}
        />
      </div>

      {/* Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(8,8,8,0.97) 35%, rgba(8,8,8,0.4) 70%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 40%)",
        }}
      />

      {/* Red diagonal accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "25%",
          height: "100%",
          background: "rgba(200,16,46,0.12)",
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />

      {/* Bottom red line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, var(--red) 30%, transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 5vw",
          maxWidth: "800px",
        }}
      >
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <span className="red-line" />
          <span className="eyebrow">Muay Thai · Desde 2012</span>
        </div>

        <div
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(72px, 12vw, 130px)",
            lineHeight: 0.88,
            color: "var(--white)",
            marginBottom: "32px",
          }}
        >
          FORJE
          <br />
          <span style={{ color: "var(--red)" }}>CAMPEÕES</span>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: "flex",
            gap: "40px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "600+", label: "Alunos Ativos" },
            { num: "14", label: "Anos de Arte" },
            { num: "42", label: "Títulos" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "36px",
                  color: "var(--white)",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "9px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--gray)",
                  marginTop: "2px",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            className="btn-angular btn-angular--red"
            onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })}
          >
            COMEÇAR AGORA &#9658;
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--gray)",
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid var(--gray-dark)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              &#9654;
            </span>
            Ver Trailer
          </button>
        </div>
      </div>
    </section>
  );
}
