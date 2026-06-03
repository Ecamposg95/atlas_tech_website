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

// Módulo de una suite GovTech (usado por SIGMA)
export interface SigmaModule {
  code: string;             // "01"
  key: string;              // "tramites"
  name: string;             // "SIGMA Trámites"
  desc: string;             // descripción corta
  future?: boolean;         // módulo a futuro (ej. IA Pública)
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
  // Campos opcionales para productos GovTech / suite modular (ej. SIGMA)
  division?: string;        // división de Atlas que lo opera (ej. "Atlas GovTech")
  modules?: SigmaModule[];  // suite modular
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
  {
    slug: "sigma",
    titulo: "SIGMA",
    subtitulo: "Sistema Integral de Gestión y Modernización Administrativa",
    tagline: "Gobierno digital, operación inteligente",
    categoria: "GovTech / Sector Público",
    estado: "En desarrollo",
    año: "2026",
    division: "Atlas GovTech",
    descripcion:
      "SIGMA es una plataforma GovTech modular, escalable y profesional para modernizar la gestión administrativa pública. Digitaliza trámites, expedientes, procesos internos, dictámenes, pagos, atención ciudadana y tableros ejecutivos en una sola arquitectura institucional, trazable y medible. Es el producto central de Atlas GovTech, la división de Atlas Tech dedicada a gobiernos, municipios, dependencias y organismos públicos. SIGMA convierte la operación pública en una plataforma digital: del trámite al dato, y del dato a la decisión.",
    features: [
      "Trámites ciudadanos de inicio a resolución con folio único",
      "Expediente electrónico institucional con trazabilidad total",
      "Ventanilla digital para atención ciudadana 24/7",
      "Flujos internos, turnos y dictámenes entre áreas",
      "Pagos de derechos y conciliación integrados",
      "Inspecciones de campo con evidencia y georreferencia",
      "Tableros ejecutivos y BI de gobierno en tiempo real",
      "Interoperabilidad por APIs con sistemas existentes",
      "Bitácoras y evidencia para transparencia y contraloría",
      "Arquitectura modular con roles, permisos y despliegue gradual",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "APIs", "Cloud seguro"],
    industrias: [
      "Municipios",
      "Gobiernos estatales",
      "Dependencias federales",
      "Organismos descentralizados",
      "Catastro",
      "Obras públicas",
      "Mejora regulatoria",
      "Atención ciudadana",
      "Transparencia",
      "Finanzas públicas",
    ],
    modules: [
      { code: "01", key: "tramites",        name: "SIGMA Trámites",          desc: "Trámites ciudadanos de inicio a resolución: folio único, requisitos, etapas, prevenciones y resoluciones." },
      { code: "02", key: "expedientes",     name: "SIGMA Expedientes",       desc: "Expediente electrónico por ciudadano, empresa, predio o proceso, con historial, versiones y metadatos." },
      { code: "03", key: "ventanilla",      name: "SIGMA Ventanilla Digital", desc: "Portal ciudadano para iniciar, consultar y dar seguimiento a solicitudes en línea." },
      { code: "04", key: "gestion",         name: "SIGMA Gestión Interna",   desc: "Solicitudes internas, oficios, turnos, autorizaciones y flujos entre áreas con semáforos." },
      { code: "05", key: "dictamen",        name: "SIGMA Dictamen",          desc: "Motor de revisión, prevención, aprobación o rechazo con reglas de negocio y plantillas." },
      { code: "06", key: "pagos",           name: "SIGMA Pagos",             desc: "Referencias, pago de derechos, validación, comprobantes y conciliación bancaria." },
      { code: "07", key: "archivo",         name: "SIGMA Archivo y Documentos", desc: "Gestión documental pública: clasificación, resguardo, plantillas, oficios y resoluciones." },
      { code: "08", key: "inspecciones",    name: "SIGMA Inspecciones",      desc: "Módulo móvil de campo: agenda, evidencia fotográfica, georreferencia, actas y firma digital." },
      { code: "09", key: "atencion",        name: "SIGMA Atención Ciudadana", desc: "Peticiones, quejas y solicitudes con asignación, seguimiento, tiempos y encuestas." },
      { code: "10", key: "bi",              name: "SIGMA BI Gobierno",       desc: "Tableros ejecutivos: KPIs por área, tiempos, cuellos de botella, cargas y productividad." },
      { code: "11", key: "interoperabilidad", name: "SIGMA Interoperabilidad", desc: "APIs, webhooks y conectores con padrones, pagos, identidad, firma electrónica y legacy." },
      { code: "12", key: "ia",              name: "SIGMA IA Pública",        desc: "Asistente para servidores públicos, clasificación automática, búsqueda semántica y resúmenes.", future: true },
    ],
    pricingDesde: "A medida",
    pricingDesc: "Implementación por módulos con despliegue gradual. Diagnóstico, configuración, capacitación y evolución según la institución.",
    colorAccent: "#2e6fb0",
    colorAccent2: "#5b9bd5",
    imagenCard: "/images/projects/sigma-card.jpg",
  },
  {
    slug: "open-cashback",
    titulo: "Open Cashback",
    subtitulo: "Infraestructura abierta de cashback, lealtad y recompensas programables",
    tagline: "Convierte cada compra en una recompensa programable",
    categoria: "Blockchain / Fintech / Loyalty",
    estado: "En desarrollo",
    año: "2026",
    division: "Atlas Web3",
    descripcion:
      "Open Cashback es una plataforma abierta y API-first de cashback, lealtad y recompensas programables para comercios físicos y digitales. Cada compra genera valor de regreso para el cliente —cashback, puntos o saldo de recompensa— mientras el negocio obtiene datos accionables de recompra, frecuencia y lifetime value. Arranca como un ledger transaccional confiable en PostgreSQL y está diseñada para evolucionar hacia una capa blockchain de auditoría: hashes de integridad, batch anchoring y, eventualmente, smart contracts y recompensas tokenizadas. Se integra con POS, ERP y e-commerce, y forma parte del ecosistema de productos de Atlas Tech.",
    features: [
      "Wallet de recompensas por cliente",
      "Motor de reglas de cashback configurable",
      "Ledger transaccional auditable (fuente de verdad)",
      "Flujo de redención con validaciones antifraude",
      "Motor de campañas por fecha, categoría y sucursal",
      "API-first para POS, ERP y e-commerce con webhooks",
      "Arquitectura multi-tenant por organización y sucursal",
      "Hashes de integridad encadenados + batch anchoring on-chain",
      "Idempotencia en ventas, cashback y redenciones",
      "Reportes de pasivo, redención y comportamiento comercial",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "React", "Solidity", "Hardhat", "Web3.py"],
    industrias: [
      "Retail y conveniencia",
      "Restaurantes y cafeterías",
      "Cadenas y franquicias",
      "Mayoristas y distribuidores",
      "E-commerce",
      "Plataformas POS / ERP",
      "Gimnasios y clínicas",
      "Marketplaces",
    ],
    pricingDesde: "SaaS + add-on",
    pricingDesc: "Modelo SaaS por comercio o sucursal, comisión por transacción, white-label para marcas y add-on premium para Atlas POS / Atlas ERP.",
    repoUrl: "https://github.com/Ecamposg95/open-cashback",
    colorAccent: "#8b5cf6",
    colorAccent2: "#22d3ee",
    imagenCard: "/images/projects/open-cashback-card.jpg",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
