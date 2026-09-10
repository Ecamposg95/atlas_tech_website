import React, { useState } from "react";
import { HomeDict } from "../../i18n/types";

type Status = "idle" | "sending" | "sent" | "error";

interface Props { dict: HomeDict; endpoint?: string }

export const ContactForm: React.FC<Props> = ({ dict, endpoint = "/api/contact.php" }) => {
  const { contact } = dict;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "", website: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error("send failed");
      setStatus("sent");
      setForm({ name: "", email: "", org: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="mst-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="c-name">{contact.fields.name}</label>
        <input id="c-name" name="name" className="input" value={form.name} onChange={onChange} required minLength={2} maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="c-email">{contact.fields.email}</label>
        <input id="c-email" name="email" type="email" className="input" value={form.email} onChange={onChange} required maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="c-org">{contact.fields.org}</label>
        <input id="c-org" name="org" className="input" value={form.org} onChange={onChange} maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="c-message">{contact.fields.message}</label>
        <textarea id="c-message" name="message" className="input" value={form.message} onChange={onChange} required minLength={10} maxLength={4000} />
      </div>
      <div className="mst-hp" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? contact.sending : contact.submit}
      </button>
      {status === "sent" ? <p className="mst-form-status" role="status">{contact.sent}</p> : null}
      {status === "error" ? (
        <p className="mst-form-status mst-form-status-error" role="alert">
          <span>{contact.error}</span>{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {" · "}
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsappLabel}</a>
        </p>
      ) : null}
    </form>
  );
};
