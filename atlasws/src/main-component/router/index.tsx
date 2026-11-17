import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WowInit from "../../components/wowInit/wowInit";
import SeoRouter from "../../seo/SeoRouter";
import ScrollToTop from "./ScrollToTop";

// Páginas del sitio (identidad NOIR)
import HomePage from "../../site/pages/HomePage";
import CortexPage from "../../site/pages/CortexPage";
import AtlasOnePage from "../../site/pages/AtlasOnePage";
import PortfolioPage from "../../site/pages/PortfolioPage";
import NosotrosPage from "../../site/pages/NosotrosPage";
import ContactoPage from "../../site/pages/ContactoPage";
import ErrorPage from "../ErrorPage/ErrorPage";

// Detalles del portafolio (conservan su estética propia)
import HarvesttDetailPage from "../ProjectsPage/HarvesttDetailPage";
import SigmaDetailPage from "../ProjectsPage/SigmaDetailPage";
import OpenCashbackDetailPage from "../ProjectsPage/OpenCashbackDetailPage";

// Direcciones anteriores → nuevas. Las mismas reglas viven como 301 en public/.htaccess.
const REDIRECTS: [string, string][] = [
  ["/home", "/"],
  ["/about", "/nosotros"],
  ["/contact", "/contacto"],
  ["/service", "/cortex"],
  ["/service-details", "/cortex"],
  ["/proyectos", "/portafolio"],
  ["/proyectos/atlas-one", "/atlas-one"],
];

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cortex" element={<CortexPage />} />
    <Route path="/atlas-one" element={<AtlasOnePage />} />
    <Route path="/portafolio" element={<PortfolioPage />} />
    <Route path="/nosotros" element={<NosotrosPage />} />
    <Route path="/contacto" element={<ContactoPage />} />

    <Route path="/proyectos/harvestt" element={<HarvesttDetailPage />} />
    <Route path="/proyectos/sigma" element={<SigmaDetailPage />} />
    <Route path="/proyectos/open-cashback" element={<OpenCashbackDetailPage />} />

    {REDIRECTS.map(([from, to]) => (
      <Route key={from} path={from} element={<Navigate to={to} replace />} />
    ))}

    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

const AllRoute: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <WowInit />
      <ScrollToTop />
      <SeoRouter />
      <AppRoutes />
    </BrowserRouter>
  </div>
);

export default AllRoute;
