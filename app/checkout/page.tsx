"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { C } from "@/app/lib/tokens";

const STEPS = ["Carrinho", "Checkout", "Confirmação"];

const ORDER_ITEMS = [
  { id: 1, name: "Vaso Geométrico Minimalista",       material: "PLA"   as const, price: 24.90, qty: 1 },
  { id: 2, name: "Organizador de Secretária Modular", material: "PETG"  as const, price: 38.50, qty: 2 },
  { id: 3, name: "Figura Decorativa — Dragão",        material: "Resina"as const, price: 54.00, qty: 1 },
];

type PayMethod = "cartao" | "paypal" | "mbway";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    rua: "", numero: "", cp: "", cidade: "", pais: "Portugal",
  });
  const [pay, setPay] = useState<PayMethod>("cartao");
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const portes = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + portes;

  if (submitted) {
    return (
      <>
        <Navbar cartCount={0} />
        <main style={{ backgroundColor: C.bgLight, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: "60px 40px", backgroundColor: "#fff", borderRadius: "20px", border: `1px solid ${C.borderLight}`, maxWidth: "480px" }}>
            <div style={{ width: "72px", height: "72px", backgroundColor: "#f0faf0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6dbe6d" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: C.dark, margin: "0 0 12px" }}>Pedido confirmado!</h1>
            <p style={{ fontSize: "15px", color: C.darkMuted, margin: "0 0 24px", lineHeight: 1.6 }}>
              Obrigado pela tua encomenda. Vais receber um email de confirmação em breve.
            </p>
            <p style={{ fontSize: "13px", color: C.darkMuted, margin: "0 0 28px" }}>Nº pedido: <strong style={{ color: C.dark }}>#FX-2025-0042</strong></p>
            <Link href="/produtos">
              <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                Continuar a comprar
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar cartCount={3} />

      <main style={{ backgroundColor: C.bgLight, minHeight: "100vh" }}>
        {/* Progress */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${C.borderLight}`, padding: "20px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0" }}>
            {STEPS.map((step, i) => {
              const done = i === 0;
              const active = i === 1;
              return (
                <div key={step} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      backgroundColor: done ? "#6dbe6d" : active ? C.orange : C.borderLight,
                      color: done || active ? "#fff" : C.darkMuted,
                      fontWeight: 700, fontSize: "14px",
                    }}>
                      {done ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : i + 1}
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: active ? 700 : 500, color: active ? C.dark : C.darkMuted }}>{step}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: "80px", height: "2px", backgroundColor: done ? "#6dbe6d" : C.borderLight, margin: "0 8px", marginBottom: "18px" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 40px" }}>
          <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: "40px", alignItems: "start" }}>
            {/* Formulário */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Secção 1 — Dados de contacto */}
              <FormSection num={1} title="Dados de contacto">
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
                  <FormField label="Nome completo" type="text" value={form.nome} onChange={set("nome")} placeholder="Maria Silva" />
                  <FormField label="Email" type="email" value={form.email} onChange={set("email")} placeholder="maria@exemplo.pt" />
                  <FormField label="Telefone" type="tel" value={form.telefone} onChange={set("telefone")} placeholder="+351 912 345 678" />
                </div>
              </FormSection>

              {/* Secção 2 — Morada */}
              <FormSection num={2} title="Morada de entrega">
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
                  <FormField label="Rua / Avenida" type="text" value={form.rua} onChange={set("rua")} placeholder="Rua das Flores, 42" />
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px" }}>
                    <FormField label="Número / Andar" type="text" value={form.numero} onChange={set("numero")} placeholder="2º Dto" />
                    <FormField label="Código postal" type="text" value={form.cp} onChange={set("cp")} placeholder="2750-123" />
                  </div>
                  <FormField label="Cidade" type="text" value={form.cidade} onChange={set("cidade")} placeholder="Cascais" />
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.dark, marginBottom: "6px" }}>País</label>
                    <select
                      value={form.pais}
                      onChange={set("pais")}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1px solid ${C.borderLight}`, fontSize: "14px", color: C.dark, backgroundColor: "#fff" }}
                    >
                      <option>Portugal</option>
                      <option>Espanha</option>
                      <option>França</option>
                    </select>
                  </div>
                </div>
              </FormSection>

              {/* Secção 3 — Pagamento */}
              <FormSection num={3} title="Método de pagamento">
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {([
                    { id: "cartao",  label: "Cartão de crédito / Débito", sub: "Via Stripe — pagamento seguro SSL", icon: "💳" },
                    { id: "paypal",  label: "PayPal",                      sub: "Redireccionado para o PayPal",      icon: "🅿️" },
                    { id: "mbway",   label: "Multibanco / MB Way",         sub: "Via Ifthenpay",                     icon: "🏦" },
                  ] as { id: PayMethod; label: string; sub: string; icon: string }[]).map(({ id, label, sub, icon }) => (
                    <label key={id} style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      padding: "16px 18px", borderRadius: "10px", cursor: "pointer",
                      border: `2px solid ${pay === id ? C.orange : C.borderLight}`,
                      backgroundColor: pay === id ? "#fff9f5" : "#fff",
                      transition: "border-color 0.2s",
                    }}>
                      <input type="radio" name="pay" value={id} checked={pay === id} onChange={() => setPay(id)} style={{ accentColor: C.orange, width: "18px", height: "18px" }} />
                      <span style={{ fontSize: "22px" }}>{icon}</span>
                      <div>
                        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: C.dark }}>{label}</p>
                        <p style={{ margin: 0, fontSize: "12px", color: C.darkMuted }}>{sub}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {pay === "cartao" && (
                  <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
                    <FormField label="Número do cartão" type="text" value="" onChange={() => {}} placeholder="1234 5678 9012 3456" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <FormField label="Validade" type="text" value="" onChange={() => {}} placeholder="MM/AA" />
                      <FormField label="CVV" type="text" value="" onChange={() => {}} placeholder="123" />
                    </div>
                  </div>
                )}
              </FormSection>
            </div>

            {/* Resumo do pedido */}
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: `1px solid ${C.borderLight}`, padding: "28px", position: "sticky", top: "100px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.dark, margin: "0 0 20px" }}>Resumo do pedido</h2>

              {/* Itens */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ width: "52px", height: "52px", backgroundColor: "#e8e5e1", borderRadius: "8px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span style={{ position: "absolute", top: "-6px", right: "-6px", backgroundColor: C.dark, color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                        {item.qty}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{item.name}</p>
                      <p style={{ margin: "2px 0 0", fontSize: "11px", color: C.darkMuted }}>{item.material}</p>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: C.dark, flexShrink: 0 }}>
                      {(item.price * item.qty).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: C.darkMuted }}>Subtotal</span>
                  <span style={{ color: C.dark, fontWeight: 500 }}>{subtotal.toFixed(2)} €</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: C.darkMuted }}>Portes</span>
                  <span style={{ color: portes === 0 ? "#6dbe6d" : C.dark, fontWeight: 500 }}>
                    {portes === 0 ? "Grátis" : `${portes.toFixed(2)} €`}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: `2px solid ${C.borderLight}`, paddingTop: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: C.dark }}>Total</span>
                <span style={{ fontSize: "22px", fontWeight: 800, color: C.dark }}>{total.toFixed(2)} €</span>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="btn-primary"
                style={{ width: "100%", backgroundColor: C.orange, color: "#fff", border: "none", padding: "15px", borderRadius: "10px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}
              >
                Confirmar pedido →
              </button>

              <p style={{ fontSize: "12px", color: C.darkMuted, textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 }}>
                🔒 Pagamento 100% seguro e encriptado
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function FormSection({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "14px", border: `1px solid ${C.borderLight}`, padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: C.orange, color: "#fff", fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {num}
        </div>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.dark, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FormField({ label, type, value, onChange, placeholder }: {
  label: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: C.dark, marginBottom: "6px" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1px solid ${C.borderLight}`, fontSize: "14px", color: C.dark, backgroundColor: "#fff", boxSizing: "border-box", outline: "none" }}
      />
    </div>
  );
}
