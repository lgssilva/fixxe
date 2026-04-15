"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, MAT_COLOR } from "@/app/lib/tokens";
import type { Product } from "@/app/lib/tokens";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

type SortKey = "name" | "price" | "id";

export default function AdminProdutos() {
  const [search, setSearch]   = useState("");
  const [catF, setCatF]       = useState("Todas");
  const [matF, setMatF]       = useState("Todos");
  const [sort, setSort]       = useState<SortKey>("id");
  const [active, setActive]   = useState<Record<number, boolean>>(
    Object.fromEntries(ALL_PRODUCTS.map(p => [p.id, true]))
  );
  const [archived, setArchived] = useState<Record<number, boolean>>({});

  const cats = ["Todas", ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))];
  const mats = ["Todos", ...Array.from(new Set(ALL_PRODUCTS.map(p => p.material)))];

  const visible = ALL_PRODUCTS
    .filter(p => !archived[p.id])
    .filter(p => catF === "Todas" || p.category === catF)
    .filter(p => matF === "Todos" || p.material === matF)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "price" ? b.price - a.price : a.id - b.id);

  /* stock simulado */
  const stock = (p: Product) => ((p.id * 7) % 20) + 1;

  return (
    <div style={{ padding: "32px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: DARK, margin: "0 0 4px" }}>Produtos</h1>
          <p style={{ fontSize: "13px", color: MUTED, margin: 0 }}>{visible.length} de {ALL_PRODUCTS.length} produtos</p>
        </div>
        <Link href="/admin/produtos/novo" style={{ textDecoration: "none" }}>
          <button style={{ backgroundColor: O, color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span> Novo Produto
          </button>
        </Link>
      </div>

      {/* Filtros */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, padding: "16px 20px", marginBottom: "20px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        {/* Pesquisa */}
        <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: MUTED }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar produto..."
            style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: "8px", border: `1px solid ${BORDER}`, fontSize: "13px", color: DARK, boxSizing: "border-box", outline: "none" }}
          />
        </div>

        <select value={catF} onChange={e => setCatF(e.target.value)} style={selectSt}>
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={matF} onChange={e => setMatF(e.target.value)} style={selectSt}>
          {mats.map(m => <option key={m}>{m}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value as SortKey)} style={selectSt}>
          <option value="id">Ordenar: recente</option>
          <option value="name">Ordenar: nome</option>
          <option value="price">Ordenar: preço</option>
        </select>
      </div>

      {/* Tabela */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#fafaf9" }}>
              {["", "Produto", "Categoria", "Material", "Preço", "Stock", "Activo", "Ações"].map((h, i) => (
                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((p, i) => {
              const st = stock(p);
              const isActive = active[p.id] ?? true;
              return (
                <tr key={p.id} style={{ borderBottom: i < visible.length - 1 ? `1px solid ${BORDER}` : "none", opacity: isActive ? 1 : 0.5 }}>
                  {/* Thumbnail */}
                  <td style={{ padding: "12px 16px", width: "52px" }}>
                    <div style={{ width: "44px", height: "44px", backgroundColor: "#e8e5e1", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b0aaa4" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  </td>

                  <td style={{ padding: "12px 16px", maxWidth: "200px" }}>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "11px", color: MUTED }}>{p.slug}</p>
                  </td>

                  <td style={{ padding: "12px 16px", fontSize: "12px", color: MUTED, whiteSpace: "nowrap" }}>{p.category}</td>

                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ backgroundColor: MAT_COLOR[p.material], color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>{p.material}</span>
                  </td>

                  <td style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: DARK, whiteSpace: "nowrap" }}>{p.price.toFixed(2)} €</td>

                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: "12px", fontWeight: 700,
                      color: st <= 3 ? "#c62828" : st <= 8 ? "#c97b00" : "#2d862d",
                    }}>{st} un.</span>
                  </td>

                  {/* Toggle activo */}
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => setActive(a => ({ ...a, [p.id]: !a[p.id] }))}
                      style={{
                        width: "40px", height: "22px", borderRadius: "11px", border: "none", cursor: "pointer",
                        backgroundColor: isActive ? O : "#d1d0ce",
                        position: "relative", transition: "background-color 0.2s",
                      }}
                    >
                      <span style={{
                        position: "absolute", top: "3px",
                        left: isActive ? "20px" : "3px",
                        width: "16px", height: "16px", borderRadius: "50%",
                        backgroundColor: "#fff", transition: "left 0.2s",
                        display: "block",
                      }} />
                    </button>
                  </td>

                  {/* Ações */}
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link href={`/admin/produtos/novo?edit=${p.slug}`} style={{ textDecoration: "none" }}>
                        <button style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "12px", color: DARK, cursor: "pointer", fontWeight: 500 }}>
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => setArchived(a => ({ ...a, [p.id]: true }))}
                        style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #f5c6c6", backgroundColor: "#fdecea", fontSize: "12px", color: "#c62828", cursor: "pointer", fontWeight: 500 }}
                      >
                        Arquivar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px", color: MUTED }}>
            <p style={{ margin: 0, fontSize: "14px" }}>Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const selectSt: React.CSSProperties = {
  padding: "9px 12px", borderRadius: "8px", border: `1px solid ${BORDER}`,
  fontSize: "13px", color: DARK, backgroundColor: "#fff", cursor: "pointer",
};
