# `contex/` — Documentación, briefs y prototipos de referencia

Material de contexto y diseño que alimenta el sitio de Atlas Tech.
No se compila ni se despliega: es referencia para construir y evolucionar las páginas.
Para la documentación técnica del proyecto, ver el [README raíz](../README.md).

## Contenido

| Archivo / carpeta | Qué es | Página / uso en el sitio |
|---|---|---|
| `INFORME-estado-2026-11.md` | **Informe vigente**: Atlas Cortex al frente, visión y arquitectura de producto, identidad Atlas Horizon, mapa del sitio y pendientes | Todo el proyecto |
| `INFORME-estado-2026-06.md` | Informe anterior (junio 2026, sitio "venture studio"). Histórico | Todo el proyecto |
| `Atlas Tech *.png`, `ATLAS Tech *.png` | Imágenes de marca Atlas Horizon (5 variantes). "on the Ember Horizon" es la portada del Home | Home (portada) · `public/images/hero/` |
| `open_cashback_master_brief.md` | Brief técnico maestro de Open Cashback (ledger, blockchain, MVP, API) | `/proyectos/open-cashback` |
| `sigma.mb` | Contexto de la división **Atlas GovTech** y el producto **SIGMA** | `/proyectos/sigma` |
| `harvestt_fotos_prompt_maestro.mb` | Prompt maestro para generar las fotos de Harvestt (estética SpaceX) | `/proyectos/harvestt` |
| `ATLAS ONE/` | Referencias de UI/diseño de Atlas One | `/atlas-one` + `AtlasOneDemos` |
| `harvestt2026/` | Referencias visuales de Harvestt 2026 | `/proyectos/harvestt` |
| `Atlas Hero - Horizonte.html` | Prototipo HTML del hero 3D | Histórico (el hero 3D se retiró en nov 2026) |
| `Hero 3D Horizonte - Patrones UI.md` | Guía de patrones UI del hero | Histórico |

## Convención de extensiones

Mezcla de `.md` y `.mb` por histórico del proyecto; ambos son Markdown. Para archivos
nuevos se prefiere `.md` (GitHub los renderiza).

## Estado del producto (nov 2026)

**Atlas Cortex** (consultoría como servicio, `MVP`) es el producto principal. **Atlas ONE** (`Validado`)
tiene página propia y se construye sobre **Atlas Core**. **Atlas Solutions** (`Validado`) agrupa las
implementaciones a la medida. **Harvestt**, **SIGMA** y **Open Cashback** forman el portafolio, y la tesis
de largo plazo vive en `/vision`. Identidad **Atlas Horizon**: negro, luz ember con contraluz índigo y
tipografía ligera.

Detalle en `INFORME-estado-2026-11.md`; diseños y plan en `docs/superpowers/`. Para leer todo con formato:
`python3 -m http.server 4100` desde la raíz y abrir `http://localhost:4100/docs/`.
