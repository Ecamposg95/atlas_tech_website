import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import CtaButton from "../components/CtaButton";
import Atmosphere from "../components/Atmosphere";
import { projects } from "../../data/projects";
import "./pages.css";
import "./OtherPages.css";

const PortfolioPage: React.FC = () => (
  <SiteLayout>
    <section className="page-head">
      <div className="wrap">
        <h1>Portafolio</h1>
        <p className="lead">
          Proyectos que hemos construido además de Cortex y Atlas ONE: inteligencia ciberfísica, gobierno digital y
          lealtad programable. Las implementaciones a la medida para empresas son Atlas Solutions. Cada proyecto dice
          en qué etapa está.
        </p>
      </div>
    </section>

    <section className="wrap portfolio">
      {projects.map((p) => (
        <article className="portfolio__item" data-testid="portfolio-card" key={p.slug}>
          <div className="portfolio__meta mono">
            <span>{p.categoria}</span>
            <span>{p.año}</span>
            <span className="portfolio__state">{p.estado}</span>
          </div>
          <div className="portfolio__body">
            <h2>
              <Link to={`/proyectos/${p.slug}`}>{p.titulo}</Link>
            </h2>
            <div>
              <p className="lead">{p.subtitulo}</p>
              <p className="portfolio__tagline">{p.tagline}</p>
              {p.novedad && (
                <div className="portfolio__news">
                  <div className="portfolio__news-head">
                    <strong>{p.novedad.titulo}</strong>
                    <span className="status-tag">{p.novedad.estado}</span>
                  </div>
                  <p>{p.novedad.texto}</p>
                </div>
              )}
              <div className="portfolio__links">
                <Link to={`/proyectos/${p.slug}`} className="cta cta--secondary">
                  Ver el proyecto
                </Link>
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                    Plataforma en vivo
                  </a>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                    Código en GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>

    <section className="closing">
      <Atmosphere variant="close" />
      <div className="wrap">
        <h2>¿Tienes un proyecto que no cabe en una categoría?</h2>
        <p className="lead">Así empezaron varios de estos.</p>
        <div className="cta-row">
          <CtaButton to="/contacto">Agenda una llamada</CtaButton>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default PortfolioPage;
