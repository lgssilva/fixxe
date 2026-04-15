"use client";

import Link from "next/link";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

/* ── Tipos ───────────────────────────────────────── */
interface MetricCard { label: string; value: string; sub: string; trend: "up"|"down"|"flat"; color?: string; }
interface Order { id: string; cliente: string; total: number; status: "pago"|"pendente"|"enviado"|"cancelado"; data: string; itens: number; }
interface LowStock { name: string; stock: number; }

/* ── Dados placeholder ───────────────────────────── */
const METRICS: MetricCard[] = [
  { label: "Pedidos hoje",      value: "12",          sub: "+3 face a ontem",    trend: "up"   },
  { label: "Receita do mês",    value: "3.847 €",     sub: "+18% face ao mês anterior", trend: "up", color: O },
  { label: "Produtos activos",  value: "34",          sub: "2 em rascunho",      trend: "flat" },
  { label: "Pedidos pendentes", value: "7",           sub: "3 aguardam pagamento", trend: "down" },
];

const STATUS_STYLE: Record<Order["status"], { bg: string; color: string; label: string }> = {
  pago:      { bg: "#e8f7e8", color: "#2d862d",  label: "Pago"      },
  pendente:  { bg: "#fff3e0", color: "#c97b00",  label: "Pendente"  },
  enviado:   { bg: "#e3f2fd", color: "#1565c0",  label: "Enviado"   },
  cancelado: { bg: "#fdecea", color: "#c62828",  label: "Cancelado" },
};

const RECENT_ORDERS: Order[] = [
  { id: "#FX-0042", cliente: "Maria Silva",     total: 117.90, status: "pago",      data: "11/04/2025", itens: 3 },
  { id: "#FX-0041", cliente: "João Ferreira",   total:  54.00, status: "enviado",   data: "11/04/2025", itens: 1 },
  { id: "#FX-0040", cliente: "Ana Costa",       total:  38.50, status: "pendente",  data: "10/04/2025", itens: 2 },
  { id: "#FX-0039", cliente: "Carlos Mendes",   total:  89.00, status: "pago",      data: "10/04/2025", itens: 1 },
  { id: "#FX-0038", cliente: "Sofia Rodrigues", total:  24.90, status: "cancelado", data: "09/04/2025", itens: 1 },
];

const LOW_STOCK: LowStock[] = [
  { name: "Diorama Miniatura 10×10",    stock: 1 },
  { name: "Escultura Abstrata Modular", stock: 2 },
  { name: "Figura Decorativa — Dragão", stock: 3 },
];

/* Dados do gráfico de barras — receita diária (últimos 7 dias) */
const CHART = [
  { day: "Seg", val: 320 },
  { day: "Ter", val: 480 },
  { day: "Qua", val: 210 },
  { day: "Qui", val: 650 },
  { day: "Sex", val: 890 },
  { day: "Sáb", val: 740 },
  { day: "Dom", val: 430 },
];
const CHART_MAX = Math.max(...CHART.map(c => c.val));

/* ── Componentes pequenos ────────────────────────── */
function TrendIcon({ t }: { t: MetricCard["trend"] }) {
  if (t === "up")   return <span style={{ color: "#2d862d", fontSize: "12px" }}>▲</span>;
  if (t === "down") return <span style={{ color: "#c62828", fontSize: "12px" }}>▼</span>;
  return <span style={{ color: MUTED, fontSize: "12px" }}>—</span>;
}

export default function AdminDashboard() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: "1080px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: DARK, margin: "0 0 4px" }}>Dashboard</h1>
          <p style={{ fontSize: "13px", color: MUTED, margin: 0 }}>Sexta-feira, 11 de Abril de 2025</p>
        </div>
        <Link href="/admin/pedidos">
          <button style={{ backgroundColor: O, color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
            Ver todos os pedidos →
          </button>
        </Link>
      </div>

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {METRICS.map(m => (
          <div key={m.label} style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, padding: "20px 22px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 10px" }}>{m.label}</p>
            <p style={{ fontSize: "28px", fontWeight: 800, color: m.color ?? DARK, margin: "0 0 8px", lineHeight: 1 }}>{m.value}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <TrendIcon t={m.trend} />
              <span style={{ fontSize: "12px", color: MUTED }}>{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", marginBottom: "24px" }}>
        {/* Gráfico de barras */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: DARK, margin: 0 }}>Receita — últimos 7 dias</h2>
            <span style={{ fontSize: "12px", color: MUTED, backgroundColor: "#f5f4f2", padding: "4px 10px", borderRadius: "20px" }}>em €</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px" }}>
            {CHART.map(({ day, val }) => {
              const pct = (val / CHART_MAX) * 100;
              return (
                <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                  <span style={{ fontSize: "11px", color: MUTED, fontWeight: 500 }}>{val}</span>
                  <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
                    <div
                      style={{
                        width: "100%", height: `${pct}%`, minHeight: "4px",
                        backgroundColor: day === "Sex" ? O : "#e8e5e1",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.3s ease",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "11px", color: MUTED }}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerta stock baixo */}
        <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: DARK, margin: "0 0 4px" }}>⚠ Stock baixo</h2>
          <p style={{ fontSize: "12px", color: MUTED, margin: "0 0 18px" }}>Produtos com stock ≤ 3 unidades</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {LOW_STOCK.map(({ name, stock }) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", backgroundColor: stock === 1 ? "#fdecea" : "#fff9f5", borderRadius: "8px", border: `1px solid ${stock === 1 ? "#f5c6c6" : "#fde8d4"}` }}>
                <p style={{ fontSize: "12px", fontWeight: 500, color: DARK, margin: 0, lineHeight: 1.3, maxWidth: "160px" }}>{name}</p>
                <span style={{ fontSize: "13px", fontWeight: 700, color: stock === 1 ? "#c62828" : "#c97b00", flexShrink: 0 }}>{stock} un.</span>
              </div>
            ))}
          </div>
          <Link href="/admin/produtos" style={{ display: "block", marginTop: "16px", textAlign: "center", fontSize: "12px", color: O, textDecoration: "none", fontWeight: 500 }}>
            Gerir stock →
          </Link>
        </div>
      </div>

      {/* Tabela de pedidos recentes */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${BORDER}` }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: DARK, margin: 0 }}>Pedidos recentes</h2>
          <Link href="/admin/pedidos" style={{ fontSize: "13px", color: O, textDecoration: "none", fontWeight: 500 }}>Ver todos →</Link>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#fafaf9" }}>
              {["Pedido", "Cliente", "Total", "Itens", "Status", "Data"].map(h => (
                <th key={h} style={{ padding: "10px 24px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: `1px solid ${BORDER}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_ORDERS.map((o, i) => {
              const s = STATUS_STYLE[o.status];
              return (
                <tr key={o.id} style={{ borderBottom: i < RECENT_ORDERS.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                  <td style={{ padding: "14px 24px", fontSize: "13px", fontWeight: 600, color: O }}>{o.id}</td>
                  <td style={{ padding: "14px 24px", fontSize: "13px", color: DARK }}>{o.cliente}</td>
                  <td style={{ padding: "14px 24px", fontSize: "13px", fontWeight: 600, color: DARK }}>{o.total.toFixed(2)} €</td>
                  <td style={{ padding: "14px 24px", fontSize: "13px", color: MUTED }}>{o.itens} {o.itens === 1 ? "item" : "itens"}</td>
                  <td style={{ padding: "14px 24px" }}>
                    <span style={{ backgroundColor: s.bg, color: s.color, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{s.label}</span>
                  </td>
                  <td style={{ padding: "14px 24px", fontSize: "12px", color: MUTED }}>{o.data}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
