# Home Modernist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el Home de atlastech.mx por una página bilingüe (`/` y `/en`) de nueve secciones con el sistema visual Modernist, contacto funcional vía PHP y SEO con hreflang.

**Architecture:** Todo vive dentro del app CRA existente (`atlasws/`). Una capa CSS con scope `.mst` (copia de `styles.css` del sistema Modernist más clases de layout propias) se importa al final de `index.tsx`; el Home nuevo renderiza dentro de `<div class="mst">` y marca `html[data-theme="modernist"]` para pintar el body claro. El copy vive en diccionarios tipados ES/EN; el idioma sale del prefijo de la URL. El pipeline SEO (runtime `SeoRouter` + post-build `seo-build.cjs`) se extiende con `locale` y `alternates` por ruta.

**Tech Stack:** React 19 + TypeScript 4.9 (CRA `react-scripts 5`), React Router 7, Jest + Testing Library (ya configurados por CRA), `lucide-react` (nuevo), `sharp` (ya en deps, para recortar imágenes), PHP 8 en Hostinger (endpoint de correo).

**Spec:** `docs/superpowers/specs/2026-09-09-home-modernist-design.md`

## Global Constraints

- Directorio del app: `atlasws/`. Todos los comandos `npm` se corren desde ahí. Node ≥ 18 (hay v24).
- Tests: `CI=true npx react-scripts test --watchAll=false <ruta>` desde `atlasws/`.
- Cero radio: `--radius-*` es 0. Ninguna regla CSS nueva pone `border-radius` distinto de `var(--radius-*)`.
- Todo flush left. Nada con `text-align: center` en los archivos nuevos.
- Reglas de 2px: `.hr` y bordes de grid siempre `2px solid var(--color-divider)`.
- Fotografías siempre dentro de `.grayscale`.
- Todo color, fuente y espaciado sale de las variables `--color-*`, `--font-*`, `--space-*`. Prohibido un hex o un px que el token ya tenga.
- El rojo `var(--color-accent)` solo en: CTA primario del hero, cifras de la sección 05, poster de la sección 07. Texto en acento a tamaño de párrafo usa `var(--color-accent-700)`.
- Cifras publicadas: `$80.1M` · `134,844` · `$593.93` · `13`, siempre con pie de fuente, periodo y corte `09.09.2026`. Ninguna otra cifra.
- Cliente de la sección 05: anónimo ("cliente de retail multi-sucursal").
- CTA del hero: `https://atlasone.com.mx/` con `target="_blank" rel="noopener noreferrer"`.
- Correo de destino: `hola@atlastech.mx`. WhatsApp: `https://wa.me/527221495215`. Dominio: `https://atlastech.mx`.
- Frases que no se traducen: "Built by builders." y "From system of record to system of action."
- Cada tarea termina con commit en la rama `feat/home-modernist`. Mensajes de commit terminan con:

```
Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs
```

- No se tocan ni borran: `src/components/hero/*`, `src/main-component/HomePage/index.tsx`, páginas de `/proyectos`, `main.css`, `contex/`.
- La carpeta `contex/atlas startup/` está sin trackear en git y así se queda. Solo se commitean los WebP generados en `public/images/home/`.

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---|---|
| `src/modernist/modernist.css` | Tokens `:root` + clases del sistema Modernist con scope `.mst` + reset local + pintado del body |
| `src/modernist/home.css` | Clases de layout del Home (`.mst-band`, `.mst-grid`, `.mst-stats`, `.mst-poster`, nav, form) con scope `.mst` |
| `src/modernist/__tests__/scoped.test.ts` | Garantiza que todo selector de ambos CSS empieza por `.mst`, `:root` o `html[data-theme="modernist"]` |
| `src/i18n/types.ts` | Tipo `HomeDict` y `Lang` |
| `src/i18n/es.ts`, `src/i18n/en.ts` | Diccionarios |
| `src/i18n/useLang.ts` | `useLang()`, `langFromPath()`, `homePath()`, `dictFor()` |
| `src/i18n/__tests__/*.test.ts` | Igualdad de llaves ES/EN; resolución de idioma |
| `src/seo/seo.config.json` | + ruta `/en`, `locale`, `alternates` |
| `src/seo/resolveSeo.ts` | + `lang`, `locale`, `alternates` |
| `src/seo/SeoRouter.tsx` | + hreflang, `og:locale` por ruta, `<html lang>` |
| `scripts/seo-build.cjs` | Funciones exportadas + hreflang en HTML estático + sitemap con `/en` |
| `src/components/mst/AtlasMark.tsx` | Marca SVG inline |
| `src/components/mst/Band.tsx` | Banda numerada con kicker, titular, hijos, slot full-bleed y `.hr` |
| `src/components/mst/Grid.tsx` | Celdas de ancho igual con reglas |
| `src/components/mst/StatRow.tsx` | Cifras + pie de fuente |
| `src/components/mst/MstHeader.tsx` | `.nav` con marca, enlaces, toggle ES/EN |
| `src/components/mst/MstFooter.tsx` | Pie |
| `src/pages/home/sections/*.tsx` | Una sección por archivo |
| `src/pages/home/ContactForm.tsx` | Formulario con estados |
| `src/pages/home/HomePage.tsx` | Composición |
| `public/api/contact.php` | Endpoint de correo |
| `scripts/prepare-home-images.cjs` | Recorte y conversión de imágenes del Home |
| `public/images/home/*.webp` | Assets generados |

---

### Task 0: Entorno, dependencia `lucide-react` y suite de tests ejecutable

**Files:**
- Modify: `atlasws/package.json` (dependencias)
- Delete: `atlasws/src/App.test.tsx` (test del template que busca "learn react" y falla siempre)

**Interfaces:**
- Produces: `lucide-react` disponible para importar `ArrowUpRight`, `ArrowRight`, `ArrowDown`, `Menu`.

- [ ] **Step 1: Instalar dependencias del app (si `node_modules` no existe)**

Run: `cd atlasws && npm install --no-audit --no-fund`
Expected: termina sin `ERR!`. Puede tardar varios minutos en WSL sobre `/mnt/d`.

- [ ] **Step 2: Añadir `lucide-react`**

Run: `cd atlasws && npm install lucide-react@^0.475.0 --no-audit --no-fund`
Expected: `package.json` lista `"lucide-react": "^0.475.0"` en `dependencies`.

- [ ] **Step 3: Quitar el test roto del template**

Run: `cd atlasws && git rm -q src/App.test.tsx`

- [ ] **Step 4: Verificar que la suite corre vacía sin error**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false --passWithNoTests`
Expected: `No tests found` y exit code 0.

- [ ] **Step 5: Commit**

```bash
cd atlasws && git add package.json package-lock.json && git commit -m "chore: lucide-react y limpieza del test del template

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 1: Capa CSS Modernist con scope `.mst`

**Files:**
- Create: `atlasws/src/modernist/modernist.css`
- Create: `atlasws/src/modernist/home.css`
- Create: `atlasws/src/modernist/__tests__/scoped.test.ts`
- Modify: `atlasws/src/index.tsx` (import al final de la lista de CSS)

**Interfaces:**
- Produces: clases `.mst`, `.mst-wrap`, `.mst-band`, `.mst-kicker`, `.mst-display`, `.mst-hero-title`, `.mst-lead`, `.mst-meta`, `.mst-grid`, `.mst-grid-2/3/4/6`, `.mst-cell-n`, `.mst-stats`, `.mst-stat-value`, `.mst-stat-label`, `.mst-poster`, `.mst-dashed`, `.mst-layer`, `.mst-modules`, `.mst-figure`, `.mst-list`, `.mst-nav`, `.mst-nav-links`, `.mst-nav-mobile`, `.mst-form`, `.mst-form-status`, `.mst-footer`, `.mst-close`. Y todas las del sistema bajo `.mst` (`.btn`, `.hr`, `.tag`, `.field`, `.input`, `.seg`, `.grayscale`, `.card`, `.nav`).

- [ ] **Step 1: Escribir el test de scope**

`atlasws/src/modernist/__tests__/scoped.test.ts`:

```ts
import fs from "fs";
import path from "path";

const FILES = ["modernist.css", "home.css"];
const ALLOWED = /^(\.mst\b|:root\b|html\[data-theme="modernist"\])/;

const selectorsOf = (css: string): string[] => {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out: string[] = [];
  const re = /(^|[{};])\s*([^{}@;]+?)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) {
    m[2].split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => out.push(s));
  }
  return out;
};

describe("modernist css scope", () => {
  for (const file of FILES) {
    test(`${file}: every selector is scoped`, () => {
      const css = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
      const selectors = selectorsOf(css);
      expect(selectors.length).toBeGreaterThan(0);
      const bad = selectors.filter((s) => !ALLOWED.test(s));
      expect(bad).toEqual([]);
    });
    test(`${file}: no hard-coded radius or centering`, () => {
      const css = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
      expect(css).not.toMatch(/border-radius:\s*(?!var\(--radius|calc\(var\(--radius|50%)/);
      expect(css).not.toMatch(/text-align:\s*center/);
    });
  }
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/modernist`
Expected: FAIL con `ENOENT ... modernist.css`.

- [ ] **Step 3: Crear `modernist.css`**

Es `contex/atlas startup/_ds/modernist-a2531a6e-349a-4062-86fb-5173db91f65a/styles.css` con cada selector de componente prefijado por `.mst`, más el reset local y el pintado del body. Contenido completo:

```css
/* Modernist — tokens y clases del sistema, con scope .mst para convivir con el template legado.
   Fuente: contex/atlas startup/_ds/modernist-*/styles.css. Cambiar tokens aquí, no en los componentes. */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&display=swap');

:root {
  --color-bg: #f3f2f2;
  --color-surface: #eae9e9;
  --color-text: #201e1d;
  --color-accent: #ec3013;
  --color-accent-2: #e15b47;
  --color-divider: color-mix(in srgb, #201e1d 40%, transparent);

  --color-neutral-100: #f8f4f4;
  --color-neutral-200: #eae7e7;
  --color-neutral-300: #d7d3d3;
  --color-neutral-400: #bab6b6;
  --color-neutral-500: #9b9797;
  --color-neutral-600: #7d7979;
  --color-neutral-700: #605d5d;
  --color-neutral-800: #444141;
  --color-neutral-900: #2d2b2b;

  --color-accent-100: #fff2ef;
  --color-accent-200: #ffe0d9;
  --color-accent-300: #ffc4b8;
  --color-accent-400: #ff9783;
  --color-accent-500: #ff563c;
  --color-accent-600: #dd2b0f;
  --color-accent-700: #ae1800;
  --color-accent-800: #7c1405;
  --color-accent-900: #4d170e;

  --color-accent-2-100: #fff2ef;
  --color-accent-2-200: #ffe0da;
  --color-accent-2-300: #ffc4b9;
  --color-accent-2-400: #ff9784;
  --color-accent-2-500: #ef6853;
  --color-accent-2-600: #c94b39;
  --color-accent-2-700: #9e3526;
  --color-accent-2-800: #71261b;
  --color-accent-2-900: #471d16;

  --font-heading: "Archivo", system-ui, sans-serif;
  --font-heading-weight: 800;
  --font-body: "Archivo", system-ui, sans-serif;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;

  --shadow-sm: 0 1px 2px color-mix(in srgb, #2d2b2b 14%, transparent);
  --shadow-md: 0 3px 10px color-mix(in srgb, #2d2b2b 16%, transparent);
  --shadow-lg: 0 12px 32px color-mix(in srgb, #2d2b2b 22%, transparent);
}

/* El Home marca html[data-theme="modernist"] mientras está montado: pinta el body claro
   por encima del body oscuro de main.css. */
html[data-theme="modernist"] body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.55;
  letter-spacing: 0;
}

/* — reset local: anula el template dentro del Home — */
.mst {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.55;
  font-weight: 400;
  letter-spacing: 0;
  text-align: left;
}
.mst *, .mst *::before, .mst *::after { box-sizing: border-box; }
.mst h1, .mst h2, .mst h3, .mst h4, .mst h5, .mst h6 {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  color: var(--color-text); line-height: 1.12; letter-spacing: -0.015em;
  margin: 0 0 var(--space-2);
}
.mst h1 { font-size: 42px; }
.mst h2 { font-size: 32px; }
.mst h3 { font-size: 25px; }
.mst h4 { font-size: 20px; }
.mst h5 { font-size: 16px; }
.mst h6 { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
.mst p { margin: 0 0 var(--space-3); color: inherit; }
.mst a { color: var(--color-accent); text-underline-offset: 3px; transition: none; }
.mst a:hover { color: var(--color-accent-600); }
.mst img { display: block; max-width: 100%; height: auto; }
.mst figure { margin: 0; }
.mst figcaption {
  font-size: 11px; margin-top: var(--space-1);
  color: color-mix(in srgb, var(--color-text) 55%, transparent);
}
.mst ul, .mst ol { margin: 0; padding: 0; list-style: none; }
.mst button { font: inherit; transition: none; border: 0; background: none; color: inherit; }
.mst .text-muted { color: color-mix(in srgb, var(--color-text) 55%, transparent); }
.mst :focus { outline: none; }
.mst :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.mst ::selection { background: color-mix(in srgb, var(--color-accent) 30%, transparent); }

/* — imagen — */
.mst .grayscale { filter: grayscale(1) contrast(1.08); }

/* — rules — */
.mst .hr {
  height: 2px; border: 0; margin: var(--space-4) 0;
  background: var(--color-divider);
}

/* — buttons — */
.mst .btn {
  display: inline-flex; align-items: center; justify-content: flex-start; gap: 6px;
  cursor: pointer; text-decoration: none;
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 14px; line-height: 1.2; color: var(--color-text);
  background: transparent; border: 1px solid transparent;
  padding: var(--space-2) calc(var(--space-3) * 1.2);
  border-radius: var(--radius-md);
}
.mst .btn svg { display: block; }
.mst .btn:disabled { opacity: 0.45; cursor: not-allowed; }
.mst .btn-primary { background: var(--color-accent); color: var(--color-bg); }
.mst .btn-primary:hover { background: var(--color-accent-600); color: var(--color-bg); }
.mst .btn-primary:active { background: var(--color-accent-700); }
.mst .btn-secondary { border-color: var(--color-divider); }
.mst .btn-secondary:hover { background: color-mix(in srgb, var(--color-text) 7%, transparent); color: var(--color-text); }
.mst .btn-secondary:active { background: color-mix(in srgb, var(--color-text) 14%, transparent); }
.mst .btn-ghost { color: var(--color-accent); padding-inline: var(--space-1); }
.mst .btn-ghost:hover { background: color-mix(in srgb, var(--color-accent) 10%, transparent); }
.mst .btn-ghost:active { background: color-mix(in srgb, var(--color-accent) 18%, transparent); }
.mst .btn-icon { width: 36px; height: 36px; padding: 0; }
.mst .btn-block { width: 100%; margin-top: var(--space-2); justify-content: flex-start; text-align: left; }

/* — forms — */
.mst .field > label {
  display: block; font-size: 12px; margin-bottom: 5px;
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}
.mst .input {
  width: 100%; min-height: 36px; padding: 6px 10px; font: inherit;
  font-size: 14px; color: var(--color-text); caret-color: var(--color-accent);
  background: var(--color-surface);
  border: 1px solid var(--color-divider); border-radius: var(--radius-md);
}
.mst .input:hover { border-color: color-mix(in srgb, var(--color-text) 45%, transparent); }
.mst .input:focus-visible { border-color: var(--color-accent); outline-offset: 0; }
.mst textarea.input { min-height: 90px; resize: vertical; }
.mst .radio { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; }
.mst .radio input, .mst .seg-opt input {
  position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none;
}
.mst .radio .dot {
  width: 16px; height: 16px; flex: none; border-radius: 50%;
  border: 1.5px solid var(--color-divider);
}
.mst .radio:hover .dot { border-color: var(--color-accent); }
.mst .radio input:checked + .dot {
  border-color: var(--color-accent); background: var(--color-accent);
  box-shadow: inset 0 0 0 4px var(--color-bg);
}
.mst .radio input:focus-visible + .dot { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.mst .seg {
  display: inline-flex; overflow: hidden;
  border: 1px solid var(--color-divider); border-radius: var(--radius-md);
}
.mst .seg-opt {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; font-size: 13px; cursor: pointer; color: var(--color-text); text-decoration: none;
}
.mst .seg-opt + .seg-opt { border-left: 1px solid var(--color-divider); }
.mst .seg-opt:has(input:checked), .mst .seg-opt[aria-current="true"] { background: var(--color-accent); color: var(--color-bg); }
.mst .seg-opt:not(:has(input:checked)):not([aria-current="true"]):hover { background: color-mix(in srgb, var(--color-text) 7%, transparent); color: var(--color-text); }
.mst .seg-opt:has(input:focus-visible) { outline: 2px solid var(--color-accent); outline-offset: -2px; }

/* — cards — */
.mst .card {
  display: flex; flex-direction: column; gap: var(--space-2);
  padding: var(--space-3); border-radius: var(--radius-md); background: var(--color-surface);
}
.mst .card-kicker { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); }
.mst .card-title {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 17px; line-height: 1.2;
}
.mst .card-body { margin: 0; font-size: 13px; opacity: 0.8; flex: 1; }
.mst .card-meta {
  display: flex; align-items: center; gap: 6px; font-size: 11px;
  color: color-mix(in srgb, var(--color-text) 50%, transparent);
}
.mst .elev-sm { box-shadow: var(--shadow-sm); }
.mst .elev-md { box-shadow: var(--shadow-md); }
.mst .elev-lg { box-shadow: var(--shadow-lg); }

/* — tags — */
.mst .tag {
  display: inline-flex; align-items: center; font-size: 11px;
  letter-spacing: 0.02em; padding: 3px 10px;
  border-radius: calc(var(--radius-md) * 0.75);
}
.mst .tag-accent { background: var(--color-accent-100); color: var(--color-accent-800); }
.mst .tag-accent-2 { background: var(--color-accent-2-100); color: var(--color-accent-2-800); }
.mst .tag-neutral { background: var(--color-neutral-200); color: var(--color-neutral-800); }
.mst .tag-outline { border: 1px solid var(--color-accent); color: var(--color-accent); }

/* — navigation — */
.mst .nav {
  display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-bottom: 2px solid var(--color-divider);
}
.mst .nav-brand {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 18px; margin-right: auto; color: var(--color-text); text-decoration: none;
  display: inline-flex; align-items: center; gap: var(--space-2);
}
.mst .nav a { color: inherit; text-decoration: none; font-size: 14px; }
.mst .nav a:hover, .mst .nav a[aria-current='page'] { color: var(--color-accent); }

/* — tables — */
.mst .table { width: 100%; border-collapse: collapse; font-size: 14px; }
.mst .table th {
  text-align: left; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
  padding: var(--space-2); border-bottom: 2px solid var(--color-divider);
}
.mst .table td { padding: var(--space-2); border-bottom: 1px solid var(--color-divider); }
.mst .table tbody tr:hover { background: color-mix(in srgb, var(--color-text) 4%, transparent); }
```

- [ ] **Step 4: Crear `home.css`**

```css
/* Layout del Home sobre los tokens Modernist. Todo bajo .mst. */

.mst .mst-wrap {
  width: min(100%, 1280px);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* — bandas — */
.mst .mst-band { padding: calc(var(--space-8) * 2) 0 0; }
.mst .mst-band > .hr { margin: calc(var(--space-8) * 2) 0 0; }
.mst .mst-band-rule { width: 100%; }
.mst .mst-kicker {
  font-family: var(--font-heading); font-weight: 600; font-size: 12px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
  margin: 0 0 var(--space-6);
}
.mst .mst-kicker-n { color: var(--color-text); }
.mst .mst-display {
  font-size: clamp(32px, 4.6vw, 64px);
  line-height: 1.02; letter-spacing: -0.03em;
  max-width: 18ch; margin: 0 0 var(--space-8);
}
.mst .mst-hero-title {
  font-size: clamp(44px, 8vw, 104px);
  line-height: 0.96; letter-spacing: -0.04em;
  max-width: 14ch; margin: 0 0 var(--space-8);
}
.mst .mst-lead { font-size: clamp(17px, 1.6vw, 22px); line-height: 1.4; max-width: 44ch; margin: 0 0 var(--space-6); }
.mst .mst-meta {
  font-family: var(--font-heading); font-weight: 600; font-size: 12px;
  letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 var(--space-8);
}
.mst .mst-close {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: clamp(22px, 2.6vw, 34px); line-height: 1.1; letter-spacing: -0.02em;
  max-width: 28ch; margin: var(--space-8) 0 0;
}
.mst .mst-band .btn { font-size: 15px; padding: var(--space-3) var(--space-6); min-width: 240px; }

/* — grid modular con reglas — */
.mst .mst-grid { display: grid; gap: 0; }
.mst .mst-grid-2 { grid-template-columns: repeat(2, 1fr); }
.mst .mst-grid-3 { grid-template-columns: repeat(3, 1fr); }
.mst .mst-grid-4 { grid-template-columns: repeat(4, 1fr); }
.mst .mst-grid-6 { grid-template-columns: repeat(6, 1fr); }
.mst .mst-grid > * { padding: var(--space-4); border-left: 2px solid var(--color-divider); min-width: 0; }
.mst .mst-grid > *:first-child { border-left: 0; padding-left: 0; }
.mst .mst-grid + .mst-grid > * { border-top: 2px solid var(--color-divider); }
.mst .mst-cell-n {
  display: block; font-family: var(--font-heading); font-weight: 600; font-size: 12px;
  letter-spacing: 0.12em; margin-bottom: var(--space-3);
  color: color-mix(in srgb, var(--color-text) 60%, transparent);
}
.mst .mst-cell-title { font-size: clamp(20px, 2vw, 28px); margin-bottom: var(--space-2); }
.mst .mst-cell-body { font-size: 15px; margin: 0; color: color-mix(in srgb, var(--color-text) 80%, transparent); }
.mst .mst-grid-plain > * { padding-top: 0; }

/* — listas de una línea por ítem — */
.mst .mst-list li { padding: var(--space-2) 0; border-top: 1px solid var(--color-divider); font-size: 16px; }
.mst .mst-list li:first-child { border-top: 0; padding-top: 0; }
.mst .mst-list-accent li { color: var(--color-accent-700); }

/* — capas (sección 04) — */
.mst .mst-layer { display: grid; grid-template-columns: 1fr 3fr; gap: var(--space-6); padding: var(--space-6) 0; }
.mst .mst-layer + .mst-layer { border-top: 2px solid var(--color-divider); }
.mst .mst-layer-name { font-size: clamp(24px, 2.6vw, 36px); margin: var(--space-1) 0 0; }
.mst .mst-layer-accent .mst-layer-name { color: var(--color-accent-700); }
.mst .mst-modules { display: flex; flex-wrap: wrap; gap: var(--space-2); align-content: flex-start; }

/* — cifras (sección 05) — */
.mst .mst-figure { margin: 0 0 var(--space-8); border: 2px solid var(--color-divider); }
.mst .mst-figure img { width: 100%; }
.mst .mst-figure figcaption { padding: var(--space-2) var(--space-3); border-top: 2px solid var(--color-divider); }
.mst .mst-stats { margin: 0; }
.mst .mst-stat-value {
  display: block; font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: clamp(32px, 4vw, 56px); line-height: 1; letter-spacing: -0.03em;
  color: var(--color-accent); margin-bottom: var(--space-2);
}
.mst .mst-stat-label { display: block; font-size: 14px; }
.mst .mst-stats figcaption { margin-top: var(--space-4); font-size: 12px; }

/* — escalera (sección 06) — */
.mst .mst-step { display: flex; flex-direction: column; gap: var(--space-2); }
.mst .mst-step svg { color: color-mix(in srgb, var(--color-text) 50%, transparent); }
.mst .mst-step-label { font-family: var(--font-heading); font-weight: 600; font-size: 16px; line-height: 1.2; }

/* — poster (sección 07) — */
.mst .mst-poster { background: var(--color-accent); color: var(--color-bg); margin-top: calc(var(--space-8) * 2); }
.mst .mst-poster p {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: clamp(30px, 5vw, 72px); line-height: 1; letter-spacing: -0.035em;
  margin: 0; padding: calc(var(--space-8) * 1.5) 0; max-width: 18ch; color: var(--color-bg);
}
.mst .mst-band-poster > .hr { margin-top: 0; }

/* — horizontes (sección 08) — */
.mst .mst-dashed { outline: 2px dashed var(--color-divider); outline-offset: -2px; }
.mst .mst-cell-status { margin-top: var(--space-4); }

/* — builders (sección 09) — */
.mst .mst-person-name { font-size: clamp(22px, 2.2vw, 30px); margin-bottom: var(--space-1); }
.mst .mst-person-areas {
  font-family: var(--font-heading); font-weight: 600; font-size: 12px;
  letter-spacing: 0.12em; text-transform: uppercase; margin: 0;
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}
.mst .mst-awards { margin-top: var(--space-8); font-size: 15px; }

/* — nav — */
.mst .mst-nav { position: sticky; top: 0; z-index: 20; background: var(--color-bg); }
.mst .mst-nav-links { display: flex; gap: var(--space-4); align-items: center; }
.mst .mst-nav-mobile { display: none; }
.mst .mst-nav-mobile summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: var(--space-1); font-size: 14px; }
.mst .mst-nav-mobile summary::-webkit-details-marker { display: none; }
.mst .mst-nav-mobile-list {
  position: absolute; left: 0; right: 0; top: 100%;
  background: var(--color-bg); border-bottom: 2px solid var(--color-divider);
  padding: var(--space-3) var(--space-4); display: flex; flex-direction: column; gap: var(--space-3);
}
.mst .mst-mark { width: 26px; height: 26px; }

/* — contacto — */
.mst .mst-form { display: grid; gap: var(--space-4); }
.mst .mst-form .btn { justify-content: flex-start; }
.mst .mst-form-status { font-size: 14px; margin: 0; }
.mst .mst-form-status-error { color: var(--color-accent-700); }
.mst .mst-hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
.mst .mst-contact-side dt {
  font-family: var(--font-heading); font-weight: 600; font-size: 12px;
  letter-spacing: 0.12em; text-transform: uppercase; margin: var(--space-4) 0 var(--space-1);
  color: color-mix(in srgb, var(--color-text) 70%, transparent);
}
.mst .mst-contact-side dt:first-child { margin-top: 0; }
.mst .mst-contact-side dd { margin: 0; font-size: 16px; }

/* — footer — */
.mst .mst-footer { border-top: 2px solid var(--color-divider); padding: var(--space-8) 0 calc(var(--space-8) * 2); margin-top: calc(var(--space-8) * 2); }
.mst .mst-footer-row { display: flex; flex-wrap: wrap; gap: var(--space-6); justify-content: space-between; align-items: flex-start; }
.mst .mst-footer-links { display: flex; flex-wrap: wrap; gap: var(--space-4); }
.mst .mst-footer a { color: var(--color-text); text-decoration: none; font-size: 14px; }
.mst .mst-footer a:hover { color: var(--color-accent); }
.mst .mst-footer-small { font-size: 12px; color: color-mix(in srgb, var(--color-text) 55%, transparent); margin: var(--space-4) 0 0; }

/* — responsive — */
@media (max-width: 1024px) {
  .mst .mst-grid-6 { grid-template-columns: repeat(3, 1fr); }
  .mst .mst-grid-6 > *:nth-child(4) { border-left: 0; padding-left: 0; }
  .mst .mst-grid-6 > *:nth-child(n+4) { border-top: 2px solid var(--color-divider); }
}
@media (max-width: 860px) {
  .mst .mst-nav-links { display: none; }
  .mst .mst-nav-mobile { display: block; }
  .mst .mst-layer { grid-template-columns: 1fr; gap: var(--space-3); }
  .mst .mst-grid-3, .mst .mst-grid-4, .mst .mst-grid-6 { grid-template-columns: repeat(2, 1fr); }
  .mst .mst-grid-3 > *, .mst .mst-grid-4 > *, .mst .mst-grid-6 > * { border-left: 0; padding-left: 0; border-top: 0; }
  .mst .mst-grid-3 > *:nth-child(even), .mst .mst-grid-4 > *:nth-child(even), .mst .mst-grid-6 > *:nth-child(even) {
    border-left: 2px solid var(--color-divider); padding-left: var(--space-4);
  }
  .mst .mst-grid-3 > *:nth-child(n+3), .mst .mst-grid-4 > *:nth-child(n+3), .mst .mst-grid-6 > *:nth-child(n+3) {
    border-top: 2px solid var(--color-divider);
  }
}
@media (max-width: 520px) {
  .mst .mst-wrap { padding: 0 var(--space-4); }
  .mst .mst-band { padding-top: var(--space-8); }
  .mst .mst-band > .hr { margin-top: var(--space-8); }
  .mst .mst-grid-2, .mst .mst-grid-3, .mst .mst-grid-4, .mst .mst-grid-6 { grid-template-columns: 1fr; }
  .mst .mst-grid > * { border-left: 0; padding-left: 0; }
  .mst .mst-grid > *:nth-child(n+2) { border-top: 2px solid var(--color-divider); padding-left: 0; border-left: 0; }
  .mst .mst-band .btn { width: 100%; }
}
```

- [ ] **Step 5: Importar en `index.tsx`**

En `atlasws/src/index.tsx`, después de `import "./css/responsive.css";` añadir:

```ts
import "./modernist/modernist.css";
import "./modernist/home.css";
```

- [ ] **Step 6: Correr el test y verificar que pasa**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/modernist`
Expected: 4 tests PASS.

- [ ] **Step 7: Commit**

```bash
cd atlasws && git add src/modernist src/index.tsx && git commit -m "feat(modernist): capa CSS del sistema con scope .mst y layout del Home

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 2: Diccionarios ES/EN y resolución de idioma

**Files:**
- Create: `atlasws/src/i18n/types.ts`
- Create: `atlasws/src/i18n/es.ts`
- Create: `atlasws/src/i18n/en.ts`
- Create: `atlasws/src/i18n/useLang.ts`
- Create: `atlasws/src/i18n/__tests__/dicts.test.ts`
- Create: `atlasws/src/i18n/__tests__/useLang.test.ts`

**Interfaces:**
- Produces:
  - `type Lang = "es" | "en"`
  - `interface HomeDict` (abajo)
  - `export const es: HomeDict`, `export const en: HomeDict`
  - `langFromPath(pathname: string): Lang` — `"en"` si empieza por `/en`
  - `homePath(lang: Lang): string` — `"/"` o `"/en"`
  - `dictFor(lang: Lang): HomeDict`
  - `useLang(): Lang` — hook sobre `useLocation()`

- [ ] **Step 1: Escribir los tests**

`atlasws/src/i18n/__tests__/dicts.test.ts`:

```ts
import { es } from "../es";
import { en } from "../en";

const shape = (v: unknown, prefix = ""): string[] => {
  if (Array.isArray(v)) return [prefix + "[]"];
  if (v && typeof v === "object") {
    return Object.entries(v as Record<string, unknown>)
      .flatMap(([k, x]) => shape(x, `${prefix}${k}.`))
      .sort();
  }
  return [prefix.replace(/\.$/, "")];
};

test("es and en have the same key structure", () => {
  expect(shape(en)).toEqual(shape(es));
});

test("arrays have the same length in both languages", () => {
  expect(en.pattern.industries).toHaveLength(es.pattern.industries.length);
  expect(en.pattern.symptoms).toHaveLength(6);
  expect(es.pattern.symptoms).toHaveLength(6);
  expect(en.ladder.steps).toHaveLength(6);
  expect(es.ladder.steps).toHaveLength(6);
  expect(es.production.stats).toHaveLength(4);
  expect(en.production.stats).toHaveLength(4);
});

test("brand phrases are not translated", () => {
  expect(en.builders.title).toBe("Built by builders.");
  expect(es.builders.title).toBe("Built by builders.");
  expect(en.record.poster).toBe("From system of record to system of action.");
  expect(es.record.poster).toBe("From system of record to system of action.");
});

test("published figures carry the cutoff date in the source line", () => {
  for (const d of [es, en]) {
    expect(d.production.stats.map((s) => s.value)).toEqual(["$80.1M", "134,844", "$593.93", "13"]);
    expect(d.production.source).toContain("09.09.2026");
  }
});
```

`atlasws/src/i18n/__tests__/useLang.test.ts`:

```ts
import React from "react";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { langFromPath, homePath, dictFor, useLang } from "../useLang";
import { es } from "../es";
import { en } from "../en";

test("langFromPath", () => {
  expect(langFromPath("/")).toBe("es");
  expect(langFromPath("/en")).toBe("en");
  expect(langFromPath("/en/")).toBe("en");
  expect(langFromPath("/english")).toBe("es");
  expect(langFromPath("/proyectos")).toBe("es");
});

test("homePath", () => {
  expect(homePath("es")).toBe("/");
  expect(homePath("en")).toBe("/en");
});

test("dictFor", () => {
  expect(dictFor("es")).toBe(es);
  expect(dictFor("en")).toBe(en);
});

test("useLang reads the router location", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={["/en"]}>{children}</MemoryRouter>
  );
  const { result } = renderHook(() => useLang(), { wrapper });
  expect(result.current).toBe("en");
});
```

Nota: este segundo archivo usa JSX, así que su extensión debe ser `.test.tsx`. Créalo como `atlasws/src/i18n/__tests__/useLang.test.tsx`.

- [ ] **Step 2: Correr y verificar que fallan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/i18n`
Expected: FAIL con `Cannot find module '../es'`.

- [ ] **Step 3: Crear `types.ts`**

```ts
export type Lang = "es" | "en";

export interface HomeDict {
  lang: Lang;
  nav: {
    home: string; about: string; services: string; projects: string; contact: string;
    menu: string; langLabel: string;
  };
  hero: { title: string; lead: string; meta: string; cta: string; ctaHref: string };
  pattern: {
    kicker: string; title: string; industries: string[];
    symptomsLabel: string; symptoms: string[]; close: string;
  };
  thesis: {
    kicker: string; title: string;
    items: { n: string; title: string; body: string }[];
    close: string;
  };
  stack: {
    kicker: string; title: string; lead: string;
    layers: { n: string; label: string; name: string; modules: string[]; accent: boolean }[];
  };
  production: {
    kicker: string; title: string; lead: string;
    stats: { value: string; label: string }[];
    source: string; figureAlt: string; figureCaption: string;
  };
  ladder: { kicker: string; title: string; lead: string; steps: string[]; close: string };
  record: {
    kicker: string; title: string;
    left: { label: string; title: string; items: string[] };
    right: { label: string; title: string; items: string[] };
    poster: string;
  };
  horizons: {
    kicker: string; title: string;
    items: { label: string; name: string; sub: string; body: string; status: string; dashed: boolean }[];
  };
  builders: {
    kicker: string; title: string; photoAlt: string; photoCaption: string;
    people: { name: string; areas: string }[];
    awards: string; close: string;
  };
  contact: {
    kicker: string; title: string; lead: string;
    fields: { name: string; email: string; org: string; message: string };
    submit: string; sending: string; sent: string; error: string;
    sideEmail: string; sideWhatsapp: string; sideBase: string;
    email: string; whatsappHref: string; whatsappLabel: string; base: string;
  };
  footer: { base: string; rights: string; instagram: string; facebook: string };
}
```

- [ ] **Step 4: Crear `es.ts`**

```ts
import { HomeDict } from "./types";

export const es: HomeDict = {
  lang: "es",
  nav: {
    home: "Inicio", about: "Nosotros", services: "Servicios", projects: "Proyectos", contact: "Contacto",
    menu: "Menú", langLabel: "Idioma",
  },
  hero: {
    title: "La próxima organización será agéntica.",
    lead: "Construimos la infraestructura para que empresas, industrias y gobiernos entiendan su contexto, ejecuten con criterio y aprendan de cada decisión.",
    meta: "Ciudad de México · Desde 2016",
    cta: "Ver Atlas ONE",
    ctaHref: "https://atlasone.com.mx/",
  },
  pattern: {
    kicker: "El patrón",
    title: "Cambiaron las industrias. El problema era el mismo.",
    industries: ["Gobierno", "Retail", "Finanzas", "Logística"],
    symptomsLabel: "Los mismos seis síntomas, en todas",
    symptoms: [
      "Información fragmentada",
      "Procesos manuales",
      "Sistemas desconectados",
      "Conocimiento viviendo en personas",
      "Decisiones fuera del sistema",
      "Datos sin contexto",
    ],
    close: "El problema no era una industria. Era cómo operan las organizaciones.",
  },
  thesis: {
    kicker: "La tesis",
    title: "Los sistemas actuales registran. No entienden.",
    items: [
      { n: "01", title: "Entender", body: "Contexto, historia, datos y reglas de la organización." },
      { n: "02", title: "Ejecutar", body: "Actuar sobre sistemas reales: herramientas, procesos y aprobaciones." },
      { n: "03", title: "Aprender", body: "Cada decisión mejora la siguiente." },
    ],
    close: "Esa es la organización agéntica.",
  },
  stack: {
    kicker: "Qué construimos",
    title: "Construimos la infraestructura para operar organizaciones.",
    lead: "Una arquitectura. Múltiples contextos.",
    layers: [
      { n: "03", label: "Capa 03 · Inteligencia", name: "Atlas Cortex", accent: true,
        modules: ["Memory", "Agents", "Reasoning", "Policies", "Decisions", "Action"] },
      { n: "02", label: "Capa 02 · Contexto", name: "Atlas Core", accent: false,
        modules: ["Data", "APIs", "Events", "Identity", "Security", "Integrations"] },
      { n: "01", label: "Capa 01 · Operación", name: "Atlas ONE", accent: false,
        modules: ["Ventas", "Compras", "Inventario", "Finanzas", "POS", "Logística", "CRM", "Procesos"] },
    ],
  },
  production: {
    kicker: "Producción real",
    title: "Ya está en producción.",
    lead: "Un deployment · 13 sucursales · 90 días",
    stats: [
      { value: "$80.1M", label: "Ventas registradas (MXN)" },
      { value: "134,844", label: "Tickets procesados" },
      { value: "$593.93", label: "Ticket promedio" },
      { value: "13", label: "Sucursales activas" },
    ],
    source: "Fuente: panel Atlas ONE · cliente de retail multi-sucursal · últimos 90 días · corte 09.09.2026 · MXN",
    figureAlt: "Panel de métricas globales de Atlas ONE: ventas, tickets y ticket promedio en 90 días",
    figureCaption: "Panel Atlas ONE · métricas globales · 90 días",
  },
  ladder: {
    kicker: "De proyecto a plataforma",
    title: "Cada cliente nos enseña algo que el siguiente ya no tiene que pagar.",
    lead: "Convertimos ingeniería aplicada en infraestructura reutilizable. Cada implementación deja atrás componentes que el siguiente deployment ya encuentra hechos.",
    steps: [
      "Problema particular",
      "Proceso modelado",
      "Componente construido",
      "Integración reutilizable",
      "Módulo Atlas",
      "Preset vertical",
    ],
    close: "No empezamos de cero cada vez.",
  },
  record: {
    kicker: "De operación a inteligencia",
    title: "Primero digitalizamos la operación. Ahora la estamos haciendo inteligente.",
    left: {
      label: "System of record",
      title: "Atlas ONE sabe:",
      items: ["qué se vendió", "qué se compró", "qué hay en inventario", "qué se debe", "qué ocurrió", "quién hizo qué"],
    },
    right: {
      label: "System of action",
      title: "Atlas Cortex pregunta:",
      items: ["por qué ocurrió", "qué está cambiando", "qué puede ocurrir", "qué deberíamos hacer", "qué puede ejecutar el sistema"],
    },
    poster: "From system of record to system of action.",
  },
  horizons: {
    kicker: "Tres horizontes",
    title: "Construimos hoy. Investigamos lo que sigue.",
    items: [
      { label: "01 · Hoy", name: "Atlas ONE", sub: "La operación.",
        body: "Digitaliza e integra el negocio. Ya corre en producción.", status: "En producción", dashed: false },
      { label: "02 · Lo siguiente", name: "Atlas Cortex", sub: "La inteligencia.",
        body: "Agentes que razonan y ejecutan sobre esa operación.", status: "En desarrollo", dashed: false },
      { label: "03 · Frontera", name: "Atlas Labs", sub: "La investigación.",
        body: "HarvestT fue el primero: IA aplicada en entornos controlados, tres oros internacionales.", status: "Investigación", dashed: true },
    ],
  },
  builders: {
    kicker: "Built by builders",
    title: "Built by builders.",
    photoAlt: "Los fundadores de Atlas con sus medallas en INTARG, Katowice, 2017",
    photoCaption: "INTARG · Katowice · 2017",
    people: [
      { name: "Emmanuel", areas: "Producto · Arquitectura · Ventures" },
      { name: "Leonardo", areas: "IA · Research · Tecnología" },
      { name: "Israel", areas: "Crecimiento · Comercial · Clientes" },
    ],
    awards: "13 reconocimientos internacionales, 2016–2021.",
    close: "Diez años después, seguimos haciendo lo mismo: construir.",
  },
  contact: {
    kicker: "Contacto",
    title: "Hablemos.",
    lead: "Cuéntanos qué opera tu organización y qué quieres que opere con agentes.",
    fields: { name: "Nombre", email: "Correo", org: "Organización (opcional)", message: "Mensaje" },
    submit: "Enviar",
    sending: "Enviando…",
    sent: "Mensaje enviado. Te respondemos al correo que nos dejaste.",
    error: "No pudimos enviar tu mensaje. Escríbenos directo:",
    sideEmail: "Correo", sideWhatsapp: "WhatsApp", sideBase: "Base",
    email: "hola@atlastech.mx",
    whatsappHref: "https://wa.me/527221495215",
    whatsappLabel: "+52 722 149 5215",
    base: "Ciudad de México · Desde 2016",
  },
  footer: {
    base: "Ciudad de México · Desde 2016",
    rights: "© 2026 Atlas Tech",
    instagram: "https://www.instagram.com/atlas_tech.mx/",
    facebook: "https://www.facebook.com/share/1MBcRaVy8t/?mibextid=wwXIfr",
  },
};
```

- [ ] **Step 5: Crear `en.ts`**

```ts
import { HomeDict } from "./types";

export const en: HomeDict = {
  lang: "en",
  nav: {
    home: "Home", about: "About", services: "Services", projects: "Projects", contact: "Contact",
    menu: "Menu", langLabel: "Language",
  },
  hero: {
    title: "The next organization will be agentic.",
    lead: "We build the infrastructure for companies, industries and governments to understand their context, act with judgment and learn from every decision.",
    meta: "Mexico City · Since 2016",
    cta: "See Atlas ONE",
    ctaHref: "https://atlasone.com.mx/",
  },
  pattern: {
    kicker: "The pattern",
    title: "The industries changed. The problem stayed the same.",
    industries: ["Government", "Retail", "Finance", "Logistics"],
    symptomsLabel: "The same six symptoms, everywhere",
    symptoms: [
      "Fragmented information",
      "Manual processes",
      "Disconnected systems",
      "Knowledge living in people",
      "Decisions outside the system",
      "Data without context",
    ],
    close: "The problem was never one industry. It was how organizations operate.",
  },
  thesis: {
    kicker: "The thesis",
    title: "Today's systems record. They don't understand.",
    items: [
      { n: "01", title: "Understand", body: "The organization's context, history, data and rules." },
      { n: "02", title: "Execute", body: "Act on real systems: tools, processes and approvals." },
      { n: "03", title: "Learn", body: "Every decision improves the next one." },
    ],
    close: "That is the agentic organization.",
  },
  stack: {
    kicker: "What we build",
    title: "We build the infrastructure to operate organizations.",
    lead: "One architecture. Many contexts.",
    layers: [
      { n: "03", label: "Layer 03 · Intelligence", name: "Atlas Cortex", accent: true,
        modules: ["Memory", "Agents", "Reasoning", "Policies", "Decisions", "Action"] },
      { n: "02", label: "Layer 02 · Context", name: "Atlas Core", accent: false,
        modules: ["Data", "APIs", "Events", "Identity", "Security", "Integrations"] },
      { n: "01", label: "Layer 01 · Operations", name: "Atlas ONE", accent: false,
        modules: ["Sales", "Purchasing", "Inventory", "Finance", "POS", "Logistics", "CRM", "Processes"] },
    ],
  },
  production: {
    kicker: "Real production",
    title: "It's already in production.",
    lead: "One deployment · 13 branches · 90 days",
    stats: [
      { value: "$80.1M", label: "Sales recorded (MXN)" },
      { value: "134,844", label: "Tickets processed" },
      { value: "$593.93", label: "Average ticket" },
      { value: "13", label: "Active branches" },
    ],
    source: "Source: Atlas ONE panel · multi-branch retail client · last 90 days · as of 09.09.2026 · MXN",
    figureAlt: "Atlas ONE global metrics panel: sales, tickets and average ticket over 90 days",
    figureCaption: "Atlas ONE panel · global metrics · 90 days",
  },
  ladder: {
    kicker: "From project to platform",
    title: "Every client teaches us something the next one no longer has to pay for.",
    lead: "We turn applied engineering into reusable infrastructure. Each implementation leaves behind components the next deployment already finds built.",
    steps: [
      "Specific problem",
      "Modeled process",
      "Built component",
      "Reusable integration",
      "Atlas module",
      "Vertical preset",
    ],
    close: "We never start from zero.",
  },
  record: {
    kicker: "From operations to intelligence",
    title: "First we digitized operations. Now we're making them intelligent.",
    left: {
      label: "System of record",
      title: "Atlas ONE knows:",
      items: ["what was sold", "what was bought", "what's in inventory", "what is owed", "what happened", "who did what"],
    },
    right: {
      label: "System of action",
      title: "Atlas Cortex asks:",
      items: ["why it happened", "what is changing", "what could happen", "what we should do", "what the system can execute"],
    },
    poster: "From system of record to system of action.",
  },
  horizons: {
    kicker: "Three horizons",
    title: "We build today. We research what's next.",
    items: [
      { label: "01 · Today", name: "Atlas ONE", sub: "Operations.",
        body: "Digitizes and integrates the business. Already running in production.", status: "In production", dashed: false },
      { label: "02 · Next", name: "Atlas Cortex", sub: "Intelligence.",
        body: "Agents that reason and execute on top of that operation.", status: "In development", dashed: false },
      { label: "03 · Frontier", name: "Atlas Labs", sub: "Research.",
        body: "HarvestT was the first: applied AI in controlled environments, three international golds.", status: "Research", dashed: true },
    ],
  },
  builders: {
    kicker: "Built by builders",
    title: "Built by builders.",
    photoAlt: "Atlas founders with their medals at INTARG, Katowice, 2017",
    photoCaption: "INTARG · Katowice · 2017",
    people: [
      { name: "Emmanuel", areas: "Product · Architecture · Ventures" },
      { name: "Leonardo", areas: "AI · Research · Technology" },
      { name: "Israel", areas: "Growth · Commercial · Clients" },
    ],
    awards: "13 international awards, 2016–2021.",
    close: "Ten years later, we're still doing the same thing: building.",
  },
  contact: {
    kicker: "Contact",
    title: "Let's talk.",
    lead: "Tell us what your organization operates and what you want it to operate with agents.",
    fields: { name: "Name", email: "Email", org: "Organization (optional)", message: "Message" },
    submit: "Send",
    sending: "Sending…",
    sent: "Message sent. We'll reply to the email you gave us.",
    error: "We couldn't send your message. Write to us directly:",
    sideEmail: "Email", sideWhatsapp: "WhatsApp", sideBase: "Base",
    email: "hola@atlastech.mx",
    whatsappHref: "https://wa.me/527221495215",
    whatsappLabel: "+52 722 149 5215",
    base: "Mexico City · Since 2016",
  },
  footer: {
    base: "Mexico City · Since 2016",
    rights: "© 2026 Atlas Tech",
    instagram: "https://www.instagram.com/atlas_tech.mx/",
    facebook: "https://www.facebook.com/share/1MBcRaVy8t/?mibextid=wwXIfr",
  },
};
```

- [ ] **Step 6: Crear `useLang.ts`**

```ts
import { useLocation } from "react-router-dom";
import { Lang, HomeDict } from "./types";
import { es } from "./es";
import { en } from "./en";

export const langFromPath = (pathname: string): Lang =>
  /^\/en(\/|$)/.test(pathname) ? "en" : "es";

export const homePath = (lang: Lang): string => (lang === "en" ? "/en" : "/");

export const dictFor = (lang: Lang): HomeDict => (lang === "en" ? en : es);

export const useLang = (): Lang => langFromPath(useLocation().pathname);
```

- [ ] **Step 7: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/i18n`
Expected: 8 tests PASS.

- [ ] **Step 8: Commit**

```bash
cd atlasws && git add src/i18n && git commit -m "feat(i18n): diccionarios ES/EN del Home y resolución de idioma por ruta

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 3: SEO bilingüe — `locale`, `alternates`, hreflang, `<html lang>`

**Files:**
- Modify: `atlasws/src/seo/seo.config.json` (ruta `/` y nueva ruta `/en`)
- Modify: `atlasws/src/seo/resolveSeo.ts`
- Modify: `atlasws/src/seo/SeoRouter.tsx`
- Modify: `atlasws/scripts/seo-build.cjs`
- Create: `atlasws/src/seo/__tests__/resolveSeo.test.ts`
- Create: `atlasws/src/seo/__tests__/seoBuild.test.ts`

**Interfaces:**
- Produces en `ResolvedSeo`: `lang: string` (`"es"`/`"en"`), `locale: string` (`"es_MX"`/`"en_US"`), `alternates: { hreflang: string; href: string }[]`.
- `scripts/seo-build.cjs` exporta `{ seoBlock, injectInto, buildAll }`; `buildAll(buildDir)` escribe los HTML por ruta, `sitemap.xml` y `robots.txt` dentro de `buildDir`. `main()` solo corre cuando el script se ejecuta directo.

- [ ] **Step 1: Escribir los tests**

`atlasws/src/seo/__tests__/resolveSeo.test.ts`:

```ts
import { resolveSeo } from "../resolveSeo";

test("/ is Spanish with alternates to /en and x-default", () => {
  const s = resolveSeo("/");
  expect(s.lang).toBe("es");
  expect(s.locale).toBe("es_MX");
  expect(s.alternates).toEqual(
    expect.arrayContaining([
      { hreflang: "es-MX", href: "https://atlastech.mx/" },
      { hreflang: "en", href: "https://atlastech.mx/en" },
      { hreflang: "x-default", href: "https://atlastech.mx/" },
    ])
  );
});

test("/en is English with its own canonical", () => {
  const s = resolveSeo("/en");
  expect(s.lang).toBe("en");
  expect(s.locale).toBe("en_US");
  expect(s.canonical).toBe("https://atlastech.mx/en");
  expect(s.title).toMatch(/Atlas Tech/);
  expect(s.alternates.map((a) => a.hreflang).sort()).toEqual(["en", "es-MX", "x-default"]);
});

test("routes without alternates default to site locale and empty list", () => {
  const s = resolveSeo("/proyectos");
  expect(s.lang).toBe("es");
  expect(s.locale).toBe("es_MX");
  expect(s.alternates).toEqual([]);
});
```

`atlasws/src/seo/__tests__/seoBuild.test.ts`:

```ts
import fs from "fs";
import os from "os";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildAll, seoBlock } = require("../../../scripts/seo-build.cjs");

const TEMPLATE = `<!DOCTYPE html><html lang="es"><head><title>x</title><meta name="description" content="y" /></head><body><div id="root"></div></body></html>`;

test("seoBlock for /en emits hreflang links and en_US locale", () => {
  const block = seoBlock({
    path: "/en", title: "T", description: "D", locale: "en_US",
    alternates: { "es-MX": "/", en: "/en", "x-default": "/" },
  });
  expect(block).toContain(`<link rel="alternate" hreflang="en" href="https://atlastech.mx/en" />`);
  expect(block).toContain(`<link rel="alternate" hreflang="x-default" href="https://atlastech.mx/" />`);
  expect(block).toContain(`<meta property="og:locale" content="en_US" />`);
  expect(block).toContain(`<link rel="canonical" href="https://atlastech.mx/en" />`);
});

test("buildAll writes /en/index.html with lang=en and sitemap includes /en", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "seo-"));
  fs.writeFileSync(path.join(dir, "index.html"), TEMPLATE);
  buildAll(dir);
  const enHtml = fs.readFileSync(path.join(dir, "en", "index.html"), "utf8");
  expect(enHtml).toContain(`<html lang="en">`);
  expect(enHtml).toContain(`hreflang="es-MX"`);
  const esHtml = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  expect(esHtml).toContain(`<html lang="es">`);
  expect(esHtml).toContain(`hreflang="en"`);
  const sitemap = fs.readFileSync(path.join(dir, "sitemap.xml"), "utf8");
  expect(sitemap).toContain("<loc>https://atlastech.mx/en</loc>");
});
```

- [ ] **Step 2: Correr y verificar que fallan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/seo`
Expected: FAIL (`s.lang` undefined; `buildAll is not a function`).

- [ ] **Step 3: Actualizar `seo.config.json`**

En la ruta `"/"` añadir, después de `"keywords"`:

```json
      "locale": "es_MX",
      "alternates": { "es-MX": "/", "en": "/en", "x-default": "/" },
```

Y añadir esta ruta justo después del objeto de `"/"` (antes de `"/about"`):

```json
    {
      "path": "/en",
      "title": "Atlas Tech — Infrastructure for the agentic organization",
      "description": "Atlas Tech builds the infrastructure for companies, industries and governments to understand their context, act with judgment and learn from every decision. Mexico City, since 2016.",
      "type": "website",
      "image": "/images/projects/harvestt/mars-domes-branded.png",
      "keywords": "Atlas Tech, agentic organization, Atlas ONE, Atlas Cortex, business OS, AI agents, Mexico",
      "locale": "en_US",
      "alternates": { "es-MX": "/", "en": "/en", "x-default": "/" },
      "jsonld": [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Atlas Tech",
          "url": "{siteUrl}/",
          "logo": "{siteUrl}/logo512.png",
          "description": "Infrastructure for the agentic organization: Atlas ONE, Atlas Core and Atlas Cortex.",
          "sameAs": []
        }
      ]
    },
```

También actualizar `title` y `description` de la ruta `"/"` a la narrativa nueva:

```json
      "title": "Atlas Tech — Infraestructura para la organización agéntica",
      "description": "Atlas Tech construye la infraestructura para que empresas, industrias y gobiernos entiendan su contexto, ejecuten con criterio y aprendan de cada decisión. Ciudad de México, desde 2016.",
```

- [ ] **Step 4: Actualizar `resolveSeo.ts`**

Añadir a la interfaz `ResolvedSeo`:

```ts
  lang: string;         // "es" | "en"
  locale: string;       // "es_MX" | "en_US"
  alternates: { hreflang: string; href: string }[];
```

Añadir helpers después de `hydrateJsonld`:

```ts
const langOf = (locale: string): string => locale.split(/[_-]/)[0].toLowerCase();

const alternatesOf = (map: Record<string, string> | undefined) =>
  map ? Object.entries(map).map(([hreflang, p]) => ({ hreflang, href: abs(p) })) : [];
```

En el `return` del default genérico (cuando `!route`) añadir:

```ts
      lang: langOf(seo.locale),
      locale: seo.locale,
      alternates: [],
```

En el `return` final añadir:

```ts
    lang: langOf(route.locale || seo.locale),
    locale: route.locale || seo.locale,
    alternates: alternatesOf(route.alternates),
```

- [ ] **Step 5: Actualizar `SeoRouter.tsx`**

Sustituir la línea `upsertMeta("property", "og:locale", seoConfig.locale);` por:

```ts
    upsertMeta("property", "og:locale", s.locale);
    document.documentElement.lang = s.lang;

    // hreflang: se regeneran completos en cada navegación
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    for (const a of s.alternates) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = a.hreflang;
      link.href = a.href;
      document.head.appendChild(link);
    }
```

- [ ] **Step 6: Refactorizar `seo-build.cjs`**

Reemplazar el archivo completo por:

```js
/* ============================================================
 * scripts/seo-build.cjs
 * Post-build SEO: inyecta <title>, meta, Open Graph, Twitter, hreflang y JSON-LD
 * por ruta dentro de build/<ruta>/index.html, y genera sitemap.xml + robots.txt.
 *
 * Por qué: Hostinger sirve estático (Apache, sin SSR). Los crawlers sociales
 * NO ejecutan JS, así que cada URL necesita su meta real en el HTML entregado.
 *
 * Se ejecuta tras `npm run build` (lifecycle "postbuild"). Exporta sus funciones
 * para poder probarlas con Jest.
 * ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const cfg = require(path.join(ROOT, "src", "seo", "seo.config.json"));

const SITE = String(cfg.siteUrl).replace(/\/$/, "");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const abs = (p) => {
  if (!p) return "";
  if (/^https?:\/\//.test(p)) return p;
  return SITE + (p.startsWith("/") ? p : "/" + p);
};

const tmpl = (title, isHome) => (isHome ? title : String(cfg.titleTemplate).replace("%s", title));

const hydrate = (nodes) => {
  if (!nodes || !nodes.length) return [];
  return JSON.parse(JSON.stringify(nodes).replace(/\{siteUrl\}/g, SITE));
};

const langOf = (locale) => String(locale).split(/[_-]/)[0].toLowerCase();

function seoBlock(route) {
  const isHome = route.path === "/" || route.path === "/en";
  const title = tmpl(route.title, isHome);
  const desc = route.description || cfg.organization.description;
  const canonical = abs(route.path);
  const image = abs(route.image || cfg.defaultImage);
  const type = route.type || "website";
  const robots = route.noindex ? "noindex, nofollow" : "index, follow";
  const locale = route.locale || cfg.locale;
  const alternates = route.alternates
    ? Object.entries(route.alternates).map(
        ([hreflang, p]) => `<link rel="alternate" hreflang="${esc(hreflang)}" href="${abs(p)}" />`
      )
    : [];

  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}" />`,
    route.keywords ? `<meta name="keywords" content="${esc(route.keywords)}" />` : "",
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    ...alternates,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${esc(cfg.brand)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="${esc(locale)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    cfg.twitter ? `<meta name="twitter:site" content="${esc(cfg.twitter)}" />` : "",
  ];

  const jsonld = hydrate(route.jsonld);
  if (jsonld.length) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld)}</script>`);
  }
  return lines.filter(Boolean).join("\n    ");
}

function injectInto(html, route) {
  const lang = langOf(route.locale || cfg.locale);
  let out = html
    .replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']keywords["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']alternate["'][^>]*hreflang[^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "");

  const block = seoBlock(route);
  return out.replace(/<\/head>/i, "    " + block + "\n  </head>");
}

function buildAll(buildDir) {
  const templatePath = path.join(buildDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error("SEO: no existe build/index.html. ¿Corriste `npm run build`?");
  }
  const template = fs.readFileSync(templatePath, "utf8");
  const routes = cfg.routes;
  const today = new Date().toISOString().slice(0, 10);
  let count = 0;

  for (const route of routes) {
    const html = injectInto(template, route);
    const outDir = route.path === "/" ? buildDir : path.join(buildDir, route.path);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
    count++;
  }

  const urls = routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const priority =
        r.path === "/" ? "1.0" : r.path === "/en" ? "0.9" : r.path.startsWith("/proyectos/") ? "0.8" : "0.6";
      return `  <url>\n    <loc>${abs(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap, "utf8");

  const robots = `# Atlas Tech\nUser-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${SITE}/sitemap.xml\n`;
  fs.writeFileSync(path.join(buildDir, "robots.txt"), robots, "utf8");

  return count;
}

function main() {
  if (SITE.includes("tu-dominio.com")) {
    console.warn("\n⚠️  SEO: 'siteUrl' sigue siendo el placeholder en src/seo/seo.config.json.\n");
  }
  try {
    const count = buildAll(path.join(ROOT, "build"));
    console.log(`✅ SEO: ${count} rutas con meta inyectada · sitemap.xml + robots.txt generados (${SITE}).`);
  } catch (e) {
    console.error("❌ " + e.message);
    process.exit(1);
  }
}

module.exports = { seoBlock, injectInto, buildAll };

if (require.main === module) main();
```

- [ ] **Step 7: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/seo`
Expected: 5 tests PASS.

- [ ] **Step 8: Commit**

```bash
cd atlasws && git add src/seo scripts/seo-build.cjs && git commit -m "feat(seo): ruta /en, locale y hreflang por ruta en runtime y build

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 4: Componentes base `AtlasMark`, `Band`, `Grid`, `StatRow`

**Files:**
- Create: `atlasws/src/components/mst/AtlasMark.tsx`
- Create: `atlasws/src/components/mst/Band.tsx`
- Create: `atlasws/src/components/mst/Grid.tsx`
- Create: `atlasws/src/components/mst/StatRow.tsx`
- Create: `atlasws/src/components/mst/__tests__/base.test.tsx`

**Interfaces:**
- Produces:
  - `AtlasMark: React.FC<{ className?: string; title?: string }>` — SVG inline con `fill="currentColor"`.
  - `Band: React.FC<{ n: string; kicker: string; title: string; id?: string; bleed?: React.ReactNode; className?: string; children?: React.ReactNode }>` — `<section id={id ?? "s"+n}>`; `bleed` se renderiza fuera de `.mst-wrap`, antes del `.hr`.
  - `Grid: React.FC<{ cols: 2 | 3 | 4 | 6; as?: "div" | "ol" | "ul"; className?: string; children: React.ReactNode }>`.
  - `StatRow: React.FC<{ stats: { value: string; label: string }[]; source: string }>` — lanza si `source` está vacío.

- [ ] **Step 1: Escribir el test**

`atlasws/src/components/mst/__tests__/base.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Band } from "../Band";
import { Grid } from "../Grid";
import { StatRow } from "../StatRow";
import { AtlasMark } from "../AtlasMark";

test("Band renders numbered kicker, title, children, bleed and a 2px rule", () => {
  const { container } = render(
    <Band n="05" kicker="Producción real" title="Ya está en producción." bleed={<div data-testid="bleed" />}>
      <p>hijo</p>
    </Band>
  );
  const section = container.querySelector("section#s05")!;
  expect(section).toBeInTheDocument();
  expect(section.querySelector(".mst-kicker")).toHaveTextContent("05 · Producción real");
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Ya está en producción.");
  expect(screen.getByText("hijo")).toBeInTheDocument();
  const bleed = screen.getByTestId("bleed");
  expect(bleed.closest(".mst-wrap")).toBeNull();
  expect(section.querySelector("hr.hr")).toBeInTheDocument();
});

test("Grid renders equal cells with the cols class and chosen tag", () => {
  const { container } = render(
    <Grid cols={3} as="ol"><li>a</li><li>b</li><li>c</li></Grid>
  );
  const ol = container.querySelector("ol.mst-grid.mst-grid-3")!;
  expect(ol).toBeInTheDocument();
  expect(ol.children).toHaveLength(3);
});

test("StatRow renders four figures and the mandatory source caption", () => {
  const stats = [
    { value: "$80.1M", label: "Ventas" }, { value: "134,844", label: "Tickets" },
    { value: "$593.93", label: "Ticket promedio" }, { value: "13", label: "Sucursales" },
  ];
  const { container } = render(<StatRow stats={stats} source="Fuente: panel · corte 09.09.2026" />);
  expect(container.querySelectorAll(".mst-stat-value")).toHaveLength(4);
  expect(container.querySelector("figcaption")).toHaveTextContent("corte 09.09.2026");
});

test("StatRow refuses to render figures without a source", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<StatRow stats={[{ value: "1", label: "x" }]} source="  " />)).toThrow(/source/);
  spy.mockRestore();
});

test("AtlasMark is an inline svg on currentColor", () => {
  const { container } = render(<AtlasMark title="Atlas" />);
  const svg = container.querySelector("svg")!;
  expect(svg).toBeInTheDocument();
  expect(svg.querySelector("g")).toHaveAttribute("fill", "currentColor");
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/components/mst`
Expected: FAIL con `Cannot find module '../Band'`.

- [ ] **Step 3: Crear `AtlasMark.tsx`**

```tsx
import React from "react";

interface Props { className?: string; title?: string }

/** Marca Atlas (contex/atlas startup/assets/atlas-mark.svg) como SVG inline sobre currentColor. */
export const AtlasMark: React.FC<Props> = ({ className = "mst-mark", title }) => (
  <svg
    className={className}
    viewBox="0 0 1404.76 1552.38"
    xmlns="http://www.w3.org/2000/svg"
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
  >
    {title ? <title>{title}</title> : null}
    <g fill="currentColor">
      <polygon points="934.24 1018.92 741.3 593.42 555.43 1018.6 413.45 1017.21 671.47 461.47 814.03 461.22 1079.6 1016.97 934.24 1018.92" />
      <polygon points="875.7 1113.46 610.33 1113.47 651.67 1019.16 833.28 1019.41 875.7 1113.46" />
      <path d="M1173,1138.15c-19.08,23.79-41.74,45.54-63.35,66.96-105.11,104.24-256.55,156.86-404.04,151.69-312.12-10.94-556.63-271.31-550.15-582.23,5.31-254.52,181.54-476.97,430.37-540.24,52-13.22,104.59-18.1,159.92-16.48,168.69,4.92,325.27,86.62,428.41,218.22,160.84,205.23,163.26,497.1-1.17,702.08ZM1047.54,1127.71c208.75-198.07,192.15-532.85-33.36-710.02-184.04-144.59-449.05-130.1-616.6,34.29-184.57,181.09-188.22,476.07-8.68,661.53,178.12,184,472.32,190.99,658.65,14.2Z" />
    </g>
  </svg>
);
```

- [ ] **Step 4: Crear `Band.tsx`**

```tsx
import React from "react";

interface Props {
  n: string;
  kicker: string;
  title: string;
  id?: string;
  bleed?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/** Banda completa: kicker numerado, titular display, contenido, slot full-bleed y regla de 2px al cierre. */
export const Band: React.FC<Props> = ({ n, kicker, title, id, bleed, className = "", children }) => {
  const sectionId = id ?? `s${n}`;
  const titleId = `${sectionId}-title`;
  return (
    <section id={sectionId} className={`mst-band ${className}`.trim()} aria-labelledby={titleId}>
      <div className="mst-wrap">
        <p className="mst-kicker">
          <span className="mst-kicker-n">{n}</span> · {kicker}
        </p>
        <h2 id={titleId} className="mst-display">{title}</h2>
        {children}
      </div>
      {bleed}
      <hr className="hr mst-band-rule" />
    </section>
  );
};
```

- [ ] **Step 5: Crear `Grid.tsx`**

```tsx
import React from "react";

interface Props {
  cols: 2 | 3 | 4 | 6;
  as?: "div" | "ol" | "ul";
  className?: string;
  children: React.ReactNode;
}

/** Celdas de ancho igual separadas por reglas de 2px (ver home.css). */
export const Grid: React.FC<Props> = ({ cols, as = "div", className = "", children }) => {
  const Tag = as;
  return <Tag className={`mst-grid mst-grid-${cols} ${className}`.trim()}>{children}</Tag>;
};
```

- [ ] **Step 6: Crear `StatRow.tsx`**

```tsx
import React from "react";
import { Grid } from "./Grid";

export interface Stat { value: string; label: string }

interface Props { stats: Stat[]; source: string }

/** Cifras destacadas. Regla de contenido: sin fuente, periodo y corte, la cifra no se publica. */
export const StatRow: React.FC<Props> = ({ stats, source }) => {
  if (!source.trim()) {
    throw new Error("StatRow: every published figure needs a source line (fuente · periodo · corte).");
  }
  const cols = (stats.length === 3 ? 3 : stats.length === 2 ? 2 : 4) as 2 | 3 | 4;
  return (
    <figure className="mst-stats">
      <Grid cols={cols}>
        {stats.map((s) => (
          <div key={s.label}>
            <span className="mst-stat-value">{s.value}</span>
            <span className="mst-stat-label">{s.label}</span>
          </div>
        ))}
      </Grid>
      <figcaption>{source}</figcaption>
    </figure>
  );
};
```

- [ ] **Step 7: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/components/mst`
Expected: 5 tests PASS.

- [ ] **Step 8: Commit**

```bash
cd atlasws && git add src/components/mst && git commit -m "feat(mst): componentes base Band, Grid, StatRow y AtlasMark

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 5: `MstHeader` y `MstFooter`

**Files:**
- Create: `atlasws/src/components/mst/MstHeader.tsx`
- Create: `atlasws/src/components/mst/MstFooter.tsx`
- Create: `atlasws/src/components/mst/__tests__/chrome.test.tsx`

**Interfaces:**
- Consumes: `HomeDict`, `Lang`, `homePath` (Task 2); `AtlasMark` (Task 4).
- Produces: `MstHeader: React.FC<{ dict: HomeDict; lang: Lang }>`, `MstFooter: React.FC<{ dict: HomeDict }>`.

- [ ] **Step 1: Escribir el test**

`atlasws/src/components/mst/__tests__/chrome.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MstHeader } from "../MstHeader";
import { MstFooter } from "../MstFooter";
import { es } from "../../../i18n/es";
import { en } from "../../../i18n/en";

const wrap = (ui: React.ReactElement, path = "/") => render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

test("header links to existing routes and marks the current language", () => {
  wrap(<MstHeader dict={es} lang="es" />);
  // Los enlaces aparecen dos veces: nav de escritorio y <details> móvil (jsdom renderiza ambos).
  expect(screen.getAllByRole("link", { name: /nosotros/i })[0]).toHaveAttribute("href", "/about");
  expect(screen.getAllByRole("link", { name: /proyectos/i })[0]).toHaveAttribute("href", "/proyectos");
  expect(screen.getAllByRole("link", { name: /contacto/i })[0]).toHaveAttribute("href", "/contact");
  const esToggle = screen.getByRole("link", { name: "ES" });
  const enToggle = screen.getByRole("link", { name: "EN" });
  expect(esToggle).toHaveAttribute("aria-current", "true");
  expect(enToggle).toHaveAttribute("href", "/en");
  expect(enToggle).not.toHaveAttribute("aria-current");
});

test("header in English points the brand to /en", () => {
  wrap(<MstHeader dict={en} lang="en" />, "/en");
  expect(screen.getByRole("link", { name: /atlas tech/i })).toHaveAttribute("href", "/en");
  expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute("href", "/");
});

test("footer shows contact channels", () => {
  wrap(<MstFooter dict={es} />);
  expect(screen.getByRole("link", { name: "hola@atlastech.mx" })).toHaveAttribute("href", "mailto:hola@atlastech.mx");
  expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/527221495215");
  expect(screen.getByText("© 2026 Atlas Tech")).toBeInTheDocument();
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/components/mst/__tests__/chrome`
Expected: FAIL con `Cannot find module '../MstHeader'`.

- [ ] **Step 3: Crear `MstHeader.tsx`**

```tsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { HomeDict, Lang } from "../../i18n/types";
import { homePath } from "../../i18n/useLang";
import { AtlasMark } from "./AtlasMark";

interface Props { dict: HomeDict; lang: Lang }

const LangToggle: React.FC<{ lang: Lang; label: string }> = ({ lang, label }) => (
  <nav className="seg" aria-label={label}>
    <Link className="seg-opt" to={homePath("es")} aria-current={lang === "es" ? "true" : undefined} lang="es">ES</Link>
    <Link className="seg-opt" to={homePath("en")} aria-current={lang === "en" ? "true" : undefined} lang="en">EN</Link>
  </nav>
);

export const MstHeader: React.FC<Props> = ({ dict, lang }) => {
  const links = [
    { to: "/about", label: dict.nav.about },
    { to: "/service", label: dict.nav.services },
    { to: "/proyectos", label: dict.nav.projects },
    { to: "/contact", label: dict.nav.contact },
  ];
  return (
    <header className="nav mst-nav">
      <Link to={homePath(lang)} className="nav-brand">
        <AtlasMark title="Atlas Tech" />
        <span>Atlas Tech</span>
      </Link>
      <nav className="mst-nav-links" aria-label={dict.nav.menu}>
        {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
      </nav>
      <LangToggle lang={lang} label={dict.nav.langLabel} />
      <details className="mst-nav-mobile">
        <summary aria-label={dict.nav.menu}><Menu size={18} aria-hidden="true" /> {dict.nav.menu}</summary>
        <div className="mst-nav-mobile-list">
          {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </div>
      </details>
    </header>
  );
};
```

- [ ] **Step 4: Crear `MstFooter.tsx`**

```tsx
import React from "react";
import { HomeDict } from "../../i18n/types";
import { AtlasMark } from "./AtlasMark";

interface Props { dict: HomeDict }

export const MstFooter: React.FC<Props> = ({ dict }) => (
  <footer className="mst-footer">
    <div className="mst-wrap">
      <div className="mst-footer-row">
        <div>
          <p className="nav-brand"><AtlasMark title="Atlas Tech" /> <span>Atlas Tech</span></p>
          <p className="mst-meta">{dict.footer.base}</p>
        </div>
        <div className="mst-footer-links">
          <a href={`mailto:${dict.contact.email}`}>{dict.contact.email}</a>
          <a href={dict.contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {dict.contact.whatsappLabel}</a>
          <a href={dict.footer.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={dict.footer.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <p className="mst-footer-small">{dict.footer.rights}</p>
    </div>
  </footer>
);
```

- [ ] **Step 5: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/components/mst`
Expected: 8 tests PASS.

- [ ] **Step 6: Commit**

```bash
cd atlasws && git add src/components/mst && git commit -m "feat(mst): header con toggle ES/EN y footer del Home

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 6: Assets del Home (captura recortada y foto)

**Files:**
- Create: `atlasws/scripts/prepare-home-images.cjs`
- Create (generados): `atlasws/public/images/home/atlasone-metrics-crop.webp`, `atlasws/public/images/home/founders-intarg-2017.webp`

**Interfaces:**
- Produces: rutas públicas `/images/home/atlasone-metrics-crop.webp` y `/images/home/founders-intarg-2017.webp`, usadas por las secciones 05 y 09.

Contexto: `atlasone-metrics.png` mide 1871×916. La fila superior de tarjetas ocupa y≈135–290 y las tres primeras tarjetas (Revenue, Tickets, AOV) x≈258–1455. El recorte `left 240, top 40, width 1230, height 260` deja la cabecera "Métricas globales" y esas tres tarjetas, y excluye "Tenants activos", la segunda fila (MRR proxy, tasas) y la gráfica. `photo-intarg-2017.jpg` mide 1771×1771.

- [ ] **Step 1: Crear el script**

`atlasws/scripts/prepare-home-images.cjs`:

```js
/* ============================================================
 * scripts/prepare-home-images.cjs
 * Genera los assets del Home Modernist a partir de contex/atlas startup/assets.
 *  - Captura del panel Atlas ONE recortada a cabecera + Revenue/Tickets/AOV.
 *    Fuera: Tenants, MRR proxy, tasas y gráfica histórica (no autorizados).
 *  - Foto INTARG 2017 reducida a 1600px.
 * Uso: node scripts/prepare-home-images.cjs
 * ============================================================ */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.resolve(ROOT, "..", "contex", "atlas startup", "assets");
const OUT = path.join(ROOT, "public", "images", "home");

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  await sharp(path.join(SRC, "atlasone-metrics.png"))
    .extract({ left: 240, top: 40, width: 1230, height: 260 })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, "atlasone-metrics-crop.webp"));

  await sharp(path.join(SRC, "photo-intarg-2017.jpg"))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, "founders-intarg-2017.webp"));

  for (const f of fs.readdirSync(OUT)) {
    const { width, height } = await sharp(path.join(OUT, f)).metadata();
    console.log(`✅ ${f} ${width}×${height} · ${(fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0)} KB`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 2: Ejecutar y verificar salidas**

Run: `cd atlasws && node scripts/prepare-home-images.cjs`
Expected:

```
✅ atlasone-metrics-crop.webp 1230×260 · <150 KB
✅ founders-intarg-2017.webp 1600×1600 · <400 KB
```

- [ ] **Step 3: Inspeccionar visualmente el recorte**

Abrir `atlasws/public/images/home/atlasone-metrics-crop.webp` (con la herramienta Read del agente o un visor). Debe verse el título "Métricas globales" y exactamente tres tarjetas: REVENUE $80,088,215.58 · TICKETS 134844 · AOV $593.93. Si aparece "TENANTS ACTIVOS" o cualquier parte de la segunda fila, ajustar `width`/`height` del `extract` y repetir el Step 2.

- [ ] **Step 4: Commit**

```bash
cd atlasws && git add scripts/prepare-home-images.cjs public/images/home && git commit -m "feat(assets): captura recortada del panel Atlas ONE y foto INTARG 2017 para el Home

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 7: Secciones 01–04 (Hero, Pattern, Thesis, Stack)

**Files:**
- Create: `atlasws/src/pages/home/sections/Hero.tsx`
- Create: `atlasws/src/pages/home/sections/Pattern.tsx`
- Create: `atlasws/src/pages/home/sections/Thesis.tsx`
- Create: `atlasws/src/pages/home/sections/Stack.tsx`
- Create: `atlasws/src/pages/home/sections/__tests__/sections-1-4.test.tsx`

**Interfaces:**
- Consumes: `Band`, `Grid` (Task 4); `HomeDict` (Task 2); `ArrowUpRight` de `lucide-react`.
- Produces: `Hero`, `Pattern`, `Thesis`, `Stack`, todos `React.FC<{ dict: HomeDict }>`.

- [ ] **Step 1: Escribir el test**

`atlasws/src/pages/home/sections/__tests__/sections-1-4.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";
import { Pattern } from "../Pattern";
import { Thesis } from "../Thesis";
import { Stack } from "../Stack";
import { es } from "../../../../i18n/es";
import { en } from "../../../../i18n/en";

describe.each([["es", es], ["en", en]])("sections 01-04 in %s", (_, dict) => {
  test("Hero: h1, lead, meta and a single external primary CTA", () => {
    const { container } = render(<Hero dict={dict} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(dict.hero.title);
    expect(screen.getByText(dict.hero.meta)).toBeInTheDocument();
    const ctas = container.querySelectorAll("a.btn-primary");
    expect(ctas).toHaveLength(1);
    expect(ctas[0]).toHaveAttribute("href", "https://atlasone.com.mx/");
    expect(ctas[0]).toHaveAttribute("target", "_blank");
    expect(ctas[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("Pattern: four industries, six symptoms, close line", () => {
    const { container } = render(<Pattern dict={dict} />);
    expect(container.querySelector(".mst-grid-4")!.children).toHaveLength(4);
    const symptoms = container.querySelectorAll(".mst-grid-3");
    expect(symptoms).toHaveLength(2);
    expect(screen.getByText(dict.pattern.close)).toBeInTheDocument();
  });

  test("Thesis: three numbered items and close", () => {
    const { container } = render(<Thesis dict={dict} />);
    expect(container.querySelectorAll(".mst-cell-n")).toHaveLength(3);
    expect(screen.getByText(dict.thesis.close)).toBeInTheDocument();
  });

  test("Stack: three layers top-down 03→01, only Cortex carries the accent", () => {
    const { container } = render(<Stack dict={dict} />);
    const layers = container.querySelectorAll(".mst-layer");
    expect(layers).toHaveLength(3);
    expect(layers[0]).toHaveTextContent("Atlas Cortex");
    expect(layers[2]).toHaveTextContent("Atlas ONE");
    expect(container.querySelectorAll(".mst-layer-accent")).toHaveLength(1);
    expect(layers[0].querySelectorAll(".tag-accent")).toHaveLength(6);
    expect(layers[2].querySelectorAll(".tag-neutral")).toHaveLength(8);
  });
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/sections/__tests__/sections-1-4`
Expected: FAIL con `Cannot find module '../Hero'`.

- [ ] **Step 3: Crear `Hero.tsx`**

```tsx
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { HomeDict } from "../../../i18n/types";

export const Hero: React.FC<{ dict: HomeDict }> = ({ dict }) => (
  <section id="s01" className="mst-band" aria-labelledby="s01-title">
    <div className="mst-wrap">
      <p className="mst-kicker"><span className="mst-kicker-n">01</span> · Atlas Tech · MMXXVI</p>
      <h1 id="s01-title" className="mst-hero-title">{dict.hero.title}</h1>
      <p className="mst-lead">{dict.hero.lead}</p>
      <p className="mst-meta">{dict.hero.meta}</p>
      <a className="btn btn-primary" href={dict.hero.ctaHref} target="_blank" rel="noopener noreferrer">
        {dict.hero.cta} <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
    <hr className="hr mst-band-rule" />
  </section>
);
```

- [ ] **Step 4: Crear `Pattern.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Pattern: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { pattern } = dict;
  const rows = [pattern.symptoms.slice(0, 3), pattern.symptoms.slice(3, 6)];
  return (
    <Band n="02" kicker={pattern.kicker} title={pattern.title}>
      <Grid cols={4}>
        {pattern.industries.map((i) => <h3 key={i} className="mst-cell-title">{i}</h3>)}
      </Grid>
      <p className="mst-kicker" style={{ marginTop: "var(--space-8)" }}>{pattern.symptomsLabel}</p>
      {rows.map((row, r) => (
        <Grid key={r} cols={3}>
          {row.map((s) => <p key={s} className="mst-cell-body">{s}</p>)}
        </Grid>
      ))}
      <p className="mst-close">{pattern.close}</p>
    </Band>
  );
};
```

- [ ] **Step 5: Crear `Thesis.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Thesis: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { thesis } = dict;
  return (
    <Band n="03" kicker={thesis.kicker} title={thesis.title}>
      <Grid cols={3} as="ol">
        {thesis.items.map((it) => (
          <li key={it.n}>
            <span className="mst-cell-n">{it.n}</span>
            <h3 className="mst-cell-title">{it.title}</h3>
            <p className="mst-cell-body">{it.body}</p>
          </li>
        ))}
      </Grid>
      <p className="mst-close">{thesis.close}</p>
    </Band>
  );
};
```

- [ ] **Step 6: Crear `Stack.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { HomeDict } from "../../../i18n/types";

export const Stack: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { stack } = dict;
  return (
    <Band n="04" kicker={stack.kicker} title={stack.title}>
      <p className="mst-meta">{stack.lead}</p>
      <div>
        {stack.layers.map((layer) => (
          <div key={layer.n} className={`mst-layer ${layer.accent ? "mst-layer-accent" : ""}`.trim()}>
            <div>
              <span className="mst-cell-n">{layer.label}</span>
              <h3 className="mst-layer-name">{layer.name}</h3>
            </div>
            <ul className="mst-modules" aria-label={layer.name}>
              {layer.modules.map((m) => (
                <li key={m} className={`tag ${layer.accent ? "tag-accent" : "tag-neutral"}`}>{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  );
};
```

- [ ] **Step 7: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/sections/__tests__/sections-1-4`
Expected: 8 tests PASS.

- [ ] **Step 8: Commit**

```bash
cd atlasws && git add src/pages/home/sections && git commit -m "feat(home): secciones 01-04 Hero, Patrón, Tesis y Qué construimos

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 8: Secciones 05–06 (Production, Ladder)

**Files:**
- Create: `atlasws/src/pages/home/sections/Production.tsx`
- Create: `atlasws/src/pages/home/sections/Ladder.tsx`
- Create: `atlasws/src/pages/home/sections/__tests__/sections-5-6.test.tsx`

**Interfaces:**
- Consumes: `Band`, `Grid`, `StatRow` (Task 4); asset `/images/home/atlasone-metrics-crop.webp` (Task 6); `ArrowRight` de `lucide-react`.
- Produces: `Production`, `Ladder`: `React.FC<{ dict: HomeDict }>`.

- [ ] **Step 1: Escribir el test**

`atlasws/src/pages/home/sections/__tests__/sections-5-6.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Production } from "../Production";
import { Ladder } from "../Ladder";
import { es } from "../../../../i18n/es";
import { en } from "../../../../i18n/en";

describe.each([["es", es], ["en", en]])("sections 05-06 in %s", (_, dict) => {
  test("Production: grayscale figure, four figures, source with cutoff", () => {
    const { container } = render(<Production dict={dict} />);
    const fig = container.querySelector("figure.grayscale.mst-figure")!;
    expect(fig).toBeInTheDocument();
    expect(fig.querySelector("img")).toHaveAttribute("src", "/images/home/atlasone-metrics-crop.webp");
    expect(fig.querySelector("img")).toHaveAttribute("alt", dict.production.figureAlt);
    expect(container.querySelectorAll(".mst-stat-value")).toHaveLength(4);
    expect(screen.getByText(/09\.09\.2026/)).toBeInTheDocument();
  });

  test("Ladder: six ordered steps and close", () => {
    const { container } = render(<Ladder dict={dict} />);
    const ol = container.querySelector("ol.mst-grid-6")!;
    expect(ol.children).toHaveLength(6);
    expect(ol.children[0]).toHaveTextContent("01");
    expect(ol.children[5]).toHaveTextContent(dict.ladder.steps[5]);
    expect(screen.getByText(dict.ladder.close)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/sections/__tests__/sections-5-6`
Expected: FAIL con `Cannot find module '../Production'`.

- [ ] **Step 3: Crear `Production.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { StatRow } from "../../../components/mst/StatRow";
import { HomeDict } from "../../../i18n/types";

export const Production: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { production } = dict;
  return (
    <Band n="05" kicker={production.kicker} title={production.title}>
      <p className="mst-meta">{production.lead}</p>
      <figure className="grayscale mst-figure">
        <img
          src="/images/home/atlasone-metrics-crop.webp"
          alt={production.figureAlt}
          width={1230}
          height={260}
          loading="lazy"
        />
        <figcaption>{production.figureCaption}</figcaption>
      </figure>
      <StatRow stats={production.stats} source={production.source} />
    </Band>
  );
};
```

- [ ] **Step 4: Crear `Ladder.tsx`**

```tsx
import React from "react";
import { ArrowRight } from "lucide-react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Ladder: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { ladder } = dict;
  return (
    <Band n="06" kicker={ladder.kicker} title={ladder.title}>
      <p className="mst-lead">{ladder.lead}</p>
      <Grid cols={6} as="ol">
        {ladder.steps.map((step, i) => (
          <li key={step} className="mst-step">
            <span className="mst-cell-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="mst-step-label">{step}</span>
            {i < ladder.steps.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : null}
          </li>
        ))}
      </Grid>
      <p className="mst-close">{ladder.close}</p>
    </Band>
  );
};
```

- [ ] **Step 5: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/sections/__tests__/sections-5-6`
Expected: 4 tests PASS.

- [ ] **Step 6: Commit**

```bash
cd atlasws && git add src/pages/home/sections && git commit -m "feat(home): secciones 05-06 Producción real y De proyecto a plataforma

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 9: Secciones 07–09 (RecordToAction, Horizons, Builders)

**Files:**
- Create: `atlasws/src/pages/home/sections/RecordToAction.tsx`
- Create: `atlasws/src/pages/home/sections/Horizons.tsx`
- Create: `atlasws/src/pages/home/sections/Builders.tsx`
- Create: `atlasws/src/pages/home/sections/__tests__/sections-7-9.test.tsx`

**Interfaces:**
- Consumes: `Band` (con `bleed`), `Grid` (Task 4); asset `/images/home/founders-intarg-2017.webp` (Task 6).
- Produces: `RecordToAction`, `Horizons`, `Builders`: `React.FC<{ dict: HomeDict }>`.

- [ ] **Step 1: Escribir el test**

`atlasws/src/pages/home/sections/__tests__/sections-7-9.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { RecordToAction } from "../RecordToAction";
import { Horizons } from "../Horizons";
import { Builders } from "../Builders";
import { es } from "../../../../i18n/es";
import { en } from "../../../../i18n/en";

describe.each([["es", es], ["en", en]])("sections 07-09 in %s", (_, dict) => {
  test("RecordToAction: two confronted columns and a single full-bleed poster", () => {
    const { container } = render(<RecordToAction dict={dict} />);
    const cols = container.querySelector(".mst-grid-2")!;
    expect(cols.children).toHaveLength(2);
    expect(cols.children[1].querySelector(".mst-list-accent")).toBeInTheDocument();
    const poster = container.querySelectorAll(".mst-poster");
    expect(poster).toHaveLength(1);
    expect(poster[0]).toHaveTextContent("From system of record to system of action.");
    expect(poster[0].closest(".mst-wrap")).toBeNull();
  });

  test("Horizons: three cells with status tags, Labs dashed", () => {
    const { container } = render(<Horizons dict={dict} />);
    const cells = container.querySelector(".mst-grid-3")!.children;
    expect(cells).toHaveLength(3);
    expect(container.querySelectorAll(".mst-cell-status .tag")).toHaveLength(3);
    expect(cells[2]).toHaveClass("mst-dashed");
    expect(cells[0]).not.toHaveClass("mst-dashed");
  });

  test("Builders: grayscale photo, three people, awards line, close", () => {
    const { container } = render(<Builders dict={dict} />);
    const fig = container.querySelector("figure.grayscale")!;
    expect(fig.querySelector("img")).toHaveAttribute("src", "/images/home/founders-intarg-2017.webp");
    expect(container.querySelectorAll(".mst-person-name")).toHaveLength(3);
    expect(screen.getByText(dict.builders.awards)).toBeInTheDocument();
    expect(screen.getByText(dict.builders.close)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/sections/__tests__/sections-7-9`
Expected: FAIL con `Cannot find module '../RecordToAction'`.

- [ ] **Step 3: Crear `RecordToAction.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const RecordToAction: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { record } = dict;
  const poster = (
    <div className="mst-poster">
      <div className="mst-wrap">
        <p lang="en">{record.poster}</p>
      </div>
    </div>
  );
  return (
    <Band n="07" kicker={record.kicker} title={record.title} bleed={poster} className="mst-band-poster">
      <Grid cols={2}>
        <div>
          <span className="mst-cell-n">{record.left.label}</span>
          <h3 className="mst-cell-title">{record.left.title}</h3>
          <ul className="mst-list">{record.left.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
        <div>
          <span className="mst-cell-n">{record.right.label}</span>
          <h3 className="mst-cell-title" style={{ color: "var(--color-accent-700)" }}>{record.right.title}</h3>
          <ul className="mst-list mst-list-accent">{record.right.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </Grid>
    </Band>
  );
};
```

- [ ] **Step 4: Crear `Horizons.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Horizons: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { horizons } = dict;
  return (
    <Band n="08" kicker={horizons.kicker} title={horizons.title}>
      <Grid cols={3}>
        {horizons.items.map((h) => (
          <div key={h.name} className={h.dashed ? "mst-dashed" : undefined}>
            <span className="mst-cell-n">{h.label}</span>
            <h3 className="mst-cell-title">{h.name}</h3>
            <p className="mst-meta" style={{ marginBottom: "var(--space-2)" }}>{h.sub}</p>
            <p className="mst-cell-body">{h.body}</p>
            <p className="mst-cell-status"><span className="tag tag-neutral">{h.status}</span></p>
          </div>
        ))}
      </Grid>
    </Band>
  );
};
```

- [ ] **Step 5: Crear `Builders.tsx`**

```tsx
import React from "react";
import { Band } from "../../../components/mst/Band";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";

export const Builders: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { builders } = dict;
  return (
    <Band n="09" kicker={builders.kicker} title={builders.title}>
      <figure className="grayscale mst-figure">
        <img
          src="/images/home/founders-intarg-2017.webp"
          alt={builders.photoAlt}
          width={1600}
          height={1600}
          loading="lazy"
          style={{ aspectRatio: "16 / 7", objectFit: "cover", objectPosition: "50% 45%" }}
        />
        <figcaption>{builders.photoCaption}</figcaption>
      </figure>
      <Grid cols={3}>
        {builders.people.map((p) => (
          <div key={p.name}>
            <h3 className="mst-person-name">{p.name}</h3>
            <p className="mst-person-areas">{p.areas}</p>
          </div>
        ))}
      </Grid>
      <p className="mst-awards">{builders.awards}</p>
      <p className="mst-close">{builders.close}</p>
    </Band>
  );
};
```

- [ ] **Step 6: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/sections/__tests__/sections-7-9`
Expected: 6 tests PASS.

- [ ] **Step 7: Commit**

```bash
cd atlasws && git add src/pages/home/sections && git commit -m "feat(home): secciones 07-09 con poster rojo, horizontes y Built by builders

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 10: Contacto funcional — formulario React y endpoint PHP

**Files:**
- Create: `atlasws/src/pages/home/ContactForm.tsx`
- Create: `atlasws/src/pages/home/sections/Contact.tsx`
- Create: `atlasws/src/pages/home/__tests__/ContactForm.test.tsx`
- Create: `atlasws/public/api/contact.php`

**Interfaces:**
- Produces: `ContactForm: React.FC<{ dict: HomeDict; endpoint?: string }>` (default `"/api/contact.php"`); `Contact: React.FC<{ dict: HomeDict }>`.
- Contrato HTTP: `POST /api/contact.php` con JSON `{ name, email, org, message, website }` → `200 { ok: true }` o `4xx/5xx { ok: false, error }`. `website` es el honeypot y debe ir vacío.

- [ ] **Step 1: Escribir el test**

`atlasws/src/pages/home/__tests__/ContactForm.test.tsx`:

```tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";
import { es } from "../../../i18n/es";

const fill = async () => {
  await userEvent.type(screen.getByLabelText("Nombre"), "Ana");
  await userEvent.type(screen.getByLabelText("Correo"), "ana@ejemplo.mx");
  await userEvent.type(screen.getByLabelText("Mensaje"), "Queremos operar con agentes.");
};

afterEach(() => { delete (global as any).fetch; });

test("posts JSON to the endpoint and shows the sent state", async () => {
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
  (global as any).fetch = fetchMock;
  render(<ContactForm dict={es} />);
  await fill();
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  await waitFor(() => expect(screen.getByText(es.contact.sent)).toBeInTheDocument());
  expect(fetchMock).toHaveBeenCalledWith("/api/contact.php", expect.objectContaining({ method: "POST" }));
  const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
  expect(body).toMatchObject({ name: "Ana", email: "ana@ejemplo.mx", website: "" });
});

test("shows the error state with direct fallbacks when the request fails", async () => {
  (global as any).fetch = jest.fn().mockRejectedValue(new Error("network"));
  render(<ContactForm dict={es} />);
  await fill();
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  await waitFor(() => expect(screen.getByText(es.contact.error)).toBeInTheDocument());
  expect(screen.getByRole("link", { name: "hola@atlastech.mx" })).toHaveAttribute("href", "mailto:hola@atlastech.mx");
  expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", "https://wa.me/527221495215");
});

test("treats a non-ok HTTP response as an error", async () => {
  (global as any).fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ ok: false, error: "invalid" }) });
  render(<ContactForm dict={es} />);
  await fill();
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  await waitFor(() => expect(screen.getByText(es.contact.error)).toBeInTheDocument());
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/__tests__/ContactForm`
Expected: FAIL con `Cannot find module '../ContactForm'`.

- [ ] **Step 3: Crear `ContactForm.tsx`**

```tsx
import React, { useState } from "react";
import { HomeDict } from "../../i18n/types";

type Status = "idle" | "sending" | "sent" | "error";

interface Props { dict: HomeDict; endpoint?: string }

export const ContactForm: React.FC<Props> = ({ dict, endpoint = "/api/contact.php" }) => {
  const { contact } = dict;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "", website: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error("send failed");
      setStatus("sent");
      setForm({ name: "", email: "", org: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="mst-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="c-name">{contact.fields.name}</label>
        <input id="c-name" name="name" className="input" value={form.name} onChange={onChange} required minLength={2} maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="c-email">{contact.fields.email}</label>
        <input id="c-email" name="email" type="email" className="input" value={form.email} onChange={onChange} required maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="c-org">{contact.fields.org}</label>
        <input id="c-org" name="org" className="input" value={form.org} onChange={onChange} maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="c-message">{contact.fields.message}</label>
        <textarea id="c-message" name="message" className="input" value={form.message} onChange={onChange} required minLength={10} maxLength={4000} />
      </div>
      <div className="mst-hp" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? contact.sending : contact.submit}
      </button>
      {status === "sent" ? <p className="mst-form-status" role="status">{contact.sent}</p> : null}
      {status === "error" ? (
        <p className="mst-form-status mst-form-status-error" role="alert">
          {contact.error}{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          {" · "}
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsappLabel}</a>
        </p>
      ) : null}
    </form>
  );
};
```

- [ ] **Step 4: Crear `sections/Contact.tsx`**

```tsx
import React from "react";
import { Grid } from "../../../components/mst/Grid";
import { HomeDict } from "../../../i18n/types";
import { ContactForm } from "../ContactForm";

export const Contact: React.FC<{ dict: HomeDict }> = ({ dict }) => {
  const { contact } = dict;
  return (
    <section id="contacto" className="mst-band" aria-labelledby="contacto-title">
      <div className="mst-wrap">
        <p className="mst-kicker">{contact.kicker}</p>
        <h2 id="contacto-title" className="mst-display">{contact.title}</h2>
        <Grid cols={2}>
          <div>
            <p className="mst-lead">{contact.lead}</p>
            <ContactForm dict={dict} />
          </div>
          <dl className="mst-contact-side">
            <dt>{contact.sideEmail}</dt>
            <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            <dt>{contact.sideWhatsapp}</dt>
            <dd><a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">{contact.whatsappLabel}</a></dd>
            <dt>{contact.sideBase}</dt>
            <dd>{contact.base}</dd>
          </dl>
        </Grid>
      </div>
    </section>
  );
};
```

- [ ] **Step 5: Crear `public/api/contact.php`**

```php
<?php
/**
 * Atlas Tech — endpoint de contacto.
 * POST JSON { name, email, org, message, website } → { ok: true } | { ok: false, error }.
 * `website` es un honeypot: si llega con contenido, se responde ok sin enviar nada.
 * Se sirve tal cual desde public/ → build/api/contact.php en Hostinger (Apache + PHP).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const TO      = 'hola@atlastech.mx';
const MAX_LEN = 10240;

function respond(int $code, array $body): void {
  http_response_code($code);
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false, 'error' => 'method']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_LEN + 1);
if ($raw === false || strlen($raw) > MAX_LEN) {
  respond(413, ['ok' => false, 'error' => 'too_large']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
  respond(400, ['ok' => false, 'error' => 'json']);
}

$clean = static function ($v, int $max): string {
  $s = is_string($v) ? trim($v) : '';
  $s = preg_replace('/[\r\n]+/', ' ', $s) ?? '';
  return mb_substr($s, 0, $max);
};

$honeypot = $clean($data['website'] ?? '', 200);
if ($honeypot !== '') {
  respond(200, ['ok' => true]);
}

$name    = $clean($data['name'] ?? '', 120);
$email   = $clean($data['email'] ?? '', 160);
$org     = $clean($data['org'] ?? '', 120);
$message = is_string($data['message'] ?? null) ? trim($data['message']) : '';
$message = mb_substr($message, 0, 4000);

if (mb_strlen($name) < 2)                                { respond(422, ['ok' => false, 'error' => 'name']); }
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) { respond(422, ['ok' => false, 'error' => 'email']); }
if (mb_strlen($message) < 10)                            { respond(422, ['ok' => false, 'error' => 'message']); }

$subject = '=?UTF-8?B?' . base64_encode("Contacto atlastech.mx · {$name}") . '?=';
$body    = "Nombre: {$name}\nCorreo: {$email}\nOrganización: {$org}\n\n{$message}\n";
$headers = implode("\r\n", [
  'From: Atlas Tech <no-reply@atlastech.mx>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(TO, $subject, $body, $headers);
if (!$sent) {
  respond(502, ['ok' => false, 'error' => 'mail']);
}

respond(200, ['ok' => true]);
```

- [ ] **Step 6: Verificar sintaxis PHP si hay intérprete; si no, revisión manual**

Run: `which php && php -l atlasws/public/api/contact.php || echo "sin php local: revisar a mano llaves, punto y coma y constantes"`
Expected: `No syntax errors` o el mensaje de revisión manual. En la máquina de desarrollo actual no hay PHP: el endpoint se valida en Hostinger después del deploy (Task 12, checklist).

- [ ] **Step 7: Correr los tests y verificar que pasan**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/__tests__/ContactForm`
Expected: 3 tests PASS.

- [ ] **Step 8: Commit**

```bash
cd atlasws && git add src/pages/home/ContactForm.tsx src/pages/home/sections/Contact.tsx src/pages/home/__tests__ public/api/contact.php && git commit -m "feat(contact): formulario Modernist con estados y endpoint PHP con honeypot

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 11: `HomePage`, rutas `/` y `/en`, atributo de tema

**Files:**
- Create: `atlasws/src/pages/home/HomePage.tsx`
- Create: `atlasws/src/pages/home/__tests__/HomePage.test.tsx`
- Modify: `atlasws/src/main-component/router/index.tsx`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: `HomePage: React.FC<{ lang: Lang }>`; rutas `/`, `/home` → `lang="es"`, `/en` → `lang="en"`.

- [ ] **Step 1: Escribir el test**

`atlasws/src/pages/home/__tests__/HomePage.test.tsx`:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "../HomePage";
import { es } from "../../../i18n/es";
import { en } from "../../../i18n/en";

const mount = (lang: "es" | "en") =>
  render(<MemoryRouter initialEntries={[lang === "en" ? "/en" : "/"]}><HomePage lang={lang} /></MemoryRouter>);

test("renders the nine bands plus contact inside .mst, in order", () => {
  const { container } = mount("es");
  const ids = Array.from(container.querySelectorAll("section")).map((s) => s.id);
  expect(ids).toEqual(["s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "contacto"]);
  expect(container.querySelector(".mst")).toBeInTheDocument();
  expect(container.querySelectorAll("hr.hr").length).toBeGreaterThanOrEqual(9);
});

test("marks the document theme while mounted and clears it on unmount", () => {
  const { unmount } = mount("es");
  expect(document.documentElement.dataset.theme).toBe("modernist");
  unmount();
  expect(document.documentElement.dataset.theme).toBeUndefined();
});

test("uses the English dictionary on /en", () => {
  mount("en");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(en.hero.title);
});

test("accent poster appears exactly once and every photo is grayscale", () => {
  const { container } = mount("es");
  expect(container.querySelectorAll(".mst-poster")).toHaveLength(1);
  container.querySelectorAll("img").forEach((img) => {
    if (img.closest("svg")) return;
    expect(img.closest(".grayscale")).not.toBeNull();
  });
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(es.hero.title);
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false src/pages/home/__tests__/HomePage`
Expected: FAIL con `Cannot find module '../HomePage'`.

- [ ] **Step 3: Crear `HomePage.tsx`**

```tsx
import React, { useEffect } from "react";
import { Lang } from "../../i18n/types";
import { dictFor } from "../../i18n/useLang";
import { MstHeader } from "../../components/mst/MstHeader";
import { MstFooter } from "../../components/mst/MstFooter";
import { Hero } from "./sections/Hero";
import { Pattern } from "./sections/Pattern";
import { Thesis } from "./sections/Thesis";
import { Stack } from "./sections/Stack";
import { Production } from "./sections/Production";
import { Ladder } from "./sections/Ladder";
import { RecordToAction } from "./sections/RecordToAction";
import { Horizons } from "./sections/Horizons";
import { Builders } from "./sections/Builders";
import { Contact } from "./sections/Contact";

interface Props { lang: Lang }

export const HomePage: React.FC<Props> = ({ lang }) => {
  const dict = dictFor(lang);

  useEffect(() => {
    document.documentElement.dataset.theme = "modernist";
    return () => { delete document.documentElement.dataset.theme; };
  }, []);

  return (
    <div className="mst">
      <MstHeader dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <Pattern dict={dict} />
        <Thesis dict={dict} />
        <Stack dict={dict} />
        <Production dict={dict} />
        <Ladder dict={dict} />
        <RecordToAction dict={dict} />
        <Horizons dict={dict} />
        <Builders dict={dict} />
        <Contact dict={dict} />
      </main>
      <MstFooter dict={dict} />
    </div>
  );
};

export default HomePage;
```

- [ ] **Step 4: Actualizar el router**

En `atlasws/src/main-component/router/index.tsx`:

Sustituir `import Homepage from "../HomePage";` por:

```ts
import { HomePage } from "../../pages/home/HomePage";
```

Sustituir las dos rutas del Home por:

```tsx
          {/* Home Modernist (ES / EN) */}
          <Route path="/" element={<HomePage lang="es" />} />
          <Route path="/home" element={<HomePage lang="es" />} />
          <Route path="/en" element={<HomePage lang="en" />} />
```

- [ ] **Step 5: Correr toda la suite**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false`
Expected: todos los tests PASS (≈40).

- [ ] **Step 6: Verificar compilación TypeScript**

Run: `cd atlasws && npx tsc --noEmit -p tsconfig.json`
Expected: sin errores.

- [ ] **Step 7: Commit**

```bash
cd atlasws && git add src/pages/home/HomePage.tsx src/pages/home/__tests__/HomePage.test.tsx src/main-component/router/index.tsx && git commit -m "feat(home): página Modernist montada en / y /en con tema aislado

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

---

### Task 12: Build de producción, verificación visual y documentación

**Files:**
- Modify: `README.md` (raíz) — sección nueva "Home Modernist"
- Modify: `contex/README.md` — fila para `atlas startup/`

**Interfaces:** ninguna nueva.

- [ ] **Step 1: Build completo con SEO**

Run: `cd atlasws && CI=false npm run build 2>&1 | tail -20`
Expected: `Compiled successfully` (o warnings sin errores), seguido de `✅ SEO: N rutas con meta inyectada`. Verificar:

```bash
ls atlasws/build/en/index.html atlasws/build/api/contact.php atlasws/build/images/home/
grep -c 'hreflang' atlasws/build/index.html atlasws/build/en/index.html
grep -o '<html lang="[a-z]*"' atlasws/build/en/index.html
grep '/en</loc>' atlasws/build/sitemap.xml
```

Expected: los tres archivos existen; cada `index.html` tiene 3 hreflang; `/en/index.html` lleva `lang="en"`; el sitemap incluye `/en`.

- [ ] **Step 2: Servir el build y revisar en navegador**

Run (en background): `cd atlasws && npx serve -s build -l 5050`
Abrir `http://localhost:5050/` y `http://localhost:5050/en`. Si hay Playwright o Chrome disponible para el agente, tomar capturas a 1440px y 390px de ancho de las nueve secciones; si no, revisar a mano. Checklist:

- [ ] Fondo `#f3f2f2`, tipografía Archivo, sin restos del template (sin fondo oscuro, sin cursor custom, sin preloader).
- [ ] Todo flush left. Ninguna esquina redondeada. Reglas de 2px entre las nueve bandas.
- [ ] Rojo solo en: CTA del hero, cuatro cifras de 05, poster de 07.
- [ ] Captura de 05 en blanco y negro y sin "Tenants", "MRR" ni gráfica.
- [ ] Foto de 09 en blanco y negro.
- [ ] Toggle ES/EN cambia la URL entre `/` y `/en` y el copy completo.
- [ ] Header sticky con enlaces a `/about`, `/service`, `/proyectos`, `/contact` funcionando.
- [ ] Móvil 390px: sin scroll horizontal, grids colapsan, menú `<details>` abre y cierra.
- [ ] Al navegar del Home a `/proyectos` y volver, el body vuelve a claro y luego a oscuro (atributo `data-theme` se pone y se quita).
- [ ] Formulario: al enviar sin PHP local aparece el estado de error con `mailto` y WhatsApp.

Corregir en CSS/componentes lo que falle, re-correr la suite, y commitear como `fix(home): …`.

- [ ] **Step 3: Documentar en el README raíz**

Añadir al final de la sección "📁 Estructura del Proyecto" del `README.md` raíz:

```markdown
### Home Modernist (`/` y `/en`)

El Home se construye con el sistema visual **Modernist** (fondo claro `#f3f2f2`, tinta `#201e1d`,
acento rojo `#ec3013`, Archivo, cero radio, reglas de 2px). Vive en:

- `src/modernist/modernist.css` — tokens y clases del sistema con scope `.mst`.
- `src/modernist/home.css` — layout del Home.
- `src/i18n/` — copy ES/EN tipado (`es.ts`, `en.ts`) y `useLang`.
- `src/pages/home/` — `HomePage.tsx`, una sección por archivo en `sections/`, `ContactForm.tsx`.
- `src/components/mst/` — `Band`, `Grid`, `StatRow`, `MstHeader`, `MstFooter`, `AtlasMark`.
- `public/api/contact.php` — endpoint de correo (Hostinger PHP) a `hola@atlastech.mx`.
- `scripts/prepare-home-images.cjs` — regenera `public/images/home/` desde `contex/atlas startup/assets`.

Reglas de contenido: toda cifra publicada lleva fuente, periodo y fecha de corte. Fotos siempre en `.grayscale`.
El rojo solo aparece en el CTA del hero, las cifras de la sección 05 y el poster de la sección 07.
Spec: `docs/superpowers/specs/2026-09-09-home-modernist-design.md`.
```

- [ ] **Step 4: Documentar `contex/atlas startup/` en `contex/README.md`**

Añadir esta fila a la tabla "Contenido":

```markdown
| `atlas startup/` | Decks canónicos (`Atlas Tech Startup Story v3.dc.html`), assets y el bundle del sistema Modernist (`_ds/`) | Home (`/`, `/en`) |
```

- [ ] **Step 5: Suite completa y commit final**

Run: `cd atlasws && CI=true npx react-scripts test --watchAll=false && npx tsc --noEmit -p tsconfig.json`
Expected: PASS, sin errores TS.

```bash
git add README.md contex/README.md && git commit -m "docs: Home Modernist en README raíz y contex

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_012u7ZgvN9xDg8m8hR6XdsPs"
```

- [ ] **Step 6: Checklist post-deploy (para el equipo, no bloquea la rama)**

- [ ] Subir `atlasws/build/` a `public_html` de Hostinger.
- [ ] Abrir `https://atlastech.mx/en` directo (sin 404).
- [ ] Enviar el formulario real y confirmar que llega a `hola@atlastech.mx` con `Reply-To` correcto. Si `mail()` falla en el plan, cambiar a SMTP de Hostinger (PHPMailer) en `contact.php`.
- [ ] Validar hreflang en Google Search Console tras reenviar `sitemap.xml`.
