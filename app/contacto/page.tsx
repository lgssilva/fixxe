"use client";

import { useState } from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const CREAM = "#f5f4f2";
const BORDER = "#e8e5e1";

const ASSUNTOS = ["Orçamento", "Suporte técnico", "Parceria", "Imprensa", "Outro"];

const INFO = [
  { icon: "📍", label: "Morada",   valor: "Cascais, Lisboa, Portugal" },
  { icon: "✉️", label: "Email",    valor: "geral@fixxe.pt"            },
  { icon: "📞", label: "Telefone", valor: "+351 912 345 678"           },
  { icon: "🕐", label: "Horário",  valor: "Seg–Sex 9h–18h · Sáb 10h–14h" },
];

function Toast({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "fixed", bottom: "28px", left: "50%", transform: `translateX(-50%) translateY(${visible ? "0" : "80px"})`,
      backgroundColor: DARK, color: "#fff", padding: "14px 28px", borderRadius: "12px",
      display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 500,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)", opacity: visible ? 1 : 0,
      transition: "transform 0.3s ease, opacity 0.3s ease", zIndex: 500, pointerEvents: "none",
    }}>
      <span style={{ color: "#6dbe6d", fontSize: "18px" }}>✓</span>
      Mensagem enviada! Respondemos em menos de 24h.
    </div>
  );
}

export default function ContactoPage() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: ASSUNTOS[0], mensagem: "" });
  const [loading, setLoading]   = useState(false);
  const [toastVisible, setToast] = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast(true);
      setForm({ nome: "", email: "", assunto: ASSUNTOS[0], mensagem: "" });
      setTimeout(() => setToast(false), 4000);
    }, 1000);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: `1px solid ${BORDER}`, fontSize: "14px", color: DARK,
    backgroundColor: "#fff", boxSizing: "border-box", outline: "none",
  };

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "48px 40px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Fala connosco</p>
          <h1 style={{ fontSize: "38px", fontWeight: 900, color: DARK, margin: "0 0 12px" }}>Contacto</h1>
          <p style={{ fontSize: "16px", color: MUTED, margin: 0 }}>Respondemos a todas as mensagens em menos de 24 horas.</p>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "start" }}>
          {/* Formulário */}
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "36px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: DARK, margin: "0 0 24px" }}>Envia-nos uma mensagem</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Nome completo *</label>
                  <input required type="text" value={form.nome} onChange={set("nome")} placeholder="Maria Silva" style={inp} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Email *</label>
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="maria@exemplo.pt" style={inp} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Assunto *</label>
                <select required value={form.assunto} onChange={set("assunto")} style={inp}>
                  {ASSUNTOS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Mensagem *</label>
                <textarea
                  required
                  value={form.mensagem}
                  onChange={set("mensagem")}
                  rows={6}
                  placeholder="Descreve o que precisas..."
                  style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: O, color: "#fff", border: "none", padding: "13px", borderRadius: "9px", fontWeight: 700, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                className="btn-primary"
              >
                {loading ? (
                  <>
                    <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    A enviar...
                  </>
                ) : "Enviar mensagem →"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Dados de contacto */}
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "28px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: DARK, margin: "0 0 20px" }}>Informações de contacto</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {INFO.map(({ icon, label, valor }) => (
                  <div key={label} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>{icon}</span>
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 2px" }}>{label}</p>
                      <p style={{ fontSize: "14px", color: DARK, fontWeight: 500, margin: 0 }}>{valor}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Redes sociais */}
              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>Redes sociais</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["Instagram", "TikTok", "LinkedIn"].map(s => (
                    <a key={s} href="#" style={{ padding: "7px 14px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: CREAM, fontSize: "12px", color: DARK, textDecoration: "none", fontWeight: 500 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = O; (e.currentTarget as HTMLAnchorElement).style.color = O; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER; (e.currentTarget as HTMLAnchorElement).style.color = DARK; }}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div style={{ backgroundColor: "#2a2521", borderRadius: "16px", height: "220px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <span style={{ fontSize: "32px" }}>📍</span>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff", margin: 0 }}>Cascais, Lisboa</p>
              <p style={{ fontSize: "12px", color: "#8a847e", margin: 0 }}>Portugal</p>
            </div>

            {/* Resposta rápida */}
            <div style={{ backgroundColor: "rgba(238,146,77,0.08)", borderRadius: "12px", border: "1px solid rgba(238,146,77,0.25)", padding: "16px 20px" }}>
              <p style={{ fontSize: "13px", color: DARK, margin: 0, lineHeight: 1.6 }}>
                ⚡ <strong>Resposta em menos de 24h</strong> em dias úteis. Para orçamentos urgentes, liga diretamente para <strong>+351 912 345 678</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Toast visible={toastVisible} />
      <Footer />
    </>
  );
}
