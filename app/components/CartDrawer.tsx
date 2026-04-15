"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { MAT_COLOR } from "@/app/lib/tokens";

const O = "#ff6a00";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const BORDER = "#e8e5e1";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const portes = total >= 50 ? 0 : 4.99;
  const grandTotal = total + portes;

  return (
    <>
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
        position: "fixed", top: 0, right: 0, height: "100vh", width: "420px",
        backgroundColor: "#fff", zIndex: 401, display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 800, color: DARK, margin: 0 }}>Carrinho</h2>
            {itemCount > 0 && (
              <span style={{ backgroundColor: O, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>
                {itemCount}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: MUTED, lineHeight: 1, padding: "4px" }}>×</button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: "72px", height: "72px", backgroundColor: "#f5f4f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b0aaa4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>O teu carrinho está vazio</h3>
            <p style={{ fontSize: "13px", color: MUTED, margin: "0 0 24px", lineHeight: 1.6 }}>Adiciona produtos para começar a comprar</p>
            <Link href="/produtos" onClick={onClose} style={{ textDecoration: "none" }}>
              <button style={{ backgroundColor: O, color: "#fff", border: "none", padding: "11px 24px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                Ver produtos
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "14px", alignItems: "center", padding: "14px", backgroundColor: "#fafaf9", borderRadius: "12px", border: `1px solid ${BORDER}` }}>
                    {/* Thumbnail */}
                    <div style={{ width: "64px", height: "64px", backgroundColor: "#e8e5e1", borderRadius: "8px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span style={{ position: "absolute", bottom: "2px", left: "2px", backgroundColor: MAT_COLOR[item.material], color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 5px", borderRadius: "20px" }}>
                        {item.material}
                      </span>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: DARK, margin: "0 0 4px", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, margin: "0 0 8px" }}>{(item.price * item.qty).toFixed(2)} €</p>

                      {/* Qty + Remove */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", border: `1px solid ${BORDER}`, borderRadius: "6px", overflow: "hidden", backgroundColor: "#fff" }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                            style={{ width: "28px", height: "28px", border: "none", background: "none", cursor: "pointer", fontSize: "16px", color: DARK, display: "flex", alignItems: "center", justifyContent: "center" }}
                          >−</button>
                          <span style={{ width: "32px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: DARK }}>{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                            style={{ width: "28px", height: "28px", border: "none", background: "none", cursor: "pointer", fontSize: "16px", color: DARK, display: "flex", alignItems: "center", justifyContent: "center" }}
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#e05555", fontSize: "12px", cursor: "pointer", padding: 0 }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Portes info */}
              {portes > 0 && (
                <div style={{ marginTop: "12px", padding: "10px 14px", backgroundColor: "#fff9f5", borderRadius: "8px", border: "1px solid #fde8d4" }}>
                  <p style={{ fontSize: "12px", color: "#c97b00", margin: 0 }}>
                    Faltam <strong>{(50 - total).toFixed(2)} €</strong> para portes grátis
                  </p>
                </div>
              )}
              {portes === 0 && (
                <div style={{ marginTop: "12px", padding: "10px 14px", backgroundColor: "#f0faf0", borderRadius: "8px", border: "1px solid #c8e6c8" }}>
                  <p style={{ fontSize: "12px", color: "#2d862d", margin: 0 }}>✓ Portes grátis incluídos!</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: MUTED }}>Subtotal</span>
                  <span style={{ color: DARK, fontWeight: 500 }}>{total.toFixed(2)} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: MUTED }}>Portes</span>
                  <span style={{ color: portes === 0 ? "#2d862d" : DARK, fontWeight: 500 }}>
                    {portes === 0 ? "Grátis" : `${portes.toFixed(2)} €`}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800, paddingTop: "8px", borderTop: `1px solid ${BORDER}` }}>
                  <span style={{ color: DARK }}>Total</span>
                  <span style={{ color: DARK }}>{grandTotal.toFixed(2)} €</span>
                </div>
              </div>

              <Link href="/checkout" onClick={onClose} style={{ textDecoration: "none" }}>
                <button style={{ width: "100%", backgroundColor: O, color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                  Finalizar compra →
                </button>
              </Link>
              <button
                onClick={onClose}
                style={{ width: "100%", marginTop: "8px", backgroundColor: "transparent", color: MUTED, border: "none", padding: "10px", fontSize: "13px", cursor: "pointer" }}
              >
                Continuar a comprar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
