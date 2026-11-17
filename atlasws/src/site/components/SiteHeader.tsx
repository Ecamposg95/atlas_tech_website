import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CtaButton from "./CtaButton";

export const NAV = [
  { label: "Cortex", to: "/cortex" },
  { label: "Atlas ONE", to: "/atlas-one" },
  { label: "Portafolio", to: "/portafolio" },
  { label: "Nosotros", to: "/nosotros" },
];

export const AtlasMark: React.FC<{ height?: number }> = ({ height = 30 }) => (
  <svg viewBox="0 0 375.71 340" aria-hidden="true" height={height}>
    <g fill="currentColor">
      <polygon points="252.36 236.3 195.47 110.84 140.66 236.21 98.8 235.8 174.88 71.93 216.92 71.85 295.23 235.73 252.36 236.3" />
      <polygon points="235.1 264.18 156.85 264.18 169.04 236.37 222.59 236.45 235.1 264.18" />
      <path d="M322.77,271.46c-5.63,7.02-12.31,13.43-18.68,19.74-31,30.74-75.65,46.25-119.14,44.73-92.04-3.23-164.14-80-162.22-171.68C24.29,89.2,76.26,23.61,149.63,4.95,164.96,1.05,180.47-.39,196.78.09c49.74,1.45,95.91,25.54,126.33,64.35,47.43,60.52,48.14,146.58-.34,207.02ZM285.77,268.38c61.55-58.4,56.66-157.12-9.84-209.36-54.27-42.64-132.41-38.36-181.82,10.11-54.43,53.4-55.5,140.38-2.56,195.07,52.52,54.26,139.28,56.32,194.22,4.19Z" />
    </g>
  </svg>
);

// Lockup de Atlas Horizon: "Atlas" (500) + segundo nombre (300, atenuado).
// Solo el producto protagonista de la página va en ember.
export const Lockup: React.FC<{ product?: string; lead?: boolean }> = ({ product, lead }) => (
  <span className="lockup">
    <span className="lockup__atlas">Atlas</span>{" "}
    <span className={lead ? "lockup__sub lockup__sub--lead" : "lockup__sub"}>{product ?? "Tech"}</span>
  </span>
);

const SiteHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Al navegar se cierra el menú móvil.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={"site-header" + (open ? " is-open" : "")}>
      <div className="site-header__bar">
        <Link to="/" className="site-header__brand" aria-label="Atlas Tech, inicio">
          <AtlasMark height={26} />
          <Lockup />
        </Link>

        <nav id="site-nav" className="site-header__nav" aria-label="Principal">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="site-header__link">
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <CtaButton to="/contacto" className="site-header__cta">
            Agenda una llamada
          </CtaButton>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menú
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
