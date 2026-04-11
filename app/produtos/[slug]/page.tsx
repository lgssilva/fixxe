"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { C, MAT_COLOR, ALL_PRODUCTS } from "@/app/lib/tokens";

const PLACEHOLDER_IMGS = ["#e8e5e1", "#ddd9d4", "#e2ddd8", "#ede9e4"];

export default function ProdutoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const product = ALL_PRODUCTS.find((p) => p.slug === slug) ?? ALL_PRODUCTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const related = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const matColor = MAT_COLOR[product.material];

  return (
    <>
      <Navbar cartCount={1} />

      <main style={{ backgroundColor: C.bgLight, minHeight: "100vh" }}>
        {/* Breadcrumb */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${C.borderLight}`, padding: "12px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: C.darkMuted }}>
            <Link href="/" style={{ color: C.darkMuted, textDecoration: "none" }}>Início</Link>
            <span>›</span>
            <Link href="/produtos" style={{ color: C.darkMuted, textDecoration: "none" }}>Produtos</Link>
            <span>›</span>
            <span style={{ color: C.dark, fontWeight: 500 }}>{product.name}</span>
          </div>
        </div>

        {/* Produto */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "55% 45%", gap: "48px", alignItems: "start" }}>
            {/* Galeria */}
            <div>
              {/* Imagem principal */}
              <div style={{ height: "500px", backgroundColor: PLACEHOLDER_IMGS[activeImg], borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", border: `1px solid ${C.borderLight}` }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#b0aaa4" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: "12px" }}>
                {PLACEHOLDER_IMGS.map((bg, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      flex: 1,
                      height: "80px",
                      backgroundColor: bg,
                      borderRadius: "10px",
                      border: activeImg === i ? `2px solid ${C.orange}` : `2px solid ${C.borderLight}`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div style={{ paddingTop: "8px" }}>
              {/* Badge material */}
              <span style={{ display: "inline-block", backgroundColor: matColor, color: "#fff", fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", marginBottom: "16px", letterSpacing: "0.03em" }}>
                {product.material}
              </span>

              <h1 style={{ fontSize: "28px", fontWeight: 800, color: C.dark, margin: "0 0 16px", lineHeight: 1.25 }}>
                {product.name}
              </h1>

              <p style={{ fontSize: "36px", fontWeight: 800, color: C.orange, margin: "0 0 20px" }}>
                {product.price.toFixed(2)} €
              </p>

              <p style={{ fontSize: "15px", color: C.darkMuted, lineHeight: 1.7, margin: "0 0 28px" }}>
                {product.desc} Cada peça é produzida sob encomenda com os mais altos padrões de qualidade de impressão 3D.
              </p>

              {/* Quantidade */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.dark, minWidth: "80px" }}>Quantidade</span>
                <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.borderLight}`, borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{ width: "40px", height: "40px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", color: C.dark, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >−</button>
                  <span style={{ width: "48px", textAlign: "center", fontSize: "15px", fontWeight: 600, color: C.dark }}>{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{ width: "40px", height: "40px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", color: C.dark, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >+</button>
                </div>
              </div>

              {/* Botões */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
                  Adicionar ao carrinho
                </button>
                <button className="btn-dark" style={{ backgroundColor: C.dark, color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
                  Comprar agora
                </button>
              </div>

              {/* Detalhes */}
              <div style={{ backgroundColor: C.bgLight, borderRadius: "12px", padding: "20px", border: `1px solid ${C.borderLight}` }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: C.dark, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 14px" }}>Detalhes do produto</h3>
                {[
                  ["Material", product.material],
                  ["Dimensões", product.dimensions],
                  ["Peso", product.weight],
                  ["Acabamento", "Mate premium"],
                  ["Categoria", product.category],
                  ["Prazo de entrega", "3–5 dias úteis"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, fontSize: "14px" }}>
                    <span style={{ color: C.darkMuted }}>{label}</span>
                    <span style={{ color: C.dark, fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Produtos relacionados */}
          {related.length > 0 && (
            <section style={{ marginTop: "72px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: C.dark, margin: "0 0 24px" }}>Produtos relacionados</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                {related.map((p) => (
                  <Link key={p.id} href={`/produtos/${p.slug}`} style={{ textDecoration: "none" }}>
                    <div className="product-card" style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${C.borderLight}`, overflow: "hidden" }}>
                      <div style={{ height: "160px", backgroundColor: "#e8e5e1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1.2">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span style={{ position: "absolute", top: "8px", left: "8px", backgroundColor: MAT_COLOR[p.material], color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>
                          {p.material}
                        </span>
                      </div>
                      <div style={{ padding: "14px" }}>
                        <h3 style={{ fontSize: "13px", fontWeight: 600, color: C.dark, margin: "0 0 8px", lineHeight: 1.35 }}>{p.name}</h3>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: C.dark }}>{p.price.toFixed(2)} €</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
