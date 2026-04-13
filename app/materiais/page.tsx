"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const CREAM = "#f5f4f2";
const BORDER = "#e8e5e1";

const MATERIAIS = [
  {
    id: "PLA",
    cor: "#6dbe6d",
    corBg: "#f0faf0",
    corBorder: "#c8e6c8",
    emoji: "🌿",
    titulo: "PLA",
    subtitulo: "Polylactic Acid — O mais popular e versátil",
    descricao: "O PLA é o material mais usado em impressão 3D FDM. Derivado de recursos renováveis como o amido de milho, é biodegradável, fácil de imprimir e disponível numa infinidade de cores e acabamentos.",
    caracteristicas: [
      "Temperatura de serviço até 60 °C",
      "Alta rigidez e detalhes nítidos",
      "Acabamento suave, ideal para pintura",
      "Biodegradável e reciclável",
      "Fácil de imprimir, sem empenamento",
      "Disponível em matte, silk e wood-fill",
    ],
    aplicacoes: ["Decoração e arte", "Figuras e miniaturas", "Modelos de apresentação", "Peças de baixo esforço mecânico", "Protótipos visuais"],
    tempo: "2–4 dias úteis",
    stats: [
      { label: "Resistência",   val: 55 },
      { label: "Flexibilidade", val: 25 },
      { label: "Detalhe",       val: 78 },
      { label: "Custo-benef.",  val: 92 },
    ],
  },
  {
    id: "PETG",
    cor: "#5ba3d9",
    corBg: "#e8f4fd",
    corBorder: "#b3d9f7",
    emoji: "💧",
    titulo: "PETG",
    subtitulo: "Polyethylene Terephthalate Glycol — Resistente e durável",
    descricao: "O PETG combina o melhor dos dois mundos: a facilidade de impressão do PLA com a resistência do ABS. Excelente resistência química, à humidade e ao impacto — a escolha ideal para peças funcionais.",
    caracteristicas: [
      "Temperatura de serviço até 80 °C",
      "Alta resistência ao impacto",
      "Resistente à humidade e produtos químicos",
      "Ligeiramente flexível — não parte com facilidade",
      "Food-safe em variantes certificadas",
      "Boa adesão entre camadas",
    ],
    aplicacoes: ["Peças funcionais", "Suportes e organizadores", "Caixas para eletrónica", "Aplicações em ambientes húmidos", "Substituição de peças mecânicas"],
    tempo: "2–5 dias úteis",
    stats: [
      { label: "Resistência",   val: 78 },
      { label: "Flexibilidade", val: 55 },
      { label: "Detalhe",       val: 70 },
      { label: "Custo-benef.",  val: 76 },
    ],
  },
  {
    id: "ABS",
    cor: "#d9875b",
    corBg: "#fff3ec",
    corBorder: "#f5c8a0",
    emoji: "⚙️",
    titulo: "ABS",
    subtitulo: "Acrylonitrile Butadiene Styrene — Alta engenharia",
    descricao: "O ABS é o material de referência para aplicações de engenharia. Suporta temperaturas elevadas, é maquinável, colável e permite acabamentos com vapor de acetona para superfícies ultra-lisas.",
    caracteristicas: [
      "Temperatura de serviço até 100 °C",
      "Alta resistência mecânica e ao impacto",
      "Permite acabamento com acetona (superfície espelhada)",
      "Maquinável e pintável",
      "Leve e com boa relação resistência/peso",
      "Ideal para câmaras fechadas (previne warping)",
    ],
    aplicacoes: ["Peças de engenharia", "Caixas técnicas e tampas", "Protótipos funcionais", "Peças para automóvel", "Aplicações de alta temperatura"],
    tempo: "3–5 dias úteis",
    stats: [
      { label: "Resistência",   val: 88 },
      { label: "Flexibilidade", val: 50 },
      { label: "Detalhe",       val: 65 },
      { label: "Custo-benef.",  val: 70 },
    ],
  },
  {
    id: "Resina",
    cor: "#b06dd9",
    corBg: "#f7f0fd",
    corBorder: "#ddb7f5",
    emoji: "💎",
    titulo: "Resina",
    subtitulo: "Resina fotopolimérica — Detalhe supremo",
    descricao: "A impressão em resina (SLA/MSLA) oferece o nível mais elevado de detalhe e acabamento superficial. Ideal para miniaturas, jóias, modelos médicos e qualquer peça onde a precisão é crítica.",
    caracteristicas: [
      "Resolução até 0.025 mm (25 microns)",
      "Superfície ultra-lisa sem marcas de camadas",
      "Detalhes sub-milimétricos",
      "Disponível em resinas standard, ABS-like, flexíveis e castáveis",
      "Acabamento premium pronto a pintar ou lacar",
      "Ideal para peças pequenas e médias",
    ],
    aplicacoes: ["Miniaturas e figuras colecionáveis", "Jóias e acessórios", "Modelos dentários e médicos", "Maquetes de arquitetura", "Peças de design de produto"],
    tempo: "3–6 dias úteis",
    stats: [
      { label: "Resistência",   val: 60 },
      { label: "Flexibilidade", val: 20 },
      { label: "Detalhe",       val: 98 },
      { label: "Custo-benef.",  val: 55 },
    ],
  },
];

function ProgressBar({ val, color }: { val: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(val), 60);
    return () => clearTimeout(t);
  }, [val]);

  return (
    <div style={{ height: "7px", backgroundColor: "#e8e5e1", borderRadius: "4px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${width}%`, backgroundColor: color, borderRadius: "4px", transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)" }} />
    </div>
  );
}

export default function MateriaisPage() {
  const [activeId, setActiveId] = useState("PLA");
  const mat = MATERIAIS.find(m => m.id === activeId) ?? MATERIAIS[0];

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ backgroundColor: DARK, padding: "64px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Matéria-prima</p>
            <h1 style={{ fontSize: "44px", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
              Os nossos <span style={{ color: O }}>materiais</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#c9c7c4", lineHeight: 1.75, margin: 0 }}>
              Cada material tem características únicas. Escolhemos o mais adequado para o teu projeto — ou aconselhamos se tiveres dúvidas.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: "64px", zIndex: 50 }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px", display: "flex", gap: "4px" }}>
            {MATERIAIS.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                style={{
                  padding: "16px 24px",
                  border: "none",
                  borderBottom: `3px solid ${activeId === m.id ? m.cor : "transparent"}`,
                  background: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: activeId === m.id ? 700 : 500,
                  color: activeId === m.id ? m.cor : MUTED,
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{m.emoji}</span>
                {m.titulo}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo do material selecionado */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px" }}>
          <div
            key={activeId}
            style={{ backgroundColor: "#fff", borderRadius: "20px", border: `2px solid ${mat.corBorder}`, overflow: "hidden", animation: "fadeIn 0.3s ease both" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* Visual */}
              <div style={{ backgroundColor: mat.corBg, padding: "56px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "88px", marginBottom: "20px", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}>{mat.emoji}</div>
                <span style={{ display: "inline-block", backgroundColor: mat.cor, color: "#fff", fontSize: "16px", fontWeight: 800, padding: "8px 24px", borderRadius: "20px", letterSpacing: "0.05em" }}>
                  {mat.titulo}
                </span>
                <p style={{ fontSize: "13px", color: MUTED, margin: "16px 0 32px", textAlign: "center" }}>⏱ {mat.tempo}</p>

                {/* Stats */}
                <div style={{ width: "100%", maxWidth: "280px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {mat.stats.map(({ label, val }) => (
                    <div key={label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: DARK }}>{label}</span>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: mat.cor }}>{val}%</span>
                      </div>
                      <ProgressBar key={`${activeId}-${label}`} val={val} color={mat.cor} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "48px 40px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: mat.cor, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" }}>{mat.subtitulo}</p>
                <h2 style={{ fontSize: "28px", fontWeight: 800, color: DARK, margin: "0 0 16px" }}>{mat.titulo}</h2>
                <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.75, margin: "0 0 28px" }}>{mat.descricao}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Características</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {mat.caracteristicas.map(c => (
                        <li key={c} style={{ fontSize: "13px", color: MUTED, display: "flex", alignItems: "flex-start", gap: "7px" }}>
                          <span style={{ color: mat.cor, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Aplicações</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {mat.aplicacoes.map(a => (
                        <li key={a} style={{ fontSize: "13px", color: MUTED, display: "flex", alignItems: "center", gap: "7px" }}>
                          <span style={{ color: mat.cor, flexShrink: 0 }}>→</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={`/produtos?material=${mat.id}`} style={{ textDecoration: "none" }}>
                  <button
                    className="btn-primary"
                    style={{ backgroundColor: mat.cor, color: "#fff", border: "none", padding: "13px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
                  >
                    Ver produtos em {mat.titulo} →
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Outros materiais */}
          <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {MATERIAIS.filter(m => m.id !== activeId).map(m => (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                style={{ backgroundColor: "#fff", borderRadius: "14px", border: `1px solid ${BORDER}`, padding: "20px", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = m.cor; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
              >
                <span style={{ fontSize: "28px" }}>{m.emoji}</span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, margin: "0 0 2px" }}>{m.titulo}</p>
                  <p style={{ fontSize: "11px", color: MUTED, margin: 0 }}>⏱ {m.tempo}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <section style={{ backgroundColor: "#fff", borderTop: `1px solid ${BORDER}`, padding: "56px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "26px", fontWeight: 800, color: DARK, margin: "0 0 12px" }}>Não sabes qual material escolher?</h2>
            <p style={{ fontSize: "15px", color: MUTED, margin: "0 0 28px", lineHeight: 1.65 }}>
              Descreve o teu projeto e aconselhamos o material mais adequado, sem compromisso.
            </p>
            <Link href="/personalizado" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ backgroundColor: O, color: "#fff", border: "none", padding: "13px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                Pedir aconselhamento gratuito →
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
