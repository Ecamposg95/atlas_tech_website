import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { getProjectBySlug } from "../../data/projects";

// ── Estética Web3 Neón · violeta + cyan ───────────────────────────
const OC_FONT = "'Inter', 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'IBM Plex Mono', 'SF Mono', ui-monospace, monospace";
const BG = "#0a0a12";
const BG_ALT = "#08080f";
const PANEL = "#12121f";
const VIOLET = "#8b5cf6";
const CYAN = "#22d3ee";
const TEXT = "#ececf6";
const MUTED = "rgba(236,236,246,0.62)";
const FAINT = "rgba(236,236,246,0.40)";
const LINE = "rgba(236,236,246,0.10)";
const GRAD = `linear-gradient(110deg, ${VIOLET} 0%, ${CYAN} 100%)`;

const OcStyles = () => (
  <style>{`
    .oc { background:${BG}; color:${TEXT}; font-family:${OC_FONT}; -webkit-font-smoothing:antialiased; }
    .oc h1,.oc h2,.oc h3 { font-family:${OC_FONT}; margin:0; letter-spacing:-0.025em; }
    .oc-grad { background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
    .oc-eyebrow { font-size:12px; letter-spacing:.22em; text-transform:uppercase; font-weight:700;
      background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
    .oc-kicker { font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:${FAINT}; font-weight:600; }
    .oc-btn { display:inline-flex; align-items:center; gap:11px; font-family:${OC_FONT}; font-size:13px; font-weight:600;
      letter-spacing:.02em; padding:14px 26px; border-radius:8px; text-decoration:none; cursor:pointer;
      transition:transform .25s, box-shadow .25s, border-color .25s, color .25s, background .25s; white-space:nowrap; }
    .oc-btn-fill { background:${GRAD}; color:#0a0a12; border:1px solid transparent; font-weight:700; }
    .oc-btn-fill:hover { box-shadow:0 12px 36px rgba(139,92,246,.45); transform:translateY(-2px); }
    .oc-btn-line { background:transparent; color:${TEXT}; border:1px solid rgba(236,236,246,.28); }
    .oc-btn-line:hover { border-color:${CYAN}; color:${CYAN}; }
    .oc-btn svg { transition:transform .25s; }
    .oc-btn:hover svg { transform:translateX(4px); }
    .oc-card { background:${PANEL}; border:1px solid ${LINE}; border-radius:16px; transition:border-color .3s, transform .3s, box-shadow .3s; }
    .oc-card:hover { border-color:rgba(139,92,246,.5); transform:translateY(-4px); box-shadow:0 22px 50px rgba(0,0,0,.45); }
    .oc-phase { position:relative; transition:border-color .3s, background .3s; }
    .oc-phase:hover { border-color:rgba(34,211,238,.45) !important; background:#15152400; }
    @keyframes oc-ping { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.4);opacity:0} }
    .oc-dot::after { content:""; position:absolute; inset:0; border-radius:50%; background:${CYAN}; animation:oc-ping 1.8s cubic-bezier(0,0,.2,1) infinite; }
    @keyframes oc-bob { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,8px)} }
    .oc-scroll { animation:oc-bob 2.4s ease-in-out infinite; }
  `}</style>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const GitIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5a11.5 11.5 0 0 0 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
);

type BtnProps = { to?: string; href?: string; label: string; variant?: "fill" | "line"; arrow?: boolean; git?: boolean };
const OcButton: React.FC<BtnProps> = ({ to, href, label, variant = "line", arrow = true, git = false }) => {
  const cls = `oc-btn ${variant === "fill" ? "oc-btn-fill" : "oc-btn-line"}`;
  const inner = <>{git && <GitIcon />}{label}{arrow && <Arrow />}</>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} className={cls} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
};

const GridBg: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => (
  <div style={{
    position: "absolute", inset: 0, opacity,
    backgroundImage: `linear-gradient(rgba(139,92,246,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.5) 1px, transparent 1px)`,
    backgroundSize: "46px 46px",
    maskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, #000 25%, transparent 80%)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 35%, #000 25%, transparent 80%)",
  }} />
);

const OpenCashbackDetailPage: React.FC = () => {
  const project = getProjectBySlug("open-cashback");
  if (!project) return <Navigate to="/proyectos" replace />;

  const eyebrow = (t: string) => <div className="oc-eyebrow" style={{ marginBottom: 18 }}>{t}</div>;

  // ── Contenido narrativo ─────────────────────────────────────────
  const layers = [
    { tag: "Cashback as a Service", desc: "Cada transacción calcula y acredita una recompensa según reglas configurables del comercio." },
    { tag: "Loyalty as a Service", desc: "Wallet, campañas y segmentación que convierten una compra en una relación continua." },
    { tag: "Rewards Engine", desc: "Motor de reglas, límites, exclusiones y expiraciones — la lógica programable de la recompensa." },
  ];

  const problems = [
    "Los clientes compran una vez y no regresan", "Las promociones se aplican sin datos",
    "Los descuentos reducen margen sin construir lealtad", "El POS registra ventas, pero no fortalece la relación",
    "Los programas de puntos son manuales o confusos", "Las campañas no se conectan con ventas reales",
    "No hay trazabilidad de recompensas emitidas y redimidas", "El negocio no conoce su pasivo por recompensas",
    "Las franquicias no tienen visibilidad por sucursal", "Los sistemas de lealtad cerrados no se integran",
  ];

  const flow = [
    { n: "01", t: "Compra", d: "El cliente paga en POS o e-commerce." },
    { n: "02", t: "Cálculo", d: "El motor calcula la recompensa sobre el monto elegible." },
    { n: "03", t: "Wallet", d: "El cashback se acredita en la wallet del cliente." },
    { n: "04", t: "Retorno", d: "El cliente regresa para redimir su saldo." },
    { n: "05", t: "Redención", d: "Usa su saldo para descontar una compra futura." },
    { n: "06", t: "Datos", d: "El negocio mide recurrencia, ticket y lifetime value." },
  ];

  const phases = [
    { n: "F1", title: "Ledger interno", tag: "Hoy · MVP", desc: "PostgreSQL como fuente de verdad. Registra ventas, recompensas, redenciones, expiraciones, reversos y ajustes.", on: false },
    { n: "F2", title: "Hash de integridad", tag: "Trazabilidad", desc: "Cada movimiento genera un hash encadenado al anterior — una cadena interna tipo blockchain ligera, auditable.", on: false },
    { n: "F3", title: "Batch anchoring", tag: "On-chain", desc: "En vez de registrar cada venta on-chain, se agrupan miles de movimientos y se ancla un solo hash por lote.", on: true },
    { n: "F4", title: "Smart contracts", tag: "Web3", desc: "Emisión, redención y auditoría de campañas migran a contratos. Control de supply verificable on-chain.", on: true },
    { n: "F5", title: "Tokenización", tag: "Futuro", desc: "Recompensas tokenizadas y settlement entre comercios — solo con claridad legal, fiscal y operativa.", on: true },
  ];

  const useCases = [
    { t: "Retail básico", d: "1% de cashback en cada compra; el cliente regresa y lo redime.", rule: "rate = 1%" },
    { t: "Mayorista", d: "Recompensa por volumen escalonada por monto de compra.", rule: ">$10k → 3%" },
    { t: "Restaurante", d: "Más cashback en días valle para mover demanda.", rule: "Lun–Jue → 5%" },
    { t: "Franquicia", d: "Cashback emitido y redimido controlado por sucursal.", rule: "por sucursal" },
    { t: "E-commerce", d: "Webhook de orden pagada → cashback → redención en checkout.", rule: "webhook" },
    { t: "POS externo", d: "API key + endpoints de venta, saldo, redención y reverso.", rule: "API-first" },
  ];

  const roadmap = [
    "Cashback Core — wallet, ventas, cashback, redención y reportes",
    "Campaign Engine — reglas avanzadas, segmentación y categorías",
    "Integraciones — API keys, POS, e-commerce, webhooks y SDK",
    "Customer Experience — portal cliente, QR, promociones y notificaciones",
    "Blockchain Audit — hash ledger, batch anchor y explorador interno",
    "Multi-merchant Network — comercios afiliados y redención cruzada",
    "Tokenized Rewards — token, smart contracts, wallet Web3 y settlement",
  ];

  const ecosystem = [
    { k: "Atlas POS", v: "Módulo de recompensas para ventas físicas" },
    { k: "Atlas ERP", v: "Fidelización conectada a ventas, clientes y finanzas" },
    { k: "Atlas Kapital", v: "Tokenización, financiamiento e incentivos" },
    { k: "Atlas Retail Intelligence", v: "Analítica de recompra y comportamiento" },
    { k: "Atlas CRM", v: "Campañas basadas en datos de clientes" },
    { k: "Atlas Venture Lab", v: "Producto con potencial de spin-off" },
  ];

  return (
    <Fragment>
      <div className="service-page inner-page">
        <div className="body_wrap oc">
          <Header />
          <OcStyles />
          <main>

            {/* ── PANEL 1 · HERO ───────────────────────────────── */}
            <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: BG }}>
              <GridBg opacity={0.06} />
              <div style={{ position: "absolute", top: -180, right: -140, width: 640, height: 640, borderRadius: "50%", background: `radial-gradient(circle, ${VIOLET}40, transparent 66%)`, filter: "blur(80px)" }} />
              <div style={{ position: "absolute", bottom: -200, left: -120, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, ${CYAN}33, transparent 68%)`, filter: "blur(90px)" }} />

              {/* Breadcrumb */}
              <div className="container" style={{ position: "absolute", top: 118, left: 0, right: 0 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: ".06em", color: FAINT, textTransform: "uppercase" }}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link><span>/</span>
                  <Link to="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>Proyectos</Link><span>/</span>
                  <span style={{ color: TEXT }}>Open Cashback</span>
                </div>
              </div>

              <div className="container" style={{ position: "relative", paddingTop: 60 }}>
                <div style={{ maxWidth: 920 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 16px", borderRadius: 999, background: "rgba(139,92,246,.12)", border: "1px solid rgba(139,92,246,.3)", marginBottom: 30 }}>
                    <span className="oc-dot" style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: CYAN, display: "inline-block" }} />
                    <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Atlas Web3 · Open Cashback</span>
                  </div>

                  <h1 style={{ fontSize: "clamp(2.6rem, 7vw, 5.6rem)", lineHeight: 0.99, fontWeight: 800, color: "#fff", margin: "0 0 24px" }}>
                    Convierte cada compra<br />
                    en una recompensa <span className="oc-grad">programable</span>
                  </h1>
                  <p style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", color: MUTED, fontWeight: 300, maxWidth: 600, lineHeight: 1.6, margin: "0 0 38px" }}>
                    Infraestructura abierta y API-first de cashback, lealtad y recompensas para
                    POS, ERP y e-commerce. Arranca como un ledger confiable; evoluciona hacia una
                    capa blockchain auditable.
                  </p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <OcButton href="#que-es" label="Explorar" variant="fill" />
                    {project.repoUrl && <OcButton href={project.repoUrl} label="Ver repositorio" variant="line" git arrow={false} />}
                  </div>
                </div>
              </div>

              <div className="oc-scroll" style={{ position: "absolute", bottom: 28, left: "50%", color: FAINT }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
              </div>
            </section>

            {/* ── PANEL 2 · QUÉ ES (3 capas) ───────────────────── */}
            <section id="que-es" style={{ background: BG, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 760, marginBottom: 60 }}>
                  {eyebrow("No es solo descuentos")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.02, color: "#fff", margin: "0 0 22px" }}>
                    Una infraestructura<br />de recompensas
                  </h2>
                  <p style={{ fontSize: 17, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: 0, maxWidth: 620 }}>
                    Open Cashback es la capa que convierte ventas en lealtad: wallets de cliente,
                    reglas de cashback, ledger transaccional, redención, campañas y auditoría —
                    todo accesible por API.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 24 }}>
                  {layers.map((l, i) => (
                    <div key={i} className="oc-card" style={{ padding: "32px 28px 34px" }}>
                      <div style={{ fontFamily: MONO, fontSize: 13, color: CYAN, marginBottom: 18 }}>{String(i + 1).padStart(2, "0")}</div>
                      <h3 style={{ fontSize: 20, color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>{l.tag}</h3>
                      <p style={{ fontSize: 14.5, color: MUTED, fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{l.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 3 · EL PROBLEMA ────────────────────────── */}
            <section style={{ background: BG_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 700, marginBottom: 52 }}>
                  {eyebrow("El punto de partida")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: "0 0 16px" }}>
                    Vender una vez<br />no es construir lealtad
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: 0, borderTop: `1px solid ${LINE}` }}>
                  {problems.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px 18px 0", borderBottom: `1px solid ${LINE}` }}>
                      <span style={{ flexShrink: 0, color: VIOLET }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" /></svg>
                      </span>
                      <span style={{ fontSize: 15, color: "rgba(236,236,246,.8)", fontWeight: 300, lineHeight: 1.4 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 4 · CÓMO FUNCIONA (flujo) ──────────────── */}
            <section style={{ background: BG, borderTop: `1px solid ${LINE}`, padding: "130px 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "20%", right: -160, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${VIOLET}22, transparent 70%)`, filter: "blur(90px)" }} />
              <div className="container" style={{ position: "relative" }}>
                <div style={{ maxWidth: 740, marginBottom: 60 }}>
                  {eyebrow("Cómo funciona")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.0, color: "#fff", margin: "0 0 22px" }}>
                    De la venta<br />a la relación continua
                  </h2>
                  <p style={{ fontSize: 17, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: 0, maxWidth: 600, fontStyle: "italic" }}>
                    "Open Cashback convierte cada transacción en una recompensa programable."
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: 16 }}>
                  {flow.map((s, i) => (
                    <div key={i} className="oc-card" style={{ padding: "26px 22px 28px" }}>
                      <div style={{ fontFamily: MONO, fontSize: 13, marginBottom: 16, background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600 }}>{s.n}</div>
                      <h3 style={{ fontSize: 17, color: "#fff", margin: "0 0 8px" }}>{s.t}</h3>
                      <p style={{ fontSize: 13.5, color: MUTED, fontWeight: 300, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 5 · CAPACIDADES + LEDGER ───────────────── */}
            <section style={{ background: BG_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(min(280px, 100%), 1fr) minmax(300px, 0.9fr)", gap: 64, alignItems: "start" }}>
                  <div>
                    {eyebrow("Capacidades")}
                    <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.02, color: "#fff", margin: "0 0 28px" }}>
                      Lo que entrega<br />la plataforma
                    </h2>
                    <div>
                      {project.features.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 0", borderBottom: `1px solid ${LINE}` }}>
                          <span style={{ flexShrink: 0, color: CYAN }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                          </span>
                          <span style={{ fontSize: 15.5, color: "rgba(236,236,246,.85)", fontWeight: 300, lineHeight: 1.4 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ledger visual */}
                  <div className="oc-card" style={{ padding: "26px 26px 30px", position: "sticky", top: 110 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: VIOLET }} />
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: CYAN }} />
                      <span className="oc-kicker" style={{ marginLeft: 8 }}>Reward Ledger</span>
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 13.5, lineHeight: 2.0, color: "rgba(236,236,246,.78)" }}>
                      <div><span style={{ color: "#4ade80" }}>+10.00</span> EARNED · TICKET-001</div>
                      <div><span style={{ color: "#4ade80" }}>+20.00</span> EARNED · TICKET-002</div>
                      <div><span style={{ color: CYAN }}>−5.00</span> REDEEMED · RED-001</div>
                      <div><span style={{ color: "#f87171" }}>−10.00</span> REVERSED · TICKET-001</div>
                      <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 12, paddingTop: 12, color: "#fff" }}>
                        balance = <span className="oc-grad" style={{ fontWeight: 700 }}>15.00</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 18, fontSize: 12, color: FAINT, lineHeight: 1.5 }}>
                      Movimientos inmutables, reversos en vez de borrados, hash encadenado por transacción.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 6 · ESTRATEGIA BLOCKCHAIN (5 fases) ────── */}
            <section style={{ background: BG, borderTop: `1px solid ${LINE}`, padding: "130px 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 360, background: `radial-gradient(ellipse at center, ${VIOLET}1f, transparent 70%)`, filter: "blur(70px)" }} />
              <div className="container" style={{ position: "relative" }}>
                <div style={{ maxWidth: 760, marginBottom: 60 }}>
                  {eyebrow("Estrategia técnica · híbrida y progresiva")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.0, color: "#fff", margin: "0 0 22px" }}>
                    Blockchain, sin frenar<br />el punto de venta
                  </h2>
                  <p style={{ fontSize: 17, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: 0, maxWidth: 620 }}>
                    La venta nunca depende de una transacción on-chain en tiempo real. La cadena
                    entra como capa de auditoría: del ledger interno al anclaje por lotes y los
                    smart contracts.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 0 }}>
                  {phases.map((p, i) => (
                    <div key={i} className="oc-phase" style={{ padding: "0 26px", borderLeft: `1px solid ${LINE}`, borderRight: i === phases.length - 1 ? `1px solid ${LINE}` : "none" }}>
                      <div style={{ height: 3, background: p.on ? GRAD : LINE, borderRadius: 3, marginBottom: 26 }} />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <span style={{ fontFamily: MONO, fontSize: 13, color: p.on ? CYAN : FAINT, fontWeight: 600 }}>{p.n}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: p.on ? VIOLET : FAINT }}>{p.tag}</span>
                      </div>
                      <h3 style={{ fontSize: 18, color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>{p.title}</h3>
                      <p style={{ fontSize: 13.5, color: MUTED, fontWeight: 300, lineHeight: 1.6, margin: "0 0 24px" }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 7 · CASOS DE USO ───────────────────────── */}
            <section style={{ background: BG_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 700, marginBottom: 56 }}>
                  {eyebrow("Casos de uso")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.02, color: "#fff", margin: 0 }}>
                    Una regla para<br />cada modelo de negocio
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: 20 }}>
                  {useCases.map((u, i) => (
                    <div key={i} className="oc-card" style={{ padding: "28px 26px 30px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <h3 style={{ fontSize: 19, color: "#fff", margin: 0 }}>{u.t}</h3>
                        <span style={{ fontFamily: MONO, fontSize: 12, color: CYAN, padding: "4px 10px", borderRadius: 6, background: "rgba(34,211,238,.1)", border: "1px solid rgba(34,211,238,.22)" }}>{u.rule}</span>
                      </div>
                      <p style={{ fontSize: 14, color: MUTED, fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{u.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 8 · STACK ──────────────────────────────── */}
            <section style={{ background: BG, borderTop: `1px solid ${LINE}`, padding: "110px 0" }}>
              <div className="container">
                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(240px, 0.7fr) 1.3fr", gap: 56, alignItems: "center" }}>
                  <div>
                    {eyebrow("Stack tecnológico")}
                    <h2 style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)", lineHeight: 1.05, color: "#fff", margin: 0 }}>
                      API-first,<br />multi-tenant<br />y auditable
                    </h2>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {project.stack.map((t, i) => (
                      <span key={i} style={{ fontFamily: MONO, fontSize: 14, color: TEXT, padding: "12px 20px", borderRadius: 8, background: PANEL, border: `1px solid ${LINE}` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 9 · ROADMAP ────────────────────────────── */}
            <section style={{ background: BG_ALT, borderTop: `1px solid ${LINE}`, padding: "120px 0" }}>
              <div className="container">
                <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "minmax(260px, 0.8fr) 1.2fr", gap: 64, alignItems: "start" }}>
                  <div style={{ position: "sticky", top: 110 }}>
                    {eyebrow("Roadmap de producto")}
                    <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.04, color: "#fff", margin: "0 0 20px" }}>
                      Siete etapas,<br />una red abierta
                    </h2>
                    <p style={{ fontSize: 15.5, color: MUTED, fontWeight: 300, lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
                      Del ledger confiable a una red multi-comercio con recompensas tokenizadas.
                    </p>
                  </div>
                  <div>
                    {roadmap.map((r, i) => (
                      <div key={i} style={{ display: "flex", gap: 22, padding: "20px 4px", borderBottom: `1px solid ${LINE}` }}>
                        <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, width: 30, flexShrink: 0, background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: 16, color: TEXT, fontWeight: 300, lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 10 · ECOSISTEMA ATLAS ──────────────────── */}
            <section style={{ background: BG, borderTop: `1px solid ${LINE}`, padding: "110px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 700, marginBottom: 48 }}>
                  {eyebrow("Ecosistema Atlas Tech")}
                  <h2 style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", lineHeight: 1.04, color: "#fff", margin: "0 0 16px" }}>
                    Una vertical Web3<br />que se conecta con todo
                  </h2>
                  <p style={{ fontSize: 16, color: MUTED, fontWeight: 300, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
                    Open Cashback funciona como producto independiente o como capa de valor sobre
                    el resto del ecosistema de Atlas Tech.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: 16 }}>
                  {ecosystem.map((e, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 24px", borderRadius: 12, background: PANEL, border: `1px solid ${LINE}` }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{e.k}</span>
                      <span style={{ fontSize: 13.5, color: MUTED, fontWeight: 300, lineHeight: 1.5 }}>{e.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 11 · CTA ───────────────────────────────── */}
            <section style={{ position: "relative", overflow: "hidden", background: BG, padding: "130px 0", borderTop: `1px solid ${LINE}` }}>
              <GridBg opacity={0.06} />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 100% at 50% 0%, rgba(139,92,246,.16), transparent 55%)` }} />
              <div className="container" style={{ position: "relative", textAlign: "center" }}>
                {eyebrow("Atlas Web3 · Open Cashback")}
                <h2 style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)", lineHeight: 1.0, color: "#fff", margin: "0 auto 24px", maxWidth: 880 }}>
                  Del punto de venta<br />al <span className="oc-grad">punto de relación</span>
                </h2>
                <p style={{ fontSize: 17, color: MUTED, fontWeight: 300, maxWidth: 540, margin: "0 auto 38px", lineHeight: 1.65 }}>
                  Recompensas programables para comercios físicos y digitales — con un ledger
                  auditable hoy y una capa blockchain mañana.
                </p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <OcButton to="/contact" label="Hablemos del proyecto" variant="fill" />
                  {project.repoUrl && <OcButton href={project.repoUrl} label="Ver repositorio" variant="line" git arrow={false} />}
                  <OcButton to="/proyectos" label="Volver a proyectos" variant="line" arrow={false} />
                </div>
                <div style={{ marginTop: 40, fontSize: 12, color: FAINT, letterSpacing: ".06em", textTransform: "uppercase" }}>
                  Open Cashback es una vertical de Atlas Web3 · Atlas Tech
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

export default OpenCashbackDetailPage;
