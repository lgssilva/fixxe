"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ff6a00";
const DARK = "#1f1b18";
const DARK_CARD = "#2a2521";
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

const TIPO_PROJETO_OPTIONS = [
  "Prototipagem rápida",
  "Produção em série",
  "Componentes técnicos",
  "Maquetes e modelos",
  "Peças de substituição",
  "Marketing e eventos",
  "Outro",
];

const VOLUME_OPTIONS = [
  "Menos de 50 peças/mês",
  "50 – 200 peças/mês",
  "200 – 500 peças/mês",
  "Mais de 500 peças/mês",
  "Não sei ainda",
];

export default function B2BPage() {
  const [form, setForm] = useState({
    nome: "", empresa: "", email: "", telefone: "",
    tipo_projeto: "", volume: "", mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: `1px solid ${BORDER_LIGHT}`,
    fontSize: "14px",
    color: DARK,
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    color: "#6b6560",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: "6px",
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section style={{ backgroundColor: DARK, padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${O} 1px,transparent 1px),linear-gradient(90deg,${O} 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: O_RGBA(0.15), border: `1px solid ${O_RGBA(0.35)}`, borderRadius: "20px", padding: "6px 16px", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: O, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Soluções Empresariais</span>
              </div>
              <h1 className="animate-slide-up" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 900, color: CREAM, lineHeight: 1.08, margin: "0 0 20px" }}>
                O parceiro de produção 3D{" "}
                <span style={{ color: O }}>da tua empresa</span>
              </h1>
              <p className="animate-slide-up-delay" style={{ fontSize: "18px", color: CREAM_MUTED, lineHeight: 1.65, margin: "0 0 36px", maxWidth: "500px" }}>
                Prototipagem, produção em série e componentes técnicos para empresas que não aceitam compromissos.
              </p>
              <div className="animate-slide-up-delay2" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="#contacto"
                  className="btn-primary"
                  style={{ backgroundColor: O, color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}
                >
                  Solicitar proposta →
                </a>
                <Link
                  href="/farm"
                  className="btn-outline"
                  style={{ backgroundColor: "transparent", color: CREAM, border: `1.5px solid rgba(255,255,255,0.25)`, padding: "14px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
                >
                  Ver a nossa farm
                </Link>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { valor: "4h", label: "Resposta garantida", icone: "⚡" },
                { valor: "NDA", label: "Confidencialidade total", icone: "🔒" },
                { valor: "100%", label: "Qualidade consistente", icone: "✅" },
                { valor: "PT", label: "Entrega nacional", icone: "🚚" },
              ].map(({ valor, label, icone }) => (
                <div key={label} style={{ backgroundColor: DARK_CARD, borderRadius: "12px", padding: "24px", border: `1px solid ${BORDER}`, textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{icone}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: O }}>{valor}</div>
                  <div style={{ fontSize: "12px", color: CREAM_MUTED, marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Para que tipo de empresas ── */}
        <section style={{ backgroundColor: "#fff", padding: "80px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 12px" }}>Para que tipo de empresas?</h2>
              <p style={{ fontSize: "16px", color: "#6b6560", maxWidth: "460px", margin: "0 auto" }}>
                Trabalhamos com empresas de todos os setores que precisam de produção 3D de qualidade.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              {[
                { icon: "🚀", setor: "Startups & Scale-ups", desc: "Prototipagem ágil para iterar rápido e validar produto antes de produção em massa." },
                { icon: "🏛️", setor: "Arquitetura & Design", desc: "Maquetes, modelos arquitetónicos e peças de design para apresentações impactantes." },
                { icon: "⚙️", setor: "Engenharia & Indústria", desc: "Componentes técnicos, peças de substituição e fixtures de produção personalizados." },
                { icon: "🎪", setor: "Marketing & Eventos", desc: "Peças personalizadas, expositores, brindes e cenografias únicas para eventos." },
                { icon: "🏥", setor: "Medicina & Saúde", desc: "Modelos anatómicos, dispositivos auxiliares e peças para simulação clínica." },
                { icon: "🎓", setor: "Educação & Investigação", desc: "Modelos didáticos, protótipos de investigação e peças para laboratórios." },
              ].map((item, i) => (
                <RevealCard key={item.setor} delay={i * 0.07}>
                  <div
                    style={{ backgroundColor: CREAM, borderRadius: "12px", border: `1px solid ${BORDER_LIGHT}`, padding: "28px 24px", transition: "all 0.25s" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = O_RGBA(0.4);
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = BORDER_LIGHT;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <div style={{ fontSize: "2.2rem", marginBottom: "12px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>{item.setor}</h3>
                    <p style={{ fontSize: "13px", color: "#6b6560", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── O que oferecemos ── */}
        <section style={{ backgroundColor: DARK, padding: "80px 40px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: CREAM, margin: "0 0 12px" }}>O que oferecemos às empresas</h2>
              <p style={{ fontSize: "16px", color: CREAM_MUTED, maxWidth: "440px", margin: "0 auto" }}>
                Um serviço completo, pensado para empresas exigentes.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { icon: "👤", titulo: "Conta dedicada com gestor próprio", desc: "Um ponto de contacto único que conhece o teu negócio e projeto." },
                { icon: "⚡", titulo: "Orçamentos em menos de 4 horas", desc: "Resposta rápida em dias úteis para não perderes tempo precioso." },
                { icon: "🎯", titulo: "Qualidade consistente em série", desc: "Cada peça igual à anterior. Controlo de qualidade em cada lote." },
                { icon: "📊", titulo: "Faturação mensal e condições especiais", desc: "Descontos por volume e modalidades de pagamento flexíveis." },
                { icon: "🔒", titulo: "NDA e confidencialidade garantidos", desc: "Os teus projetos são teus. Assinamos acordo de confidencialidade." },
                { icon: "🚚", titulo: "Entrega em todo o território nacional", desc: "Envios rápidos com tracking completo para qualquer ponto de Portugal." },
              ].map((item, i) => (
                <RevealCard key={item.titulo} delay={i * 0.07}>
                  <div style={{ backgroundColor: DARK_CARD, borderRadius: "12px", border: `1px solid ${BORDER}`, padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: O_RGBA(0.15), border: `1px solid ${O_RGBA(0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: CREAM, margin: "0 0 6px" }}>{item.titulo}</h3>
                      <p style={{ fontSize: "13px", color: CREAM_MUTED, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Como funciona o B2B ── */}
        <section style={{ backgroundColor: "#fff", padding: "80px 40px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 12px" }}>Como funciona o B2B</h2>
              <p style={{ fontSize: "16px", color: "#6b6560", maxWidth: "420px", margin: "0 auto" }}>
                Um processo simples e transparente, do contacto à entrega.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { num: "1", titulo: "Contacto inicial", desc: "Conta-nos o teu projeto, volume estimado e requisitos. Podes usar o formulário abaixo ou enviar-nos um email.", icone: "📩" },
                { num: "2", titulo: "Proposta personalizada", desc: "Analisamos o teu projeto e enviamos um orçamento detalhado com materiais, prazos e condições em menos de 4 horas.", icone: "📋" },
                { num: "3", titulo: "Aprovação e produção", desc: "Depois da tua confirmação, iniciamos a produção de imediato. Recebes atualizações em tempo real.", icone: "⚙️" },
                { num: "4", titulo: "Entrega e suporte", desc: "Entregamos em todo o território nacional com tracking. O teu gestor de conta acompanha-te pós-entrega.", icone: "📦" },
              ].map((step, i) => (
                <RevealCard key={step.num} delay={i * 0.08}>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "24px", padding: "28px 0", borderBottom: i < 3 ? `1px solid ${BORDER_LIGHT}` : "none", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: O, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "20px" }}>
                        {step.num}
                      </div>
                      <div style={{ fontSize: "24px" }}>{step.icone}</div>
                    </div>
                    <div style={{ paddingTop: "8px" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>{step.titulo}</h3>
                      <p style={{ fontSize: "15px", color: "#6b6560", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cases de sucesso ── */}
        <section style={{ backgroundColor: CREAM, padding: "80px 40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: DARK, margin: "0 0 12px" }}>Cases de sucesso</h2>
              <p style={{ fontSize: "16px", color: "#6b6560", maxWidth: "420px", margin: "0 auto" }}>
                Empresas que confiam na Fixxe para a sua produção 3D.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {[
                {
                  empresa: "Startup de Lisboa",
                  setor: "Tech / Hardware",
                  desc: "Produção de 200 protótipos funcionais para demonstração a investidores. Entrega em 5 dias com qualidade consistente em todas as unidades.",
                  resultado: "200 protótipos em 5 dias",
                  icone: "🚀",
                  cor: "#4a90d9",
                },
                {
                  empresa: "Gabinete de Arquitetura",
                  setor: "Arquitetura & Design",
                  desc: "Maquetes arquitetónicas em escala para apresentação de concurso público. Detalhes milimétricos que impressionaram o júri.",
                  resultado: "3 maquetes premiadas",
                  icone: "🏛️",
                  cor: "#6dbe6d",
                },
                {
                  empresa: "Empresa de Eventos",
                  setor: "Marketing & Eventos",
                  desc: "Peças personalizadas com logótipo para evento corporativo de 500 convidados. Entrega no dia anterior ao evento, sem falhas.",
                  resultado: "500 peças personalizadas",
                  icone: "🎪",
                  cor: "#b06dd9",
                },
              ].map((c, i) => (
                <RevealCard key={c.empresa} delay={i * 0.1}>
                  <div style={{ backgroundColor: "#fff", borderRadius: "14px", border: `1px solid ${BORDER_LIGHT}`, padding: "32px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: c.cor + "18", border: `1px solid ${c.cor}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                        {c.icone}
                      </div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: DARK }}>{c.empresa}</div>
                        <div style={{ fontSize: "12px", color: "#6b6560" }}>{c.setor}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "#4a4540", lineHeight: 1.7, margin: "0 0 20px" }}>{c.desc}</p>
                    <div style={{ backgroundColor: O_RGBA(0.08), border: `1px solid ${O_RGBA(0.2)}`, borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: O, fontWeight: 700, fontSize: "14px" }}>✓</span>
                      <span style={{ fontSize: "13px", color: DARK, fontWeight: 600 }}>{c.resultado}</span>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Formulário B2B ── */}
        <section id="contacto" style={{ backgroundColor: DARK, padding: "80px 40px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: CREAM, margin: "0 0 12px" }}>
                Solicita uma proposta comercial
              </h2>
              <p style={{ fontSize: "16px", color: CREAM_MUTED, margin: "0 0 16px" }}>
                Preenche o formulário e respondemos em menos de 4 horas em dias úteis.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: O_RGBA(0.15), border: `1px solid ${O_RGBA(0.3)}`, borderRadius: "20px", padding: "8px 20px" }}>
                <span style={{ fontSize: "16px" }}>⚡</span>
                <span style={{ fontSize: "13px", color: O, fontWeight: 700 }}>Respondemos em menos de 4 horas em dias úteis</span>
              </div>
            </div>

            {sent ? (
              <div style={{ backgroundColor: DARK_CARD, borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "60px 40px", textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "20px" }}>✅</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: CREAM, margin: "0 0 12px" }}>Proposta solicitada com sucesso!</h3>
                <p style={{ fontSize: "15px", color: CREAM_MUTED, lineHeight: 1.7, margin: "0 0 28px" }}>
                  Recebemos o teu pedido e vamos analisá-lo. Entraremos em contacto em menos de 4 horas.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{ backgroundColor: O, color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
                >
                  Enviar outro pedido
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ backgroundColor: DARK_CARD, borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "40px" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={labelStyle}>Nome *</label>
                    <input
                      type="text"
                      name="nome"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="O teu nome"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                      onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Empresa *</label>
                    <input
                      type="text"
                      name="empresa"
                      required
                      value={form.empresa}
                      onChange={handleChange}
                      placeholder="Nome da empresa"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                      onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={labelStyle}>Email empresarial *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@empresa.pt"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                      onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      placeholder="+351 912 345 678"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                      onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div>
                    <label style={labelStyle}>Tipo de projeto *</label>
                    <select
                      name="tipo_projeto"
                      required
                      value={form.tipo_projeto}
                      onChange={handleChange}
                      style={{ ...inputStyle, backgroundColor: "#fff", cursor: "pointer" }}
                      onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                      onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                    >
                      <option value="">Seleciona uma opção</option>
                      {TIPO_PROJETO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Volume mensal estimado</label>
                    <select
                      name="volume"
                      value={form.volume}
                      onChange={handleChange}
                      style={{ ...inputStyle, backgroundColor: "#fff", cursor: "pointer" }}
                      onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                      onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                    >
                      <option value="">Seleciona uma opção</option>
                      {VOLUME_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <label style={labelStyle}>Mensagem / Descrição do projeto *</label>
                  <textarea
                    name="mensagem"
                    required
                    value={form.mensagem}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Descreve o teu projeto, materiais preferidos, prazo, e qualquer detalhe relevante..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px", fontFamily: "inherit" }}
                    onFocus={e => { e.target.style.borderColor = O; e.target.style.boxShadow = `0 0 0 3px ${O_RGBA(0.12)}`; }}
                    onBlur={e => { e.target.style.borderColor = BORDER_LIGHT; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    backgroundColor: loading ? "#c95200" : O,
                    color: "#fff",
                    border: "none",
                    padding: "16px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "16px",
                    cursor: loading ? "wait" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                      A enviar...
                    </>
                  ) : (
                    "Solicitar proposta comercial →"
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
