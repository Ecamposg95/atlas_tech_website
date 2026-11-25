# Visión y arquitectura de producto en el sitio — diseño

Fecha: 25.11.2026 · Fuente: documento fundacional "The Road to Synthetic Organizations" v1.0 (nov. 2026) y skill `atlas-tech-brand` (Atlas Horizon).

## Decisiones de los founders (25.11.2026)

1. **El hero del Home se queda comercial** ("Consultoría que no entrega un PDF. Entrega ejecución."). La tesis de largo plazo vive en una página nueva, `/vision`.
2. **Los mensajes del documento se traducen al español.** Se mantiene la regla del skill: todo en español salvo nombres de producto y plan.
3. **Productos:** Atlas Core, Atlas Solutions y Harvestt siguen existiendo.
   - **Atlas Core es, en esencia, Atlas ONE:** el núcleo API-first (en los repos y en `atlas-brain` se llama Atlas BOS) sobre el que se activan módulos y presets. Cada otro software de Atlas es un módulo sobre ese núcleo.
   - **Atlas Solutions** es la ingeniería aplicada a la medida (DASIC, RMAZH y similares).
   - **Harvestt** es la línea experimental de inteligencia ciberfísica.

## Mapa de producto (según los repos, 25.11.2026)

| Pieza | Repo | Papel | Estado en el sitio |
|---|---|---|---|
| Atlas Core (Atlas BOS) | `atlas-one` | Núcleo: usuarios y roles, productos, inventario, ventas, caja, datos | Validado |
| Atlas ONE | `atlas-one` | Producto comercial sobre el núcleo; presets por giro | Validado |
| Atlas Financials | `Atlas-ONE-Financials` | Módulo de finanzas y contabilidad (partida doble) | MVP |
| Atlas Booking | `Atlas-Booking` | Módulo de reservas y agenda | MVP |
| Print Agent | `Atlas-Print-Agent` | Impresión de tickets y etiquetas; en producción | Validado |
| Atlas Cortex | `atlas-cortex`, `cortex-sim` | Capa agéntica sobre ONE u otros sistemas | MVP |
| Atlas Solutions | `dasic-atlas-api`, `Atlas-Rmazh`, `atlas-flowops-optimization-core` | Implementaciones a la medida sobre el núcleo | Sin nombres de cliente nuevos |
| Harvestt | `harvestt` | Inteligencia ciberfísica, experimental | Ya tiene página |

Fuera del sitio por ahora: HRFlow (producto de un cliente), Open Cashback como módulo (ya está en el portafolio como proyecto) y Atlas Kapital (tesis).

## Traducción de los mensajes

| Original | En el sitio |
|---|---|
| Engineering the future of organizations. | Ingeniería para el futuro de las organizaciones. |
| From agentic systems to cognitive infrastructures. | De los sistemas agénticos a la infraestructura cognitiva. |
| Pioneering Synthetic Organizations. | De agentes a organizaciones sintéticas. (sin "pioneros": el skill evita superlativos sin prueba) |
| We build for today. We research for tomorrow. | Construimos para hoy. Investigamos para mañana. |

## Cambios

- **`/vision` (nueva):** declaración en cuatro tiempos con su tag de estado, manifiesto, definición de organización sintética y sus principios, lo que no buscamos, los tres horizontes (bootstrapping), hoja de ruta 2026–2040 marcada como escenarios y la agenda de investigación de Atlas Labs. En la navegación como "Visión".
- **Home:** el moonshot pasa a "organizaciones sintéticas" y enlaza a `/vision`. "Qué construimos" pasa a las cuatro familias del documento, cada una con su tag de estado (antes eran tres pilares sin estado).
- **Atlas ONE:** sección "Atlas Core": el núcleo y los módulos que se activan sobre él.
- **Portafolio:** menciona Atlas Solutions; Harvestt se describe como inteligencia ciberfísica.
- **Pie:** el texto de marca usa el lema traducido.

## Lo que no se publica (sección 27 del documento)

Project Genesis, SOMM, OCGR y la métrica VAO hasta que se validen. Las referencias académicas no se citan hasta verificarlas. Ninguna cifra nueva.

## Pendiente

- Actualizar el skill `atlas-tech-brand` (sección 11): Atlas Core = núcleo de Atlas ONE, Atlas Solutions, Harvestt y el lema. El skill se sincroniza desde claude.ai; se edita allá.
- Confirmar teléfono y correo públicos (el skill dice 722 142 5755 y ecamposg@; el sitio usa 722 149 5215 por WhatsApp y hola@).
