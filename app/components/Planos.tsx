// app/components/Planos.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Lang = "pt" | "en";
type Tab = "adulto" | "kids";

const t = {
  pt: {
    label: "— PLANOS",
    title1: "ESCOLHA",
    title2: "SEU PLANO",
    tabs: { adulto: "Adulto", kids: "Kids" },
    popular: "MAIS POPULAR",
    cta: "Assinar Plano",
    plans: {
      adulto: [
        {
          name: "Básico",
          price: "R$ 189",
          period: "/mês",
          features: ["2 aulas por semana", "Acesso à academia", "Equipamento básico", "App de treino"],
        },
        {
          name: "Intermediário",
          price: "R$ 279",
          period: "/mês",
          popular: true,
          features: ["Aulas ilimitadas", "Todas as modalidades", "Equipamento completo", "Avaliação mensal", "App de treino"],
        },
        {
          name: "Premium",
          price: "R$ 399",
          period: "/mês",
          features: ["Aulas ilimitadas", "Todas as modalidades", "Personal trainer", "Nutrição esportiva", "Avaliação semanal", "App premium"],
        },
      ],
      kids: [
        {
          name: "Básico Kids",
          price: "R$ 149",
          period: "/mês",
          features: ["2 aulas por semana", "Uniforme incluído", "Material didático", "App parental"],
        },
        {
          name: "Intermediário Kids",
          price: "R$ 219",
          period: "/mês",
          popular: true,
          features: ["Aulas ilimitadas", "Uniforme incluído", "Material didático", "Avaliação mensal", "App parental"],
        },
        {
          name: "Premium Kids",
          price: "R$ 319",
          period: "/mês",
          features: ["Aulas ilimitadas", "Uniforme premium", "Acompanhamento individual", "Nutrição infantil", "Competições", "App parental"],
        },
      ],
    },
  },
  en: {
    label: "— PLANS",
    title1: "CHOOSE",
    title2: "YOUR PLAN",
    tabs: { adulto: "Adult", kids: "Kids" },
    popular: "MOST POPULAR",
    cta: "Subscribe",
    plans: {
      adulto: [
        {
          name: "Basic",
          price: "R$ 189",
          period: "/mo",
          features: ["2 classes per week", "Academy access", "Basic equipment", "Training app"],
        },
        {
          name: "Intermediate",
          price: "R$ 279",
          period: "/mo",
          popular: true,
          features: ["Unlimited classes", "All modalities", "Full equipment", "Monthly assessment", "Training app"],
        },
        {
          name: "Premium",
          price: "R$ 399",
          period: "/mo",
          features: ["Unlimited classes", "All modalities", "Personal trainer", "Sports nutrition", "Weekly assessment", "Premium app"],
        },
      ],
      kids: [
        {
          name: "Basic Kids",
          price: "R$ 149",
          period: "/mo",
          features: ["2 classes per week", "Uniform included", "Learning materials", "Parental app"],
        },
        {
          name: "Intermediate Kids",
          price: "R$ 219",
          period: "/mo",
          popular: true,
          features: ["Unlimited classes", "Uniform included", "Learning materials", "Monthly assessment", "Parental app"],
        },
        {
          name: "Premium Kids",
          price: "R$ 319",
          period: "/mo",
          features: ["Unlimited classes", "Premium uniform", "Individual coaching", "Child nutrition", "Competitions", "Parental app"],
        },
      ],
    },
  },
};

interface Props {
  lang: Lang;
}

export default function Planos({ lang }: Props) {
  const [tab, setTab] = useState<Tab>("adulto");
  const c = t[lang];
  const plans = c.plans[tab];

  return (
    <section
      id="planos"
      className="py-20 md:py-32"
      style={{ backgroundColor: "#0d0d0d" }}
      aria-labelledby="planos-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-10">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="planos-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-12 border border-[#1a1a1a] w-fit" role="tablist">
          {(["adulto", "kids"] as Tab[]).map((t_) => (
            <button
              key={t_}
              role="tab"
              aria-selected={tab === t_}
              onClick={() => setTab(t_)}
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: tab === t_ ? "#CC0000" : "transparent",
                color: tab === t_ ? "#F5F5F5" : "#555",
              }}
            >
              {c.tabs[t_]}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col p-8 relative"
              style={{
                backgroundColor: "#0d0d0d",
                border: "popular" in plan && plan.popular ? "1px solid #CC0000" : "1px solid transparent",
              }}
            >
              {"popular" in plan && plan.popular && (
                <div
                  className="absolute top-0 right-6 px-3 py-1 text-xs font-semibold tracking-widest"
                  style={{
                    backgroundColor: "#CC0000",
                    color: "#F5F5F5",
                    fontFamily: "var(--font-inter)",
                    transform: "translateY(-50%)",
                  }}
                >
                  {c.popular}
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="font-display text-2xl text-[#F5F5F5] uppercase tracking-wide mb-4"
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display text-[#CC0000]"
                    style={{ fontSize: "2.5rem", lineHeight: 1 }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <div
                style={{ width: "2rem", height: "1px", backgroundColor: "#CC0000", marginBottom: "1.5rem" }}
                aria-hidden="true"
              />

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check size={14} color="#CC0000" strokeWidth={2} aria-hidden="true" className="mt-0.5 flex-shrink-0" />
                    <span
                      className="text-sm"
                      style={{ color: "#888", fontFamily: "var(--font-inter)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#contato" className="btn-red text-center">
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
