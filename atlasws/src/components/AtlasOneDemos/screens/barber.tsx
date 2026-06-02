import React from "react";
import {
  PRESETS,
  ATLAS_FONT,
  ATLAS_MONO,
  ATLAS_SERIF,
  Icon,
  mxn,
  Wordmark,
  LaptopFrame,
  PhoneFrame,
} from "../shared";
import { BarberDesktop } from "../AtlasOneDemos";

// ─── 03 · Móvil del barbero (vista comisión) ──────────────────
export const BarberMobile: React.FC = () => {
  const p = PRESETS.barber;
  return (
    <div style={{ width: 390, height: 844, background: '#0B0B0C', color: '#E8E6E2', display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT, overflow: 'hidden', textAlign: 'left' }}>
      {/* Header */}
      <div style={{ padding: '18px 18px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#22D3B8', color: '#0B0B0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>DR</div>
            <div>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: '#7A7872', letterSpacing: 0.6 }}>SENIOR · SILLA 1</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>Diego Reyes</div>
            </div>
          </div>
          <Icon.bell size={18} color="#7A7872" />
        </div>

        {/* Earnings card */}
        <div style={{
          background: 'linear-gradient(135deg, #131418, #1F2228)',
          borderRadius: 14, padding: 18, position: 'relative', overflow: 'hidden',
          border: '1px solid #2A2C32',
        }}>
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%',
            background: `radial-gradient(circle, ${p.accent2}30, transparent 70%)`,
          }} />
          <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: '#9C9B95', letterSpacing: 0.8 }}>COMISIÓN ACUMULADA · NOV</div>
          <div style={{ fontSize: 36, fontWeight: 600, marginTop: 6, letterSpacing: -1, fontFamily: ATLAS_FONT }}>
            <span style={{ color: p.accent2 }}>$</span>14,820<span style={{ fontSize: 18, color: '#7A7872', fontFamily: ATLAS_MONO }}>.50</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: 11, fontFamily: ATLAS_MONO, color: '#9C9B95' }}>
            <div><span style={{ color: p.accent2 }}>●</span> 42 servicios</div>
            <div>●  18 productos</div>
            <div>●  9 paquetes</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 18px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          ['Hoy', mxn(820.00), '+18%'],
          ['Esta semana', mxn(3640.00), '+12%'],
        ].map(([l, v, d], i) => (
          <div key={i} style={{ background: '#16161A', border: '1px solid #232327', borderRadius: 10, padding: 12 }}>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 9.5, color: '#7A7872', letterSpacing: 0.6, textTransform: 'uppercase' }}>{l}</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, fontFamily: ATLAS_FONT, letterSpacing: -0.4 }}>{v}</div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: '#22D3B8', marginTop: 2 }}>{d}</div>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div style={{ padding: '6px 18px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: '#7A7872', letterSpacing: 0.8, textTransform: 'uppercase' }}>Tus citas · hoy</div>
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: p.accent2 }}>4 de 5 →</div>
      </div>
      <div style={{ flex: 1, padding: '8px 18px', overflow: 'hidden' }}>
        {[
          ['12:00', 'Carlos V.',   'Premium · 60m',  'EN CURSO',  '#22D3B8', true],
          ['13:00', 'Andrés C.',   'Corte clásico',  '13:00',     '#7A7872', false],
          ['14:00', 'Roberto M.',  'Corte + barba',  '14:00',     '#7A7872', false],
          ['16:30', 'Felipe G.',   'Corte + diseño', '16:30',     '#7A7872', false],
        ].map(([t, name, svc, status, c, active], i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '50px 1fr 70px', gap: 8,
            padding: '12px 12px', marginBottom: 6,
            background: active ? 'rgba(34,211,184,0.08)' : '#16161A',
            border: active ? `1px solid ${p.accent2}` : '1px solid #232327',
            borderRadius: 10, alignItems: 'center',
          }}>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 13, fontWeight: 600, color: active ? p.accent2 : '#E8E6E2' }}>{t}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: 10.5, color: '#7A7872', marginTop: 2, fontFamily: ATLAS_MONO }}>{svc}</div>
            </div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: c as string, textAlign: 'right', fontWeight: 600 }}>{status}</div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#0B0B0C', borderTop: '1px solid #1A1A1B', padding: '8px 8px 24px' }}>
        {[
          { icon: Icon.home, l: 'Inicio', active: true },
          { icon: Icon.calendar, l: 'Agenda' },
          { icon: Icon.bars, l: 'Comisión' },
          { icon: Icon.user, l: 'Perfil' },
        ].map((n, i) => {
          const IconCmp = n.icon;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <IconCmp size={20} color={n.active ? p.accent2 : '#7A7872'} />
              <div style={{ fontSize: 10, color: n.active ? p.accent2 : '#7A7872', fontFamily: ATLAS_MONO }}>{n.l}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── 04 · Hero comercial ──────────────────────────────────────
export const BarberHero: React.FC = () => {
  const p = PRESETS.barber;
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, #0B0B0C 0%, #1A1A1D 60%, #0F0F10 100%)`,
      fontFamily: ATLAS_FONT, color: '#E8E6E2', textAlign: 'left',
    }}>
      {/* Texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 12px), radial-gradient(circle at 80% 20%, ${p.accent2}18, transparent 50%)`,
      }} />

      <div style={{ width: '100%', height: '100%', display: 'flex', padding: '60px 70px', gap: 36, position: 'relative' }}>
        {/* Left copy */}
        <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
            <div style={{ padding: '5px 10px', background: p.accent2, color: '#0B0B0B', borderRadius: 999, fontFamily: ATLAS_MONO, fontSize: 11, letterSpacing: 0.6, fontWeight: 600 }}>PRESET 03</div>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: p.accent2, letterSpacing: 1.4, textTransform: 'uppercase' }}>Silla, navaja, agenda</div>
          </div>
          <div style={{ fontFamily: ATLAS_SERIF, fontSize: 64, fontWeight: 500, lineHeight: 1, letterSpacing: -1.8 }}>
            Atlas One <em style={{ color: p.accent2, fontStyle: 'italic' }}>Barber</em>
          </div>
          <div style={{ fontFamily: ATLAS_SERIF, fontSize: 28, fontWeight: 400, lineHeight: 1.15, marginTop: 16, letterSpacing: -0.4, color: '#C5C2BB' }}>
            La operación de una barbería premium, en una sola plataforma.
          </div>
          <div style={{ fontSize: 15, color: '#9C9B95', lineHeight: 1.6, margin: '22px 0 28px', maxWidth: 460 }}>
            Agenda por barbero, sillas, servicios, paquetes prepagados y comisiones — todo conectado a productos, ventas y reportes Atlas One.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: Icon.calendar, t: 'Agenda inteligente por silla y barbero' },
              { icon: Icon.bars,     t: 'Comisiones automáticas por servicio y producto' },
              { icon: Icon.star,     t: 'Paquetes prepagados y clientes frecuentes' },
            ].map((f, i) => {
              const IconCmp = f.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(34,211,184,0.12)', color: p.accent2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${p.accent2}40` }}>
                    <IconCmp size={17} color={p.accent2} />
                  </div>
                  <div style={{ fontSize: 14, color: '#E8E6E2' }}>{f.t}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            <div style={{ padding: '10px 16px', background: p.accent2, color: '#0B0B0B', borderRadius: 7, fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              Probar 1 mes gratis <Icon.arrowRight size={14} color="#0B0B0B" />
            </div>
            <div style={{ padding: '10px 16px', background: 'transparent', color: '#E8E6E2', border: '1px solid #3A3A3D', borderRadius: 7, fontWeight: 500, fontSize: 13 }}>
              Ver demo
            </div>
          </div>
        </div>

        {/* Right: device + insight cards */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 40, right: 0 }}>
            <LaptopFrame width={700}>
              <div style={{ width: 1440, height: 900, transform: 'scale(0.475)', transformOrigin: 'top left' }}>
                <BarberDesktop />
              </div>
            </LaptopFrame>
          </div>
          <div style={{ position: 'absolute', bottom: 30, left: -30, transform: 'rotate(-3deg)' }}>
            <PhoneFrame width={210}>
              <div style={{ width: 390, height: 844, transform: 'scale(0.539)', transformOrigin: 'top left' }}>
                <BarberMobile />
              </div>
            </PhoneFrame>
          </div>

          {/* Floating stat card */}
          <div style={{
            position: 'absolute', top: 0, right: 40, padding: 16,
            background: 'rgba(11,11,12,0.85)', backdropFilter: 'blur(10px)',
            border: `1px solid rgba(34,211,184,0.3)`, borderRadius: 12, width: 220,
            boxShadow: `0 8px 30px ${p.accent2}20`,
          }}>
            <div style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: '#9C9B95', letterSpacing: 0.6, textTransform: 'uppercase' }}>Ocupación</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: p.accent2, letterSpacing: -0.6 }}>82%</div>
              <div style={{ fontFamily: ATLAS_MONO, fontSize: 11, color: '#22D3B8' }}>+11%</div>
            </div>
            <div style={{ fontSize: 11, color: '#9C9B95', marginTop: 4 }}>42 de 51 slots ocupados · 4 sillas activas</div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 70px', display: 'flex', alignItems: 'center', gap: 16,
        borderTop: `1px solid rgba(34,211,184,0.2)`,
        background: 'rgba(11,11,12,0.7)', backdropFilter: 'blur(8px)',
      }}>
        <Wordmark color="#E8E6E2" accent={p.accent2} size={13} />
        <div style={{ width: 1, height: 18, background: '#3A3A3D' }} />
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: '#7A7872', letterSpacing: 0.6 }}>AGENDA · SERVICIOS · COMISIONES · CLIENTES FRECUENTES</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: ATLAS_MONO, fontSize: 10.5, color: '#7A7872' }}>atlas.tech / barber</div>
      </div>
    </div>
  );
};
