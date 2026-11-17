# Reestructura de atlastech.mx (Cortex al frente) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reestructurar el sitio de Atlas Tech para que Atlas Cortex (Consulting as a Service) sea el protagonista, con identidad "NOIR con chispa lima", seis páginas y contenido honesto sobre el estado de cada producto.

**Architecture:** Todo lo nuevo vive en `atlasws/src/site/` (tokens, contenido como datos tipados, componentes y páginas), aislado del CSS del template bajo la clase raíz `.noir`. El contenido que puede "mentir" (estados, cifras, capacidades) se guarda como datos y se protege con pruebas. Las páginas de detalle del portafolio conservan su estética y solo cambian header/footer.

**Tech Stack:** React 19 + TypeScript, Create React App (react-scripts 5), React Router 7, Jest + React Testing Library, Three.js/GSAP existentes, Apache `.htaccess` en Hostinger.

**Spec:** `docs/superpowers/specs/2026-11-17-reestructura-sitio-cortex-design.md` (leerlo completo antes de cualquier tarea; §5 identidad, §6 estructura, §7 honestidad).

> **Estado: ejecutado (2026-11-17).** Las 10 tareas están en `main`. Después de la ejecución la identidad
> pasó de "NOIR con chispa lima" a **Atlas Noir** (azul hielo `#A9C9EB`, radio 0, Inter 700); los valores de
> paleta y tipografía de este plan quedaron superados. Ver `README.md` §02.

## Global Constraints

- Directorio de trabajo: `atlasws/`. Rama: `feat/reestructura-cortex` (no `main`). Sin `git push`.
- Idioma del sitio: español de México. Prohibido en textos nuevos: "sinergia", "revolucionario", "blockchain" (fuera de Open Cashback), "DataXPOS", "Sophia".
- Paleta: fondo `#0b0b0b`; bordes `#222`–`#333`; texto `#f2f2f2`, secundario `#9a9a9a`, tenue `#8a8a8a`; acento único lima `#C6FF3D` con texto negro encima. Sin degradados, sin segundo acento, sin violeta `#9333ea` en páginas compartidas.
- Tipografía: titulares Inter 500 tracking −0.035em; cuerpo Inter 400; etiquetas/nav/botones JetBrains Mono mayúsculas tracking 0.1–0.2em. Respaldo: `system-ui` / `ui-monospace`.
- Botones en píldora: primario relleno lima, secundario contorno `#333`.
- El lima solo en: una palabra clave por titular, botón principal, etiquetas de sección, punto del motivo de órbitas.
- Etiquetas de estado permitidas: `Validado` · `MVP` · `En desarrollo` · `Concepto` · `Investigación`, asignadas según la tabla de §7 del spec.
- Cifras publicables: solo `$80.1M MXN`, `134,844 tickets`, `$593.93` (Atlas ONE, 90 días, corte 09.09.2026) y `13 reconocimientos internacionales, 2016–2021`. Cada una con pie de fuente, periodo y corte. Las demás cifras del spec están pendientes: no aparecen.
- Clientes: solo los logos ya publicados. No nombrar Kaory, Eleven, Ginebra, Imaltzin ni Laboratorios Sophia.
- WhatsApp `527221495215`; correo `hola@atlastech.mx`.
- Sin scroll horizontal desde 360px. Respetar `prefers-reduced-motion`.
- `CI=false npm run build` termina sin errores. Pruebas: `CI=true npm test -- --watchAll=false`.
- Diseño de cada página: cargar la skill `frontend-design:frontend-design` y seguir la maqueta `.superpowers/brainstorm/120531-1794928868/content/mezcla-b-c.html` (opción 1).
- Entorno: WSL en `/mnt/c`, el hot-reload no funciona (reiniciar `npm start`). Verificación visual con Chromium headless (receta en la memoria `reference_wsl_dev_and_headless`).

## Review Focus

1. **URL antigua abierta directo, con barra final o query** (`/about/`, `/proyectos/atlas-one?x=1`, `/service-details`): debe llegar a la página nueva, no a 404 ni a pantalla en blanco. → Tarea 8.
2. **Formulario de contacto con campos vacíos o caracteres especiales** (`&`, `#`, saltos de línea, emojis, acentos): no abre WhatsApp si falta un campo; el mensaje llega íntegro. → Tarea 1 y Tarea 7.
3. **Pantalla de 360px**: la navegación colapsa a menú, "Agenda una llamada" visible sin scroll, sin desbordes por titulares largos. → Tarea 3 y Tarea 10.
4. **Sin WebGL o con `prefers-reduced-motion`**: el hero se muestra completo con el motivo estático; nunca queda vacío ni lanza error. → Tarea 4.
5. **Slug de portafolio inexistente** (`/proyectos/loquesea`): muestra la página de error con salida a Home, no una página rota. → Tarea 8.

---

## Estructura de archivos

```
atlasws/src/site/
  tokens.css                 variables y base bajo .noir
  lib/whatsapp.ts            enlaces y mensajes de WhatsApp/correo
  content/status.ts          tipo Status
  content/cortex.ts          pasos, capacidades, agentes, niveles de autonomía
  content/atlasOne.ts        módulos, giros, precio, cifras
  content/home.ts            hero, moonshot, "qué construimos"
  content/nosotros.ts        historia, reconocimientos
  content/content.test.ts    pruebas de honestidad
  components/                StatusTag, CtaButton, Section, FigureNote, OrbitMotif,
                             SiteHeader, SiteFooter, SiteLayout, StepsStrip, ClientLogos
  pages/                     HomePage, CortexPage, AtlasOnePage, PortfolioPage,
                             NosotrosPage, ContactoPage (+ .css por página)
```

Cada componente lleva su `.css` al lado; todas las reglas cuelgan de `.noir`.

---

### Task 1: Cimientos — tokens, fuentes, estado, botones y WhatsApp

**Files:**
- Create: `src/site/tokens.css`, `src/site/lib/whatsapp.ts`, `src/site/lib/whatsapp.test.ts`, `src/site/content/status.ts`, `src/site/components/StatusTag.tsx`, `src/site/components/CtaButton.tsx`, `src/site/components/Section.tsx`, `src/site/components/FigureNote.tsx`, `src/site/components/components.test.tsx`
- Modify: `public/index.html` (fuentes Inter 400/500/600 y JetBrains Mono 400/500/600 con `preconnect`; `theme-color` `#0b0b0b`)

**Interfaces — Produces:**
```ts
// content/status.ts
export type Status = "Validado" | "MVP" | "En desarrollo" | "Concepto" | "Investigación";
// lib/whatsapp.ts
export const WA_NUMBER = "527221495215";
export const EMAIL = "hola@atlastech.mx";
export const TRIAL_MESSAGE = "Hola, quiero probar Atlas ONE 1 mes gratis.";
export const CALL_MESSAGE = "Hola, quiero agendar una llamada sobre Atlas Cortex.";
export interface LeadFields { nombre: string; empresa: string; objetivo: string }
export function waLink(message: string): string;        // https://wa.me/<WA_NUMBER>?text=<encodeURIComponent>
export function leadMessage(f: LeadFields): string;     // "Hola, soy {nombre} de {empresa}. Queremos automatizar: {objetivo}"
export function isLeadComplete(f: LeadFields): boolean; // los tres campos con texto tras trim()
export function mailtoLink(subject: string, body: string): string;
// components
<StatusTag status={Status} />            // "Investigación" con borde punteado
<CtaButton to|href variant="primary"|"secondary">…</CtaButton>   // `to` = Link interno, `href` = <a target="_blank" rel="noopener">
<Section label="01 · Cómo funciona" id?>…</Section>             // etiqueta mono lima + contenido
<FigureNote source period cutoff />      // "Fuente: … Periodo: … Corte: …"
```
`tokens.css` define en `.noir`: `--bg --panel --rule --rule-strong --ink --muted --dim --accent --on-accent --f-sans --f-mono` con los valores de Global Constraints.

- [ ] **Step 1: Crear rama** — `git checkout -b feat/reestructura-cortex`
- [ ] **Step 2: Escribir pruebas que fallan**

```ts
// whatsapp.test.ts
test("waLink codifica caracteres especiales", () => {
  const url = waLink("Café & más #1\nlínea 2 🚀");
  expect(url.startsWith("https://wa.me/527221495215?text=")).toBe(true);
  expect(decodeURIComponent(url.split("text=")[1])).toBe("Café & más #1\nlínea 2 🚀");
  expect(url.split("text=")[1]).not.toMatch(/[ #&\n]/);
});
test("isLeadComplete rechaza vacíos y espacios", () => {
  expect(isLeadComplete({ nombre: "Ana", empresa: "  ", objetivo: "cobranza" })).toBe(false);
  expect(isLeadComplete({ nombre: "Ana", empresa: "ACME", objetivo: "cobranza" })).toBe(true);
});
test("leadMessage incluye los tres campos", () => {
  expect(leadMessage({ nombre: "Ana", empresa: "ACME", objetivo: "cobranza" }))
    .toBe("Hola, soy Ana de ACME. Queremos automatizar: cobranza");
});
```
```tsx
// components.test.tsx
test("StatusTag muestra el estado", () => { render(<StatusTag status="MVP" />); expect(screen.getByText("MVP")).toBeInTheDocument(); });
test("FigureNote muestra fuente, periodo y corte", () => {
  render(<FigureNote source="datos de operación de Atlas ONE" period="90 días" cutoff="09.09.2026" />);
  expect(screen.getByText(/Fuente: datos de operación de Atlas ONE\. Periodo: 90 días\. Corte: 09\.09\.2026\./)).toBeInTheDocument();
});
test("CtaButton externo abre en pestaña nueva con rel seguro", () => {
  render(<CtaButton href="https://wa.me/1">Hola</CtaButton>);
  expect(screen.getByRole("link", { name: "Hola" })).toHaveAttribute("rel", expect.stringContaining("noopener"));
});
```
- [ ] **Step 3: Ejecutar y ver que fallan** — `CI=true npm test -- --watchAll=false src/site` → FAIL (módulos no existen)
- [ ] **Step 4: Implementar** los archivos listados según Interfaces.
- [ ] **Step 5: Ejecutar** el mismo comando → PASS
- [ ] **Step 6: Commit** — `git add -A src/site public/index.html && git commit -m "feat(site): cimientos NOIR — tokens, estado, botones y WhatsApp"`

---

### Task 2: Contenido como datos + pruebas de honestidad

**Files:**
- Create: `src/site/content/cortex.ts`, `atlasOne.ts`, `home.ts`, `nosotros.ts`, `content.test.ts`

**Interfaces — Consumes:** `Status`. **Produces:**
```ts
// cortex.ts
export interface Step { n: string; title: string; text: string }
export const steps: Step[];                       // 01 Diagnóstico, 02 Plan, 03 Ejecución, 04 Evidencia
export interface Capability { name: string; text: string; status: Status; group: "hoy" | "construccion" | "vision" }
export const capabilities: Capability[];
export const agents: { name: string; role: string; status: Status }[];              // 8, todos "En desarrollo"
export const autonomyLevels: { name: string; text: string; status: Status; current: boolean }[]; // 4
export const principles: { title: string; text: string }[];
export const cortexStatus: Status;                // "MVP"
// atlasOne.ts
export interface Figure { value: string; label: string; source: string; period: string; cutoff: string }
export const figures: Figure[];                   // exactamente las 3 autorizadas
export const modules: { name: string; text: string; status: Status }[];             // incluye "Atlas ONE AI" → "En desarrollo"
export const verticals: string[];                 // 11 giros
export const pricing: { from: string; trial: string };  // "Desde $12 MXN al día", "1 mes gratis"
export const atlasOneStatus: Status;              // "Validado"
// home.ts
export const hero: { eyebrow: string; title: string; accent: string; sub: string };
export const moonshot: { title: string; text: string };
export const pillars: { title: string; text: string }[];   // sistemas agénticos, ontologías de conocimiento, tecnologías de frontera
// nosotros.ts
export const story: { title: string; text: string }[];
export const awardsFigure: Figure;                // 13 reconocimientos, 2016–2021
```
Valores fijados por el spec:
- `hero.eyebrow` = "Consulting as a Service · Atlas Cortex"; `hero.title` = "Consultoría que no entrega un PDF."; `hero.accent` = "Entrega ejecución."; `hero.sub` termina con "De la intención empresarial a la ejecución verificable."
- `moonshot.text` = cita literal de §3 del spec.
- `capabilities`: grupo `hoy` (status "MVP") = memoria/RAG por organización, grafo de entidades, CRM/OKRs/KPIs/decisiones, motor de políticas con auditoría, agente que propone y la persona confirma. `construccion` ("En desarrollo") = flujos agénticos con aprobación, equipo de agentes especializados. `vision` = integraciones con ERPs de terceros, operación autónoma, aprendizaje de decisiones ("Concepto"); ontología formal, GraphRAG ("Investigación").
- `agents`: CFO, Ventas, Compras, Operaciones, Customer Success, Cumplimiento, Project Manager, Analista de datos.
- `autonomyLevels`: Observa (MVP), Propone (MVP, `current: true`), Ejecuta con aprobación (En desarrollo), Ejecuta en política (Concepto).
- `figures`: `$80.1M MXN` "en ventas registradas", `134,844` "tickets procesados", `$593.93` "ticket promedio"; las tres con `source: "datos de operación de Atlas ONE"`, `period: "90 días"`, `cutoff: "09.09.2026"`.
- Redacción restante: del redactor, usando las frases disponibles de §3 del spec; la consultoría se describe como "nuestro equipo + agentes".

- [ ] **Step 1: Escribir pruebas que fallan** (`content.test.ts`)

```ts
const all = JSON.stringify({ cortex, atlasOne, home, nosotros });
test("no hay términos prohibidos", () => {
  expect(all).not.toMatch(/sophia|dataxpos|blockchain|sinergia|revolucionari|kaory|eleven|ginebra|imaltzin/i);
});
test("no aparecen cifras pendientes ni metas aspiracionales", () => {
  expect(all).not.toMatch(/350M|13 sucursales|7 clientes|25 integraciones|100\+|2 semanas|80 ?%/);
});
test("toda cifra trae fuente, periodo y corte", () => {
  [...atlasOne.figures, nosotros.awardsFigure].forEach(f =>
    [f.source, f.period, f.cutoff].forEach(v => expect(v.trim()).not.toBe("")));
  expect(atlasOne.figures.map(f => f.value)).toEqual(["$80.1M MXN", "134,844", "$593.93"]);
});
test("estados según el spec", () => {
  expect(cortex.cortexStatus).toBe("MVP");
  expect(atlasOne.atlasOneStatus).toBe("Validado");
  expect(cortex.agents).toHaveLength(8);
  cortex.agents.forEach(a => expect(a.status).toBe("En desarrollo"));
  cortex.capabilities.filter(c => c.group === "hoy").forEach(c => expect(c.status).toBe("MVP"));
  cortex.capabilities.filter(c => c.group === "vision").forEach(c => expect(["Concepto", "Investigación"]).toContain(c.status));
  expect(cortex.autonomyLevels.filter(l => l.current).map(l => l.name)).toEqual(["Propone"]);
  expect(atlasOne.modules.find(m => /AI/.test(m.name))?.status).toBe("En desarrollo");
  expect(cortex.steps.map(s => s.title)).toEqual(["Diagnóstico", "Plan", "Ejecución", "Evidencia"]);
});
```
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar** los cuatro archivos de contenido.
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false src/site/content` → PASS
- [ ] **Step 5: Commit** — `git commit -am "feat(site): contenido tipado de Cortex, Atlas ONE, Home y Nosotros con pruebas de honestidad"` (tras `git add src/site/content`)

---

### Task 3: Marco del sitio — header, footer, layout y motivo de órbitas

**Files:**
- Create: `src/site/components/SiteHeader.tsx`, `SiteFooter.tsx`, `SiteLayout.tsx`, `OrbitMotif.tsx`, `site-frame.css`, `SiteFrame.test.tsx`

**Interfaces — Consumes:** `CtaButton`, `EMAIL`, `waLink`. **Produces:**
```tsx
<SiteLayout>{children}</SiteLayout>   // <div className="noir"> + SiteHeader + <main> + SiteFooter; importa tokens.css
<SiteHeader />                         // logo → "/", nav: Cortex /cortex · Atlas ONE /atlas-one · Portafolio /portafolio · Nosotros /nosotros; CTA "Agenda una llamada" → /contacto
<SiteFooter />                         // mismas rutas, correo, WhatsApp, Instagram y Facebook reales (tomar URLs de components/footer/Footer.tsx); sin Twitter/LinkedIn genéricos
<OrbitMotif size?: number />           // SVG: círculos concéntricos 1px + punto lima; sin animación si prefers-reduced-motion
```
Header: logo con el SVG de la marca (`currentColor`) y wordmark `ATLAS TECH` en mono. Bajo 860px la navegación colapsa a un botón "Menú" (`aria-expanded`) y el CTA sigue visible en la barra.

- [ ] **Step 1: Pruebas que fallan**
```tsx
const frame = () => render(<MemoryRouter><SiteLayout><p>x</p></SiteLayout></MemoryRouter>);
test("navegación con las cuatro rutas y el CTA", () => {
  frame();
  const nav = screen.getByRole("navigation", { name: "Principal" });
  [["Cortex", "/cortex"], ["Atlas ONE", "/atlas-one"], ["Portafolio", "/portafolio"], ["Nosotros", "/nosotros"]]
    .forEach(([n, h]) => expect(within(nav).getByRole("link", { name: n })).toHaveAttribute("href", h));
  expect(screen.getAllByRole("link", { name: "Agenda una llamada" })[0]).toHaveAttribute("href", "/contacto");
});
test("el menú móvil abre y cierra", () => {
  frame();
  const btn = screen.getByRole("button", { name: /menú/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
});
test("el footer no enlaza redes genéricas", () => {
  frame();
  expect(document.querySelector('a[href*="twitter.com"], a[href*="linkedin.com"]')).toBeNull();
});
```
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false src/site/components` → PASS
- [ ] **Step 5: Commit** — `feat(site): header, footer, layout y motivo de órbitas`

---

### Task 4: Home

**Files:**
- Create: `src/site/pages/HomePage.tsx`, `HomePage.css`, `HomePage.test.tsx`, `src/site/components/StepsStrip.tsx`, `src/site/components/ClientLogos.tsx`, `src/site/components/HeroVisual.tsx`
- Modify: `src/main-component/router/index.tsx` (`/` y `/home` → nuevo `HomePage`)

**Interfaces — Consumes:** `SiteLayout`, `Section`, `CtaButton`, `StatusTag`, `FigureNote`, `OrbitMotif`, contenido de `home`, `cortex.steps`, `atlasOne`, `projects` de `src/data/projects.ts`. **Produces:**
```tsx
<StepsStrip steps={Step[]} />   // franja de 4 columnas, 2×2 bajo 860px, 1 columna bajo 520px
<ClientLogos />                 // reutiliza los logos SVG del carrusel actual (components/FeatureSection/BrandSection.tsx)
<HeroVisual />                  // ver abajo
```
Secciones en este orden (spec §6): Hero · Cómo funciona · Moonshot · Qué construimos · Atlas ONE · Clientes · Portafolio · Cierre.
- Hero: botones "Agenda una llamada" (→ `/contacto`, primario) y "Cómo funciona" (ancla a la sección 2, secundario).
- Atlas ONE: `StatusTag` "Validado", las 3 cifras con un `FigureNote`, botones "Conoce Atlas ONE" (→ `/atlas-one`) y "Pruébalo 1 mes gratis" (`waLink(TRIAL_MESSAGE)`).
- Portafolio: tarjetas de Harvestt, SIGMA y Open Cashback (no Atlas ONE) enlazando a `/proyectos/<slug>`.
- `HeroVisual`: probar primero `NetworkGlobe` reestilizado a monocromo con nodos lima; si no se sostiene con NOIR, usar `OrbitMotif`. En cualquier caso: con `prefers-reduced-motion: reduce` o si WebGL no está disponible (o el canvas lanza error), renderiza `OrbitMotif` estático. Dejar anotada la decisión en un comentario de una línea.

- [ ] **Step 1: Pruebas que fallan**
```tsx
test("hero con el mensaje y el CTA a contacto", () => {
  renderHome();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Consultoría que no entrega un PDF. Entrega ejecución.");
  expect(within(screen.getByTestId("sec-hero")).getByRole("link", { name: "Agenda una llamada" })).toHaveAttribute("href", "/contacto");
});
test("las ocho secciones en orden", () => {
  renderHome();
  expect(screen.getAllByTestId(/^sec-/).map(e => e.dataset.testid))
    .toEqual(["sec-hero","sec-como","sec-moonshot","sec-construimos","sec-atlas-one","sec-clientes","sec-portafolio","sec-cierre"]);
});
test("cifras de Atlas ONE con pie de fuente", () => {
  renderHome();
  const s = screen.getByTestId("sec-atlas-one");
  expect(within(s).getByText("$80.1M MXN")).toBeInTheDocument();
  expect(within(s).getByText(/Corte: 09\.09\.2026/)).toBeInTheDocument();
});
test("portafolio enlaza a las tres páginas existentes", () => {
  renderHome();
  ["harvestt","sigma","open-cashback"].forEach(sl =>
    expect(document.querySelector(`a[href="/proyectos/${sl}"]`)).not.toBeNull());
  expect(document.querySelector('[data-testid="sec-portafolio"] a[href*="atlas-one"]')).toBeNull();
});
test("sin WebGL el hero muestra el motivo estático", () => {
  // jsdom no tiene WebGL: HeroVisual debe caer a OrbitMotif sin lanzar
  renderHome();
  expect(screen.getByTestId("orbit-motif")).toBeInTheDocument();
});
```
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar** página, componentes y ruta.
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false src/site/pages/HomePage` → PASS
- [ ] **Step 5: Revisión visual** — `npm start`, captura headless de `/` a 1440px y 360px; comparar con la maqueta; CTA visible sin scroll en ambas.
- [ ] **Step 6: Commit** — `feat(site): nuevo Home con Cortex al frente`

---

### Task 5: Página `/cortex`

**Files:**
- Create: `src/site/pages/CortexPage.tsx`, `CortexPage.css`, `CortexPage.test.tsx`
- Modify: `src/main-component/router/index.tsx` (ruta `/cortex`)

**Interfaces — Consumes:** todo `content/cortex`, `StepsStrip`, `StatusTag`, `Section`, `CtaButton`, `OrbitMotif`.

Secciones: encabezado (nombre, `StatusTag` MVP, "De la intención empresarial a la ejecución verificable.") · Consultoría + software ("nuestro equipo + agentes") · Cómo funciona (`StepsStrip`) · Hoy / En construcción / Visión (tres columnas desde `capabilities`, cada elemento con su `StatusTag`) · "El equipo de agentes que estamos construyendo" (los 8, como lista, no como rejilla de funciones) · Escalera de autonomía (4 niveles, resaltando el `current` con "Cortex hoy") · Gobierno y punto de control humano (desde `principles`) · relación con Atlas ONE (frase de §3) · cierre con "Agenda una llamada".

- [ ] **Step 1: Pruebas que fallan**
```tsx
test("estado del producto y CTA", () => {
  renderCortex();
  expect(within(screen.getByTestId("cortex-head")).getByText("MVP")).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Agenda una llamada" }).length).toBeGreaterThan(0);
});
test("cada capacidad muestra su etiqueta de estado", () => {
  renderCortex();
  capabilities.forEach(c => {
    const item = screen.getByText(c.name).closest("[data-cap]") as HTMLElement;
    expect(within(item).getByText(c.status)).toBeInTheDocument();
    expect(item.closest(`[data-group="${c.group}"]`)).not.toBeNull();
  });
});
test("los agentes se presentan como en construcción", () => {
  renderCortex();
  const sec = screen.getByTestId("cortex-agents");
  expect(within(sec).getByRole("heading")).toHaveTextContent(/estamos construyendo/i);
  expect(within(sec).getAllByText("En desarrollo")).toHaveLength(8);
});
test("la escalera marca el nivel actual", () => {
  renderCortex();
  expect(screen.getByText("Propone").closest("[data-level]")).toHaveAttribute("aria-current", "step");
});
```
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false src/site/pages/CortexPage` → PASS
- [ ] **Step 5: Revisión visual** a 1440px y 360px.
- [ ] **Step 6: Commit** — `feat(site): página de Atlas Cortex`

---

### Task 6: Página `/atlas-one`

**Files:**
- Create: `src/site/pages/AtlasOnePage.tsx`, `AtlasOnePage.css`, `AtlasOnePage.test.tsx`
- Modify: `src/main-component/router/index.tsx` (ruta `/atlas-one`), `src/data/projects.ts` (quitar `atlas-one` del arreglo exportado de proyectos; mover los datos que la página reutilice —presets, stack— a `content/atlasOne.ts`)

**Interfaces — Consumes:** `content/atlasOne`, `AtlasOneDemos` (existente, sin cambios internos), `FigureNote`, `StatusTag`, `waLink`, `TRIAL_MESSAGE`.

Secciones: encabezado (`StatusTag` Validado, "El problema no es cobrar — es operar sin visibilidad.") · cifras + `FigureNote` · demo interactivo existente · módulos (con estado; "Atlas ONE AI" En desarrollo) · giros (11) · precio ("Desde $12 MXN al día", "1 mes gratis") con botón primario "Pruébalo 1 mes gratis" → `waLink(TRIAL_MESSAGE)` y enlace secundario a `https://atlasone.com.mx` · puente a Cortex.

- [ ] **Step 1: Pruebas que fallan**
```tsx
test("botón de prueba abre WhatsApp con el mensaje de prueba", () => {
  renderOne();
  expect(screen.getAllByRole("link", { name: /1 mes gratis/i })[0]).toHaveAttribute("href", waLink(TRIAL_MESSAGE));
});
test("Atlas ONE AI aparece como En desarrollo", () => {
  renderOne();
  expect(within(screen.getByText(/Atlas ONE AI/).closest("[data-module]") as HTMLElement).getByText("En desarrollo")).toBeInTheDocument();
});
test("cifras con pie y estado Validado", () => {
  renderOne();
  expect(screen.getByText("134,844")).toBeInTheDocument();
  expect(screen.getByText(/Fuente: datos de operación de Atlas ONE/)).toBeInTheDocument();
  expect(within(screen.getByTestId("one-head")).getByText("Validado")).toBeInTheDocument();
});
```
(Si `AtlasOneDemos` no renderiza en jsdom, simularlo con `jest.mock` en esta prueba.)
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false src/site/pages/AtlasOnePage` → PASS
- [ ] **Step 5: Revisión visual**; el demo sigue escalando bien a 360px.
- [ ] **Step 6: Commit** — `feat(site): Atlas ONE como producto con página propia`

---

### Task 7: `/portafolio`, `/nosotros` y `/contacto`

**Files:**
- Create: `src/site/pages/PortfolioPage.tsx`, `NosotrosPage.tsx`, `ContactoPage.tsx`, `pages.css`, `OtherPages.test.tsx`, `src/site/components/LeadForm.tsx`
- Modify: `src/main-component/router/index.tsx` (tres rutas)

**Interfaces — Consumes:** `projects`, `content/nosotros`, `whatsapp.ts`. **Produces:**
```tsx
<LeadForm />  // campos nombre, empresa, objetivo ("¿Qué quieres automatizar?"); sin subida de archivos; sin petición de red
```
- `LeadForm`: al enviar, si `isLeadComplete` es falso muestra "Completa los tres campos." (`role="alert"`) y no abre nada; si es verdadero, `window.open(waLink(leadMessage(f)), "_blank", "noopener")`. Enlace "Prefiero correo" → `mailtoLink(...)` con los mismos datos.
- `/contacto`: titular "Agenda una llamada", botón directo `waLink(CALL_MESSAGE)`, `LeadForm`, correo visible.
- `/portafolio`: Harvestt, SIGMA, Open Cashback con su estado actual y enlace a `/proyectos/<slug>`.
- `/nosotros`: la startup, el moonshot, "equipo compacto + agentes", `awardsFigure` con `FigureNote`, logos de instituciones.

- [ ] **Step 1: Pruebas que fallan**
```tsx
test("LeadForm no abre WhatsApp con campos vacíos", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  render(<LeadForm />);
  fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));
  expect(open).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent("Completa los tres campos.");
});
test("LeadForm abre WhatsApp con el mensaje íntegro", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  render(<LeadForm />);
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana & Co" } });
  fireEvent.change(screen.getByLabelText(/empresa/i), { target: { value: "ACME #1" } });
  fireEvent.change(screen.getByLabelText(/automatizar/i), { target: { value: "cobranza\ny compras 🚀" } });
  fireEvent.click(screen.getByRole("button", { name: /enviar por whatsapp/i }));
  const url = open.mock.calls[0][0] as string;
  expect(decodeURIComponent(url.split("text=")[1]))
    .toBe("Hola, soy Ana & Co de ACME #1. Queremos automatizar: cobranza\ny compras 🚀");
});
test("portafolio lista tres proyectos sin Atlas ONE", () => {
  renderAt(<PortfolioPage />);
  expect(screen.getAllByTestId("portfolio-card")).toHaveLength(3);
});
test("nosotros muestra los reconocimientos con periodo", () => {
  renderAt(<NosotrosPage />);
  expect(screen.getByText(/2016–2021/)).toBeInTheDocument();
});
```
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false src/site` → PASS (todo `src/site`)
- [ ] **Step 5: Revisión visual** de las tres a 1440px y 360px.
- [ ] **Step 6: Commit** — `feat(site): portafolio, nosotros y contacto con WhatsApp`

---

### Task 8: Rutas, redirecciones y marco compartido en el portafolio

**Files:**
- Modify: `src/main-component/router/index.tsx`, `src/main-component/ProjectsPage/HarvesttDetailPage.tsx`, `SigmaDetailPage.tsx`, `OpenCashbackDetailPage.tsx`, `ProjectDetailPage.tsx`, `src/main-component/ErrorPage/ErrorPage.tsx`, `public/.htaccess`, `src/App.test.tsx` (reemplazar la prueba "learn react")
- Create: `src/main-component/router/routes.test.tsx`

**Tabla de redirecciones** (router con `<Navigate replace>`; `.htaccess` con `RewriteRule … [R=301,L]` **antes** del bloque "SPA fallback", tolerando barra final):

| Desde | Hacia |
|---|---|
| `/home` | `/` |
| `/about` | `/nosotros` |
| `/contact` | `/contacto` |
| `/service`, `/service-details` | `/cortex` |
| `/proyectos` | `/portafolio` |
| `/proyectos/atlas-one` | `/atlas-one` |

`/proyectos/harvestt`, `/proyectos/sigma`, `/proyectos/open-cashback` siguen vivas. En las páginas de detalle se sustituyen `Header`/`Footer` del template por `SiteHeader`/`SiteFooter` (envueltos en `.noir` solo ellos; el cuerpo conserva su estética). `ProjectDetailPage` con slug desconocido y `*` muestran `ErrorPage`, que pasa a usar `SiteLayout` con enlace "Volver al inicio".

- [ ] **Step 1: Pruebas que fallan** (`routes.test.tsx`, con `MemoryRouter` — extraer `<AppRoutes />` sin `BrowserRouter` del archivo del router y exportarlo)
```tsx
const at = (p: string) => render(<MemoryRouter initialEntries={[p]}><AppRoutes /></MemoryRouter>);
test.each([
  ["/about", /nosotros/i], ["/about/", /nosotros/i], ["/contact", /agenda una llamada/i],
  ["/service", /atlas cortex/i], ["/service-details", /atlas cortex/i],
  ["/proyectos", /portafolio/i], ["/proyectos/atlas-one?x=1", /atlas one/i], ["/home", /entrega ejecución/i],
])("%s llega a la página nueva", (path, h1) => {
  at(path);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(h1);
});
test("slug inexistente muestra error con salida a inicio", () => {
  at("/proyectos/loquesea");
  expect(screen.getByRole("link", { name: /volver al inicio/i })).toHaveAttribute("href", "/");
});
test("detalle de portafolio usa la navegación nueva", () => {
  at("/proyectos/sigma");
  expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
});
```
```ts
// misma suite: .htaccess
test(".htaccess redirige antes del fallback", () => {
  const ht = fs.readFileSync(path.join(__dirname, "../../../public/.htaccess"), "utf8");
  ["about", "contact", "service", "service-details", "proyectos", "proyectos/atlas-one", "home"].forEach(p =>
    expect(ht).toMatch(new RegExp(`RewriteRule \\^${p.replace("/", "\\/")}\\/\\?\\$ .*R=301`)));
  expect(ht.indexOf("/nosotros")).toBeLessThan(ht.indexOf("SPA fallback"));
});
```
(La regla de `proyectos/?$` no debe capturar `/proyectos/harvestt`.)
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar.** Mock de WebGL/`AtlasOneDemos`/`NetworkGlobe` en la suite si jsdom lo exige.
- [ ] **Step 4: Ejecutar** `CI=true npm test -- --watchAll=false` → PASS (suite completa)
- [ ] **Step 5: Commit** — `feat(site): rutas en español, redirecciones 301 y marco compartido`

---

### Task 9: SEO por ruta

**Files:**
- Modify: `src/seo/seo.config.json`, `scripts/seo-build.cjs` (solo si hace falta para excluir rutas), `public/manifest.json` (`theme_color`/`background_color` `#0b0b0b`)
- Create: `src/seo/seo.config.test.ts`

Rutas del config: `/`, `/cortex`, `/atlas-one`, `/portafolio`, `/nosotros`, `/contacto`, `/proyectos/harvestt`, `/proyectos/sigma`, `/proyectos/open-cashback`, `/404` (noindex). Salen: `/about`, `/service`, `/proyectos`, `/proyectos/atlas-one`, `/contact`.
- `organization.description` y el título/descripción de `/`: startup de sistemas agénticos, ontologías de conocimiento y tecnologías de frontera; Atlas Cortex, Consulting as a Service. Sin "venture studio" ni "blockchain".
- `themeColor`: `#0b0b0b`.
- JSON-LD: `/` Organization + WebSite; `/cortex` y `/atlas-one` `SoftwareApplication` (sin `aggregateRating` ni precios inventados; en Atlas ONE `offers` solo si se expresa como texto "Desde $12 MXN al día").

- [ ] **Step 1: Pruebas que fallan**
```ts
const paths = cfg.routes.map((r: any) => r.path);
test("rutas nuevas presentes y viejas fuera", () => {
  ["/", "/cortex", "/atlas-one", "/portafolio", "/nosotros", "/contacto"].forEach(p => expect(paths).toContain(p));
  ["/about", "/service", "/proyectos", "/proyectos/atlas-one", "/contact"].forEach(p => expect(paths).not.toContain(p));
});
test("el posicionamiento viejo no aparece en rutas compartidas", () => {
  const shared = cfg.routes.filter((r: any) => !r.path.startsWith("/proyectos/"));
  expect(JSON.stringify([shared, cfg.organization])).not.toMatch(/venture studio|blockchain/i);
});
test("cada ruta tiene título y descripción", () => {
  cfg.routes.forEach((r: any) => { expect(r.title).toBeTruthy(); expect(r.description.length).toBeGreaterThan(50); });
});
```
- [ ] **Step 2: Ejecutar** → FAIL
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Ejecutar** la prueba → PASS; luego `CI=false npm run build` → termina sin errores; comprobar `ls build/cortex/index.html build/nosotros/index.html`, que `build/about` no exista, que `grep -c "<loc>" build/sitemap.xml` sea 9 y que `build/.htaccess` contenga las redirecciones.
- [ ] **Step 5: Commit** — `feat(seo): metadatos y sitemap del nuevo sitio`

---

### Task 10: Limpieza, verificación final y documentación

**Files:**
- Delete: `src/main-component/ProjectPage/`, `ProjectDetails/`, `ServicePage/`, `SeviceSinglePage/`, `AboutPage/`, `ContactPage/`, `HomePage/`, `ProjectsPage/ProjectsPage.tsx`, `src/components/Header/MegaMenu1.tsx`, `MegaMenu2.tsx`, y todo componente/CSS/imagen del template que quede sin importar (comprobar con `npx ts-prune` o búsqueda de imports antes de borrar)
- Modify: `package.json` (quitar dependencias que queden sin uso), `contex/README.md`
- Create: `contex/INFORME-estado-2026-11.md` (formato Obsidian, como el de junio)

- [ ] **Step 1: Borrar código muerto** y dependencias sin uso; no tocar lo que usen las páginas de detalle del portafolio ni `AtlasOneDemos`.
- [ ] **Step 2: Comprobar** — `CI=true npm test -- --watchAll=false` → PASS; `CI=false npm run build` → sin errores; `grep -rIl "9333ea\|blockchain" src/site src/seo` → sin resultados (salvo la entrada SEO de Open Cashback).
- [ ] **Step 3: Verificación visual completa** — servir `build/` y capturar con Chromium headless las 6 páginas + un detalle de portafolio a 360, 768 y 1440px. Revisar en cada una: sin scroll horizontal (`document.documentElement.scrollWidth <= innerWidth`), CTA "Agenda una llamada" visible sin scroll en Home, lima solo donde permite el spec, etiquetas de estado presentes. Repetir Home con `--force-prefers-reduced-motion`.
- [ ] **Step 4: Criterios de §10 del spec** — recorrerlos uno por uno y anotar el resultado en el informe.
- [ ] **Step 5: Documentar** — `INFORME-estado-2026-11.md` con mapa del sitio nuevo, identidad, decisiones, cifras pendientes del dueño y checklist de despliegue; actualizar `contex/README.md`.
- [ ] **Step 6: Commit** — `chore: limpieza del template e informe de estado 2026-11`
