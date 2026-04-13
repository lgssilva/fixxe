"use client";

import { useState, useEffect, useRef } from "react";
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
  { inicial: "L", nome: "Luís Gomes",  cargo: "Fundador & CEO",        bio: "Engenheiro apaixonado por tecnologia 3D desde 2018. Lidera a visão e estratégia da Fixxe." },
  { inicial: "S", nome: "Sara Pinto",  cargo: "Designer de Produto",   bio: "Transforma ideias em modelos 3D precisos. Especializada em design paramétrico e prototipagem rápida." },
  { inicial: "R", nome: "Rui Faria",   cargo: "Técnico de Impressão",  bio: "Garante a qualidade em cada impressão. Mais de 6 anos a operar impressoras FDM e SLA profissionais." },
];

const NUMEROS = [
  { target: 2400, suffix: "+", label: "Peças entregues" },
  { target: 98,   suffix: "%", label: "Taxa de satisfação" },
  { target: 5,    suffix: "",  label: "Anos de experiência" },
  { target: 4,    suffix: "",  label: "Materiais premium" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        io.disconnect();
        const duration = 1400;
        const startTime = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString("pt-PT")}{suffix}</span>;
}

export default function SobrePage() {
  const heroRef    = useReveal();
  const missaoRef  = useReveal();
  const valoresRef = useReveal();
  const equipaRef  = useReveal();
  const ctaRef     = useReveal();

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: CREAM, minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ backgroundColor: DARK, padding: "80px 40px", textAlign: "center" }}>
          <div ref={heroRef} className="reveal" style={{ maxWidth: "700px", margin: "0 auto" }}>
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
          <div ref={missaoRef} className="reveal" style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
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
          <div ref={valoresRef} className="reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>O que nos define</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: 0 }}>Os nossos valores</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {VALORES.map(({ icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px", border: `1px solid ${BORDER}`, transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease", cursor: "default" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(238,146,77,0.6)`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(238,146,77,0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "20px", transition: "background-color 0.25s ease" }}>
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
          <div ref={equipaRef} className="reveal" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>As pessoas por trás da Fixxe</p>
              <h2 style={{ fontSize: "32px", fontWeight: 800, color: DARK, margin: 0 }}>A nossa equipa</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}>
              {EQUIPA.map(({ inicial, nome, cargo, bio }, i) => (
                <div
                  key={nome}
                  className={`reveal reveal-delay-${i + 1}`}
                  style={{ textAlign: "center", padding: "32px 24px", backgroundColor: CREAM, borderRadius: "16px", border: `1px solid ${BORDER}`, transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03) translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.10)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
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
            {NUMEROS.map(({ target, suffix, label }) => (
              <div key={label}>
                <p style={{ fontSize: "44px", fontWeight: 900, color: O, margin: "0 0 6px", lineHeight: 1 }}>
                  <AnimatedCounter target={target} suffix={suffix} />
                </p>
                <p style={{ fontSize: "14px", color: "#c9c7c4", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "72px 40px", backgroundColor: O, textAlign: "center" }}>
          <div ref={ctaRef} className="reveal" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", margin: "0 0 16px" }}>Tens um projeto? Fala connosco.</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", margin: "0 0 32px", lineHeight: 1.6 }}>
              Seja uma peça decorativa, um protótipo industrial ou uma encomenda personalizada, estamos aqui para ajudar.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <Link href="/contacto" style={{ textDecoration: "none" }}>
                <button style={{ backgroundColor: DARK, color: "#fff", border: "none", padding: "13px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", cursor: "pointer", transition: "transform 0.15s, background-color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2a2521"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = DARK; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
                >
                  Contactar →
                </button>
              </Link>
              <Link href="/personalizado" style={{ textDecoration: "none" }}>
                <button style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)", padding: "13px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer", transition: "background-color 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
                >
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
