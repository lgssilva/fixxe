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

function FocusInput(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { error, style: _s, ...rest } = props;
  const hasError = Boolean(error);
  const base: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: `1px solid ${hasError ? "#e05555" : focused ? O : BORDER}`,
    fontSize: "14px", color: DARK, backgroundColor: "#fff",
    boxSizing: "border-box", outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused ? (hasError ? "0 0 0 3px rgba(224,85,85,0.12)" : `0 0 0 3px rgba(238,146,77,0.15)`) : "none",
  };
  return (
    <>
      <input {...rest} style={base} onFocus={e => { setFocused(true); rest.onFocus?.(e); }} onBlur={e => { setFocused(false); rest.onBlur?.(e); }} />
      {hasError && <p style={{ fontSize: "11px", color: "#e05555", margin: "4px 0 0" }}>{error}</p>}
    </>
  );
}

function FocusSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style: _s, ...rest } = props;
  const base: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: `1px solid ${focused ? O : BORDER}`,
    fontSize: "14px", color: DARK, backgroundColor: "#fff",
    boxSizing: "border-box", outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused ? `0 0 0 3px rgba(238,146,77,0.15)` : "none",
  };
  return <select {...rest} style={base} onFocus={e => { setFocused(true); rest.onFocus?.(e); }} onBlur={e => { setFocused(false); rest.onBlur?.(e); }} />;
}

function FocusTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { error, style: _s, ...rest } = props;
  const hasError = Boolean(error);
  const base: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: "9px",
    border: `1px solid ${hasError ? "#e05555" : focused ? O : BORDER}`,
    fontSize: "14px", color: DARK, backgroundColor: "#fff",
    boxSizing: "border-box", outline: "none", resize: "vertical", lineHeight: 1.6,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused ? (hasError ? "0 0 0 3px rgba(224,85,85,0.12)" : `0 0 0 3px rgba(238,146,77,0.15)`) : "none",
  };
  return (
    <>
      <textarea {...rest} style={base} onFocus={e => { setFocused(true); rest.onFocus?.(e); }} onBlur={e => { setFocused(false); rest.onBlur?.(e); }} />
      {hasError && <p style={{ fontSize: "11px", color: "#e05555", margin: "4px 0 0" }}>{error}</p>}
    </>
  );
}

export default function ContactoPage() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: ASSUNTOS[0], mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(false);
  const [toastVisible, setToast] = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors(prev => { const n = { ...prev }; delete n[k]; return n; });
    };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!form.email.trim()) e.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (!form.mensagem.trim()) e.mensagem = "Mensagem é obrigatória";
    else if (form.mensagem.trim().length < 10) e.mensagem = "Mensagem muito curta (mín. 10 caracteres)";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast(true);
      setForm({ nome: "", email: "", assunto: ASSUNTOS[0], mensagem: "" });
      setErrors({});
      setTimeout(() => setToast(false), 4000);
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
        {/* Hero */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${BORDER}`, padding: "48px 40px", textAlign: "center" }}>
          <p className="animate-slide-up" style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Fala connosco</p>
          <h1 className="animate-slide-up-delay" style={{ fontSize: "38px", fontWeight: 900, color: DARK, margin: "0 0 12px" }}>Contacto</h1>
          <p className="animate-slide-up-delay2" style={{ fontSize: "16px", color: MUTED, margin: 0 }}>Respondemos a todas as mensagens em menos de 24 horas.</p>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "start" }}>
          {/* Formulário */}
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "36px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: DARK, margin: "0 0 24px" }}>Envia-nos uma mensagem</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Nome completo *</label>
                  <FocusInput type="text" value={form.nome} onChange={set("nome")} placeholder="Maria Silva" error={errors.nome} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Email *</label>
                  <FocusInput type="email" value={form.email} onChange={set("email")} placeholder="maria@exemplo.pt" error={errors.email} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Assunto *</label>
                <FocusSelect value={form.assunto} onChange={set("assunto")}>
                  {ASSUNTOS.map(a => <option key={a}>{a}</option>)}
                </FocusSelect>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>Mensagem *</label>
                <FocusTextarea
                  value={form.mensagem}
                  onChange={set("mensagem")}
                  rows={6}
                  placeholder="Descreve o que precisas..."
                  error={errors.mensagem}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: O, color: "#fff", border: "none", padding: "13px", borderRadius: "9px", fontWeight: 700, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "background-color 0.2s, transform 0.15s" }}
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
                  <div
                    key={label}
                    style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "10px 12px", borderRadius: "10px", transition: "background-color 0.2s ease" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = CREAM; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
                  >
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
                    <a key={s} href="#" style={{ padding: "7px 14px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: CREAM, fontSize: "12px", color: DARK, textDecoration: "none", fontWeight: 500, transition: "border-color 0.2s, color 0.2s, transform 0.15s" }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = O; el.style.color = O; el.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = BORDER; el.style.color = DARK; el.style.transform = ""; }}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mapa placeholder com pin animado */}
            <div style={{ backgroundColor: "#2a2521", borderRadius: "16px", height: "220px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", overflow: "hidden", position: "relative" }}>
              <span className="map-pin" style={{ fontSize: "36px", display: "block" }}>📍</span>
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

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pinPulse {
          0%, 100% { transform: translateY(0) scale(1); }
          40%       { transform: translateY(-8px) scale(1.15); }
          60%       { transform: translateY(-4px) scale(1.05); }
        }
        .map-pin { animation: pinPulse 2s cubic-bezier(0.4,0,0.2,1) infinite; }
      `}</style>
      <Toast visible={toastVisible} />
      <Footer />
    </>
  );
}
