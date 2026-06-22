"use client";
// app/components/Footer.tsx
import { InstagramLogo, YoutubeLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "#050505",
        padding: "80px 5vw 40px",
        borderTop: "3px solid var(--red)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "6px",
            color: "var(--white)",
            marginBottom: "56px",
          }}
        >
          ELITE <span style={{ color: "var(--red)" }}>FIGHT</span> CLUB
        </div>

        {/* 3 colunas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "4px",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              NAVEGAÇÃO
            </div>
            {["Programas", "Horários", "Planos", "Instrutores"].map((l) => (
              <div
                key={l}
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "var(--gray)",
                  marginBottom: "10px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
              >
                {l}
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "4px",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              MODALIDADES
            </div>
            {["Muay Thai — Adulto", "Muay Thai — Infantil", "Boxe — Adulto", "Boxe — Infantil"].map((m) => (
              <div
                key={m}
                style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "var(--gray)",
                  marginBottom: "10px",
                }}
              >
                {m}
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "4px",
                color: "var(--red)",
                marginBottom: "20px",
              }}
            >
              CONTATO
            </div>
            {[
              "(11) 99999-9999",
              "contato@elitefightclub.com.br",
              "Rua das Artes Marciais, 123",
              "São Paulo - SP",
            ].map((c) => (
              <div
                key={c}
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "13px",
                  color: "var(--gray)",
                  marginBottom: "10px",
                  lineHeight: 1.5,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--gray-dark)",
            paddingTop: "24px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "11px",
              color: "#333",
              letterSpacing: "1px",
            }}
          >
            &copy; {new Date().getFullYear()} Elite Fight Club. Todos os direitos reservados.
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { Icon: InstagramLogo, href: "#", label: "Instagram" },
              { Icon: YoutubeLogo, href: "#", label: "YouTube" },
              { Icon: FacebookLogo, href: "#", label: "Facebook" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{ color: "var(--gray)", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--red)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gray)")}
              >
                <Icon size={20} weight="light" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
