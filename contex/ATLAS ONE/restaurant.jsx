// restaurant.jsx — Atlas One Restaurant preset (Preset 06)
// Color: Naranja + carbón cálido. Mesas, comandas, cocina.

const restP = () => PRESETS.restaurant;

const restSidebarItems = [
  { header: 'Salón' },
  { icon: Icon.table,    label: 'Plano de mesas', badge: '24' },
  { icon: Icon.receipt,  label: 'Comandas',       badge: '11' },
  { icon: Icon.users,    label: 'Meseros' },
  { header: 'Cocina' },
  { icon: Icon.flame,    label: 'KDS · Cocina',    badge: '7' },
  { icon: Icon.utensils, label: 'Menú · Recetas' },
  { icon: Icon.beaker,   label: 'Insumos' },
  { header: 'Caja' },
  { icon: Icon.cart,     label: 'POS y cuentas' },
  { icon: Icon.chart,    label: 'Reportes' },
  { icon: Icon.cog,      label: 'Ajustes' },
];

// ─── 01 · Desktop · Plano de mesas + sidebar info ─────────────
function RestaurantDesktop() {
  const p = restP();

  // Table layout: 24 mesas in a floor plan
  // status: free, seated, ordered, food-out, paying, dirty
  const tables = [
    // Bar
    { id: 'B1', x: 80,  y: 60,  w: 60, h: 60, shape: 'square', status: 'seated',   covers: 1, total: 145, time: 8,  waiter: 'Luis' },
    { id: 'B2', x: 150, y: 60,  w: 60, h: 60, shape: 'square', status: 'seated',   covers: 2, total: 320, time: 22, waiter: 'Luis' },
    { id: 'B3', x: 220, y: 60,  w: 60, h: 60, shape: 'square', status: 'free' },
    { id: 'B4', x: 290, y: 60,  w: 60, h: 60, shape: 'square', status: 'paying',   covers: 2, total: 482, time: 64, waiter: 'Luis' },
    // Salón principal
    { id: '01', x: 80,  y: 180, w: 80, h: 80, shape: 'round',  status: 'food-out', covers: 4, total: 940, time: 42, waiter: 'Mariana' },
    { id: '02', x: 200, y: 180, w: 80, h: 80, shape: 'round',  status: 'ordered',  covers: 2, total: 380, time: 12, waiter: 'Mariana' },
    { id: '03', x: 320, y: 180, w: 80, h: 80, shape: 'round',  status: 'free' },
    { id: '04', x: 440, y: 180, w: 80, h: 80, shape: 'round',  status: 'seated',   covers: 3, total: 0,   time: 4,  waiter: 'Andrés' },
    { id: '05', x: 80,  y: 300, w: 80, h: 80, shape: 'round',  status: 'food-out', covers: 4, total: 1240, time: 38, waiter: 'Andrés' },
    { id: '06', x: 200, y: 300, w: 80, h: 80, shape: 'round',  status: 'dirty' },
    { id: '07', x: 320, y: 300, w: 80, h: 80, shape: 'round',  status: 'free' },
    { id: '08', x: 440, y: 300, w: 80, h: 80, shape: 'round',  status: 'ordered',  covers: 5, total: 1180, time: 18, waiter: 'Mariana' },
    // Terraza (rectangles)
    { id: 'T1', x: 80,  y: 420, w: 130, h: 60, shape: 'rect',  status: 'seated',   covers: 4, total: 0,   time: 2,  waiter: 'Carla' },
    { id: 'T2', x: 230, y: 420, w: 130, h: 60, shape: 'rect',  status: 'food-out', covers: 6, total: 1860, time: 48, waiter: 'Carla' },
    { id: 'T3', x: 380, y: 420, w: 130, h: 60, shape: 'rect',  status: 'free' },
    // Privado
    { id: 'P1', x: 560, y: 180, w: 100, h: 130, shape: 'rect', status: 'food-out', covers: 8, total: 3420, time: 56, waiter: 'Mariana' },
    { id: 'P2', x: 560, y: 330, w: 100, h: 130, shape: 'rect', status: 'paying',   covers: 4, total: 1820, time: 92, waiter: 'Andrés' },
  ];

  const statusStyles = {
    free:      { fill: '#FBFAF6',           stroke: N.line2,    label: 'Libre',     icon: '○', txtColor: N.muted },
    seated:    { fill: '#FBEFD7',           stroke: '#E0B547',  label: 'Sentados',  icon: '👤', txtColor: '#8A6510' },
    ordered:   { fill: '#E5ECFB',           stroke: '#5479D6',  label: 'Ordenando', icon: '📝', txtColor: '#2F4FB0' },
    'food-out':{ fill: p.accentSoft,        stroke: p.accent,   label: 'En curso',  icon: '🍽', txtColor: p.accentInk },
    paying:    { fill: '#E3F4EA',           stroke: '#0E8A4E',  label: 'Cobrando',  icon: '$',  txtColor: '#0E8A4E' },
    dirty:     { fill: '#EEEAE0',           stroke: '#A39787',  label: 'Limpieza',  icon: '×', txtColor: '#7A6E5C' },
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#FAF5EF', fontFamily: ATLAS_FONT }}>
      <Sidebar preset={p} active="Plano de mesas" items={restSidebarItems}
        footer={<SidebarUser preset={p} name="Mariana Suárez" role="Hostess" branch="Centro" />} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Plano del salón"
          sub="VIERNES · TURNO NOCHE · 14 MESAS OCUPADAS / 17 · TICKET PROM. $487"
          preset={p}
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', background: N.card, border: `1px solid ${N.line}`, borderRadius: 8, padding: 2 }}>
                {['Salón', 'Lista', 'KDS'].map((t, i) => (
                  <div key={t} style={{
                    padding: '5px 12px', borderRadius: 6, fontSize: 12.5, fontWeight: i === 0 ? 500 : 400,
                    background: i === 0 ? p.accent : 'transparent', color: i === 0 ? '#fff' : N.body,
                  }}>{t}</div>
                ))}
              </div>
              <Button label="+ Comanda" kind="primary" preset={p} icon={Icon.plus} />
            </div>
          }
        />

        <div style={{ flex: 1, padding: '16px 24px 22px', background: '#FAF5EF', overflow: 'hidden', display: 'flex', gap: 16 }}>
          {/* Floor plan area */}
          <div style={{ flex: 1, background: N.card, border: `1px solid ${N.line}`, borderRadius: 12, padding: 16, position: 'relative', overflow: 'hidden' }}>
            {/* Zone labels */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 8, fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted, letterSpacing: 0.6, textTransform: 'uppercase' }}>
              <div>● Bar</div>
              <div>● Salón principal</div>
              <div>● Terraza</div>
              <div>● Privado</div>
              <div style={{ flex: 1 }} />
              <div>14 / 17 OCUPADAS · 76% AFORO</div>
            </div>

            <div style={{ position: 'relative', height: 520 }}>
              {/* Zone backgrounds */}
              <div style={{ position: 'absolute', left: 60, top: 40, width: 320, height: 100, background: '#FAF5EF', border: `1px dashed ${N.line2}`, borderRadius: 8 }} />
              <div style={{ position: 'absolute', left: 60, top: 160, width: 480, height: 220, background: '#FAF5EF', border: `1px dashed ${N.line2}`, borderRadius: 8 }} />
              <div style={{ position: 'absolute', left: 60, top: 400, width: 480, height: 100, background: '#F8EEE6', border: `1px dashed ${N.line2}`, borderRadius: 8 }} />
              <div style={{ position: 'absolute', left: 540, top: 160, width: 140, height: 320, background: '#FAF5EF', border: `1px dashed ${N.line2}`, borderRadius: 8 }} />

              {/* Zone titles */}
              <div style={{ position: 'absolute', left: 70, top: 26, fontSize: 10, fontFamily: ATLAS_MONO, color: N.faint, letterSpacing: 0.8 }}>BAR</div>
              <div style={{ position: 'absolute', left: 70, top: 146, fontSize: 10, fontFamily: ATLAS_MONO, color: N.faint, letterSpacing: 0.8 }}>SALÓN PRINCIPAL</div>
              <div style={{ position: 'absolute', left: 70, top: 386, fontSize: 10, fontFamily: ATLAS_MONO, color: N.faint, letterSpacing: 0.8 }}>TERRAZA</div>
              <div style={{ position: 'absolute', left: 550, top: 146, fontSize: 10, fontFamily: ATLAS_MONO, color: N.faint, letterSpacing: 0.8 }}>PRIVADO</div>

              {tables.map(t => {
                const st = statusStyles[t.status];
                const isRound = t.shape === 'round';
                return (
                  <div key={t.id} style={{
                    position: 'absolute', left: t.x, top: t.y, width: t.w, height: t.h,
                    background: st.fill, border: `1.5px solid ${st.stroke}`,
                    borderRadius: isRound ? '50%' : 8,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: 6,
                    boxShadow: t.status === 'food-out' ? `0 4px 14px ${p.accent}30` : 'none',
                  }}>
                    <div style={{ fontFamily: ATLAS_MONO, fontSize: 13, fontWeight: 700, color: st.txtColor, letterSpacing: 0.2 }}>{t.id}</div>
                    {t.status !== 'free' && t.status !== 'dirty' && (
                      <>
                        <div style={{ fontSize: 9, fontFamily: ATLAS_MONO, color: st.txtColor, opacity: 0.75 }}>{t.covers} pers · {t.time}m</div>
                        {t.total > 0 && <div style={{ fontSize: 10, fontFamily: ATLAS_MONO, color: st.txtColor, fontWeight: 600, marginTop: 1 }}>${t.total}</div>}
                      </>
                    )}
                    {(t.status === 'free' || t.status === 'dirty') && (
                      <div style={{ fontSize: 9, fontFamily: ATLAS_MONO, color: st.txtColor, marginTop: 2 }}>{st.label}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 14, marginTop: 8, paddingTop: 12, borderTop: `1px solid ${N.line}`, flexWrap: 'wrap' }}>
              {Object.entries(statusStyles).map(([k, st]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: st.fill, border: `1.5px solid ${st.stroke}` }} />
                  <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: N.body }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: selected table + waiter stats */}
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Selected table */}
            <Card pad={18} style={{ border: `1.5px solid ${p.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: p.accentInk, letterSpacing: 0.8, textTransform: 'uppercase' }}>Mesa seleccionada</div>
                  <div style={{ fontSize: 36, fontWeight: 600, color: N.ink, marginTop: 4, letterSpacing: -1, fontFamily: ATLAS_FONT }}>P1</div>
                  <div style={{ fontSize: 12, color: N.body, marginTop: 2 }}>Privado · 8 personas · 56 min</div>
                </div>
                <Badge color={p.accentInk} soft={p.accentSoft} dot>En curso</Badge>
              </div>

              <div style={{ marginTop: 14, padding: 12, background: N.page, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: N.muted, marginBottom: 6 }}>
                  <span>Mesera</span><span style={{ color: N.ink }}>Mariana S.</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: N.muted, marginBottom: 6 }}>
                  <span>Abrió</span><span style={{ fontFamily: ATLAS_MONO, color: N.ink }}>20:08</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: N.muted }}>
                  <span>Comanda</span><span style={{ fontFamily: ATLAS_MONO, color: N.ink }}>#C-2284</span>
                </div>
              </div>

              <div style={{ marginTop: 12, fontFamily: ATLAS_MONO, fontSize: 10.5, color: N.muted, letterSpacing: 0.6, textTransform: 'uppercase' }}>Items · 14</div>
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                {[
                  ['3', 'Mezcal Amores reposado',  '$840'],
                  ['8', 'Tacos al pastor',         '$640'],
                  ['2', 'Sopa de tortilla',        '$280'],
                  ['1', 'Pescado zarandeado',      '$680'],
                ].map(([q, n, t], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr 60px', gap: 6 }}>
                    <div style={{ fontFamily: ATLAS_MONO, color: p.accent }}>{q}×</div>
                    <div style={{ color: N.body }}>{n}</div>
                    <div style={{ textAlign: 'right', fontFamily: ATLAS_MONO, fontWeight: 500 }}>{t}</div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: N.faint, fontFamily: ATLAS_MONO }}>+ 10 más…</div>
              </div>

              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${N.line}`, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: N.muted }}>Total</span>
                <span style={{ fontFamily: ATLAS_MONO, fontSize: 22, fontWeight: 600, letterSpacing: -0.4 }}>$3 420.00</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
                <Button label="Agregar" kind="secondary" />
                <Button label="Cobrar" kind="primary" preset={p} icon={Icon.arrowRight} />
              </div>
            </Card>

            {/* Waiter performance */}
            <Card pad={16}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 0.6, textTransform: 'uppercase' }}>Meseros · turno</div>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>4 ACTIVOS</div>
              </div>
              {[
                ['Mariana S.', 6, 4820, p.accent],
                ['Andrés P.',  5, 3680, '#F59E0B'],
                ['Carla R.',   3, 2240, '#8B5CF6'],
                ['Luis B.',    4, 1860, '#0EA5E9'],
              ].map(([n, mesas, total, c], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 50px 80px', gap: 8, alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${N.line}` : 'none' }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>{n.split(' ').map(x => x[0]).join('')}</div>
                  <div style={{ fontSize: 12.5 }}>{n}</div>
                  <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted, textAlign: 'right' }}>{mesas}×</div>
                  <div style={{ fontFamily: ATLAS_MONO, fontSize: 12, fontWeight: 600, textAlign: 'right' }}>{mxnInt(total)}</div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 02 · Comanda táctil (tablet del mesero) ──────────────────
function RestaurantTouch() {
  const p = restP();
  return (
    <div style={{ width: '100%', height: '100%', background: '#FAF5EF', display: 'flex', fontFamily: ATLAS_FONT }}>
      {/* Left: menu */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', background: N.card, borderBottom: `1px solid ${N.line}` }}>
          <Wordmark color={N.ink} accent={p.accent} size={14} sub="MESERO · CENTRO" />
          <div style={{ width: 1, height: 22, background: N.line }} />
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>MARIANA S. · TURNO NOCHE</div>
          <div style={{ flex: 1 }} />
          <Badge color={p.accent} soft={p.accentSoft} dot>Mesa 05 · 4 pax</Badge>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '14px 22px', background: N.card, borderBottom: `1px solid ${N.line}`, overflow: 'hidden' }}>
          {[
            { name: 'Entradas',  n: 8,  active: true },
            { name: 'Tacos',     n: 12 },
            { name: 'Mariscos',  n: 9 },
            { name: 'Carnes',    n: 6 },
            { name: 'Postres',   n: 5 },
            { name: 'Bebidas',   n: 18 },
            { name: 'Coctelería',n: 14 },
            { name: 'Mezcales',  n: 22 },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '10px 18px', borderRadius: 8, fontSize: 14,
              background: c.active ? p.accent : N.page,
              color: c.active ? '#fff' : N.body,
              border: c.active ? 'none' : `1px solid ${N.line}`,
              display: 'flex', alignItems: 'center', gap: 6, fontWeight: c.active ? 500 : 400,
            }}>
              {c.name}
              <span style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, opacity: 0.7 }}>{c.n}</span>
            </div>
          ))}
        </div>

        {/* Items grid */}
        <div style={{ flex: 1, padding: '18px 22px', overflow: 'hidden', background: '#FAF5EF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { name: 'Aguachile verde',        price: 240, prep: '8m',  notes: 'Picante medio' },
              { name: 'Tostadas de atún',       price: 220, prep: '6m' },
              { name: 'Guacamole de la casa',   price: 180, prep: '4m' },
              { name: 'Tartar de hamachi',      price: 320, prep: '7m',  notes: 'Star · 4.9' },
              { name: 'Coliflor rostizada',     price: 195, prep: '12m' },
              { name: 'Empanadas argentinas',   price: 210, prep: '10m' },
              { name: 'Tlayuda mixta',          price: 285, prep: '14m' },
              { name: 'Tuétanos con tortillas', price: 290, prep: '10m' },
              { name: 'Esquites tatemados',     price: 165, prep: '7m' },
            ].map((it, i) => (
              <div key={i} style={{
                background: N.card, border: `1px solid ${N.line}`, borderRadius: 12,
                padding: 14, display: 'flex', flexDirection: 'column', height: 130, position: 'relative',
              }}>
                <div style={{ flex: 1, background: `${p.accentSoft}`, borderRadius: 8, marginBottom: 10, position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `repeating-linear-gradient(45deg, ${p.accent}15 0 1px, transparent 1px 8px)`,
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 6, left: 8,
                    fontFamily: ATLAS_MONO, fontSize: 9, color: p.accent, letterSpacing: 0.4, fontWeight: 500,
                  }}>⏱ {it.prep}</div>
                  {it.notes && (
                    <div style={{
                      position: 'absolute', top: 6, right: 6, padding: '2px 6px',
                      background: '#fff', borderRadius: 4, fontFamily: ATLAS_MONO, fontSize: 9, color: N.body,
                    }}>{it.notes}</div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: N.ink, lineHeight: 1.2 }}>{it.name}</div>
                  <div style={{ fontFamily: ATLAS_MONO, fontSize: 14, fontWeight: 600, color: p.accent }}>${it.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: current order (comanda) */}
      <div style={{ width: 360, background: N.card, borderLeft: `1px solid ${N.line}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 20px', borderBottom: `1px solid ${N.line}`, background: '#FAF5EF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Comanda · C-2287</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4, letterSpacing: -0.4 }}>Mesa 05</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted }}>4 PERS · ABIERTA 18:24</div>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: p.accent, marginTop: 2 }}>● EN CURSO</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '12px 20px', overflow: 'hidden' }}>
          {/* Course header */}
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 4, marginBottom: 8 }}>Tiempo 1 · entradas · enviado</div>
          {[
            { qty: 1, name: 'Aguachile verde',  price: 240, status: 'sent' },
            { qty: 2, name: 'Guacamole de la casa', price: 180, status: 'sent', note: 'sin cebolla en uno' },
          ].map((it, i) => (
            <CommandaItem key={i} item={it} preset={p} />
          ))}

          <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 14, marginBottom: 8 }}>Tiempo 2 · fuertes · en cocina</div>
          {[
            { qty: 2, name: 'Tlayuda mixta',     price: 285, status: 'cooking' },
            { qty: 1, name: 'Pescado zarandeado',price: 480, status: 'cooking', note: 'término medio' },
            { qty: 1, name: 'Coliflor rostizada',price: 195, status: 'cooking' },
          ].map((it, i) => (
            <CommandaItem key={i} item={it} preset={p} />
          ))}

          <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 14, marginBottom: 8 }}>Bebidas · servidas</div>
          {[
            { qty: 2, name: 'Mezcal Amores joven',  price: 280, status: 'done' },
            { qty: 4, name: 'Agua de jamaica',      price:  45, status: 'done' },
          ].map((it, i) => (
            <CommandaItem key={i} item={it} preset={p} />
          ))}
        </div>

        <div style={{ padding: '16px 20px', background: '#FAF5EF', borderTop: `1px solid ${N.line}` }}>
          <div style={{ fontSize: 12, color: N.muted, display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span style={{ fontFamily: ATLAS_MONO }}>{mxn(1810.00)}</span></div>
          <div style={{ fontSize: 12, color: N.muted, display: 'flex', justifyContent: 'space-between', marginTop: 4 }}><span>Propina sugerida 15%</span><span style={{ fontFamily: ATLAS_MONO }}>{mxn(271.50)}</span></div>
          <div style={{ height: 1, background: N.line, margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: N.muted }}>Total</span>
            <span style={{ fontFamily: ATLAS_MONO, fontSize: 24, fontWeight: 600, letterSpacing: -0.6 }}>{mxn(2081.50)}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <Button label="Dividir" kind="secondary" />
            <Button label="Cuenta" kind="primary" preset={p} icon={Icon.receipt} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandaItem({ item, preset }) {
  const colors = {
    sent:    { c: '#9A6610', soft: '#FBEFD7', label: 'Enviado' },
    cooking: { c: preset.accent, soft: preset.accentSoft, label: 'En cocina' },
    done:    { c: '#0E8A4E', soft: '#E3F4EA', label: 'Servido' },
  }[item.status];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '28px 1fr 60px',
      gap: 8, padding: '10px 12px', borderRadius: 8, marginBottom: 6,
      background: colors.soft,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 5, background: colors.c, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: ATLAS_MONO, fontSize: 11, fontWeight: 600,
      }}>{item.qty}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: N.ink }}>{item.name}</div>
        {item.note && <div style={{ fontSize: 10.5, color: colors.c, marginTop: 2, fontFamily: ATLAS_MONO }}>↳ {item.note}</div>}
      </div>
      <div style={{ textAlign: 'right', fontFamily: ATLAS_MONO, fontSize: 13, fontWeight: 600 }}>${item.qty * item.price}</div>
    </div>
  );
}

// ─── 03 · KDS móvil (cocina) ──────────────────────────────────
function RestaurantMobile() {
  const p = restP();
  // KDS tickets — order tickets the kitchen sees on a screen
  return (
    <div style={{ width: '100%', height: '100%', background: '#1A0F0A', color: '#F4E9DF', display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT, overflow: 'hidden' }}>
      {/* Top */}
      <div style={{ padding: '16px 18px 14px', background: '#0F0805', borderBottom: '1px solid #2A1A11' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: '#8C7E72', letterSpacing: 0.6 }}>KDS · COCINA CALIENTE</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>Pase · Chef Iván</div>
          </div>
          <Badge color={p.accent} soft="rgba(226,83,27,0.18)" dot>7 activas</Badge>
        </div>
        <div style={{ display: 'flex', gap: 8, fontFamily: ATLAS_MONO, fontSize: 10.5, color: '#8C7E72' }}>
          <span style={{ color: '#22D3B8' }}>● 4 a tiempo</span>
          <span style={{ color: '#F59E0B' }}>● 2 cerca</span>
          <span style={{ color: '#FB7185' }}>● 1 demorada</span>
        </div>
      </div>

      {/* Tickets */}
      <div style={{ flex: 1, padding: '12px 14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          {
            id: 'C-2284', table: 'P1 · 8 pax', mins: 12, slo: 'on-time', waiter: 'Mariana',
            items: [
              ['1', 'Pescado zarandeado', 'término medio'],
              ['3', 'Tacos al pastor',    null],
              ['2', 'Coliflor rostizada', null],
            ],
          },
          {
            id: 'C-2287', table: 'M5 · 4 pax', mins: 8,  slo: 'on-time', waiter: 'Mariana',
            items: [
              ['2', 'Tlayuda mixta',      null],
              ['1', 'Pescado zarandeado', 'término medio'],
              ['1', 'Coliflor rostizada', null],
            ],
          },
          {
            id: 'C-2281', table: 'T2 · 6 pax', mins: 18, slo: 'late',    waiter: 'Carla',
            items: [
              ['6', 'Tacos al pastor',    'sin cebolla'],
              ['1', 'Aguachile verde',    'extra limón'],
            ],
          },
        ].map((t, i) => {
          const sloColor = t.slo === 'late' ? '#FB7185' : t.slo === 'near' ? '#F59E0B' : '#22D3B8';
          return (
            <div key={i} style={{
              background: '#231510', border: `1px solid ${sloColor}40`, borderRadius: 10,
              borderLeft: `4px solid ${sloColor}`, padding: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 12, fontWeight: 600, color: '#F4E9DF' }}>{t.id} · {t.table}</div>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 13, fontWeight: 700, color: sloColor }}>{t.mins}m</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
                {t.items.map(([q, n, note], j) => (
                  <div key={j} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8 }}>
                    <div style={{ fontFamily: ATLAS_MONO, fontSize: 12, color: p.accent2, fontWeight: 600 }}>{q}×</div>
                    <div>
                      <div style={{ fontSize: 13 }}>{n}</div>
                      {note && <div style={{ fontSize: 10.5, color: '#F59E0B', marginTop: 2, fontFamily: ATLAS_MONO }}>↳ {note}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: '#8C7E72' }}>Mesero · {t.waiter}</div>
                <div style={{ padding: '6px 12px', background: p.accent2, color: '#1A0F0A', borderRadius: 6, fontFamily: ATLAS_MONO, fontSize: 11, fontWeight: 700 }}>SERVIR ✓</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom: shift status */}
      <div style={{ padding: '12px 18px', background: '#0F0805', borderTop: '1px solid #2A1A11' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            ['Servidas', 42, '#22D3B8'],
            ['Tiempo prom.', '9.4m', p.accent2],
            ['Pendientes', 7, p.accent],
          ].map(([l, v, c], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 9.5, color: '#8C7E72', letterSpacing: 0.6, textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: c, marginTop: 2, fontFamily: ATLAS_FONT, letterSpacing: -0.4 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator (iPhone) */}
      <div style={{ paddingBottom: 16, display: 'flex', justifyContent: 'center', background: '#0F0805' }}>
        <div style={{ width: 100, height: 4, background: '#F4E9DF', opacity: 0.4, borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ─── 04 · Hero comercial ──────────────────────────────────────
function RestaurantHero() {
  const p = restP();
  return (
    <HeroBg preset={p}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 80% 110%, ${p.accent}25, transparent 50%), radial-gradient(circle at 10% 0%, ${p.accent2}25, transparent 50%)`,
      }} />

      <div style={{ width: '100%', height: '100%', display: 'flex', padding: '60px 70px', gap: 36, fontFamily: ATLAS_FONT, position: 'relative' }}>
        {/* Left copy */}
        <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <div style={{ padding: '5px 10px', background: p.accent, color: '#fff', borderRadius: 999, fontFamily: ATLAS_MONO, fontSize: 11, letterSpacing: 0.6, fontWeight: 500 }}>PRESET 06</div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: p.accentInk, letterSpacing: 1.4, textTransform: 'uppercase' }}>Salón · comanda · cocina</div>
          </div>
          <div style={{ fontFamily: ATLAS_SERIF, fontSize: 60, fontWeight: 500, lineHeight: 1, letterSpacing: -1.6, color: N.ink }}>
            Atlas One <span style={{ color: p.accent, fontStyle: 'italic' }}>Restaurant</span>
          </div>
          <div style={{ fontFamily: ATLAS_SERIF, fontSize: 28, fontWeight: 400, lineHeight: 1.15, marginTop: 14, letterSpacing: -0.4, color: N.body }}>
            Del plano de mesas a la cocina, sin perder un solo pedido.
          </div>
          <div style={{ fontSize: 15, color: N.body, lineHeight: 1.6, margin: '22px 0 28px', maxWidth: 460 }}>
            Operación conectada para restaurantes con mesa o mostrador. Mesas, comandas, KDS de cocina, recetas e insumos — sincronizados con la caja y los reportes por turno.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            {[
              ['24 mesas', 'configurables por zona'],
              ['7 tiempos', 'de cocina paralelos'],
              ['KDS', 'tablet o pantalla'],
              ['Recetas', 'con merma y costo'],
            ].map(([k, v], i) => (
              <div key={i} style={{ paddingLeft: 12, borderLeft: `2px solid ${p.accent}` }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: N.ink, letterSpacing: -0.3 }}>{k}</div>
                <div style={{ fontSize: 11.5, color: N.muted, fontFamily: ATLAS_MONO, marginTop: 2, letterSpacing: 0.3 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button label="Probar 1 mes gratis" kind="primary" preset={p} icon={Icon.arrowRight} />
            <Button label="Ver demo" kind="secondary" />
          </div>
        </div>

        {/* Right: devices */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Tablet (comanda) on top */}
          <div style={{ position: 'absolute', top: 20, right: 0 }}>
            <TabletFrame width={580}>
              <div style={{ width: 1280, height: 800, transform: 'scale(0.434)', transformOrigin: 'top left' }}>
                <RestaurantTouch />
              </div>
            </TabletFrame>
          </div>
          {/* Laptop in front showing plano de mesas */}
          <div style={{ position: 'absolute', bottom: 0, left: -30 }}>
            <LaptopFrame width={620}>
              <div style={{ width: 1440, height: 900, transform: 'scale(0.418)', transformOrigin: 'top left' }}>
                <RestaurantDesktop />
              </div>
            </LaptopFrame>
          </div>

          {/* Floating mesa card */}
          <div style={{
            position: 'absolute', top: 360, right: 20, padding: 14,
            background: '#fff', borderRadius: 12, width: 220,
            boxShadow: `0 12px 32px ${p.accent}30`,
            border: `1.5px solid ${p.accent}`,
            transform: 'rotate(-2deg)',
          }}>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: p.accentInk, letterSpacing: 0.6, textTransform: 'uppercase' }}>Mesa T2 · terraza</div>
            <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4, letterSpacing: -0.6, color: N.ink }}>6 personas</div>
            <div style={{ fontSize: 11.5, color: N.muted, marginTop: 2 }}>Mesera · Carla R.</div>
            <div style={{ marginTop: 10, padding: '8px 10px', background: p.accentSoft, borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 11, color: p.accentInk, fontFamily: ATLAS_MONO }}>14 items · 48m</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: p.accent, fontFamily: ATLAS_FONT }}>{mxn(1860)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 70px', display: 'flex', alignItems: 'center', gap: 16,
        borderTop: `1px solid ${p.accent}20`, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
      }}>
        <Wordmark color={N.ink} accent={p.accent} size={13} />
        <div style={{ width: 1, height: 18, background: N.line2 }} />
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: N.muted, letterSpacing: 0.6 }}>MESAS · COMANDAS · COCINA · RECETAS · TURNOS</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: N.muted }}>atlas.tech / restaurant</div>
      </div>
    </HeroBg>
  );
}

Object.assign(window, { RestaurantDesktop, RestaurantTouch, RestaurantMobile, RestaurantHero });
