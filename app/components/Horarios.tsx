// app/components/Horarios.tsx
"use client";

type Lang = "pt" | "en";

const t = {
  pt: {
    label: "— HORÁRIOS",
    title1: "GRADE",
    title2: "SEMANAL",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    schedule: [
      { time: "06:00", classes: ["Muay Thai", "", "Muay Thai", "", "Muay Thai", "Boxe"] },
      { time: "08:00", classes: ["Boxe", "Kickboxing", "Boxe", "Kickboxing", "Boxe", "Muay Thai"] },
      { time: "12:00", classes: ["Fitness", "", "Fitness", "", "Fitness", ""] },
      { time: "18:00", classes: ["Muay Thai", "Kids", "Muay Thai", "Kids", "Muay Thai", ""] },
      { time: "19:00", classes: ["Kickboxing", "Muay Thai", "Kickboxing", "Muay Thai", "Kickboxing", ""] },
      { time: "20:00", classes: ["Def. Pessoal", "Boxe", "Def. Pessoal", "Boxe", "Def. Pessoal", ""] },
    ],
  },
  en: {
    label: "— SCHEDULE",
    title1: "WEEKLY",
    title2: "SCHEDULE",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    schedule: [
      { time: "06:00", classes: ["Muay Thai", "", "Muay Thai", "", "Muay Thai", "Boxing"] },
      { time: "08:00", classes: ["Boxing", "Kickboxing", "Boxing", "Kickboxing", "Boxing", "Muay Thai"] },
      { time: "12:00", classes: ["Fitness", "", "Fitness", "", "Fitness", ""] },
      { time: "18:00", classes: ["Muay Thai", "Kids", "Muay Thai", "Kids", "Muay Thai", ""] },
      { time: "19:00", classes: ["Kickboxing", "Muay Thai", "Kickboxing", "Muay Thai", "Kickboxing", ""] },
      { time: "20:00", classes: ["Self Defense", "Boxing", "Self Defense", "Boxing", "Self Defense", ""] },
    ],
  },
};

const classColor: Record<string, string> = {
  "Muay Thai": "#CC0000",
  "Boxe": "#444",
  "Boxing": "#444",
  "Kickboxing": "#333",
  "Kids": "#553300",
  "Fitness": "#1a3a1a",
  "Def. Pessoal": "#2a2a44",
  "Self Defense": "#2a2a44",
  "Fitness Combat": "#1a3a1a",
};

interface Props {
  lang: Lang;
}

export default function Horarios({ lang }: Props) {
  const c = t[lang];

  return (
    <section
      id="horarios"
      className="py-20 md:py-32"
      style={{ backgroundColor: "#0A0A0A" }}
      aria-labelledby="horarios-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="horarios-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]" role="grid" aria-label={c.title1 + " " + c.title2}>
            <thead>
              <tr>
                <th
                  className="text-left py-3 pr-4 text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#444", fontFamily: "var(--font-inter)", width: "72px" }}
                  scope="col"
                >
                  {lang === "pt" ? "Hora" : "Time"}
                </th>
                {c.days.map((day) => (
                  <th
                    key={day}
                    className="py-3 px-2 text-center text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "#888", fontFamily: "var(--font-inter)" }}
                    scope="col"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.schedule.map((row) => (
                <tr key={row.time} style={{ borderTop: "1px solid #1a1a1a" }}>
                  <td
                    className="py-4 pr-4 text-xs font-semibold tabular-nums"
                    style={{ color: "#444", fontFamily: "var(--font-inter)" }}
                  >
                    {row.time}
                  </td>
                  {row.classes.map((cls, i) => (
                    <td key={i} className="py-2 px-2 text-center">
                      {cls ? (
                        <span
                          className="inline-block px-2 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: classColor[cls] || "#1a1a1a",
                            color: "#F5F5F5",
                            fontFamily: "var(--font-inter)",
                            letterSpacing: "0.05em",
                            fontSize: "0.65rem",
                          }}
                        >
                          {cls}
                        </span>
                      ) : (
                        <span style={{ color: "#222", fontSize: "0.75rem" }}>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
