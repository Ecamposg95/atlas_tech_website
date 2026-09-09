import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Thesis: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { thesis } = dict;
  return (
    <Band n="03" kicker={thesis.kicker} title={thesis.title}>
      <Grid cols={3} as="ol">
        {thesis.items.map((it) => (
          <li key={it.n}>
            <span className="mst-cell-n">{it.n}</span>
            <h3 className="mst-cell-title">{it.title}</h3>
            <p className="mst-cell-body">{it.body}</p>
          </li>
        ))}
      </Grid>
      <p className="mst-close">{thesis.close}</p>
    </Band>
  );
};
