import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { getProjectBySlug, Award } from "../../data/projects";

const ACCENT = "#10B981";
const ACCENT2 = "#34D399";

// ── Estilo por tipo de medalla ────────────────────────────────
const medalStyle: Record<Award["medal"], { color: string; ring: string; icon: string; label: string }> = {
  gold:    { color: "#F5C842", ring: "rgba(245,200,66,0.35)",  icon: "🥇", label: "Oro" },
  silver:  { color: "#CBD5E1", ring: "rgba(203,213,225,0.30)", icon: "🥈", label: "Plata" },
  bronze:  { color: "#D69A6A", ring: "rgba(214,154,106,0.30)", icon: "🥉", label: "Bronce" },
  honor:   { color: "#A78BFA", ring: "rgba(167,139,250,0.30)", icon: "🎖️", label: "Honorífica" },
  special: { color: "#34D399", ring: "rgba(52,211,153,0.30)",  icon: "🏆", label: "Distinción" },
};

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Tarjeta de premio en la línea de tiempo ───────────────────
const AwardRow: React.FC<{ award: Award; last: boolean }> = ({ award, last }) => {
  const m = medalStyle[award.medal];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, position: "relative" }}>
      {/* Columna del eje */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
          background: "rgba(255,255,255,0.03)", border: `2px solid ${m.color}`,
          boxShadow: `0 0 0 6px ${m.ring}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
        }}>
          {m.icon}
        </div>
        {!last && <div style={{ flex: 1, width: 2, background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.03))", marginTop: 8, minHeight: 36 }} />}
      </div>

      {/* Contenido */}
      <div style={{ paddingBottom: last ? 0 : 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
          <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: m.color, letterSpacing: "0.08em" }}>{award.year}</span>
          <span style={{ padding: "2px 10px", borderRadius: 999, background: `${m.color}1f`, color: m.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {m.label}
          </span>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.2 }}>
          {award.title}
        </h3>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{award.event}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          <span style={{ fontSize: 16 }}>{award.flag}</span>
          <span>{award.place}</span>
        </div>
        {award.note && (
          <div style={{ marginTop: 10, padding: "8px 14px", borderLeft: `3px solid ${m.color}`, background: "rgba(255,255,255,0.03)", borderRadius: "0 8px 8px 0", fontSize: 13, color: "rgba(255,255,255,0.65)", fontStyle: "italic" }}>
            {award.note}
          </div>
        )}
      </div>
    </div>
  );
};

const HarvesttDetailPage: React.FC = () => {
  const project = getProjectBySlug("harvestt");
  if (!project) return <Navigate to="/proyectos" replace />;

  const awards = project.awards ?? [];

  return (
    <Fragment>
      <div className="service-page inner-page">
        <div className="body_wrap">
          <Header />
          <main>

            {/* ── HERO ───────────────────────────────────────── */}
            <section style={{
              background: "linear-gradient(180deg, #04140f 0%, #020617 100%)",
              paddingTop: 160, paddingBottom: 80, position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div style={{ position: "absolute", top: -200, right: -100, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}30, transparent 70%)`, filter: "blur(100px)" }} />
              <div style={{ position: "absolute", bottom: -100, left: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.15), transparent 70%)", filter: "blur(90px)" }} />

              <div className="container" style={{ position: "relative" }}>
                {/* Breadcrumb */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link>
                  <span>/</span>
                  <Link to="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>Proyectos</Link>
                  <span>/</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{project.titulo}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 40 }}>
                  <div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                      <span style={{ padding: "4px 14px", background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`, borderRadius: 999, fontSize: 11, color: ACCENT2, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {project.categoria}
                      </span>
                      <span style={{ padding: "4px 14px", background: "rgba(255,255,255,0.05)", borderRadius: 999, fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                        {project.año}
                      </span>
                      <span style={{ padding: "4px 14px", background: "rgba(245,200,66,0.14)", border: "1px solid rgba(245,200,66,0.3)", borderRadius: 999, fontSize: 11, color: "#f5c842", fontWeight: 700, letterSpacing: "0.08em" }}>
                        🏆 {awards.length} reconocimientos internacionales
                      </span>
                    </div>

                    <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.95, margin: "0 0 16px", color: "#fff" }}>
                      {project.titulo}.
                    </h1>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.55)", maxWidth: 620, lineHeight: 1.6, margin: "0 0 32px" }}>
                      {project.subtitulo}
                    </p>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <a href="#reconocimientos" style={{
                        display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, border: "none",
                        color: "#062014", fontSize: 13, fontWeight: 700, textDecoration: "none",
                        background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, boxShadow: `0 8px 24px ${ACCENT}40`,
                      }}>
                        🏆 Ver reconocimientos
                      </a>
                      <a href="#producto" style={{
                        display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, textDecoration: "none",
                        background: "rgba(255,255,255,0.05)",
                      }}>
                        Conocer el producto
                      </a>
                    </div>
                  </div>

                  {/* Tagline card */}
                  <div style={{ padding: "24px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, maxWidth: 300 }}>
                    <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>
                      Concepto
                    </div>
                    <div style={{ fontSize: 16, color: "#fff", fontStyle: "italic", lineHeight: 1.5 }}>
                      "{project.tagline}"
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SOBRE EL PROYECTO ──────────────────────────── */}
            <section style={{ background: "#020617", padding: "80px 0" }}>
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>
                      Sobre el proyecto
                    </div>
                    <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 24px" }}>
                      Cultivar con tecnología, en cualquier lugar.
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 24px" }}>
                      {project.descripcion}
                    </p>

                    {/* Cita IPN */}
                    <div style={{ padding: "18px 22px", borderLeft: `3px solid ${ACCENT}`, background: "rgba(16,185,129,0.06)", borderRadius: "0 10px 10px 0" }}>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 8px" }}>
                        "Este invernadero emplea elementos y conceptos de electrónica, acompañado de planteamientos de termodinámica en un pequeño espacio controlado a presión atmosférica."
                      </p>
                      <div style={{ fontSize: 12, color: ACCENT2, fontFamily: "monospace" }}>— Emmanuel Campos Genaro</div>
                    </div>
                  </div>

                  {/* Créditos / origen */}
                  <div>
                    <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>
                      Origen & equipo
                    </div>
                    <div style={{ padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }}>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Institución</div>
                      <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginBottom: 24, lineHeight: 1.4 }}>{project.institution}</div>

                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Equipo creador</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {(project.creators ?? []).map((name, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, color: "#062014", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                              {name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                            </div>
                            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── DOS LÍNEAS DE PRODUCTO ─────────────────────── */}
            <section id="producto" style={{ background: "#07090f", padding: "80px 0" }}>
              <div className="container">
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                    Líneas de producto
                  </div>
                  <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: 0 }}>
                    De la grow-box al invernadero geodésico.
                  </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
                  {/* Grow-box */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ height: 280, background: "#0b0f0d", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/images/projects/harvestt/harvestt-product.jpg" alt="Harvestt grow-box" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 28 }}>
                      <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: 999, background: `${ACCENT}1f`, color: ACCENT2, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Producto · 2018</div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Grow-box inteligente</h3>
                      <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                        Electrodoméstico de cultivo indoor con A/C, iluminación LED full-spectrum, dispensador de nutrientes y visión por computadora. Germina y cultiva en casa con monitoreo por la app.
                      </p>
                    </div>
                  </div>

                  {/* Invernadero geodésico */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${ACCENT}30`, borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ height: 280, background: "#0b0f0d", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/images/projects/harvestt/geodesic-greenhouse.jpg" alt="Invernadero geodésico Harvestt" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    </div>
                    <div style={{ padding: 28 }}>
                      <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: 999, background: "rgba(245,200,66,0.14)", color: "#f5c842", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Visión 2026 · 🥇 iCAN</div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" }}>Invernadero geodésico modular</h3>
                      <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                        Domos geodésicos modulares y desplegables para seguridad alimentaria en condiciones adversas. Energías limpias, componentes reciclables y operación autónoma.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── FUNCIONALIDADES ────────────────────────────── */}
            <section style={{ background: "#020617", padding: "80px 0" }}>
              <div className="container">
                <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>
                  Tecnología incluida
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 40px" }}>
                  Hardware + IA en una sola plataforma.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 16 }}>
                  {project.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
                      <CheckIcon />
                      <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── ROADMAP DE RECONOCIMIENTOS ─────────────────── */}
            <section id="reconocimientos" style={{ background: "#07090f", padding: "90px 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -150, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,200,66,0.08), transparent 70%)", filter: "blur(80px)" }} />
              <div className="container" style={{ position: "relative" }}>
                <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
                  <div style={{ fontSize: 11, color: "#f5c842", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                    🏆 Reconocimiento internacional
                  </div>
                  <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                    Un proyecto premiado en 3 continentes.
                  </h2>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
                    De Polonia a Canadá y Rumania — Harvestt ha sido reconocido por jurados internacionales de innovación y agrotecnología.
                  </p>
                </div>

                <div style={{ maxWidth: 640, margin: "0 auto" }}>
                  {awards.map((a, i) => (
                    <AwardRow key={i} award={a} last={i === awards.length - 1} />
                  ))}
                </div>
              </div>
            </section>

            {/* ── STACK ──────────────────────────────────────── */}
            <section style={{ background: "#020617", padding: "80px 0" }}>
              <div className="container">
                <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                  Stack tecnológico
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                  Multidisciplinario por diseño.
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {project.stack.map((tech, i) => (
                    <span key={i} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 14, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", fontWeight: 600 }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA FINAL ──────────────────────────────────── */}
            <section style={{ background: "linear-gradient(180deg, #07090f 0%, #020617 100%)", padding: "80px 0 100px" }}>
              <div className="container" style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", margin: "0 0 20px" }}>
                  ¿Te interesa Harvestt?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
                  Hablemos de cultivo inteligente, agrotecnología y el futuro de la seguridad alimentaria.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link to="/contact" style={{ padding: "14px 32px", borderRadius: 10, border: "none", color: "#062014", fontSize: 14, fontWeight: 700, textDecoration: "none", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, boxShadow: `0 8px 32px ${ACCENT}40` }}>
                    Contactar →
                  </Link>
                  <Link to="/proyectos" style={{ padding: "14px 32px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.03)" }}>
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
