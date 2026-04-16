"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Navbar as SharedNavbar } from "@/app/components/Navbar";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:          "#1f1b18",
  bgCard:      "#2a2521",
  bgLight:     "#f5f4f2",
  bgWhite:     "#ffffff",
  orange:      "#ff6a00",
  cream:       "#f5f4f2",
  creamMuted:  "#c9c7c4",
  dark:        "#1f1b18",
  darkMuted:   "#4a4540",
  border:      "#3a342e",
  borderLight: "#e8e5e1",
};

// ── Shared reveal hook ────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.10 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ── Announcement bar ──────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  "🚚 Portes GRÁTIS acima de 50€ para Portugal Continental",
  "🖨️ Impressão 3D de alta qualidade — entrega em 3–5 dias úteis",
  "✏️ Personalização total — do ficheiro ao produto final",
];

function AnnouncementBar() {
  const [idx, setIdx]     = useState(0);
  const [key, setKey]     = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % ANNOUNCEMENTS.length);
      setKey(k => k + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: C.orange, color: "#fff", textAlign: "center", padding: "10px 16px", overflow: "hidden", height: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span key={key} className="announce-animate" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}>
        {ANNOUNCEMENTS[idx]}
      </span>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  return <SharedNavbar />;
}

// ── Hero Slideshow ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    badge:    "Decoração & Arte",
    title:    (<>Objectos que contam<br /><span style={{ color: C.orange }}>a tua história.</span></>),
    subtitle: "Vasos, esculturas e peças decorativas impressas em 3D com materiais premium. Design exclusivo, acabamento perfeito.",
    cta:      "Ver Decoração",
    cta2:     "Como funciona",
  },
  {
    badge:    "Prototipagem Industrial",
    title:    (<>Da ideia ao<br /><span style={{ color: C.orange }}>protótipo real.</span></>),
    subtitle: "Transformamos ficheiros CAD em protótipos funcionais com tolerâncias de 0,05mm. Rápido, preciso e sem desperdício.",
    cta:      "Pedir Protótipo",
    cta2:     "Ver Materiais",
  },
  {
    badge:    "Personalizado sob medida",
    title:    (<>O teu design,<br /><span style={{ color: C.orange }}>a nossa precisão.</span></>),
    subtitle: "Envia o teu modelo 3D ou descreve a tua ideia. Produzimos exatamente o que precisas, entregue em Cascais e toda a Grande Lisboa.",
    cta:      "Pedir Orçamento",
    cta2:     "Ver Exemplos",
  },
];

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => { setActive(i); setAnimKey(k => k + 1); }, []);
  const next  = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);
  const prev  = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo]);

  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);

  const s = SLIDES[active];

  return (
    <section style={{ backgroundColor: C.bg, position: "relative", overflow: "hidden" }}>
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(#ff6a00 1px,transparent 1px),linear-gradient(90deg,#ff6a00 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div className="hero-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 40px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", minHeight: "560px" }}>

        {/* Left */}
        <div key={animKey}>
          <div className="animate-slide-in-left" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: `${C.orange}22`, border: `1px solid ${C.orange}44`, borderRadius: "100px", padding: "6px 14px", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.orange, display: "inline-block" }} />
            <span style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase" }}>{s.badge}</span>
          </div>

          <h1 className="animate-slide-up" style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: C.cream, margin: "0 0 22px" }}>
            {s.title}
          </h1>
          <p className="animate-slide-up-delay" style={{ fontSize: "16px", color: C.creamMuted, lineHeight: 1.75, margin: "0 0 36px", maxWidth: "460px" }}>
            {s.subtitle}
          </p>

          <div className="animate-slide-up-delay2 hero-btns" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "13px 26px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              {s.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-outline" style={{ backgroundColor: "transparent", color: C.cream, border: `1.5px solid ${C.border}`, padding: "13px 26px", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
              {s.cta2}
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: "flex", gap: "32px", marginTop: "44px", paddingTop: "32px", borderTop: `1px solid ${C.border}` }}>
            {[{ v: "3.200+", l: "Peças entregues" }, { v: "98%", l: "Satisfação" }, { v: "3–5 dias", l: "Entrega" }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: "22px", fontWeight: 800, color: C.orange }}>{s.v}</div>
                <div style={{ fontSize: "12px", color: C.creamMuted, marginTop: "2px" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — placeholder */}
        <div key={`img-${animKey}`} className="animate-fade-in hero-img-col" style={{ position: "relative" }}>
          <div style={{ backgroundColor: "#2a2521", borderRadius: "20px", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}`, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: "20px", right: "20px", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: `${C.orange}12`, border: `1px solid ${C.orange}25` }} />
            <div style={{ position: "absolute", bottom: "50px", left: "24px", width: "44px", height: "44px", borderRadius: "50%", backgroundColor: `${C.orange}08` }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "110px", height: "110px", backgroundColor: `${C.orange}18`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", border: `2px solid ${C.orange}35` }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <p style={{ color: C.creamMuted, fontSize: "13px", margin: 0 }}>{s.badge}</p>
              <p style={{ color: "#4a4540", fontSize: "11px", marginTop: "4px" }}>Imagem disponível em breve</p>
            </div>
          </div>
          {/* Floating badge */}
          <div style={{ position: "absolute", bottom: "28px", right: "-18px", backgroundColor: "#2a2521", border: `1px solid ${C.border}`, borderRadius: "12px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
            <div style={{ width: "32px", height: "32px", backgroundColor: `${C.orange}20`, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: C.creamMuted }}>Certificado</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: C.cream }}>PLA+ Premium</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      {[{ dir: "prev", fn: prev, icon: "M15 18l-6-6 6-6", side: "left" as const }, { dir: "next", fn: next, icon: "M9 18l6-6-6-6", side: "right" as const }].map(({ dir, fn, icon, side }) => (
        <button key={dir} onClick={fn} aria-label={dir} className="hero-arrow" style={{ position: "absolute", [side]: "20px", top: "50%", transform: "translateY(-50%)", backgroundColor: `${C.bgCard}cc`, border: `1px solid ${C.border}`, borderRadius: "50%", width: "44px", height: "44px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.cream, backdropFilter: "blur(8px)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d={icon}/></svg>
        </button>
      ))}

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", paddingBottom: "32px" }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`slide-dot ${i === active ? "active" : ""}`} style={{ width: i === active ? "28px" : "8px", height: "8px", borderRadius: "100px", border: "none", backgroundColor: i === active ? C.orange : "#4a4540", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

// ── Categories ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: "Decoração & Arte",  sub: "Vasos, esculturas, molduras",   accent: "#ff6a00" },
  { name: "Organização",       sub: "Caixas, suportes, organizadores", accent: "#5ba3d9" },
  { name: "Ferramentas",       sub: "Peças técnicas, jigs, fixações",  accent: "#6dbe6d" },
  { name: "Personalizado",     sub: "Do teu ficheiro ao produto",      accent: "#b06dd9" },
];

function CategoryCard({ cat, delay }: { cat: typeof CATEGORIES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal category-card" style={{ borderRadius: "16px", overflow: "hidden", height: "280px", position: "relative", cursor: "pointer", transitionDelay: `${delay}ms` }}>
      {/* Placeholder bg */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#252118" }} />
      {/* Accent glow */}
      <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", backgroundColor: cat.accent + "18" }} />
      <div style={{ position: "absolute", top: "24px", left: "24px", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: cat.accent + "22", border: `1px solid ${cat.accent}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={cat.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      {/* Overlay */}
      <div className="cat-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)", opacity: 0.9, transition: "opacity 0.3s" }} />
      {/* Text */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
        <p style={{ fontSize: "12px", color: cat.accent, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>{cat.sub}</p>
        <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.01em" }}>{cat.name}</h3>
        <button className="cat-btn" style={{ backgroundColor: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "8px", padding: "7px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.25s" }}>
          Explorar →
        </button>
      </div>
    </div>
  );
}

function CategoriesSection() {
  const headRef = useReveal();
  return (
    <section style={{ padding: "80px 40px", backgroundColor: C.bgLight }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={headRef} className="reveal sec-head-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Categorias</p>
            <h2 style={{ fontSize: "36px", fontWeight: 800, color: C.dark, margin: 0, letterSpacing: "-0.02em" }}>O que queres criar?</h2>
          </div>
          <a href="#" style={{ color: C.orange, textDecoration: "none", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            Ver todas as categorias <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="g-1-mob" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {CATEGORIES.map((cat, i) => <CategoryCard key={cat.name} cat={cat} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "Vaso Geométrico Minimalista",    price: "24,90", material: "PLA",    mc: "#6dbe6d", desc: "Acabamento mate premium, 18 cm de altura" },
  { name: "Organizador de Secretária",      price: "38,50", material: "PETG",   mc: "#5ba3d9", desc: "Resistente ao calor, várias configurações" },
  { name: "Suporte de Telemóvel Universal", price: "14,90", material: "ABS",    mc: "#d9875b", desc: "Alta resistência, ângulo ajustável" },
  { name: "Figura Decorativa — Dragão",     price: "54,00", material: "Resina", mc: "#b06dd9", desc: "Detalhes ultra finos, edição limitada" },
];

function ProductCard({ p, delay }: { p: typeof PRODUCTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal product-card" style={{ backgroundColor: C.bgWhite, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", transitionDelay: `${delay}ms` }}>
      <div style={{ backgroundColor: "#f0eeeb", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
        <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: p.mc + "20", border: `1px solid ${p.mc}50`, color: p.mc, borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em" }}>
          {p.material}
        </div>
      </div>
      <div style={{ padding: "18px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: C.dark, margin: "0 0 6px", lineHeight: 1.3 }}>{p.name}</h3>
        <p style={{ fontSize: "13px", color: C.darkMuted, margin: "0 0 16px", lineHeight: 1.5 }}>{p.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "20px", fontWeight: 800, color: C.dark }}>{p.price}<span style={{ fontSize: "13px", fontWeight: 500, color: C.darkMuted }}> €</span></span>
          <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductsSection() {
  const headRef = useReveal();
  return (
    <section style={{ padding: "80px 40px", backgroundColor: C.bgWhite }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={headRef} className="reveal sec-head-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Destaques</p>
            <h2 style={{ fontSize: "36px", fontWeight: 800, color: C.dark, margin: 0, letterSpacing: "-0.02em" }}>Os nossos favoritos</h2>
          </div>
          <a href="#" style={{ color: C.orange, textDecoration: "none", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            Ver catálogo completo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
        <div className="g-1-mob" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.name} p={p} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

// ── Materials ─────────────────────────────────────────────────────────────────
const MATERIALS = [
  {
    name: "PLA",
    full: "Polylactic Acid",
    color: "#6dbe6d",
    desc: "Material biodegradável ideal para decoração e protótipos. Excelente acabamento superficial e variedade de cores.",
    tags: ["Biodegradável", "Fácil de imprimir", "Alta precisão"],
  },
  {
    name: "PETG",
    full: "Polyethylene Terephthalate Glycol",
    color: "#5ba3d9",
    desc: "Resistente ao calor e à humidade. Indicado para peças de uso alimentar (food-safe) e ambientes exigentes.",
    tags: ["Food-safe", "Resistente ao calor", "Durável"],
  },
  {
    name: "ABS",
    full: "Acrylonitrile Butadiene Styrene",
    color: "#d9875b",
    desc: "Material de engenharia com alta resistência mecânica e ao impacto. Perfeito para peças funcionais e técnicas.",
    tags: ["Alta resistência", "Maquinável", "Peças técnicas"],
  },
  {
    name: "Resina",
    full: "Photopolymer Resin",
    color: "#b06dd9",
    desc: "Detalhes ultra finos com resolução de 0,025mm. Ideal para joalharia, miniaturas e peças com geometrias complexas.",
    tags: ["Ultra detalhado", "0,025 mm", "Acabamento liso"],
  },
];

function MaterialsSection() {
  const headRef = useReveal();
  return (
    <section style={{ padding: "88px 40px", backgroundColor: C.bg }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={headRef} className="reveal" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>Materiais</p>
          <h2 style={{ fontSize: "38px", fontWeight: 800, color: C.cream, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Trabalhamos com os <span style={{ color: C.orange }}>melhores materiais</span>
          </h2>
          <p style={{ fontSize: "16px", color: C.creamMuted, maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}>
            Cada material foi escolhido para garantir o melhor resultado no teu projeto.
          </p>
        </div>

        <div className="g-1-mob" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {MATERIALS.map((m, i) => <MaterialCard key={m.name} m={m} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}

function MaterialCard({ m, delay }: { m: typeof MATERIALS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal material-card" style={{ backgroundColor: C.bgCard, borderRadius: "16px", padding: "28px 24px", border: `1px solid ${C.border}`, transitionDelay: `${delay}ms`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: m.color + "10" }} />
      {/* Badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: m.color }} />
        <span style={{ fontSize: "22px", fontWeight: 800, color: C.cream }}>{m.name}</span>
      </div>
      <p style={{ fontSize: "11px", color: m.color, margin: "0 0 12px", fontWeight: 600, letterSpacing: "0.04em" }}>{m.full}</p>
      <p style={{ fontSize: "13px", color: C.creamMuted, lineHeight: 1.65, margin: "0 0 18px" }}>{m.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {m.tags.map(t => (
          <span key={t} style={{ backgroundColor: m.color + "18", border: `1px solid ${m.color}35`, color: m.color, borderRadius: "100px", padding: "3px 10px", fontSize: "11px", fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  const ref = useReveal();
  return (
    <section style={{ padding: "0 40px 0", backgroundColor: C.bgLight }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} className="reveal cta-flex" style={{ backgroundColor: C.orange, borderRadius: "20px", padding: "64px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px", position: "relative", overflow: "hidden" }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "240px", height: "240px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", right: "80px", bottom: "-80px", width: "180px", height: "180px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", margin: "0 0 12px" }}>
              Orçamento gratuito
            </p>
            <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Tens um projeto em mente?
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.82)", margin: 0, lineHeight: 1.6 }}>
              Envia-nos o teu modelo 3D ou descreve a tua ideia.<br />Respondemos em menos de 24 horas, sem compromisso.
            </p>
          </div>
          <button className="btn-dark" style={{ backgroundColor: C.dark, color: "#fff", border: "none", padding: "16px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "16px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
            Pedir orçamento gratuito →
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name:   "Ana Rodrigues",
    city:   "Cascais",
    stars:  5,
    text:   "Encomendei um conjunto de vasos para a minha sala e fiquei absolutamente rendida. A qualidade do acabamento é impressionante e chegou em 4 dias. Já recomendei a vários amigos.",
    item:   "Vasos Geométricos em PLA",
  },
  {
    name:   "Miguel Ferreira",
    city:   "Sintra",
    stars:  5,
    text:   "Precisava de protótipos para uma apresentação e a Fixxe foi a solução perfeita. Entrega rápida, material resistente e um apoio ao cliente excecional. Voltarei certamente.",
    item:   "Protótipos industriais em PETG",
  },
  {
    name:   "Catarina Sousa",
    city:   "Lisboa",
    stars:  5,
    text:   "Pedi uma peça personalizada com o logótipo da minha empresa para oferecer a clientes. O resultado superou as expectativas — detalhes perfeitos e entregue a tempo.",
    item:   "Peças personalizadas em Resina",
  },
];

function TestimonialsSection() {
  const headRef = useReveal();
  return (
    <section style={{ padding: "88px 40px", backgroundColor: C.bgWhite }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={headRef} className="reveal" style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>O que dizem os clientes</p>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: C.dark, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Feito com <span style={{ color: C.orange }}>satisfação garantida</span>
          </h2>
          <p style={{ fontSize: "16px", color: C.darkMuted, maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            Clientes de Cascais, Lisboa e arredores confiam na Fixxe para os seus projetos.
          </p>
        </div>

        <div className="g-1-mob" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} t={t} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, delay }: { t: typeof TESTIMONIALS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal testimonial-card" style={{ backgroundColor: C.bgLight, borderRadius: "16px", padding: "28px", border: `1px solid ${C.borderLight}`, transitionDelay: `${delay}ms`, display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Stars */}
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={C.orange} stroke={C.orange} strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      {/* Quote */}
      <p style={{ fontSize: "14px", color: C.darkMuted, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
        &ldquo;{t.text}&rdquo;
      </p>
      {/* Item */}
      <div style={{ backgroundColor: `${C.orange}12`, border: `1px solid ${C.orange}25`, borderRadius: "6px", padding: "5px 10px", display: "inline-block" }}>
        <span style={{ fontSize: "11px", color: C.orange, fontWeight: 600 }}>{t.item}</span>
      </div>
      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "4px", borderTop: `1px solid ${C.borderLight}` }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: C.orange + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "15px", fontWeight: 800, color: C.orange }}>{t.name[0]}</span>
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: C.dark }}>{t.name}</div>
          <div style={{ fontSize: "12px", color: C.darkMuted }}>📍 {t.city}</div>
        </div>
      </div>
    </div>
  );
}

// ── Why Fixxe ─────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Impressão de Alta Resolução",
    desc:  "Impressoras de última geração com precisão até 0,05 mm — detalhes perfeitos em cada camada.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Entrega Rápida em Cascais e Lisboa",
    desc:  "Produção e envio em 3 a 5 dias úteis para toda a Grande Lisboa. Portes grátis acima de 50€.",
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Materiais Certificados",
    desc:  "PLA biodegradável, PETG food-safe, ABS de engenharia e resina fotopolimérica — todos certificados.",
  },
];

function WhyFixxeSection() {
  const headRef = useReveal();
  const ctaRef  = useReveal();
  return (
    <section style={{ padding: "88px 40px", backgroundColor: C.bgLight }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div ref={headRef} className="reveal" style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>As nossas vantagens</p>
          <h2 style={{ fontSize: "38px", fontWeight: 800, color: C.dark, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Porquê a <span style={{ color: C.orange }}>Fixxe?</span>
          </h2>
          <p style={{ fontSize: "16px", color: C.darkMuted, maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }}>
            Uma marca de Cascais obcecada com qualidade, precisão e experiência do cliente.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
          {PILLARS.map((p, i) => <PillarCard key={i} p={p} delay={i * 100} />)}
        </div>

        {/* Inner CTA */}
        <div ref={ctaRef} className="reveal inner-cta" style={{ marginTop: "52px", backgroundColor: C.dark, borderRadius: "20px", padding: "44px 52px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "-60px", top: "50%", transform: "translateY(-50%)", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: `${C.orange}07`, pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: C.cream, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
              Tens uma ideia? Vamos criá-la juntos.
            </h3>
            <p style={{ fontSize: "15px", color: C.creamMuted, margin: 0 }}>
              Envia-nos o teu modelo 3D ou descreve o que precisas. Orçamento em 24h.
            </p>
          </div>
          <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "13px 26px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
            Pedir Orçamento Grátis
          </button>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ p, delay }: { p: typeof PILLARS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ backgroundColor: C.bgWhite, borderRadius: "20px", padding: "36px 28px", border: `1px solid ${C.borderLight}`, transitionDelay: `${delay}ms` }}>
      <div style={{ width: "60px", height: "60px", backgroundColor: `${C.orange}12`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", border: `1px solid ${C.orange}22` }}>
        {p.icon}
      </div>
      <h3 style={{ fontSize: "17px", fontWeight: 700, color: C.dark, margin: "0 0 10px" }}>{p.title}</h3>
      <p style={{ fontSize: "14px", color: C.darkMuted, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
    </div>
  );
}

// ── Blog ──────────────────────────────────────────────────────────────────────
const POSTS = [
  {
    cat:   "Materiais",
    title: "PLA vs PETG: qual o material certo para o teu projeto?",
    date:  "8 Abril 2025",
    desc:  "Compara as propriedades de cada material e descobre qual é o mais adequado para a tua próxima impressão.",
    color: "#6dbe6d",
  },
  {
    cat:   "Tutorial",
    title: "Como preparar o teu ficheiro STL para impressão 3D",
    date:  "2 Abril 2025",
    desc:  "Um guia passo a passo para exportar e otimizar ficheiros 3D antes de enviares para produção.",
    color: "#5ba3d9",
  },
  {
    cat:   "Inspiração",
    title: "5 ideias de presentes personalizados em impressão 3D",
    date:  "28 Março 2025",
    desc:  "Da decoração à tecnologia, descobre como a impressão 3D pode tornar os teus presentes verdadeiramente únicos.",
    color: "#ff6a00",
  },
];

function BlogSection() {
  const headRef = useReveal();
  return (
    <section style={{ padding: "88px 40px", backgroundColor: C.bgWhite }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={headRef} className="reveal sec-head-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "44px" }}>
          <div>
            <p style={{ fontSize: "11px", color: C.orange, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Blog & Novidades</p>
            <h2 style={{ fontSize: "36px", fontWeight: 800, color: C.dark, margin: 0, letterSpacing: "-0.02em" }}>Do nosso estúdio para ti</h2>
          </div>
          <a href="#" style={{ color: C.orange, textDecoration: "none", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            Ver todos os artigos <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="g-1-mob" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {POSTS.map((post, i) => <BlogCard key={post.title} post={post} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, delay }: { post: typeof POSTS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal blog-card" style={{ backgroundColor: C.bgLight, borderRadius: "16px", overflow: "hidden", border: `1px solid ${C.borderLight}`, transitionDelay: `${delay}ms` }}>
      {/* Image placeholder */}
      <div style={{ height: "180px", backgroundColor: "#eae8e4", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
        </svg>
        <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: post.color + "22", border: `1px solid ${post.color}44`, color: post.color, borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: 700 }}>
          {post.cat}
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "22px" }}>
        <p style={{ fontSize: "11px", color: C.darkMuted, margin: "0 0 8px" }}>{post.date}</p>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: C.dark, margin: "0 0 10px", lineHeight: 1.35 }}>{post.title}</h3>
        <p style={{ fontSize: "13px", color: C.darkMuted, lineHeight: 1.6, margin: "0 0 16px" }}>{post.desc}</p>
        <a href="#" style={{ color: C.orange, textDecoration: "none", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
          Ler artigo <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ backgroundColor: C.dark, borderTop: `1px solid ${C.border}`, padding: "60px 40px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          {/* Brand */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: "16px" }}>
              <a href="/" style={{ textDecoration: "none", display: "inline-block" }}>
                <Image src="/logo-fixxe.svg" alt="Fixxe" width={75} height={28} style={{ filter: "brightness(0) invert(1)" }} />
              </a>
            </div>
            <p style={{ fontSize: "14px", color: C.creamMuted, lineHeight: 1.7, margin: "0 0 20px", maxWidth: "260px" }}>
              Impressão 3D de alta qualidade, feita em Cascais, para quem valoriza o detalhe.
            </p>
            <p style={{ fontSize: "13px", color: "#6b6560", margin: "0 0 8px" }}>📍 Cascais, Lisboa</p>
            <p style={{ fontSize: "13px", color: "#6b6560", margin: "0 0 8px" }}>✉️ geral@fixxe.pt</p>
            <p style={{ fontSize: "13px", color: "#6b6560", margin: 0 }}>📞 +351 912 345 678</p>
          </div>

          {[
            { title: "Loja",    links: ["Todos os produtos", "PLA & PLA+", "PETG", "ABS & ASA", "Resina", "Promoções"] },
            { title: "Empresa", links: ["Sobre a Fixxe", "Como funciona", "Sustentabilidade", "Blog", "Contacto"] },
            { title: "Suporte", links: ["FAQ", "Envios & Devoluções", "Termos e Condições", "Política de Privacidade"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: "12px", fontWeight: 700, color: C.cream, margin: "0 0 16px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ color: C.creamMuted, textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.orange)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.creamMuted)}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-btm-row" style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "13px", color: "#6b6560", margin: 0 }}>© 2025 Fixxe — Cascais, Lisboa. Todos os direitos reservados.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Instagram", "TikTok", "LinkedIn"].map(s => (
              <a key={s} href="#" style={{ fontSize: "13px", color: "#6b6560", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.orange)}
                onMouseLeave={e => (e.currentTarget.style.color = "#6b6560")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ backgroundColor: C.bgLight, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <AnnouncementBar />
      <Navbar />
      <HeroSlideshow />
      <CategoriesSection />
      <ProductsSection />
      <MaterialsSection />
      <div style={{ paddingTop: "80px", paddingBottom: "80px", backgroundColor: C.bgLight }}>
        <CTABanner />
      </div>
      <TestimonialsSection />
      <WhyFixxeSection />
      <BlogSection />
      <Footer />
    </div>
  );
}
