"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const C = {
  sidebar:   "#1f1b18",
  sidebarHover: "#2a2521",
  orange:    "#ff6a00",
  cream:     "#f5f4f2",
  creamMuted:"#c9c7c4",
  content:   "#f5f4f2",
  border:    "#3a342e",
};

const NAV = [
  { href: "/admin",            label: "Dashboard",  icon: "▦" },
  { href: "/admin/produtos",   label: "Produtos",   icon: "⬡" },
  { href: "/admin/pedidos",    label: "Pedidos",    icon: "≡" },
  { href: "/admin/conteudo",   label: "Conteúdo",   icon: "✎" },
  { href: "/admin/marketing",  label: "Marketing",  icon: "◈" },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "220px", minWidth: "220px", height: "100vh",
      backgroundColor: C.sidebar, display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${C.border}` }}>
        <Link href="/admin" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src="/logo-fixxe.svg"
            alt="Fixxe"
            width={72}
            height={26}
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span style={{ fontSize: "10px", fontWeight: 700, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {NAV.map(({ href, label, icon }) => {
          const active = href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 14px", borderRadius: "8px", textDecoration: "none",
                backgroundColor: active ? "rgba(238,146,77,0.15)" : "transparent",
                color: active ? C.orange : C.creamMuted,
                fontSize: "14px", fontWeight: active ? 600 : 400,
                transition: "background-color 0.15s, color 0.15s",
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.sidebarHover;
                  (e.currentTarget as HTMLAnchorElement).style.color = C.cream;
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = C.creamMuted;
                }
              }}
            >
              <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{icon}</span>
              {label}
              {active && <span style={{ marginLeft: "auto", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: C.orange }} />}
            </Link>
          );
        })}

        <div style={{ borderTop: `1px solid ${C.border}`, margin: "8px 0" }} />

        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "8px", textDecoration: "none", color: C.creamMuted, fontSize: "14px" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.cream; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.creamMuted; }}
        >
          <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>↗</span>
          Ver loja
        </Link>
      </nav>

      {/* User */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", color: "#fff", flexShrink: 0 }}>A</div>
          <div>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: C.cream }}>Admin</p>
            <p style={{ margin: 0, fontSize: "11px", color: C.creamMuted }}>geral@fixxe3d.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "fixxe2025") { onLogin(); }
    else { setErr(true); setPw(""); }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.sidebar, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#2a2521", borderRadius: "16px", padding: "48px 40px", width: "360px", border: `1px solid ${C.border}` }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Image src="/logo-fixxe.svg" alt="Fixxe" width={90} height={33} style={{ filter: "brightness(0) invert(1)", marginBottom: "12px" }} />
          <p style={{ color: C.creamMuted, fontSize: "14px", margin: 0 }}>Painel de administração</p>
        </div>
        <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: C.creamMuted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Palavra-passe</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              placeholder="••••••••"
              autoFocus
              style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: `1px solid ${err ? "#e05555" : C.border}`, backgroundColor: C.sidebar, color: C.cream, fontSize: "14px", boxSizing: "border-box", outline: "none" }}
            />
            {err && <p style={{ color: "#e05555", fontSize: "12px", margin: "6px 0 0" }}>Palavra-passe incorrecta.</p>}
          </div>
          <button
            type="submit"
            style={{ backgroundColor: C.orange, color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
          >
            Entrar →
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#4a4540", margin: "20px 0 0" }}>Demo: fixxe2025</p>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "1");
  }, []);

  const login = () => {
    sessionStorage.setItem("admin_auth", "1");
    setAuthed(true);
  };

  if (authed === null) return null; // hydration guard
  if (!authed) return <LoginGate onLogin={login} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: C.content }}>
      <Sidebar />
      <main style={{ marginLeft: "220px", flex: 1, minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
