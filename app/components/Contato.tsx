// app/components/Contato.tsx
"use client";

import { useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";

type Lang = "pt" | "en";

const t = {
  pt: {
    label: "— CONTATO",
    title1: "FALE",
    title2: "CONOSCO",
    fields: {
      name: "Nome completo",
      email: "E-mail",
      phone: "WhatsApp",
      message: "Mensagem",
    },
    cta: "Enviar Mensagem",
    sending: "Enviando...",
    sent: "Mensagem enviada!",
    address: "Rua das Artes Marciais, 123 — Vila Madalena, São Paulo/SP",
    phone: "+55 (11) 99999-9999",
    socials: [
      { label: "IG", href: "#" },
      { label: "YT", href: "#" },
      { label: "FB", href: "#" },
    ],
  },
  en: {
    label: "— CONTACT",
    title1: "GET IN",
    title2: "TOUCH",
    fields: {
      name: "Full name",
      email: "Email",
      phone: "WhatsApp",
      message: "Message",
    },
    cta: "Send Message",
    sending: "Sending...",
    sent: "Message sent!",
    address: "Rua das Artes Marciais, 123 — Vila Madalena, São Paulo/SP",
    phone: "+55 (11) 99999-9999",
    socials: [
      { label: "IG", href: "#" },
      { label: "YT", href: "#" },
      { label: "FB", href: "#" },
    ],
  },
};

interface Props {
  lang: Lang;
}

export default function Contato({ lang }: Props) {
  const c = t[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  }

  return (
    <section
      id="contato"
      className="py-20 md:py-32"
      style={{ backgroundColor: "#111" }}
      aria-labelledby="contato-titulo"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="section-label mb-4">{c.label}</p>
          <h2 id="contato-titulo" className="section-title">
            {c.title1}
            <br />
            <span style={{ color: "#CC0000", fontFamily: "var(--font-barlow)", fontStyle: "italic" }}>
              {c.title2}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label
                  htmlFor={`field-${field}`}
                  className="section-label"
                  style={{ fontSize: "0.6rem" }}
                >
                  {c.fields[field]}
                </label>
                <input
                  id={`field-${field}`}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  required
                  autoComplete={field === "email" ? "email" : field === "phone" ? "tel" : "name"}
                  className="bg-transparent border border-[#1a1a1a] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors duration-200 focus:border-[#CC0000]"
                  style={{ fontFamily: "var(--font-inter)" }}
                  aria-required="true"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="field-message"
                className="section-label"
                style={{ fontSize: "0.6rem" }}
              >
                {c.fields.message}
              </label>
              <textarea
                id="field-message"
                rows={4}
                required
                className="bg-transparent border border-[#1a1a1a] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors duration-200 focus:border-[#CC0000] resize-none"
                style={{ fontFamily: "var(--font-inter)" }}
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              disabled={status !== "idle"}
              className="btn-red mt-2 text-center"
              style={{ opacity: status !== "idle" ? 0.7 : 1 }}
            >
              {status === "idle" ? c.cta : status === "sending" ? c.sending : c.sent}
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin size={18} color="#CC0000" strokeWidth={1.5} aria-hidden="true" className="mt-1 flex-shrink-0" />
              <p className="text-sm leading-relaxed" style={{ color: "#888", fontFamily: "var(--font-inter)" }}>
                {c.address}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} color="#CC0000" strokeWidth={1.5} aria-hidden="true" className="flex-shrink-0" />
              <a
                href={`tel:${c.phone.replace(/\D/g, "")}`}
                className="text-sm"
                style={{ color: "#888", fontFamily: "var(--font-inter)" }}
              >
                {c.phone}
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-4">
              {c.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center gap-1 text-xs font-semibold tracking-widest border border-[#1a1a1a] px-3 py-2 hover:border-[#CC0000] hover:text-[#CC0000] transition-colors duration-200"
                  style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                  <ExternalLink size={10} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Map embed */}
            <div className="relative overflow-hidden" style={{ height: "220px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0774442539393!2d-46.6908!3d-23.5558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzIwLjkiUyA0NsKwNDEnMjYuOSJX!5e0!3m2!1spt!2sbr!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Elite Fight Club"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
