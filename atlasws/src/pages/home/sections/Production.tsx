import React from "react";
import { Band } from "../../../components/mst/Band";
import { StatRow } from "../../../components/mst/StatRow";
import { HomeDict } from "../../../i18n/types";

export const Production: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { production } = dict;
  return (
    <Band n="05" kicker={production.kicker} title={production.title}>
      <p className="mst-meta">{production.lead}</p>
      <figure className="mst-figure">
        <img
          src="/images/home/atlasone-metrics-crop.webp"
          alt={production.figureAlt}
          width={1230}
          height={260}
          loading="lazy"
        />
        <figcaption>{production.figureCaption}</figcaption>
      </figure>
      <StatRow stats={production.stats} source={production.source} />
    </Band>
  );
};
