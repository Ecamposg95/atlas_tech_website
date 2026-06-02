import React, { Fragment, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { getProjectBySlug } from "../../data/projects";
import { AtlasOneDemosPlayer } from "../../components/AtlasOneDemos/AtlasOneDemos";

// ── Componentes de UI internos ────────────────────────────────

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);



// ── Preset selector visual ─────────────────────────────────────
const PresetSelector: React.FC<{ presets: { name: string; accent: string; accent2: string; desc: string }[] }> = ({ presets }) => {
  const [active, setActive] = useState(0);
  const p = presets[active];

  return (
    <div>
      {/* Botones de preset */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {presets.map((preset, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer",
              background: active === i ? `linear-gradient(135deg, ${preset.accent}, ${preset.accent2})` : "rgba(255,255,255,0.06)",
              color: active === i ? "#fff" : "rgba(255,255,255,0.5)",
              fontSize: 12, fontWeight: 600, transition: "all 0.2s",
              boxShadow: active === i ? `0 4px 16px ${preset.accent}40` : "none",
            }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Preview del preset activo */}
      <div style={{
        padding: 28, borderRadius: 16,
        background: `linear-gradient(135deg, ${p.accent}20, ${p.accent2}10)`,
        border: `1px solid ${p.accent}40`,
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${p.accent}, ${p.accent2})`,
            boxShadow: `0 8px 24px ${p.accent}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 800, color: "#fff",
          }}>
            {String(active + 1).padStart(2, "0")}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Atlas One · {p.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{p.accent.toUpperCase()}</div>
          </div>
        </div>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
      </div>
    </div>
  );
};

// ── Página de detalle del proyecto ────────────────────────────
const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) return <Navigate to="/proyectos" replace />;

  return (
    <Fragment>
      <div className="service-page inner-page">
        <div className="body_wrap">
          <Header />
          <main>

            {/* ── HERO ───────────────────────────────────────── */}
            <section style={{
              background: `linear-gradient(180deg, #0a0614 0%, #020617 100%)`,
              paddingTop: 160, paddingBottom: 80,
              position: "relative", overflow: "hidden",
            }}>
              {/* Grid de fondo */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

              {/* Glow */}
              <div style={{ position: "absolute", top: -200, right: -100, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${project.colorAccent}30, transparent 70%)`, filter: "blur(100px)" }} />
              <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)", filter: "blur(80px)" }} />

              <div className="container" style={{ position: "relative" }}>
                {/* Breadcrumb */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                  <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link>
                  <span>/</span>
                  <Link to="/proyectos" style={{ color: "inherit", textDecoration: "none" }}>Proyectos</Link>
                  <span>/</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{project.titulo}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 40 }}>
                  <div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                      <span style={{ padding: "4px 14px", background: `${project.colorAccent}20`, border: `1px solid ${project.colorAccent}40`, borderRadius: 999, fontSize: 11, color: project.colorAccent, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {project.categoria}
                      </span>
                      <span style={{ padding: "4px 14px", background: "rgba(255,255,255,0.05)", borderRadius: 999, fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                        {project.año}
                      </span>
                    </div>

                    <h1 style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.95, margin: "0 0 16px", color: "#fff" }}>
                      {project.titulo}.
                    </h1>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.55)", maxWidth: 640, lineHeight: 1.6, margin: "0 0 32px" }}>
                      {project.subtitulo}
                    </p>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, textDecoration: "none",
                          background: "rgba(255,255,255,0.05)", transition: "all 0.2s",
                        }}>
                          <GithubIcon /> Ver Repositorio
                        </a>
                      )}
                      <a href="#demo" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "12px 24px", borderRadius: 10, border: "none",
                        color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none",
                        background: `linear-gradient(135deg, ${project.colorAccent}, ${project.colorAccent2})`,
                        boxShadow: `0 8px 24px ${project.colorAccent}40`, transition: "all 0.2s",
                      }}>
                        ▶ Ver Demo Interactiva
                      </a>
                    </div>
                  </div>

                  {/* Tagline card */}
                  <div style={{
                    padding: "24px 28px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16, maxWidth: 280,
                  }}>
                    <div style={{ fontSize: 11, color: project.colorAccent, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>
                      Concepto
                    </div>
                    <div style={{ fontSize: 16, color: "#fff", fontStyle: "italic", lineHeight: 1.5 }}>
                      "{project.tagline}"
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── DESCRIPCIÓN ────────────────────────────────── */}
            <section style={{ background: "#020617", padding: "80px 0" }}>
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#a855f7", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>
                      Sobre el proyecto
                    </div>
                    <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 24px" }}>
                      Software comercial que crece con el negocio.
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
                      {project.descripcion}
                    </p>
                  </div>

                  {/* Features checklist */}
                  <div>
                    <div style={{ fontSize: 11, color: "#a855f7", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>
                      Funcionalidades incluidas
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {project.features.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <CheckIcon />
                          <span style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── DEMO INTERACTIVA ───────────────────────────── */}
            <section id="demo" style={{ background: "#07090f", padding: "80px 0" }}>
              <div className="container">
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={{ fontSize: 11, color: project.colorAccent, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                    Demos Interactivas — Solo Front-end
                  </div>
                  <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                    Explora los Presets de Atlas One
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 600, margin: "0 auto" }}>
                    Interactúa con las diferentes pieles y pantallas de Atlas One. Selecciona una industria y cambia entre vistas de escritorio, tableta táctil o celular.
                  </p>
                </div>
                <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                  <AtlasOneDemosPlayer />
                </div>
              </div>
            </section>

            {/* ── PRESETS DE INDUSTRIA ───────────────────────── */}
            {project.presets && (
              <section style={{ background: "#020617", padding: "80px 0" }}>
                <div className="container">
                  <div style={{ marginBottom: 48 }}>
                    <div style={{ fontSize: 11, color: "#a855f7", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                      Configuraciones de industria
                    </div>
                    <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                      {project.presets.length} presets. Una sola plataforma.
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 560 }}>
                      El mismo sistema se adapta a distintos tipos de negocio. Cada preset tiene su paleta, iconografía y módulos activos.
                    </p>
                  </div>
                  <PresetSelector presets={project.presets} />
                </div>
              </section>
            )}

            {/* ── STACK TÉCNICO ──────────────────────────────── */}
            <section style={{ background: "#07090f", padding: "80px 0" }}>
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#a855f7", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                      Stack tecnológico
                    </div>
                    <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                      Construido con tecnología moderna.
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {project.stack.map((tech, i) => (
                        <span key={i} style={{
                          padding: "8px 18px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 10, fontSize: 14, color: "rgba(255,255,255,0.7)",
                          fontFamily: "monospace", fontWeight: 600,
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing card */}
                  {project.pricingDesde && (
                    <div style={{
                      padding: 40, borderRadius: 20,
                      background: `linear-gradient(135deg, ${project.colorAccent}15, ${project.colorAccent2}10)`,
                      border: `1px solid ${project.colorAccent}30`,
                    }}>
                      <div style={{ fontSize: 11, color: project.colorAccent, fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                        Precio de entrada
                      </div>
                      <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 16 }}>
                        {project.pricingDesde}
                      </div>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>
                        {project.pricingDesc}
                      </p>
                      <Link to="/contact" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "12px 24px", borderRadius: 10, border: "none",
                        color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none",
                        background: `linear-gradient(135deg, ${project.colorAccent}, ${project.colorAccent2})`,
                        boxShadow: `0 8px 24px ${project.colorAccent}40`,
                      }}>
                        Solicitar información →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ── ROADMAP DE IA ──────────────────────────────── */}
            <section style={{ background: "#08060F", padding: "80px 0" }}>
              <div className="container">
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={{ fontSize: 11, color: "#a855f7", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                    Atlas IA · Beta privada
                  </div>
                  <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                    IA útil, no decorativa.
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: 560, margin: "0 auto", fontSize: 15, lineHeight: 1.7 }}>
                    La inteligencia artificial se integra como apoyo práctico para entender ventas, inventario y oportunidades. Recomendaciones accionables — no magia.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, maxWidth: 960, margin: "0 auto" }}>
                  {[
                    { q: "¿Qué productos se están vendiendo menos?", hint: "↓ ventas vs. mes pasado", color: "#A78BFA" },
                    { q: "¿Qué día conviene comprar más inventario?", hint: "Predicción de demanda · 14 días", color: "#22D3EE" },
                    { q: "¿Qué clientes dejaron de venir?", hint: "Lista priorizada · WhatsApp", color: "#34D399" },
                    { q: "¿Qué colaborador genera más ventas?", hint: "Ranking por mes · comisión", color: "#FBBF24" },
                    { q: "¿Dónde se están generando pérdidas?", hint: "Comparativa SKU · sucursal", color: "#FB7185" },
                    { q: "¿Qué horario conviene reforzar staff?", hint: "Hora pico · sugerencia", color: "#A78BFA" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      padding: 24,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderLeft: `3px solid ${item.color}`,
                      borderRadius: 12,
                    }}>
                      <div style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", fontStyle: "italic", lineHeight: 1.4, marginBottom: 12 }}>
                        {item.q}
                      </div>
                      <div style={{ fontSize: 11, color: item.color, fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
                        ↳ {item.hint}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA FINAL ──────────────────────────────────── */}
            <section style={{ background: "#020617", padding: "80px 0 100px" }}>
              <div className="container" style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", margin: "0 0 20px" }}>
                  ¿Tu negocio necesita Atlas One?
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.7 }}>
                  Un mes gratis para validar en operación real. Sin presión, con acompañamiento.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link to="/contact" style={{
                    padding: "14px 32px", borderRadius: 10, border: "none",
                    color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none",
                    background: `linear-gradient(135deg, ${project.colorAccent}, ${project.colorAccent2})`,
                    boxShadow: `0 8px 32px ${project.colorAccent}40`,
                  }}>
                    Solicitar 1 mes gratis →
                  </Link>
                  <Link to="/proyectos" style={{
                    padding: "14px 32px", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, textDecoration: "none",
                    background: "rgba(255,255,255,0.03)",
                  }}>
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

export default ProjectDetailPage;
