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
  if (href !== undefined) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (to.startsWith("#")) {
    return (
      <a className={cls} href={to}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} to={to}>
      {children}
    </Link>
  );
};

export default CtaButton;
