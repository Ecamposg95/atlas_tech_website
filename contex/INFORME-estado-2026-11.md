---
title: "Atlas Tech — Sitio Web · Informe de Estado"
date: 2026-11-27
type: informe
status: listo-para-deploy
domain: atlastech.mx
repo: github.com/Ecamposg95/atlas_tech_website
aliases:
  - Informe Atlas Tech Web nov 2026
tags:
  - atlas-tech
  - proyecto/web
  - producto/cortex
  - producto/atlas-one
---

> [!abstract] Resumen
> El sitio dejó de presentarse como "venture studio de IA + blockchain". Ahora cuenta una sola
> historia: **Atlas Tech es una startup que construye sistemas agénticos, ontologías de
> conocimiento e integra tecnologías de frontera**. El producto principal es **Atlas Cortex**,
> posicionado como *Consulting as a Service*; **Atlas ONE** es la base operativa en producción;
> Harvestt, SIGMA y Open Cashback quedan como portafolio. Toda la conversión lleva a
> **"Agenda una llamada"**.
>
>
> **Actualización del 26.11.2026 (v4.1).** Se integraron el documento fundacional y el brochure
> institucional "The Road to Synthetic Organizations": página `/vision`, Atlas Core, Atlas Solutions,
> cuatro familias de producto con estado, alcance del MVP de Cortex, gobernanza y cifras anuales.
> La tesis de largo plazo vive en `/vision`, en español.
>
> **Actualización del 27.11.2026 (v4.2).** El sitio ahora se mueve y se deja usar. Portada nueva en
> código (un amanecer visto desde órbita) con el titular **"Lleva tu empresa a la frontera de lo
> posible."**, sección "Atlas en números" con todas las cifras publicadas y una línea de tiempo
> 2016–2026, ilustraciones animadas de Cortex tomadas de su repositorio, un **demo jugable** de
> punto de venta en Atlas ONE, portada Moonshot y esquemas en Visión, y Contacto ampliado.
> Todo el movimiento se apaga con "reducir movimiento".
>
> Diseño de la visión: `docs/superpowers/specs/2026-11-25-vision-y-arquitectura-de-producto-design.md`
> Diseño de la reestructura: `docs/superpowers/specs/2026-11-17-reestructura-sitio-cortex-design.md`
> Plan: `docs/superpowers/plans/2026-11-17-reestructura-sitio-cortex.md`

---

## Mapa del sitio

```mermaid
graph TD
  Home["/ · Home"]
  Home --> Cortex["/cortex"]
  Home --> One["/atlas-one"]
  Home --> Port["/portafolio"]
  Home --> Vis["/vision"]
  Home --> Nos["/nosotros"]
  Home --> Con["/contacto"]
  Port --> H["/proyectos/harvestt"]
  Port --> S["/proyectos/sigma"]
  Port --> O["/proyectos/open-cashback"]
```

### Estructura del Home

| # | Sección | Contenido |
|---|---|---|
| 1 | Portada | Amanecer orbital a pantalla completa, en CSS y SVG. Encima, el titular "Lleva tu empresa a la frontera de lo posible.", los botones y un carril con Cortex, ONE y Solutions y su estado |
| — | Franja | Lo que construimos, en movimiento continuo |
| 2 | Cómo funciona | Diagnóstico → Plan → Ejecución → Evidencia |
| 3 | Moonshot | "De agentes a organizaciones sintéticas", con enlace a `/vision` |
| 4 | Atlas en números | Todas las cifras publicadas en cuatro grupos, cada uno con su fuente, y línea de tiempo 2016–2026 |
| 5 | Qué construimos | Cuatro familias con estado y, debajo, el grafo de conocimiento de Cortex |
| 6 | Atlas ONE | Base operativa en producción, prueba de 1 mes gratis y demostración de la pantalla Cobrar |
| 7 | Atlas Solutions | Ingeniería a la medida: cuatro cifras con fuente y enlace a la metodología |
| 8 | Clientes | Nueve logos ya publicados |
| 9 | Portafolio | Harvestt, SIGMA, Open Cashback |
| 10 | Cierre | *Agenda una llamada* sobre el horizonte de luz |

### Páginas ampliadas en v4.2

| Página | Qué cambió |
|---|---|
| `/` | Portada orbital, titular nuevo, franja en movimiento, "Atlas en números", grafo de Cortex y demostración de Cobrar |
| `/cortex` | Grafo de conocimiento en el encabezado, sección "El agente en la consola" (pasos del agente, vista previa, Confirmar / Rechazar) y el equipo de agentes alrededor del orquestador |
| `/atlas-one` | Demostraciones de Cobrar y "¿Cómo voy?", y un **demo jugable**: se elige giro, se arma el carrito, se cobra con cambio, sale el ticket y se actualiza el tablero de la sesión. La galería anterior queda como "Pantallas por giro" |
| `/vision` | Portada Moonshot (horizonte, luna y trayectoria), capas apiladas, esquema de la organización sintética, niveles de acción en bucle y hoja de ruta con "Estamos aquí" |
| `/contacto` | Vista previa en vivo del mensaje de WhatsApp, hora de Ciudad de México, "Qué pasa después", "Por dónde empezar", preguntas frecuentes y cierre con el horizonte |
| `/portafolio` | Harvestt con el render del domo geodésico y el panel del invernadero virtual, marcado como "Simulado" |
| `/nosotros` | Línea de tiempo 2016–2026 |

### Páginas añadidas o ampliadas en v4.1

| Página | Qué cambió |
|---|---|
| `/vision` (nueva) | Siete capas del software, declaración en cuatro tiempos, manifiesto, organización sintética y sus principios, lo que no buscamos, gobernanza (niveles N1–N4 y controles base), tres horizontes, hoja de ruta 2026–2040 como escenarios y Atlas Labs con método y primer experimento por línea |
| `/cortex` | Alcance del MVP con criterio de salida por capacidad y lo que queda fuera del MVP |
| `/atlas-one` | Sección Atlas Core (el núcleo y sus módulos) y cifras anuales |
| `/portafolio` | Atlas Solutions: cifras, metodología en cinco pasos, casos frecuentes y modelos de trabajo |

Redirecciones 301 (router + `.htaccess`): `/home`→`/`, `/about`→`/nosotros`, `/contact`→`/contacto`,
`/service` y `/service-details`→`/cortex`, `/proyectos`→`/portafolio`, `/proyectos/atlas-one`→`/atlas-one`.

---

## Identidad: Atlas Horizon

> [!info] Tres iteraciones de marca el mismo día
> El diseño se aprobó como "NOIR con chispa lima"; pasó por Atlas Noir (azul hielo) y terminó en
> **Atlas Horizon**, la guía vigente: negro cinematográfico, luz ámbar y tipografía ligera.

| Elemento | Valor |
|---|---|
| Fondo | `#050505` |
| Texto | `#F5F2EE` (blanco cálido) · secundario `#A8A29A` · tenue `#8A837B` (`#6E6862` queda solo para líneas) |
| Acento | ember `#FF6A1F`, una palabra o frase clave por vista |
| Luz | ámbar `#FFA14A`, núcleo `#FFD3A8`, sombra cálida `#7A240A`, toque frío `#C9DBEA` al final del haz |
| Índigo | `#5B58B8` y lavanda `#9AA6E0`: contraluz frío en el horizonte y los cierres, nunca le gana al ember |
| Señal | `#9FE0C0`, solo para la etiqueta `Validado` |
| Tipografía | Inter 300 en titulares y cifras; 400–500 en botones. Nunca 700. JetBrains Mono solo en folios y etiquetas |
| Formas | Botones y navbar en píldora, cards de vidrio (radio 22px), una card ember destacada, grano de película |
| Motivo | **Horizonte**: abre el Home como un amanecer visto desde órbita y lo cierra como arco. Haz en el statement y los cierres; resplandor en páginas de contenido; variante **Moonshot** (horizonte, luna y trayectoria) en Visión |
| Lockup | `Atlas Tech`; el producto protagonista en ember (`Atlas Cortex`) |

Desde la v4.2 la **portada** del Home está hecha en código (`components/HeroHorizon.tsx`): no depende
de una fotografía, así que no se recorta mal en ningún tamaño, y el titular es texto real. La imagen
anterior ("Atlas Tech on the Ember Horizon", en `public/images/hero/`) ya no se usa, pero sigue en el
repositorio. Toda la luz es CSS y SVG (`Atmosphere.tsx`, `HeroHorizon.tsx`, `VisionVisuals.tsx`), sin WebGL.
Lo nuevo vive en `atlasws/src/site/` bajo la clase `.noir` (nombre histórico). Las páginas de detalle del
portafolio conservan su estética y solo comparten header y footer. `src/site/brand.test.ts` hace cumplir
la paleta y los pesos tipográficos.

Las cifras de Atlas ONE aparecen en el Home dentro de "Atlas en números", cada una con la leyenda
"en Atlas ONE" y su pie de fuente, para que no se lean como tracción de Cortex.

---

## Movimiento y demostraciones (v4.2)

El movimiento explica; no decora. Cada pieza tiene un estado de reposo completo y todo se apaga si la
persona pidió reducir el movimiento. La base está en `src/site/lib/motion.tsx`.

| Pieza | Dónde | Qué hace |
|---|---|---|
| Portada orbital | Home | El sol asoma sobre el borde del planeta; las estrellas titilan |
| Cifras | Home, Atlas ONE, Portafolio, Nosotros | Cuentan hasta su valor al entrar en pantalla |
| Grafo de conocimiento | Home, Cortex | Nodos en cascada y pulsos por las relaciones |
| Consola del agente | Cortex | La persona escribe, el agente muestra sus pasos, propone y espera la confirmación |
| Equipo de agentes | Cortex | El orquestador resalta un agente a la vez |
| Cobrar y "¿Cómo voy?" | Home, Atlas ONE | Demostraciones en bucle, sin cifras de operación |
| Demo jugable | Atlas ONE | Punto de venta funcional con productos y precios de ejemplo; todo ocurre en el navegador |
| Capas, niveles de acción, hoja de ruta | Visión | Esquemas en bucle |
| Vista previa del mensaje | Contacto | Refleja en vivo lo que se abrirá en WhatsApp |
| Aparición al hacer scroll | Todo el sitio | Secciones y cards entran en cascada |

Las ilustraciones de Cortex, Atlas ONE y Harvestt usan los nombres reales de cada interfaz, tomados de
sus repositorios el 27.11.2026.

---

## Honestidad del contenido

- Cada producto y capacidad lleva etiqueta de estado: Atlas ONE `Validado`, Atlas Cortex `MVP`,
  Atlas Solutions `Validado`, sistemas agénticos `Validado`, Atlas ONE AI `En desarrollo`,
  Atlas Labs y el moonshot `Investigación`, roadmap de Cortex como `Concepto` / `Investigación`.
- Atlas Core es el núcleo de Atlas ONE; sus módulos: Financials `MVP`, Booking `MVP`, Print Agent `Validado`.
- La hoja de ruta 2026–2040 se presenta como escenarios de planificación, no como predicciones.
- No se publican Project Genesis, SOMM, OCGR ni VAO hasta validarlos. Los mensajes del documento
  fundacional van traducidos al español.
- En `/cortex` los ocho agentes por función se presentan como "el equipo que estamos construyendo".
- Cifras publicadas (con fuente, periodo y corte): $80.1M MXN, 134,844 tickets, $593.93
  (Atlas ONE, 90 días, corte 09.09.2026) y 13 reconocimientos internacionales (2016–2021).
- Cifras añadidas en v4.1, autorizadas por la guía de marca y publicadas en el brochure, con fuente y
  periodo 2026: $350M MXN procesados y 13 sucursales activas (Atlas ONE); 7 clientes enterprise,
  25 integraciones activas, 100+ usuarios directos y MVP en 2 semanas (Atlas Solutions).
- Desde la v4.2 el Home reúne todas las cifras en "Atlas en números". **Faltan los acumulados
  históricos de Atlas ONE**: solo se tienen las cifras de 90 días y de 2026, y no se inventó ninguna.
- Una ilustración no es una captura: las interfaces dibujadas en código lo dicen en su pie. Las
  demostraciones en bucle no muestran importes; el demo jugable usa productos y precios de ejemplo y lo
  aclara; el panel de Harvestt va marcado como "Simulado".
- El titular del Home ya no dice que los agentes "diagnostican": el módulo de diagnósticos se retiró del
  código de Cortex el 22.10.2026 y hoy esa parte la entrega el equipo.
- Las acciones de ejemplo del esquema de niveles de acción (Visión) son ilustrativas, no vienen de un
  documento de los fundadores.
- Pruebas automáticas (`src/site/content/content.test.ts`) fallan si aparece una cifra sin fuente,
  un cliente no autorizado, un término prohibido o un mensaje en inglés.

---

## Conversión

Sin backend. "Agenda una llamada" → `/contacto` → WhatsApp (`wa.me/527221495215`) con mensaje
prellenado; el formulario arma el mensaje y abre WhatsApp, con `mailto:` como alternativa.
"Pruébalo 1 mes gratis" (Atlas ONE) → WhatsApp con otro mensaje + enlace a `atlasone.com.mx`.

**Contacto público, decidido el 26.11.2026:** el sitio conserva `hola@atlastech.mx` y WhatsApp
`722 149 5215`. El contacto del brochure y de la guía de marca no se usa en la web.

---

## Enlaces a repos y productos

| Producto | Enlace en el sitio | Motivo |
|---|---|---|
| Atlas ONE | `atlasone.com.mx` | El repo **no** se enlaza (ver pendientes de seguridad) |
| Atlas Cortex | ninguno | Repo privado |
| Harvestt | plataforma en vivo + repo público | README presentable |

---

## Stack tras la limpieza

React 19 + TypeScript (CRA), React Router 7, Lenis, Bootstrap (solo para las páginas de detalle).
Se retiraron 17 dependencias sin uso (three, gsap, MUI, swiper, slick, wowjs, entre otras) y
305 archivos de la plantilla. 119 pruebas automáticas. La animación es CSS y SVG con ganchos propios,
sin librerías añadidas. Imagen de vista previa (`/images/og-atlas.png`)
y favicon propios de la identidad Atlas Horizon.

---

## Verificación

- **Pruebas:** 119 automáticas en verde (`CI=true npx react-scripts test --watchAll=false`).
- **Compilación:** `CI=false npm run build` sin errores; genera HTML por ruta, `sitemap.xml` (9 URLs) y `robots.txt`.
- **Visual:** capturas en 360, 768 y 1440 px de las seis páginas, un detalle de portafolio y la página
  de error, sin desbordes ni errores de consola.
- **v4.2:** todas las páginas revisadas en 1440, 820, 390 y 360 px, sin desbordes ni errores de consola.
  El demo jugable se probó con clics reales (carrito, cobro en efectivo con cambio, ticket y tablero) y
  tiene una prueba automática del flujo completo.
- **Compilación v4.2:** `CI=false npm run build` volvió a correrse el 27.11.2026 sin errores; el paso de SEO
  inyectó metadatos en 11 rutas y generó `sitemap.xml` (10 URLs) y `robots.txt`.
- **Revisión independiente** del código antes del cambio de marca: sin hallazgos críticos; los
  importantes se corrigieron y los menores están listados abajo.
- **Sin verificar:** las redirecciones 301 contra el Apache real de Hostinger.

---

## Pendientes del dueño

> [!warning] Seguridad (fuera de este repo)
> El repo público `atlas-one` expone en su README credenciales por defecto del superadministrador,
> la clave por defecto de firma de sesiones y datos de un cliente. Recomendación: hacerlo privado
> y rotar esas credenciales.

> [!todo] Contenido
> - [ ] **Acumulados históricos de Atlas ONE** con su fecha de corte, para "Atlas en números"
>       (se agregan en `atlasws/src/site/content/figures.ts`).
> - [ ] Confirmar el titular nuevo del Home, "Lleva tu empresa a la frontera de lo posible."; es una
>       propuesta. Alternativas: "El futuro de tu empresa, en operación hoy." y "Construimos empresas
>       que operan con inteligencia."
> - [ ] Decidir si se borra la imagen anterior de la portada (`public/images/hero/`), que ya no se usa.
> - [ ] Fecha de corte exacta de las cifras anuales y de Atlas Solutions (hoy llevan fuente y periodo 2026).
> - [ ] Confirmar los estados de Financials, Booking y Print Agent (tomados de los repos).
> - [ ] Actualizar la guía de marca (sección 11): Atlas Core como núcleo de Atlas ONE, Atlas Solutions,
>       Harvestt y el lema en español.
> - [ ] Verificar los premios de Harvestt contra los diplomas: el repo registra INTARG 2017 (plata)
>       e ICAN Toronto 2018 (oro); la página de detalle lista 2018, 2019 y 2021.
> - [ ] Cambiar la descripción del repo `harvestt` en GitHub ("2016 awr wina toronto").
> - [ ] Confirmar dos textos: "Nuestro primer cliente de Cortex somos nosotros mismos" (viene del documento de visión de Cortex) y "Desde 2016" (viene de la guía de marca).
> - [ ] Calendario en línea (Cal.com / Calendly) si se quiere agenda directa.
> - [x] Contacto: resuelto. La web conserva `hola@atlastech.mx` y WhatsApp `722 149 5215`.
> - [ ] La guía propone "Agenda un diagnóstico" como llamada a la acción; el sitio usa "Agenda una
>       llamada" (decisión del dueño). Confirmar que se mantiene.
> - [x] "Consulting as a Service" ya no aparece en la portada: el rótulo es "Tecnología de frontera, aplicada".
> - [x] Portada con texto real y adaptable al móvil: resuelto en la v4.2 al hacerla en código.
> - [ ] Las cinco imágenes originales en `contex/` (7 MB en PNG) no están en git; decidir si se suben.

> [!note] Mejoras menores detectadas en la revisión final (no aplicadas)
> - URLs inexistentes responden 200 con la página de error (falta marcarla `noindex`).
> - Las páginas de detalle del portafolio aún enlazan `/contact` y `/proyectos` (funcionan por redirección).
> - Abrir directo `/cortex#estado` o `/atlas-one#demo` no baja a la sección.
> - Menú móvil: sin cierre con Escape; orden de tabulación mejorable. Formulario: sin `aria-invalid`.
> - Con "reducir movimiento", el scroll al cambiar de página sigue siendo suave.
> - Notas de fuente y etiquetas de estado son pequeñas en móvil (≈10 px).
> - Sobras: `@types/react-slick`, lista de imágenes borradas en `optimize-images.cjs`.

> [!todo] Despliegue (Hostinger)
> ```bash
> cd atlasws
> CI=false npm run build      # postbuild inyecta SEO + sitemap + robots
> # Subir TODO build/ a public_html (incluye .htaccess con las redirecciones 301)
> ```
> - [ ] Probar en producción con `curl -I` las 7 direcciones viejas y las 6 nuevas. Las redirecciones solo se
>       verificaron por prueba de contenido, no contra Apache real. Punto a vigilar: el build crea una carpeta
>       por ruta, así que Apache puede redirigir `/cortex` → `/cortex/` (un salto extra frente a la URL canónica).
> - [ ] Reenviar `sitemap.xml` a Google Search Console.

---

## Historial de commits

| Commit | Descripción |
|---|---|
| `770919d` | docs: diseño y plan de la reestructura del sitio (Cortex al frente) |
| `3ae392d` | feat(site): cimientos NOIR — tokens, estado, botones y WhatsApp |
| `47c7e2e` | feat(site): contenido tipado de Cortex, Atlas ONE, Home y Nosotros con pruebas de honestidad |
| `1cdcdbf` | feat(site): header, footer, layout y motivo de órbitas |
| `f27560d` | feat(site): nuevo Home con Cortex al frente |
| `9c2e8ff` | feat(site): página de Atlas Cortex |
| `5f88f8a` | feat(site): Atlas ONE como producto con página propia |
| `c9f61ba` | feat(site): portafolio, nosotros y contacto con WhatsApp |
| `a2e6043` | feat(site): rutas en español, redirecciones 301 y marco compartido |
| `2452d1f` | feat(seo): metadatos y sitemap del nuevo sitio |
| `18e5779` | chore: limpieza del template e informe de estado 2026-11 |
| `5e39df7` | fix(site): correcciones de la revisión final |
| `e2466cb` | feat(brand): identidad Atlas Noir en todo el sitio |
| `5b30571` | docs: documentación alineada a Atlas Noir y al sitio reestructurado |
| `07ca5d3` | feat(brand): acento verde lima en lugar del azul hielo |
| `e357a59` | feat(brand): identidad Atlas Horizon en el sitio y la documentación |
| `3596109` | feat(home): portada con la imagen de marca antes de la primera sección |
| `03b1aef` | fix(brand): contraste de --dim y contraluz índigo de Atlas Horizon |
| `6b9c9fb` | feat(vision): página /vision, Atlas Core y familias de producto con estado |
| `9e34098` | feat(brochure): capas, gobernanza, alcance del MVP y Atlas Solutions |
| `5a476f2` | docs: README, informe de estado y visor local de la documentación |
| `d305216` | feat(sitio): portada épica, demos animadas y demo jugable de Atlas ONE |
| `94d037e` | docs(readme): versión 4.2 con la experiencia animada y el demo jugable |
