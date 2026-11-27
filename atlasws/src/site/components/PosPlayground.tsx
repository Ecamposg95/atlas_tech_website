import React, { useMemo, useState } from "react";
import "./pos-playground.css";

// Demo jugable de Atlas ONE: un punto de venta que sí funciona dentro de la página.
// La persona elige giro, arma el carrito, cobra y ve moverse el tablero "¿Cómo voy?".
// Todo vive en memoria del navegador con datos de ejemplo: nada se guarda ni se envía.

type GiroId = "tienda" | "cafe" | "barberia";
interface Product {
  id: string;
  name: string;
  price: number; // precio de ejemplo, IVA incluido
}

const GIROS: { id: GiroId; name: string; products: Product[] }[] = [
  {
    id: "tienda",
    name: "Tienda",
    products: [
      { id: "t1", name: "Refresco 600 ml", price: 18 },
      { id: "t2", name: "Pan de caja", price: 42 },
      { id: "t3", name: "Leche 1 L", price: 28 },
      { id: "t4", name: "Huevo 12 pz", price: 46 },
      { id: "t5", name: "Café soluble", price: 89 },
      { id: "t6", name: "Arroz 1 kg", price: 32 },
      { id: "t7", name: "Jabón de tocador", price: 24 },
      { id: "t8", name: "Galletas", price: 19 },
    ],
  },
  {
    id: "cafe",
    name: "Café",
    products: [
      { id: "c1", name: "Americano", price: 45 },
      { id: "c2", name: "Capuchino", price: 58 },
      { id: "c3", name: "Latte", price: 62 },
      { id: "c4", name: "Espresso", price: 38 },
      { id: "c5", name: "Té chai", price: 55 },
      { id: "c6", name: "Croissant", price: 42 },
      { id: "c7", name: "Panqué", price: 36 },
      { id: "c8", name: "Sándwich", price: 78 },
    ],
  },
  {
    id: "barberia",
    name: "Barbería",
    products: [
      { id: "b1", name: "Corte clásico", price: 180 },
      { id: "b2", name: "Fade", price: 220 },
      { id: "b3", name: "Barba", price: 120 },
      { id: "b4", name: "Corte + barba", price: 280 },
      { id: "b5", name: "Cejas", price: 60 },
      { id: "b6", name: "Cera para cabello", price: 150 },
      { id: "b7", name: "Shampoo", price: 190 },
      { id: "b8", name: "Tinte", price: 350 },
    ],
  },
];

const SORTS = ["Más vendidos", "A-Z", "Precio ↑", "Precio ↓"] as const;
type Sort = (typeof SORTS)[number];

const METHODS = [
  { id: "efectivo", name: "Efectivo" },
  { id: "tarjeta", name: "Tarjeta" },
  { id: "transfer", name: "Transfer." },
] as const;
type MethodId = (typeof METHODS)[number]["id"];

interface Sale {
  folio: number;
  total: number;
  method: MethodId;
  lines: { name: string; qty: number; amount: number }[];
  received?: number;
}

const money = (n: number) =>
  "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Billetes sugeridos para "Recibido": el exacto y los siguientes redondeos.
const bills = (total: number) =>
  Array.from(new Set([total, ...[50, 100, 200, 500, 1000].map((b) => Math.ceil(total / b) * b)]))
    .filter((v) => v >= total)
    .slice(0, 4);

const PosPlayground: React.FC = () => {
  const [giro, setGiro] = useState<GiroId>("tienda");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("Más vendidos");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [method, setMethod] = useState<MethodId>("efectivo");
  const [received, setReceived] = useState<number | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [ticket, setTicket] = useState<Sale | null>(null);
  const [bump, setBump] = useState<string | null>(null);

  const catalog = GIROS.find((g) => g.id === giro)!.products;
  const all = useMemo(() => GIROS.flatMap((g) => g.products), []);

  // Unidades vendidas en la sesión, por nombre de producto.
  const sold = useMemo(() => {
    const m: Record<string, number> = {};
    sales.forEach((s) => s.lines.forEach((l) => (m[l.name] = (m[l.name] || 0) + l.qty)));
    return m;
  }, [sales]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = catalog.filter((p) => !q || p.name.toLowerCase().includes(q) || p.id.includes(q));
    if (sort === "A-Z") return [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (sort === "Precio ↑") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "Precio ↓") return [...list].sort((a, b) => b.price - a.price);
    return [...list].sort((a, b) => (sold[b.name] || 0) - (sold[a.name] || 0));
  }, [catalog, query, sort, sold]);

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ p: all.find((x) => x.id === id)!, qty }))
    .filter((l) => l.qty > 0);
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const subtotal = total / 1.16;
  const units = lines.reduce((s, l) => s + l.qty, 0);

  const add = (id: string, d = 1) => {
    setTicket(null);
    setReceived(null);
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + d) }));
    if (d > 0) {
      setBump(id);
      window.setTimeout(() => setBump((b) => (b === id ? null : b)), 260);
    }
  };

  const changeGiro = (id: GiroId) => {
    setGiro(id);
    setQuery("");
    setCart({});
    setReceived(null);
    setTicket(null);
  };

  const pay = () => {
    if (!total) return;
    const sale: Sale = {
      folio: sales.length + 1,
      total,
      method,
      received: method === "efectivo" ? received ?? total : undefined,
      lines: lines.map((l) => ({ name: l.p.name, qty: l.qty, amount: l.p.price * l.qty })),
    };
    setSales((s) => [...s, sale]);
    setTicket(sale);
    setCart({});
    setReceived(null);
  };

  // Tablero de la sesión.
  const sessionTotal = sales.reduce((s, x) => s + x.total, 0);
  const byMethod = METHODS.map((m) => ({
    ...m,
    amount: sales.filter((s) => s.method === m.id).reduce((a, s) => a + s.total, 0),
  }));
  const top = Object.entries(sold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const stepNow = ticket ? 3 : total ? 2 : 1;

  return (
    <div className="play" data-testid="pos-playground">
      <div className="play__top">
        <div className="play__giros" role="group" aria-label="Giro del negocio">
          {GIROS.map((g) => (
            <button key={g.id} type="button" aria-pressed={g.id === giro} onClick={() => changeGiro(g.id)}>
              {g.name}
            </button>
          ))}
        </div>
        <ol className="play__guide" aria-label="Cómo usar la demo">
          {["Agrega productos", "Elige cómo te pagan", "Cobra"].map((t, i) => (
            <li key={t} className={i + 1 === stepNow ? "is-now" : i + 1 < stepNow ? "is-done" : undefined}>
              <span className="data">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </div>

      <div className="play__grid">
        {/* Catálogo */}
        <section className="play__panel" aria-label="Productos">
          <input
            className="play__search"
            type="search"
            placeholder="Buscar por nombre o SKU..."
            aria-label="Buscar producto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="play__sorts" role="group" aria-label="Ordenar">
            {SORTS.map((s) => (
              <button key={s} type="button" aria-pressed={s === sort} onClick={() => setSort(s)}>
                {s}
              </button>
            ))}
          </div>
          <ul className="play__tiles">
            {shown.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={"play__tile" + (bump === p.id ? " is-bump" : "")}
                  onClick={() => add(p.id)}
                  aria-label={`Agregar ${p.name}, ${money(p.price)}`}
                >
                  <span className="play__tile-name">{p.name}</span>
                  <span className="play__tile-price data">{money(p.price)}</span>
                  {cart[p.id] > 0 && <span className="play__qty data">{cart[p.id]}</span>}
                </button>
              </li>
            ))}
            {shown.length === 0 && <li className="play__empty">Sin resultados para “{query}”.</li>}
          </ul>
        </section>

        {/* Carrito y cobro */}
        <section className="play__panel play__cart" aria-label="Carrito">
          <div className="play__cart-head">
            <h3>Carrito</h3>
            <span className="data">{units} art.</span>
          </div>

          {ticket ? (
            <div className="play__ticket" data-testid="pos-ticket" role="status">
              <span className="play__check" aria-hidden="true">
                ✓
              </span>
              <strong>Venta cobrada</strong>
              <span className="data">Ticket #{String(ticket.folio).padStart(4, "0")}</span>
              <ul>
                {ticket.lines.map((l) => (
                  <li key={l.name}>
                    <span>
                      {l.qty} × {l.name}
                    </span>
                    <span className="data">{money(l.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="play__ticket-total">
                <span>Total · {METHODS.find((m) => m.id === ticket.method)!.name}</span>
                <span className="data">{money(ticket.total)}</span>
              </div>
              {ticket.received !== undefined && ticket.received > ticket.total && (
                <div className="play__ticket-change">
                  <span>Cambio</span>
                  <span className="data">{money(ticket.received - ticket.total)}</span>
                </div>
              )}
              <button type="button" className="cta cta--secondary" onClick={() => setTicket(null)}>
                Nueva venta
              </button>
            </div>
          ) : (
            <>
              {lines.length === 0 ? (
                <p className="play__hint">Toca un producto para empezar la venta.</p>
              ) : (
                <ul className="play__lines">
                  {lines.map((l) => (
                    <li key={l.p.id}>
                      <span className="play__line-name">{l.p.name}</span>
                      <span className="play__stepper">
                        <button type="button" onClick={() => add(l.p.id, -1)} aria-label={`Quitar uno de ${l.p.name}`}>
                          −
                        </button>
                        <span className="data">{l.qty}</span>
                        <button type="button" onClick={() => add(l.p.id, 1)} aria-label={`Agregar uno de ${l.p.name}`}>
                          +
                        </button>
                      </span>
                      <span className="play__line-amt data">{money(l.p.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <dl className="play__totals">
                <div>
                  <dt>Subtotal</dt>
                  <dd className="data">{money(subtotal)}</dd>
                </div>
                <div>
                  <dt>IVA 16%</dt>
                  <dd className="data">{money(total - subtotal)}</dd>
                </div>
                <div className="play__total">
                  <dt>Total</dt>
                  <dd className="data" data-testid="pos-total">
                    {money(total)}
                  </dd>
                </div>
              </dl>

              <div className="play__methods" role="group" aria-label="Forma de pago">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    data-method={m.id}
                    aria-pressed={m.id === method}
                    onClick={() => setMethod(m.id)}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              {method === "efectivo" && total > 0 && (
                <div className="play__cash">
                  <span>Recibido</span>
                  <div role="group" aria-label="Efectivo recibido">
                    {bills(total).map((b) => (
                      <button key={b} type="button" aria-pressed={(received ?? total) === b} onClick={() => setReceived(b)}>
                        {money(b)}
                      </button>
                    ))}
                  </div>
                  <span className="play__change">
                    Cambio <b className="data">{money((received ?? total) - total)}</b>
                  </span>
                </div>
              )}

              <button type="button" className="cta cta--primary play__pay" disabled={!total} onClick={pay}>
                Cobrar {total > 0 && money(total)}
              </button>
            </>
          )}
        </section>

        {/* Tablero de la sesión */}
        <section className="play__panel play__dash" aria-label="¿Cómo voy?" aria-live="polite">
          <div className="play__cart-head">
            <h3>¿Cómo voy?</h3>
            <span className="data">esta sesión</span>
          </div>
          <dl className="play__kpis">
            <div>
              <dt>Ventas</dt>
              <dd className="data" data-testid="pos-session">
                {money(sessionTotal)}
              </dd>
            </div>
            <div>
              <dt>Tickets</dt>
              <dd className="data">{sales.length}</dd>
            </div>
            <div>
              <dt>Ticket promedio</dt>
              <dd className="data">{money(sales.length ? sessionTotal / sales.length : 0)}</dd>
            </div>
          </dl>

          <h4>Cómo te pagaron</h4>
          <ul className="play__bars">
            {byMethod.map((m) => (
              <li key={m.id} data-method={m.id}>
                <span>{m.name}</span>
                <span className="play__bar">
                  <i style={{ width: `${sessionTotal ? (m.amount / sessionTotal) * 100 : 0}%` }} />
                </span>
                <span className="data">{money(m.amount)}</span>
              </li>
            ))}
          </ul>

          <h4>Lo que más se vendió</h4>
          {top.length === 0 ? (
            <p className="play__hint">Cobra una venta y el tablero se mueve.</p>
          ) : (
            <ol className="play__top3">
              {top.map(([name, qty]) => (
                <li key={name}>
                  <span>{name}</span>
                  <span className="data">{qty}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
      <p className="figure-note">
        Demostración interactiva con productos y precios de ejemplo. Nada se guarda ni se envía: todo ocurre en tu
        navegador.
      </p>
    </div>
  );
};

export default PosPlayground;
