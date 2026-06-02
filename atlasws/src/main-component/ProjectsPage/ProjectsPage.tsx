import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import { projects } from "../../data/projects";

// ── Badge de estado ───────────────────────────────────────────
const StatusBadge: React.FC<{ estado: string }> = ({ estado }) => {
  const map: Record<string, { bg: string; color: string; dot: string }> = {
    "En desarrollo": { bg: "rgba(234,179,8,0.12)", color: "#ca8a04", dot: "#eab308" },
    Activo:          { bg: "rgba(34,197,94,0.12)",  color: "#16a34a", dot: "#22c55e" },
    Beta:            { bg: "rgba(168,85,247,0.15)", color: "#a855f7", dot: "#a855f7" },
    Completado:      { bg: "rgba(99,102,241,0.12)", color: "#6366f1", dot: "#6366f1" },
    Premiado:        { bg: "rgba(245,200,66,0.14)", color: "#d4a017", dot: "#f5c842" },
  };
  const s = map[estado] ?? map["Activo"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 999,
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      {estado}
    </span>
  );
};

// ── Tarjeta de proyecto ───────────────────────────────────────
const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  return (
    <Link to={`/proyectos/${project.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="atlas-project-card"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          overflow: "hidden",
          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
          cursor: "pointer",
          position: "relative",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 60px ${project.colorAccent}30, 0 0 0 1px ${project.colorAccent}30`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Hero gradient del card */}
        <div style={{
          height: 220, position: "relative", overflow: "hidden",
          background: `linear-gradient(135deg, #0f172a 0%, ${project.colorAccent}40 100%)`,
        }}>
          {/* Grid pattern */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />

          {/* Preset color dots */}
          {project.presets && (
            <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 6, flexWrap: "wrap", maxWidth: 120 }}>
              {project.presets.slice(0, 8).map((p, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: `linear-gradient(135deg, ${p.accent}, ${p.accent2})`,
                  boxShadow: `0 4px 12px ${p.accent}40`,
                  transform: `rotate(${(i % 3 - 1) * 2}deg)`,
                }} />
              ))}
            </div>
          )}

          {/* Número de orden */}
          <div style={{
            position: "absolute", bottom: 20, left: 24,
            fontFamily: "monospace", fontSize: 72, fontWeight: 700,
            color: "rgba(255,255,255,0.06)", lineHeight: 1, letterSpacing: -3,
            userSelect: "none",
          }}>
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Glow accent */}
          <div style={{
            position: "absolute", bottom: -40, left: -40,
            width: 200, height: 200, borderRadius: "50%",
            background: `radial-gradient(circle, ${project.colorAccent}50, transparent 70%)`,
            filter: "blur(40px)",
          }} />
        </div>

        {/* Contenido */}
        <div style={{ padding: "28px 28px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <StatusBadge estado={project.estado} />
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
              {project.año}
            </span>
          </div>

          <h3 style={{
            fontSize: 28, fontWeight: 800, color: "#fff",
            letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 8px",
          }}>
            {project.titulo}
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: "0 0 20px", lineHeight: 1.5 }}>
            {project.subtitulo}
          </p>

          {/* Stack tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {project.stack.slice(0, 4).map((tech, i) => (
              <span key={i} style={{
                padding: "3px 10px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999, fontSize: 11, color: "rgba(255,255,255,0.5)",
                fontFamily: "monospace",
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            color: project.colorAccent, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
          }}>
            <span>VER PROYECTO</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ── Página principal de proyectos ─────────────────────────────
const ProjectsPage: React.FC = () => {
  return (
    <Fragment>
      <div className="service-page inner-page">
        <div className="body_wrap">
          <Header />
          <main>
            {/* Hero */}
            <section style={{
              background: "linear-gradient(180deg, #0a0614 0%, #020617 100%)",
              paddingTop: 160, paddingBottom: 80,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0, opacity: 0.5,
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }} />
              <div style={{ position: "absolute", top: -200, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(147,51,234,0.2), transparent 70%)", filter: "blur(80px)" }} />

              <div className="container" style={{ position: "relative" }}>
                <div style={{ textAlign: "center", maxWidth: 740, margin: "0 auto" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "6px 16px", borderRadius: 999,
                    background: "rgba(147,51,234,0.12)", border: "1px solid rgba(147,51,234,0.25)",
                    marginBottom: 28,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9333ea", display: "inline-block", animation: "ping 1.5s infinite" }} />
                    <span style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                      Atlas Tech · Portafolio
                    </span>
                  </div>

                  <h1 style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800,
                    letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 24px", color: "#fff",
                  }}>
                    Lo que estamos<br />
                    <span style={{
                      backgroundImage: "linear-gradient(110deg, #fff 0%, #9333ea 55%, #a855f7 100%)",
                      WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                      construyendo.
                    </span>
                  </h1>
                  <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
                    Proyectos reales de IA y Blockchain en construcción para negocios en Latinoamérica.
                    Cada producto es una apuesta por digitalizar operaciones con tecnología de punta.
                  </p>
                </div>
              </div>
            </section>

            {/* Grid de proyectos */}
            <section style={{ background: "#020617", padding: "80px 0 120px" }}>
              <div className="container">
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                  gap: 28,
                }}>
                  {projects.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} />
                  ))}

                  {/* Placeholder "próximamente" */}
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.08)",
                    borderRadius: 20, minHeight: 360,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: 16, color: "rgba(255,255,255,0.2)",
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                    </svg>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Próximamente</div>
                      <div style={{ fontSize: 12, opacity: 0.6 }}>Nuevos proyectos en camino</div>
                    </div>
                  </div>
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

export default ProjectsPage;
