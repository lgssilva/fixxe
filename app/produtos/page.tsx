"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { C, MAT_COLOR, ALL_PRODUCTS } from "@/app/lib/tokens";
import type { Material, Category } from "@/app/lib/tokens";
import { useCart } from "@/app/context/CartContext";

const CATS: Category[] = ["Decoração & Arte", "Organização", "Ferramentas", "Personalizado"];
const MATS: Material[] = ["PLA", "PETG", "ABS", "Resina"];
const PAGE_SIZE = 9;

export default function ProdutosPage() {
  const { addToCart } = useCart();
  const [cats, setCats] = useState<Category[]>([]);
  const [mats, setMats] = useState<Material[]>([]);
  const [priceMax, setPriceMax] = useState(500);
  const [sort, setSort] = useState("relevancia");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const toggle = <T,>(arr: T[], val: T) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (cats.length && !cats.includes(p.category as Category)) return false;
    if (mats.length && !mats.includes(p.material as Material)) return false;
    if (p.price > priceMax) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "preco-asc") return a.price - b.price;
    if (sort === "preco-desc") return b.price - a.price;
    if (sort === "nome") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (nearBottom) {
      setLoading(true);
      setTimeout(() => {
        setPage((p) => p + 1);
        setLoading(false);
      }, 800);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => { setPage(1); }, [cats, mats, priceMax, sort]);

  return (
    <>
      <Navbar cartCount={0} />

      <main style={{ backgroundColor: C.bgLight, minHeight: "100vh" }}>
        {/* Breadcrumb */}
        <div style={{ backgroundColor: "#fff", borderBottom: `1px solid ${C.borderLight}`, padding: "12px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: C.darkMuted }}>
            <Link href="/" style={{ color: C.darkMuted, textDecoration: "none" }}>Início</Link>
            <span>›</span>
            <span style={{ color: C.dark, fontWeight: 500 }}>Produtos</span>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 40px", display: "flex", gap: "32px", alignItems: "flex-start" }}>
          {/* Sidebar */}
          <aside style={{ width: "240px", flexShrink: 0, backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${C.borderLight}`, padding: "24px", position: "sticky", top: "88px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.dark, margin: "0 0 20px" }}>Filtrar</h2>

            {/* Categorias */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: C.darkMuted, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px" }}>Categoria</h3>
              {CATS.map((cat) => (
                <label key={cat} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer", fontSize: "14px", color: C.dark }}>
                  <input
                    type="checkbox"
                    checked={cats.includes(cat)}
                    onChange={() => setCats(toggle(cats, cat))}
                    style={{ accentColor: C.orange, width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Materiais */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: C.darkMuted, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px" }}>Material</h3>
              {MATS.map((mat) => (
                <label key={mat} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer", fontSize: "14px", color: C.dark }}>
                  <input
                    type="checkbox"
                    checked={mats.includes(mat)}
                    onChange={() => setMats(toggle(mats, mat))}
                    style={{ accentColor: C.orange, width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: MAT_COLOR[mat], flexShrink: 0 }} />
                  {mat}
                </label>
              ))}
            </div>

            {/* Preço */}
            <div style={{ marginBottom: "28px" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: C.darkMuted, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px" }}>Preço máximo</h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: C.darkMuted, marginBottom: "8px" }}>
                <span>0 €</span>
                <span style={{ color: C.orange, fontWeight: 600 }}>{priceMax} €</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={5}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.orange, cursor: "pointer" }}
              />
            </div>

            <button
              onClick={() => { setCats([]); setMats([]); setPriceMax(500); }}
              style={{ width: "100%", backgroundColor: C.orange, color: "#fff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
              className="btn-primary"
            >
              Filtrar
            </button>
          </aside>

          {/* Main */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Barra de ordenação */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", color: C.darkMuted, margin: 0 }}>
                <strong style={{ color: C.dark }}>{filtered.length} produtos</strong> encontrados
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: "8px", border: `1px solid ${C.borderLight}`, fontSize: "13px", color: C.dark, backgroundColor: "#fff", cursor: "pointer" }}
              >
                <option value="relevancia">Relevância</option>
                <option value="preco-asc">Preço: menor → maior</option>
                <option value="preco-desc">Preço: maior → menor</option>
                <option value="nome">Nome A → Z</option>
              </select>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {visible.map((p) => (
                <Link key={p.id} href={`/produtos/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    className="product-card"
                    style={{ backgroundColor: "#fff", borderRadius: "12px", border: `1px solid ${C.borderLight}`, overflow: "hidden", cursor: "pointer" }}
                  >
                    {/* Imagem placeholder */}
                    <div style={{ height: "200px", backgroundColor: "#e8e5e1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c0bbb6" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: MAT_COLOR[p.material], color: "#fff", fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "20px", letterSpacing: "0.03em" }}>
                        {p.material}
                      </span>
                    </div>

                    <div style={{ padding: "16px" }}>
                      <h3 style={{ fontSize: "14px", fontWeight: 600, color: C.dark, margin: "0 0 8px", lineHeight: 1.35 }}>{p.name}</h3>
                      <p style={{ fontSize: "12px", color: C.darkMuted, margin: "0 0 12px", lineHeight: 1.5 }}>{p.category}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "18px", fontWeight: 700, color: C.dark }}>{p.price.toFixed(2)} €</span>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(p); }}
                          style={{ backgroundColor: C.orange, color: "#fff", border: "none", width: "36px", height: "36px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          className="btn-primary"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Loader */}
            {hasMore && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "40px 0 20px" }}>
                {loading ? (
                  <>
                    <div style={{ width: "32px", height: "32px", border: `3px solid ${C.borderLight}`, borderTopColor: C.orange, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    <p style={{ fontSize: "14px", color: C.darkMuted, margin: 0 }}>A carregar mais produtos...</p>
                  </>
                ) : (
                  <p style={{ fontSize: "13px", color: C.darkMuted, margin: 0 }}>Rola para ver mais</p>
                )}
              </div>
            )}

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: C.darkMuted }}>
                <p style={{ fontSize: "16px", margin: "0 0 8px" }}>Nenhum produto encontrado</p>
                <p style={{ fontSize: "13px" }}>Tenta ajustar os filtros</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </>
  );
}
