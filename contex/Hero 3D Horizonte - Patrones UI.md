# Atlas Tech — Patrones de UI Premium: Hero 3D Horizonte

## Descripción General

Este skill documenta los patrones de UI utilizados en la sección Hero de Atlas Tech. Incluye un globo 3D interactivo construido con Three.js, efectos de glassmorphism acrílico, animaciones CSS de entrada y la paleta de colores "Deep Violet & Neon".

---

## 1. Paleta de Colores Deep Violet & Neon

```css
/* Variables globales recomendadas */
:root {
  --color-primary:   #9333ea;   /* Violeta principal */
  --color-secondary: #a855f7;   /* Violeta claro / acento */
  --color-accent-a:  #6366f1;   /* Índigo (para Three.js globe) */
  --color-bg-dark:   #020617;   /* Azul espacial profundo */
  --color-bg-mid:    #0f172a;   /* Azul marino medio */
  --color-bg-violet: #110b29;   /* Violeta oscuro */
}
```

---

## 2. Clases CSS Reutilizables (agregar a main.css)

```css
/* Glassmorphism / Acrílico */
.atlas-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Textura de grano premium (noise overlay) */
.atlas-noise {
  position: absolute; inset: 0; z-index: 12; pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  mix-blend-mode: overlay;
}

/* Animaciones de entrada */
.atlas-reveal { opacity: 0; transform: translateY(16px); animation: atlasReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.atlas-delay-1 { animation-delay: 0.18s; }
.atlas-delay-2 { animation-delay: 0.36s; }
@keyframes atlasReveal { to { opacity: 1; transform: translateY(0); } }

/* Contenedor de pantalla completa (stage) */
.atlas-stage { position: relative; width: 100%; min-height: 100vh; overflow: hidden; background: #020617; }

/* Badge de status animado (ping) */
@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}
```

---

## 3. Componente NetworkGlobe (Three.js — TypeScript)

**Archivo:** `src/components/hero/NetworkGlobe.tsx`

### Props

| Prop          | Tipo   | Default     | Descripción                         |
|---------------|--------|-------------|-------------------------------------|
| `accentA`     | string | `#6366f1`   | Color primario del globo            |
| `accentB`     | string | `#a855f7`   | Color secundario / atmósfera        |
| `intensity`   | number | `1.0`       | Brillo general del globo            |
| `starDensity` | number | `2000`      | Cantidad de estrellas de fondo      |
| `pointDensity`| number | `1.0`       | Densidad de puntos de red del globo |

### Características Técnicas

- **Distribución Fibonacci** de 1400 puntos en la superficie de la esfera
- **Shader Fresnel** para el efecto de atmósfera brillante en los bordes
- **Arcos bezier** entre los hubs/nodos destacados del globo
- **Campo estelar** de 2000 estrellas con colores primario, secundario y blanco
- **Interactividad con el mouse** — el globo sigue sutilmente el movimiento
- **Optimización de rendimiento** — pausa la animación cuando la pestaña está oculta
- **Cleanup completo** en el `useEffect` return — evita memory leaks

### Uso

```tsx
import NetworkGlobe from './NetworkGlobe';

// Uso básico con paleta Deep Violet
<NetworkGlobe accentA="#9333ea" accentB="#a855f7" />

// Uso con mayor densidad y brillo
<NetworkGlobe accentA="#9333ea" accentB="#a855f7" intensity={1.2} starDensity={3000} pointDensity={1.5} />
```

---

## 4. Layout: Hero con Sticky 3D Background + Sección Acrílica

### Estructura JSX

```tsx
<section style={{ background: '#020617', overflow: 'visible' }}>

  {/* --- Capa de Fondo Sticky (3D permanece al hacer scroll) --- */}
  <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
    <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
      {/* Gradiente de base */}
      <div style={{ background: 'radial-gradient(ellipse at 50% 30%, #0f172a 0%, #020617 70%)', position: 'absolute', inset: 0 }} />
      
      {/* El Globo 3D */}
      <NetworkGlobe accentA="#9333ea" accentB="#a855f7" />
      
      {/* Ruido / grano */}
      <div className="atlas-noise" />
      
      {/* Brillo del horizonte */}
      <div style={{
        position: 'absolute', bottom: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: '130%', height: '55%',
        background: 'radial-gradient(ellipse at center, rgba(147,51,234,0.2) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none'
      }} />
    </div>
  </div>

  {/* --- Capa de Contenido (encima del globo) --- */}
  <div style={{ position: 'relative', zIndex: 1 }}>

    {/* Bloque 1: Texto hero (pantalla completa, transparente) */}
    <div className="atlas-stage" style={{ background: 'transparent' }}>
      <div style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {/* Badge, H1, párrafo, botones... */}
      </div>
    </div>

    {/* Bloque 2: Contenido original CON capa de vidrio acrílica */}
    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
      <div className="atlas-glass rounded-4 p-5">
        {/* Texto secundario — se ve el globo a través del cristal */}
      </div>
    </div>

  </div>
</section>
```

### Principios Clave del Efecto

1. **`position: sticky`** en el contenedor del globo hace que el canvas se "quede" al tope mientras el resto de contenido pasa por encima.
2. **`position: absolute; height: 100%; z-index: 0`** en el wrapper hace que el globo ocupe exactamente el alto total de la sección padre.
3. **`overflow: visible`** en el `<section>` es crítico — sin esto, el sticky no funciona.
4. **Eliminar `.o-clip` / `overflow: hidden`** del wrapper global (`body_wrap`) para que sticky no se rompa.
5. **`.atlas-glass`** con `backdrop-filter: blur(20px)` crea el efecto acrílico translúcido que muestra el globo detrás.

---

## 5. Badge de Status Animado

```tsx
<div className="d-inline-flex align-items-center atlas-glass px-3 py-2 rounded-pill" style={{ gap: '0.5rem' }}>
  <span style={{ position: 'relative', display: 'flex', width: '6px', height: '6px' }}>
    <span style={{
      position: 'absolute', width: '100%', height: '100%',
      borderRadius: '50%', background: '#9333ea', opacity: 0.75,
      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
    }} />
    <span style={{ position: 'relative', borderRadius: '50%', width: '100%', height: '100%', background: '#9333ea' }} />
  </span>
  <span style={{ fontSize: '10px', letterSpacing: '0.2em', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>
    Atlas Tech · Global Network
  </span>
</div>
```

---

## 6. Título Gradiente (texto transparente con gradiente)

```tsx
<h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em', lineHeight: 0.98, maxWidth: '800px', color: 'white', fontWeight: 800 }}>
  Sosteniendo el<br />
  <span style={{
    backgroundImage: 'linear-gradient(110deg, #ffffff 0%, #9333ea 55%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}>
    Mundo Digital.
  </span>
</h1>
```

---

## 7. Dependencias Necesarias

```bash
npm install three@0.128.0 @types/three@0.128.0
```

> ⚠️ **Importante:** Usar versión `0.128.0` de Three.js. Versiones más nuevas de `@types/three` usan syntax TypeScript no compatible con TypeScript `4.x`.
