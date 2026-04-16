"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { C } from "@/app/lib/tokens";
import { useCart } from "@/app/context/CartContext";
import { CartDrawer } from "@/app/components/CartDrawer";
import { AuthModal } from "@/app/components/AuthModal";
import { supabase } from "@/app/lib/supabase";

const LINKS = [
  { href: "/produtos",      label: "Loja",          b2b: false },
  { href: "/b2b",           label: "B2B",           b2b: true  },
  { href: "/materiais",     label: "Materiais",     b2b: false },
  { href: "/impressoras",   label: "Impressoras",   b2b: false },
  { href: "/farm",          label: "Farm",          b2b: false },
  { href: "/personalizado", label: "Personalizado", b2b: false },
  { href: "/sobre",         label: "Sobre Nós",     b2b: false },
  { href: "/blog",          label: "Blog",          b2b: false },
];

/* Accept (and ignore) legacy cartCount prop so existing callers don't break */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Navbar({ cartCount: _legacy }: { cartCount?: number } = {}) {
  const pathname    = usePathname();
  const { itemCount } = useCart();

  const [cartOpen, setCartOpen]     = useState(false);
  const [authOpen, setAuthOpen]     = useState(false);
  const [user, setUser]             = useState<User | null>(null);
  const [dropOpen, setDropOpen]     = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  /* Supabase auth state */
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setDropOpen(false);
  };

  const initial =
    user?.user_metadata?.name?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <>
      <nav style={{
        backgroundColor: "#fff",
        borderBottom: `1px solid ${C.borderLight}`,
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo-fixxe.svg" alt="Fixxe" width={120} height={45} priority />
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: "32px" }}>
          {LINKS.map(({ href, label, b2b }) => {
            const active = pathname === href;
            if (b2b) {
              return (
                <Link
                  key={href}
                  href={href}
                  className="nav-link"
                  style={{
                    color: active ? C.orange : C.orange,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 700,
                    borderBottom: active ? `2px solid ${C.orange}` : "2px solid transparent",
                    paddingBottom: "2px",
                    opacity: active ? 1 : 0.85,
                  }}
                >
                  {label}
                </Link>
              );
            }
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
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Search */}
          <button style={{ background: "none", border: "none", cursor: "pointer", color: C.darkMuted, display: "flex", alignItems: "center", padding: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* User / Autenticação */}
          {user ? (
            <div ref={dropRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropOpen(d => !d)}
                style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: C.orange, color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {initial}
              </button>
              {dropOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  backgroundColor: "#fff", border: `1px solid ${C.borderLight}`,
                  borderRadius: "10px", padding: "6px", minWidth: "170px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 200,
                }}>
                  {[
                    { label: "A minha conta", href: "/conta" },
                    { label: "Os meus pedidos", href: "/pedidos" },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href} onClick={() => setDropOpen(false)} style={{ display: "block", padding: "9px 14px", fontSize: "13px", color: C.dark, textDecoration: "none", borderRadius: "6px", fontWeight: 500 }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.bgLight)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {label}
                    </Link>
                  ))}
                  <div style={{ borderTop: `1px solid ${C.borderLight}`, margin: "4px 0" }} />
                  <button
                    onClick={signOut}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", fontSize: "13px", color: "#e05555", background: "none", border: "none", cursor: "pointer", borderRadius: "6px", fontWeight: 500 }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fdecea")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.darkMuted, display: "flex", alignItems: "center", padding: "4px" }}
              title="Entrar / Criar conta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          )}

          {/* Carrinho */}
          <button
            onClick={() => setCartOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.darkMuted, display: "flex", alignItems: "center", padding: "4px", position: "relative" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span style={{
                position: "absolute", top: "-4px", right: "-4px",
                backgroundColor: C.orange, color: "#fff",
                borderRadius: "50%", width: "17px", height: "17px",
                fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, lineHeight: 1,
              }}>
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Começar (só quando não autenticado) */}
          {!user && (
            <button
              onClick={() => setAuthOpen(true)}
              className="btn-primary"
              style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
            >
              Começar →
            </button>
          )}
        </div>
      </nav>

      {/* Drawers — fixed position, não afetados pelo DOM position */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal  open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
// Mon Apr 13 11:57:53 WEST 2026
