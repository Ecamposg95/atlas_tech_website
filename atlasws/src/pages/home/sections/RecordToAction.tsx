import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const RecordToAction: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { record } = dict;
  const poster = (
    <div className="mst-poster">
      <div className="mst-wrap">
        <p lang="en">{record.poster}</p>
      </div>
    </div>
  );
  return (
    <Band n="07" kicker={record.kicker} title={record.title} bleed={poster} className="mst-band-poster">
      <Grid cols={2}>
        <div>
          <span className="mst-cell-n">{record.left.label}</span>
          <h3 className="mst-cell-title">{record.left.title}</h3>
          <ul className="mst-list">{record.left.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
        <div>
          <span className="mst-cell-n">{record.right.label}</span>
          <h3 className="mst-cell-title" style={{ color: "var(--color-accent-700)" }}>{record.right.title}</h3>
          <ul className="mst-list mst-list-accent">{record.right.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </Grid>
    </Band>
  );
};
