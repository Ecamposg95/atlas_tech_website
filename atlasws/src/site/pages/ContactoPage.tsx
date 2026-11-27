import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import CtaButton from "../components/CtaButton";
import Atmosphere from "../components/Atmosphere";
import LeadForm from "../components/LeadForm";
import Section from "../components/Section";
import { CALL_MESSAGE, EMAIL, waLink } from "../lib/whatsapp";
import { nextSteps, paths, faq } from "../content/contacto";
import "./pages.css";
import "./OtherPages.css";

// Hora actual en Ciudad de México, para saber si nos encuentras despiertos.
const cdmxTime = () =>
  new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", hour: "2-digit", minute: "2-digit", hour12: false }).format(
    new Date()
  );

const Clock: React.FC = () => {
  const [t, setT] = useState(cdmxTime);
  useEffect(() => {
    const id = window.setInterval(() => setT(cdmxTime()), 20000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="contacto__clock data" data-testid="contacto-clock">
      <i aria-hidden="true" />
      {t}
    </span>
  );
};

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
              <dd>
                Ciudad de México <Clock />
              </dd>
            </div>
          </dl>
        </div>
        <div className="contacto__form">
          <h2 className="contacto__form-title">O déjanos el contexto</h2>
          <LeadForm />
        </div>
      </div>
    </section>

    <Section label="Qué pasa después" testId="contacto-pasos">
      <h2 className="sec-title">De tu mensaje a un plan claro.</h2>
      <ol className="steps steps--flow">
        {nextSteps.map((st) => (
          <li className="steps__item" key={st.n}>
            <span className="steps__n">{st.n}</span>
            <h3>{st.title}</h3>
            <p>{st.text}</p>
          </li>
        ))}
      </ol>
    </Section>

    <Section label="Por dónde empezar" testId="contacto-rutas">
      <div className="cards3">
        {paths.map((p, i) => (
          <Link className={"card path" + (i === 1 ? " card--ember" : "")} to={p.to} key={p.to}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <span className="path__cta">
              {p.cta} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>

    <Section label="Preguntas frecuentes" testId="contacto-faq">
      <div className="split">
        <h2>Lo que suelen preguntarnos antes de la llamada.</h2>
        <div className="faq">
          {faq.map((item, i) => (
            <details className="faq__item" key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>

    <section className="closing closing--horizon">
      <div className="wrap">
        <h2>
          Cuéntanos el caso. <em className="accent">Empezamos por ahí.</em>
        </h2>
        <div className="cta-row">
          <CtaButton href={waLink(CALL_MESSAGE)}>Escríbenos por WhatsApp</CtaButton>
        </div>
      </div>
      <div className="closing__horizon">
        <Atmosphere variant="horizon" />
      </div>
    </section>
  </SiteLayout>
);

export default ContactoPage;
