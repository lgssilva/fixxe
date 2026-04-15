"use client";

import { useState, useCallback } from "react";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

/* ── Estado inicial ────────────────────────────── */

const INIT = {
  homepage: {
    slides: [
      { line1: "Imprime o que",      line2: "Imaginas",    subtitle: "Peças únicas de impressão 3D feitas em Cascais. Qualidade premium, entregue em casa.",           btn1: "Ver produtos",    btn2: "Como funciona" },
      { line1: "Peças únicas,",      line2: "Sob Medida",  subtitle: "Do design à entrega, criamos exactamente o que precisas. Orçamento sem compromisso.",            btn1: "Pedir orçamento", btn2: "Ver exemplos"  },
      { line1: "Materiais de",       line2: "Alta Gama",   subtitle: "PLA, PETG, ABS ou Resina — escolhe o material certo para cada projecto.",                       btn1: "Ver materiais",   btn2: "Saber mais"    },
    ],
    announcements: [
      "🚚 Envio gratuito em encomendas acima de 50 €",
      "⭐ +200 clientes satisfeitos em Cascais e Lisboa",
      "🎨 Personalização completa disponível — pede orçamento",
    ],
    categories: [
      { name: "Decoração & Arte",  desc: "Peças decorativas únicas que transformam qualquer espaço" },
      { name: "Organização",       desc: "Soluções inteligentes para manter tudo no lugar certo"    },
      { name: "Ferramentas",       desc: "Acessórios e suportes para a tua bancada de trabalho"     },
      { name: "Personalizado",     desc: "Qualquer ideia, qualquer dimensão — feito só para ti"     },
    ],
    testimonials: [
      { name: "Maria S.",   city: "Cascais",  text: "Qualidade incrível! O vaso chegou perfeito e muito bem embalado. Vou definitivamente encomendar mais.",     produto: "Vaso Geométrico Minimalista"       },
      { name: "João F.",    city: "Lisboa",   text: "Serviço excelente, comunicação rápida e o produto superou as expectativas. Muito recomendo!",               produto: "Organizador de Secretária Modular" },
      { name: "Ana C.",     city: "Sintra",   text: "Pedi uma peça personalizada e ficou exactamente como imaginei. O prazo foi cumprido à risca.",              produto: "Protótipo de Peça Industrial"      },
    ],
    blog: [
      { title: "Como escolher o material certo para o teu projecto", summary: "PLA, PETG, ABS ou Resina? Cada material tem características únicas. Descobre qual é o mais adequado para a tua aplicação." },
      { title: "5 ideias criativas de decoração com impressão 3D",   summary: "A impressão 3D abriu um mundo de possibilidades para a decoração de interiores. Inspira-te com estas ideias originais."     },
      { title: "O futuro da impressão 3D em Portugal",               summary: "A tecnologia de impressão 3D está a transformar a indústria portuguesa. Saiba o que aí vem nos próximos anos."             },
    ],
  },

  paginas: {
    sobre: {
      titulo: "Feito com paixão em Cascais",
      texto: "A Fixxe nasceu da paixão pela tecnologia de impressão 3D e pela vontade de criar peças únicas e de alta qualidade. Somos uma empresa familiar baseada em Cascais, comprometida com a excelência em cada impressão.",
      missao: "Democratizar o acesso à impressão 3D de qualidade, tornando possível criar qualquer peça — da decoração à indústria — com precisão e cuidado.",
      valores: "Qualidade sem compromisso. Sustentabilidade consciente. Inovação constante. Atenção ao detalhe. Serviço personalizado.",
    },
    contacto: {
      email: "geral@fixxe.pt",
      telefone: "+351 912 345 678",
      morada: "Cascais, Lisboa, Portugal",
      horario: "Segunda a Sexta: 9h–18h | Sábado: 10h–14h",
    },
  },

  config: {
    nomeSite:  "Fixxe",
    slogan:    "Impressão 3D de alta qualidade, feita em Cascais.",
    email:     "geral@fixxe.pt",
    telefone:  "+351 912 345 678",
    morada:    "Cascais, Lisboa, Portugal",
    instagram: "https://instagram.com/fixxe.pt",
    tiktok:    "https://tiktok.com/@fixxe.pt",
    linkedin:  "https://linkedin.com/company/fixxe",
  },
};

type TabKey = "homepage" | "paginas" | "config";

/* ── Toast ─────────────────────────────────────── */

function Toast({ msg, visible }: { msg: string; visible: boolean }) {
  return (
    <div style={{
      position: "fixed", bottom: "24px", right: "24px", zIndex: 1000,
      backgroundColor: "#1f1b18", color: "#fff",
      padding: "12px 20px", borderRadius: "10px",
      display: "flex", alignItems: "center", gap: "10px",
      fontSize: "13px", fontWeight: 500,
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

/* ── Helpers de UI ──────────────────────────────── */

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, marginBottom: "16px", overflow: "hidden" }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, backgroundColor: "#fafaf9" }}>
        <h3 style={{ fontSize: "13px", fontWeight: 700, color: DARK, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</h3>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function Field({ label, hint, children }: { label: React.ReactNode; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "5px" }}>{label}</div>
      {children}
      {hint && <p style={{ fontSize: "11px", color: MUTED, margin: "4px 0 0" }}>{hint}</p>}
    </div>
  );
}

const inp: React.CSSProperties = {
  width: "100%", padding: "8px 11px", borderRadius: "7px",
  border: `1px solid ${BORDER}`, fontSize: "13px", color: DARK,
  backgroundColor: "#fff", boxSizing: "border-box", outline: "none",
};

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ marginTop: "4px", backgroundColor: O, color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
    >
      Guardar alterações
    </button>
  );
}

/* ── Página principal ───────────────────────────── */

export default function AdminConteudo() {
  const [tab, setTab]       = useState<TabKey>("homepage");
  const [data, setData]     = useState(INIT);
  const [toast, setToast]   = useState({ visible: false, msg: "" });

  const showToast = useCallback((msg = "Alterações guardadas com sucesso!") => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  /* Helpers de patch */
  const setSlide = (i: number, k: keyof typeof INIT.homepage.slides[0], v: string) =>
    setData(d => { const s = d.homepage.slides.map((sl, j) => j === i ? { ...sl, [k]: v } : sl); return { ...d, homepage: { ...d.homepage, slides: s } }; });

  const setAnnouncement = (i: number, v: string) =>
    setData(d => { const a = d.homepage.announcements.map((x, j) => j === i ? v : x); return { ...d, homepage: { ...d.homepage, announcements: a } }; });

  const setCat = (i: number, k: "name" | "desc", v: string) =>
    setData(d => { const cats = d.homepage.categories.map((c, j) => j === i ? { ...c, [k]: v } : c); return { ...d, homepage: { ...d.homepage, categories: cats } }; });

  const setTestimonial = (i: number, k: keyof typeof INIT.homepage.testimonials[0], v: string) =>
    setData(d => { const t = d.homepage.testimonials.map((x, j) => j === i ? { ...x, [k]: v } : x); return { ...d, homepage: { ...d.homepage, testimonials: t } }; });

  const setBlog = (i: number, k: "title" | "summary", v: string) =>
    setData(d => { const b = d.homepage.blog.map((x, j) => j === i ? { ...x, [k]: v } : x); return { ...d, homepage: { ...d.homepage, blog: b } }; });

  const setSobre = (k: keyof typeof INIT.paginas.sobre, v: string) =>
    setData(d => ({ ...d, paginas: { ...d.paginas, sobre: { ...d.paginas.sobre, [k]: v } } }));

  const setContacto = (k: keyof typeof INIT.paginas.contacto, v: string) =>
    setData(d => ({ ...d, paginas: { ...d.paginas, contacto: { ...d.paginas.contacto, [k]: v } } }));

  const setConfig = (k: keyof typeof INIT.config, v: string) =>
    setData(d => ({ ...d, config: { ...d.config, [k]: v } }));

  const TABS: { key: TabKey; label: string }[] = [
    { key: "homepage", label: "Homepage"               },
    { key: "paginas",  label: "Páginas"                },
    { key: "config",   label: "Configurações Gerais"   },
  ];

  return (
    <div style={{ padding: "32px 36px", maxWidth: "900px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: DARK, margin: "0 0 4px" }}>Editor de Conteúdo</h1>
        <p style={{ fontSize: "13px", color: MUTED, margin: 0 }}>Edita os textos do site sem tocar no código.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px", backgroundColor: "#fff", padding: "5px", borderRadius: "10px", border: `1px solid ${BORDER}`, width: "fit-content" }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "8px 20px", borderRadius: "7px", border: "none",
              backgroundColor: tab === t.key ? O : "transparent",
              color: tab === t.key ? "#fff" : MUTED,
              fontWeight: tab === t.key ? 700 : 400,
              fontSize: "13px", cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Homepage ── */}
      {tab === "homepage" && (
        <div>
          {/* Hero slides */}
          <SectionCard title="Hero — 3 Slides">
            {data.homepage.slides.map((sl, i) => (
              <div key={i} style={{ padding: "16px", borderRadius: "8px", backgroundColor: "#fafaf9", border: `1px solid ${BORDER}`, marginBottom: i < 2 ? "12px" : 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: O, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Slide {i + 1}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <Field label="Título linha 1">
                    <input style={inp} value={sl.line1} onChange={e => setSlide(i, "line1", e.target.value)} />
                  </Field>
                  <Field label={<>Título linha 2 <span style={{ color: O }}>(laranja)</span></>} hint="">
                    <input style={inp} value={sl.line2} onChange={e => setSlide(i, "line2", e.target.value)} />
                  </Field>
                </div>
                <Field label="Subtítulo">
                  <textarea style={{ ...inp, resize: "vertical" }} rows={2} value={sl.subtitle} onChange={e => setSlide(i, "subtitle", e.target.value)} />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <Field label="Botão primário">
                    <input style={inp} value={sl.btn1} onChange={e => setSlide(i, "btn1", e.target.value)} />
                  </Field>
                  <Field label="Botão secundário">
                    <input style={inp} value={sl.btn2} onChange={e => setSlide(i, "btn2", e.target.value)} />
                  </Field>
                </div>
              </div>
            ))}
            <SaveButton onClick={() => showToast("Slides do hero guardados!")} />
          </SectionCard>

          {/* Announcement bar */}
          <SectionCard title="Barra de Anúncios (rotação automática)">
            {data.homepage.announcements.map((msg, i) => (
              <Field key={i} label={`Mensagem ${i + 1}`}>
                <input style={inp} value={msg} onChange={e => setAnnouncement(i, e.target.value)} />
              </Field>
            ))}
            <SaveButton onClick={() => showToast("Anúncios guardados!")} />
          </SectionCard>

          {/* Categorias */}
          <SectionCard title="Secção Categorias">
            {data.homepage.categories.map((cat, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", marginBottom: "10px", padding: "12px", backgroundColor: "#fafaf9", borderRadius: "8px", border: `1px solid ${BORDER}` }}>
                <Field label="Nome da categoria">
                  <input style={inp} value={cat.name} onChange={e => setCat(i, "name", e.target.value)} />
                </Field>
                <Field label="Descrição">
                  <input style={inp} value={cat.desc} onChange={e => setCat(i, "desc", e.target.value)} />
                </Field>
              </div>
            ))}
            <SaveButton onClick={() => showToast("Categorias guardadas!")} />
          </SectionCard>

          {/* Depoimentos */}
          <SectionCard title="Depoimentos">
            {data.homepage.testimonials.map((t, i) => (
              <div key={i} style={{ padding: "14px", borderRadius: "8px", backgroundColor: "#fafaf9", border: `1px solid ${BORDER}`, marginBottom: i < 2 ? "10px" : 0 }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: O, margin: "0 0 10px", textTransform: "uppercase" }}>Depoimento {i + 1}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "8px" }}>
                  <Field label="Nome">
                    <input style={inp} value={t.name} onChange={e => setTestimonial(i, "name", e.target.value)} />
                  </Field>
                  <Field label="Cidade">
                    <input style={inp} value={t.city} onChange={e => setTestimonial(i, "city", e.target.value)} />
                  </Field>
                  <Field label="Produto comprado">
                    <input style={inp} value={t.produto} onChange={e => setTestimonial(i, "produto", e.target.value)} />
                  </Field>
                </div>
                <Field label="Texto do depoimento">
                  <textarea style={{ ...inp, resize: "vertical" }} rows={3} value={t.text} onChange={e => setTestimonial(i, "text", e.target.value)} />
                </Field>
              </div>
            ))}
            <SaveButton onClick={() => showToast("Depoimentos guardados!")} />
          </SectionCard>

          {/* Blog */}
          <SectionCard title="Secção Blog — Artigos em Destaque">
            {data.homepage.blog.map((art, i) => (
              <div key={i} style={{ padding: "12px", borderRadius: "8px", backgroundColor: "#fafaf9", border: `1px solid ${BORDER}`, marginBottom: i < 2 ? "10px" : 0 }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: O, margin: "0 0 10px", textTransform: "uppercase" }}>Artigo {i + 1}</p>
                <Field label="Título do artigo">
                  <input style={inp} value={art.title} onChange={e => setBlog(i, "title", e.target.value)} />
                </Field>
                <Field label="Resumo">
                  <textarea style={{ ...inp, resize: "vertical" }} rows={2} value={art.summary} onChange={e => setBlog(i, "summary", e.target.value)} />
                </Field>
              </div>
            ))}
            <SaveButton onClick={() => showToast("Artigos do blog guardados!")} />
          </SectionCard>
        </div>
      )}

      {/* ── TAB: Páginas ── */}
      {tab === "paginas" && (
        <div>
          <SectionCard title="Sobre Nós">
            <Field label="Título principal">
              <input style={inp} value={data.paginas.sobre.titulo} onChange={e => setSobre("titulo", e.target.value)} />
            </Field>
            <Field label="Texto principal">
              <textarea style={{ ...inp, resize: "vertical" }} rows={4} value={data.paginas.sobre.texto} onChange={e => setSobre("texto", e.target.value)} />
            </Field>
            <Field label="Missão" hint="Frase que define o propósito da Fixxe">
              <textarea style={{ ...inp, resize: "vertical" }} rows={2} value={data.paginas.sobre.missao} onChange={e => setSobre("missao", e.target.value)} />
            </Field>
            <Field label="Valores" hint="Separa cada valor com ponto final">
              <textarea style={{ ...inp, resize: "vertical" }} rows={2} value={data.paginas.sobre.valores} onChange={e => setSobre("valores", e.target.value)} />
            </Field>
            <SaveButton onClick={() => showToast("Página Sobre Nós guardada!")} />
          </SectionCard>

          <SectionCard title="Contacto">
            {(Object.entries(data.paginas.contacto) as [keyof typeof INIT.paginas.contacto, string][]).map(([k, v]) => {
              const labels: Record<keyof typeof INIT.paginas.contacto, string> = {
                email: "Email de contacto", telefone: "Telefone", morada: "Morada completa", horario: "Horário de atendimento",
              };
              return (
                <Field key={k} label={labels[k]}>
                  <input style={inp} value={v} onChange={e => setContacto(k, e.target.value)} />
                </Field>
              );
            })}
            <SaveButton onClick={() => showToast("Página Contacto guardada!")} />
          </SectionCard>
        </div>
      )}

      {/* ── TAB: Config ── */}
      {tab === "config" && (
        <div>
          <SectionCard title="Informações do Site">
            <Field label="Nome do site">
              <input style={inp} value={data.config.nomeSite} onChange={e => setConfig("nomeSite", e.target.value)} />
            </Field>
            <Field label="Slogan" hint="Aparece no rodapé e meta description por omissão">
              <input style={inp} value={data.config.slogan} onChange={e => setConfig("slogan", e.target.value)} />
            </Field>
          </SectionCard>

          <SectionCard title="Dados de Contacto Globais">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {(["email", "telefone", "morada"] as const).map(k => (
                <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                  <input style={inp} value={data.config[k]} onChange={e => setConfig(k, e.target.value)} />
                </Field>
              ))}
            </div>
            <SaveButton onClick={() => showToast("Dados de contacto guardados!")} />
          </SectionCard>

          <SectionCard title="Redes Sociais">
            {(["instagram", "tiktok", "linkedin"] as const).map(k => (
              <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1) + " URL"} hint="URL completo, ex: https://instagram.com/fixxe.pt">
                <input style={inp} type="url" value={data.config[k]} onChange={e => setConfig(k, e.target.value)} />
              </Field>
            ))}
            <SaveButton onClick={() => showToast("Redes sociais guardadas!")} />
          </SectionCard>
        </div>
      )}

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}
