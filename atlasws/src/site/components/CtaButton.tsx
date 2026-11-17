import React from "react";
import { Link } from "react-router-dom";

type Props = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
} & ({ to: string; href?: never } | { href: string; to?: never });

// `to` = ruta interna (o ancla #id); `href` = enlace externo en pestaña nueva.
const CtaButton: React.FC<Props> = ({ variant = "primary", children, className, to, href }) => {
  const cls = ["cta", `cta--${variant}`, className].filter(Boolean).join(" ");
  // La flecha es decorativa: no forma parte del nombre accesible del botón.
  const body = (
    <>
      <span>{children}</span>
      {variant === "primary" && (
        <span className="cta__arrow" aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );
  if (href !== undefined) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  if (to.startsWith("#")) {
    return (
      <a className={cls} href={to}>
        {body}
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      {body}
    </Link>
  );
};

export default CtaButton;
