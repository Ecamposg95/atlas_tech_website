import React from "react";
import { ArrowUpRight } from "lucide-react";
import { HomeDict } from "../../../i18n/types";

export const Hero: React.FC<{ dict: HomeDict }> = ({ dict }) => (
  <section id="s01" className="mst-band" aria-labelledby="s01-title">
    <div className="mst-wrap">
      <p className="mst-kicker"><span className="mst-kicker-n">01</span> · Atlas Tech · MMXXVI</p>
      <h1 id="s01-title" className="mst-hero-title">{dict.hero.title}</h1>
      <p className="mst-lead">{dict.hero.lead}</p>
      <p className="mst-meta">{dict.hero.meta}</p>
      <a className="btn btn-primary" href={dict.hero.ctaHref} target="_blank" rel="noopener noreferrer">
        {dict.hero.cta} <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
    <hr className="hr mst-band-rule" />
  </section>
);
