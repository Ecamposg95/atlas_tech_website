import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Horizons: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { horizons } = dict;
  return (
    <Band n="08" kicker={horizons.kicker} title={horizons.title}>
      <Grid cols={3}>
        {horizons.items.map((h) => (
          <div key={h.name} className={h.dashed ? "mst-dashed" : undefined}>
            <span className="mst-cell-n">{h.label}</span>
            <h3 className="mst-cell-title">{h.name}</h3>
            <p className="mst-meta" style={{ marginBottom: "var(--space-2)" }}>{h.sub}</p>
            <p className="mst-cell-body">{h.body}</p>
            <p className="mst-cell-status"><span className="tag tag-neutral">{h.status}</span></p>
          </div>
        ))}
      </Grid>
    </Band>
  );
};
