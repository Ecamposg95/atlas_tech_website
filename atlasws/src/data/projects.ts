// ============================================================
// src/data/projects.ts
// Central data source for all Atlas Tech projects
// ============================================================

export interface ProjectPreset {
  name: string;
  accent: string;
  accent2: string;
  desc: string;
}

// Reconocimiento internacional (para el roadmap de premios)
export interface Award {
  year: string;
  title: string;            // Ej. "The Best Invention of North America"
  medal: "gold" | "silver" | "bronze" | "honor" | "special";
  event: string;            // Ej. "ICAN"
  place: string;            // Ej. "Toronto, Canadá"
  flag: string;             // Emoji bandera
  note?: string;            // Distinción adicional
}

export interface Project {
  slug: string;
  titulo: string;
  subtitulo: string;
  tagline: string;
  categoria: string;
  estado: "Activo" | "En desarrollo" | "Beta" | "Completado" | "Premiado";
  año: string;
  descripcion: string;
  features: string[];
  stack: string[];
  industrias?: string[];
  presets?: ProjectPreset[];
  pricingDesde?: string;
  pricingDesc?: string;
  repoUrl?: string;
  demoUrl?: string;
  imagenCard: string;
  colorAccent: string;
  colorAccent2: string;
  // Campos opcionales usados por proyectos con historia/hardware (ej. Harvestt)
  creators?: string[];
  institution?: string;
  awards?: Award[];
}

export const projects: Project[] = [
  {
    slug: "atlas-one",
    titulo: "Atlas One",
    subtitulo: "Software todo-en-uno para vender, controlar y crecer",
    tagline: "Un solo software · 11 configuraciones · 1 plataforma",
    categoria: "SaaS / POS / ERP",
    estado: "En desarrollo",
    año: "2025–2026",
    descripcion:
      "Atlas One es una plataforma modular de software comercial para negocios físicos en México y Latinoamérica. Integra punto de venta, caja, inventario, clientes y reportes en un solo sistema que se configura según el giro del negocio. Desde barberías hasta ferreterías, el mismo ADN visual y tecnológico adapta su experiencia a 11 presets de industria diferentes — sin necesidad de migrar nunca de sistema.",
    features: [
      "Punto de venta táctil con cobro rápido",
      "Caja y cortes por turno o colaborador",
      "Inventario con alertas de stock crítico",
      "Clientes con historial y recurrencia",
      "Reportes en tiempo real",
      "11 configuraciones de industria (presets)",
      "Multiplataforma: Windows, Mac, Linux, móvil",
      "Respaldo en nube",
      "Multicaja y multi-usuario",
      "Módulo de IA en beta privada",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Railway", "IBM Plex"],
    industrias: [
      "Punto de Venta",
      "Retail / Ferretería",
      "Barbería",
      "Belleza & Estética",
      "Salud & Consultorios",
      "Restaurante",
      "Cafetería",
      "Bar",
      "Servicios técnicos",
      "Enterprise",
      "Custom",
    ],
    presets: [
      { name: "POS", accent: "#2563EB", accent2: "#1D4ED8", desc: "Venta rápida, caja y control básico para cualquier mostrador." },
      { name: "Retail", accent: "#0F766E", accent2: "#0D5F58", desc: "SKUs, código de barras, inventario estricto y precios por nivel." },
      { name: "Barbería", accent: "#1A1A2E", accent2: "#16213E", desc: "Citas, servicios, comisiones por barbero y clientes frecuentes." },
      { name: "Belleza", accent: "#9D174D", accent2: "#831843", desc: "Agenda, membresías, paquetes prepagados y profesionales." },
      { name: "Salud", accent: "#065F46", accent2: "#047857", desc: "Citas, pacientes, historial básico y cobro por consulta." },
      { name: "Restaurante", accent: "#7C2D12", accent2: "#9A3412", desc: "Mesas, comandas, KDS, recetas e insumos de cocina." },
      { name: "Cafetería", accent: "#78350F", accent2: "#92400E", desc: "POS de barra, combos, modificadores y costo por receta." },
      { name: "Bar", accent: "#1E1B4B", accent2: "#312E81", desc: "Inventario líquido, control de botellas y corte por turno." },
      { name: "Servicios", accent: "#374151", accent2: "#1F2937", desc: "Órdenes de trabajo, cotizaciones y estatus por cliente." },
      { name: "Enterprise", accent: "#4C1D95", accent2: "#5B21B6", desc: "Multi-sucursal, RBAC, API e integraciones a la medida." },
      { name: "Custom", accent: "#064E3B", accent2: "#065F46", desc: "Configuración manual para operaciones mixtas o especiales." },
    ],
    pricingDesde: "$12 MXN / día",
    pricingDesc: "Entrada accesible para comenzar con POS, caja y control básico. Crece por módulos sin migrar de sistema.",
    colorAccent: "#2563EB",
    colorAccent2: "#A78BFA",
    imagenCard: "/images/projects/atlas-one-card.jpg",
  },
  {
    slug: "harvestt",
    titulo: "Harvestt",
    subtitulo: "Agrotecnología con IA, premiada internacionalmente",
    tagline: "Germinar, cultivar y monitorear — desde tu casa hasta entornos extremos",
    categoria: "AgroTech / IoT / IA",
    estado: "Premiado",
    año: "2017–2026",
    descripcion:
      "Harvestt es un sistema automatizado de agrotecnología que integra inteligencia artificial: un invernadero controlado que acelera la germinación y el cultivo sin exposición al aire libre. Nacido en la ESIME Zacatenco del IPN, combina electrónica, termodinámica y software en una cámara a presión atmosférica con control de humedad, temperatura y fotoperiodo. Usa lógica difusa y visión por computadora con machine learning para identificar plantas por inspección de hojas y entregar nutrientes de forma óptima. Su evolución 2026 es un invernadero geodésico modular y desplegable, pensado para seguridad alimentaria en condiciones adversas.",
    features: [
      "Cámara controlada: humedad, temperatura y fotoperiodo",
      "Iluminación LED full-spectrum auto-ajustable",
      "Dispensador de nutrientes con base de datos de minerales",
      "Visión por computadora + machine learning (reconoce plantas por la hoja)",
      "Control por lógica difusa y análisis matemático",
      "App Harvestt: alertas, plan de cultivo y comunidad HarvesttER",
      "Invernadero geodésico modular y desplegable (visión 2026)",
      "Energías limpias y componentes reciclables",
    ],
    stack: ["IoT", "Computer Vision", "Machine Learning", "Lógica difusa", "Electrónica", "Termodinámica", "App móvil"],
    creators: [
      "Emmanuel Campos Genaro",
      "José Israel Romero Flores",
      "Leonardo Tonatiuh González García",
      "Luis Antonio Hernández Moha",
    ],
    institution: "ESIME Zacatenco · Instituto Politécnico Nacional (IPN)",
    awards: [
      {
        year: "2017",
        title: "Silver Medal",
        medal: "silver",
        event: "INTARG · International Invention & Innovation Show",
        place: "Katowice, Polonia",
        flag: "🇵🇱",
        note: "Categoría AgroTech",
      },
      {
        year: "2018",
        title: "The Best Invention of North America",
        medal: "special",
        event: "ICAN · TISIAS",
        place: "Toronto, Canadá",
        flag: "🇨🇦",
        note: "Única representación nacional y latinoamericana ganadora",
      },
      {
        year: "2019",
        title: "Gold Medal",
        medal: "gold",
        event: "ICAN · International Invention Innovation Competition",
        place: "Canadá",
        flag: "🇨🇦",
      },
      {
        year: "2021",
        title: "Honorary Medal",
        medal: "honor",
        event: "ICAN · Romanian Polytechnic University",
        place: "Rumania",
        flag: "🇷🇴",
      },
    ],
    colorAccent: "#10B981",
    colorAccent2: "#34D399",
    imagenCard: "/images/projects/harvestt/harvestt-product.jpg",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
