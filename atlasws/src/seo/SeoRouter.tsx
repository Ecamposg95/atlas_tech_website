// ============================================================
// src/seo/SeoRouter.tsx
// Aplica los metadatos SEO al <head> en cada cambio de ruta.
// Sin dependencias externas (compatible con React 19): manipula el DOM.
// Mantiene el <title> y las meta correctos durante la navegación SPA;
// el HTML estático por ruta lo genera scripts/seo-build.cjs en el build.
// ============================================================
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveSeo, seoConfig } from "./resolveSeo";

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SeoRouter: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const s = resolveSeo(pathname);

    document.title = s.title;
    upsertMeta("name", "description", s.description);
    if (s.keywords) upsertMeta("name", "keywords", s.keywords);
    upsertMeta("name", "robots", s.noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", s.canonical);

    // Open Graph
    upsertMeta("property", "og:type", s.type);
    upsertMeta("property", "og:site_name", seoConfig.brand);
    upsertMeta("property", "og:title", s.title);
    upsertMeta("property", "og:description", s.description);
    upsertMeta("property", "og:url", s.canonical);
    upsertMeta("property", "og:image", s.image);
    upsertMeta("property", "og:locale", seoConfig.locale);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", s.title);
    upsertMeta("name", "twitter:description", s.description);
    upsertMeta("name", "twitter:image", s.image);
    if (seoConfig.twitter) upsertMeta("name", "twitter:site", seoConfig.twitter);

    // JSON-LD (datos estructurados): un único <script> gestionado por id
    const id = "seo-jsonld";
    document.getElementById(id)?.remove();
    if (s.jsonld && s.jsonld.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(s.jsonld.length === 1 ? s.jsonld[0] : s.jsonld);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};

export default SeoRouter;
