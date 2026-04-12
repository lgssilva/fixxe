"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const CREAM = "#f5f4f2";
const BORDER = "#e8e5e1";

const PASSOS = [
  { num: 1, titulo: "Envias o ficheiro",        desc: "Partilha o teu ficheiro .STL, .OBJ ou .3MF — ou descreve a ideia e nós ajudamos com o design." },
  { num: 2, titulo: "Recebemos o orçamento",    desc: "Analisamos o projeto e enviamos um orçamento detalhado em menos de 24 horas, sem compromisso." },
  { num: 3, titulo: "Aprovamos juntos",          desc: "Confirmamos material, cor, acabamento e detalhes finais. Só avançamos quando estiveres satisfeito." },
  { num: 4, titulo: "Entregamos em casa",       desc: "Imprimimos com precisão e entregamos na tua morada em embalagem segura e com rastreio." },
];

const TIPOS = ["Decoração", "Prototipagem", "Peça funcional", "Miniatura", "Outro"];
const MATERIAIS_OPT = ["PLA", "PETG", "ABS", "Resina", "Não sei — aconselhem-me"];
const PRAZOS = ["Urgente (–3 dias úteis)", "Normal (3–7 dias úteis)", "Sem pressa (+7 dias úteis)"];

function Toast({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "fixed", bottom: "28px", left: "50%",
      transform: `translateX(-50%) translateY(${visible ? "0" : "80px"})`,
      backgroundColor: DARK, color: "#fff", padding: "14px 28px", borderRadius: "12px",
      display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 500,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)", opacity: visible ? 1 : 0,
      transition: "transform 0.3s ease, opacity 0.3s ease", zIndex: 500, pointerEvents: "none",
    }}>
      <span style={{ color: "#6dbe6d", fontSize: "18px" }}>✓</span>
      Pedido enviado! Respondemos em menos de 24 horas.
    </div>
  );
}

export default function PersonalizadoPage() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    tipo: TIPOS[0], material: MATERIAIS_OPT[0],
    dimensoes: "", quantidade: "1", prazo: PRAZOS[1],
    mensagem: "", semFicheiro: false,
  });
  const [dragOver, setDragOver] = useState(false);
  const [files,    setFiles]    = useState<string[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    Array.from(e.dataTransfer.files).forEach(f => setFiles(prev => [...prev, f.name]));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      setLoading(false); setToast(true);
      setForm({ nome: "", email: "", telefone: "", tipo: TIPOS[0], material: MATERIAIS_OPT[0], dimensoes: "", quantidade: "1", prazo: PRAZOS[1], mensagem: "", semFicheiro: false });
      setFiles([]);
      setTimeout(() => setToast(false), 4000);
    }, 1200);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 13px", borderRadius: "8px",
    border: `1px solid ${BORDER}`, fontSize: "14px", color: DARK,
    backgroundColor: "#fff", boxSizing: "border-box", outline: "none",
  };

  return (
    <>
      <Navbar />

      <main>
        {/* Hero escuro */}
        <section style={{ backgroundColor: DARK, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(238,146,77,0.15)", color: O, fontSize: "12px", fontWeight: 700, padding: "5px 14px", borderRadius: "20px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              Sob medida
            </span>
            <h1 style={{ fontSize: "48px", fontWeight: 900, color: "#fff", margin: "0 0 18px", lineHeight: 1.15 }}>
              Projetos <span style={{ color: O }}>sob medida</span>
            </h1>
            <p style={{ fontSize: "18px", color: "#c9c7c4", lineHeight: 1.7, margin: "0 0 32px" }}>
              Do teu ficheiro ao produto final — transformamos qualquer ideia em realidade com precisão e qualidade industrial.
            </p>
            {/* Selos */}
            <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
              {["✓ Sem compromisso", "⚡ Resposta em 24h", "🎁 Orçamento gratuito"].map(s => (
                <span key={s} style={{ fontSize: "14px", color: "#c9c7c4", fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section style={{ backgroundColor: "#fff", padding: "72px 40px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Processo</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: 0 }}>Como funciona</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
              {PASSOS.map(({ num, titulo, desc }, i) => (
                <div key={num} style={{ position: "relative", textAlign: "center", padding: "28px 16px" }}>
                  {/* Linha de ligação */}
                  {i < 3 && (
                    <div style={{ position: "absolute", top: "36px", left: "calc(50% + 28px)", right: "-50%", height: "2px", backgroundColor: BORDER, zIndex: 0 }} />
                  )}
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: O, color: "#fff", fontSize: "20px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", position: "relative", zIndex: 1 }}>
                    {num}
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>{titulo}</h3>
                  <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section style={{ backgroundColor: CREAM, padding: "72px 40px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Orçamento gratuito</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: "0 0 10px" }}>Pede o teu orçamento</h2>
              <p style={{ fontSize: "15px", color: MUTED, margin: 0 }}>Sem compromisso. Sem custos. Respondemos em menos de 24 horas.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", borderRadius: "20px", border: `1px solid ${BORDER}`, padding: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Dados pessoais */}
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px", paddingBottom: "10px", borderBottom: `1px solid ${BORDER}` }}>Dados de contacto</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Nome completo *</label>
                    <input required type="text" value={form.nome} onChange={set("nome")} placeholder="Maria Silva" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} placeholder="maria@exemplo.pt" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Telefone</label>
                    <input type="tel" value={form.telefone} onChange={set("telefone")} placeholder="+351 912 345 678" style={inp} />
                  </div>
                </div>
              </div>

              {/* Projeto */}
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px", paddingBottom: "10px", borderBottom: `1px solid ${BORDER}` }}>Detalhes do projeto</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Tipo de projeto *</label>
                    <select required value={form.tipo} onChange={set("tipo")} style={inp}>
                      {TIPOS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Material preferido</label>
                    <select value={form.material} onChange={set("material")} style={inp}>
                      {MATERIAIS_OPT.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Dimensões aproximadas</label>
                    <input type="text" value={form.dimensoes} onChange={set("dimensoes")} placeholder="ex: 10 × 10 × 15 cm" style={inp} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Quantidade</label>
                      <input type="number" min="1" value={form.quantidade} onChange={set("quantidade")} style={inp} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Prazo desejado</label>
                      <select value={form.prazo} onChange={set("prazo")} style={{ ...inp, fontSize: "12px" }}>
                        {PRAZOS.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "8px" }}>Ficheiro do projeto (.STL, .OBJ, .3MF)</label>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  style={{ border: `2px dashed ${dragOver ? O : BORDER}`, borderRadius: "10px", padding: "28px", textAlign: "center", backgroundColor: dragOver ? "#fff9f5" : "#fafaf9", transition: "all 0.2s" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={dragOver ? O : MUTED} strokeWidth="1.5" style={{ display: "block", margin: "0 auto 10px" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: dragOver ? O : DARK, margin: "0 0 4px" }}>
                    {dragOver ? "Larga o ficheiro aqui" : "Arrasta o ficheiro ou clica para seleccionar"}
                  </p>
                  <p style={{ fontSize: "11px", color: MUTED, margin: "0 0 12px" }}>Formatos aceites: .STL · .OBJ · .3MF · .STEP</p>
                  <label style={{ display: "inline-block", padding: "7px 16px", borderRadius: "7px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "12px", fontWeight: 500, color: DARK, cursor: "pointer" }}>
                    Seleccionar ficheiro
                    <input type="file" accept=".stl,.obj,.3mf,.step" multiple style={{ display: "none" }} onChange={e => { Array.from(e.target.files ?? []).forEach(f => setFiles(prev => [...prev, f.name])); }} />
                  </label>
                  {files.length > 0 && (
                    <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                      {files.map((f, i) => (
                        <span key={i} style={{ fontSize: "11px", backgroundColor: CREAM, border: `1px solid ${BORDER}`, borderRadius: "20px", padding: "3px 10px", color: DARK }}>📎 {f}</span>
                      ))}
                    </div>
                  )}
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", cursor: "pointer", fontSize: "13px", color: MUTED }}>
                  <input type="checkbox" checked={form.semFicheiro} onChange={set("semFicheiro")} style={{ accentColor: O, width: "15px", height: "15px" }} />
                  Não tenho ficheiro — preciso de ajuda com o design
                </label>
              </div>

              {/* Mensagem */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Mensagem / detalhes adicionais</label>
                <textarea value={form.mensagem} onChange={set("mensagem")} rows={4} placeholder="Descreve o projeto, cor desejada, acabamento, referências visuais, etc." style={{ ...inp, resize: "vertical", lineHeight: 1.6 }} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ backgroundColor: O, color: "#fff", border: "none", padding: "15px", borderRadius: "10px", fontWeight: 700, fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
              >
                {loading ? (
                  <>
                    <div style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    A enviar pedido...
                  </>
                ) : "Pedir orçamento gratuito →"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Toast visible={toast} />
      <Footer />
    </>
  );
}
