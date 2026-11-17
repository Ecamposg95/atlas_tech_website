// Contacto: el sitio no tiene backend. Toda conversión sale por WhatsApp o correo.
export const WA_NUMBER = "527221495215";
export const EMAIL = "hola@atlastech.mx";
export const TRIAL_MESSAGE = "Hola, quiero probar Atlas ONE 1 mes gratis.";
export const CALL_MESSAGE = "Hola, quiero agendar una llamada sobre Atlas Cortex.";

export interface LeadFields {
  nombre: string;
  empresa: string;
  objetivo: string;
}

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function leadMessage(f: LeadFields): string {
  return `Hola, soy ${f.nombre.trim()} de ${f.empresa.trim()}. Queremos automatizar: ${f.objetivo.trim()}`;
}

export function isLeadComplete(f: LeadFields): boolean {
  return [f.nombre, f.empresa, f.objetivo].every((v) => v.trim().length > 0);
}

export function mailtoLink(subject: string, body: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
