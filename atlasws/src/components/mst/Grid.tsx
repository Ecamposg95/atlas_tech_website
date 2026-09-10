import React from "react";

interface Props {
  cols: 2 | 3 | 4 | 6;
  as?: "div" | "ol" | "ul";
  className?: string;
  children: React.ReactNode;
}

/** Celdas de ancho igual separadas por reglas de 2px (ver home.css). */
export const Grid: React.FC<Props> = ({ cols, as = "div", className = "", children }) => {
  const Tag = as;
  const role = as === "ol" || as === "ul" ? "list" : undefined;
  return <Tag className={`mst-grid mst-grid-${cols} ${className}`.trim()} role={role}>{children}</Tag>;
};
