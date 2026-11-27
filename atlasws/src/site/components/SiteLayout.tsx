import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "../tokens.css";
import "./site-frame.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useReveal } from "../lib/motion";
import "./numbers.css";

// Marco de todas las páginas nuevas: identidad .noir + header + main + footer.
const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const root = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useReveal(root, pathname);
  return (
    <div className="noir site" ref={root}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
