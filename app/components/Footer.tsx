// app/components/Footer.tsx
type Lang = "pt" | "en";

const t = {
  pt: {
    tagline: "Forjando campeões desde 2018.",
    links: [
      { label: "Sobre", href: "#sobre" },
      { label: "Modalidades", href: "#modalidades" },
      { label: "Instrutores", href: "#instrutores" },
      { label: "Horários", href: "#horarios" },
      { label: "Planos", href: "#planos" },
    ],
    copyright: "© 2026 Elite Fight Club. Todos os direitos reservados.",
  },
  en: {
    tagline: "Forging champions since 2018.",
    links: [
      { label: "About", href: "#sobre" },
      { label: "Modalities", href: "#modalidades" },
      { label: "Instructors", href: "#instrutores" },
      { label: "Schedule", href: "#horarios" },
      { label: "Plans", href: "#planos" },
    ],
    copyright: "© 2026 Elite Fight Club. All rights reserved.",
  },
};

interface Props {
  lang: Lang;
}

export default function Footer({ lang }: Props) {
  const c = t[lang];

  return (
    <footer
      className="py-12"
      style={{ backgroundColor: "#0A0A0A", borderTop: "1px solid #CC0000" }}
      aria-label="Rodapé"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <p className="font-display text-2xl tracking-wider text-[#F5F5F5] mb-2">
              ELITE <span className="text-[#CC0000]">FIGHT</span> CLUB
            </p>
            <p className="text-xs" style={{ color: "#444", fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
              {c.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap gap-6">
              {c.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold tracking-widest uppercase hover:text-[#CC0000] transition-colors duration-200"
                    style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          style={{ borderTop: "1px solid #1a1a1a", paddingTop: "2rem" }}
        >
          <p
            className="text-xs text-center"
            style={{ color: "#333", fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
          >
            {c.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
