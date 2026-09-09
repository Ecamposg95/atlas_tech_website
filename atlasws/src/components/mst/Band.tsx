import React from "react";

interface Props {
  n: string;
  kicker: string;
  title: string;
  id?: string;
  bleed?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/** Banda completa: kicker numerado, titular display, contenido, slot full-bleed y regla de 2px al cierre. */
export const Band: React.FC<Props> = ({ n, kicker, title, id, bleed, className = "", children }) => {
  const sectionId = id ?? `s${n}`;
  const titleId = `${sectionId}-title`;
  return (
    <section id={sectionId} className={`mst-band ${className}`.trim()} aria-labelledby={titleId}>
      <div className="mst-wrap">
        <p className="mst-kicker">
          <span className="mst-kicker-n">{n}</span> · {kicker}
        </p>
        <h2 id={titleId} className="mst-display">{title}</h2>
        {children}
      </div>
      {bleed}
      <hr className="hr mst-band-rule" />
    </section>
  );
};
