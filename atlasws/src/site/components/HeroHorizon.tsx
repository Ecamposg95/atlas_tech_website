import React from "react";
import "./hero-horizon.css";

// Portada del Home: el amanecer visto desde órbita. Es el motivo de la marca (luz en el
// horizonte) llevado a pantalla completa y hecho solo con CSS y SVG: no depende de una
// fotografía, así que no se recorta mal en ningún tamaño de pantalla.
// Capas, de atrás hacia delante: estrellas, contraluz índigo, sol, cuerpo del planeta
// (con relieve), borde iluminado y destello. Decorativa: el contenido va encima.

// Estrellas deterministas (misma posición en cada render y en las pruebas).
const STARS = (() => {
  let s = 20161;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: 110 }, () => ({
    x: +(rnd() * 100).toFixed(2),
    y: +(rnd() * 100).toFixed(2),
    r: +(0.35 + rnd() * 0.75).toFixed(2),
    o: +(0.25 + rnd() * 0.6).toFixed(2),
  }));
})();

const HeroHorizon: React.FC = () => (
  <div className="epic" data-testid="hero-horizon" aria-hidden="true">
    <svg className="epic__stars" viewBox="0 0 100 100" preserveAspectRatio="none">
      {STARS.map((st, i) => (
        <ellipse key={i} cx={st.x} cy={st.y} rx={st.r * 0.06} ry={st.r * 0.1} fill="#f5f2ee" opacity={st.o} />
      ))}
    </svg>
    <div className="epic__counter" />
    <div className="epic__orbit">
      <div className="epic__arm">
        <div className="epic__sun" />
      </div>
      <div className="epic__body">
        <svg className="epic__terrain" viewBox="0 0 1600 520" preserveAspectRatio="none">
          <filter id="epic-relief" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.016" numOctaves="5" seed="11" />
            <feDiffuseLighting surfaceScale="10" diffuseConstant="1.15" lightingColor="#ffb27a">
              <feDistantLight azimuth="290" elevation="9" />
            </feDiffuseLighting>
          </filter>
          <rect width="1600" height="520" filter="url(#epic-relief)" />
        </svg>
      </div>
      <div className="epic__rim" />
      <div className="epic__arm">
        <div className="epic__flare" />
      </div>
    </div>
    <div className="epic__fade" />
  </div>
);

export default HeroHorizon;
