import React from "react";

// Solo los logos ya publicados (spec §7). SVG blancos en /public/images/brand/.
const BRANDS = [
  { src: "/images/brand/bjx-motors.svg", name: "BJX Motors" },
  { src: "/images/brand/syner-group.svg", name: "Syner Group" },
  { src: "/images/brand/oftavision.svg", name: "OftaVisión" },
  { src: "/images/brand/dasic.svg", name: "DASIC" },
  { src: "/images/brand/smart-site.svg", name: "Smart Site Company" },
  { src: "/images/brand/rmazh.svg", name: "R MAZH Comercializadora" },
  { src: "/images/brand/unam.svg", name: "UNAM" },
  { src: "/images/brand/ipn.svg", name: "Instituto Politécnico Nacional (IPN)" },
  { src: "/images/brand/cic-ipn.svg", name: "Centro de Investigación en Computación (IPN)" },
];

const ClientLogos: React.FC = () => (
  <ul className="logos">
    {BRANDS.map((b) => (
      <li key={b.name} className="logos__item">
        <img src={b.src} alt={b.name} loading="lazy" />
      </li>
    ))}
  </ul>
);

export default ClientLogos;
