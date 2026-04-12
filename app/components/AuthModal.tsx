"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = "login" | "register";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function Spinner() {
  return (
    <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
  );
}

export function AuthModal({ open, onClose }: Props) {
  const [tab, setTab]         = useState<Tab>("login");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  /* Reset on open */
  useEffect(() => {
    if (open) {
      setError(""); setSuccess(""); setLoading(false);
      setEmail(""); setPassword(""); setConfirm(""); setName("");
    }
  }, [open, tab]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const noSupabase = !supabase;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (noSupabase) { setError("Supabase não configurado. Define NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local."); return; }
    setLoading(true);
    const { error: err } = await supabase!.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    onClose();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("As passwords não coincidem."); return; }
    if (password.length < 6)  { setError("A password deve ter pelo menos 6 caracteres."); return; }
    if (noSupabase) { setError("Supabase não configurado. Define as variáveis de ambiente no .env.local."); return; }
    setLoading(true);
    const { error: err } = await supabase!.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess("Conta criada! Verifica o teu email para confirmar o registo.");
  };

  const handleGoogle = async () => {
    if (noSupabase) { setError("Supabase não configurado."); return; }
    await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: typeof window !== "undefined" ? window.location.origin : "" },
    });
  };

  const inputSt: React.CSSProperties = {
    width: "100%", padding: "10px 12px", borderRadius: "8px",
    border: `1px solid ${BORDER}`, fontSize: "14px", color: DARK,
    backgroundColor: "#fff", boxSizing: "border-box", outline: "none",
  };

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 400, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
      />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: "400px",
        backgroundColor: "#fff", zIndex: 401, display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
      }}>
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: DARK, margin: 0 }}>A tua conta</h2>
            <p style={{ fontSize: "13px", color: MUTED, margin: "2px 0 0" }}>Bem-vindo à Fixxe</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: MUTED, lineHeight: 1, padding: "4px" }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, backgroundColor: "#fafaf9" }}>
          {(["login", "register"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); setSuccess(""); }}
              style={{
                flex: 1, padding: "14px", border: "none", background: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: tab === t ? 700 : 400,
                color: tab === t ? DARK : MUTED,
                borderBottom: tab === t ? `2px solid ${O}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {t === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: "56px", height: "56px", backgroundColor: "#e8f7e8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d862d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>Conta criada!</h3>
              <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.6 }}>{success}</p>
              <button onClick={onClose} style={{ marginTop: "20px", backgroundColor: O, color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                Fechar
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ backgroundColor: "#fdecea", border: "1px solid #f5c6c6", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
                  <p style={{ fontSize: "13px", color: "#c62828", margin: 0 }}>{error}</p>
                </div>
              )}

              {tab === "login" ? (
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="maria@exemplo.pt" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input type={showPw ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputSt, paddingRight: "42px" }} />
                      <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: MUTED, fontSize: "12px" }}>
                        {showPw ? "Ocultar" : "Ver"}
                      </button>
                    </div>
                  </div>
                  <button type="button" style={{ fontSize: "12px", color: O, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
                    Esqueceu a password?
                  </button>
                  <button type="submit" disabled={loading} style={{ backgroundColor: O, color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    {loading ? <Spinner /> : "Entrar"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Nome completo</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Maria Silva" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="maria@exemplo.pt" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input type={showPw ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" style={{ ...inputSt, paddingRight: "42px" }} />
                      <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: MUTED, fontSize: "12px" }}>
                        {showPw ? "Ocultar" : "Ver"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Confirmar password</label>
                    <input type={showPw ? "text" : "password"} required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repete a password" style={{ ...inputSt, borderColor: confirm && confirm !== password ? "#e05555" : BORDER }} />
                    {confirm && confirm !== password && <p style={{ fontSize: "11px", color: "#e05555", margin: "4px 0 0" }}>As passwords não coincidem</p>}
                  </div>
                  <button type="submit" disabled={loading} style={{ backgroundColor: O, color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    {loading ? <Spinner /> : "Criar conta"}
                  </button>
                </form>
              )}

              {/* Separador */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: BORDER }} />
                <span style={{ fontSize: "12px", color: MUTED }}>ou</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: BORDER }} />
              </div>

              {/* Google */}
              <button
                onClick={handleGoogle}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "11px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "14px", fontWeight: 500, color: DARK, cursor: "pointer" }}
              >
                <GoogleIcon />
                Continuar com Google
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
