"use client";

import Image from "next/image";
import Link from "next/link";
import { C } from "@/app/lib/tokens";

export function Footer() {
  const cols = [
    { title: "Loja",    links: [["Todos os produtos", "/produtos"], ["PLA & PLA+", "/produtos?material=PLA"], ["PETG", "/produtos?material=PETG"], ["ABS & ASA", "/produtos?material=ABS"], ["Resina", "/produtos?material=Resina"], ["Promoções", "/produtos?promo=1"]] },
    { title: "Empresa", links: [["Sobre a Fixxe", "/sobre"], ["Como funciona", "/como-funciona"], ["Sustentabilidade", "/sustentabilidade"], ["Blog", "/blog"], ["Contacto", "/contacto"]] },
    { title: "Suporte", links: [["FAQ", "/faq"], ["Envios & Devoluções", "/envios"], ["Termos e Condições", "/termos"], ["Política de Privacidade", "/privacidade"]] },
  ];

  return (
    <footer style={{ backgroundColor: C.dark, borderTop: `1px solid ${C.border}`, padding: "60px 40px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          {/* Brand */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: "16px" }}>
              <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
                <Image src="/logo-fixxe.svg" alt="Fixxe" width={75} height={28} style={{ filter: "brightness(0) invert(1)" }} />
              </Link>
            </div>
            <p style={{ fontSize: "14px", color: C.creamMuted, lineHeight: 1.7, margin: "0 0 20px", maxWidth: "260px" }}>
              Impressão 3D de alta qualidade, feita em Cascais, para quem valoriza o detalhe.
            </p>
            <p style={{ fontSize: "13px", color: "#6b6560", margin: "0 0 6px" }}>📍 Cascais, Lisboa</p>
            <p style={{ fontSize: "13px", color: "#6b6560", margin: "0 0 6px" }}>✉️ geral@fixxe.pt</p>
            <p style={{ fontSize: "13px", color: "#6b6560", margin: 0 }}>📞 +351 912 345 678</p>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: "12px", fontWeight: 700, color: C.cream, margin: "0 0 16px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} style={{ color: C.creamMuted, textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.orange)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.creamMuted)}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-btm-row" style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "13px", color: "#6b6560", margin: 0 }}>© 2026 Fixxe — Cascais, Lisboa. Todos os direitos reservados.</p> <a href="https://nexoscreative.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
  <span style={{ fontSize: "12px", color: "#6b6560" }}>Desenvolvido por</span>
  <img src="/logo-nexos.svg" alt="Nexos Creative" height={20} style={{ opacity: 0.6 }} />
</a>
<a href="https://nexoscreative.com" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
  <span style={{ fontSize: "12px", color: "#6b6560" }}>Desenvolvido por</span>
  <img src="/logo-nexos.svg" alt="Nexos Creative" height={20} style={{ opacity: 0.6 }} />
</a>
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
