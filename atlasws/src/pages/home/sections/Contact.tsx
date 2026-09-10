import React from "react";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";
import { ContactForm } from "../ContactForm";

export const Contact: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { contact } = dict;
  return (
    <section id="contacto" className="mst-band" aria-labelledby="contacto-title">
      <div className="mst-wrap">
        <p className="mst-kicker">{contact.kicker}</p>
        <h2 id="contacto-title" className="mst-display">{contact.title}</h2>
        <Grid cols={2}>
          <div>
            <p className="mst-lead">{contact.lead}</p>
            <ContactForm dict={dict} />
          </div>
          <dl className="mst-contact-side">
            <dt>{contact.sideEmail}</dt>
            <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            <dt>{contact.sideWhatsapp}</dt>
            <dd><a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">{contact.whatsappLabel}</a></dd>
            <dt>{contact.sideBase}</dt>
            <dd>{contact.base}</dd>
          </dl>
        </Grid>
      </div>
    </section>
  );
};
