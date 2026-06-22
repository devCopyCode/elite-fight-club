// app/components/Nav.tsx
"use client";
import { useEffect, useRef, useState } from "react";

const links = ["Programas", "Horários", "Planos", "Instrutores", "Contato"];
const ids   = ["programas", "horarios", "planos", "instrutores", "footer"];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: "72px",
          transition: "background 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "22px",
            letterSpacing: "4px",
            color: "var(--white)",
          }}
        >
          ELITE{" "}
          <span style={{ color: "var(--red)" }}>FIGHT</span> CLUB
        </div>

        {/* Links desktop */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
          className="nav-links"
        >
          {links.map((label, i) => (
            <button
              key={label}
              onClick={() => scrollTo(ids[i])}
              className="nav-link"
              style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--white)",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.55,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("planos")}
            className="btn-angular btn-angular--red"
            style={{ fontSize: "13px", padding: "8px 20px" }}
          >
            AULA GRÁTIS
          </button>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: "5px",
          }}
          className="hamburger"
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--white)",
                transition: "transform 0.2s, opacity 0.2s",
                transform:
                  menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(5px, -5px)"
                      : "scaleX(0)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Menu fullscreen mobile */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "#080808",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {links.map((label, i) => (
            <button
              key={label}
              onClick={() => scrollTo(ids[i])}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "48px",
                letterSpacing: "4px",
                color: "var(--white)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("planos")}
            className="btn-angular btn-angular--red"
            style={{ fontSize: "18px" }}
          >
            AULA GRÁTIS
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
