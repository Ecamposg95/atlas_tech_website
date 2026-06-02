import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WowInit from "../../components/wowInit/wowInit";

// ✅ Pages
import Homepage from "../HomePage";
import AboutPage from "../AboutPage/AboutPage";
import ServicePage from "../ServicePage/ServicePage";
import SeviceSinglePage from "../SeviceSinglePage/SeviceSinglePage";
import ProjectPage from "../ProjectPage/ProjectPage";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import ProjectDetailPage from "../ProjectsPage/ProjectDetailPage";
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

        <Routes>
          {/* Home */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Servicios */}
          <Route path="/service" element={<ServicePage />} />
          <Route path="/service-details" element={<SeviceSinglePage />} />

          {/* Proyectos (legacy routes) */}
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project-details" element={<ProjectDetails />} />

          {/* ✅ Proyectos data-driven (nueva sección) */}
          <Route path="/proyectos" element={<ProjectsPage />} />
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
