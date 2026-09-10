# Home Modernist · Narrativa Startup Story v3 — Diseño

Fecha: 2026-09-09
Estado: aprobado en conversación, pendiente de revisión escrita
Alcance: página principal `/` y `/en` del sitio atlastech.mx, dentro del app React existente (`atlasws/`)

## 1. Objetivo

Reemplazar el Home actual (template oscuro violeta con hero 3D) por una página de nueve
secciones que cuente la narrativa del deck canónico `Atlas Tech Startup Story v3` con el
sistema visual **Modernist** (fondo claro, tinta, acento rojo, Archivo, cero radio, reglas de 2px).

Prueba de éxito: alguien que hace scroll completo sin leer a fondo repite tres cosas:

1. Atlas construye infraestructura para que las organizaciones operen con agentes.
2. Ya corre en producción con números reales.
3. El equipo lleva diez años construyendo.

## 2. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Dónde se construye | Dentro del app React (CRA), nueva ruta `/` y `/en`. Páginas internas no se tocan. |
| Aislamiento de estilos | Capa CSS con scope `.mst` + `html[data-theme="modernist"]`, importada al final de `index.tsx`. |
| Idioma | Bilingüe ES/EN con rutas separadas: `/` (es-MX) y `/en` (en). Solo el Home tiene versión EN. |
| CTA primario del hero | "Ver Atlas ONE" → `https://atlasone.com.mx/`, pestaña nueva, `rel="noopener noreferrer"`. |
| Cliente de sección 05 | Anónimo: "cliente de retail multi-sucursal". |
| Foto sección 09 | `photo-intarg-2017.jpg` (tres fundadores con medallas) en `.grayscale`. |
| Navegación | Rutas existentes con estilo Modernist: Inicio · Nosotros · Servicios · Proyectos · Contacto + toggle ES/EN. |
| Contacto | Formulario Modernist que hace POST a `/api/contact.php` (PHP en Hostinger). Destino `hola@atlastech.mx`. |
| Dominio | `atlastech.mx` (sin cambios en `seo.config.json`). |
| Página Atlas ONE propia | Fuera de alcance. |

## 3. Hallazgos que condicionan el trabajo

- El bundle Modernist en `contex/atlas startup/_ds/modernist-*/` está incompleto: solo trae
  `styles.css`, `readme.md`, el manifest y un `_ds_bundle.js` vacío. No existe
  `templates/landing/` ni `components/`. Se construye a partir de `styles.css` y `readme.md`.
- El sitio actual carga globalmente Bootstrap 5, `main.css` (body oscuro, Montserrat, texto blanco),
  animate.css, fontawesome, themify, mousecursor. Todo sigue cargando; el Home nuevo se defiende con scope.
- `ContactForm.tsx` actual no envía nada (`console.log` + `alert`).
- No hay PHP en la máquina de desarrollo. El endpoint se prueba en Hostinger tras el deploy.
- La captura `atlasone-metrics.png` muestra datos que están en la lista de "no publicar"
  (MRR proxy, gráfica de tendencia histórica) y un dato no autorizado ("Tenants activos 11").
  Se recorta antes de publicar (ver §6).

## 4. Arquitectura

### 4.1 Archivos nuevos

```
atlasws/src/
  modernist/
    modernist.css                 # tokens en :root + clases del sistema con scope .mst + reset local
  i18n/
    types.ts                      # tipo HomeDict (una sola forma para es y en)
    es.ts                         # diccionario español (copy literal del deck v3)
    en.ts                         # diccionario inglés
    useLang.ts                    # hook: lang desde el prefijo de la URL; helper langPath()
  pages/home/
    HomePage.tsx                  # compone header, 9 secciones + contacto, footer; recibe lang
    sections/
      Hero.tsx                    # 01
      Pattern.tsx                 # 02
      Thesis.tsx                  # 03
      Stack.tsx                   # 04
      Production.tsx              # 05
      Ladder.tsx                  # 06
      RecordToAction.tsx          # 07
      Horizons.tsx                # 08
      Builders.tsx                # 09
      Contact.tsx                 # formulario + datos de contacto + pie
  components/mst/
    MstHeader.tsx                 # .nav con marca, enlaces, toggle ES/EN
    MstFooter.tsx                 # pie: marca, base, redes, legal
    Band.tsx                      # banda numerada con kicker, titular, hijos y .hr al cierre
    Grid.tsx                      # celdas de ancho igual con reglas visibles
    StatRow.tsx                   # fila de cifras separadas por reglas verticales + pie de fuente
    AtlasMark.tsx                 # SVG inline de la marca (currentColor)
atlasws/public/
  api/contact.php                 # endpoint de correo
  images/home/
    atlasone-metrics-crop.webp    # captura recortada (§6)
    founders-intarg-2017.webp     # foto de sección 09
docs/superpowers/specs/2026-09-09-home-modernist-design.md
```

### 4.2 Archivos modificados

- `src/index.tsx`: importa `./modernist/modernist.css` después de `responsive.css`.
- `src/main-component/router/index.tsx`: `/` y `/home` montan el `HomePage` nuevo; se añade `/en`.
- `src/seo/seo.config.json`: ruta `/en`, campo `locale` por ruta, campo `alternates`.
- `src/seo/resolveSeo.ts`: expone `locale`, `lang` y `alternates` resueltos.
- `src/seo/SeoRouter.tsx`: emite `<link rel="alternate" hreflang>`, `og:locale` por ruta, fija `<html lang>`.
- `scripts/seo-build.cjs`: mismo comportamiento en el HTML estático; `/en/index.html` y sitemap con `/en`.
- `package.json`: dependencia `lucide-react`.

No se borra código legado en este ciclo (`HomePage/index.tsx` viejo, Hero 3D, etc.).

### 4.3 Aislamiento de estilos

- `modernist.css` = `styles.css` del sistema con cada selector de componente prefijado por `.mst`
  (`.mst .btn`, `.mst .hr`, `.mst h1`…). Las variables `--color-*`, `--font-*`, `--space-*`,
  `--radius-*`, `--shadow-*` quedan en `:root` con los valores del sistema. Se conserva el
  `@import` de Archivo (400/600/800).
- Reset local dentro de `.mst`: `color`, `font-family`, `line-height`, `letter-spacing`,
  `text-align: left`, `h1–h6` sin los estilos del template, `a` y `button` sin `!important`
  del template, `ul` sin bullets. Sin `!important` salvo donde `main.css` ya lo use.
- `HomePage` en `useEffect` pone `document.documentElement.dataset.theme = "modernist"` y lo
  retira al desmontar. `html[data-theme="modernist"] body { background: var(--color-bg); color: var(--color-text); }`.
- Lenis y GSAP siguen activos globalmente (`App.tsx`). El Home nuevo no usa `.xb-text-reveal`
  ni WOW, así que no hay animaciones del template.

### 4.4 Componentes base

- `Band`: `<section id="s05" class="mst-band">` con cabecera `05 · PRODUCCIÓN REAL` en caja alta con
  tracking, `h2` display, contenido, y `<hr class="hr">` al final. Padding vertical desde `--space-8`.
  Ancho máximo del contenido: `min(100%, 1280px)`, márgenes desde `--space-4`/`--space-8`.
- `Grid`: `display: grid; grid-template-columns: repeat(N, 1fr)`; reglas verticales con
  `border-left: 2px solid var(--color-divider)` a partir de la segunda celda; en móvil colapsa a 1 o 2
  columnas y la regla pasa a `border-top`.
- `StatRow`: cuatro celdas, cifra en display con `color: var(--color-accent)`, etiqueta en
  texto, y `figcaption` con fuente, periodo y corte. Sin la cifra no hay pie; sin pie no hay cifra.
- `MstHeader`: `.nav` sticky (`position: sticky; top: 0`), fondo `--color-bg`, borde inferior 2px.
  Marca `AtlasMark` + "Atlas Tech". Enlaces con `aria-current`. Toggle ES/EN como `.seg` de dos
  `.seg-opt` con `<a>` en lugar de radios (navegación real). En móvil, menú colapsado con `<details>`
  nativo, sin JS.
- `MstFooter`: marca, "Ciudad de México · Desde 2016", `hola@atlastech.mx`, WhatsApp
  `wa.me/527221495215`, Instagram, Facebook. Regla 2px superior.

### 4.5 Las nueve secciones

| # | Sección | Titular (ES) | Composición |
|---|---|---|---|
| 01 | Hero | La próxima organización será agéntica. | `h1` display (clamp 44–96px), bajada, meta "Ciudad de México · Desde 2016", CTA `.btn.btn-primary` "Ver Atlas ONE" con icono `arrow-up-right`. Flush left. |
| 02 | El patrón | Cambiaron las industrias. El problema era el mismo. | `Grid 4`: Gobierno · Retail · Finanzas · Logística. Debajo `Grid 3×2` con los seis síntomas. Cierre en `h3`. |
| 03 | La tesis | Los sistemas actuales registran. No entienden. | `Grid 3` numerado 01/02/03: Entender · Ejecutar · Aprender + descripción. Cierre "Esa es la organización agéntica." |
| 04 | Qué construimos | Construimos la infraestructura para operar organizaciones. | Tres filas apiladas con `.hr` entre ellas, orden 03→01. Cada fila: etiqueta de capa, nombre, lista de módulos en `Grid`. Cortex: nombre en `--color-accent-700` y `.tag.tag-accent` "Inteligencia". |
| 05 | Producción real | Ya está en producción. | Figura `.grayscale` con la captura recortada, `StatRow` con $80.1M · 134,844 · $593.93 · 13, pie obligatorio. |
| 06 | De proyecto a plataforma | Cada cliente nos enseña algo que el siguiente ya no tiene que pagar. | Escalera de seis pasos como lista ordenada en `Grid 6` (desktop) / `Grid 2` (móvil), icono `arrow-down` entre pasos en móvil, `arrow-right` en desktop. Cierre "No empezamos de cero cada vez." |
| 07 | De operación a inteligencia | Primero digitalizamos la operación. Ahora la estamos haciendo inteligente. | `Grid 2` con regla vertical: "Atlas ONE sabe" / "Atlas Cortex pregunta" (derecha en `--color-accent-700`). Cierre: poster de ancho completo `background: var(--color-accent); color: var(--color-bg)` con "From system of record to system of action." Único poster rojo del sitio. |
| 08 | Tres horizontes | Construimos hoy. Investigamos lo que sigue. | `Grid 3`: Atlas ONE (hoy) · Atlas Cortex (lo siguiente) · Atlas Labs (frontera). Cada celda con `.tag` de estado: En producción / En desarrollo / Investigación. Labs con `border: 2px dashed var(--color-divider)`. |
| 09 | Built by builders | Built by builders. | Foto INTARG 2017 en `.grayscale` a ancho completo con `figcaption` "INTARG · Katowice · 2017". `Grid 3`: Emmanuel · Leonardo · Israel con áreas en caja alta. Línea "13 reconocimientos internacionales, 2016–2021". Cierre "Diez años después, seguimos haciendo lo mismo: construir." |
| — | Contacto | Hablemos. | Formulario (§7) a la izquierda, datos de contacto a la derecha en `Grid 2`. Después, `MstFooter`. |

### 4.6 Reglas del acento

El rojo `--color-accent` aparece solo en: CTA primario del hero, las cuatro cifras de la sección 05,
y el poster de la sección 07. Texto de párrafo en acento (columna Cortex de 07, nombre Cortex en 04)
usa `--color-accent-700`. Hover y pressed desde la rampa; focus con `outline: 2px solid var(--color-accent)`.

## 5. Bilingüe

- `useLang()` devuelve `"es" | "en"` según `pathname` empiece por `/en`. `langPath(lang, path)` construye
  la URL del Home en el otro idioma (`/` ↔ `/en`). Solo el Home tiene EN; los enlaces del header hacia
  Nosotros, Servicios, Proyectos y Contacto apuntan a las páginas en español desde ambos idiomas.
- `HomeDict` es un tipo con todas las llaves del copy; `es.ts` y `en.ts` lo implementan. Un test
  garantiza que ambos tienen el mismo conjunto de llaves (recursivo).
- Frases que no se traducen: "Built by builders." y "From system of record to system of action."
- SEO: en `seo.config.json` cada ruta puede llevar `locale` (default `es_MX`) y `alternates`
  (mapa `hreflang → path`). `/` y `/en` se declaran mutuamente con `x-default` en `/`.
  `SeoRouter` y `seo-build.cjs` emiten los `<link rel="alternate" hreflang="…">`, `og:locale`
  según la ruta y (runtime) `document.documentElement.lang`.
- `meta theme-color` del `index.html` se deja como está (afecta a todas las rutas).

## 6. Contenido y assets

- Copy ES: literal del deck v3 para titulares y cierres; bajadas del task pack. Copy EN escrito en
  este ciclo, marcado para revisión del equipo.
- Cifras autorizadas: $80.1M MXN · 134,844 · $593.93 · 13 sucursales, con pie
  "Fuente: panel Atlas ONE · cliente de retail multi-sucursal · últimos 90 días · corte 09.09.2026 · MXN".
  No se publica ninguna otra cifra del deck.
- Captura: `atlasone-metrics.png` recortada con `sharp` a la región de la cabecera y las tres primeras
  tarjetas (Revenue, Tickets, AOV), sin la tarjeta "Tenants", sin la segunda fila ni la gráfica.
  Salida WebP en `public/images/home/`. Se muestra dentro de `.grayscale`.
- Foto: `photo-intarg-2017.jpg` → WebP, ancho máximo 1600px.
- Marca: `atlas-mark.svg` como componente inline con `fill="currentColor"`.
- Estados visibles en la sección 08: Atlas ONE "En producción", Cortex "En desarrollo", Labs "Investigación".
- Fuera del sitio: panel de doce proyectos, niveles de autonomía, modelo de negocio, collage de premios.

## 7. Contacto

- Campos: nombre, correo, organización (opcional), mensaje, honeypot oculto `website`. Sin adjuntos.
- Cliente: `fetch("/api/contact.php", { method: "POST", body: JSON })`. Estados: `idle | sending | sent | error`.
  En `error` se muestra fallback con enlaces a `mailto:hola@atlastech.mx` y WhatsApp.
- `public/api/contact.php`: solo POST, `Content-Type: application/json`, límite 10 KB, valida
  nombre (2–120), correo (`filter_var`), mensaje (10–4000), rechaza si honeypot lleno, sanea cabeceras,
  `mail("hola@atlastech.mx", …)` con `Reply-To` del remitente, responde `{ ok: true }` o
  `{ ok: false, error }` con código HTTP acorde. Sin dependencias.
- Desarrollo local sin PHP: el form cae en `error` con fallback. Prueba real tras deploy en Hostinger.
- `.htaccess`: la regla de SPA ya deja pasar archivos existentes, así que `/api/contact.php` se sirve.

## 8. Pruebas

- Unit (Jest + RTL, ya configurados):
  - `useLang` / `langPath`.
  - `resolveSeo("/en")` devuelve `locale`, `lang`, `alternates`.
  - Diccionarios `es` y `en` con las mismas llaves.
  - Estados del formulario de contacto (mock de `fetch`): sent, error con fallback, honeypot.
  - Cada sección renderiza con ambos diccionarios sin lanzar.
- Script: `node scripts/seo-build.cjs` sobre un `build/index.html` de prueba genera `/en/index.html`
  con hreflang y sitemap con `/en`.
- Manual antes de cerrar: `CI=false npm run build` limpio; revisión visual desktop y móvil de las
  nueve secciones; rojo solo en los tres lugares; sin esquinas redondeadas; sin scroll horizontal.

## 9. Fuera de alcance

Página Atlas ONE en Modernist, página de gobierno, rediseño de páginas internas, EN para páginas
internas, borrado de componentes legacy, cambio de dominio o correo.

---

## Addendum v2 (2026-09-09, misma sesión) — giro a lenguaje oscuro del deck

Decisión del cliente al ver la versión Modernist clara en local: el Home debe ser oscuro y "épico",
con el mismo sistema visual que los decks canónicos (`Atlas Tech Startup Story v3`, `Epic Deck`).

**Qué cambia**

| Elemento | v1 Modernist | v2 Deck |
|---|---|---|
| Fondo / tinta | `#f3f2f2` / `#201e1d` | `#000` / `#e8e8e8`, grises `#c4c4c4`, `#8a8a8a`, `#5c5c5c` |
| Acento | Rojo `#ec3013` | Lima `#C6FF3D` con texto negro encima |
| Display / cuerpo | Archivo / Archivo | Barlow Condensed 800 / Barlow 400–600 |
| Etiquetas técnicas | Archivo caja alta | JetBrains Mono |
| Reglas | 2px sólidas | 1px translúcidas `rgba(255,255,255,.14)` |
| Imágenes | Todo en `.grayscale` | Renders a color a sangre con velo negro; solo la foto de fundadores en B/N |
| Poster 07 | Banda roja | Banda lima con texto negro |
| Movimiento | Ninguno | Una sola entrada en el hero, respeta `prefers-reduced-motion` |

**Qué no cambia:** estructura de nueve secciones + contacto, componentes (`Band`, `Grid`, `StatRow`,
header, footer), i18n `/` y `/en`, SEO con hreflang, formulario y endpoint PHP, cifras autorizadas y
sus pies, cero radio, todo flush left, scope `.mst` y atributo `html[data-theme="modernist"]` (el
nombre se conserva por compatibilidad del código; el tema es el oscuro).

**Imaginería** (generada por `scripts/prepare-home-images.cjs` desde `contex/atlas startup/assets`):
- Hero: `hero-datacenter.webp` (archivo fuente `img-orbit-network.png`, que es el render del datacenter).
- Sección 07: `cortex-laptop.webp` detrás de las dos columnas, con opacidad y degradado a negro.
- Sección 05: captura del panel, ya oscura, sin filtro.
- Sección 09: `founders-intarg-2017.webp` en `.grayscale`.
- Fuera a propósito: el render del coche (`img-datacenter-tower.png`) y el POS (`img-knowledge-building.png`).

**Regla del acento (v2):** lima solo en el CTA del hero, las cuatro cifras de 05, el poster de 07, los
índices de sección/celda, el nombre de Cortex y los enlaces. Ningún fondo lima fuera del poster y el CTA.
