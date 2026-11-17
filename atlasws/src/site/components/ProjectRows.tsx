import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projects";

// Lista editorial del portafolio (Home y /portafolio). Cada fila es un enlace.
const ProjectRows: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <ul className="rows">
    {projects.map((p) => (
      <li key={p.slug} data-testid="portfolio-card">
        <Link to={`/proyectos/${p.slug}`} className="rows__link">
          <span className="rows__name">{p.titulo}</span>
          <span className="rows__desc">{p.subtitulo}</span>
          <span className="rows__meta mono">{p.categoria}</span>
          <span className="rows__state mono">{p.estado}</span>
        </Link>
      </li>
    ))}
  </ul>
);

export default ProjectRows;
