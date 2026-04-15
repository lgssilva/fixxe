"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const CREAM = "#f5f4f2";
const BORDER = "#e8e5e1";

type Cat = "Todos" | "Tutoriais" | "Materiais" | "Projetos" | "Novidades";

const CAT_COLOR: Record<Cat, string> = {
  Todos:     O,
  Tutoriais: O,
  Materiais: "#6dbe6d",
  Projetos:  "#b06dd9",
  Novidades: "#5ba3d9",
};

const ARTIGOS = [
  {
    cat: "Materiais" as Cat,
    data: "12 Março 2025",
    titulo: "PLA vs PETG: qual o material certo para o teu projeto?",
    resumo: "Dois dos materiais mais populares na impressão 3D têm características muito distintas. Descobre qual escolher consoante a aplicação, o ambiente e o acabamento que precisas.",
    leitura: "5 min",
  },
  {
    cat: "Tutoriais" as Cat,
    data: "28 Fevereiro 2025",
    titulo: "Como preparar o teu ficheiro 3D para impressão: guia completo",
    resumo: "Antes de enviar o teu modelo para impressão, há passos essenciais que determinam a qualidade do resultado final. Da exportação em STL à orientação na mesa — tudo o que precisas saber.",
    leitura: "8 min",
  },
  {
    cat: "Projetos" as Cat,
    data: "15 Fevereiro 2025",
    titulo: "Case study: como criámos 200 peças personalizadas para uma startup de Lisboa",
    resumo: "Uma startup de tecnologia precisava de protótipos funcionais em tempo recorde. Descobre como planeámos a produção, escolhemos os materiais e entregámos tudo em 5 dias úteis.",
    leitura: "6 min",
  },
  {
    cat: "Materiais" as Cat,
    data: "3 Fevereiro 2025",
    titulo: "Resina vs FDM: quando vale a pena o investimento em alta definição?",
    resumo: "A impressão em resina oferece detalhes sub-milimétricos impossíveis de alcançar com FDM. Mas nem sempre é a melhor escolha. Comparamos custo, tempo, resistência e acabamento.",
    leitura: "7 min",
  },
  {
    cat: "Novidades" as Cat,
    data: "20 Janeiro 2025",
    titulo: "Fixxe estreia serviço de design 3D: do conceito ao produto final",
    resumo: "A partir de hoje não precisas de ter um ficheiro 3D para encomendar. A nossa equipa de designers transforma a tua ideia — mesmo que seja apenas um esboço em papel — num produto real.",
    leitura: "4 min",
  },
  {
    cat: "Tutoriais" as Cat,
    data: "8 Janeiro 2025",
    titulo: "10 erros comuns na impressão 3D e como evitá-los",
    resumo: "Desde a primeira camada que não adere até ao warping que arruína horas de impressão — listamos os problemas mais frequentes e as soluções que realmente funcionam.",
    leitura: "10 min",
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
            <p className="animate-slide-up" style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>Blog & Novidades</p>
            <h1 className="animate-slide-up-delay" style={{ fontSize: "40px", fontWeight: 900, color: DARK, margin: "0 0 16px", lineHeight: 1.2 }}>
              Tudo sobre impressão 3D
            </h1>
            <p className="animate-slide-up-delay2" style={{ fontSize: "16px", color: MUTED, lineHeight: 1.7, margin: 0 }}>
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
              <article
                key={i}
                className="blog-card reveal"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "14px",
                  border: `1px solid ${BORDER}`,
                  overflow: "hidden",
                  animationDelay: `${i * 0.08}s`,
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                {/* Imagem placeholder com shimmer */}
                <div style={{ height: "200px", backgroundColor: "#e8e5e1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1" style={{ position: "relative", zIndex: 1 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: CAT_COLOR[art.cat], color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", zIndex: 2 }}>
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
                  <Link href="/blog/artigo" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", color: O, fontWeight: 600, textDecoration: "none", transition: "gap 0.2s ease" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "8px"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "4px"; }}
                  >
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

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: shimmer 1.6s infinite;
        }
        .blog-card.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <Footer />
    </>
  );
}
