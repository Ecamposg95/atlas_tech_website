# Atlas Tech — Landing Page

> **Early-stage startup** B2B enfocada en Inteligencia Artificial y Blockchain para la transformación empresarial en Latinoamérica.

---

## 🚀 Misión

Construimos el futuro con **IA & Blockchain**. Desarrollamos plataformas inteligentes que integran Inteligencia Artificial, análisis de datos en tiempo real y tecnología descentralizada (Blockchain, Web3) para resolver necesidades reales de operación en sectores como retail, distribución e industria.

---

## ✨ Stack Técnico

| Capa | Tecnología |
|---|---|
| Framework UI | React 19 + TypeScript 4 |
| Enrutamiento | React Router DOM 7 |
| Animación 3D | **Three.js** `v0.128` — Globo interactivo de red neuronal |
| Estilos | CSS personalizado + Bootstrap 5 |
| Animaciones | GSAP 3, WOW.js, Lenis (smooth scroll) |
| Build | Create React App (react-scripts 5) |
| Proyectos | Data-driven (`src/data/projects.ts`) + páginas custom premium |
| SEO | Meta por ruta + inyector estático en build + JSON-LD + sitemap |
| Imágenes | Optimización a WebP con `sharp` |
| Deploy | Hostinger (Apache) — **atlastech.mx** |
| Idioma | Español (LATAM) |

---

## 🎨 Identidad Visual — Deep Violet & Neon

La paleta de color fue migrada completamente desde verde-neón a una identidad **Premium Deep Violet**:

```css
--color-primary:   #9333ea;   /* Violeta principal */
--color-secondary: #a855f7;   /* Violeta claro / acento neon */
--color-bg-dark:   #020617;   /* Azul espacial profundo */
--color-bg-mid:    #0f172a;   /* Azul marino */
```

### Hero Section — 3D Globe "Horizonte"

La sección inicial cuenta con un **globo 3D interactivo** renderizado en Three.js:
- Distribución Fibonacci de 1 400 puntos de red sobre la esfera
- Atmósfera con shader Fresnel (efecto borde brillante)
- Campo estelar de 2 000 estrellas con colores de marca
- Interactividad con el cursor del mouse
- **Sticky background**: el globo permanece visible mientras el usuario hace scroll hacia las secciones siguientes
- **Glassmorphism acrílico** (`backdrop-filter: blur`) en la tarjeta de contenido secundaria
- Pausa automática cuando la pestaña está oculta (optimización de rendimiento)

> 📄 Documentación completa de patrones UI: [`contex/Hero 3D Horizonte - Patrones UI.md`](./contex/Hero%203D%20Horizonte%20-%20Patrones%20UI.md)

---

## 📁 Estructura del Proyecto

```
atlas_tech_website/
├── atlasws/                        # App React principal
│   ├── public/
│   │   ├── favicon.svg             # Favicon personalizado (hexágono violeta + A)
│   │   ├── .htaccess               # Apache/Hostinger: SPA + HTTPS + cache + seguridad
│   │   ├── robots.txt
│   │   └── index.html              # Bloque SEO base (reemplazado por ruta en build)
│   ├── scripts/
│   │   ├── seo-build.cjs           # Post-build: inyecta meta por ruta + sitemap + robots
│   │   └── optimize-images.cjs     # Convierte imágenes pesadas a WebP (sharp)
│   └── src/
│       ├── components/             # Hero 3D, Header (+ menú móvil), AtlasOneDemos, footer…
│       ├── data/
│       │   └── projects.ts         # ★ Fuente de datos de proyectos (interfaz + array)
│       ├── seo/
│       │   ├── seo.config.json     # ★ Fuente única SEO (dominio, meta y JSON-LD por ruta)
│       │   ├── resolveSeo.ts        # Resuelve meta por pathname
│       │   └── SeoRouter.tsx        # Aplica meta al <head> en cada navegación (sin deps)
│       ├── main-component/
│       │   ├── HomePage/  AboutPage/  ContactPage/  SeviceSinglePage/
│       │   ├── router/             # Rutas (incluye páginas de proyecto + SeoRouter)
│       │   └── ProjectsPage/
│       │       ├── ProjectsPage.tsx          # /proyectos — grid auto de cards
│       │       ├── ProjectDetailPage.tsx     # /proyectos/:slug — detalle genérico
│       │       ├── HarvesttDetailPage.tsx    # Página custom (SpaceX / AgroTech)
│       │       ├── SigmaDetailPage.tsx       # Página custom (GovTech / institucional)
│       │       └── OpenCashbackDetailPage.tsx# Página custom (Web3 / fintech)
│       ├── css/
│       │   ├── main.css            # Estilos globales + tokens de diseño
│       │   └── responsive.css      # .r-stack (colapso de grids) + safety overflow
│       └── images/                 # Assets visuales, logos e iconos SVG (WebP donde pesa)
├── contex/                         # Documentación, briefs y prototipos de referencia
│   ├── open_cashback_master_brief.md      # Brief técnico de Open Cashback
│   ├── sigma.mb                            # Contexto / brief de SIGMA (GovTech)
│   ├── harvestt_fotos_prompt_maestro.mb    # Prompt maestro para fotos de Harvestt
│   ├── Atlas Hero - Horizonte.html         # Prototipo HTML del hero 3D
│   └── Hero 3D Horizonte - Patrones UI.md  # Guía de patrones UI
└── README.md
```

---

## 🗂️ Proyectos & Portafolio

La sección de proyectos es **data-driven**: todo sale de `src/data/projects.ts`.

- `/proyectos` → `ProjectsPage.tsx` lista automáticamente cada proyecto del array como card.
- `/proyectos/:slug` → `ProjectDetailPage.tsx` genera una página de detalle genérica (agregar al array = página gratis).
- Algunos proyectos tienen **página custom premium** (ruta explícita antes de `:slug`):

| Proyecto | Slug | Categoría | Estética |
|---|---|---|---|
| **Atlas One** | `atlas-one` | SaaS / POS / ERP | Detalle genérico + demo player interactivo |
| **Harvestt** | `harvestt` | AgroTech / IoT / IA | SpaceX — negro, fotografía full-bleed |
| **SIGMA** | `sigma` | GovTech / Sector Público | Institucional — navy + azul acero |
| **Open Cashback** | `open-cashback` | Blockchain / Fintech | Web3 — neón violeta + cyan |

> Para agregar un proyecto: mínimo, añade una entrada a `projects.ts`. Para algo espectacular, crea un `*DetailPage.tsx` y registra la ruta antes de `:slug`.

**Responsive:** las páginas custom usan estilos inline; `src/css/responsive.css` aporta la clase `.r-stack` (colapsa grids de 2→1 columna < 860px) y las rejillas auto-fit usan `minmax(min(Npx, 100%), 1fr)` para no desbordar. El demo de Atlas One se auto-escala con un componente `FitStage`.

---

## 🔍 SEO

SEO potente sobre CRA, sin migrar de framework. **Fuente única de verdad:** `src/seo/seo.config.json`.

- **Runtime** (`SeoRouter.tsx`): sin dependencias (compatible con React 19); actualiza `<title>`, meta, Open Graph, Twitter, canonical y JSON-LD en cada navegación.
- **Build** (`scripts/seo-build.cjs`, corre solo en `postbuild`): genera un `index.html` por ruta con su meta real (clave para crawlers sociales que no ejecutan JS) + `sitemap.xml` + `robots.txt`.
- **Cambiar el dominio** = editar `siteUrl` en `seo.config.json` (actual: `https://atlastech.mx`) y reconstruir.

---

## 🛠️ Instalación y Desarrollo Local

Requisitos: **Node.js ≥ 18** (recomendado 20+; `sharp` requiere ≥ 18)

```bash
# 1. Entrar al directorio de la app
cd atlasws

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo (http://localhost:3000)
npm start
```

---

## 📦 Build de Producción y Despliegue (Hostinger)

```bash
cd atlasws

# (opcional) re-optimizar imágenes pesadas a WebP
npm run optimize-images

# build de producción — el postbuild inyecta SEO por ruta + sitemap + robots
CI=false npm run build
```

Esto genera `atlasws/build/` con: HTML por ruta (SEO), `sitemap.xml`, `robots.txt` y `.htaccess`.

**Subir a Hostinger:**
1. hPanel → Administrador de archivos → `public_html` (vacíalo si hay algo viejo).
2. Sube **todo el contenido de `atlasws/build/`** — incluido el `.htaccess` oculto.
3. Confirma **SSL activo** para `atlastech.mx`.
4. Verifica: abre una subruta directa (p. ej. `atlastech.mx/proyectos/sigma`, sin 404), prueba el Open Graph en el [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) y envía `sitemap.xml` en Google Search Console.

> El `.htaccess` (en `atlasws/public/`, se copia al build) maneja el rewrite SPA respetando el HTML por ruta, fuerza HTTPS y www→no-www, compresión, cache y headers de seguridad.

---

## 📝 Historial de Cambios

### v3.0 — Portafolio, SEO y Optimización (2026-06)
- **Proyectos data-driven**: nueva sección `/proyectos` con cards automáticas desde `src/data/projects.ts`
- **Páginas custom premium**: **SIGMA** (GovTech, institucional navy), **Open Cashback** (Web3, neón violeta/cyan) y rediseño de **Harvestt** (estética SpaceX, fotografía full-bleed)
- **SEO potente** sobre CRA: meta por ruta + Open Graph + Twitter + JSON-LD vía `SeoRouter` (runtime, sin deps) y un inyector estático en `postbuild` (`scripts/seo-build.cjs`) que escribe HTML por ruta + `sitemap.xml` + `robots.txt`. Dominio: `atlastech.mx`
- **`.htaccess`** completo para Apache/Hostinger: SPA, HTTPS, www→no-www, cache, compresión y seguridad
- **Responsividad**: `responsive.css` (`.r-stack`), rejillas auto-fit blindadas con `min(…,100%)` y `FitStage` que auto-escala el demo de Atlas One
- **Optimización de imágenes**: conversión a **WebP** con `sharp` (`scripts/optimize-images.cjs`) — imágenes de Harvestt y del template −90/96%
- **Fundamentos**: `lang="es"`, `homepage:"/"`, canonical, theme-color

### v2.0 — Renovación Visual Completa (2026-04)
- **Hero 3D**: Nuevo bloque inicial con globo interactivo Three.js (variante "Horizonte"), sticky background y capa acrílica de glassmorphism
- **Identidad Visual**: Migración completa de paleta verde-neón → Deep Violet & Neon (`#9333ea` / `#a855f7`)
- **Favicon**: Ícono SVG personalizado (hexágono violeta + letra A)
- **ContactSection**: Eliminadas estadísticas de plantilla; rediseñada con formulario centrado y glassmorphism
- **Copy del Hero**: Posicionamiento como early-stage startup de IA & Blockchain para Latinoamérica
- **Limpieza**: Eliminación de assets, rutas y páginas de la plantilla original sin uso (blog, career, team, testimonial)
- **SVGs**: Todos los íconos migrados de verde a violeta mediante script automatizado

### v1.0 — Configuración Inicial
- Adaptación de plantilla base al español
- Router configurado para la landing principal
- Branding inicial Atlas Tech

---

© 2026 Atlas Tech. Todos los derechos reservados.
