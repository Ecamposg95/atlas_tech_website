import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { getProjectBySlug, Award } from "../../data/projects";

// ── Estética SpaceX ───────────────────────────────────────────
const SX_FONT = "'Barlow', 'D-DIN', Arial, Helvetica, sans-serif";
const TEXT = "#F0F0FA";
const GEO = "/images/projects/harvestt/geodesic-hero.jpg";
const PROD = "/images/projects/harvestt/harvestt-product.jpg";

const medalAccent: Record<Award["medal"], string> = {
  gold: "#F5C842", silver: "#D5DBE3", bronze: "#D69A6A", honor: "#B7A3F2", special: "#34D399",
};

const HarvesttStyles = () => (
  <style>{`
    .hv-sx { background:#000; color:${TEXT}; font-family:${SX_FONT}; -webkit-font-smoothing:antialiased; }
    .hv-sx h1, .hv-sx h2, .hv-sx h3 { font-family:${SX_FONT}; text-transform:uppercase; font-weight:500; margin:0; }
    .hv-eyebrow { font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:rgba(240,240,250,.7); font-weight:500; }
    .hv-btn { display:inline-flex; align-items:center; gap:12px; font-family:${SX_FONT}; font-size:12px; font-weight:600;
      letter-spacing:.16em; text-transform:uppercase; padding:14px 26px; border-radius:2px; text-decoration:none;
      cursor:pointer; transition:background .25s, color .25s, border-color .25s; white-space:nowrap; }
    .hv-btn-fill { background:${TEXT}; color:#000; border:1px solid ${TEXT}; }
    .hv-btn-fill:hover { background:transparent; color:${TEXT}; }
    .hv-btn-line { background:rgba(0,0,0,.15); color:${TEXT}; border:1px solid rgba(240,240,250,.45); }
    .hv-btn-line:hover { border-color:${TEXT}; background:rgba(240,240,250,.08); }
    .hv-btn svg { transition:transform .25s; }
    .hv-btn:hover svg { transform:translateX(4px); }
    @keyframes hv-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
    .hv-scroll { animation:hv-bob 2.4s ease-in-out infinite; }
    .hv-panel-text { animation:hv-fade .9s cubic-bezier(.22,1,.36,1) both; }
    @keyframes hv-fade { from{opacity:0; transform:translateY(22px)} to{opacity:1; transform:none} }
    .hv-col { transition:border-color .3s; }
    .hv-col:hover { border-color:rgba(240,240,250,.4) !important; }
  `}</style>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

type BtnProps = { to?: string; href?: string; label: string; variant?: "fill" | "line"; arrow?: boolean };
const SxButton: React.FC<BtnProps> = ({ to, href, label, variant = "line", arrow = true }) => {
  const cls = `hv-btn ${variant === "fill" ? "hv-btn-fill" : "hv-btn-line"}`;
  const inner = <>{label}{arrow && <Arrow />}</>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} className={cls}>{inner}</a>;
};

// ── Iconos de línea para las 3 escalas ────────────────────────
const IconIndoor = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="10" width="24" height="30" rx="2" /><path d="M12 18h24M19 26v8M29 26v8" />
    <path d="M24 24c-2-3-5-3-5-3s0 3 2 4 3-1 3-1zM24 24c2-3 5-3 5-3s0 3-2 4-3-1-3-1z" />
  </svg>
);
const IconUrban = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 42h32" /><rect x="11" y="20" width="11" height="22" /><rect x="26" y="10" width="11" height="32" />
    <path d="M14 25h5M14 30h5M14 35h5M29 15h5M29 21h5M29 27h5M29 33h5" />
  </svg>
);
const IconSpace = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="13" /><path d="M11 24h26M24 11v26M14.5 14.5l19 19M33.5 14.5l-19 19" />
  </svg>
);

const HarvesttDetailPage: React.FC = () => {
  const project = getProjectBySlug("harvestt");
  if (!project) return <Navigate to="/proyectos" replace />;
  const awards = project.awards ?? [];

  const eyebrow = (t: string) => <div className="hv-eyebrow" style={{ marginBottom: 18 }}>{t}</div>;

  return (
    <Fragment>
      <div className="service-page inner-page">
        <div className="body_wrap hv-sx">
          <Header />
          <HarvesttStyles />
          <main>

            {/* ── PANEL 1 · HERO ─────────────────────────────── */}
            <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#000" }}>
              <img src={GEO} alt="Invernadero geodésico Harvestt" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 14%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 45%, rgba(0,0,0,.25) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #000 2%, transparent 38%, transparent 78%, rgba(0,0,0,.7) 100%)" }} />

              {/* Breadcrumb */}
              <div className="container" style={{ position: "absolute", top: 120, left: 0, right: 0 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: ".08em", color: "rgba(240,240,250,.5)", textTransform: "uppercase" }}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link><span>/</span>
                  <Link to="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>Proyectos</Link><span>/</span>
                  <span style={{ color: "rgba(240,240,250,.85)" }}>Harvestt</span>
                </div>
              </div>

              <div className="container" style={{ position: "relative", paddingBottom: 96 }}>
                <div className="hv-panel-text" style={{ maxWidth: 820 }}>
                  {eyebrow("Harvestt · AgroTech · Inteligencia Artificial")}
                  <h1 style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 0.98, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 22px" }}>
                    Cultivar vida<br />en cualquier lugar
                  </h1>
                  <p style={{ fontSize: "clamp(1rem, 1.6vw, 1.3rem)", color: "rgba(240,240,250,.72)", fontWeight: 300, maxWidth: 560, lineHeight: 1.5, margin: "0 0 34px" }}>
                    Agrotecnología con IA — del invernadero indoor a las granjas verticales urbanas y los invernaderos espaciales.
                  </p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <SxButton href="#vision" label="Explorar" variant="fill" />
                    <SxButton href="#reconocimientos" label={`${awards.length} reconocimientos`} variant="line" />
                  </div>
                </div>
              </div>

              <div className="hv-scroll" style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", color: "rgba(240,240,250,.5)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
              </div>
            </section>

            {/* ── PANEL 2 · VISIÓN GEODÉSICA ─────────────────── */}
            <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#000" }}>
              <img src={GEO} alt="Domos geodésicos" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 70%", transform: "scale(1.15)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.8) 0%, rgba(0,0,0,.35) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #000 1%, transparent 40%, transparent 80%, rgba(0,0,0,.6) 100%)" }} />
              <div className="container" style={{ position: "relative", paddingBottom: 100, paddingTop: 120 }}>
                <div style={{ maxWidth: 760 }}>
                  {eyebrow("Invernadero geodésico · Visión 2026")}
                  <h2 style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", lineHeight: 0.96, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 24px" }}>
                    Fuera de<br />este mundo
                  </h2>
                  <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "rgba(240,240,250,.72)", fontWeight: 300, maxWidth: 540, lineHeight: 1.55, margin: "0 0 34px" }}>
                    Domos modulares y desplegables que se levantan donde nada crece. Energías limpias, componentes reciclables y operación autónoma — innovación de procesos, preservando el presente, pensando en el futuro.
                  </p>
                  <SxButton to="/contact" label="Hablemos del proyecto" variant="line" />
                </div>
              </div>
            </section>

            {/* ── PANEL 3 · TRES ESCALAS ─────────────────────── */}
            <section id="vision" style={{ background: "#000", borderTop: "1px solid rgba(240,240,250,.08)", padding: "120px 0 110px" }}>
              <div className="container">
                <div style={{ maxWidth: 760, marginBottom: 72 }}>
                  {eyebrow("Una visión · Tres escalas")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", lineHeight: 1.0, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 20px" }}>
                    Del hogar a la órbita
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(240,240,250,.6)", fontWeight: 300, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
                    El mismo ADN —cámara controlada, IA y energía limpia— escala de una cocina a entornos extremos.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0 }}>
                  {[
                    { n: "01", tag: "Hoy · Indoor", title: "Invernaderos en casa", desc: "La grow-box doméstica: germina y cultiva con clima, luz y nutrientes por IA.", icon: <IconIndoor /> },
                    { n: "02", tag: "Escalando · Urbano", title: "Granjas verticales urbanas", desc: "Módulos apilables que llevan el cultivo local, fresco y sin pesticidas a la ciudad.", icon: <IconUrban /> },
                    { n: "03", tag: "Frontera · Espacial", title: "Invernaderos espaciales", desc: "Domos geodésicos desplegables para seguridad alimentaria en condiciones extremas.", icon: <IconSpace /> },
                  ].map((s, i) => (
                    <div key={i} className="hv-col" style={{ padding: "0 28px", borderLeft: i === 0 ? "1px solid rgba(240,240,250,.12)" : "1px solid rgba(240,240,250,.12)", borderRight: i === 2 ? "1px solid rgba(240,240,250,.12)" : "none" }}>
                      <div style={{ color: "rgba(240,240,250,.85)", marginBottom: 26 }}>{s.icon}</div>
                      <div style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(240,240,250,.4)", marginBottom: 10 }}>{s.n}</div>
                      <div className="hv-eyebrow" style={{ fontSize: 11, marginBottom: 12, color: "rgba(240,240,250,.55)" }}>{s.tag}</div>
                      <h3 style={{ fontSize: 22, lineHeight: 1.1, color: "#fff", margin: "0 0 14px", letterSpacing: 0 }}>{s.title}</h3>
                      <p style={{ fontSize: 14.5, color: "rgba(240,240,250,.5)", fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PANEL 4 · TECNOLOGÍA ───────────────────────── */}
            <section style={{ background: "#050505", borderTop: "1px solid rgba(240,240,250,.08)", padding: "120px 0" }}>
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 0.8fr) 1.2fr", gap: 70, alignItems: "start" }}>
                  <div>
                    {eyebrow("Núcleo tecnológico")}
                    <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.0, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 22px" }}>
                      Hardware<br />biología · IA
                    </h2>
                    <p style={{ fontSize: 15.5, color: "rgba(240,240,250,.55)", fontWeight: 300, lineHeight: 1.65, margin: "0 0 28px", maxWidth: 360 }}>
                      Cada unidad integra el mismo stack, sin importar la escala.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {project.stack.map((t, i) => (
                        <span key={i} style={{ padding: "6px 14px", border: "1px solid rgba(240,240,250,.18)", borderRadius: 2, fontSize: 12, letterSpacing: ".05em", color: "rgba(240,240,250,.6)", textTransform: "uppercase" }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {project.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 4px", borderBottom: "1px solid rgba(240,240,250,.1)" }}>
                        <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(240,240,250,.35)", width: 28, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: 16, color: "rgba(240,240,250,.85)", fontWeight: 300, lineHeight: 1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 5 · RECONOCIMIENTOS ──────────────────── */}
            <section id="reconocimientos" style={{ background: "#000", borderTop: "1px solid rgba(240,240,250,.08)", padding: "120px 0" }}>
              <div className="container">
                <div style={{ maxWidth: 720, marginBottom: 64 }}>
                  {eyebrow("Reconocimiento internacional")}
                  <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", lineHeight: 1.0, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 18px" }}>
                    Premiado en<br />tres continentes
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(240,240,250,.6)", fontWeight: 300, lineHeight: 1.6, margin: 0, maxWidth: 540 }}>
                    De Polonia a Canadá y Rumania — reconocido por jurados internacionales de innovación y agrotecnología.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0 }}>
                  {awards.map((a, i) => {
                    const c = medalAccent[a.medal];
                    return (
                      <div key={i} className="hv-col" style={{ padding: "26px 26px 30px", borderTop: `2px solid ${c}`, borderLeft: "1px solid rgba(240,240,250,.1)", borderRight: i === awards.length - 1 ? "1px solid rgba(240,240,250,.1)" : "none", minHeight: 220 }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
                          <span style={{ fontSize: 30, fontWeight: 600, color: "#fff", fontFamily: SX_FONT, letterSpacing: "-0.02em" }}>{a.year}</span>
                          <span style={{ fontSize: 22 }}>{a.flag}</span>
                        </div>
                        <h3 style={{ fontSize: 16, lineHeight: 1.25, color: "#fff", margin: "0 0 12px", letterSpacing: 0 }}>{a.title}</h3>
                        <div style={{ fontSize: 13, color: "rgba(240,240,250,.55)", fontWeight: 300, marginBottom: 4 }}>{a.event}</div>
                        <div style={{ fontSize: 13, color: "rgba(240,240,250,.4)", fontWeight: 300 }}>{a.place}</div>
                        {a.note && <div style={{ marginTop: 14, fontSize: 12.5, color: c, fontWeight: 300, lineHeight: 1.45 }}>{a.note}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── PANEL 6 · ORIGEN ───────────────────────────── */}
            <section style={{ background: "#050505", borderTop: "1px solid rgba(240,240,250,.08)", padding: "120px 0" }}>
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "start" }}>
                  <div>
                    {eyebrow("Origen")}
                    <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.0, letterSpacing: "-0.01em", color: "#fff", margin: "0 0 24px" }}>
                      Nacido en el<br />Politécnico
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(240,240,250,.6)", fontWeight: 300, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 500 }}>
                      {project.descripcion}
                    </p>
                    <p style={{ fontSize: 16, color: "rgba(240,240,250,.85)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.6, margin: "0 0 10px", maxWidth: 500, borderLeft: "2px solid rgba(240,240,250,.3)", paddingLeft: 18 }}>
                      "Este invernadero emplea elementos y conceptos de electrónica, acompañado de planteamientos de termodinámica en un pequeño espacio controlado a presión atmosférica."
                    </p>
                    <div style={{ fontSize: 12, color: "rgba(240,240,250,.45)", letterSpacing: ".08em", paddingLeft: 20, textTransform: "uppercase" }}>— Emmanuel Campos Genaro</div>
                  </div>

                  <div style={{ borderLeft: "1px solid rgba(240,240,250,.12)", paddingLeft: 40 }}>
                    <div className="hv-eyebrow" style={{ fontSize: 11, marginBottom: 8 }}>Institución</div>
                    <div style={{ fontSize: 17, color: "#fff", fontWeight: 400, marginBottom: 34, lineHeight: 1.4 }}>{project.institution}</div>
                    <div className="hv-eyebrow" style={{ fontSize: 11, marginBottom: 18 }}>Equipo creador</div>
                    {(project.creators ?? []).map((name, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid rgba(240,240,250,.08)" }}>
                        <span style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(240,240,250,.35)" }}>{String(i + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: 16, color: "rgba(240,240,250,.8)", fontWeight: 300 }}>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── PANEL 7 · CTA ──────────────────────────────── */}
            <section style={{ position: "relative", minHeight: "82vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000" }}>
              <img src={PROD} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.22 }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,.55), #000 75%)" }} />
              <div className="container" style={{ position: "relative", textAlign: "center" }}>
                {eyebrow("Harvestt · 2017 — 2026")}
                <h2 style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", lineHeight: 0.98, letterSpacing: "-0.01em", color: "#fff", margin: "0 auto 26px", maxWidth: 900 }}>
                  El futuro de la comida<br />se cultiva hoy
                </h2>
                <p style={{ fontSize: 16.5, color: "rgba(240,240,250,.6)", fontWeight: 300, maxWidth: 520, margin: "0 auto 38px", lineHeight: 1.65 }}>
                  Agrotecnología, cultivo inteligente y seguridad alimentaria — a la escala que imagines.
                </p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <SxButton to="/contact" label="Contactar" variant="fill" />
                  <SxButton to="/proyectos" label="Volver a proyectos" variant="line" arrow={false} />
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

export default HarvesttDetailPage;
