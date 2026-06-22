// app/components/CTAFinal.tsx
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MagneticBtn({
  href,
  children,
  className,
  style,
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.08s linear";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={style}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  );
}

export default function CTAFinal() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from([line1Ref.current, line2Ref.current], {
        clipPath: "inset(100% 0 0 0)",
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: line1Ref.current,
          start: "top 80%",
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="cta-final"
      style={{ position: "relative", padding: "140px 5vw", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/hero-fighter.jpg"
          alt=""
          fill
          aria-hidden
          style={{ objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.88)" }} />

      {/* Red lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--red)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "var(--red)" }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(56px, 10vw, 112px)",
            lineHeight: 0.9,
            marginBottom: "24px",
            overflow: "hidden",
          }}
        >
          <div ref={line1Ref} style={{ color: "var(--white)", clipPath: "inset(0 0 0 0)" }}>
            SUA JORNADA
          </div>
          <div ref={line2Ref} style={{ color: "var(--red)", clipPath: "inset(0 0 0 0)" }}>
            COMEÇA AQUI
          </div>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "18px",
            color: "var(--gray)",
            marginBottom: "48px",
          }}
        >
          Primeira aula gratuita. Sem compromisso.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <MagneticBtn
            href="https://wa.me/5511999999999?text=Quero%20agendar%20minha%20aula%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-angular btn-angular--red"
            style={{ fontSize: "16px", textDecoration: "none", background: "#25D366", display: "inline-block" }}
          >
            FALAR NO WHATSAPP
          </MagneticBtn>
          <MagneticBtn
            href="tel:+5511999999999"
            className="btn-angular btn-angular--outline"
            style={{ fontSize: "16px", textDecoration: "none", display: "inline-block" }}
          >
            LIGAR AGORA
          </MagneticBtn>
        </div>
      </div>
    </section>
  );
}
