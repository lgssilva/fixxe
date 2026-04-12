"use client";

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
  },
];

export default function MateriaisPage() {
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

        {/* Secções por material */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px", display: "flex", flexDirection: "column", gap: "32px" }}>
          {MATERIAIS.map((mat, i) => (
            <section
              key={mat.id}
              style={{ backgroundColor: "#fff", borderRadius: "20px", border: `1px solid ${BORDER}`, overflow: "hidden" }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                direction: i % 2 === 0 ? "ltr" : "rtl",
              }}>
                {/* Visual */}
                <div style={{ backgroundColor: mat.corBg, border: `0 solid ${mat.corBorder}`, padding: "48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", direction: "ltr" }}>
                  <div style={{ fontSize: "72px", marginBottom: "16px" }}>{mat.emoji}</div>
                  <span style={{ display: "inline-block", backgroundColor: mat.cor, color: "#fff", fontSize: "14px", fontWeight: 800, padding: "6px 18px", borderRadius: "20px", letterSpacing: "0.05em" }}>
                    {mat.titulo}
                  </span>
                  <p style={{ fontSize: "13px", color: MUTED, margin: "12px 0 0", textAlign: "center" }}>⏱ {mat.tempo}</p>
                </div>

                {/* Info */}
                <div style={{ padding: "40px", direction: "ltr" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: mat.cor, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" }}>{mat.subtitulo}</p>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: DARK, margin: "0 0 14px" }}>{mat.titulo}</h2>
                  <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.7, margin: "0 0 24px" }}>{mat.descricao}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                    {/* Características */}
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>Características</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                        {mat.caracteristicas.map(c => (
                          <li key={c} style={{ fontSize: "13px", color: MUTED, display: "flex", alignItems: "flex-start", gap: "7px" }}>
                            <span style={{ color: mat.cor, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Aplicações */}
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>Aplicações</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
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
                      style={{ backgroundColor: mat.cor, color: "#fff", border: "none", padding: "11px 22px", borderRadius: "9px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
                    >
                      Ver produtos em {mat.titulo} →
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA dúvidas */}
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
