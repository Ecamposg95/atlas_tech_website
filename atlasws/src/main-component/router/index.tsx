import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WowInit from "../../components/wowInit/wowInit";
import SeoRouter from "../../seo/SeoRouter";

// ✅ Pages
import Homepage from "../HomePage";
import AboutPage from "../AboutPage/AboutPage";
import ServicePage from "../ServicePage/ServicePage";
import SeviceSinglePage from "../SeviceSinglePage/SeviceSinglePage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import ProjectDetailPage from "../ProjectsPage/ProjectDetailPage";
import HarvesttDetailPage from "../ProjectsPage/HarvesttDetailPage";
import SigmaDetailPage from "../ProjectsPage/SigmaDetailPage";
import OpenCashbackDetailPage from "../ProjectsPage/OpenCashbackDetailPage";
import ContactPage from "../ContactPage/ContactPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ScrollToTop from "./ScrollToTop";

// ✅ Router Component
const AllRoute: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <WowInit />
        <ScrollToTop />
        <SeoRouter />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Servicios */}
          <Route path="/service" element={<ServicePage />} />
          <Route path="/service-details" element={<SeviceSinglePage />} />

          {/* ✅ Proyectos data-driven (nueva sección) */}
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/proyectos/harvestt" element={<HarvesttDetailPage />} />
          <Route path="/proyectos/sigma" element={<SigmaDetailPage />} />
          <Route path="/proyectos/open-cashback" element={<OpenCashbackDetailPage />} />
          <Route path="/proyectos/:slug" element={<ProjectDetailPage />} />

          {/* Contacto */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Error */}
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
