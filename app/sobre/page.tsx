"use client";

import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const O = "#ee924d";
const DARK = "#1f1b18";
const MUTED = "#6b6560";
const CREAM = "#f5f4f2";
const BORDER = "#e8e5e1";

const VALORES = [
  { icon: "⬡", title: "Qualidade", desc: "Cada peça passa por controlo rigoroso. Usamos apenas filamentos certificados e mantemos tolerâncias de ±0.2 mm." },
  { icon: "◈", title: "Inovação",  desc: "Exploramos constantemente novos materiais, técnicas e geometrias para entregar soluções que ninguém mais consegue." },
  { icon: "♻", title: "Sustentabilidade", desc: "Priorizamos PLA reciclável, minimizamos desperdício e usamos embalagens 100% reutilizáveis ou recicláveis." },
];

const EQUIPA = [
  { inicial: "L", nome: "Luís Gomes",  cargo: "Fundador & CEO",           bio: "Engenheiro apaixonado por tecnologia 3D desde 2018. Lidera a visão e estratégia da Fixxe." },
  { inicial: "S", nome: "Sara Pinto",  cargo: "Designer de Produto",      bio: "Transforma ideias em modelos 3D precisos. Especializada em design paramétrico e prototipagem rápida." },
  { inicial: "R", nome: "Rui Faria",   cargo: "Técnico de Impressão",     bio: "Garante a qualidade em cada impressão. Mais de 6 anos a operar impressoras FDM e SLA profissionais." },
];

const NUMEROS = [
  { valor: "2.400+", label: "Peças entregues" },
  { valor: "98%",    label: "Taxa de satisfação" },
  { valor: "5 anos", label: "De experiência" },
  { valor: "4",      label: "Materiais premium" },
];

export default function SobrePage() {
  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ backgroundColor: DARK, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(238,146,77,0.15)", color: O, fontSize: "12px", fontWeight: 700, padding: "5px 14px", borderRadius: "20px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
              A nossa história
            </span>
            <h1 style={{ fontSize: "48px", fontWeight: 900, color: "#fff", margin: "0 0 20px", lineHeight: 1.15 }}>
              Feito com paixão<br /><span style={{ color: O }}>em Cascais</span>
            </h1>
            <p style={{ fontSize: "17px", color: "#c9c7c4", lineHeight: 1.75, margin: 0 }}>
              Nascemos em 2019 num pequeno atelier em Cascais com uma impressora, muita dedicação e um objetivo claro: criar peças de impressão 3D que as pessoas amem. Hoje entregamos para todo o país, mas a atenção ao detalhe continua a ser a nossa maior prioridade.
            </p>
          </div>
        </section>

        {/* Missão */}
        <section style={{ padding: "72px 40px", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>A nossa missão</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: "0 0 20px", lineHeight: 1.25 }}>
                Impressão 3D com qualidade industrial e acabamento artesanal
              </h2>
              <p style={{ fontSize: "16px", color: MUTED, lineHeight: 1.75, margin: "0 0 16px" }}>
                Criar produtos únicos através da impressão 3D com qualidade industrial e acabamento artesanal, em Cascais, Lisboa. Acreditamos que cada peça conta uma história — e queremos que a tua seja perfeita.
              </p>
              <p style={{ fontSize: "15px", color: MUTED, lineHeight: 1.75 }}>
                Trabalhamos com clientes particulares, arquitetos, designers, startups e indústria. Do ornamento decorativo ao protótipo funcional, a nossa resposta é sempre a mesma: <strong style={{ color: DARK }}>excelência sem compromissos</strong>.
              </p>
            </div>
            {/* Visual placeholder */}
            <div style={{ height: "360px", backgroundColor: "#e8e5e1", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🖨</div>
                <p style={{ fontSize: "13px", color: MUTED, margin: 0 }}>Atelier Fixxe, Cascais</p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section style={{ padding: "72px 40px", backgroundColor: CREAM }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>O que nos define</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: 0 }}>Os nossos valores</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {VALORES.map(({ icon, title, desc }) => (
                <div key={title} style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px", border: `1px solid ${BORDER}` }}>
                  <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(238,146,77,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "20px" }}>
                    {icon}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK, margin: "0 0 10px" }}>{title}</h3>
                  <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipa */}
        <section style={{ padding: "72px 40px", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>As pessoas por trás da Fixxe</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: 0 }}>A nossa equipa</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
              {EQUIPA.map(({ inicial, nome, cargo, bio }) => (
                <div key={nome} style={{ textAlign: "center", padding: "32px 24px", backgroundColor: CREAM, borderRadius: "16px", border: `1px solid ${BORDER}` }}>
                  {/* Foto circular placeholder */}
                  <div style={{ width: "88px", height: "88px", borderRadius: "50%", backgroundColor: DARK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "30px", fontWeight: 800, color: O }}>
                    {inicial}
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: DARK, margin: "0 0 4px" }}>{nome}</h3>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: O, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>{cargo}</p>
                  <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.65, margin: 0 }}>{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Números */}
        <section style={{ padding: "72px 40px", backgroundColor: DARK }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", textAlign: "center" }}>
            {NUMEROS.map(({ valor, label }) => (
              <div key={label}>
                <p style={{ fontSize: "44px", fontWeight: 900, color: O, margin: "0 0 6px", lineHeight: 1 }}>{valor}</p>
                <p style={{ fontSize: "14px", color: "#c9c7c4", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "72px 40px", backgroundColor: O, textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", margin: "0 0 16px" }}>Tens um projeto? Fala connosco.</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", margin: "0 0 32px", lineHeight: 1.6 }}>
              Seja uma peça decorativa, um protótipo industrial ou uma encomenda personalizada, estamos aqui para ajudar.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <Link href="/contacto" style={{ textDecoration: "none" }}>
                <button style={{ backgroundColor: DARK, color: "#fff", border: "none", padding: "13px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                  Contactar →
                </button>
              </Link>
              <Link href="/personalizado" style={{ textDecoration: "none" }}>
                <button style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", padding: "13px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
                  Pedir orçamento
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
