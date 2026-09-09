// ============================================================
// src/seo/resolveSeo.ts
// Resuelve los metadatos SEO de una ruta a partir de seo.config.json.
// Misma lógica que usa el inyector de build (scripts/seo-build.cjs),
// para que runtime y HTML estático coincidan.
// ============================================================
import seo from "./seo.config.json";
import { getProjectBySlug } from "../data/projects";

export interface ResolvedSeo {
  title: string;        // título final (ya con plantilla aplicada)
  description: string;
  canonical: string;    // URL absoluta
  image: string;        // URL absoluta
  type: string;
  keywords?: string;
  noindex: boolean;
  jsonld: unknown[];
  lang: string;         // "es" | "en"
  locale: string;       // "es_MX" | "en_US"
  alternates: { hreflang: string; href: string }[];
}

const SITE = seo.siteUrl.replace(/\/$/, "");

const abs = (pathOrUrl?: string): string => {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return SITE + (pathOrUrl.startsWith("/") ? pathOrUrl : "/" + pathOrUrl);
};

const applyTemplate = (title: string, isHome: boolean): string =>
  isHome ? title : seo.titleTemplate.replace("%s", title);

// Reemplaza {siteUrl} dentro de los objetos JSON-LD
const hydrateJsonld = (nodes: unknown[] | undefined): unknown[] => {
  if (!nodes) return [];
  const raw = JSON.stringify(nodes).replace(/\{siteUrl\}/g, SITE);
  return JSON.parse(raw);
};

const langOf = (locale: string): string => locale.split(/[_-]/)[0].toLowerCase();

const alternatesOf = (map: Record<string, string> | undefined) =>
  map ? Object.entries(map).map(([hreflang, p]) => ({ hreflang, href: abs(p) })) : [];

const normalize = (pathname: string): string => {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
};

export function resolveSeo(pathname: string): ResolvedSeo {
  const path = normalize(pathname);
  const routes = seo.routes as any[];
  let route = routes.find((r) => r.path === path);

  // Fallback: rutas de proyecto no listadas explícitamente → datos del proyecto
  if (!route && path.startsWith("/proyectos/")) {
    const slug = path.replace("/proyectos/", "");
    const p = getProjectBySlug(slug);
    if (p) {
      route = {
        path,
        title: `${p.titulo} — ${p.subtitulo}`,
        description: p.descripcion.slice(0, 175),
        type: "website",
        image: seo.defaultImage,
        keywords: [p.titulo, p.categoria, ...(p.industrias ?? [])].join(", "),
      };
    }
  }

  const isHome = path === "/" || path === "/en";

  if (!route) {
    // Default genérico
    return {
      title: isHome ? routes[0].title : seo.brand,
      description: seo.organization.description,
      canonical: abs(path),
      image: abs(seo.defaultImage),
      type: "website",
      noindex: false,
      jsonld: [],
      lang: langOf(seo.locale),
      locale: seo.locale,
      alternates: [],
    };
  }

  return {
    title: applyTemplate(route.title, isHome),
    description: route.description,
    canonical: abs(route.path),
    image: abs(route.image || seo.defaultImage),
    type: route.type || "website",
    keywords: route.keywords,
    noindex: !!route.noindex,
    jsonld: hydrateJsonld(route.jsonld),
    lang: langOf(route.locale || seo.locale),
    locale: route.locale || seo.locale,
    alternates: alternatesOf(route.alternates),
  };
}

export const seoConfig = seo;
