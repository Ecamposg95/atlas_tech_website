import React from "react";
import { Grid } from "./Grid";

export interface Stat { value: string; label: string }

interface Props { stats: Stat[]; source: string }

/** Cifras destacadas. Regla de contenido: sin fuente, periodo y corte, la cifra no se publica. */
export const StatRow: React.FC<Props> = ({ stats, source }) => {
  if (!source.trim()) {
    throw new Error("StatRow: every published figure needs a source line (fuente · periodo · corte).");
  }
  const cols = (stats.length === 3 ? 3 : stats.length === 2 ? 2 : 4) as 2 | 3 | 4;
  return (
    <figure className="mst-stats">
      <Grid cols={cols}>
        {stats.map((s) => (
          <div key={s.label}>
            <span className="mst-stat-value">{s.value}</span>
            <span className="mst-stat-label">{s.label}</span>
          </div>
        ))}
      </Grid>
      <figcaption>{source}</figcaption>
    </figure>
  );
};
