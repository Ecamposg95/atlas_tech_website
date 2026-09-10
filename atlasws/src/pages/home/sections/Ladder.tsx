import React from "react";
import { ArrowRight } from "lucide-react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Ladder: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { ladder } = dict;
  return (
    <Band n="06" kicker={ladder.kicker} title={ladder.title}>
      <p className="mst-lead">{ladder.lead}</p>
      <Grid cols={6} as="ol">
        {ladder.steps.map((step, i) => (
          <li key={step} className="mst-step">
            <span className="mst-cell-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="mst-step-label">{step}</span>
            {i < ladder.steps.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : null}
          </li>
        ))}
      </Grid>
      <p className="mst-close">{ladder.close}</p>
    </Band>
  );
};
