import React, { useState } from "react";
import {
  N, ATLAS_FONT, ATLAS_MONO, ATLAS_SERIF,
  Icon, mxn, mxnInt,
  Wordmark, AtlasMark, Sidebar, SidebarUser, Topbar, SearchInput, Button,
  Card, SectionTitle, Kpi, Sparkline, BarChart, LineChart, Donut, Badge,
  HeroBg, Stat, Legend, Avatar,
  LaptopFrame, TabletFrame, PhoneFrame, PRESETS, GenericHero,
} from "./shared";
import type { PresetConfig, IconProps } from "./shared";

// Re-export del sistema de diseño para los módulos screens/<preset>.tsx
// (deben importar de "../AtlasOneDemos"; shared se evalúa primero, evitando TDZ)
export {
  N, ATLAS_FONT, ATLAS_MONO, ATLAS_SERIF,
  Icon, mxn, mxnInt,
  Wordmark, AtlasMark, Sidebar, SidebarUser, Topbar, SearchInput, Button,
  Card, SectionTitle, Kpi, Sparkline, BarChart, LineChart, Donut, Badge,
  HeroBg, Stat, Legend, Avatar,
  LaptopFrame, TabletFrame, PhoneFrame, PRESETS, GenericHero,
};
export type { PresetConfig, IconProps };

import { CafeDesktop, CafeTouch, CafeHero } from "./screens/cafe";
import { BeautyDesktop, BeautyTouch, BeautyHero } from "./screens/beauty";
import { HealthDesktop, HealthTouch, HealthHero } from "./screens/health";
import { BarDesktop, BarTouch, BarHero } from "./screens/bar";
import { ServicesDesktop, ServicesTouch, ServicesHero } from "./screens/services";
import { EnterpriseDesktop, EnterpriseTouch, EnterpriseHero } from "./screens/enterprise";
import { CustomDesktop, CustomTouch, CustomHero } from "./screens/custom";
import { BarberMobile, BarberHero } from "./screens/barber";
import { RestaurantTouch, RestaurantMobile, RestaurantHero } from "./screens/restaurant";
// ============================================================
// 1. PRESET: POS (SCREEN VIEWS)
// ============================================================
const posSidebarItems = [
  { header: 'Operación' },
  { icon: Icon.cart,    label: 'Punto de venta' },
  { icon: Icon.receipt, label: 'Caja', badge: '3' },
  { icon: Icon.pkg,     label: 'Productos' },
  { icon: Icon.users,   label: 'Clientes' },
  { header: 'Analítica' },
  { icon: Icon.chart,   label: 'Reportes' },
  { icon: Icon.bars,    label: 'Tickets' },
  { icon: Icon.branch,  label: 'Sucursales' },
  { header: 'Sistema' },
  { icon: Icon.user,    label: 'Usuarios' },
  { icon: Icon.cog,     label: 'Ajustes' },
];

export const PosDesktop: React.FC = () => {
  const p = PRESETS.pos;
  return (
    <div style={{ display: 'flex', width: 1440, height: 900, background: N.canvas, fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <Sidebar preset={p} active="Punto de venta" items={posSidebarItems}
        footer={<SidebarUser preset={p} name="Ana Lozano" role="Cajera principal" branch="MX-01 Roma" />} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar title="Panel de operación" sub="VIERNES · 25 NOV 2026 · TURNO MAÑANA" preset={p}
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SearchInput preset={p} width={300} />
              <Icon.bell size={18} color={N.muted} />
              <Button label="Nueva venta" kind="primary" preset={p} icon={Icon.plus} />
            </div>
          }
        />
        <div style={{ flex: 1, padding: '22px 28px', background: N.page, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Badge color="#0E8A4E" soft="#E3F4EA" dot>Caja abierta · 09:12</Badge>
            <Badge color={p.accentInk} soft={p.accentSoft} dot>Sucursal MX-01 Roma</Badge>
            <Badge color="#6B6B66" soft={N.chip}>Apertura · {mxn(1500)}</Badge>
            <div style={{ flex: 1 }} />
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>Últ. sincronización · hace 4 s</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            <Kpi label="Ventas del turno"   value={mxnInt(28430)} delta="+18.2%" trend={[3,5,4,6,7,6,8,9,8,11,12,14]} accent={p.accent} />
            <Kpi label="Tickets cobrados"   value="143"           delta="+9.1%"  trend={[5,6,7,6,8,9,8,10,11,12,11,13]} accent={p.accent} />
            <Kpi label="Ticket promedio"    value={mxn(198.81)}   delta="+3.4%"  trend={[6,7,7,8,7,9,8,8,9,10,9,10]} accent={p.accent} />
            <Kpi label="Productos vendidos" value="412"           sub="48 SKUs activos · 2 sin stock" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 14, flex: 1 }}>
            <Card pad={20} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Ventas por hora</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing: -0.2 }}>Hoy vs. promedio · {mxn(28430)}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 11.5, color: N.muted, fontFamily: ATLAS_MONO }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: p.accent }} />Hoy</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: N.line2 }} />Prom. 30d</span>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LineChart
                  series={[
                    { values: [2, 4, 5, 8, 12, 18, 22, 19, 17, 21, 28, 32, 28, 24] },
                    { values: [3, 4, 6, 9, 11, 14, 16, 17, 16, 18, 21, 24, 22, 20] },
                  ]}
                  width={600} height={200}
                  color={p.accent} color2={N.line2}
                  labels={['09','10','11','12','13','14','15','16','17','18','19','20','21','22']}
                />
              </div>
            </Card>
            <Card pad={20}>
              <SectionTitle action="Ver todos">Productos más vendidos</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                {[
                  ['Café americano 12 oz',  42, 1596, 0.92],
                  ['Croissant mantequilla', 31, 1395, 0.74],
                  ['Latte vainilla 16 oz',  28, 1568, 0.66],
                  ['Cookie chocolate',      24,  720, 0.56],
                  ['Sandwich pavo',         19, 1330, 0.46],
                ].map(([name, qty, totalVal, pct], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1.2fr 50px 80px', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>{String(i+1).padStart(2,'0')}</div>
                    <div>
                      <div style={{ fontSize: 13, color: N.ink }}>{name}</div>
                      <div style={{ height: 3, background: N.line, borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
                        <div style={{ width: `${Number(pct)*100}%`, height: '100%', background: p.accent }} />
                      </div>
                    </div>
                    <div style={{ fontFamily: ATLAS_MONO, fontSize: 12, color: N.muted, textAlign: 'right' }}>{qty} pz</div>
                    <div style={{ fontFamily: ATLAS_MONO, fontSize: 13, color: N.ink, textAlign: 'right', fontWeight: 500 }}>{mxn(Number(totalVal))}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PosTouch: React.FC = () => {
  const p = PRESETS.pos;
  const products = [
    { name: 'Americano',         price: 38,  cat: 'Café' },
    { name: 'Latte vainilla',    price: 52,  cat: 'Café' },
    { name: 'Capuchino',         price: 48,  cat: 'Café' },
    { name: 'Cold brew',         price: 58,  cat: 'Frío' },
    { name: 'Croissant',         price: 45,  cat: 'Pan' },
    { name: 'Concha vainilla',   price: 22,  cat: 'Pan' },
    { name: 'Sandwich pavo',     price: 70,  cat: 'Sand.' },
    { name: 'Cookie chocolate',  price: 30,  cat: 'Postre' },
  ];
  return (
    <div style={{ width: 1280, height: 800, background: N.canvas, display: 'flex', fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: N.card, borderBottom: `1px solid ${N.line}` }}>
          <Wordmark color={N.ink} accent={p.accent} size={14} sub="POS · MX-01" />
          <div style={{ width: 1, height: 24, background: N.line }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, flex: 1,
            padding: '10px 14px', background: N.page, border: `1px solid ${N.line}`, borderRadius: 8,
            fontSize: 13.5, color: N.muted,
          }}>
            <Icon.search size={16} color={N.muted} /> Buscar producto o escanear código…
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: ATLAS_MONO, fontSize: 11.5, color: N.muted }}>
            <Badge color="#0E8A4E" soft="#E3F4EA" dot>Caja · Ana L.</Badge>
            <span>14:32</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '14px 20px', background: N.card, borderBottom: `1px solid ${N.line}`, overflow: 'hidden' }}>
          {['Todos (86)', 'Cafés (18)', 'Panadería (24)', 'Sandwiches (12)', 'Bebidas (16)'].map((c, i) => (
            <div key={i} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 13,
              background: i === 0 ? p.accent : N.page,
              color: i === 0 ? '#fff' : N.body,
              border: i === 0 ? 'none' : `1px solid ${N.line}`,
              fontWeight: i === 0 ? 500 : 400,
            }}>{c}</div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '16px 20px', background: N.page, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {products.map((pr, i) => (
              <div key={i} style={{
                background: N.card, border: `1px solid ${N.line}`, borderRadius: 12,
                padding: 14, height: 130, display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
              }}>
                <div style={{
                  flex: 1, borderRadius: 8, background: `${p.accentSoft}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: p.accent, fontFamily: ATLAS_MONO, fontSize: 10, letterSpacing: 0.8,
                  marginBottom: 10,
                }}>{pr.cat.toUpperCase()}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{pr.name}</div>
                <div style={{ fontSize: 14, fontFamily: ATLAS_MONO, fontWeight: 600, color: p.accent, marginTop: 2 }}>{mxn(pr.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: 360, background: N.card, borderLeft: `1px solid ${N.line}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 20px', borderBottom: `1px solid ${N.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Ticket · A-01422</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>Mostrador</div>
            </div>
            <div style={{
              padding: '6px 10px', background: p.accentSoft, color: p.accentInk,
              borderRadius: 6, fontFamily: ATLAS_MONO, fontSize: 11, fontWeight: 500, cursor: 'pointer'
            }}>+ Cliente</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '10px 20px', overflowY: 'auto' }}>
          {[
            { name: 'Latte vainilla',    qty: 2, price: 52 },
            { name: 'Croissant',         qty: 1, price: 45 },
            { name: 'Sandwich pavo',     qty: 1, price: 70 },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '32px 1fr 80px',
              alignItems: 'center', gap: 8, padding: '12px 0',
              borderBottom: `1px solid ${N.line}`,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, background: p.accentSoft,
                color: p.accent, fontFamily: ATLAS_MONO, fontSize: 13, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.qty}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, marginTop: 2 }}>{mxn(item.price)}</div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: ATLAS_MONO, fontSize: 13.5, fontWeight: 600 }}>{mxn(item.qty * item.price)}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 20px', background: N.page, borderTop: `1px solid ${N.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: N.muted }}>Total cobro</span>
            <span style={{ fontFamily: ATLAS_MONO, fontSize: 24, fontWeight: 600, color: N.ink }}>{mxn(219.00)}</span>
          </div>
          <Button label="Proceder al cobro" kind="primary" preset={p} icon={Icon.arrowRight} />
        </div>
      </div>
    </div>
  );
};

export const PosMobile: React.FC = () => {
  const p = PRESETS.pos;
  return (
    <div style={{ width: 390, height: 844, background: N.page, display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT, overflow: 'hidden', textAlign: 'left' }}>
      <div style={{ padding: '18px 18px 14px', background: N.card, borderBottom: `1px solid ${N.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.8 }}>HOLA, ANA</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>Sucursal Roma</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: p.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.accent }}>
            <Icon.bell size={17} />
          </div>
        </div>
        <div style={{
          background: p.accent, color: '#fff', borderRadius: 12, padding: 14,
          backgroundImage: `linear-gradient(135deg, ${p.accent}, ${p.accentInk})`,
        }}>
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, opacity: 0.85, letterSpacing: 0.6 }}>VENTAS DEL TURNO</div>
          <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4, letterSpacing: -0.6 }}>{mxn(28430.00)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, fontFamily: ATLAS_MONO, opacity: 0.85 }}>
            <span>143 tks</span>
            <span>Prom. {mxn(198.81)}</span>
            <span>+18.2%</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { icon: Icon.cart, l: 'Vender' },
          { icon: Icon.receipt, l: 'Caja' },
          { icon: Icon.pkg, l: 'Stock' },
          { icon: Icon.chart, l: 'Reporte' },
        ].map((a, i) => {
          const IconCmp = a.icon;
          return (
            <div key={i} style={{ background: N.card, border: `1px solid ${N.line}`, borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <IconCmp size={20} color={p.accent} />
              <div style={{ fontSize: 10.5, color: N.body }}>{a.l}</div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '0 18px 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Últimos tickets</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['#A-01421', 'Tarjeta', 348.00, '14:32', '#0E8A4E'],
            ['#A-01420', 'Efectivo', 86.00, '14:28', '#9A6610'],
            ['#A-01419', 'Tarjeta', 412.50, '14:24', '#0E8A4E'],
          ].map(([id, method, amt, time, col], i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '8px 1fr 80px', gap: 10,
              padding: '10px 12px', alignItems: 'center', background: N.card, border: `1px solid ${N.line}`, borderRadius: 8,
            }}>
              <div style={{ width: 4, height: 24, background: String(col), borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{id}</div>
                <div style={{ fontSize: 10, fontFamily: ATLAS_MONO, color: N.muted, marginTop: 1 }}>{time} · {method}</div>
              </div>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 12.5, fontWeight: 600, textAlign: 'right' }}>{mxn(Number(amt))}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: N.card, borderTop: `1px solid ${N.line}`, padding: '8px 8px 24px' }}>
        {[{ icon: Icon.home, l: 'Inicio' }, { icon: Icon.cart, l: 'Vender', active: true }, { icon: Icon.chart, l: 'Reportes' }, { icon: Icon.user, l: 'Cuenta' }].map((n, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <n.icon size={18} color={n.active ? p.accent : N.muted} />
            <div style={{ fontSize: 9.5, color: n.active ? p.accent : N.muted, fontFamily: ATLAS_MONO }}>{n.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// 2. PRESET: RETAIL (SCREEN VIEWS)
// ============================================================
const retailSidebarItems = [
  { header: 'Mostrador' },
  { icon: Icon.cart,    label: 'Punto de venta' },
  { icon: Icon.receipt, label: 'Caja',           badge: '4' },
  { header: 'Inventario' },
  { icon: Icon.pkg,     label: 'Productos',      badge: 'ACTIVO' },
  { icon: Icon.tag,     label: 'Códigos · SKU' },
  { icon: Icon.warning, label: 'Stock crítico',  badge: '12' },
  { icon: Icon.truck,   label: 'Compras' },
  { header: 'Negocio' },
  { icon: Icon.users,   label: 'Clientes' },
  { icon: Icon.chart,   label: 'Reportes' },
  { icon: Icon.branch,  label: 'Sucursales',     badge: '3' },
];

export const RetailDesktop: React.FC = () => {
  const p = PRESETS.retail;
  const products = [
    ['78214-001', 'Pintura vinílica 19 L · blanco hueso',    'Pinturas',     289.00,   4,  'crit'],
    ['66102-114', 'Taladro percutor 13 mm DeWalt',           'Eléctrico',   1899.00,   6,  'ok'],
    ['44021-380', 'Tornillo galvanizado 1/4" · caja 100',    'Ferretería',    86.00, 322,  'ok'],
    ['12330-100', 'Cinta aislante eléctrica · negra',        'Eléctrico',     24.00, 378,  'ok'],
    ['89221-005', 'Bomba sumergible 1/2 HP',                 'Plomería',    2890.00,   3,  'crit'],
  ];
  return (
    <div style={{ display: 'flex', width: 1440, height: 900, background: N.canvas, fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <Sidebar preset={p} active="Productos" items={retailSidebarItems}
        footer={<SidebarUser preset={p} name="Carlos Mendoza" role="Gerente" branch="Multisucursal" />} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar title="Inventario maestro" sub="3 SUCURSALES · 2 481 SKUS ACTIVOS · ACT. HACE 2 MIN" preset={p}
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SearchInput preset={p} placeholder="Buscar SKU, código..." width={300} />
              <Button label="+ Producto" kind="primary" preset={p} icon={Icon.plus} />
            </div>
          }
        />
        <div style={{ flex: 1, padding: '20px 24px', background: N.page, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <Kpi label="Valor de inventario"  value={mxnInt(1842360)} delta="+2.1%" trend={[10,11,12,11,13,12,13,14,13,14,15,14]} accent={p.accent} />
            <Kpi label="SKUs activos"         value="2 481"           sub="98% con código de barras" />
            <Kpi label="Stock crítico"        value="12"              sub="≤ 25% del mínimo" />
            <Kpi label="Rotación · 30d"       value="4.2×"            delta="+0.4×" trend={[3,3,4,4,4,5,4,4,5,4,5,5]} accent={p.accent2} />
          </div>
          <Card pad={0} style={{ overflow: 'hidden', flex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 2fr 100px 100px 100px 100px',
              padding: '12px 18px', background: N.page,
              fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.5, textTransform: 'uppercase',
              borderBottom: `1px solid ${N.line}`,
            }}>
              <div>SKU</div>
              <div>Producto · Categoría</div>
              <div style={{ textAlign: 'right' }}>Precio</div>
              <div style={{ textAlign: 'right' }}>Stock</div>
              <div style={{ textAlign: 'center' }}>Estado</div>
              <div></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {products.map((row, i) => {
                const [sku, name, cat, price, total, status] = row;
                return (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 2fr 100px 100px 100px 100px',
                    padding: '14px 18px', borderBottom: `1px solid ${N.line}`,
                    fontSize: 13, alignItems: 'center',
                  }}>
                    <div style={{ fontFamily: ATLAS_MONO, color: N.muted, fontSize: 11 }}>{String(sku)}</div>
                    <div>
                      <div style={{ fontWeight: 500, color: N.ink }}>{String(name)}</div>
                      <div style={{ fontSize: 10.5, color: N.muted, marginTop: 2, fontFamily: ATLAS_MONO }}>{String(cat).toUpperCase()}</div>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: ATLAS_MONO }}>{mxn(Number(price))}</div>
                    <div style={{ textAlign: 'right', fontFamily: ATLAS_MONO, fontWeight: 600 }}>{String(total)}</div>
                    <div style={{ textAlign: 'center' }}>
                      {status === 'ok' && <Badge color="#0E8A4E" soft="#E3F4EA" dot>OK</Badge>}
                      {status === 'crit' && <Badge color="#B43E2E" soft="#FBE7E1" dot>Crítico</Badge>}
                    </div>
                    <div style={{ textAlign: 'right' }}><Icon.more size={16} color={N.muted} /></div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const RetailTouch: React.FC = () => {
  const p = PRESETS.retail;
  return (
    <div style={{ width: 1280, height: 800, background: N.canvas, display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', background: N.card, borderBottom: `1px solid ${N.line}` }}>
        <Wordmark color={N.ink} accent={p.accent} size={14} sub="RETAIL · MX-02 Coyoacán" />
        <div style={{ width: 1, height: 22, background: N.line }} />
        <Badge color="#0E8A4E" soft="#E3F4EA" dot>Caja 02 abierta · Pedro M.</Badge>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>
          <span>Ticket · R-23119</span>
          <span>14:32</span>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: 22, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          <div style={{
            background: N.card, border: `2px solid ${p.accent}`, borderRadius: 12,
            padding: 18, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10, background: p.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon.qr size={22} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: N.muted, letterSpacing: 0.6 }}>ESCANEAR O TECLEAR CODIGO</div>
              <div style={{ fontSize: 20, fontFamily: ATLAS_MONO, color: N.ink, marginTop: 4, letterSpacing: 1 }}>Escriba código de barras…</div>
            </div>
          </div>
          <Card pad={0} style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: `1px solid ${N.line}` }}>
              <div style={{ fontSize: 13, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 0.6, textTransform: 'uppercase' }}>Productos recomendados</div>
            </div>
            {[
              ['44021-380', 'Tornillo galvanizado 1/4"', 86.00,  142],
              ['12330-100', 'Cinta aislante eléctrica negra', 24.00,  218],
              ['66102-114', 'Taladro percutor DeWalt 13mm', 1899.00, 8],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '110px 1fr 100px 50px',
                padding: '12px 18px', alignItems: 'center', gap: 10,
                borderBottom: `1px solid ${N.line}`,
              }}>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>{row[0]}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{row[1]}</div>
                <div style={{ textAlign: 'right', fontFamily: ATLAS_MONO, fontSize: 14, fontWeight: 600 }}>{mxn(Number(row[2]))}</div>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, background: p.accentSoft, color: p.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}>+</div>
              </div>
            ))}
          </Card>
        </div>
        <div style={{ width: 360, background: N.card, borderLeft: `1px solid ${N.line}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${N.line}` }}>
            <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 0.8, textTransform: 'uppercase' }}>Cliente</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>Constructora Real</div>
          </div>
          <div style={{ flex: 1, padding: '10px 20px', overflowY: 'auto' }}>
            <div style={{ fontSize: 12, color: N.muted, textAlign: 'center', marginTop: 40 }}>El carrito está vacío. Agregue productos.</div>
          </div>
          <div style={{ padding: '16px 20px', background: N.page, borderTop: `1px solid ${N.line}` }}>
            <Button label="Seleccionar método de cobro" kind="primary" preset={p} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const RetailMobile: React.FC = () => {
  const p = PRESETS.retail;
  return (
    <div style={{ width: 390, height: 844, background: N.page, display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT, overflow: 'hidden', textAlign: 'left' }}>
      <div style={{ padding: '18px 18px 14px', background: N.card, borderBottom: `1px solid ${N.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.8 }}>INVENTARIO</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>Stock crítico</div>
          </div>
          <Badge color="#B43E2E" soft="#FBE7E1" dot>12 SKU</Badge>
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${p.sidebar.bg}, ${p.accent})`, color: '#fff',
          borderRadius: 12, padding: 14,
        }}>
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, opacity: 0.85, letterSpacing: 0.6 }}>VALOR DE INVENTARIO</div>
          <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4, letterSpacing: -0.6 }}>{mxnInt(1842360)}</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, fontFamily: ATLAS_MONO, opacity: 0.85 }}>
            <div><span style={{ opacity: 0.6 }}>SKUs · </span>2 481</div>
            <div><span style={{ opacity: 0.6 }}>Suc · </span>3</div>
            <div><span style={{ opacity: 0.6 }}>Rot · </span>4.2×</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 18px 6px', display: 'flex', gap: 6, overflow: 'hidden' }}>
        {['Crítico', 'Bajo', 'Sin movimiento', 'Por reorden'].map((c, i) => (
          <div key={c} style={{
            padding: '6px 12px', borderRadius: 999,
            background: i === 0 ? p.accent : N.card, color: i === 0 ? '#fff' : N.body,
            border: i === 0 ? 'none' : `1px solid ${N.line}`,
            fontSize: 12, fontWeight: i === 0 ? 500 : 400, whiteSpace: 'nowrap',
          }}>{c}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '8px 18px 8px', overflowY: 'auto' }}>
        {[
          ['78214-001', 'Pintura vinílica 19 L · blanco hueso', 4, 24, '#B43E2E'],
          ['89221-005', 'Bomba sumergible 1/2 HP', 2, 6, '#B43E2E'],
          ['12330-090', 'Cinta teflón 1/2" · pulgada', 6, 30, '#B43E2E'],
          ['78215-014', 'Esmalte mate 1L · gris',  3, 18, '#B43E2E'],
        ].map(([sku, name, current, min, c], i) => (
          <div key={i} style={{
            background: N.card, border: `1px solid ${N.line}`, borderRadius: 10,
            padding: 12, marginBottom: 8, display: 'flex', gap: 10,
          }}>
            <div style={{ width: 4, background: String(c), borderRadius: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: N.muted }}>{sku}</div>
                <div style={{ fontFamily: ATLAS_MONO, fontSize: 12, color: String(c), fontWeight: 600 }}>{current}/{min}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{name}</div>
              <div style={{ marginTop: 8, height: 3, background: N.line, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${(Number(current) / Number(min)) * 100}%`, height: '100%', background: String(c) }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', background: N.card, borderTop: `1px solid ${N.line}`, padding: '8px 8px 24px' }}>
        {[
          { icon: Icon.home, l: 'Inicio' },
          { icon: Icon.pkg, l: 'Stock', active: true },
          { icon: Icon.qr, l: '', primary: true },
          { icon: Icon.truck, l: 'Compras' },
          { icon: Icon.chart, l: 'Reportes' },
        ].map((n, i) => {
          const IconCmp = n.icon;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {n.primary ? (
                <div style={{ width: 42, height: 42, borderRadius: 12, background: p.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 14px ${p.accent}40` }}>
                  <IconCmp size={20} color="#fff" strokeWidth={2} />
                </div>
              ) : (
                <>
                  <IconCmp size={20} color={n.active ? p.accent : N.muted} />
                  <div style={{ fontSize: 9.5, color: n.active ? p.accent : N.muted, fontFamily: ATLAS_MONO }}>{n.l}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// 3. PRESET: BARBER (SCREEN VIEWS)
// ============================================================
const barberSidebarItems = [
  { header: 'Hoy' },
  { icon: Icon.calendar, label: 'Agenda',          badge: '18' },
  { icon: Icon.scissors, label: 'Servicios' },
  { icon: Icon.user,     label: 'Barberos' },
  { header: 'Negocio' },
  { icon: Icon.users,    label: 'Clientes' },
  { icon: Icon.pkg,      label: 'Productos' },
  { icon: Icon.star,     label: 'Paquetes' },
  { icon: Icon.bars,     label: 'Comisiones' },
];

export const BarberDesktop: React.FC = () => {
  const p = PRESETS.barber;
  const barbersList = [
    { name: 'Diego R.',    role: 'Senior',   color: '#22D3B8' },
    { name: 'Marco V.',    role: 'Master',   color: '#A78BFA' },
    { name: 'Iván S.',     role: 'Junior',   color: '#F59E0B' },
  ];
  return (
    <div style={{ display: 'flex', width: 1440, height: 900, background: N.canvas, fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <Sidebar preset={p} active="Agenda" items={barberSidebarItems}
        footer={<SidebarUser preset={p} name="Diego Reyes" role="Owner" branch="Polanco" />} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar title="Agenda · viernes 25 de noviembre" sub="18 CITAS · 4 BARBEROS · OCUPACIÓN 82%" preset={p}
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Button label="+ Cita" kind="primary" preset={p} icon={Icon.plus} />
            </div>
          }
        />
        <div style={{ flex: 1, padding: '18px 22px 22px', background: '#FAF8F2', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <Kpi label="Citas del día" value="18" sub="3 walk-in · 1 cancelada" />
            <Kpi label="Ventas estimadas" value={mxnInt(7240)} delta="+11%" trend={[3,4,5,4,6,7,6,8,9,8,10,11]} accent={p.accent} />
            <Kpi label="Ticket promedio" value={mxn(412.00)} delta="+5%" trend={[5,6,7,6,8,7,8,9,8,9,10,10]} accent={p.accent} />
            <Kpi label="Ocupación" value="82%" sub="42 de 51 slots · 4 sillas" />
          </div>
          <div style={{ flex: 1, background: N.card, border: `1px solid ${N.line}`, borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `80px repeat(${barbersList.length}, 1fr)`, borderBottom: `1px solid ${N.line}`, background: N.page }}>
              <div style={{ padding: '14px 10px', fontFamily: ATLAS_MONO, fontSize: 10, color: N.muted, letterSpacing: 0.5 }}>HORA</div>
              {barbersList.map((b, i) => (
                <div key={i} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, borderLeft: `1px solid ${N.line}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 11, color: '#0B0B0B' }}>
                    {b.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{b.name}</div>
                    <div style={{ fontSize: 9.5, fontFamily: ATLAS_MONO, color: N.muted }}>{b.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
              {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'].map((timeSlot, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: `80px repeat(${barbersList.length}, 1fr)`, borderBottom: `1px solid ${N.line}`, minHeight: 60 }}>
                  <div style={{ padding: '12px 10px', fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted }}>{timeSlot}</div>
                  {barbersList.map((b, bi) => (
                    <div key={bi} style={{ borderLeft: `1px solid ${N.line}`, padding: 8, position: 'relative' }}>
                      {bi === 0 && i === 2 && (
                        <div style={{ background: '#22D3B838', borderLeft: '3px solid #22D3B8', borderRadius: 4, padding: '4px 8px', fontSize: 11, color: N.ink }}>
                          <strong>Carlos V.</strong>
                          <div style={{ fontSize: 9.5, opacity: 0.8 }}>Corte + lavado</div>
                        </div>
                      )}
                      {bi === 1 && i === 1 && (
                        <div style={{ background: '#A78BFA38', borderLeft: '3px solid #A78BFA', borderRadius: 4, padding: '4px 8px', fontSize: 11, color: N.ink }}>
                          <strong>Tomás L.</strong>
                          <div style={{ fontSize: 9.5, opacity: 0.8 }}>Barba completa</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BarberTouch: React.FC = () => {
  const p = PRESETS.barber;
  return (
    <div style={{ width: 1280, height: 800, background: '#0F0F10', color: '#E8E6E2', display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', background: '#0B0B0C', borderBottom: '1px solid #1A1A1B' }}>
        <Wordmark color="#E8E6E2" accent={p.accent2} size={14} sub="BARBER · POLANCO" />
        <div style={{ width: 1, height: 22, background: '#2A2A2B' }} />
        <Badge color={p.accent2} soft="rgba(34,211,184,0.12)" dot>RECEPCIÓN EN VIVO</Badge>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: '#7A7872' }}>14:24</div>
      </div>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: 22, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: '#7A7872', letterSpacing: 0.8, textTransform: 'uppercase' }}>En la silla · Servicios activos</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { barber: 'Diego R.',  chair: 1, client: 'Carlos V.',   svc: 'Corte + barba', remain: 24, total: 60, accent: '#22D3B8' },
              { barber: 'Marco V.',  chair: 2, client: 'Tomás L.',    svc: 'Corte clásico', remain: 14, total: 45, accent: '#A78BFA' },
            ].map((c, i) => (
              <div key={i} style={{ background: '#16161A', border: '1px solid #232327', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: '#7A7872' }}>SILLA {c.chair}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{c.client}</div>
                    <div style={{ fontSize: 12, color: '#7A7872', marginTop: 2 }}>{c.svc} · {c.barber}</div>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: c.accent, color: '#0b0b0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
                    {c.barber.split(' ')[0][0]}
                  </div>
                </div>
                <div style={{ marginTop: 14, height: 4, background: '#26262A', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${((c.total - c.remain) / c.total) * 100}%`, height: '100%', background: c.accent }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: ATLAS_MONO, fontSize: 10.5, color: '#7A7872' }}>
                  <span>Progreso</span>
                  <span style={{ color: c.accent }}>{c.remain}m restantes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 320, background: '#0B0B0C', borderLeft: '1px solid #1A1A1B', padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: '#7A7872', letterSpacing: 0.8, textTransform: 'uppercase' }}>Walk-in Rápido</div>
          <div style={{ background: '#16161A', padding: 14, borderRadius: 8, border: '1px solid #232327', fontSize: 13 }}>
            Presione para asignar un cliente al siguiente barbero libre en turno.
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Button label="Nueva Cita" kind="primary" preset={p} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 4. PRESET: RESTAURANT (SCREEN VIEWS)
// ============================================================
const restSidebarItems = [
  { header: 'Salón' },
  { icon: Icon.table,    label: 'Plano de mesas', badge: '24' },
  { icon: Icon.receipt,  label: 'Comandas',       badge: '11' },
  { icon: Icon.users,    label: 'Meseros' },
  { header: 'Cocina' },
  { icon: Icon.flame,    label: 'KDS · Cocina',    badge: '7' },
  { icon: Icon.utensils, label: 'Menú · Recetas' },
];

export const RestaurantDesktop: React.FC = () => {
  const p = PRESETS.restaurant;
  return (
    <div style={{ display: 'flex', width: 1440, height: 900, background: '#FAF5EF', fontFamily: ATLAS_FONT, textAlign: 'left' }}>
      <Sidebar preset={p} active="Plano de mesas" items={restSidebarItems}
        footer={<SidebarUser preset={p} name="Mariana Suárez" role="Hostess" branch="Centro" />} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar title="Plano del salón" sub="VIERNES · TURNO NOCHE · 14 MESAS OCUPADAS / 17" preset={p}
          right={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Button label="+ Comanda" kind="primary" preset={p} icon={Icon.plus} />
            </div>
          }
        />
        <div style={{ flex: 1, padding: '16px 24px 22px', background: '#FAF5EF', overflow: 'hidden', display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, background: N.card, border: `1px solid ${N.line}`, borderRadius: 12, padding: 16, position: 'relative' }}>
            <div style={{ display: 'flex', gap: 14, marginBottom: 12, fontFamily: ATLAS_MONO, fontSize: 11, color: N.muted, letterSpacing: 0.6 }}>
              <span>● Bar</span><span>● Salón principal</span><span>● Terraza</span>
            </div>
            <div style={{ position: 'relative', height: 480, background: '#FAF5EF', borderRadius: 8, border: `1px dashed ${N.line2}`, display: 'flex', flexWrap: 'wrap', gap: 14, padding: 20, alignContent: 'flex-start' }}>
              {['B1', 'B2', 'B3', '01', '02', '03', '04', '05', '06', 'T1', 'T2', 'P1', 'P2'].map((tableId) => {
                const isOcupada = ['B1', '01', '05', 'T2', 'P1'].includes(tableId);
                const color = isOcupada ? p.accent : N.line2;
                const bg = isOcupada ? p.accentSoft : '#FFF';
                return (
                  <div key={tableId} style={{
                    width: 70, height: 70, borderRadius: '50%', background: bg, border: `2px solid ${color}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isOcupada ? p.accentInk : N.muted }}>{tableId}</span>
                    <span style={{ fontSize: 9, fontFamily: ATLAS_MONO, color: N.muted }}>{isOcupada ? 'Ocupada' : 'Libre'}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card pad={16} style={{ border: `1.5px solid ${p.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: p.accentInk }}>MESA SELECCIONADA</div>
                  <div style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>P1</div>
                </div>
                <Badge color={p.accentInk} soft={p.accentSoft} dot>En curso</Badge>
              </div>
              <div style={{ marginTop: 12, padding: '8px 10px', background: N.page, borderRadius: 8, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Mesero</span><strong>Mariana S.</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total cuenta</span><strong style={{ fontFamily: ATLAS_MONO }}>$3,420.00</strong>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
                <Button label="Agregar item" kind="secondary" size="sm" />
                <Button label="Cobrar cuenta" kind="primary" preset={p} size="sm" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT: INTERACTIVE PRESET DEMOS INTERACTIVE PLAYER
// ============================================================
// Registro de pantallas por preset. desktop siempre; tablet/mobile/hero opcionales.
// Donde falta hero se usa GenericHero; donde falta mobile, esa pestaña no se muestra.
const SCREENS: Record<string, { desktop: React.FC; tablet?: React.FC; mobile?: React.FC; hero?: React.FC }> = {
  pos:        { desktop: PosDesktop,        tablet: PosTouch,        mobile: PosMobile },
  retail:     { desktop: RetailDesktop,     tablet: RetailTouch,     mobile: RetailMobile },
  barber:     { desktop: BarberDesktop,     tablet: BarberTouch,     mobile: BarberMobile,     hero: BarberHero },
  restaurant: { desktop: RestaurantDesktop, tablet: RestaurantTouch, mobile: RestaurantMobile, hero: RestaurantHero },
  cafe:       { desktop: CafeDesktop,       tablet: CafeTouch,       hero: CafeHero },
  beauty:     { desktop: BeautyDesktop,     tablet: BeautyTouch,     hero: BeautyHero },
  health:     { desktop: HealthDesktop,     tablet: HealthTouch,     hero: HealthHero },
  bar:        { desktop: BarDesktop,        tablet: BarTouch,        hero: BarHero },
  services:   { desktop: ServicesDesktop,   tablet: ServicesTouch,   hero: ServicesHero },
  enterprise: { desktop: EnterpriseDesktop, tablet: EnterpriseTouch, hero: EnterpriseHero },
  custom:     { desktop: CustomDesktop,     tablet: CustomTouch,     hero: CustomHero },
};

export const AtlasOneDemosPlayer: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>("pos");
  const [activeScreen, setActiveScreen] = useState<string>("desktop");

  const preset = PRESETS[activePreset] || PRESETS.pos;
  const entry = SCREENS[activePreset] || SCREENS.pos;

  // Pestañas de pantalla disponibles para el preset activo
  // (Desktop + Ficha siempre; Touch / Móvil solo si el preset las tiene)
  const screenTabs = [
    { key: "desktop", label: "Desktop 🖥" },
    ...(entry.tablet ? [{ key: "tablet", label: "Touch 📱" }] : []),
    ...(entry.mobile ? [{ key: "mobile", label: "Móvil 📱" }] : []),
    { key: "hero", label: "Ficha 📄" },
  ];

  // Renderiza la pantalla activa dentro de su marco de dispositivo
  const renderFrame = () => {
    if (activeScreen === "hero") {
      const Hero = entry.hero;
      return (
        <div style={{ width: "100%", height: 500, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          {Hero ? <Hero /> : <GenericHero preset={preset} />}
        </div>
      );
    }

    if (activeScreen === "tablet" && entry.tablet) {
      const Tablet = entry.tablet;
      return (
        <TabletFrame width={600}>
          <div style={{ width: 1280, height: 800, transform: "scale(0.468)", transformOrigin: "top left" }}>
            <Tablet />
          </div>
        </TabletFrame>
      );
    }

    if (activeScreen === "mobile" && entry.mobile) {
      const Mobile = entry.mobile;
      return (
        <PhoneFrame width={250}>
          <div style={{ width: 390, height: 844, transform: "scale(0.597)", transformOrigin: "top left" }}>
            <Mobile />
          </div>
        </PhoneFrame>
      );
    }

    // Por defecto: vista de escritorio
    const Desktop = entry.desktop;
    return (
      <LaptopFrame width={760}>
        <div style={{ width: 1440, height: 900, transform: "scale(0.527)", transformOrigin: "top left" }}>
          <Desktop />
        </div>
      </LaptopFrame>
    );
  };

  return (
    <div style={{
      background: "#080710", borderRadius: 20, padding: 32,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      color: "#FFF", textAlign: "left"
    }}>
      {/* Preset selector bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: "#a855f7", letterSpacing: 0.15, textTransform: "uppercase", marginBottom: 12 }}>
          Paso 1: Selecciona una industria (Preset)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(PRESETS).map(([key, p]) => {
            const isActive = activePreset === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActivePreset(key);
                  setActiveScreen("desktop");
                }}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: isActive ? `linear-gradient(135deg, ${p.accent}, ${p.accent2})` : "rgba(255,255,255,0.04)",
                  color: isActive ? "#FFF" : "rgba(255,255,255,0.6)",
                  fontSize: 12.5, fontWeight: 600, transition: "all 0.2s",
                  borderLeft: `3px solid ${p.accent}`
                }}
              >
                {p.name.replace("Atlas One ", "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preset info */}
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14, padding: "20px 24px", marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center"
      }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#FFF", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: preset.accent }} />
            {preset.name}
          </div>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", margin: "6px 0 0", lineHeight: 1.4 }}>
            <strong>{preset.tagline}</strong> — {preset.description}
          </p>
        </div>
        
        {/* Paso 2: Selector de pantalla (Desktop / Touch / Móvil / Ficha según el preset) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 10, fontFamily: ATLAS_MONO, color: "rgba(255,255,255,0.4)" }}>
            Paso 2: Cambiar vista
          </div>
          <div style={{ display: "flex", background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 3, border: "1px solid rgba(255,255,255,0.06)" }}>
            {screenTabs.map((scr) => {
              const isAct = activeScreen === scr.key;
              return (
                <button
                  key={scr.key}
                  onClick={() => setActiveScreen(scr.key)}
                  style={{
                    padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                    background: isAct ? preset.accent : "transparent",
                    color: isAct ? "#FFF" : "rgba(255,255,255,0.5)",
                    fontSize: 12, fontWeight: 500, transition: "all 0.2s"
                  }}
                >
                  {scr.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Frame Rendering Container */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 480, background: "rgba(0,0,0,0.15)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.03)" }}>
        {renderFrame()}
      </div>
    </div>
  );
};
