import React from "react";
import "../tokens.css";
import "./site-frame.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

// Header y footer del sitio para páginas que conservan su propia estética
// (detalles del portafolio). El envoltorio .noir usa display: contents para
// aportar los tokens sin crear una caja: así el header sigue siendo sticky.
export const ChromeHeader: React.FC = () => (
  <div className="noir noir--chrome">
    <SiteHeader />
  </div>
);

export const ChromeFooter: React.FC = () => (
  <div className="noir noir--chrome">
    <SiteFooter />
  </div>
);
