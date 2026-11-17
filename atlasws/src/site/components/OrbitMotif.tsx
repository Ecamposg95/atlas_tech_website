import React from "react";

// Motivo de la identidad: órbitas finas y un punto lima (el agente en ejecución).
// Decorativo. La rotación se apaga con prefers-reduced-motion (ver site-frame.css).
const OrbitMotif: React.FC<{ size?: number; className?: string }> = ({ size = 420, className }) => (
  <svg
    data-testid="orbit-motif"
    aria-hidden="true"
    className={["orbit", className].filter(Boolean).join(" ")}
    viewBox="0 0 400 400"
    width={size}
    height={size}
    fill="none"
  >
    <circle cx="200" cy="200" r="198" stroke="#2c2c2c" />
    <circle cx="200" cy="200" r="140" stroke="#262626" />
    <circle cx="200" cy="200" r="82" stroke="#222222" strokeDasharray="2 6" />
    <g className="orbit__ring orbit__ring--slow">
      <circle cx="200" cy="2" r="3" fill="#8a8a8a" />
      <circle cx="398" cy="200" r="2" fill="#555" />
    </g>
    <g className="orbit__ring orbit__ring--mid">
      <circle cx="200" cy="60" r="2.5" fill="#f2f2f2" />
      <circle cx="78.8" cy="270" r="2" fill="#666" />
    </g>
    <g className="orbit__ring orbit__ring--fast">
      <circle className="orbit__dot" cx="282" cy="200" r="5" fill="#C6FF3D" />
    </g>
    <circle cx="200" cy="200" r="2" fill="#f2f2f2" />
  </svg>
);

export default OrbitMotif;
