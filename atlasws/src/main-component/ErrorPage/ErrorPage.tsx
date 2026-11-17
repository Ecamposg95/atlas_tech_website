import React from "react";
import SiteLayout from "../../site/components/SiteLayout";
import CtaButton from "../../site/components/CtaButton";
import "../../site/pages/pages.css";

const ErrorPage: React.FC = () => (
  <SiteLayout>
    <section className="page-head">
      <div className="wrap">
        <div className="page-head__meta mono">
          <span>Error 404</span>
        </div>
        <h1>No encontramos esta página.</h1>
        <p className="lead">La dirección no existe o cambió de lugar. Desde el inicio llegas a todo el sitio.</p>
        <div className="cta-row">
          <CtaButton to="/">Volver al inicio</CtaButton>
          <CtaButton to="/contacto" variant="secondary">
            Agenda una llamada
          </CtaButton>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default ErrorPage;
