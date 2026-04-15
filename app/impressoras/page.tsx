"use client";

import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ff6a00";
const DARK = "#1f1b18";
const CREAM = "#f5f4f2";
const CREAM_MUTED = "#c9c7c4";
const BORDER_LIGHT = "#e8e5e1";

const IMPRESSORAS = [
  {
    id: "x1c",
    nome: "Bambu Lab X1 Carbon",
    subtitulo: "Impressão multi-material de alta velocidade",
    descricao:
      "A nossa máquina de topo. Capaz de imprimir com até 16 materiais diferentes em simultâneo, a velocidade até 500 mm/s e com precisão industrial. Ideal para peças complexas, protótipos funcionais e produções em série.",
    specs: [
      { label: "Velocidade máx.", valor: "500 mm/s" },
      { label: "Volume de impressão", valor: "256 × 256 × 256 mm" },
      { label: "Temperatura extrusor", valor: "até 300 °C" },
      { label: "Multi-material", valor: "AMS — até 16 cores/materiais" },
    ],
    materiais: ["PLA", "PETG", "ABS", "ASA", "TPU", "PA", "PC", "PVA"],
    projetos: ["Protótipos multi-cor", "Peças técnicas", "Produções em série", "Modelos de engenharia"],
    cor: "#4a90d9",
    emoji: "🏆",
  },
  {
    id: "p1s",
    nome: "Bambu Lab P1S",
    subtitulo: "Câmara fechada para materiais técnicos",
    descricao:
      "Câmara de impressão completamente fechada e aquecida, ideal para materiais técnicos como ABS, ASA e Policarbonato. Garante peças com excelente acabamento superficial e propriedades mecânicas superiores.",
    specs: [
      { label: "Velocidade máx.", valor: "500 mm/s" },
      { label: "Volume de impressão", valor: "256 × 256 × 256 mm" },
      { label: "Temperatura câmara", valor: "até 65 °C" },
      { label: "Temperatura cama", valor: "até 120 °C" },
    ],
    materiais: ["ABS", "ASA", "PC", "PETG", "PA-CF", "PLA", "TPU"],
    projetos: ["Peças funcionais", "Componentes industriais", "Peças resistentes ao calor", "Protótipos técnicos"],
    cor: "#6dbe6d",
    emoji: "⚙️",
  },
  {
    id: "a1mini",
    nome: "Bambu Lab A1 Mini",
    subtitulo: "Precisão máxima para peças de detalhe",
    descricao:
      "Perfeita para peças pequenas com elevado nível de detalhe. Ideal para miniaturas, protótipos rápidos e peças com geometrias complexas. O nosso workhorse para projetos de detalhe e pequenas séries.",
    specs: [
      { label: "Velocidade máx.", valor: "500 mm/s" },
      { label: "Volume de impressão", valor: "180 × 180 × 180 mm" },
      { label: "Diâmetro do filamento", valor: "1.75 mm" },
      { label: "Resolução de camada", valor: "0.05 – 0.35 mm" },
    ],
    materiais: ["PLA", "PETG", "TPU", "PLA-CF", "PLA Silk"],
    projetos: ["Miniaturas e figuras", "Protótipos rápidos", "Peças decorativas", "Modelos arquitetónicos"],
    cor: "#b06dd9",
    emoji: "🎯",
  },
];

export default function ImpressorasPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          style={{
            backgroundColor: DARK,
            padding: "100px 40px 80px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.025,
              backgroundImage: `linear-gradient(${O} 1px,transparent 1px),linear-gradient(90deg,${O} 1px,transparent 1px)`,
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: `rgba(255,106,0,0.15)`,
                border: `1px solid rgba(255,106,0,0.3)`,
                borderRadius: "20px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "12px", color: O, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Tecnologia Bambu Lab
              </span>
            </div>
            <h1
              className="animate-slide-up"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 900, color: CREAM, lineHeight: 1.1, margin: "0 0 20px" }}
            >
              Tecnologia de ponta ao{" "}
              <span style={{ color: O }}>serviço da tua ideia</span>
            </h1>
            <p
              className="animate-slide-up-delay"
              style={{ fontSize: "18px", color: CREAM_MUTED, lineHeight: 1.7, margin: "0 0 36px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}
            >
              Usamos exclusivamente impressoras Bambu Lab — as mais rápidas e precisas do mercado. Cada peça que sai da nossa farm é produzida com o melhor equipamento disponível.
            </p>
            <div className="animate-slide-up-delay2" style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { valor: "3", label: "impressoras ativas" },
                { valor: "500mm/s", label: "velocidade máx." },
                { valor: "16", label: "materiais disponíveis" },
              ].map(({ valor, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: O }}>{valor}</div>
                  <div style={{ fontSize: "13px", color: CREAM_MUTED }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Impressoras ── */}
        <section style={{ backgroundColor: CREAM, padding: "80px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 12px" }}>
                A nossa frota de impressão
              </h2>
              <p style={{ fontSize: "16px", color: "#6b6560", maxWidth: "480px", margin: "0 auto" }}>
                Três máquinas com perfis complementares, prontas para qualquer projeto.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
              {IMPRESSORAS.map((imp, i) => (
                <div
                  key={imp.id}
                  className="reveal"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    border: `1px solid ${BORDER_LIGHT}`,
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: i % 2 === 0 ? "340px 1fr" : "1fr 340px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Imagem placeholder */}
                  {i % 2 === 0 && (
                    <div
                      style={{
                        backgroundColor: DARK,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px",
                        gap: "16px",
                      }}
                    >
                      <div style={{ fontSize: "80px" }}>{imp.emoji}</div>
                      <div
                        style={{
                          backgroundColor: imp.cor + "22",
                          border: `1px solid ${imp.cor}44`,
                          borderRadius: "8px",
                          padding: "8px 16px",
                          fontSize: "12px",
                          color: imp.cor,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Bambu Lab
                      </div>
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div style={{ padding: "40px" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: DARK, margin: "0 0 4px" }}>
                      {imp.nome}
                    </h3>
                    <p style={{ fontSize: "14px", color: O, fontWeight: 600, margin: "0 0 16px" }}>
                      {imp.subtitulo}
                    </p>
                    <p style={{ fontSize: "15px", color: "#4a4540", lineHeight: 1.7, margin: "0 0 24px" }}>
                      {imp.descricao}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "24px" }}>
                      {/* Specs */}
                      <div>
                        <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#6b6560", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                          Especificações
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {imp.specs.map(s => (
                            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", borderBottom: `1px solid ${BORDER_LIGHT}`, paddingBottom: "6px" }}>
                              <span style={{ color: "#6b6560" }}>{s.label}</span>
                              <span style={{ color: DARK, fontWeight: 600 }}>{s.valor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Materiais */}
                      <div>
                        <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#6b6560", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                          Materiais compatíveis
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                          {imp.materiais.map(m => (
                            <span
                              key={m}
                              style={{
                                backgroundColor: imp.cor + "18",
                                border: `1px solid ${imp.cor}44`,
                                borderRadius: "6px",
                                padding: "3px 10px",
                                fontSize: "12px",
                                color: DARK,
                                fontWeight: 600,
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                        <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#6b6560", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
                          Ideal para
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                          {imp.projetos.map(p => (
                            <li key={p} style={{ fontSize: "13px", color: "#4a4540", display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ color: O, fontSize: "10px" }}>●</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Imagem placeholder (lado direito) */}
                  {i % 2 !== 0 && (
                    <div
                      style={{
                        backgroundColor: DARK,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px",
                        gap: "16px",
                      }}
                    >
                      <div style={{ fontSize: "80px" }}>{imp.emoji}</div>
                      <div
                        style={{
                          backgroundColor: imp.cor + "22",
                          border: `1px solid ${imp.cor}44`,
                          borderRadius: "8px",
                          padding: "8px 16px",
                          fontSize: "12px",
                          color: imp.cor,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Bambu Lab
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Banner Bambu Lab ── */}
        <section style={{ backgroundColor: DARK, padding: "64px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🤝</div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: CREAM, margin: "0 0 12px" }}>
              Parceiros tecnológicos da Bambu Lab
            </h2>
            <p style={{ fontSize: "15px", color: CREAM_MUTED, lineHeight: 1.7, margin: "0 0 28px" }}>
              A Bambu Lab é líder global em impressão 3D de consumo e semi-profissional. A nossa parceria garante acesso ao melhor hardware disponível no mercado, com suporte técnico dedicado.
            </p>
            <a
              href="https://bambulab.com/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "transparent",
                border: `1.5px solid rgba(255,255,255,0.3)`,
                color: CREAM,
                padding: "12px 28px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = O;
                (e.currentTarget as HTMLAnchorElement).style.color = O;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.color = CREAM;
              }}
            >
              Visitar bambulab.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: CREAM, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 16px" }}>
              Pronto para começar?
            </h2>
            <p style={{ fontSize: "16px", color: "#6b6560", lineHeight: 1.7, margin: "0 0 32px" }}>
              Explora os nossos produtos prontos a enviar ou envia-nos o teu projeto para um orçamento personalizado.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/produtos"
                className="btn-primary"
                style={{ backgroundColor: O, color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}
              >
                Ver os nossos produtos →
              </Link>
              <Link
                href="/personalizado"
                className="btn-outline"
                style={{ backgroundColor: "transparent", color: DARK, border: `1.5px solid #d0ccc7`, padding: "14px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
              >
                Pedir orçamento
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
