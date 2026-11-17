import React from "react";
import SiteLayout from "../components/SiteLayout";
import CtaButton from "../components/CtaButton";
import Atmosphere from "../components/Atmosphere";
import LeadForm from "../components/LeadForm";
import { CALL_MESSAGE, EMAIL, waLink } from "../lib/whatsapp";
import "./pages.css";
import "./OtherPages.css";

const ContactoPage: React.FC = () => (
  <SiteLayout>
    <section className="page-head">
      <Atmosphere variant="glow" />
      <div className="wrap split contacto">
        <div>
          <h1>Agenda una llamada</h1>
          <p className="lead">
            Cuéntanos qué proceso quieres automatizar. Te respondemos por WhatsApp para acordar el día y la hora, y te
            decimos con franqueza qué podemos ejecutar hoy.
          </p>
          <div className="cta-row">
            <CtaButton href={waLink(CALL_MESSAGE)}>Escríbenos por WhatsApp</CtaButton>
          </div>
          <dl className="contacto__data">
            <div>
              <dt className="mono">Correo</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="mono">WhatsApp</dt>
              <dd className="data">+52 722 149 5215</dd>
            </div>
            <div>
              <dt className="mono">Ubicación</dt>
              <dd>Ciudad de México</dd>
            </div>
          </dl>
        </div>
        <div className="contacto__form">
          <h2 className="contacto__form-title">O déjanos el contexto</h2>
          <LeadForm />
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default ContactoPage;
