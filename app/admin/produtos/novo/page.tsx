"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS } from "@/app/lib/tokens";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

const CATS = ["Decoração & Arte", "Organização", "Ferramentas", "Personalizado"];
const MATS = ["PLA", "PETG", "ABS", "Resina"];

function slugify(s: string) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NovoProduto() {
  const params = useSearchParams();
  const editSlug = params.get("edit");
  const existing = editSlug ? ALL_PRODUCTS.find(p => p.slug === editSlug) : null;
  const isEdit = !!existing;

  const [form, setForm] = useState({
    name:        existing?.name        ?? "",
    slug:        existing?.slug        ?? "",
    categoria:   existing?.category    ?? CATS[0],
    material:    existing?.material    ?? MATS[0],
    preco:       existing?.price       ? String(existing.price) : "",
    stock:       "10",
    ativo:       true,
    descricao:   existing?.desc        ?? "",
    metaDesc:    "",
    metaTitle:   existing?.name        ?? "",
    keywords:    "",
    youtubeUrl:  "",
  });
  const [slugManual, setSlugManual]   = useState(isEdit);
  const [dragOver, setDragOver]       = useState(false);
  const [images, setImages]           = useState<string[]>([]);
  const [saved, setSaved]             = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const val = e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

      setForm(f => {
        const next = { ...f, [k]: val };
        if (k === "name" && !slugManual) next.slug = slugify(String(val));
        if (k === "name" && !f.metaTitle) next.metaTitle = String(val);
        return next;
      });
    };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImages(prev => [...prev, url]);
    });
  }, []);

  const youtubeId = (() => {
    try {
      const u = new URL(form.youtubeUrl);
      return u.searchParams.get("v") ?? u.pathname.split("/").pop() ?? null;
    } catch { return null; }
  })();

  if (saved) {
    return (
      <div style={{ padding: "32px 36px", maxWidth: "680px" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${BORDER}`, padding: "48px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#e8f7e8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d862d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: DARK, margin: "0 0 8px" }}>
            {isEdit ? "Produto actualizado!" : "Produto criado!"}
          </h2>
          <p style={{ fontSize: "14px", color: MUTED, margin: "0 0 28px" }}>{form.name} foi guardado com sucesso.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/admin/produtos" style={{ textDecoration: "none" }}>
              <button style={{ padding: "10px 20px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "13px", fontWeight: 600, color: DARK, cursor: "pointer" }}>
                ← Lista de produtos
              </button>
            </Link>
            <button
              onClick={() => { setSaved(false); setForm(f => ({ ...f, name: "", slug: "", descricao: "", preco: "", stock: "10" })); }}
              style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: O, fontSize: "13px", fontWeight: 600, color: "#fff", cursor: "pointer" }}
            >
              + Novo produto
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: "860px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <Link href="/admin/produtos" style={{ color: MUTED, textDecoration: "none", fontSize: "13px" }}>Produtos</Link>
            <span style={{ color: MUTED, fontSize: "13px" }}>›</span>
            <span style={{ fontSize: "13px", color: DARK, fontWeight: 500 }}>{isEdit ? "Editar" : "Novo produto"}</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: DARK, margin: 0 }}>
            {isEdit ? `Editar: ${existing?.name}` : "Novo produto"}
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/produtos" style={{ textDecoration: "none" }}>
            <button style={{ padding: "10px 18px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "13px", fontWeight: 600, color: DARK, cursor: "pointer" }}>
              Cancelar
            </button>
          </Link>
          <button
            onClick={() => setSaved(true)}
            style={{ padding: "10px 22px", borderRadius: "8px", border: "none", backgroundColor: O, fontSize: "13px", fontWeight: 700, color: "#fff", cursor: "pointer" }}
          >
            {isEdit ? "Actualizar" : "Guardar produto"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
        {/* Coluna principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Info básica */}
          <Section title="Informação básica">
            <Field label="Nome do produto *">
              <input type="text" value={form.name} onChange={set("name")} placeholder="Ex: Vaso Geométrico Premium" style={inputSt} />
            </Field>

            <Field label="Slug (URL)">
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => { setSlugManual(true); setForm(f => ({ ...f, slug: e.target.value })); }}
                  placeholder="vaso-geometrico-premium"
                  style={{ ...inputSt, flex: 1, fontFamily: "monospace", fontSize: "12px" }}
                />
                <button
                  onClick={() => { setSlugManual(false); setForm(f => ({ ...f, slug: slugify(f.name) })); }}
                  style={{ padding: "0 12px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "12px", color: MUTED, cursor: "pointer", whiteSpace: "nowrap" }}
                  title="Gerar a partir do nome"
                >⟳ Auto</button>
              </div>
              <p style={{ fontSize: "11px", color: MUTED, margin: "4px 0 0" }}>fixxe.pt/produtos/{form.slug || "…"}</p>
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Categoria *">
                <select value={form.categoria} onChange={set("categoria")} style={inputSt}>
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Material *">
                <select value={form.material} onChange={set("material")} style={inputSt}>
                  {MATS.map(m => <option key={m}>{m}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Descrição">
              <textarea
                value={form.descricao}
                onChange={set("descricao")}
                rows={4}
                placeholder="Descreve o produto detalhadamente…"
                style={{ ...inputSt, resize: "vertical", lineHeight: 1.6 }}
              />
            </Field>
          </Section>

          {/* Imagens */}
          <Section title="Imagens do produto">
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              style={{
                border: `2px dashed ${dragOver ? O : BORDER}`,
                borderRadius: "12px",
                padding: "36px",
                textAlign: "center",
                backgroundColor: dragOver ? "#fff9f5" : "#fafaf9",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={dragOver ? O : MUTED} strokeWidth="1.5" style={{ margin: "0 auto 12px", display: "block" }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <p style={{ fontSize: "14px", fontWeight: 600, color: dragOver ? O : DARK, margin: "0 0 4px" }}>
                {dragOver ? "Larga para adicionar" : "Arrasta imagens para aqui"}
              </p>
              <p style={{ fontSize: "12px", color: MUTED, margin: "0 0 16px" }}>PNG, JPG, WebP — máx. 5 MB por imagem</p>
              <label style={{ display: "inline-block", padding: "8px 16px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "12px", fontWeight: 500, color: DARK, cursor: "pointer" }}>
                Seleccionar ficheiros
                <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => {
                  Array.from(e.target.files ?? []).forEach(file => {
                    setImages(prev => [...prev, URL.createObjectURL(file)]);
                  });
                }} />
              </label>
            </div>

            {images.length > 0 && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                {images.map((url, i) => (
                  <div key={i} style={{ position: "relative", width: "80px", height: "80px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: `1px solid ${BORDER}` }} />
                    <button
                      onClick={() => setImages(prev => prev.filter((_, j) => j !== i))}
                      style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", border: "none", backgroundColor: "#c62828", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Vídeo YouTube */}
          <Section title="Vídeo (opcional)">
            <Field label="URL do YouTube">
              <input
                type="url"
                value={form.youtubeUrl}
                onChange={set("youtubeUrl")}
                placeholder="https://www.youtube.com/watch?v=..."
                style={inputSt}
              />
            </Field>
            {youtubeId && (
              <div style={{ marginTop: "12px", borderRadius: "10px", overflow: "hidden", border: `1px solid ${BORDER}`, aspectRatio: "16/9", backgroundColor: "#000" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block", border: "none" }}
                />
              </div>
            )}
          </Section>

          {/* SEO */}
          <Section title="SEO">
            <Field label={`Meta title (${form.metaTitle.length}/60)`}>
              <input
                type="text"
                value={form.metaTitle}
                onChange={set("metaTitle")}
                maxLength={60}
                placeholder="Título para motores de busca"
                style={{ ...inputSt, borderColor: form.metaTitle.length > 55 ? O : BORDER }}
              />
              <div style={{ height: "4px", backgroundColor: BORDER, borderRadius: "2px", marginTop: "6px" }}>
                <div style={{ height: "100%", borderRadius: "2px", width: `${(form.metaTitle.length / 60) * 100}%`, backgroundColor: form.metaTitle.length > 55 ? "#c97b00" : "#2d862d", transition: "width 0.2s" }} />
              </div>
            </Field>

            <Field label={`Meta description (${form.metaDesc.length}/160)`}>
              <textarea
                value={form.metaDesc}
                onChange={set("metaDesc")}
                maxLength={160}
                rows={3}
                placeholder="Breve descrição para os resultados de pesquisa…"
                style={{ ...inputSt, resize: "vertical", borderColor: form.metaDesc.length > 150 ? O : BORDER }}
              />
              <div style={{ height: "4px", backgroundColor: BORDER, borderRadius: "2px", marginTop: "6px" }}>
                <div style={{ height: "100%", borderRadius: "2px", width: `${(form.metaDesc.length / 160) * 100}%`, backgroundColor: form.metaDesc.length > 150 ? "#c97b00" : "#2d862d", transition: "width 0.2s" }} />
              </div>
            </Field>

            <Field label="Palavras-chave">
              <input
                type="text"
                value={form.keywords}
                onChange={set("keywords")}
                placeholder="impressão 3d, vaso, decoração, pla"
                style={inputSt}
              />
              <p style={{ fontSize: "11px", color: MUTED, margin: "4px 0 0" }}>Separadas por vírgula</p>
            </Field>
          </Section>
        </div>

        {/* Coluna lateral */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Preço & Stock */}
          <Section title="Preço & Stock">
            <Field label="Preço (€) *">
              <input
                type="number"
                value={form.preco}
                onChange={set("preco")}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={inputSt}
              />
            </Field>
            <Field label="Stock">
              <input
                type="number"
                value={form.stock}
                onChange={set("stock")}
                min="0"
                placeholder="0"
                style={inputSt}
              />
            </Field>
          </Section>

          {/* Estado */}
          <Section title="Estado">
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: DARK }}>Produto activo</p>
                <p style={{ margin: "2px 0 0", fontSize: "11px", color: MUTED }}>{form.ativo ? "Visível na loja" : "Em rascunho"}</p>
              </div>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, ativo: !f.ativo }))}
                style={{
                  width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
                  backgroundColor: form.ativo ? O : "#d1d0ce",
                  position: "relative", transition: "background-color 0.2s", flexShrink: 0,
                }}
              >
                <span style={{
                  position: "absolute", top: "4px",
                  left: form.ativo ? "22px" : "4px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  backgroundColor: "#fff", transition: "left 0.2s", display: "block",
                }} />
              </button>
            </label>
          </Section>

          {/* Resumo */}
          <Section title="Resumo">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                ["Nome", form.name || "—"],
                ["Slug", form.slug || "—"],
                ["Categoria", form.categoria],
                ["Material", form.material],
                ["Preço", form.preco ? `${Number(form.preco).toFixed(2)} €` : "—"],
                ["Stock", `${form.stock} un.`],
                ["Estado", form.ativo ? "✓ Activo" : "⊙ Rascunho"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
                  <span style={{ color: MUTED }}>{k}</span>
                  <span style={{ color: DARK, fontWeight: 500, textAlign: "right", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSaved(true)}
              style={{ width: "100%", marginTop: "16px", padding: "11px", borderRadius: "8px", border: "none", backgroundColor: O, fontSize: "13px", fontWeight: 700, color: "#fff", cursor: "pointer" }}
            >
              {isEdit ? "Actualizar" : "Guardar produto"}
            </button>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers de layout ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, padding: "20px 22px" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: DARK, margin: "0 0 18px", paddingBottom: "10px", borderBottom: `1px solid ${BORDER}` }}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: DARK, marginBottom: "6px" }}>{label}</label>
      {children}
    </div>
  );
}

const inputSt: React.CSSProperties = {
  width: "100%", padding: "9px 12px", borderRadius: "8px",
  border: `1px solid ${BORDER}`, fontSize: "13px", color: DARK,
  backgroundColor: "#fff", boxSizing: "border-box", outline: "none",
};
