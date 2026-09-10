import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Builders: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { builders } = dict;
  return (
    <Band n="09" kicker={builders.kicker} title={builders.title}>
      <figure className="grayscale mst-figure">
        <img
          src="/images/home/founders-intarg-2017.webp"
          alt={builders.photoAlt}
          width={1600}
          height={700}
          loading="lazy"
          style={{ objectFit: "cover", objectPosition: "50% 45%" }}
        />
        <figcaption>{builders.photoCaption}</figcaption>
      </figure>
      <Grid cols={3}>
        {builders.people.map((p) => (
          <div key={p.name}>
            <h3 className="mst-person-name">{p.name}</h3>
            <p className="mst-person-areas">{p.areas}</p>
          </div>
        ))}
      </Grid>
      <p className="mst-awards">{builders.awards}</p>
      <p className="mst-close">{builders.close}</p>
    </Band>
  );
};
