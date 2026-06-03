import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { getProjectBySlug } from "../../data/projects";

// ── Estética institucional · "Institucional Profundo" ─────────────
const SG_FONT = "'Inter', 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif";
const NAVY = "#0a1a2f";       // fondo principal
const NAVY_ALT = "#08172a";   // fondo alterno
const PANEL = "#0d2138";      // tarjetas
const ACCENT = "#2e6fb0";     // azul acero
const ACCENT_2 = "#5b9bd5";   // azul claro
const TEXT = "#eaf1f8";
const MUTED = "rgba(234,241,248,0.62)";
const FAINT = "rgba(234,241,248,0.40)";
const LINE = "rgba(234,241,248,0.10)";

const SigmaStyles = () => (
  <style>{`
    .sg { background:${NAVY}; color:${TEXT}; font-family:${SG_FONT}; -webkit-font-smoothing:antialiased; }
    .sg h1,.sg h2,.sg h3 { font-family:${SG_FONT}; margin:0; letter-spacing:-0.02em; }
    .sg-eyebrow { font-size:12px; letter-spacing:.24em; text-transform:uppercase; color:${ACCENT_2}; font-weight:700; }
    .sg-kicker { font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:${FAINT}; font-weight:600; }
    .sg-btn { display:inline-flex; align-items:center; gap:11px; font-family:${SG_FONT}; font-size:13px; font-weight:600;
      letter-spacing:.04em; padding:14px 26px; border-radius:6px; text-decoration:none; cursor:pointer;
      transition:background .25s, color .25s, border-color .25s, transform .25s; white-space:nowrap; }
    .sg-btn-fill { background:${ACCENT}; color:#fff; border:1px solid ${ACCENT}; }
    .sg-btn-fill:hover { background:${ACCENT_2}; border-color:${ACCENT_2}; }
    .sg-btn-line { background:transparent; color:${TEXT}; border:1px solid rgba(234,241,248,.28); }
    .sg-btn-line:hover { border-color:${ACCENT_2}; color:${ACCENT_2}; }
    .sg-btn svg { transition:transform .25s; }
    .sg-btn:hover svg { transform:translateX(4px); }
    .sg-card { background:${PANEL}; border:1px solid ${LINE}; border-radius:14px; transition:border-color .3s, transform .3s, box-shadow .3s; }
    .sg-card:hover { border-color:rgba(91,155,213,.45); transform:translateY(-4px); box-shadow:0 22px 50px rgba(0,0,0,.35); }
    .sg-mod { background:${PANEL}; border:1px solid ${LINE}; border-radius:12px; transition:border-color .3s, background .3s; }
    .sg-mod:hover { border-color:rgba(91,155,213,.5); background:#102a47; }
    .sg-flow-num { color:${ACCENT_2}; }
    @keyframes sg-ping { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.4);opacity:0} }
    .sg-dot::after { content:""; position:absolute; inset:0; border-radius:50%; background:${ACCENT_2}; animation:sg-ping 1.8s cubic-bezier(0,0,.2,1) infinite; }
    @keyframes sg-bob { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,8px)} }
    .sg-scroll { animation:sg-bob 2.4s ease-in-out infinite; }
  `}</style>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type BtnProps = { to?: string; href?: string; label: string; variant?: "fill" | "line"; arrow?: boolean };
const SgButton: React.FC<BtnProps> = ({ to, href, label, variant = "line", arrow = true }) => {
  const cls = `sg-btn ${variant === "fill" ? "sg-btn-fill" : "sg-btn-line"}`;
  const inner = <>{label}{arrow && <Arrow />}</>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} className={cls}>{inner}</a>;
};

// Fondo de cuadrícula institucional sutil
const GridBg: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => (
  <div style={{
    position: "absolute", inset: 0, opacity,
    backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
  }} />
);

// ── Iconos de línea para los 5 pilares ────────────────────────────
const ico = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IcoDigital = () => (<svg {...ico}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M7 8h6M7 11h4" /></svg>);
const IcoTrace = () => (<svg {...ico}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><circle cx="12" cy="12" r="3.2" /><path d="M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5" /></svg>);
const IcoEff = () => (<svg {...ico}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>);
const IcoTransp = () => (<svg {...ico}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>);
const IcoBrain = () => (<svg {...ico}><path d="M4 12a4 4 0 0 1 4-4M20 12a4 4 0 0 0-4-4M12 4v16M6 12a6 6 0 0 0 6 6 6 6 0 0 0 6-6" /><circle cx="12" cy="4" r="1.4" /></svg>);

const SigmaDetailPage: React.FC = () => {
  const project = getProjectBySlug("sigma");
  if (!project) return <Navigate to="/proyectos" replace />;
  const modules = project.modules ?? [];

  const eyebrow = (t: string) => <div className="sg-eyebrow" style={{ marginBottom: 18 }}>{t}</div>;

  // ── Contenido narrativo ─────────────────────────────────────────
  const pillars = [
    { icon: <IcoDigital />, n: "01", title: "Digitalización", desc: "Convierte trámites, expedientes y procesos físicos en flujos digitales controlados." },
    { icon: <IcoTrace />,   n: "02", title: "Trazabilidad",   desc: "Registra acciones, cambios, responsables, fechas, documentos, dictámenes y resoluciones." },
    { icon: <IcoEff />,     n: "03", title: "Eficiencia",     desc: "Reduce tiempos de atención, reprocesos, duplicidades y cargas operativas innecesarias." },
    { icon: <IcoTransp />,  n: "04", title: "Transparencia",  desc: "Genera evidencia institucional y facilita el seguimiento de solicitudes y decisiones." },
    { icon: <IcoBrain />,   n: "05", title: "Inteligencia operativa", desc: "Transforma la operación diaria en datos útiles para directivos y responsables de área." },
  ];

  const problems = [
    "Trámites lentos y procesos manuales", "Dependencia excesiva del papel", "Expedientes físicos dispersos",
    "Excel, WhatsApp y carpetas locales", "Información duplicada y sistemas aislados", "Sin trazabilidad de quién hizo qué",
    "Falta de seguimiento ciudadano", "Reportes difíciles de generar", "Baja visibilidad ejecutiva",
    "Procesos sin estandarización", "Tiempos de respuesta desconocidos", "Decisiones difíciles de auditar",
  ];

  const profiles = [
    { tag: "Alta dirección", title: "Presidentes y directivos", desc: "Visibilidad real de la operación, indicadores clave, supervisión y decisiones con datos.", points: ["Control ejecutivo", "Indicadores en tiempo real", "Evidencia de modernización"] },
    { tag: "Áreas y direcciones", title: "Secretarías y coordinaciones", desc: "Ordena procesos, asigna responsables, da seguimiento y estandariza criterios.", points: ["Procesos claros", "Seguimiento por etapa", "Roles definidos"] },
    { tag: "Operación", title: "Servidores públicos", desc: "Simplifica recepción, revisión, validación y dictamen de trámites.", points: ["Menos trabajo manual", "Flujos y plantillas", "Historial de cambios"] },
    { tag: "Personas", title: "Ciudadanía", desc: "Mejora la experiencia al interactuar con el gobierno, con claridad y seguimiento.", points: ["Seguimiento en línea", "Menos traslados", "Resoluciones claras"] },
    { tag: "Tecnología", title: "Áreas de TI", desc: "Arquitectura modular e integrable, segura y mantenible.", points: ["APIs y roles", "Integra lo existente", "Despliegue gradual"] },
    { tag: "Control", title: "Transparencia y contraloría", desc: "Genera evidencia de cada proceso para auditoría y cumplimiento.", points: ["Bitácoras", "Historial de decisiones", "Reportes de cumplimiento"] },
  ];

  const flow = [
    "Captura de información del ciudadano", "Validación de requisitos", "Integración del expediente",
    "Revisión por área responsable", "Dictamen técnico", "Prevención, aprobación o rechazo",
    "Pago de derechos (si aplica)", "Resolución y entrega", "Registro de evidencia",
    "Incorporación a tableros y reportes",
  ];

  return (
    <Fragment>
      <div className="service-page inner-page">
        <div className="body_wrap sg">
          <Header />
          <SigmaStyles />
          <main>

            {/* ── PANEL 1 · HERO ───────────────────────────────── */}
            <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: `radial-gradient(120% 90% at 75% 10%, #103056 0%, ${NAVY} 55%, ${NAVY_ALT} 100%)` }}>
              <GridBg opacity={0.05} />
              <div style={{ position: "absolute", top: -160, right: -120, width: 620, height: 620, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}33, transparent 68%)`, filter: "blur(70px)" }} />

              {/* Breadcrumb */}
              <div className="container" style={{ position: "absolute", top: 118, left: 0, right: 0 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: ".06em", color: FAINT, textTransform: "uppercase" }}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link><span>/</span>
                  <Link to="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>Proyectos</Link><span>/</span>
                  <span style={{ color: TEXT }}>SIGMA</span>
                </div>
              </div>

              <div className="container" style={{ position: "relative", paddingTop: 60 }}>
                <div style={{ maxWidth: 880 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 16px", borderRadius: 999, background: "rgba(46,111,176,.14)", border: "1px solid rgba(91,155,213,.3)", marginBottom: 30 }}>
                    <span className="sg-dot" style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: ACCENT_2, display: "inline-block" }} />
                    <span style={{ fontSize: 11.5, color: ACCENT_2, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase" }}>Atlas GovTech · Nueva división</span>
                  </div>

                  <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)", lineHeight: 0.98, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
                    SIGMA
                  </h1>
                  <div style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.9rem)", fontWeight: 500, color: ACCENT_2, lineHeight: 1.15, letterSpacing: "-0.01em", margin: "0 0 26px" }}>
                    Sistema Integral de Gestión<br />y Modernización Administrativa
                  </div>
                  <p style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", color: MUTED, fontWeight: 300, maxWidth: 600, lineHeight: 1.6, margin: "0 0 38px" }}>
                    La plataforma GovTech que convierte la operación pública en una arquitectura
                    digital, trazable y medible. Del trámite al dato. Del dato a la decisión.
                  </p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <SgButton href="#sigma" label="Explorar SIGMA" variant="fill" />
                    <SgButton href="#modulos" label={`${modules.length} módulos`} variant="line" />
                  </div>
                </div>
              </div>

              <div className="sg-scroll" style={{ position: "absolute", bottom: 28, left: "50%", color: FAINT }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
              </div>
            </section>

            {/* ── PANEL 2 · NACE ATLAS GOVTECH (división) ──────── */}
            <section style={{ background: NAVY, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(280px, 0.85fr) 1.15fr", gap: 70, alignItems: "start" }}>
                  <div>
                    {eyebrow("Una nueva división")}
                    <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: "0 0 22px" }}>
                      Atlas GovTech
                    </h2>
                    <p style={{ fontSize: 16, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: "0 0 26px", maxWidth: 420 }}>
                      La unidad de Atlas Tech dedicada a diseñar, implementar y evolucionar
                      plataformas tecnológicas para gobiernos, municipios, dependencias y
                      organismos públicos. No vendemos sistemas: construimos infraestructura
                      digital para administraciones públicas modernas.
                    </p>
                    <div style={{ fontSize: 13, color: FAINT, letterSpacing: ".06em", textTransform: "uppercase" }}>
                      Soluciones digitales para gobiernos modernos
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
                    {[
                      { k: "Visión", v: "Ser el brazo tecnológico que permita al sector público modernizar su operación administrativa mediante plataformas seguras, modulares y trazables — y prepararse para el gobierno digital y la inteligencia pública." },
                      { k: "Misión", v: "Diseñar, implementar y escalar soluciones que permitan a las instituciones públicas operar con mayor eficiencia, trazabilidad, transparencia y orientación ciudadana." },
                      { k: "Modelo", v: "SIGMA como producto central y punto de entrada, acompañado de consultoría, implementación, capacitación y evolución continua." },
                    ].map((row, i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 24, padding: "26px 0", borderTop: `1px solid ${LINE}`, borderBottom: i === 2 ? `1px solid ${LINE}` : "none" }}>
                        <div className="sg-kicker" style={{ color: ACCENT_2, paddingTop: 3 }}>{row.k}</div>
                        <div style={{ fontSize: 16, color: TEXT, fontWeight: 300, lineHeight: 1.6 }}>{row.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 3 · EL PROBLEMA ────────────────────────── */}
            <section style={{ background: NAVY_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 720, marginBottom: 56 }}>
                  {eyebrow("El punto de partida")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: "0 0 18px" }}>
                    La operación pública<br />opera fragmentada
                  </h2>
                  <p style={{ fontSize: 16, color: MUTED, fontWeight: 300, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
                    Muchas instituciones trabajan con procesos dispersos, poco integrados y
                    difíciles de medir. SIGMA es la respuesta tecnológica y estratégica.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 0, borderTop: `1px solid ${LINE}` }}>
                  {problems.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px 18px 0", borderBottom: `1px solid ${LINE}` }}>
                      <span style={{ flexShrink: 0, width: 22, height: 22, color: ACCENT_2 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" /></svg>
                      </span>
                      <span style={{ fontSize: 15, color: "rgba(234,241,248,.78)", fontWeight: 300, lineHeight: 1.4 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 4 · QUÉ ES SIGMA (sistema nervioso) ────── */}
            <section id="sigma" style={{ background: NAVY, borderTop: `1px solid ${LINE}`, padding: "130px 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "30%", left: -160, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}22, transparent 70%)`, filter: "blur(80px)" }} />
              <div className="container" style={{ position: "relative" }}>
                <div style={{ maxWidth: 820, marginBottom: 64 }}>
                  {eyebrow("El producto · SIGMA")}
                  <h2 style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)", lineHeight: 1.0, color: "#fff", margin: "0 0 24px" }}>
                    El sistema nervioso digital<br />de la administración pública
                  </h2>
                  <p style={{ fontSize: 17, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
                    Una plataforma GovTech modular que conecta personas, procesos, documentos,
                    trámites, áreas, reglas y decisiones. SIGMA permite que una institución deje
                    de operar con procesos dispersos y pase a operar como una sola plataforma
                    integrada, con la ciudadanía en el centro.
                  </p>
                </div>

                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
                  <div className="sg-card" style={{ padding: "34px 34px 38px" }}>
                    <div className="sg-kicker" style={{ color: ACCENT_2, marginBottom: 20 }}>SIGMA sí es</div>
                    {[
                      "Infraestructura tecnológica de modernización administrativa",
                      "Una suite modular: cada módulo se vende solo o como solución integral",
                      "Trazabilidad, evidencia y datos para decidir",
                      "Adaptable a municipios, estados, dependencias y organismos",
                    ].map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: i === 0 ? "none" : `1px solid ${LINE}` }}>
                        <span style={{ flexShrink: 0, color: ACCENT_2, marginTop: 2 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                        </span>
                        <span style={{ fontSize: 15, color: TEXT, fontWeight: 300, lineHeight: 1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "34px 34px 38px", borderRadius: 14, border: `1px dashed ${LINE}` }}>
                    <div className="sg-kicker" style={{ marginBottom: 20 }}>SIGMA no es</div>
                    {[
                      "Una app genérica o un gestor de trámites básico",
                      "Un CRM privado adaptado a gobierno",
                      "Un sistema de tickets ni un dashboard decorativo",
                      "Una solución política de campaña sin metodología",
                    ].map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderTop: i === 0 ? "none" : `1px solid ${LINE}` }}>
                        <span style={{ flexShrink: 0, color: FAINT, marginTop: 2 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </span>
                        <span style={{ fontSize: 15, color: MUTED, fontWeight: 300, lineHeight: 1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 5 · 5 PILARES DE VALOR ─────────────────── */}
            <section style={{ background: NAVY_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 700, marginBottom: 60 }}>
                  {eyebrow("Propuesta de valor")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: 0 }}>
                    Cinco principios,<br />una operación moderna
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 24 }}>
                  {pillars.map((p, i) => (
                    <div key={i} className="sg-card" style={{ padding: "30px 26px 32px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                        <span style={{ color: ACCENT_2 }}>{p.icon}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 13, color: FAINT }}>{p.n}</span>
                      </div>
                      <h3 style={{ fontSize: 19, color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>{p.title}</h3>
                      <p style={{ fontSize: 14, color: MUTED, fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 6 · 12 MÓDULOS ─────────────────────────── */}
            <section id="modulos" style={{ background: NAVY, borderTop: `1px solid ${LINE}`, padding: "130px 0" }}>
              <div className="container">
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
                  <div style={{ maxWidth: 640 }}>
                    {eyebrow("Suite modular")}
                    <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: "0 0 16px" }}>
                      {modules.length} módulos, una plataforma
                    </h2>
                    <p style={{ fontSize: 16, color: MUTED, fontWeight: 300, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
                      Cada módulo opera de forma independiente o como parte de una solución
                      integral. Implementación por etapas, sin migrar de sistema.
                    </p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: 16 }}>
                  {modules.map((m) => (
                    <div key={m.key} className="sg-mod" style={{ padding: "24px 24px 26px", position: "relative" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{ fontFamily: "monospace", fontSize: 13, color: ACCENT_2, fontWeight: 600 }}>{m.code}</span>
                        {m.future && (
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: ACCENT_2, padding: "3px 9px", borderRadius: 999, border: `1px solid rgba(91,155,213,.35)`, background: "rgba(46,111,176,.12)" }}>A futuro</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: 17, color: "#fff", lineHeight: 1.2, margin: "0 0 10px" }}>{m.name}</h3>
                      <p style={{ fontSize: 13.5, color: MUTED, fontWeight: 300, lineHeight: 1.55, margin: 0 }}>{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 7 · ARQUITECTURA DEL TRÁMITE ───────────── */}
            <section style={{ background: NAVY_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(280px, 0.8fr) 1.2fr", gap: 70, alignItems: "start" }}>
                  <div style={{ position: "sticky", top: 120 }}>
                    {eyebrow("Arquitectura institucional")}
                    <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.04, color: "#fff", margin: "0 0 22px" }}>
                      El trámite<br />electrónico
                    </h2>
                    <p style={{ fontSize: 15.5, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: 0, maxWidth: 360 }}>
                      Todo trámite sigue una lógica institucional clara y configurable —
                      homoclave, dependencia, folio, responsable, plazos, dictamen y evidencia—
                      de la captura ciudadana al tablero ejecutivo.
                    </p>
                  </div>
                  <div>
                    {flow.map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "20px 4px", borderBottom: `1px solid ${LINE}` }}>
                        <span className="sg-flow-num" style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, width: 30, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: 16.5, color: TEXT, fontWeight: 300, lineHeight: 1.4 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 8 · BENEFICIOS POR PERFIL ──────────────── */}
            <section style={{ background: NAVY, borderTop: `1px solid ${LINE}`, padding: "130px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 700, marginBottom: 60 }}>
                  {eyebrow("Para toda la institución")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: 0 }}>
                    Un valor distinto<br />para cada perfil
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: 22 }}>
                  {profiles.map((pr, i) => (
                    <div key={i} className="sg-card" style={{ padding: "30px 28px 32px", display: "flex", flexDirection: "column" }}>
                      <div className="sg-kicker" style={{ color: ACCENT_2, marginBottom: 12 }}>{pr.tag}</div>
                      <h3 style={{ fontSize: 20, color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>{pr.title}</h3>
                      <p style={{ fontSize: 14.5, color: MUTED, fontWeight: 300, lineHeight: 1.6, margin: "0 0 20px", flexGrow: 1 }}>{pr.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {pr.points.map((pt, j) => (
                          <span key={j} style={{ fontSize: 12, color: ACCENT_2, fontWeight: 400, padding: "5px 12px", borderRadius: 999, background: "rgba(46,111,176,.12)", border: `1px solid rgba(91,155,213,.22)` }}>{pt}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 9 · DÓNDE APLICA ───────────────────────── */}
            <section style={{ background: NAVY_ALT, borderTop: `1px solid ${LINE}`, padding: "110px 0" }}>
              <div className="container">
                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(260px, 0.7fr) 1.3fr", gap: 60, alignItems: "center" }}>
                  <div>
                    {eyebrow("Dónde aplica")}
                    <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)", lineHeight: 1.05, color: "#fff", margin: 0 }}>
                      Diseñado para<br />todo el sector público
                    </h2>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {(project.industrias ?? []).map((ind, i) => (
                      <span key={i} style={{ fontSize: 15, color: TEXT, fontWeight: 300, padding: "11px 20px", borderRadius: 8, background: PANEL, border: `1px solid ${LINE}` }}>{ind}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 10 · CTA ───────────────────────────────── */}
            <section style={{ position: "relative", overflow: "hidden", background: `radial-gradient(120% 100% at 50% 0%, #103056 0%, ${NAVY} 60%)`, padding: "130px 0", borderTop: `1px solid ${LINE}` }}>
              <GridBg opacity={0.05} />
              <div className="container" style={{ position: "relative", textAlign: "center" }}>
                {eyebrow("Atlas GovTech · SIGMA")}
                <h2 style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", lineHeight: 1.0, color: "#fff", margin: "0 auto 24px", maxWidth: 880 }}>
                  Modernización administrativa<br />para gobiernos que operan con datos
                </h2>
                <p style={{ fontSize: 17, color: MUTED, fontWeight: 300, maxWidth: 560, margin: "0 auto 38px", lineHeight: 1.65 }}>
                  Llevemos la operación de tu institución a una plataforma digital, trazable y
                  medible. Comenzamos con un diagnóstico y un despliegue por módulos.
                </p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <SgButton to="/contact" label="Agendar diagnóstico" variant="fill" />
                  <SgButton to="/proyectos" label="Volver a proyectos" variant="line" arrow={false} />
                </div>
                <div style={{ marginTop: 40, fontSize: 12, color: FAINT, letterSpacing: ".06em", textTransform: "uppercase" }}>
                  SIGMA es una solución de Atlas GovTech · una división de Atlas Tech
                </div>
              </div>
            </section>

          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default SigmaDetailPage;
