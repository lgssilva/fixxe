"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ff6a00";
const DARK = "#1f1b18";
const CREAM = "#f5f4f2";
const CREAM_MUTED = "#c9c7c4";
const BORDER = "#3a342e";
const BORDER_LIGHT = "#e8e5e1";

const O_RGBA = (alpha: number) => `rgba(255,106,0,${alpha})`;

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function FarmPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section style={{ backgroundColor: DARK, padding: "100px 40px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${O} 1px,transparent 1px),linear-gradient(90deg,${O} 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: O_RGBA(0.15), border: `1px solid ${O_RGBA(0.3)}`, borderRadius: "20px", padding: "6px 16px", marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", color: O, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Cascais, Lisboa</span>
            </div>
            <h1 className="animate-slide-up" style={{ fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)", fontWeight: 900, color: CREAM, lineHeight: 1.08, margin: "0 0 20px" }}>
              A Nossa <span style={{ color: O }}>Farm de Impressão 3D</span>
            </h1>
            <p className="animate-slide-up-delay" style={{ fontSize: "20px", color: CREAM_MUTED, lineHeight: 1.65, margin: "0 0 40px", maxWidth: "580px", marginLeft: "auto", marginRight: "auto" }}>
              Da tua ideia ao produto final, temos capacidade para tudo.
            </p>
            <div className="animate-slide-up-delay2" style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { valor: "3+", label: "Impressoras ativas" },
                { valor: "24h", label: "Prototipagem rápida" },
                { valor: "100%", label: "Feito em Cascais" },
                { valor: "4h", label: "Resposta B2B" },
              ].map(({ valor, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: O }}>{valor}</div>
                  <div style={{ fontSize: "13px", color: CREAM_MUTED }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── O que fazemos ── */}
        <section style={{ backgroundColor: "#fff", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 12px" }}>O que fazemos</h2>
              <p style={{ fontSize: "16px", color: "#6b6560", maxWidth: "460px", margin: "0 auto" }}>
                Mais do que impressão 3D — somos parceiros de produção.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {[
                {
                  icon: "🏭",
                  titulo: "Produção em série",
                  desc: "Capacidade para centenas de peças por dia. Qualidade consistente em cada unidade, do primeiro ao último exemplar.",
                  cor: "#4a90d9",
                },
                {
                  icon: "⚡",
                  titulo: "Prototipagem rápida",
                  desc: "Do ficheiro ao protótipo em 24-48h. Iterações rápidas para validares a tua ideia antes de avançares para a produção.",
                  cor: O,
                },
                {
                  icon: "✨",
                  titulo: "Impressão personalizada",
                  desc: "Cada peça única, feita à tua medida. Desde uma decoração especial a um componente técnico de precisão.",
                  cor: "#6dbe6d",
                },
                {
                  icon: "🤝",
                  titulo: "Parceiros de produção",
                  desc: "Somos a fábrica da tua marca. Produção com NDA, faturação mensal e gestor de conta dedicado para empresas.",
                  cor: "#b06dd9",
                },
              ].map((item, i) => (
                <RevealCard key={item.titulo} delay={i * 0.08}>
                  <div
                    style={{
                      backgroundColor: CREAM,
                      borderRadius: "14px",
                      border: `1px solid ${BORDER_LIGHT}`,
                      padding: "32px 28px",
                      height: "100%",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = item.cor + "66";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = BORDER_LIGHT;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: DARK, margin: "0 0 10px" }}>{item.titulo}</h3>
                    <p style={{ fontSize: "14px", color: "#6b6560", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Como funciona ── */}
        <section style={{ backgroundColor: DARK, padding: "80px 40px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: CREAM, margin: "0 0 12px" }}>Como funciona</h2>
              <p style={{ fontSize: "16px", color: CREAM_MUTED, maxWidth: "420px", margin: "0 auto" }}>
                Da ideia à entrega em 4 passos simples.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0" }}>
              {[
                { num: "01", icon: "💡", titulo: "Envias a ideia", desc: "Partilha o teu ficheiro 3D, esboço ou apenas uma descrição. Aceitamos qualquer formato." },
                { num: "02", icon: "📋", titulo: "Orçamento em 24h", desc: "Analisamos o projeto e enviamos um orçamento detalhado em menos de 24 horas." },
                { num: "03", icon: "✅", titulo: "Aprovamos juntos", desc: "Validamos materiais, acabamentos e prazos. Só avançamos quando estás 100% satisfeito." },
                { num: "04", icon: "📦", titulo: "Produzimos e entregamos", desc: "Produção rigorosa e entrega em todo o território nacional, com tracking incluído." },
              ].map((step, i) => (
                <RevealCard key={step.num} delay={i * 0.1}>
                  <div style={{ padding: "32px 24px", position: "relative" }}>
                    {i < 3 && (
                      <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", color: BORDER, fontSize: "24px", display: "flex", alignItems: "center" }}>
                        →
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: O, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "15px", flexShrink: 0 }}>
                        {step.num}
                      </div>
                      <div style={{ fontSize: "28px" }}>{step.icon}</div>
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: CREAM, margin: "0 0 8px" }}>{step.titulo}</h3>
                    <p style={{ fontSize: "13px", color: CREAM_MUTED, lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── A nossa capacidade ── */}
        <section style={{ backgroundColor: O, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>A nossa capacidade</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", margin: "0 0 48px" }}>
              Números que mostram o nosso compromisso.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px" }}>
              {[
                { valor: "3+", label: "Impressoras ativas", icone: "🖨️" },
                { valor: "500+", label: "Peças por semana", icone: "📦" },
                { valor: "8+", label: "Materiais disponíveis", icone: "🧪" },
                { valor: "2+", label: "Anos de experiência", icone: "🏆" },
              ].map(({ valor, label, icone }) => (
                <div key={label} style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "12px", padding: "28px 20px", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{icone}</div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{valor}</div>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginTop: "6px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Imprimimos a tua ideia ── */}
        <section style={{ backgroundColor: "#fff", padding: "80px 40px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🌟</div>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 20px" }}>
              Imprimimos a tua ideia
            </h2>
            <p style={{ fontSize: "17px", color: "#4a4540", lineHeight: 1.75, margin: "0 0 20px" }}>
              Acreditas que qualquer ideia merece tornar-se realidade. Nós também. Da simples peça decorativa que torna a tua casa única, ao componente industrial que faz a diferença no teu negócio — a Fixxe transforma ficheiros em objetos reais com qualidade e rigor.
            </p>
            <p style={{ fontSize: "17px", color: "#4a4540", lineHeight: 1.75, margin: "0 0 40px" }}>
              Não tens o ficheiro? Não há problema. A nossa equipa ajuda-te desde o conceito inicial, desenhando a peça com base na tua ideia e entregando um produto final que supera as tuas expectativas.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", textAlign: "left" }}>
              {[
                "Decoração e arte",
                "Componentes industriais",
                "Protótipos de produto",
                "Miniaturas e colecionáveis",
                "Peças de substituição",
                "Maquetes arquitetónicas",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", backgroundColor: CREAM, borderRadius: "8px", border: `1px solid ${BORDER_LIGHT}` }}>
                  <span style={{ color: O, fontSize: "14px", fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: "14px", color: DARK, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: DARK, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: CREAM, margin: "0 0 16px" }}>
              Pronto para <span style={{ color: O }}>começar?</span>
            </h2>
            <p style={{ fontSize: "17px", color: CREAM_MUTED, lineHeight: 1.7, margin: "0 0 36px" }}>
              Envia-nos o teu projeto e recebe um orçamento em menos de 24 horas. Sem compromissos.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/personalizado"
                className="btn-primary"
                style={{ backgroundColor: O, color: "#fff", padding: "16px 32px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none" }}
              >
                Começa o teu projeto →
              </Link>
              <Link
                href="/b2b"
                className="btn-outline"
                style={{ backgroundColor: "transparent", color: CREAM, border: `1.5px solid rgba(255,255,255,0.25)`, padding: "16px 32px", borderRadius: "8px", fontWeight: 600, fontSize: "16px", textDecoration: "none" }}
              >
                Soluções B2B
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
