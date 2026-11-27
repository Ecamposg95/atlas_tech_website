import React from "react";
import { Link } from "react-router-dom";
import { NAV, AtlasMark, Lockup } from "./SiteHeader";
import { EMAIL, WA_NUMBER } from "../lib/whatsapp";

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/atlas_tech.mx/" },
  { label: "Facebook", href: "https://www.facebook.com/share/1MBcRaVy8t/?mibextid=wwXIfr" },
  { label: "WhatsApp", href: `https://wa.me/${WA_NUMBER}` },
];

const SiteFooter: React.FC = () => (
  <footer className="site-footer">
    <div className="wrap site-footer__grid">
      <div className="site-footer__brand">
        <Link to="/" className="site-header__brand" aria-label="Atlas Tech, inicio">
          <AtlasMark />
          <Lockup />
        </Link>
        <p>Ingeniería para el futuro de las organizaciones. Sistemas agénticos, Atlas ONE y Atlas Cortex, desde Ciudad de México.</p>
      </div>

      <nav aria-label="Pie de página" className="site-footer__col">
        <span className="mono site-footer__title">Sitio</span>
        {NAV.map((n) => (
          <Link key={n.to} to={n.to}>
            {n.label}
          </Link>
        ))}
        <Link to="/contacto">Contacto</Link>
      </nav>

      <div className="site-footer__col">
        <span className="mono site-footer__title">Contacto</span>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        {SOCIAL.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </div>
    <div className="wrap site-footer__legal mono">
      <span>ATLAS TECH / FRONTIER TECHNOLOGY</span>
      <span>Ciudad de México · Desde 2016</span>
    </div>
  </footer>
);

export default SiteFooter;
