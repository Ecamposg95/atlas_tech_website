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
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── hero/
│       │   │   ├── Hero.tsx        # Sección hero principal (layout + copy)
│       │   │   └── NetworkGlobe.tsx # Globo 3D Three.js (nuevo)
│       │   ├── Header/             # Menú de navegación + Mega Menu
│       │   ├── ContactSection/     # Formulario de contacto (glassmorphism)
│       │   ├── about/              # Sección "Acerca de"
│       │   ├── ServiceSection/     # Servicios
│       │   ├── FeatureSection/     # Características destacadas
│       │   ├── ProjectSection/     # Proyectos / Portafolio
│       │   ├── Industries/         # Industrias verticales
│       │   └── footer/             # Pie de página
│       ├── main-component/
│       │   ├── HomePage/           # Composición de la página principal
│       │   ├── router/             # Configuración de rutas
│       │   ├── AboutPage/
│       │   ├── ContactPage/
│       │   └── SeviceSinglePage/
│       ├── css/
│       │   └── main.css            # Estilos globales + tokens de diseño
│       └── images/                 # Assets visuales, logos e iconos SVG
├── contex/                         # Documentación y prototipos de referencia
│   ├── Atlas Hero - Horizonte.html # Prototipo HTML del hero 3D
│   └── Hero 3D Horizonte - Patrones UI.md  # Skill / guía de patrones UI
└── README.md
```

---

## 🛠️ Instalación y Desarrollo Local

Requisitos: **Node.js ≥ 16**

```bash
# 1. Entrar al directorio de la app
cd atlasws

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo (http://localhost:3000)
npm start
```

---

## 📦 Build de Producción

```bash
cd atlasws
npm run build
```

Los archivos optimizados se generan en `atlasws/build/`. Sube el **contenido** de esa carpeta a tu hosting (Apache, Nginx, cPanel, etc.).

> ⚠️ **Nota para hosting sin SPA support:** Si tu servidor no soporta rutas SPA, agrega un archivo `.htaccess` en la raíz del hosting con redirección a `index.html`:
> ```apache
> RewriteEngine On
> RewriteBase /
> RewriteRule ^index\.html$ - [L]
> RewriteCond %{REQUEST_FILENAME} !-f
> RewriteCond %{REQUEST_FILENAME} !-d
> RewriteRule . /index.html [L]
> ```

---

## 📝 Historial de Cambios

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
