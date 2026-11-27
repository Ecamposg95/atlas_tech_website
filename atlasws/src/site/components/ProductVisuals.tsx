import React from "react";
import { useDemo, useInView } from "../lib/motion";
import "./product-visuals.css";

// Ilustraciones de producto dibujadas en código, con las etiquetas reales de cada interfaz.
// No muestran importes ni lecturas: donde iría un dato hay una barra neutra, para no
// presentar cifras inventadas como si fueran reales.

const Bar: React.FC<{ w: number; strong?: boolean }> = ({ w, strong }) => (
  <i className={"pv-bar" + (strong ? " pv-bar--strong" : "")} style={{ width: `${w}%` }} />
);

/* ---------- Atlas ONE: Cobrar (punto de venta) ---------- */
const SORT = ["Más vendidos", "A-Z", "Precio ↑"];
const TILES = [62, 48, 70, 54, 66, 44];
const LINES = [58, 72, 46];
const PAY = [
  { name: "Efectivo", mod: "efectivo" },
  { name: "Tarjeta", mod: "tarjeta" },
  { name: "Transfer.", mod: "transfer" },
  { name: "Mixto", mod: "mixto" },
];

// Guion: 0 carrito vacío · 1-3 se agregan productos · 4 se elige la forma de pago · 5 cobrado.
const POS_TIMES = [900, 800, 800, 1500, 800, 1700];
const POS_REST = 3;

export const PosMock: React.FC = () => {
  const [ref, inView] = useInView<HTMLElement>(0.35);
  const step = useDemo(POS_TIMES, POS_REST, inView);
  const count = Math.min(step, 3); // productos en el carrito
  const paid = step === 5;
  return (
    <figure className="pos" data-testid="one-pos" ref={ref}>
      <div
        className="pos__win"
        role="img"
        aria-label="Demostración de la pantalla Cobrar de Atlas ONE: se agregan productos al carrito, se elige la forma de pago y se cobra."
      >
        <div className="pos__bar" aria-hidden="true">
          <span className="pos__title">Atlas ONE · Cobrar</span>
          <span className="pos__shift">Turno abierto</span>
        </div>
        <div className="pos__body" aria-hidden="true">
          <div className="pos__catalog">
            <div className="pos__search">Buscar por nombre o SKU...</div>
            <ul className="pos__sort">
              {SORT.map((s, i) => (
                <li key={s} className={i === 0 ? "is-active" : undefined}>
                  {s}
                </li>
              ))}
            </ul>
            <ul className="pos__tiles">
              {TILES.map((w, i) => (
                <li key={i} className={step >= 1 && step <= 3 && i === [1, 3, 2][step - 1] ? "is-tapped" : undefined}>
                  <Bar w={w} strong />
                  <Bar w={34} />
                </li>
              ))}
            </ul>
          </div>
          <div className="pos__cart">
            <span className="pos__cap">Carrito</span>
            <ul className="pos__lines">
              {LINES.map((w, i) => (
                <li key={i} className={i < count ? "is-on" : undefined}>
                  <Bar w={w} strong />
                  <Bar w={18} />
                </li>
              ))}
            </ul>
            <dl className="pos__totals">
              <div>
                <dt>Subtotal</dt>
                <dd>
                  <Bar w={(count / 3) * 100} />
                </dd>
              </div>
              <div>
                <dt>IVA 16%</dt>
                <dd>
                  <Bar w={(count / 3) * 70} />
                </dd>
              </div>
              <div className="pos__total">
                <dt>Total</dt>
                <dd>
                  <Bar w={(count / 3) * 100} strong />
                </dd>
              </div>
            </dl>
            <ul className="pos__pay">
              {PAY.map((p, i) => (
                <li key={p.name} className={`pos__pay--${p.mod}` + (step >= 4 && i === 0 ? " is-picked" : "")}>
                  {p.name}
                </li>
              ))}
            </ul>
            <div className={"pos__paid" + (paid ? " is-on" : "")}>
              <span className="pos__check">✓</span>
              Venta cobrada
            </div>
          </div>
        </div>
      </div>
      <figcaption className="figure-note">Demostración de la interfaz, sin datos reales.</figcaption>
    </figure>
  );
};

/* ---------- Atlas ONE: ¿Cómo voy? (tablero) ---------- */
const KPIS = ["Hoy", "Ayer", "Últimos 7 días", "Utilidad bruta de hoy"];
const HOURS = [22, 38, 54, 82, 100, 74, 58, 90, 66, 40];

export const DashboardMock: React.FC = () => (
  <figure className="dash" data-testid="one-dash">
    <div
      className="dash__win"
      role="img"
      aria-label="Demostración del tablero ¿Cómo voy? de Atlas ONE: indicadores del día, ventas de los últimos siete días, formas de pago y ventas por hora."
    >
      <div className="pos__bar" aria-hidden="true">
        <span className="pos__title">Atlas ONE · ¿Cómo voy?</span>
        <span className="pos__shift">Turno abierto</span>
      </div>
      <div className="dash__body" aria-hidden="true">
        <ul className="dash__kpis">
          {KPIS.map((k, i) => (
            <li key={k}>
              <span>{k}</span>
              <Bar w={[72, 58, 86, 64][i]} strong />
              <Bar w={38} />
            </li>
          ))}
        </ul>
        <div className="dash__card dash__card--line">
          <span className="pos__cap">Cómo van los últimos 7 días</span>
          <svg viewBox="0 0 300 110" preserveAspectRatio="none">
            <path className="dash__prev" d="M0 82 L50 70 L100 76 L150 58 L200 64 L250 48 L300 54" pathLength={1} />
            <path className="dash__area" d="M0 90 L50 66 L100 72 L150 44 L200 50 L250 24 L300 14 L300 110 L0 110 Z" />
            <path className="dash__line" d="M0 90 L50 66 L100 72 L150 44 L200 50 L250 24 L300 14" pathLength={1} />
          </svg>
          <ul className="dash__legend">
            <li className="is-now">Esta semana</li>
            <li>Semana anterior</li>
          </ul>
        </div>
        <div className="dash__card dash__card--donut">
          <span className="pos__cap">Cómo te pagaron hoy</span>
          <svg viewBox="0 0 42 42">
            <circle className="dash__ring" cx="21" cy="21" r="15.9" />
            <circle className="dash__seg dash__seg--a" cx="21" cy="21" r="15.9" pathLength={100} />
            <circle className="dash__seg dash__seg--b" cx="21" cy="21" r="15.9" pathLength={100} />
            <circle className="dash__seg dash__seg--c" cx="21" cy="21" r="15.9" pathLength={100} />
          </svg>
          <ul className="dash__legend">
            <li className="is-a">Efectivo</li>
            <li className="is-b">Tarjeta</li>
            <li className="is-c">Transferencia</li>
          </ul>
        </div>
        <div className="dash__card dash__card--bars">
          <span className="pos__cap">A qué hora vendiste hoy</span>
          <ul className="dash__bars">
            {HOURS.map((h, i) => (
              <li key={i} style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
    <figcaption className="figure-note">Demostración de la interfaz, sin datos reales.</figcaption>
  </figure>
);

/* ---------- Harvestt: domo geodésico e invernadero virtual ---------- */
const Gauge: React.FC<{ name: string; min: string; max: string; at: number }> = ({ name, min, max, at }) => {
  // Arco de 180°: `at` (0–1) solo coloca la aguja del esquema; no representa una lectura.
  const t = Math.PI * (1 - at);
  return (
    <div className="gh__gauge">
      <div className="gh__gauge-head">
        <span>{name}</span>
        <span className="gh__badge">Simulado</span>
      </div>
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path className="gh__arc" d="M12 62 A48 48 0 0 1 108 62" />
        <path className="gh__arc gh__arc--on" d="M12 62 A48 48 0 0 1 108 62" pathLength={1} strokeDasharray={`${at} 1`} />
        <line className="gh__needle" x1="60" y1="62" x2={60 + 38 * Math.cos(t)} y2={62 - 38 * Math.sin(t)} />
        <circle className="gh__hub" cx="60" cy="62" r="3" />
      </svg>
      <div className="gh__scale">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export const GreenhouseVisual: React.FC = () => (
  <figure className="gh" data-testid="harvestt-visual">
    <div className="gh__frame">
      <img
        className="gh__img"
        src="/images/projects/harvestt/hero-dome.webp"
        width={1672}
        height={941}
        loading="lazy"
        decoding="async"
        alt="Render conceptual del invernadero geodésico de Harvestt en un paisaje árido al anochecer."
      />
      <div
        className="gh__panel"
        role="img"
        aria-label="Ilustración del panel de operaciones del invernadero virtual: temperatura del aire y humedad relativa, ambas marcadas como simuladas."
      >
        <span className="gh__cap" aria-hidden="true">
          Operaciones · invernadero virtual
        </span>
        <div className="gh__gauges" aria-hidden="true">
          <Gauge name="Temperatura del aire" min="−10 °C" max="50 °C" at={0.56} />
          <Gauge name="Humedad relativa" min="0 %" max="100 %" at={0.64} />
        </div>
      </div>
    </div>
    <figcaption className="figure-note">
      Render conceptual del invernadero geodésico y esquema del panel de HarvestT Cortex. La telemetría es simulada.
    </figcaption>
  </figure>
);
