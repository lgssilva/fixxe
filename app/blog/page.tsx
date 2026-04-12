"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const CREAM = "#f5f4f2";
const BORDER = "#e8e5e1";

type Cat = "Todos" | "Tutoriais" | "Materiais" | "Projetos" | "Novidades";

const CAT_COLOR: Record<Cat, string> = {
  Todos:     O,
  Tutoriais: "#5ba3d9",
  Materiais: "#6dbe6d",
  Projetos:  "#b06dd9",
  Novidades: O,
};

const ARTIGOS = [
  {
    cat: "Tutoriais" as Cat,
    data: "5 Abr 2025",
    titulo: "Como preparar ficheiros STL para impressão perfeita",
    resumo: "Aprende as melhores práticas para exportar modelos 3D, corrigir erros de malha e orientar as peças para obter o melhor resultado possível.",
    leitura: "7 min",
  },
  {
    cat: "Materiais" as Cat,
    data: "28 Mar 2025",
    titulo: "PETG vs ABS: qual é o melhor para peças funcionais?",
    resumo: "Comparamos dois dos materiais mais populares para impressão 3D técnica. Resistência, temperatura, flexibilidade e facilidade de impressão.",
    leitura: "5 min",
  },
  {
    cat: "Projetos" as Cat,
    data: "20 Mar 2025",
    titulo: "Top 5 produtos de impressão 3D para organizar a tua casa",
    resumo: "Organizadores de secretária, suportes de telemóvel e vasos geométricos: selecionámos os nossos produtos favoritos para transformar o teu espaço.",
    leitura: "4 min",
  },
  {
    cat: "Novidades" as Cat,
    data: "12 Mar 2025",
    titulo: "A impressão 3D em Portugal: onde estamos e para onde vamos",
    resumo: "Uma análise ao estado atual da indústria de impressão 3D em Portugal — oportunidades, desafios e o papel das pequenas empresas como a Fixxe.",
    leitura: "8 min",
  },
  {
    cat: "Materiais" as Cat,
    data: "3 Mar 2025",
    titulo: "Guia completo ao PLA: o material mais versátil da impressão 3D",
    resumo: "Tudo o que precisas de saber sobre o PLA — propriedades, variantes (PLA+, PLA Silk), temperatura, reciclagem e os melhores casos de uso.",
    leitura: "6 min",
  },
  {
    cat: "Novidades" as Cat,
    data: "18 Fev 2025",
    titulo: "Sustentabilidade na impressão 3D: filamentos eco e PLA reciclável",
    resumo: "A impressão 3D pode ser mais verde do que pensas. Descobre como a Fixxe minimiza desperdício e usa materiais com menor impacto ambiental.",
    leitura: "5 min",
  },
];

export default function BlogPage() {
  const [catFilter, setCatFilter] = useState<Cat>("Todos");
  const CATS: Cat[] = ["Todos", "Tutoriais", "Materiais", "Projetos", "Novidades"];

  const filtered = catFilter === "Todos" ? ARTIGOS : ARTIGOS.filter(a => a.cat === catFilter);

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ backgroundColor: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "56px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Blog & Novidades</p>
            <h1 style={{ fontSize: "40px", fontWeight: 900, color: DARK, margin: "0 0 16px", lineHeight: 1.2 }}>
              Tudo sobre impressão 3D
            </h1>
            <p style={{ fontSize: "16px", color: MUTED, lineHeight: 1.7, margin: 0 }}>
              Tutoriais, comparações de materiais, projetos inspiradores e as últimas novidades do mundo da impressão 3D.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
          {/* Filtros */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                style={{
                  padding: "7px 16px", borderRadius: "20px", border: `1px solid ${catFilter === cat ? CAT_COLOR[cat] : BORDER}`,
                  backgroundColor: catFilter === cat ? CAT_COLOR[cat] : "#fff",
                  color: catFilter === cat ? "#fff" : MUTED,
                  fontSize: "13px", fontWeight: catFilter === cat ? 700 : 400,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {filtered.map((art, i) => (
              <article key={i} className="blog-card" style={{ backgroundColor: "#fff", borderRadius: "14px", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
                {/* Imagem placeholder */}
                <div style={{ height: "200px", backgroundColor: "#e8e5e1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: CAT_COLOR[art.cat], color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>
                    {art.cat}
                  </span>
                </div>

                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", color: MUTED }}>{art.data}</span>
                    <span style={{ fontSize: "11px", color: MUTED, backgroundColor: CREAM, padding: "2px 8px", borderRadius: "20px" }}>⏱ {art.leitura}</span>
                  </div>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: DARK, margin: "0 0 10px", lineHeight: 1.35 }}>{art.titulo}</h2>
                  <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.6, margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {art.resumo}
                  </p>
                  <Link href="/blog/artigo" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", color: O, fontWeight: 600, textDecoration: "none" }}>
                    Ler mais →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: MUTED }}>
              <p style={{ fontSize: "15px" }}>Nenhum artigo nesta categoria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
