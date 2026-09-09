import React from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import { HomeDict, Lang } from "../../i18n/types";
import { homePath } from "../../i18n/useLang";
import { AtlasMark } from "./AtlasMark";

interface Props { dict: HomeDict; lang: Lang }

const LangToggle: React.FC<{ lang: Lang; label: string }> = ({ lang, label }) => (
  <nav className="seg" aria-label={label}>
    <Link className="seg-opt" to={homePath("es")} aria-current={lang === "es" ? "true" : undefined} lang="es">ES</Link>
    <Link className="seg-opt" to={homePath("en")} aria-current={lang === "en" ? "true" : undefined} lang="en">EN</Link>
  </nav>
);

export const MstHeader: React.FC<Props> = ({ dict, lang }) => {
  const links = [
    { to: "/about", label: dict.nav.about },
    { to: "/service", label: dict.nav.services },
    { to: "/proyectos", label: dict.nav.projects },
    { to: "/contact", label: dict.nav.contact },
  ];
  return (
    <header className="nav mst-nav">
      <Link to={homePath(lang)} className="nav-brand">
        <AtlasMark title="Atlas Tech" />
        <span>Atlas Tech</span>
      </Link>
      <nav className="mst-nav-links" aria-label={dict.nav.menu}>
        {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
      </nav>
      <LangToggle lang={lang} label={dict.nav.langLabel} />
      <details className="mst-nav-mobile">
        <summary aria-label={dict.nav.menu}><Menu size={18} aria-hidden="true" /> {dict.nav.menu}</summary>
        <div className="mst-nav-mobile-list">
          {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </div>
      </details>
    </header>
  );
};
