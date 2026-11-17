import React from "react";

type Variant = "horizon" | "beam" | "glow" | "close";

const MARK = (
  <svg className="atmo__mark" viewBox="0 0 375.71 340" aria-hidden="true">
    <g fill="currentColor">
      <polygon points="252.36 236.3 195.47 110.84 140.66 236.21 98.8 235.8 174.88 71.93 216.92 71.85 295.23 235.73 252.36 236.3" />
      <polygon points="235.1 264.18 156.85 264.18 169.04 236.37 222.59 236.45 235.1 264.18" />
      <path d="M322.77,271.46c-5.63,7.02-12.31,13.43-18.68,19.74-31,30.74-75.65,46.25-119.14,44.73-92.04-3.23-164.14-80-162.22-171.68C24.29,89.2,76.26,23.61,149.63,4.95,164.96,1.05,180.47-.39,196.78.09c49.74,1.45,95.91,25.54,126.33,64.35,47.43,60.52,48.14,146.58-.34,207.02ZM285.77,268.38c61.55-58.4,56.66-157.12-9.84-209.36-54.27-42.64-132.41-38.36-181.82,10.11-54.43,53.4-55.5,140.38-2.56,195.07,52.52,54.26,139.28,56.32,194.22,4.19Z" />
    </g>
  </svg>
);

// Luz de Atlas Horizon, hecha solo con CSS (sin WebGL ni imágenes). Una fuente de luz por vista:
//   horizon — el motivo de la marca: arco iluminado con el logo sobre la línea (hero)
//   beam    — haz diagonal de ember a un toque frío de amanecer (statement / datos)
//   glow    — resplandor en una esquina (páginas de contenido)
//   close   — haz desde la derecha (cierre)
// Decorativa y estática. Va detrás del contenido, nunca detrás de texto pequeño.
const Atmosphere: React.FC<{ variant?: Variant }> = ({ variant = "glow" }) => (
  <div className={`atmo atmo--${variant}`} data-testid="atmosphere" aria-hidden="true">
    {variant === "horizon" && (
      <>
        <div className="atmo__arc" />
        <div className="atmo__ring" />
        {MARK}
      </>
    )}
    {(variant === "beam" || variant === "close") && <div className="atmo__beam" />}
    {variant === "glow" && <div className="atmo__glow" />}
  </div>
);

export default Atmosphere;
