# Reestructura de atlastech.mx: Cortex al frente — Diseño

Fecha: 2026-11-17 · Estado: aprobado e implementado (ver actualización de identidad en §5)

Leyenda: **[Decidido]** = lo dijo el dueño del proyecto. **[Mi decisión]** = lo resolvió quien escribe este documento; se puede cambiar.

## 1. Intención y por qué

Atlas Tech cambió de lo que hace. El sitio actual la presenta como "venture studio de IA + blockchain" con un portafolio de cuatro proyectos. Hoy la empresa es una **startup que construye sistemas agénticos, ontologías de conocimiento e integra tecnologías de frontera**, y su producto principal es **Atlas Cortex**.

El sitio debe contar esa historia nueva y convertir visitas en **llamadas agendadas**.

## 2. Para quién

- **[Decidido]** Público principal: **empresas medianas que buscan automatizar con agentes**. Acción esperada: agendar una llamada.
- **[Decidido]** Público secundario: **emprendedores**.
- **[Mi decisión]** Los emprendedores y negocios físicos tienen como puerta de entrada Atlas ONE (prueba de 1 mes gratis); las empresas medianas, Cortex.

## 3. Mensaje

- **[Decidido]** Cortex es el producto principal.
- **[Decidido]** Cortex se posiciona como **consultoría como servicio ligada al software** ("Consulting as a Service"): consultores y agentes de IA que diagnostican la empresa, arman el plan y lo ejecutan sobre sus sistemas. El entregable es ejecución con evidencia, no un documento.
- **[Decidido]** Se usa la palabra **moonshot**. Texto base (del documento de visión de Cortex): "Hacer posible que cualquier empresa se convierta en una organización AI-native, operada por un equipo humano compacto y una red coordinada de agentes digitales."
- **[Decidido]** Harvestt, SIGMA y Open Cashback se mantienen como portafolio.
- **[Mi decisión]** Etiqueta de categoría en el sitio: "Consulting as a Service". Titular del hero de partida: *"Consultoría que no entrega un PDF. Entrega ejecución."* Línea de producto: *"De la intención empresarial a la ejecución verificable."*
- **[Mi decisión]** Relación entre productos, tomada de los docs de Cortex: "Atlas ONE proporciona los órganos y sistemas de la empresa; Atlas Cortex el cerebro, la memoria y el sistema nervioso."
- Idioma: español de México. Evitar "sinergia" y "revolucionario" (lo pide el brand doc de Cortex).

### Frases disponibles (ya escritas en los repos, usar tal cual)

- "Cortex no es un agente más: es el orquestador."
- "Nativo de IA. No una app con IA encima."
- "Un cerebro, no diez herramientas dispersas."
- "Humanos y agentes: un solo equipo."
- "De la intención al resultado, con trazabilidad."
- "Actúa → registra → aprende → se reconstruye."
- Atlas ONE: "El problema no es cobrar — es operar sin visibilidad." · "Crece dentro del sistema. Sin reinstalar nada." · "Una barbería, una ferretería y un restaurante no operan igual. El software tampoco debería sentirse igual."

## 4. Metas, no-metas y anti-metas

**Metas**
- Que en 10 segundos una empresa mediana entienda: consultoría + agentes que ejecutan, y vea el botón "Agenda una llamada".
- Cortex protagonista; Atlas ONE como producto en producción; portafolio como respaldo.
- Una identidad visual única en todo el sitio.

**No-metas**
- No se migra de Create React App a otro framework.
- No se rediseñan las páginas internas de Harvestt, SIGMA ni Open Cashback (conservan su estética propia); solo cambian header y footer compartidos.
- No se construye sistema de agenda propio, blog, ni versión en inglés.
- No se toca el código de Cortex ni de Atlas ONE.

**Anti-metas** (sería un fracaso aunque funcione)
- **Prometer como hecho lo que es roadmap.** Ver §7.
- Inventar cifras, clientes o testimonios.
- Verse como plantilla genérica de "agencia de IA".
- Perder el posicionamiento en buscadores de las URLs actuales.

## 5. Identidad visual

> **Actualización 2026-11-17 (posterior a la aprobación).** La guía de marca cambió dos veces ese día y el
> dueño pidió aplicar la marca a todo. El sitio construido usa **Atlas Horizon**, no la mezcla descrita abajo:
> fondo `#050505`, acento ember `#FF6A1F` con luz ámbar, titulares en Inter 300 (nunca 700), botones y navbar
> en píldora, cards de vidrio, grano, y el **horizonte** de luz como motivo (reemplaza a las órbitas).
> El hero del Home va centrado sobre el horizonte, y las cifras de Atlas ONE aparecen bajo el moonshot con
> la leyenda "en Atlas ONE" (se relaja la regla de §7 de mostrarlas solo en la sección de Atlas ONE).
> Lo que sigue se conserva como registro de lo aprobado originalmente. Valores vigentes: `README.md` §02
> y `atlasws/src/site/tokens.css`.

**[Decidido]** Mezcla "NOIR con chispa lima": base NOIR (brand doc de Cortex) + acento y etiquetas de Dark Lima (skill de marca de Atlas Tech). Maqueta de referencia: `.superpowers/brainstorm/120531-1794928868/content/mezcla-b-c.html` (opción 1).

| Elemento | Valor |
|---|---|
| Fondo | `#0b0b0b` (paneles un paso más claro, bordes `#222`–`#333`) |
| Texto | `#f2f2f2`; secundario `#9a9a9a`; tenue `#8a8a8a` |
| Acento único | lima `#C6FF3D`, texto negro encima |
| Titulares | Inter 500, tracking −0.035em, sin mayúsculas forzadas |
| Cuerpo | Inter 400 |
| Etiquetas, navegación, botones | JetBrains Mono, mayúsculas, tracking 0.1–0.2em |
| Botones | forma de píldora; primario relleno lima; secundario contorno `#333` |
| Motivo gráfico | órbitas finas concéntricas con un punto lima luminoso |

Reglas:
- El lima aparece solo en: una palabra clave por titular, el botón principal, etiquetas de sección y el punto del motivo. Nada de degradados ni segundo color de acento.
- Mucho aire; reglas de 1px; sin sombras ni tarjetas con relleno llamativo.
- Logo: marca "A" en círculo con `currentColor` blanco; wordmark `ATLAS TECH` en mono.
- El violeta actual (`#9333ea`) desaparece de las páginas compartidas.

**[Mi decisión]** El hero 3D actual (`NetworkGlobe.tsx`, Three.js) se reestiliza a monocromo con nodos lima en lugar de eliminarse, si el resultado se sostiene con la estética NOIR; si no, se sustituye por el motivo de órbitas en SVG/CSS. Quien construya decide tras probarlo; debe respetar `prefers-reduced-motion`.

## 6. Estructura del sitio

**[Decidido]** (aprobado tal cual)

### Home (`/`) — una sola historia, de arriba abajo
1. **Hero**: Cortex como Consulting as a Service + botón "Agenda una llamada" + secundario "Cómo funciona".
2. **Cómo funciona**: Diagnóstico → Plan → Ejecución → Evidencia.
3. **Moonshot**: empresas operadas por humanos y agentes.
4. **Qué construimos**: sistemas agénticos · ontologías de conocimiento · tecnologías de frontera.
5. **Atlas ONE**: base operativa en producción, prueba de 1 mes gratis.
6. **Clientes**: carrusel de logos existente.
7. **Portafolio**: Harvestt, SIGMA, Open Cashback.
8. **Cierre**: botón de agendar llamada.

### Páginas

| Ruta | Contenido |
|---|---|
| `/cortex` (nueva) | Qué es; consultoría + software; cómo funciona; agentes especializados (CFO, Ventas, Compras, Operaciones, Customer Success, Cumplimiento, Project Manager, Analista de datos); niveles de autonomía (Observa → Propone → Ejecuta con aprobación → Ejecuta en política); gobierno y punto de control humano; "Hoy / En construcción / Visión"; llamada a agendar. |
| `/atlas-one` (nueva ruta) | Sube de proyecto a producto. Conserva el demo interactivo (`AtlasOneDemos`). Módulos, giros, "desde $12 MXN al día", 1 mes gratis. `/proyectos/atlas-one` redirige aquí. |
| `/portafolio` | Lista Harvestt, SIGMA, Open Cashback. `/proyectos` redirige aquí. Las páginas de detalle **conservan** sus URLs `/proyectos/harvestt`, `/proyectos/sigma`, `/proyectos/open-cashback`. |
| `/nosotros` | La startup, el moonshot, reconocimientos, cómo trabajamos (equipo compacto + agentes). `/about` redirige aquí. |
| `/contacto` | Centrada en agendar la llamada. `/contact` redirige aquí. |
| `/service`, `/service-details` | Desaparecen; redirigen a `/cortex`. |

Navegación: `Cortex · Atlas ONE · Portafolio · Nosotros` + botón lima "Agenda una llamada". Los mega-menús actuales se sustituyen por esta barra simple.

**[Mi decisión]** Rutas en español (`/nosotros`, `/contacto`, `/portafolio`) con redirecciones desde las viejas, tanto en el router como en `.htaccess` (301) y actualizando `seo.config.json` y el sitemap.

**[Mi decisión]** "Agenda una llamada" lleva a `/contacto`, con WhatsApp (`wa.me/527221495215`, mensaje prellenado) como vía principal y el correo `hola@atlastech.mx` como alternativa. No hay calendario en línea hoy; si después se contrata uno (Cal.com, Calendly), se cambia un solo enlace.

**[Mi decisión]** El formulario actual **no funciona** (`ContactForm.tsx` solo hace `console.log` y un `alert`; los datos se pierden) y no hay backend. Se sustituye por un formulario corto (nombre, empresa, qué quieren automatizar) que **no envía a ningún servidor**: al enviarlo abre WhatsApp con el mensaje armado, con un enlace secundario "prefiero correo" (`mailto:`). Se quita el campo de subir archivo.

**[Mi decisión]** El botón "Pruébalo 1 mes gratis" de Atlas ONE abre WhatsApp con un mensaje prellenado distinto ("Quiero probar Atlas ONE 1 mes gratis"), más un enlace secundario a `atlasone.com.mx`. No hay registro de autoservicio.

## 7. Honestidad del contenido (obligatorio)

Cada producto y capacidad lleva su estado visible, con las etiquetas de la skill de marca: `Validado` · `MVP` · `En desarrollo` · `Concepto` · `Investigación`.

**[Mi decisión]** Asignación de etiquetas:

| Elemento | Etiqueta |
|---|---|
| Atlas ONE (producto) | `Validado` (corregir `projects.ts`, que hoy dice "En desarrollo") |
| Atlas ONE AI | `En desarrollo` |
| Atlas Cortex (producto) | `MVP` |
| Cortex: capacidades "en operación" | `MVP` |
| Cortex: flujos agénticos, ejecución con aprobación, equipo de agentes especializados | `En desarrollo` |
| Cortex: integraciones con ERPs de terceros, operación autónoma, aprendizaje de decisiones | `Concepto` |
| Cortex: ontología formal, GraphRAG | `Investigación` |
| Harvestt, SIGMA, Open Cashback | conservan su vocabulario actual ("Premiado", "En desarrollo"); no cambia el modelo de datos |

En `/cortex`, la sección "Hoy / En construcción / Visión" agrupa por columnas y cada elemento lleva además su etiqueta.

**Cortex — qué se puede afirmar hoy**
- En operación: memoria/RAG por organización, grafo de entidades, CRM/OKRs/KPIs/decisiones, motor de políticas con auditoría, agente (sobre Claude de Anthropic) que propone acciones y la persona las confirma.
- En construcción: flujos agénticos (ejecución con aprobación).
- **Agentes especializados**: hoy existe **un** agente dentro de la plataforma. Los ocho agentes por función (CFO, Ventas, etc.) son diseño en construcción: en `/cortex` se presentan como "el equipo de agentes que estamos construyendo", etiquetados `En desarrollo`, nunca como rejilla de funciones disponibles.
- **Niveles de autonomía**: "Observa" y "Propone" están vivos; "Ejecuta con aprobación" está `En desarrollo`; "Ejecuta en política" es `Concepto`. La página muestra los cuatro como escalera, marcando en cuál está Cortex hoy.
- Visión / roadmap, **no afirmar como existente**: ontología formal y GraphRAG, aprendizaje automático de decisiones, integraciones con SAP/Oracle/Odoo/Dynamics/CONTPAQi/Salesforce/HubSpot, operación autónoma, la meta de "80 % de la coordinación operativa".
- La consultoría la entrega hoy el equipo de Atlas Tech apoyado en Cortex; no es un módulo de autoservicio (ese módulo se retiró del código el 2026-10-22). Redactar en consecuencia: "nuestro equipo + agentes".
- **Laboratorios Sophia es un demo con datos ficticios: no se menciona como cliente ni se usan sus cifras.**

**Atlas ONE**
- En producción, con clientes reales. Sí: módulos de POS, caja, inventario, CRM, restaurante/bar/café, citas, multi-sucursal; 11 configuraciones por giro; "desde $12 MXN al día"; "1 mes gratis".
- "Atlas ONE AI" (copilotos, predicciones) es un esqueleto: presentarlo como `En desarrollo`, nunca como función disponible.
- La marca DataXPOS ya no se usa.

**Cifras**
Toda cifra publicada lleva pie visible con fuente, periodo y fecha de corte. Solo se usan las autorizadas por la skill de marca, y **solo las que tienen periodo y corte**:

- $80.1M MXN en ventas registradas · 134,844 tickets procesados · $593.93 ticket promedio — 90 días, corte 09.09.2026. Son datos de operación de **Atlas ONE** (van en `/atlas-one` y en la sección Atlas ONE del Home, nunca junto a Cortex). Pie: "Fuente: datos de operación de Atlas ONE. Periodo: 90 días. Corte: 09.09.2026."
- 13 reconocimientos internacionales, 2016–2021 — va en `/nosotros`.

**Pendiente del dueño** (no publicar hasta tener producto, fuente y corte): "13 sucursales activas", "$350M MXN procesados durante 2026", "7 clientes enterprise · 25 integraciones activas · 100+ usuarios directos · MVP en 2 semanas". El diseño de las secciones debe funcionar sin ellas y admitirlas después sin rehacer el layout.

**Clientes**: solo los logos que ya están publicados en el sitio (BJX Motors, Syner Group, OftaVisión, DASIC, Smart Site, R MAZH, UNAM, IPN, CIC-IPN). No agregar nombres nuevos (Kaory, Eleven, Ginebra, Imaltzin) sin autorización.

## 8. Restricciones técnicas

- Se construye sobre lo existente: `atlasws/`, React 19 + TypeScript, Create React App, React Router 7, Three.js, GSAP.
- El SEO por ruta sigue funcionando: `src/seo/seo.config.json` (fuente única), `SeoRouter.tsx`, `scripts/seo-build.cjs` (HTML por ruta, sitemap, robots). Cada ruta nueva lleva su entrada; las rutas eliminadas salen del sitemap.
- Hosting: Hostinger con Apache; el `.htaccess` del build lleva las redirecciones 301.
- Responsivo: sin scroll horizontal desde 360px; se conservan los patrones de `responsive.css`.
- Fuentes Inter y JetBrains Mono con respaldo del sistema.
- `CI=false npm run build` debe terminar sin errores.
- Entorno de desarrollo: WSL sobre `/mnt/c`, el hot-reload no funciona (reiniciar `npm start`); verificación visual con Chromium headless.

## 9. Qué queda a criterio de quien construya

- Redacción final de cada sección, dentro de §3 y §7.
- Cómo organizar los estilos nuevos (tokens CSS, convivencia con `main.css` del template y Bootstrap) y qué componentes/CSS heredados del template se eliminan.
- Diseño de detalle de cada sección y página interior, guiado por la maqueta y por la skill `frontend-design:frontend-design`.
- Animaciones (GSAP/WOW) y el destino del globo 3D (§5).
- Limpieza de código muerto (`ProjectPage`, `ProjectDetails`, `ServicePage`, `SeviceSinglePage`, mega-menús, dependencias sin uso).
- Imágenes Open Graph de las páginas nuevas.

## 10. Cómo sabremos que quedó

- Las 6 páginas existen, enlazan entre sí y comparten identidad NOIR + lima; no queda violeta ni texto de "IA + blockchain" en páginas compartidas.
- Todas las URLs antiguas responden (redirigen o siguen vivas); ninguna da 404.
- Toda capacidad de Cortex y Atlas ONE mostrada tiene etiqueta de estado y coincide con §7.
- Toda cifra tiene pie con fuente y corte.
- "Agenda una llamada" es visible sin hacer scroll en Home, en escritorio y móvil.
- Build limpio y revisión visual en 360px, 768px y 1440px.
