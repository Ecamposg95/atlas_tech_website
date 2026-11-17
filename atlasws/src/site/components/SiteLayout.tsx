import React from "react";
import "../tokens.css";
import "./site-frame.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

// Marco de todas las páginas nuevas: identidad .noir + header + main + footer.
const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="noir site">
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </div>
);

export default SiteLayout;
