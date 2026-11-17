import React from "react";

interface Props {
  label?: string;
  id?: string;
  testId?: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ label, id, testId, className, children }) => (
  <section id={id} data-testid={testId} className={["section", className].filter(Boolean).join(" ")}>
    <div className="wrap">
      {label && <div className="section__label">{label}</div>}
      {children}
    </div>
  </section>
);

export default Section;
