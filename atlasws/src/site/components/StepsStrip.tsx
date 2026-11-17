import React from "react";
import type { Step } from "../content/cortex";

// La numeración es información: los pasos son una secuencia real.
const StepsStrip: React.FC<{ steps: Step[] }> = ({ steps }) => (
  <ol className="steps">
    {steps.map((s) => (
      <li className="steps__item" key={s.n}>
        <span className="steps__n">{s.n}</span>
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </li>
    ))}
  </ol>
);

export default StepsStrip;
