import { useLocation } from "react-router";
import { Lang, HomeDict } from "./types";
import { es } from "./es";
import { en } from "./en";

export const langFromPath = (pathname: string): Lang =>
  /^\/en(\/|$)/.test(pathname) ? "en" : "es";

export const homePath = (lang: Lang): string => (lang === "en" ? "/en" : "/");

export const dictFor = (lang: Lang): HomeDict => (lang === "en" ? en : es);

export const useLang = (): Lang => langFromPath(useLocation().pathname);
