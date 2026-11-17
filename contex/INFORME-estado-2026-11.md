---
title: "Atlas Tech — Sitio Web · Informe de Estado (reestructura Cortex)"
date: 2026-11-17
type: informe
status: listo-para-revisión
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
> Diseño: `docs/superpowers/specs/2026-11-17-reestructura-sitio-cortex-design.md`
> Plan: `docs/superpowers/plans/2026-11-17-reestructura-sitio-cortex.md`

---

## 🧭 Mapa del sitio

```mermaid
graph TD
  Home["/ · Home"]
  Home --> Cortex["/cortex"]
  Home --> One["/atlas-one"]
  Home --> Port["/portafolio"]
  Home --> Nos["/nosotros"]
  Home --> Con["/contacto"]
  Port --> H["/proyectos/harvestt"]
  Port --> S["/proyectos/sigma"]
  Port --> O["/proyectos/open-cashback"]
```

Redirecciones 301 (router + `.htaccess`): `/home`→`/`, `/about`→`/nosotros`, `/contact`→`/contacto`,
`/service` y `/service-details`→`/cortex`, `/proyectos`→`/portafolio`, `/proyectos/atlas-one`→`/atlas-one`.

---

## 🎨 Identidad: Atlas Horizon

> [!info] Tres iteraciones de marca el mismo día
> El diseño se aprobó como "NOIR con chispa lima"; pasó por Atlas Noir (azul hielo) y terminó en
> **Atlas Horizon**, la guía vigente: negro cinematográfico, luz ámbar y tipografía ligera.

| Elemento | Valor |
|---|---|
| Fondo | `#050505` |
| Texto | `#F5F2EE` (blanco cálido) · secundario `#A8A29A` · tenue `#6E6862` |
| Acento | ember `#FF6A1F`, una palabra o frase clave por vista |
| Luz | ámbar `#FFA14A`, núcleo `#FFD3A8`, sombra cálida `#7A240A`, toque frío `#C9DBEA` al final del haz |
| Señal | `#9FE0C0`, solo para la etiqueta `Validado` |
| Tipografía | Inter 300 en titulares y cifras; 400–500 en botones. Nunca 700. JetBrains Mono solo en folios y etiquetas |
| Formas | Botones y navbar en píldora, cards de vidrio (radio 22px), una card ember destacada, grano de película |
| Motivo | **Horizonte**: arco de luz con el logo sobre la línea (hero del Home). Haz en cifras y cierres; resplandor en páginas de contenido |
| Lockup | `Atlas Tech`; el producto protagonista en ember (`Atlas Cortex`) |

El Home abre con una **portada**: la imagen "Atlas Tech on the Ember Horizon" a pantalla completa
(`public/images/hero/`, WebP), antes del titular de Cortex. El horizonte en CSS pasó al cierre del Home.
El resto de la luz es CSS (`src/site/components/Atmosphere.tsx`), sin WebGL. Lo nuevo vive en
`atlasws/src/site/` bajo la clase `.noir` (nombre histórico). Las páginas de detalle del portafolio
conservan su estética y solo comparten header y footer. `src/site/brand.test.ts` hace cumplir la paleta
y los pesos tipográficos.

Las cifras de Atlas ONE aparecen también en el Home, bajo el moonshot, cada una con la leyenda
"en Atlas ONE" y su pie de fuente, para que no se lean como tracción de Cortex.

---

## ✅ Honestidad del contenido

- Cada producto y capacidad lleva etiqueta de estado: Atlas ONE `Validado`, Atlas Cortex `MVP`,
  Atlas ONE AI `En desarrollo`, roadmap de Cortex como `Concepto` / `Investigación`.
- En `/cortex` los ocho agentes por función se presentan como "el equipo que estamos construyendo".
- Cifras publicadas (con fuente, periodo y corte): $80.1M MXN, 134,844 tickets, $593.93
  (Atlas ONE, 90 días, corte 09.09.2026) y 13 reconocimientos internacionales (2016–2021).
- Pruebas automáticas (`src/site/content/content.test.ts`) fallan si aparece una cifra pendiente,
  un cliente no autorizado o un término prohibido.

---

## 📞 Conversión

Sin backend. "Agenda una llamada" → `/contacto` → WhatsApp (`wa.me/527221495215`) con mensaje
prellenado; el formulario arma el mensaje y abre WhatsApp, con `mailto:` como alternativa.
"Pruébalo 1 mes gratis" (Atlas ONE) → WhatsApp con otro mensaje + enlace a `atlasone.com.mx`.

---

## 🔗 Enlaces a repos y productos

| Producto | Enlace en el sitio | Motivo |
|---|---|---|
| Atlas ONE | `atlasone.com.mx` | El repo **no** se enlaza (ver pendientes de seguridad) |
| Atlas Cortex | ninguno | Repo privado |
| Harvestt | plataforma en vivo + repo público | README presentable |

---

## 🧱 Stack tras la limpieza

React 19 + TypeScript (CRA), React Router 7, Lenis, Bootstrap (solo para las páginas de detalle).
Se retiraron 17 dependencias sin uso (three, gsap, MUI, swiper, slick, wowjs, entre otras) y
305 archivos de la plantilla. 101 pruebas automáticas. Imagen de vista previa (`/images/og-atlas.png`)
y favicon propios de la identidad Atlas Horizon.

---

## 🧩 Pendientes del dueño

> [!warning] Seguridad (fuera de este repo)
> El repo público `atlas-one` expone en su README credenciales por defecto del superadministrador,
> la clave por defecto de firma de sesiones y datos de un cliente. Recomendación: hacerlo privado
> y rotar esas credenciales.

> [!todo] Contenido
> - [ ] Cifras sin fuente ni corte (no publicadas): 13 sucursales activas · $350M MXN procesados
>       en 2026 · 7 clientes enterprise · 25 integraciones · 100+ usuarios · MVP en 2 semanas.
> - [ ] Verificar los premios de Harvestt contra los diplomas: el repo registra INTARG 2017 (plata)
>       e ICAN Toronto 2018 (oro); la página de detalle lista 2018, 2019 y 2021.
> - [ ] Cambiar la descripción del repo `harvestt` en GitHub ("2016 awr wina toronto").
> - [ ] Confirmar dos textos: "Nuestro primer cliente de Cortex somos nosotros mismos" (viene del documento de visión de Cortex) y "Desde 2016" (viene de la guía de marca).
> - [ ] Calendario en línea (Cal.com / Calendly) si se quiere agenda directa.
> - [ ] Contacto: la guía de marca lista `ecamposg@atlastech.mx` y `722 142 5755`; el sitio conserva
>       `hola@atlastech.mx` y WhatsApp `722 149 5215`. Confirmar cuál debe ir en la web.
> - [ ] La guía pide todo en español salvo nombres de producto y propone "Agenda un diagnóstico" como
>       llamada a la acción; el sitio usa "Consulting as a Service" y "Agenda una llamada" (decisiones
>       del dueño). Confirmar que se mantienen.
> - [ ] Portada: el nombre y el lema van dentro de la imagen (no son texto real). Si se quiere texto
>       seleccionable y que se adapte mejor al móvil, hace falta la misma imagen **sin texto**.
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
