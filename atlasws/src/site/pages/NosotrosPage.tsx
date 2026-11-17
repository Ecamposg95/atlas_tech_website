import React from "react";
import SiteLayout from "../components/SiteLayout";
import Section from "../components/Section";
import CtaButton from "../components/CtaButton";
import FigureNote from "../components/FigureNote";
import ClientLogos from "../components/ClientLogos";
import { head, story, awardsFigure } from "../content/nosotros";
import { moonshot } from "../content/home";
import { manifesto } from "../content/cortex";
import "./pages.css";
import "./OtherPages.css";

const NosotrosPage: React.FC = () => (
  <SiteLayout>
    <section className="page-head">
      <div className="wrap">
        <h1 className="nosotros__title">{head.title}</h1>
        <p className="lead">{head.text}</p>
      </div>
    </section>

    <Section label={moonshot.label}>
      <div className="split">
        <h2>{moonshot.title}</h2>
        <div>
          <p className="moonshot__text">{moonshot.text}</p>
          <p className="moonshot__note">{moonshot.note}</p>
        </div>
      </div>
    </Section>

    <Section label="La startup">
      <dl className="story">
        {story.map((s) => (
          <div className="story__item" key={s.title}>
            <dt>{s.title}</dt>
            <dd>{s.text}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section label="En qué creemos">
      <ul className="manifesto">
        {manifesto.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </Section>

    <Section label="Reconocimientos">
      <div className="split">
        <div>
          <dl className="figures">
            <div className="figures__item">
              <dt>{awardsFigure.value}</dt>
              <dd>{awardsFigure.label}</dd>
            </div>
          </dl>
          <FigureNote source={awardsFigure.source} period={awardsFigure.period} cutoff={awardsFigure.cutoff} />
        </div>
        <div>
          <p className="lead">
            Antes del software empresarial vino la invención: nuestros primeros proyectos compitieron en ferias
            internacionales de tecnología. De ahí viene la costumbre de construir prototipos pronto y medirlos.
          </p>
          <div className="cta-row">
            <CtaButton to="/proyectos/harvestt" variant="secondary">
              Conoce Harvestt
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>

    <Section label="Empresas e instituciones con las que hemos trabajado">
      <ClientLogos />
    </Section>

    <section className="closing">
      <div className="wrap">
        <h2>Hablemos de tu operación.</h2>
        <div className="cta-row">
          <CtaButton to="/contacto">Agenda una llamada</CtaButton>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default NosotrosPage;
