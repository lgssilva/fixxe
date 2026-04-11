"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { C, MAT_COLOR } from "@/app/lib/tokens";

interface CartItem {
  id: number;
  name: string;
  material: "PLA" | "PETG" | "ABS" | "Resina";
  price: number;
  qty: number;
}

const INITIAL_ITEMS: CartItem[] = [
  { id: 1, name: "Vaso Geométrico Minimalista",       material: "PLA",  price: 24.90, qty: 1 },
  { id: 2, name: "Organizador de Secretária Modular", material: "PETG", price: 38.50, qty: 2 },
  { id: 3, name: "Figura Decorativa — Dragão",        material: "Resina", price: 54.00, qty: 1 },
];

export default function CarrinhoPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const portes = subtotal >= 50 ? 0 : 4.99;
  const desconto = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + portes - desconto;
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar cartCount={totalItems} />

      <main style={{ backgroundColor: C.bgLight, minHeight: "100vh" }}>
        {/* Breadcrumb */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${C.borderLight}`, padding: "12px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: C.darkMuted }}>
            <Link href="/" style={{ color: C.darkMuted, textDecoration: "none" }}>Início</Link>
            <span>›</span>
            <span style={{ color: C.dark, fontWeight: 500 }}>Carrinho</span>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 40px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: C.dark, margin: "0 0 32px" }}>
            O teu carrinho ({totalItems} {totalItems === 1 ? "item" : "itens"})
          </h1>

          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: "16px", color: C.darkMuted, margin: "0 0 16px" }}>O teu carrinho está vazio.</p>
              <Link href="/produtos">
                <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>
                  Ver produtos
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "65% 35%", gap: "32px", alignItems: "start" }}>
              {/* Lista de itens */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${C.borderLight}`, padding: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
                    {/* Imagem placeholder */}
                    <div style={{ width: "96px", height: "96px", backgroundColor: "#e8e5e1", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span style={{ position: "absolute", bottom: "4px", left: "4px", backgroundColor: MAT_COLOR[item.material], color: "#fff", fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "20px" }}>
                        {item.material}
                      </span>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 600, color: C.dark, margin: "0 0 6px" }}>{item.name}</h3>
                      <p style={{ fontSize: "13px", color: C.darkMuted, margin: "0 0 12px" }}>Material: {item.material}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {/* Seletor quantidade */}
                        <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.borderLight}`, borderRadius: "8px", overflow: "hidden", backgroundColor: C.bgLight }}>
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            style={{ width: "36px", height: "36px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", color: C.dark }}
                          >−</button>
                          <span style={{ width: "40px", textAlign: "center", fontSize: "14px", fontWeight: 600, color: C.dark }}>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, +1)}
                            style={{ width: "36px", height: "36px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", color: C.dark }}
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#e05555", fontSize: "13px", cursor: "pointer", padding: "4px 0" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                          Remover
                        </button>
                      </div>
                    </div>

                    {/* Preço */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: "18px", fontWeight: 700, color: C.dark, margin: 0 }}>
                        {(item.price * item.qty).toFixed(2)} €
                      </p>
                      {item.qty > 1 && (
                        <p style={{ fontSize: "12px", color: C.darkMuted, margin: "4px 0 0" }}>{item.price.toFixed(2)} € / un.</p>
                      )}
                    </div>
                  </div>
                ))}

                <Link href="/produtos" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: C.orange, textDecoration: "none", fontSize: "14px", fontWeight: 500, marginTop: "4px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Continuar a comprar
                </Link>
              </div>

              {/* Resumo */}
              <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${C.borderLight}`, padding: "28px", position: "sticky", top: "88px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.dark, margin: "0 0 24px" }}>Resumo do pedido</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: C.darkMuted }}>Subtotal</span>
                    <span style={{ color: C.dark, fontWeight: 500 }}>{subtotal.toFixed(2)} €</span>
                  </div>
                  {desconto > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span style={{ color: "#6dbe6d" }}>Desconto (10%)</span>
                      <span style={{ color: "#6dbe6d", fontWeight: 500 }}>−{desconto.toFixed(2)} €</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: C.darkMuted }}>Portes de envio</span>
                    {portes === 0 ? (
                      <span style={{ color: "#6dbe6d", fontWeight: 500 }}>Grátis</span>
                    ) : (
                      <span style={{ color: C.dark, fontWeight: 500 }}>{portes.toFixed(2)} €</span>
                    )}
                  </div>
                  {portes === 0 && (
                    <p style={{ fontSize: "12px", color: "#6dbe6d", margin: "0", backgroundColor: "#f0faf0", padding: "6px 10px", borderRadius: "6px" }}>
                      ✓ Portes grátis para encomendas acima de 50 €
                    </p>
                  )}
                  {portes > 0 && (
                    <p style={{ fontSize: "12px", color: C.darkMuted, margin: "0", backgroundColor: C.bgLight, padding: "6px 10px", borderRadius: "6px" }}>
                      Faltam {(50 - subtotal).toFixed(2)} € para portes grátis
                    </p>
                  )}
                </div>

                <div style={{ borderTop: `2px solid ${C.borderLight}`, paddingTop: "16px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: C.dark }}>Total</span>
                    <span style={{ fontSize: "22px", fontWeight: 800, color: C.dark }}>{total.toFixed(2)} €</span>
                  </div>
                  <p style={{ fontSize: "12px", color: C.darkMuted, margin: "4px 0 0" }}>IVA incluído</p>
                </div>

                <Link href="/checkout" style={{ textDecoration: "none" }}>
                  <button className="btn-primary" style={{ width: "100%", backgroundColor: C.orange, color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: 700, fontSize: "16px", cursor: "pointer", marginBottom: "16px" }}>
                    Finalizar compra →
                  </button>
                </Link>

                {/* Código promocional */}
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: C.dark, margin: "0 0 8px" }}>Código promocional</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="FIXXE10"
                      style={{ flex: 1, padding: "9px 12px", borderRadius: "8px", border: `1px solid ${C.borderLight}`, fontSize: "13px", color: C.dark, outline: "none" }}
                    />
                    <button
                      onClick={() => { if (promo.trim()) setPromoApplied(true); }}
                      style={{ padding: "9px 14px", borderRadius: "8px", border: `1px solid ${C.borderLight}`, backgroundColor: "#fff", fontSize: "13px", fontWeight: 600, color: C.dark, cursor: "pointer" }}
                    >
                      Aplicar
                    </button>
                  </div>
                  {promoApplied && (
                    <p style={{ fontSize: "12px", color: "#6dbe6d", margin: "6px 0 0" }}>✓ Código aplicado com sucesso!</p>
                  )}
                </div>

                {/* Selos de segurança */}
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "16px" }}>
                  {["🔒 Pagamento seguro", "🚚 Envio rápido", "↩️ Devoluções fáceis"].map((badge) => (
                    <span key={badge} style={{ fontSize: "11px", color: C.darkMuted }}>{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
