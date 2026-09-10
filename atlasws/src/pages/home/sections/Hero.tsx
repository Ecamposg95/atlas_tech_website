import React from "react";
import { ArrowUpRight } from "lucide-react";
import { HomeDict } from "../../../i18n/types";

export const Hero: React.FC<{ dict: HomeDict }> = ({ dict }) => (
  <section id="s01" className="mst-band mst-hero" aria-labelledby="s01-title">
    <div className="mst-hero-bg" aria-hidden="true">
      <img
        src="/images/home/hero-datacenter.webp"
        alt=""
        width={1672}
        height={941}
        fetchPriority="high"
        decoding="async"
      />
    </div>
    <div className="mst-wrap">
      <p className="mst-kicker"><span className="mst-kicker-n">01</span> · Atlas Tech · MMXXVI</p>
      <h1 id="s01-title" className="mst-hero-title">
        <span className="mst-hero-line">{dict.hero.title}</span>
      </h1>
      <p className="mst-lead">{dict.hero.lead}</p>
      <p className="mst-meta">{dict.hero.meta}</p>
      <a className="btn btn-primary" href={dict.hero.ctaHref} target="_blank" rel="noopener noreferrer">
        {dict.hero.cta} <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
    <hr className="hr mst-band-rule" />
  </section>
);
