"use client";

import { useState, useCallback, useEffect } from "react";
import { gtmHeadSnippet, gtmNoscriptSrc } from "@/app/lib/gtm";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

/* ── Toast ─────────────────────────────────────── */

function Toast({ msg, visible }: { msg: string; visible: boolean }) {
  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
      backgroundColor: DARK, color: "#fff",
      padding: "12px 20px", borderRadius: "10px",
      display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", fontWeight: 500,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      transform: visible ? "translateY(0)" : "translateY(80px)",
      opacity: visible ? 1 : 0,
      transition: "transform 0.3s ease, opacity 0.3s ease",
      pointerEvents: "none",
    }}>
      <span style={{ color: "#6dbe6d", fontSize: "16px" }}>✓</span>
      {msg}
    </div>
  );
}

/* ── Toggle ─────────────────────────────────────── */

function Toggle({ value, onChange, label, sub }: { value: boolean; onChange: (v: boolean) => void; label: string; sub: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "12px 14px", backgroundColor: "#fafaf9", borderRadius: "8px", border: `1px solid ${BORDER}` }}>
      <div>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: DARK }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "11px", color: MUTED }}>{sub}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        style={{ width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer", backgroundColor: value ? O : "#d1d0ce", position: "relative", transition: "background-color 0.2s", flexShrink: 0 }}
      >
        <span style={{ position: "absolute", top: "4px", left: value ? "22px" : "4px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#fff", transition: "left 0.2s", display: "block" }} />
      </button>
    </label>
  );
}

/* ── CodeBlock ──────────────────────────────────── */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style={{ position: "relative", backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "14px 16px", fontFamily: "monospace", fontSize: "11px", color: "#d4d4d4", lineHeight: 1.6, overflowX: "auto" }}>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{code}</pre>
      <button
        onClick={copy}
        style={{ position: "absolute", top: "8px", right: "8px", padding: "3px 8px", borderRadius: "4px", border: "none", backgroundColor: copied ? "#6dbe6d" : "#3a3a3a", color: "#fff", fontSize: "10px", cursor: "pointer", fontWeight: 600 }}
      >
        {copied ? "✓ Copiado" : "Copiar"}
      </button>
    </div>
  );
}

/* ── SectionCard ────────────────────────────────── */

function SectionCard({ title, icon, badge, children }: { title: string; icon: string; badge?: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, marginBottom: "20px", overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, backgroundColor: "#fafaf9", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: DARK, margin: 0 }}>{title}</h3>
        {badge && <span style={{ marginLeft: "auto", fontSize: "11px", backgroundColor: "#e8f7e8", color: "#2d862d", padding: "2px 8px", borderRadius: "20px", fontWeight: 600 }}>{badge}</span>}
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

const inp: React.CSSProperties = {
  width: "100%", padding: "9px 12px", borderRadius: "8px",
  border: `1px solid ${BORDER}`, fontSize: "13px", color: DARK,
  backgroundColor: "#fff", boxSizing: "border-box", outline: "none", fontFamily: "monospace",
};

/* ── Página ─────────────────────────────────────── */

export default function AdminMarketing() {
  const [toast, setToast] = useState({ visible: false, msg: "" });

  const [gtm,  setGtm]  = useState({ id: "",   active: false });
  const [gsc,  setGsc]  = useState({ verification: "" });
  const [meta, setMeta] = useState({ verification: "" });
  const [ga,   setGa]   = useState({ id: "",   active: false });

  /* Persist to localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("fixxe_marketing");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.gtm)  setGtm(p.gtm);
        if (p.gsc)  setGsc(p.gsc);
        if (p.meta) setMeta(p.meta);
        if (p.ga)   setGa(p.ga);
      } catch { /* ignore */ }
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  const save = (section: string, data: object) => {
    const current = (() => { try { return JSON.parse(localStorage.getItem("fixxe_marketing") ?? "{}"); } catch { return {}; } })();
    localStorage.setItem("fixxe_marketing", JSON.stringify({ ...current, ...data }));
    showToast(`Configurações de ${section} guardadas!`);
  };

  /* Derived */
  const gtmHeadCode = gtm.id ? gtmHeadSnippet(gtm.id) : "";
  const gtmBodyCode = gtm.id ? `<noscript><iframe src="${gtmNoscriptSrc(gtm.id)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : "";
  const gscTagCode  = gsc.verification ? `<meta name="google-site-verification" content="${gsc.verification}" />` : "";
  const metaTagCode = meta.verification ? `<meta name="facebook-domain-verification" content="${meta.verification}" />` : "";

  const envPreview = [
    gtm.id  ? `NEXT_PUBLIC_GTM_ID=${gtm.id}`                           : null,
    ga.id   ? `NEXT_PUBLIC_GA_ID=${ga.id}`                             : null,
    gsc.verification  ? `NEXT_PUBLIC_GSC_VERIFICATION=${gsc.verification}`   : null,
    meta.verification ? `NEXT_PUBLIC_META_VERIFICATION=${meta.verification}` : null,
  ].filter(Boolean).join("\n");

  return (
    <div style={{ padding: "32px 36px", maxWidth: "860px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: DARK, margin: "0 0 4px" }}>Configurações de Marketing</h1>
        <p style={{ fontSize: "13px", color: MUTED, margin: 0 }}>Integra ferramentas de análise, SEO e rastreamento.</p>
      </div>

      {/* ── Google Tag Manager ── */}
      <SectionCard title="Google Tag Manager" icon="🏷" badge={gtm.active && gtm.id ? "Activo" : undefined}>
        <p style={{ fontSize: "13px", color: MUTED, margin: "0 0 16px", lineHeight: 1.6 }}>
          O GTM permite adicionar scripts de rastreamento sem alterar o código. Cria um container em{" "}
          <a href="https://tagmanager.google.com" target="_blank" rel="noreferrer" style={{ color: O }}>tagmanager.google.com</a>{" "}
          e cola o ID abaixo.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "flex-end", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Container ID</label>
            <input
              style={inp}
              value={gtm.id}
              onChange={e => setGtm(g => ({ ...g, id: e.target.value.toUpperCase() }))}
              placeholder="GTM-XXXXXXX"
              maxLength={12}
            />
          </div>
          <button
            onClick={() => { save("GTM", { gtm }); }}
            style={{ padding: "9px 18px", borderRadius: "8px", border: "none", backgroundColor: O, color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Guardar
          </button>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <Toggle
            value={gtm.active}
            onChange={v => setGtm(g => ({ ...g, active: v }))}
            label="Activar GTM"
            sub={gtm.active ? "Script injectado no head e body" : "GTM está desactivado"}
          />
        </div>

        {gtm.id && (
          <>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: DARK, margin: "0 0 6px" }}>Código para o &lt;head&gt; (antes de qualquer outro script)</p>
              <CodeBlock code={`<script>\n${gtmHeadCode}\n</script>`} />
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: DARK, margin: "0 0 6px" }}>Código para o &lt;body&gt; (logo após a tag de abertura)</p>
              <CodeBlock code={gtmBodyCode} />
            </div>
            <p style={{ fontSize: "11px", color: MUTED, margin: "10px 0 0" }}>
              ℹ No projecto Next.js, estes snippets já são injectados automaticamente via <code style={{ backgroundColor: "#f5f4f2", padding: "1px 5px", borderRadius: "3px" }}>app/layout.tsx</code> quando <code style={{ backgroundColor: "#f5f4f2", padding: "1px 5px", borderRadius: "3px" }}>NEXT_PUBLIC_GTM_ID</code> está definido no <code style={{ backgroundColor: "#f5f4f2", padding: "1px 5px", borderRadius: "3px" }}>.env.local</code>.
            </p>
          </>
        )}
      </SectionCard>

      {/* ── Google Search Console ── */}
      <SectionCard title="Google Search Console" icon="🔍">
        <p style={{ fontSize: "13px", color: MUTED, margin: "0 0 16px", lineHeight: 1.6 }}>
          Verifica a propriedade do site no{" "}
          <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" style={{ color: O }}>Google Search Console</a>.
          Copia o valor do atributo <code style={{ backgroundColor: "#f5f4f2", padding: "1px 5px", borderRadius: "3px" }}>content</code> da meta tag de verificação.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "flex-end", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Código de verificação (content)</label>
            <input
              style={inp}
              value={gsc.verification}
              onChange={e => setGsc({ verification: e.target.value })}
              placeholder="abc123def456..."
            />
          </div>
          <button
            onClick={() => { save("Google Search Console", { gsc }); }}
            style={{ padding: "9px 18px", borderRadius: "8px", border: "none", backgroundColor: O, color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>

        {gsc.verification && (
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: DARK, margin: "0 0 6px" }}>Meta tag gerada</p>
            <CodeBlock code={gscTagCode} />
          </div>
        )}

        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "13px", color: O, textDecoration: "none", fontWeight: 500 }}
        >
          Abrir Search Console ↗
        </a>
      </SectionCard>

      {/* ── Meta / Facebook ── */}
      <SectionCard title="Meta / Facebook" icon="📘">
        <p style={{ fontSize: "13px", color: MUTED, margin: "0 0 16px", lineHeight: 1.6 }}>
          Verifica o domínio no Facebook Business Manager para usar o Pixel e outras integrações Meta.
          Copia o código de verificação do Business Manager.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "flex-end", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Código de verificação (facebook-domain-verification)</label>
            <input
              style={inp}
              value={meta.verification}
              onChange={e => setMeta({ verification: e.target.value })}
              placeholder="abcdef123456..."
            />
          </div>
          <button
            onClick={() => { save("Meta/Facebook", { meta }); }}
            style={{ padding: "9px 18px", borderRadius: "8px", border: "none", backgroundColor: O, color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>

        {meta.verification && (
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: DARK, margin: "0 0 6px" }}>Meta tag gerada</p>
            <CodeBlock code={metaTagCode} />
          </div>
        )}
      </SectionCard>

      {/* ── Google Analytics ── */}
      <SectionCard title="Google Analytics 4" icon="📊" badge={ga.active && ga.id ? "Activo" : undefined}>
        <p style={{ fontSize: "13px", color: MUTED, margin: "0 0 16px", lineHeight: 1.6 }}>
          Se estás a usar GTM, recomenda-se configurar o GA4 através de uma tag GTM em vez de aqui.
          Este campo adiciona o Measurement ID via variável de ambiente.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", alignItems: "flex-end", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>Measurement ID</label>
            <input
              style={inp}
              value={ga.id}
              onChange={e => setGa(g => ({ ...g, id: e.target.value.toUpperCase() }))}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <button
            onClick={() => { save("Google Analytics", { ga }); }}
            style={{ padding: "9px 18px", borderRadius: "8px", border: "none", backgroundColor: O, color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>

        <Toggle
          value={ga.active}
          onChange={v => setGa(g => ({ ...g, active: v }))}
          label="Activar Google Analytics"
          sub={ga.active ? "GA4 activo via variável de ambiente" : "GA4 desactivado"}
        />
      </SectionCard>

      {/* ── Preview .env.local ── */}
      {envPreview && (
        <SectionCard title="Variáveis de Ambiente (.env.local)" icon="⚙">
          <p style={{ fontSize: "13px", color: MUTED, margin: "0 0 12px" }}>
            Adiciona estas variáveis ao teu ficheiro <code style={{ backgroundColor: "#f5f4f2", padding: "1px 5px", borderRadius: "3px" }}>.env.local</code> para persistir as configurações no servidor:
          </p>
          <CodeBlock code={envPreview} />
          <div style={{ marginTop: "12px", padding: "10px 14px", backgroundColor: "#fff9f5", borderRadius: "8px", border: `1px solid #fde8d4` }}>
            <p style={{ fontSize: "12px", color: "#c97b00", margin: 0, lineHeight: 1.5 }}>
              ⚠ Reinicia o servidor de desenvolvimento (<code>npm run dev</code>) depois de alterar variáveis de ambiente.
            </p>
          </div>
        </SectionCard>
      )}

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}
