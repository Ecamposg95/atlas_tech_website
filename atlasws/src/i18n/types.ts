export type Lang = "es" | "en";

export interface HomeDict {
  lang: Lang;
  nav: {
    home: string; about: string; services: string; projects: string; contact: string;
    menu: string; langLabel: string;
  };
  hero: { title: string; lead: string; meta: string; cta: string; ctaHref: string };
  pattern: {
    kicker: string; title: string; industries: string[];
    symptomsLabel: string; symptoms: string[]; close: string;
  };
  thesis: {
    kicker: string; title: string;
    items: { n: string; title: string; body: string }[];
    close: string;
  };
  stack: {
    kicker: string; title: string; lead: string;
    layers: { n: string; label: string; name: string; modules: string[]; accent: boolean }[];
  };
  production: {
    kicker: string; title: string; lead: string;
    stats: { value: string; label: string }[];
    source: string; figureAlt: string; figureCaption: string;
  };
  ladder: { kicker: string; title: string; lead: string; steps: string[]; close: string };
  record: {
    kicker: string; title: string;
    left: { label: string; title: string; items: string[] };
    right: { label: string; title: string; items: string[] };
    poster: string;
  };
  horizons: {
    kicker: string; title: string;
    items: { label: string; name: string; sub: string; body: string; status: string; dashed: boolean }[];
  };
  builders: {
    kicker: string; title: string; photoAlt: string; photoCaption: string;
    people: { name: string; areas: string }[];
    awards: string; close: string;
  };
  contact: {
    kicker: string; title: string; lead: string;
    fields: { name: string; email: string; org: string; message: string };
    submit: string; sending: string; sent: string; error: string;
    sideEmail: string; sideWhatsapp: string; sideBase: string;
    email: string; whatsappHref: string; whatsappLabel: string; base: string;
  };
  footer: { base: string; rights: string; instagram: string; facebook: string };
}
