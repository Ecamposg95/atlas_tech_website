// Contacto — qué pasa después de escribirnos, por dónde empezar y preguntas frecuentes.
// Todo lo que se afirma aquí ya está dicho en otra página del sitio.
import * as one from "./atlasOne";

export const nextSteps: { n: string; title: string; text: string }[] = [
  { n: "01", title: "Nos escribes", text: "Por WhatsApp o por correo, con el contexto que tengas." },
  { n: "02", title: "Acordamos la llamada", text: "Te respondemos para fijar día y hora." },
  { n: "03", title: "Entendemos tu operación", text: "Qué proceso quieres mejorar y sobre qué sistemas corre." },
  { n: "04", title: "Te decimos qué sigue", text: "Con franqueza: qué podemos ejecutar hoy y qué todavía no." },
];

export const paths: { title: string; text: string; to: string; cta: string }[] = [
  { title: "Quiero operar mejor mi negocio", text: "Punto de venta, inventario, clientes y sucursales en una sola plataforma.", to: "/atlas-one", cta: "Atlas ONE" },
  { title: "Quiero agentes sobre mi operación", text: "Consultoría y agentes de IA que proponen y ejecutan con tu aprobación.", to: "/cortex", cta: "Atlas Cortex" },
  { title: "Tengo un reto a la medida", text: "Ingeniería, integración y consultoría con criterios de aceptación explícitos.", to: "/portafolio#solutions", cta: "Atlas Solutions" },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "¿Qué pasa cuando envío el formulario?",
    a: "Se abre WhatsApp con tu mensaje ya escrito y tú decides si lo envías. Este sitio no guarda tus datos ni los manda a un servidor.",
  },
  {
    q: "¿Atlas Cortex ya se puede usar?",
    a: "Está en MVP. Hoy la consultoría la entrega nuestro equipo apoyado en la plataforma, y en la página de Cortex cada capacidad dice en qué etapa está.",
  },
  {
    q: "¿Puedo probar Atlas ONE antes de pagar?",
    a: `Sí: ${one.pricing.trial.toLowerCase()} para validarlo en operación real. Después, ${one.pricing.from.toLowerCase()}.`,
  },
  {
    q: "¿Hacen desarrollos a la medida?",
    a: "Sí, con Atlas Solutions: ingeniería a la medida, integración y consultoría. Cada entregable lleva criterios de aceptación y condiciones de soporte explícitas.",
  },
];
