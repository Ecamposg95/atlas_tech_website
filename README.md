# Atlas Tech — Sitio web

**Frontier technology consulting.** Sitio corporativo de Atlas Tech en [atlastech.mx](https://atlastech.mx).

Atlas Tech es una startup que construye **sistemas agénticos**, **ontologías de conocimiento** e integra
**tecnologías de frontera**. El sitio cuenta una sola historia y lleva a una sola acción: *Agenda una llamada*.

| Producto | Qué es | Estado | Página |
|---|---|---|---|
| **Atlas Cortex** | Consulting as a Service: consultoría ligada al software. Nuestro equipo y nuestros agentes diagnostican, planean y llevan a ejecución con evidencia. | `MVP` | `/cortex` |
| **Atlas ONE** | Suite para operar negocios físicos: punto de venta, caja, inventario y clientes. | `Validado` | `/atlas-one` |
| Portafolio | Harvestt (agrotecnología), SIGMA (gobierno digital), Open Cashback (lealtad programable). | por proyecto | `/portafolio` |

> Moonshot: hacer posible que cualquier empresa se convierta en una organización AI-native, operada por un
> equipo humano compacto y una red coordinada de agentes digitales.

---

## 01 / Mapa del sitio

```
/                         Home: portada, Cortex al frente, cómo funciona, moonshot y cifras, Atlas ONE, clientes, portafolio
/cortex                   Producto principal: hoy / en construcción / visión, agentes, autonomía, gobierno
/atlas-one                Producto: cifras con fuente, demo interactivo, módulos, giros, precio
/portafolio               Harvestt, SIGMA, Open Cashback
/nosotros                 La startup, el moonshot, reconocimientos
/contacto                 Agenda una llamada (WhatsApp o correo; sin backend)
/proyectos/harvestt       Detalle (estética propia)
/proyectos/sigma          Detalle (estética propia)
/proyectos/open-cashback  Detalle (estética propia)
```

Direcciones anteriores, redirigidas con 301 (router y `.htaccess`):
`/home` → `/` · `/about` → `/nosotros` · `/contact` → `/contacto` · `/service`, `/service-details` → `/cortex` ·
`/proyectos` → `/portafolio` · `/proyectos/atlas-one` → `/atlas-one`.

---

## 02 / Identidad: Atlas Horizon

Negro cinematográfico, luz ámbar y tipografía ligera. La idea central es **luz en el horizonte**:
la tecnología de frontera vista como el borde iluminado de algo que apenas empieza.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#050505` | Fondo |
| `--glass` / `--glass-line` | blanco al 4.5% / 12% | Cards de vidrio y sus bordes |
| `--rule` | blanco al 14% | Reglas y divisores |
| `--ink` | `#F5F2EE` | Texto principal (blanco cálido) |
| `--muted` / `--dim` | `#A8A29A` / `#6E6862` | Bajadas / labels y metadatos |
| `--accent` (ember) | `#FF6A1F` | **Acento**: una palabra o frase clave por vista, card destacada |
| `--amber` / `--glow` | `#FFA14A` / `#FFD3A8` | Luz media, etiqueta `MVP`, foco / núcleo de la luz |
| `--signal` | `#9FE0C0` | Solo la etiqueta `Validado` |

- **Tipografía:** Inter en peso 300 para titulares, cifras y cuerpo grande; 400–500 para botones y nombres.
  Nunca 700. JetBrains Mono solo para folios, etiquetas de estado, teléfonos y datos técnicos.
- **Portada:** el Home abre con una imagen de marca a pantalla completa (`public/images/hero/`), antes del
  titular de Cortex. Para cambiarla basta con sustituir esos archivos; los originales están en `contex/`.
- **Luz:** una fuente principal por sección, siempre detrás del contenido. El **horizonte** (arco iluminado
  con el logo sobre la línea) es el motivo de la marca y cierra el Home; el **haz** acompaña cifras y cierres;
  el **resplandor** va en una esquina de las páginas de contenido. Salvo la portada, toda la luz es CSS.
- **Formas:** botones y barra de navegación en píldora; cards de vidrio con radio de 22px; una card
  **ember** para lo destacado; grano de película sobre toda la página.
- **Lockup:** marca + `Atlas` (500) + segundo nombre (300, atenuado): `Atlas Tech`, `Atlas ONE`.
  Solo el producto protagonista de la página va en ember (`Atlas Cortex` en `/cortex`).
- **Etiquetas de estado:** `Validado` · `MVP` · `En desarrollo` · `Concepto` · `Investigación`.
  Todo producto o capacidad lleva una. Un concepto nunca se presenta como producto.

Los tokens viven en `atlasws/src/site/tokens.css` y la luz en `atlasws/src/site/components/Atmosphere.tsx`,
bajo la clase `.noir` (nombre histórico de la clase raíz). Las pruebas de `atlasws/src/site/brand.test.ts`
fallan si reaparece un acento de marcas anteriores o un peso tipográfico grueso.

---

## 03 / Reglas de contenido

1. **Nada de roadmap como hecho.** Cada capacidad declara su estado real.
2. **Ninguna cifra sin fuente, periodo y fecha de corte**, en un pie visible.
3. **Clientes:** solo los logos ya publicados.
4. **Sin backend:** el formulario arma el mensaje y abre WhatsApp; no guarda datos.

Cifras publicadas hoy: $80.1M MXN en ventas registradas, 134,844 tickets y $593.93 de ticket promedio
(Atlas ONE, 90 días, corte 09.09.2026), y 13 reconocimientos internacionales (2016–2021).

El contenido vive como datos tipados en `atlasws/src/site/content/` y está protegido por
`content.test.ts`: las pruebas fallan ante una cifra pendiente, un cliente no autorizado o un término prohibido.

---

## 04 / Stack

| Capa | Tecnología |
|---|---|
| UI | React 19 + TypeScript |
| Rutas | React Router 7 |
| Build | Create React App (react-scripts 5) |
| Estilos | CSS propio con tokens (`.noir`); Bootstrap solo para las páginas de detalle del portafolio |
| Scroll | Lenis (se apaga con "reducir movimiento") |
| SEO | Meta por ruta + inyector estático en build + JSON-LD + sitemap |
| Pruebas | Jest + React Testing Library (101 pruebas) |
| Hosting | Hostinger (Apache) |

---

## 05 / Estructura

```
atlas_tech_website/
├── atlasws/                         App React
│   ├── public/
│   │   ├── .htaccess                Apache: redirecciones 301, SPA, HTTPS, cache, seguridad
│   │   ├── favicon.svg              Marca Atlas (fuente de los iconos PNG)
│   │   ├── images/hero/             Imagen de portada del Home (WebP)
│   │   └── images/og-atlas.png      Imagen de vista previa al compartir
│   ├── scripts/
│   │   ├── seo-build.cjs            Post-build: meta por ruta + sitemap + robots
│   │   ├── gen-favicons.cjs         Iconos PNG desde favicon.svg
│   │   └── optimize-images.cjs      Imágenes pesadas a WebP
│   └── src/
│       ├── site/                    ★ El sitio (identidad Atlas Horizon)
│       │   ├── tokens.css           Tokens y base de la marca
│       │   ├── content/             Textos y datos tipados + pruebas de honestidad
│       │   ├── components/          Header, footer, lockup, luz (Atmosphere), botones, etiquetas, formulario
│       │   ├── pages/               Home, Cortex, Atlas ONE, Portafolio, Nosotros, Contacto
│       │   └── lib/whatsapp.ts      Enlaces y mensajes de WhatsApp y correo
│       ├── main-component/
│       │   ├── router/              Rutas y redirecciones
│       │   ├── App/                 Arranque y límite de errores
│       │   └── ProjectsPage/        Detalles de Harvestt, SIGMA y Open Cashback
│       ├── components/AtlasOneDemos/  Demo interactivo de Atlas ONE
│       ├── data/projects.ts         Datos del portafolio
│       └── seo/                     seo.config.json (fuente única), SeoRouter, resolveSeo
├── contex/                          Informes de estado, briefs y referencias (no se compila)
├── docs/superpowers/                Diseño aprobado y plan de implementación
└── README.md
```

---

## 06 / Desarrollo

Requisito: Node.js 18 o superior.

```bash
cd atlasws
npm install
npm start                                        # http://localhost:3000
CI=true npx react-scripts test --watchAll=false  # pruebas
```

En WSL con el repo en `/mnt/c` la recarga en caliente no funciona: hay que reiniciar `npm start`,
o compilar y servir `build/`.

---

## 07 / Compilación y despliegue (Hostinger)

```bash
cd atlasws
CI=false npm run build    # el postbuild inyecta SEO por ruta + sitemap + robots
```

1. hPanel → Administrador de archivos → `public_html`.
2. Subir **todo el contenido de `atlasws/build/`**, incluido el `.htaccess` oculto.
3. Confirmar SSL activo para `atlastech.mx`.
4. Verificar con `curl -I` las direcciones anteriores y las nuevas, y reenviar `sitemap.xml` a Google Search Console.

Para cambiar el dominio: editar `siteUrl` en `atlasws/src/seo/seo.config.json` y volver a compilar.

---

## 08 / Documentación

| Documento | Contenido |
|---|---|
| `contex/INFORME-estado-2026-11.md` | Estado vigente, decisiones y pendientes |
| `docs/superpowers/specs/2026-11-17-reestructura-sitio-cortex-design.md` | Diseño aprobado |
| `docs/superpowers/plans/2026-11-17-reestructura-sitio-cortex.md` | Plan de implementación |
| `contex/README.md` | Índice de briefs y referencias |

---

## 09 / Historial

**v4.0 — Cortex al frente, Atlas Horizon (2026-11).** Reposicionamiento como startup de sistemas agénticos.
Atlas Cortex pasa a producto principal (Consulting as a Service) y Atlas ONE a producto con página propia.
Seis páginas nuevas, rutas en español con redirecciones 301, contenido con etiquetas de estado y cifras con
fuente, identidad Atlas Horizon, formulario por WhatsApp. Se retiran 305 archivos y 17 dependencias de la plantilla.

**v3.0 — Portafolio, SEO y optimización (2026-06).** Proyectos data-driven, páginas de SIGMA, Open Cashback
y Harvestt, SEO por ruta, `.htaccess`, imágenes WebP.

**v2.0 — Renovación visual (2026-04).** Hero 3D y paleta Deep Violet (ambos retirados en v4.0).

**v1.0 — Configuración inicial.**

---

ATLAS TECH / FRONTIER TECHNOLOGY · Ciudad de México · Desde 2016 · © 2026 Atlas Tech
