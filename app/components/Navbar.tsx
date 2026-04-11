"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C } from "@/app/lib/tokens";

export function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();

  const links = [
    { href: "/produtos", label: "Loja" },
    { href: "/materiais", label: "Materiais" },
    { href: "/personalizado", label: "Personalizado" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav style={{ backgroundColor: "#fff", borderBottom: `1px solid ${C.borderLight}`, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <Image src="/logo-fixxe.svg" alt="Fixxe" width={86} height={32} priority />
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "32px" }}>
        {links.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="nav-link"
              style={{
                color: active ? C.dark : C.darkMuted,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: active ? 700 : 500,
                borderBottom: active ? `2px solid ${C.orange}` : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: C.darkMuted, display: "flex" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <Link href="/carrinho" style={{ color: C.darkMuted, textDecoration: "none", position: "relative", display: "flex" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: "-6px", right: "-6px", backgroundColor: C.orange, color: "#fff", borderRadius: "50%", width: "16px", height: "16px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              {cartCount}
            </span>
          )}
        </Link>
        <Link href="/checkout">
          <button className="btn-primary" style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            Começar →
          </button>
        </Link>
      </div>
    </nav>
  );
}
