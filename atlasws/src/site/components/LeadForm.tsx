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

  // El correo conserva lo que la persona ya escribió, aunque falte algún campo.
  const filled = [
    f.nombre.trim() && `Nombre: ${f.nombre.trim()}`,
    f.empresa.trim() && `Empresa: ${f.empresa.trim()}`,
    f.objetivo.trim() && `Quiero automatizar: ${f.objetivo.trim()}`,
  ].filter(Boolean);
  const mail = mailtoLink(
    `Llamada con Atlas Tech${f.nombre.trim() ? " — " + f.nombre.trim() : ""}`,
    ["Hola, quiero agendar una llamada.", ...filled].join("\n")
  );

  // Vista previa en vivo: el mismo mensaje que se abrirá en WhatsApp, con lo que falta marcado.
  const part = (v: string, hint: string) =>
    v.trim() ? <span className="lead-preview__in">{v.trim()}</span> : <span className="lead-preview__gap">{hint}</span>;
  const typed = [f.nombre, f.empresa, f.objetivo].filter((v) => v.trim()).length;

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
      <div className="lead-preview" data-testid="lead-preview" aria-hidden="true">
        <div className="lead-preview__head">
          <span>Así se verá tu mensaje</span>
          <span className="lead-preview__count">{typed} de 3</span>
        </div>
        <p className={"lead-preview__bubble" + (typed === 3 ? " is-ready" : "")}>
          Hola, soy {part(f.nombre, "tu nombre")} de {part(f.empresa, "tu empresa")}. Queremos automatizar:{" "}
          {part(f.objetivo, "el proceso")}
        </p>
        <div className="lead-preview__bar">
          <i style={{ width: `${(typed / 3) * 100}%` }} />
        </div>
      </div>
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
