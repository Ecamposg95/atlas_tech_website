import React from "react";
import { Band } from "../../../components/mst/Band";
import { HomeDict } from "../../../i18n/types";

export const Stack: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { stack } = dict;
  return (
    <Band n="04" kicker={stack.kicker} title={stack.title}>
      <p className="mst-meta">{stack.lead}</p>
      <div>
        {stack.layers.map((layer) => (
          <div key={layer.n} className={`mst-layer ${layer.accent ? "mst-layer-accent" : ""}`.trim()}>
            <div>
              <span className="mst-cell-n">{layer.label}</span>
              <h3 className="mst-layer-name">{layer.name}</h3>
            </div>
            <ul className="mst-modules" aria-label={layer.name}>
              {layer.modules.map((m) => (
                <li key={m} className={`tag ${layer.accent ? "tag-accent" : "tag-neutral"}`}>{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  );
};
