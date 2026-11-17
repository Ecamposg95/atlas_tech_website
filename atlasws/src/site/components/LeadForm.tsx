import React, { useState } from "react";
import { LeadFields, isLeadComplete, leadMessage, mailtoLink, waLink } from "../lib/whatsapp";

const EMPTY: LeadFields = { nombre: "", empresa: "", objetivo: "" };

// Sin backend: el formulario arma el mensaje y abre WhatsApp. Nada se envía a un servidor.
const LeadForm: React.FC = () => {
  const [f, setF] = useState<LeadFields>(EMPTY);
  const [error, setError] = useState(false);

  const set = (k: keyof LeadFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF({ ...f, [k]: e.target.value });
    if (error) setError(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLeadComplete(f)) {
      setError(true);
      return;
    }
    window.open(waLink(leadMessage(f)), "_blank", "noopener");
  };

  const mail = mailtoLink(
    `Llamada con Atlas Tech${f.nombre.trim() ? " — " + f.nombre.trim() : ""}`,
    isLeadComplete(f) ? leadMessage(f) : "Hola, quiero agendar una llamada."
  );

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <label>
        <span>Nombre</span>
        <input type="text" name="nombre" autoComplete="name" value={f.nombre} onChange={set("nombre")} />
      </label>
      <label>
        <span>Empresa</span>
        <input type="text" name="empresa" autoComplete="organization" value={f.empresa} onChange={set("empresa")} />
      </label>
      <label>
        <span>¿Qué quieres automatizar?</span>
        <textarea name="objetivo" rows={4} value={f.objetivo} onChange={set("objetivo")} />
      </label>
      {error && (
        <p role="alert" className="lead-form__error">
          Completa los tres campos.
        </p>
      )}
      <div className="lead-form__actions">
        <button type="submit" className="cta cta--primary">
          Enviar por WhatsApp
        </button>
        <a className="lead-form__mail" href={mail}>
          Prefiero correo
        </a>
      </div>
      <p className="figure-note">Se abre WhatsApp con tu mensaje listo. No guardamos tus datos en este sitio.</p>
    </form>
  );
};

export default LeadForm;
