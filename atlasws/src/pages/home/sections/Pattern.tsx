import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Pattern: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { pattern } = dict;
  const rows = [pattern.symptoms.slice(0, 3), pattern.symptoms.slice(3, 6)];
  return (
    <Band n="02" kicker={pattern.kicker} title={pattern.title}>
      <Grid cols={4}>
        {pattern.industries.map((i) => <h3 key={i} className="mst-cell-title">{i}</h3>)}
      </Grid>
      <p className="mst-kicker" style={{ marginTop: "var(--space-8)" }}>{pattern.symptomsLabel}</p>
      {rows.map((row, r) => (
        <Grid key={r} cols={3}>
          {row.map((s) => <p key={s} className="mst-cell-body">{s}</p>)}
        </Grid>
      ))}
      <p className="mst-close">{pattern.close}</p>
    </Band>
  );
};
