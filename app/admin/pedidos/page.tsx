"use client";

import { useState } from "react";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

type Status = "pago" | "pendente" | "enviado" | "cancelado" | "reembolsado";
type Pagamento = "Cartão" | "PayPal" | "MB Way" | "Multibanco";

interface Order {
  id: string;
  cliente: string;
  email: string;
  total: number;
  pagamento: Pagamento;
  status: Status;
  data: string;
  itens: number;
}

const STATUS_STYLE: Record<Status, { bg: string; color: string; label: string }> = {
  pago:        { bg: "#e8f7e8", color: "#2d862d",  label: "Pago"        },
  pendente:    { bg: "#fff3e0", color: "#c97b00",  label: "Pendente"    },
  enviado:     { bg: "#e3f2fd", color: "#1565c0",  label: "Enviado"     },
  cancelado:   { bg: "#fdecea", color: "#c62828",  label: "Cancelado"   },
  reembolsado: { bg: "#f3e5f5", color: "#6a1b9a",  label: "Reembolsado" },
};

const PAG_STYLE: Record<Pagamento, string> = {
  "Cartão":      "#e3f2fd",
  "PayPal":      "#e8f0fe",
  "MB Way":      "#e8f7e8",
  "Multibanco":  "#fff3e0",
};

const ORDERS: Order[] = [
  { id: "#FX-0042", cliente: "Maria Silva",       email: "maria@gmail.com",    total: 117.90, pagamento: "Cartão",     status: "pago",        data: "11/04/2025", itens: 3 },
  { id: "#FX-0041", cliente: "João Ferreira",     email: "joao@outlook.pt",    total:  54.00, pagamento: "PayPal",     status: "enviado",     data: "11/04/2025", itens: 1 },
  { id: "#FX-0040", cliente: "Ana Costa",         email: "ana.costa@gmail.com",total:  38.50, pagamento: "MB Way",     status: "pendente",    data: "10/04/2025", itens: 2 },
  { id: "#FX-0039", cliente: "Carlos Mendes",     email: "cmendes@sapo.pt",    total:  89.00, pagamento: "Cartão",     status: "pago",        data: "10/04/2025", itens: 1 },
  { id: "#FX-0038", cliente: "Sofia Rodrigues",   email: "sofia.r@gmail.com",  total:  24.90, pagamento: "Multibanco", status: "cancelado",   data: "09/04/2025", itens: 1 },
  { id: "#FX-0037", cliente: "Rui Almeida",       email: "rui.alm@hotmail.com",total: 155.00, pagamento: "Cartão",     status: "enviado",     data: "09/04/2025", itens: 4 },
  { id: "#FX-0036", cliente: "Inês Pinto",        email: "ines.pinto@gmail.com",total:  46.40, pagamento: "MB Way",    status: "pago",        data: "08/04/2025", itens: 2 },
  { id: "#FX-0035", cliente: "Tiago Oliveira",    email: "tiago@gmail.com",    total:  99.00, pagamento: "PayPal",     status: "reembolsado", data: "08/04/2025", itens: 1 },
  { id: "#FX-0034", cliente: "Beatriz Santos",    email: "bea.santos@pt.pt",   total:  31.50, pagamento: "Cartão",     status: "pago",        data: "07/04/2025", itens: 1 },
  { id: "#FX-0033", cliente: "Miguel Carvalho",   email: "mcarvalho@sapo.pt",  total:  76.00, pagamento: "Multibanco", status: "pendente",    data: "07/04/2025", itens: 2 },
  { id: "#FX-0032", cliente: "Catarina Lima",     email: "cat.lima@gmail.com", total:  22.90, pagamento: "MB Way",     status: "enviado",     data: "06/04/2025", itens: 1 },
  { id: "#FX-0031", cliente: "André Gomes",       email: "agomes@outlook.pt",  total: 210.00, pagamento: "Cartão",     status: "pago",        data: "06/04/2025", itens: 5 },
  { id: "#FX-0030", cliente: "Mariana Sousa",     email: "m.sousa@gmail.com",  total:  15.90, pagamento: "MB Way",     status: "pago",        data: "05/04/2025", itens: 1 },
  { id: "#FX-0029", cliente: "Filipe Cruz",       email: "fcruz@gmail.com",    total:  65.00, pagamento: "PayPal",     status: "cancelado",   data: "05/04/2025", itens: 2 },
  { id: "#FX-0028", cliente: "Vera Nunes",        email: "vera.nunes@pt.pt",   total:  42.00, pagamento: "Cartão",     status: "pago",        data: "04/04/2025", itens: 2 },
];

function exportCSV(orders: Order[]) {
  const header = ["Nº Pedido", "Cliente", "Email", "Total (€)", "Pagamento", "Status", "Data", "Itens"];
  const rows = orders.map(o => [o.id, o.cliente, o.email, o.total.toFixed(2), o.pagamento, STATUS_STYLE[o.status].label, o.data, o.itens]);
  const csv = [header, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "pedidos-fixxe.csv"; a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPedidos() {
  const [search, setSearch]         = useState("");
  const [statusF, setStatusF]       = useState<Status | "todos">("todos");
  const [pagF, setPagF]             = useState<Pagamento | "Todos">("Todos");
  const [detail, setDetail]         = useState<Order | null>(null);

  const filtered = ORDERS
    .filter(o => statusF === "todos" || o.status === statusF)
    .filter(o => pagF === "Todos" || o.pagamento === pagF)
    .filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.cliente.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    );

  const total = filtered.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ padding: "32px 36px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: DARK, margin: "0 0 4px" }}>Pedidos</h1>
          <p style={{ fontSize: "13px", color: MUTED, margin: 0 }}>
            {filtered.length} pedido{filtered.length !== 1 ? "s" : ""} · total {total.toFixed(2)} €
          </p>
        </div>
        <button
          onClick={() => exportCSV(filtered)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px", borderRadius: "8px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "13px", fontWeight: 600, color: DARK, cursor: "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar CSV
        </button>
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
            placeholder="Pesquisar por nº, cliente ou email…"
            style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: "8px", border: `1px solid ${BORDER}`, fontSize: "13px", color: DARK, boxSizing: "border-box", outline: "none" }}
          />
        </div>

        {/* Filtro status */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {(["todos", "pago", "pendente", "enviado", "cancelado", "reembolsado"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusF(s)}
              style={{
                padding: "6px 12px", borderRadius: "20px", border: `1px solid ${statusF === s ? O : BORDER}`,
                backgroundColor: statusF === s ? "#fff9f5" : "#fff",
                fontSize: "12px", fontWeight: statusF === s ? 700 : 400,
                color: statusF === s ? O : MUTED, cursor: "pointer",
              }}
            >
              {s === "todos" ? "Todos" : STATUS_STYLE[s].label}
            </button>
          ))}
        </div>

        <select value={pagF} onChange={e => setPagF(e.target.value as typeof pagF)} style={{ padding: "9px 12px", borderRadius: "8px", border: `1px solid ${BORDER}`, fontSize: "13px", color: DARK, backgroundColor: "#fff", cursor: "pointer" }}>
          <option>Todos</option>
          {(["Cartão", "PayPal", "MB Way", "Multibanco"] as Pagamento[]).map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* Tabela */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#fafaf9" }}>
              {["Nº Pedido", "Cliente", "Email", "Total", "Pagamento", "Status", "Data", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 18px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => {
              const s = STATUS_STYLE[o.status];
              return (
                <tr
                  key={o.id}
                  style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : "none", cursor: "pointer" }}
                  onClick={() => setDetail(o)}
                >
                  <td style={{ padding: "13px 18px", fontSize: "13px", fontWeight: 700, color: O, whiteSpace: "nowrap" }}>{o.id}</td>
                  <td style={{ padding: "13px 18px", fontSize: "13px", fontWeight: 500, color: DARK, whiteSpace: "nowrap" }}>{o.cliente}</td>
                  <td style={{ padding: "13px 18px", fontSize: "12px", color: MUTED }}>{o.email}</td>
                  <td style={{ padding: "13px 18px", fontSize: "13px", fontWeight: 700, color: DARK, whiteSpace: "nowrap" }}>{o.total.toFixed(2)} €</td>
                  <td style={{ padding: "13px 18px" }}>
                    <span style={{ backgroundColor: PAG_STYLE[o.pagamento], fontSize: "11px", fontWeight: 600, padding: "3px 9px", borderRadius: "6px", color: DARK, whiteSpace: "nowrap" }}>
                      {o.pagamento}
                    </span>
                  </td>
                  <td style={{ padding: "13px 18px" }}>
                    <span style={{ backgroundColor: s.bg, color: s.color, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap" }}>{s.label}</span>
                  </td>
                  <td style={{ padding: "13px 18px", fontSize: "12px", color: MUTED, whiteSpace: "nowrap" }}>{o.data}</td>
                  <td style={{ padding: "13px 18px" }}>
                    <button
                      onClick={e => { e.stopPropagation(); setDetail(o); }}
                      style={{ padding: "4px 10px", borderRadius: "6px", border: `1px solid ${BORDER}`, backgroundColor: "#fff", fontSize: "12px", color: MUTED, cursor: "pointer" }}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px", color: MUTED }}>
            <p style={{ margin: 0, fontSize: "14px" }}>Nenhum pedido encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal detalhe */}
      {detail && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "flex-end" }}
          onClick={() => setDetail(null)}
        >
          <div
            style={{ width: "380px", height: "100vh", backgroundColor: "#fff", padding: "32px 28px", overflowY: "auto", boxShadow: "-8px 0 32px rgba(0,0,0,0.15)" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: DARK, margin: 0 }}>Pedido {detail.id}</h2>
              <button onClick={() => setDetail(null)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: MUTED, lineHeight: 1 }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Status */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" }}>Status</p>
                <span style={{ backgroundColor: STATUS_STYLE[detail.status].bg, color: STATUS_STYLE[detail.status].color, fontSize: "13px", fontWeight: 700, padding: "5px 14px", borderRadius: "20px" }}>
                  {STATUS_STYLE[detail.status].label}
                </span>
              </div>

              {/* Cliente */}
              <div style={{ backgroundColor: "#fafaf9", borderRadius: "10px", padding: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 10px" }}>Cliente</p>
                <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: 600, color: DARK }}>{detail.cliente}</p>
                <p style={{ margin: 0, fontSize: "13px", color: MUTED }}>{detail.email}</p>
              </div>

              {/* Itens placeholder */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 10px" }}>Itens ({detail.itens})</p>
                {Array.from({ length: detail.itens }).map((_, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ width: "40px", height: "40px", backgroundColor: "#e8e5e1", borderRadius: "6px", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "12px", fontWeight: 500, color: DARK }}>Produto #{i + 1}</p>
                      <p style={{ margin: 0, fontSize: "11px", color: MUTED }}>1 un.</p>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: DARK }}>—</span>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 0" }}>
                  <span style={{ color: MUTED }}>Subtotal</span>
                  <span style={{ color: DARK }}>{(detail.total - 4.99).toFixed(2)} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 0" }}>
                  <span style={{ color: MUTED }}>Portes</span>
                  <span style={{ color: "#2d862d" }}>Grátis</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, padding: "10px 0 0", borderTop: `2px solid ${BORDER}`, marginTop: "4px" }}>
                  <span style={{ color: DARK }}>Total</span>
                  <span style={{ color: DARK }}>{detail.total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Info */}
              {[
                ["Pagamento", detail.pagamento],
                ["Data", detail.data],
                ["Nº pedido", detail.id],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}>
                  <span style={{ color: MUTED }}>{k}</span>
                  <span style={{ color: DARK, fontWeight: 500 }}>{v}</span>
                </div>
              ))}

              {/* Alterar status */}
              <div style={{ marginTop: "8px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: DARK, margin: "0 0 8px" }}>Alterar status</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(["pago", "enviado", "cancelado", "reembolsado"] as Status[]).map(s => (
                    <button
                      key={s}
                      style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${STATUS_STYLE[s].color}`, backgroundColor: STATUS_STYLE[s].bg, fontSize: "11px", fontWeight: 600, color: STATUS_STYLE[s].color, cursor: "pointer" }}
                    >
                      {STATUS_STYLE[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
