import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WowInit from "../../components/wowInit/wowInit";

// ✅ Home Pages
import Homepage from "../HomePage";
import AboutPage from "../AboutPage/AboutPage";

import ServicePage from "../ServicePage/ServicePage";
import SeviceSinglePage from "../SeviceSinglePage/SeviceSinglePage";


import ProjectPage from "../ProjectPage/ProjectPage";
import ProjectDetails from "../ProjectDetails/ProjectDetails";

import ScrollToTop from "./ScrollToTop";
import ContactPage from "../ContactPage/ContactPage";
import ErrorPage from "../ErrorPage/ErrorPage";

// ✅ Router Component
const AllRoute: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <WowInit />
        <ScrollToTop />

        <Routes>
          {/* ✅ Home Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/service" element={<ServicePage />} />
          <Route path="/service-details" element={<SeviceSinglePage />} />


          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project-details" element={<ProjectDetails />} />

          <Route path="/contact" element={<ContactPage />} />
          {/* ✅ Error Page */}
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
