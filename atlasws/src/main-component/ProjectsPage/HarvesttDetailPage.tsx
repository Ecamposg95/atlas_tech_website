import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { getProjectBySlug, Award } from "../../data/projects";

const EMERALD = "#10B981";
const EMERALD2 = "#34D399";
const CYAN = "#22D3EE";
const BG = "#04060B";

// ── Animaciones / estética global de la página ────────────────
const HarvesttStyles = () => (
  <style>{`
    @keyframes hv-fade-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
    @keyframes hv-glow    { 0%, 100% { opacity: .45; } 50% { opacity: .9; } }
    @keyframes hv-float   { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes hv-grid    { from { background-position: 0 0; } to { background-position: 0 44px; } }
    @keyframes hv-grad    { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
    @keyframes hv-scan    { 0% { transform: translateY(-120%); } 100% { transform: translateY(120%); } }
    @keyframes hv-twinkle { 0%, 100% { opacity: .15; } 50% { opacity: .7; } }
    @keyframes hv-spin    { to { transform: rotate(360deg); } }

    .hv-page { background: ${BG}; }
    .hv-up   { animation: hv-fade-up .9s cubic-bezier(.22,1,.36,1) both; }
    .hv-d1 { animation-delay: .05s; } .hv-d2 { animation-delay: .15s; }
    .hv-d3 { animation-delay: .28s; } .hv-d4 { animation-delay: .42s; } .hv-d5 { animation-delay: .56s; }

    .hv-grad-text {
      background: linear-gradient(110deg, #fff 0%, ${EMERALD2} 45%, ${CYAN} 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: hv-grad 6s linear infinite alternate;
    }
    .hv-stars {
      position: absolute; inset: 0;
      background-image:
        radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.7), transparent),
        radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,.5), transparent),
        radial-gradient(1.5px 1.5px at 40% 80%, rgba(52,211,153,.6), transparent),
        radial-gradient(1px 1px at 85% 25%, rgba(34,211,238,.6), transparent),
        radial-gradient(1px 1px at 12% 70%, rgba(255,255,255,.5), transparent),
        radial-gradient(1px 1px at 55% 15%, rgba(255,255,255,.4), transparent);
      background-repeat: no-repeat;
      animation: hv-twinkle 5s ease-in-out infinite;
    }
    .hv-scale-card { transition: transform .4s cubic-bezier(.22,1,.36,1), border-color .4s, box-shadow .4s; }
    .hv-scale-card:hover { transform: translateY(-8px); }
  `}</style>
);

// ── Iconos de línea (minimalistas) para las 3 escalas ─────────
const IconIndoor = ({ c = EMERALD2 }: { c?: string }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="10" width="24" height="30" rx="3" /><path d="M12 18h24M19 26v8M29 26v8" />
    <path d="M24 24c-2-3-5-3-5-3s0 3 2 4 3-1 3-1zM24 24c2-3 5-3 5-3s0 3-2 4-3-1-3-1z" />
  </svg>
);
const IconUrban = ({ c = EMERALD2 }: { c?: string }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 42h32" /><rect x="11" y="20" width="11" height="22" rx="1.5" /><rect x="26" y="10" width="11" height="32" rx="1.5" />
    <path d="M14 25h5M14 30h5M14 35h5M29 15h5M29 21h5M29 27h5M29 33h5" />
  </svg>
);
const IconSpace = ({ c = CYAN }: { c?: string }) => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="13" /><path d="M11 24h26M24 11v26M14.5 14.5l19 19M33.5 14.5l-19 19" />
    <path d="M16 31c3-2 13-2 16 0" opacity=".5" />
  </svg>
);

// ── Estilo por tipo de medalla ────────────────────────────────
const medalStyle: Record<Award["medal"], { color: string; ring: string; icon: string; label: string }> = {
  gold:    { color: "#F5C842", ring: "rgba(245,200,66,0.35)",  icon: "🥇", label: "Oro" },
  silver:  { color: "#CBD5E1", ring: "rgba(203,213,225,0.30)", icon: "🥈", label: "Plata" },
  bronze:  { color: "#D69A6A", ring: "rgba(214,154,106,0.30)", icon: "🥉", label: "Bronce" },
  honor:   { color: "#A78BFA", ring: "rgba(167,139,250,0.30)", icon: "🎖️", label: "Honorífica" },
  special: { color: "#34D399", ring: "rgba(52,211,153,0.30)",  icon: "🏆", label: "Distinción" },
};

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={EMERALD2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Una escala de la visión ───────────────────────────────────
const ScaleCard: React.FC<{
  n: string; tag: string; tagColor: string; title: string; desc: string; icon: React.ReactNode; accent: string;
}> = ({ n, tag, tagColor, title, desc, icon, accent }) => (
  <div className="hv-scale-card" style={{
    position: "relative", padding: "36px 30px 32px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: -30, right: -10, fontSize: 120, fontWeight: 800, fontFamily: "monospace", color: "rgba(255,255,255,0.03)", lineHeight: 1, userSelect: "none" }}>{n}</div>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${accent}, transparent)` }} />
    <div style={{ width: 72, height: 72, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(circle at 30% 30%, ${accent}22, rgba(255,255,255,0.02))`, border: `1px solid ${accent}33`, marginBottom: 22 }}>
      {icon}
    </div>
    <div style={{ display: "inline-block", padding: "3px 11px", borderRadius: 999, background: `${tagColor}1f`, color: tagColor, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>{tag}</div>
    <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 10px", lineHeight: 1.15 }}>{title}</h3>
    <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
  </div>
);

// ── Fila de premio en la línea de tiempo ──────────────────────
const AwardRow: React.FC<{ award: Award; last: boolean }> = ({ award, last }) => {
  const m = medalStyle[award.medal];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
          background: "rgba(255,255,255,0.03)", border: `2px solid ${m.color}`, boxShadow: `0 0 0 6px ${m.ring}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: m.color, fontWeight: 800,
        }}>
          <span style={{ fontSize: 24 }}>{m.icon}</span>
        </div>
        {!last && <div style={{ flex: 1, width: 2, background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.03))", marginTop: 8, minHeight: 36 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
          <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: m.color, letterSpacing: "0.08em" }}>{award.year}</span>
          <span style={{ padding: "2px 10px", borderRadius: 999, background: `${m.color}1f`, color: m.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.label}</span>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.2 }}>{award.title}</h3>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{award.event}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          <span style={{ fontSize: 16 }}>{award.flag}</span><span>{award.place}</span>
        </div>
        {award.note && (
          <div style={{ marginTop: 10, padding: "8px 14px", borderLeft: `3px solid ${m.color}`, background: "rgba(255,255,255,0.03)", borderRadius: "0 8px 8px 0", fontSize: 13, color: "rgba(255,255,255,0.65)", fontStyle: "italic" }}>{award.note}</div>
        )}
      </div>
    </div>
  );
};

// ── Eyebrow reutilizable ──────────────────────────────────────
const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = EMERALD2 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, color, fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>
    <span style={{ width: 28, height: 1, background: color, opacity: 0.6 }} />
    {children}
  </div>
);

const HarvesttDetailPage: React.FC = () => {
  const project = getProjectBySlug("harvestt");
  if (!project) return <Navigate to="/proyectos" replace />;
  const awards = project.awards ?? [];

  return (
    <Fragment>
      <div className="service-page inner-page hv-page">
        <div className="body_wrap">
          <Header />
          <HarvesttStyles />
          <main>

            {/* ── HERO ───────────────────────────────────────── */}
            <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: `radial-gradient(120% 80% at 50% -10%, #07261c 0%, ${BG} 55%)` }}>
              {/* Capas atmosféricas */}
              <div className="hv-stars" />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(120% 70% at 50% 30%, #000 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(120% 70% at 50% 30%, #000 30%, transparent 80%)", animation: "hv-grid 12s linear infinite" }} />
              <div style={{ position: "absolute", bottom: "-30%", left: "50%", transform: "translateX(-50%)", width: 900, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${EMERALD}33, transparent 65%)`, filter: "blur(90px)", animation: "hv-glow 7s ease-in-out infinite" }} />
              <div style={{ position: "absolute", top: "-15%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${CYAN}22, transparent 65%)`, filter: "blur(90px)", animation: "hv-glow 9s ease-in-out infinite" }} />
              {/* Planeta/curvatura inferior */}
              <div style={{ position: "absolute", bottom: "-62vw", left: "50%", transform: "translateX(-50%)", width: "150vw", height: "150vw", borderRadius: "50%", background: `radial-gradient(circle at 50% 0%, ${EMERALD}14, transparent 42%)`, border: `1px solid ${EMERALD}22`, boxShadow: `0 -2px 80px ${EMERALD}18` }} />

              <div className="container" style={{ position: "relative", paddingTop: 120, paddingBottom: 80, textAlign: "center" }}>
                {/* Breadcrumb */}
                <div className="hv-up hv-d1" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 34, fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link><span>/</span>
                  <Link to="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>Proyectos</Link><span>/</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{project.titulo}</span>
                </div>

                <div className="hv-up hv-d2" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 18px", borderRadius: 999, background: "rgba(16,185,129,0.10)", border: `1px solid ${EMERALD}30`, marginBottom: 36 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: EMERALD2, boxShadow: `0 0 10px ${EMERALD2}`, animation: "hv-glow 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, color: EMERALD2, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>AgroTech · IA · Premiado internacionalmente</span>
                </div>

                <h1 className="hv-up hv-d3" style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.9, margin: "0 0 24px" }}>
                  <span className="hv-grad-text">Harvestt</span>
                </h1>

                <p className="hv-up hv-d4" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)", color: "rgba(255,255,255,0.62)", maxWidth: 720, margin: "0 auto 14px", lineHeight: 1.5, fontWeight: 300 }}>
                  Cultivar en cualquier lugar — <span style={{ color: "#fff", fontWeight: 500 }}>del hogar a la órbita.</span>
                </p>
                <p className="hv-up hv-d4" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", letterSpacing: "0.12em", margin: "0 0 44px" }}>
                  Invernaderos indoor · Granjas verticales urbanas · Invernaderos espaciales
                </p>

                <div className="hv-up hv-d5" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="#vision" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, border: "none", color: "#04140d", fontSize: 13.5, fontWeight: 700, textDecoration: "none", background: `linear-gradient(135deg, ${EMERALD2}, ${CYAN})`, boxShadow: `0 10px 40px ${EMERALD}40` }}>
                    Explorar la visión ↓
                  </a>
                  <a href="#reconocimientos" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.75)", fontSize: 13.5, fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.04)" }}>
                    🏆 {awards.length} reconocimientos
                  </a>
                </div>
              </div>
            </section>

            {/* ── LA VISIÓN · 3 ESCALAS ──────────────────────── */}
            <section id="vision" style={{ background: BG, padding: "110px 0 100px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 300, background: `radial-gradient(circle, ${EMERALD}12, transparent 70%)`, filter: "blur(70px)" }} />
              <div className="container" style={{ position: "relative" }}>
                <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}><Eyebrow>Una visión, tres escalas</Eyebrow></div>
                  <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.08, margin: "0 0 18px" }}>
                    La misma tecnología, <span className="hv-grad-text">a cualquier escala.</span>
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
                    El ADN de Harvestt —cámara controlada, IA y energía limpia— escala desde una cocina hasta entornos extremos. Un solo sistema, tres horizontes.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
                  <ScaleCard n="01" tag="Hoy · Indoor" tagColor={EMERALD2} accent={EMERALD}
                    icon={<IconIndoor />} title="Invernaderos indoor"
                    desc="La grow-box doméstica: germina y cultiva en casa con clima, luz y nutrientes controlados por IA. La célula base de todo el sistema." />
                  <ScaleCard n="02" tag="Escalando · Urbano" tagColor="#7DD3FC" accent="#38BDF8"
                    icon={<IconUrban c="#7DD3FC" />} title="Granjas verticales urbanas"
                    desc="Módulos apilables que llevan el cultivo a la ciudad: producción local, fresca y sin pesticidas, junto al punto de consumo." />
                  <ScaleCard n="03" tag="Frontera · Espacial" tagColor={CYAN} accent={CYAN}
                    icon={<IconSpace />} title="Invernaderos espaciales"
                    desc="Domos geodésicos modulares y desplegables para seguridad alimentaria en condiciones extremas — de desiertos a hábitats fuera de la Tierra." />
                </div>
              </div>
            </section>

            {/* ── BANDA GEODÉSICA (cinematográfica) ──────────── */}
            <section style={{ position: "relative", overflow: "hidden", background: "#05080d" }}>
              <div style={{ position: "relative", minHeight: 460, display: "flex", alignItems: "center" }}>
                <img src="/images/projects/harvestt/geodesic-greenhouse.jpg" alt="Invernadero geodésico Harvestt" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%", opacity: 0.5 }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${BG} 8%, rgba(4,6,11,0.55) 55%, rgba(4,6,11,0.85) 100%)` }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${BG}, transparent 25%, transparent 75%, ${BG})` }} />
                <div className="container" style={{ position: "relative", padding: "80px 0" }}>
                  <div style={{ maxWidth: 560 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.3)", marginBottom: 22, fontSize: 11, color: "#f5c842", fontWeight: 700, letterSpacing: "0.1em" }}>
                      🥇 Invernadero Geodésico · iCAN
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 20px" }}>
                      Modular.<br />Desplegable.<br /><span className="hv-grad-text">Fuera de este mundo.</span>
                    </h2>
                    <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, maxWidth: 460 }}>
                      La visión 2026: domos geodésicos que se despliegan donde nada crece. Energías limpias, componentes reciclables y operación autónoma — innovación de procesos, preservando el presente, pensando en el futuro.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── TECNOLOGÍA / FUNCIONALIDADES ───────────────── */}
            <section style={{ background: BG, padding: "100px 0" }}>
              <div className="container">
                <Eyebrow>El núcleo tecnológico</Eyebrow>
                <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", margin: "0 0 8px", maxWidth: 720, lineHeight: 1.1 }}>
                  Hardware, biología y machine learning <span className="hv-grad-text">en una sola célula.</span>
                </h2>
                <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.45)", margin: "0 0 44px", maxWidth: 560, lineHeight: 1.6 }}>
                  Cada unidad Harvestt integra el mismo stack, sin importar la escala.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 14 }}>
                  {project.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                      <CheckIcon />
                      <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.74)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Stack chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 36 }}>
                  {project.stack.map((tech, i) => (
                    <span key={i} style={{ padding: "7px 16px", background: "rgba(255,255,255,0.03)", border: `1px solid ${EMERALD}22`, borderRadius: 999, fontSize: 12.5, color: "rgba(255,255,255,0.62)", fontFamily: "monospace" }}>{tech}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── ROADMAP DE RECONOCIMIENTOS ─────────────────── */}
            <section id="reconocimientos" style={{ background: "#05080d", padding: "100px 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 640, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,200,66,0.08), transparent 70%)", filter: "blur(80px)" }} />
              <div className="container" style={{ position: "relative" }}>
                <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 56px" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}><Eyebrow color="#f5c842">🏆 Reconocimiento internacional</Eyebrow></div>
                  <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", margin: "0 0 16px", lineHeight: 1.08 }}>
                    Premiado en <span className="hv-grad-text">3 continentes.</span>
                  </h2>
                  <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
                    De Polonia a Canadá y Rumania — reconocido por jurados internacionales de innovación y agrotecnología.
                  </p>
                </div>
                <div style={{ maxWidth: 640, margin: "0 auto" }}>
                  {awards.map((a, i) => (<AwardRow key={i} award={a} last={i === awards.length - 1} />))}
                </div>
              </div>
            </section>

            {/* ── ORIGEN / EQUIPO ────────────────────────────── */}
            <section style={{ background: BG, padding: "100px 0" }}>
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 70, alignItems: "center" }}>
                  <div>
                    <Eyebrow>Origen</Eyebrow>
                    <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 22px" }}>
                      Nacido en el Politécnico.
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 22px" }}>
                      {project.descripcion}
                    </p>
                    <div style={{ padding: "18px 22px", borderLeft: `3px solid ${EMERALD}`, background: "rgba(16,185,129,0.06)", borderRadius: "0 10px 10px 0" }}>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 8px" }}>
                        "Este invernadero emplea elementos y conceptos de electrónica, acompañado de planteamientos de termodinámica en un pequeño espacio controlado a presión atmosférica."
                      </p>
                      <div style={{ fontSize: 12, color: EMERALD2, fontFamily: "monospace" }}>— Emmanuel Campos Genaro</div>
                    </div>
                  </div>

                  <div style={{ padding: 30, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18 }}>
                    <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Institución</div>
                    <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginBottom: 26, lineHeight: 1.4 }}>{project.institution}</div>
                    <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Equipo creador</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {(project.creators ?? []).map((name, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${EMERALD}, ${CYAN})`, color: "#04140d", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                            {name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                          </div>
                          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CTA FINAL ──────────────────────────────────── */}
            <section style={{ position: "relative", overflow: "hidden", padding: "120px 0 130px", background: `radial-gradient(120% 100% at 50% 120%, #07261c 0%, ${BG} 60%)` }}>
              <div className="hv-stars" style={{ opacity: 0.6 }} />
              <div style={{ position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 800, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${EMERALD}26, transparent 65%)`, filter: "blur(90px)", animation: "hv-glow 8s ease-in-out infinite" }} />
              <div className="container" style={{ position: "relative", textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.045em", lineHeight: 1.05, margin: "0 0 22px" }}>
                  El futuro de la comida<br /><span className="hv-grad-text">se cultiva hoy.</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16.5, maxWidth: 540, margin: "0 auto 38px", lineHeight: 1.7 }}>
                  Hablemos de agrotecnología, cultivo inteligente y seguridad alimentaria — a la escala que imagines.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link to="/contact" style={{ padding: "15px 36px", borderRadius: 12, border: "none", color: "#04140d", fontSize: 14.5, fontWeight: 700, textDecoration: "none", background: `linear-gradient(135deg, ${EMERALD2}, ${CYAN})`, boxShadow: `0 12px 44px ${EMERALD}44` }}>
                    Contactar →
                  </Link>
                  <Link to="/proyectos" style={{ padding: "15px 36px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.62)", fontSize: 14.5, fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.03)" }}>
                    ← Volver a proyectos
                  </Link>
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
