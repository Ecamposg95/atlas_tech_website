import React from "react";

// Motivo único de la marca: el círculo del logo expandido en anillos concéntricos,
// un anillo activo en lima y nodos sobre el anillo exterior. Decorativo.
// La rotación lenta de los nodos se apaga con prefers-reduced-motion.
const RINGS = [330, 290, 250, 210, 170, 90];
const NODES: [number, number][] = [
  [350, 20],
  [583, 117],
  [680, 350],
  [583, 583],
  [350, 680],
  [117, 583],
  [20, 350],
  [117, 117],
];

const OrbitMotif: React.FC<{ size?: number; className?: string }> = ({ size = 420, className }) => (
  <svg
    data-testid="orbit-motif"
    aria-hidden="true"
    className={["orbit", className].filter(Boolean).join(" ")}
    viewBox="0 0 700 700"
    width={size}
    height={size}
    fill="none"
  >
    <g stroke="#242B33" strokeWidth="1.5">
      {RINGS.map((r) => (
        <circle key={r} cx="350" cy="350" r={r} />
      ))}
    </g>
    <circle cx="350" cy="350" r="130" stroke="#A8E024" strokeWidth="2" />
    <g className="orbit__ring" fill="#C6FF3D">
      {NODES.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />
      ))}
    </g>
    <g transform="translate(290 296) scale(0.3194)" fill="#F4F5F7">
      <polygon points="252.36 236.3 195.47 110.84 140.66 236.21 98.8 235.8 174.88 71.93 216.92 71.85 295.23 235.73 252.36 236.3" />
      <polygon points="235.1 264.18 156.85 264.18 169.04 236.37 222.59 236.45 235.1 264.18" />
      <path d="M322.77,271.46c-5.63,7.02-12.31,13.43-18.68,19.74-31,30.74-75.65,46.25-119.14,44.73-92.04-3.23-164.14-80-162.22-171.68C24.29,89.2,76.26,23.61,149.63,4.95,164.96,1.05,180.47-.39,196.78.09c49.74,1.45,95.91,25.54,126.33,64.35,47.43,60.52,48.14,146.58-.34,207.02ZM285.77,268.38c61.55-58.4,56.66-157.12-9.84-209.36-54.27-42.64-132.41-38.36-181.82,10.11-54.43,53.4-55.5,140.38-2.56,195.07,52.52,54.26,139.28,56.32,194.22,4.19Z" />
    </g>
  </svg>
);

export default OrbitMotif;
