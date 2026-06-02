import React, { useState } from "react";

// ============================================================
// DESIGN SYSTEM TOKENS & NEUTROS
// ============================================================
const ATLAS_FONT = "'IBM Plex Sans', system-ui, -apple-system, sans-serif";
const ATLAS_MONO = "'IBM Plex Mono', monospace";
const ATLAS_SERIF = "'IBM Plex Serif', Georgia, serif";

const N = {
  canvas: '#F6F4EF',
  page:   '#FBFAF6',
  card:   '#FFFFFF',
  ink:    '#0B0B0B',
  body:   '#2A2A28',
  muted:  '#6B6B66',
  faint:  '#9C9B95',
  line:   '#E8E5DD',
  line2:  '#D9D5CB',
  chip:   '#F2EFE7',
  inkDark: '#0E0E10',
  inkSoft: '#19191C',
};

export interface PresetConfig {
  name: string;
  tagline: string;
  description: string;
  accent: string;
  accent2: string;
  accentSoft: string;
  accentInk: string;
  tint: string;
  sidebar: {
    bg: string;
    fg: string;
    mute: string;
    activeBg: string;
    accent: string;
  };
}

export const PRESETS: Record<string, PresetConfig> = {
  pos: {
    name: 'Atlas POS',
    tagline: 'Entrada universal',
    description: 'Vender, cobrar y controlar caja desde el día uno.',
    accent: '#2563EB',
    accent2: '#60A5FA',
    accentSoft: '#EEF3FE',
    accentInk: '#1E3A8A',
    tint: '#EDF2FB',
    sidebar: { bg: '#0F1726', fg: '#E6EEFB', mute: '#7C8AA8', activeBg: '#1A2740', accent: '#60A5FA' },
  },
  retail: {
    name: 'Atlas One Retail',
    tagline: 'Inventario que cuadra',
    description: 'Productos, SKU, stock y mostrador para tiendas con inventario exigente.',
    accent: '#0B3A8F',
    accent2: '#06B6D4',
    accentSoft: '#E6F0FB',
    accentInk: '#082A6B',
    tint: '#E8F1FB',
    sidebar: { bg: '#0A1426', fg: '#DCE7F6', mute: '#6E80A0', activeBg: '#102348', accent: '#22D3EE' },
  },
  barber: {
    name: 'Atlas One Barber',
    tagline: 'Silla, navaja y agenda',
    description: 'Agenda por barbero, servicios, comisiones y clientes frecuentes.',
    accent: '#0F766E',
    accent2: '#22D3B8',
    accentSoft: '#EBF2F1',
    accentInk: '#064E47',
    tint: '#EEF1F0',
    sidebar: { bg: '#0B0B0C', fg: '#E8E6E2', mute: '#7A7872', activeBg: '#171716', accent: '#22D3B8' },
  },
  restaurant: {
    name: 'Atlas One Restaurant',
    tagline: 'Salón, comanda y cocina',
    description: 'Plano de mesas, comandas, KDS y operación por turno.',
    accent: '#E2531B',
    accent2: '#F59E0B',
    accentSoft: '#FBEEE5',
    accentInk: '#8A2C0A',
    tint: '#F8EEE6',
    sidebar: { bg: '#1A0F0A', fg: '#F4E9DF', mute: '#8C7E72', activeBg: '#2A1A11', accent: '#F59E0B' },
  },
  beauty: {
    name: 'Atlas One Beauty',
    tagline: 'Salón, agenda y membresías',
    description: 'Estéticas, uñas, spa y bienestar con alta recurrencia.',
    accent: '#B16E78',
    accent2: '#D9B58C',
    accentSoft: '#F4E8E8',
    accentInk: '#6E3F47',
    tint: '#F6ECE8',
    sidebar: { bg: '#1C1212', fg: '#F2E7E5', mute: '#9D817F', activeBg: '#2A1B1B', accent: '#D9B58C' },
  },
  health: {
    name: 'Atlas One Health',
    tagline: 'Agenda y expediente clínico',
    description: 'Consultorios, citas, pacientes y seguimiento clínico.',
    accent: '#0E9F9C',
    accent2: '#7DD3FC',
    accentSoft: '#E1F5F4',
    accentInk: '#075E5C',
    tint: '#E7F3F2',
    sidebar: { bg: '#0E1F23', fg: '#E1F5F4', mute: '#6E8C8E', activeBg: '#16323A', accent: '#5EEAD4' },
  },
  cafe: {
    name: 'Atlas One Café',
    tagline: 'Barra rápida, recetas, insumos',
    description: 'Cafeterías, panaderías y barras con alta demanda.',
    accent: '#8B4A2B',
    accent2: '#D9A668',
    accentSoft: '#F4E8DB',
    accentInk: '#5A2F18',
    tint: '#F1E5D2',
    sidebar: { bg: '#2A1810', fg: '#F4E8DB', mute: '#A48667', activeBg: '#3D2418', accent: '#D9A668' },
  },
  bar: {
    name: 'Atlas One Bar',
    tagline: 'Barra, mesas, inventario líquido',
    description: 'Bares, cantinas y lounges con control nocturno.',
    accent: '#7C3AED',
    accent2: '#22D3EE',
    accentSoft: '#EFE6FB',
    accentInk: '#4C1D95',
    tint: '#1A0B2E',
    sidebar: { bg: '#0A0418', fg: '#E9D8FD', mute: '#7A6BA0', activeBg: '#1A0B2E', accent: '#22D3EE' },
  },
  services: {
    name: 'Atlas One Services',
    tagline: 'Órdenes y seguimiento técnico',
    description: 'Talleres, mantenimiento y servicios técnicos.',
    accent: '#0E7C5C',
    accent2: '#0EA5E9',
    accentSoft: '#E2F1EB',
    accentInk: '#063D2C',
    tint: '#E8F1ED',
    sidebar: { bg: '#0E1614', fg: '#D8E5DF', mute: '#6E8278', activeBg: '#152620', accent: '#34D399' },
  },
  enterprise: {
    name: 'Atlas One Enterprise',
    tagline: 'Multisucursal e integraciones',
    description: 'Operación avanzada, KPIs ejecutivos y módulos a la medida.',
    accent: '#6D28D9',
    accent2: '#3B82F6',
    accentSoft: '#EDE7FA',
    accentInk: '#3D1798',
    tint: '#0E0817',
    sidebar: { bg: '#08060F', fg: '#E2DAFB', mute: '#7B6EA8', activeBg: '#15102A', accent: '#A78BFA' },
  },
  custom: {
    name: 'Atlas One Custom',
    tagline: 'Configuración a la medida',
    description: 'Constructor de módulos para giros con reglas propias.',
    accent: '#0A0A0A',
    accent2: '#A78BFA',
    accentSoft: '#F0EDE5',
    accentInk: '#0A0A0A',
    tint: '#F2EFE7',
    sidebar: { bg: '#0F0F0F', fg: '#E8E5DD', mute: '#7A7872', activeBg: '#1C1C1C', accent: '#A78BFA' },
  },
};

// ============================================================
// SVG ICONS DICTIONARY
// ============================================================
interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

const createIcon = (path: React.ReactNode, vb = 24) => {
  const IconComponent: React.FC<IconProps> = ({ size = 18, color = 'currentColor', strokeWidth = 1.6, style = {} }) => (
    <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
      {path}
    </svg>
  );
  return IconComponent;
};

const Icon = {
  home:       createIcon(<><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v10h14V10"/></>),
  cart:       createIcon(<><circle cx="9" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/><path d="M3 4h2l2.5 11h11l2-8H6"/></>),
  box:        createIcon(<><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4M12 11v10"/></>),
  users:      createIcon(<><circle cx="9" cy="9" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="8" r="2.5"/><path d="M17 13c2.8 0 5 2.2 5 5"/></>),
  user:       createIcon(<><circle cx="12" cy="9" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></>),
  chart:      createIcon(<><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></>),
  bars:       createIcon(<><rect x="4" y="11" width="3" height="9"/><rect x="10.5" y="7" width="3" height="13"/><rect x="17" y="14" width="3" height="6"/></>),
  bank:       createIcon(<><path d="M3 9l9-5 9 5M5 9v9M19 9v9M9 9v9M15 9v9M3 20h18"/></>),
  branch:     createIcon(<><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></>),
  calendar:   createIcon(<><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></>),
  scissors:   createIcon(<><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M20 4L8.5 16M14.5 10L20 20M8.5 8L13 12.5"/></>),
  table:      createIcon(<><rect x="3" y="6" width="18" height="14" rx="1.5"/><path d="M3 11h18M9 11v9M15 11v9"/></>),
  utensils:   createIcon(<><path d="M5 3v7c0 1.5 1 2.5 2.5 2.5S10 11.5 10 10V3M7.5 12.5V21"/><path d="M17 3c-1.5 0-3 2-3 5s1 4 2 4v9"/></>),
  flame:      createIcon(<><path d="M12 3s4 4 4 9a4 4 0 11-8 0c0-3 2-4 2-4s-1 4 2 4 2-3 0-9z"/></>),
  search:     createIcon(<><circle cx="11" cy="11" r="6.5"/><path d="M21 21l-5-5"/></>),
  bell:       createIcon(<><path d="M6 16V11a6 6 0 1112 0v5l1.5 2H4.5L6 16z"/><path d="M10 21h4"/></>),
  plus:       createIcon(<><path d="M12 5v14M5 12h14"/></>),
  arrowRight: createIcon(<><path d="M5 12h14M13 6l6 6-6 6"/></>),
  arrowUp:    createIcon(<><path d="M12 19V5M6 11l6-6 6 6"/></>),
  arrowDown:  createIcon(<><path d="M12 5v14M6 13l6 6 6-6"/></>),
  cog:        createIcon(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.9.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.4-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.4H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.4l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.4 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></>),
  receipt:    createIcon(<><path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></>),
  card:       createIcon(<><rect x="2.5" y="6" width="19" height="13" rx="2"/><path d="M2.5 10h19"/></>),
  cash:       createIcon(<><rect x="2.5" y="6" width="19" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/></>),
  qr:         createIcon(<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></>),
  printer:    createIcon(<><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M6 17h12v4H6z"/></>),
  fire:       createIcon(<><path d="M12 2c0 4-5 5-5 11a5 5 0 0010 0c0-2-1-3-2-4 0 2-1 3-2 3 1-3-1-7-1-10z"/></>),
  pkg:        createIcon(<><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M16.5 5.2L7.5 9.5M3 7l9 4 9-4M12 11v10"/></>),
  tag:        createIcon(<><path d="M3 12V3h9l9 9-9 9-9-9z"/><circle cx="7.5" cy="7.5" r="1.4"/></>),
  truck:      createIcon(<><rect x="2" y="7" width="11" height="9" rx="1"/><path d="M13 10h5l3 3v3h-8M5 16a2 2 0 104 0M16 16a2 2 0 104 0"/></>),
  warning:    createIcon(<><path d="M12 3l10 17H2L12 3z"/><path d="M12 10v5M12 18v.5"/></>),
  check:      createIcon(<path d="M4 12l5 5 11-12"/>),
  clock:      createIcon(<><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></>),
  star:       createIcon(<path d="M12 3l2.7 5.7 6.3.9-4.5 4.4 1 6.3L12 17.3l-5.6 3 1.1-6.3L3 9.6l6.3-.9L12 3z"/>),
  phone:      createIcon(<><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 19h4"/></>),
  more:       createIcon(<><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>),
  filter:     createIcon(<><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></>),
  download:   createIcon(<><path d="M12 4v12M6 11l6 6 6-6M4 20h16"/></>),
  document:   createIcon(<><path d="M6 3h8l5 5v13H6V3z"/><path d="M14 3v5h5"/></>),
  sparkles:   createIcon(<><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/></>),
  building:   createIcon(<><path d="M3 21V6l7-3v18M10 21V9l11 3v9M3 21h18M14 13v2M14 17v2M17 13v2M17 17v2"/></>),
  beaker:     createIcon(<><path d="M9 3h6M10 3v6L5 19c-.6 1 .2 2 1.4 2h11.2c1.2 0 2-1 1.4-2L14 9V3"/><path d="M7 15h10"/></>),
  heart:      createIcon(<path d="M12 20s-8-5-8-12a4 4 0 017-2 4 4 0 017 2c0 7-8 12-8 12z"/>),
  pulse:      createIcon(<><path d="M3 12h4l2-6 4 12 2-6h6"/></>),
  cross:      createIcon(<><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/></>),
  coffee:     createIcon(<><path d="M4 8h13v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"/><path d="M17 10h2a2 2 0 010 4h-2"/><path d="M8 5c0-1 1-1 1-2M12 5c0-1 1-1 1-2"/></>),
  wine:       createIcon(<><path d="M7 3h10c0 5-2 8-5 8s-5-3-5-8z"/><path d="M12 11v8M9 21h6"/></>),
  cocktail:   createIcon(<><path d="M3 4h18l-9 10v6M8 21h8"/></>),
  wrench:     createIcon(<><path d="M15 6a4 4 0 11-1.8 7.6L5 22l-3-3 8.4-8.2A4 4 0 0115 6z"/></>),
  layers:     createIcon(<><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 18l9 5 9-5"/></>),
  shield:     createIcon(<><path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"/></>),
  zap:        createIcon(<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>),
};

// ============================================================
// FORMAT HELPERS
// ============================================================
const mxn = (n: number) => {
  return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const mxnInt = (n: number) => '$' + n.toLocaleString('es-MX');

// ============================================================
// BASE STYLING ELEMENTS / CARD / WORDMARK / FRAME MOCKUPS
// ============================================================
interface WordmarkProps {
  color?: string;
  accent?: string | null;
  size?: number;
  sub?: string | null;
}

const AtlasMark: React.FC<{ size?: number; color?: string; accent?: string | null }> = ({ size = 22, color = 'currentColor', accent = null }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke={color} strokeWidth="1.6"/>
    <rect x="8" y="8" width="11.5" height="11.5" rx="2" fill={accent || color}/>
  </svg>
);

const Wordmark: React.FC<WordmarkProps> = ({ color = N.ink, accent = null, size = 16, sub = null }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color, fontFamily: ATLAS_FONT }}>
    <AtlasMark size={size + 6} color={color} accent={accent} />
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div style={{ fontSize: size, fontWeight: 600, letterSpacing: -0.2 }}>
        Atlas<span style={{ fontWeight: 400, opacity: 0.85 }}> One</span>
      </div>
      {sub && (
        <div style={{ fontFamily: ATLAS_MONO, fontSize: size * 0.55, color: 'currentColor', opacity: 0.55, marginTop: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>{sub}</div>
      )}
    </div>
  </div>
);

interface SidebarProps {
  preset: PresetConfig;
  active: string;
  items: { header?: string; icon?: React.FC<IconProps>; label?: string; badge?: string }[];
  footer?: React.ReactNode;
  width?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ preset, active, items, footer, width = 232 }) => {
  const sb = preset.sidebar;
  return (
    <aside style={{
      width, flexShrink: 0, background: sb.bg, color: sb.fg,
      display: 'flex', flexDirection: 'column', fontFamily: ATLAS_FONT,
      padding: '20px 14px 16px', boxSizing: 'border-box', height: '100%',
    }}>
      <div style={{ padding: '4px 6px 22px' }}>
        <Wordmark color={sb.fg} accent={sb.accent} size={15} sub={preset.tagline} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflowY: 'auto' }}>
        {items.map((it, i) => {
          if (it.header) return (
            <div key={i} style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: sb.mute, padding: '14px 10px 6px', letterSpacing: 1, textTransform: 'uppercase' }}>{it.header}</div>
          );
          const isActive = it.label === active;
          const IconCmp = it.icon;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
              borderRadius: 7,
              background: isActive ? sb.activeBg : 'transparent',
              color: isActive ? sb.fg : sb.mute,
              fontSize: 13, fontWeight: isActive ? 500 : 400,
              position: 'relative',
            }}>
              {isActive && <span style={{ position: 'absolute', left: -14, top: 8, bottom: 8, width: 2, borderRadius: 2, background: sb.accent }} />}
              {IconCmp && <IconCmp size={16} color={isActive ? sb.accent : sb.mute} />}
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge != null && (
                <span style={{
                  fontFamily: ATLAS_MONO, fontSize: 10, fontWeight: 500,
                  background: isActive ? sb.accent : 'rgba(255,255,255,0.08)',
                  color: isActive ? sb.bg : sb.mute,
                  padding: '2px 6px', borderRadius: 999, minWidth: 18, textAlign: 'center',
                }}>{it.badge}</span>
              )}
            </div>
          );
        })}
      </div>
      {footer}
    </aside>
  );
};

const SidebarUser: React.FC<{ preset: PresetConfig; name: string; role: string; branch: string }> = ({ preset, name, role, branch }) => {
  const sb = preset.sidebar;
  return (
    <div style={{
      marginTop: 12, padding: '10px 10px', borderTop: `1px solid ${sb.activeBg}`,
      display: 'flex', alignItems: 'center', gap: 10, fontFamily: ATLAS_FONT,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, background: sb.accent, color: sb.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 600, fontSize: 12,
      }}>{name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: sb.fg, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontSize: 10, color: sb.mute, fontFamily: ATLAS_MONO, letterSpacing: 0.3 }}>{role} · {branch}</div>
      </div>
      <Icon.cog size={14} color={sb.mute} />
    </div>
  );
};

interface TopbarProps {
  title: string;
  sub?: string;
  preset: PresetConfig;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ title, sub, preset, right, children }) => {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 28px 16px', borderBottom: `1px solid ${N.line}`,
      background: N.card, fontFamily: ATLAS_FONT,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: N.ink, letterSpacing: -0.2 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: N.muted, marginTop: 2, fontFamily: ATLAS_MONO }}>{sub}</div>}
      </div>
      {children}
      {right}
    </div>
  );
};

const SearchInput: React.FC<{ placeholder?: string; width?: number; preset: PresetConfig }> = ({ placeholder = 'Buscar...', width = 320, preset }) => {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      width, padding: '7px 12px',
      border: `1px solid ${N.line}`, borderRadius: 8, background: N.page,
      color: N.muted, fontSize: 12.5, fontFamily: ATLAS_FONT,
    }}>
      <Icon.search size={15} color={N.muted} />
      <span style={{ flex: 1, color: N.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{placeholder}</span>
      <span style={{ fontFamily: ATLAS_MONO, fontSize: 10, color: N.faint, padding: '1px 5px', border: `1px solid ${N.line2}`, borderRadius: 4 }}>⌘ K</span>
    </div>
  );
};

interface ButtonProps {
  label: string;
  kind?: 'primary' | 'secondary' | 'ghost' | 'accent';
  preset?: PresetConfig;
  icon?: React.FC<IconProps>;
  size?: 'sm' | 'md';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, kind = 'primary', preset, icon: IconCmp, size = 'md', onClick }) => {
  const accent = preset?.accent || N.ink;
  const styles = {
    primary: { background: accent, color: '#fff', border: 'none' },
    secondary: { background: N.card, color: N.ink, border: `1px solid ${N.line2}` },
    ghost: { background: 'transparent', color: N.ink, border: 'none' },
    accent: { background: preset?.accentSoft || N.chip, color: preset?.accentInk || N.ink, border: 'none' },
  }[kind];
  const sizing = size === 'sm' ? { padding: '5px 10px', fontSize: 12 } : { padding: '8px 14px', fontSize: 13 };
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, ...styles, ...sizing,
      borderRadius: 7, fontFamily: ATLAS_FONT, fontWeight: 500, lineHeight: 1, cursor: 'pointer',
    }}>
      {IconCmp && <IconCmp size={14} color="currentColor" />}
      {label}
    </button>
  );
};

const Card: React.FC<{ children: React.ReactNode; pad?: number; style?: React.CSSProperties; accent?: boolean }> = ({ children, pad = 18, style = {}, accent = false }) => (
  <div style={{
    background: N.card, border: `1px solid ${N.line}`, borderRadius: 12,
    padding: pad, fontFamily: ATLAS_FONT, boxSizing: 'border-box',
    boxShadow: '0 1px 0 rgba(15,15,15,0.02)',
    ...(accent ? { borderColor: 'transparent', boxShadow: `0 0 0 1px ${N.line}` } : {}),
    ...style,
  }}>{children}</div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; action?: string }> = ({ children, action }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
    <div style={{ fontSize: 11, fontFamily: ATLAS_MONO, color: N.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>{children}</div>
    {action && <div style={{ fontSize: 11.5, color: N.muted, fontFamily: ATLAS_FONT, cursor: 'pointer' }}>{action}</div>}
  </div>
);

interface KpiProps {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  trend?: number[];
  accent?: string;
  sub?: string;
}

const Kpi: React.FC<KpiProps> = ({ label, value, unit, delta, trend = [], accent, sub }) => {
  const positive = delta && delta.startsWith('+');
  return (
    <Card pad={14} style={{ minHeight: 115, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10.5, fontFamily: ATLAS_MONO, letterSpacing: 0.8, color: N.muted, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: N.ink, letterSpacing: -0.8 }}>{value}</div>
        {unit && <div style={{ fontSize: 12, color: N.muted, fontFamily: ATLAS_MONO }}>{unit}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        {sub ? (
          <div style={{ fontSize: 10.5, color: N.muted, fontFamily: ATLAS_MONO }}>{sub}</div>
        ) : (
          delta && <div style={{
            fontSize: 11, fontFamily: ATLAS_MONO, color: positive ? '#0E8A4E' : '#B43E2E',
            display: 'inline-flex', alignItems: 'center', gap: 2,
          }}>
            {positive ? <Icon.arrowUp size={10} /> : <Icon.arrowDown size={10} />}
            {delta}
          </div>
        )}
        {trend.length > 0 && <Sparkline values={trend} color={accent || N.body} width={60} height={20} />}
      </div>
    </Card>
  );
};

const Sparkline: React.FC<{ values: number[]; color?: string; width?: number; height?: number; fill?: boolean }> = ({ values, color = '#0B0B0B', width = 120, height = 32, fill = false }) => {
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - 2 - ((v - min) / span) * (height - 4);
    return [x, y];
  });
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const dFill = `${d} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {fill && <path d={dFill} fill={color} opacity="0.12" />}
      <path d={d} stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
};

const BarChart: React.FC<{ data: { label: string; value: number; highlight?: boolean }[]; width?: number; height?: number; color?: string; soft?: string }> = ({ data, width = 480, height = 180, color = '#0B0B0B', soft = '#E8E5DD' }) => {
  const max = Math.max(...data.map(d => d.value));
  const barW = (width - 20) / data.length - 8;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 36);
        const x = 10 + i * (barW + 8);
        const y = height - 22 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={3} fill={d.highlight ? color : soft} />
            <text x={x + barW/2} y={height - 6} fontSize="10" fontFamily={ATLAS_MONO} fill={N.muted} textAnchor="middle">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

const LineChart: React.FC<{ series: { values: number[] }[]; width?: number; height?: number; color?: string; color2?: string; labels?: string[] }> = ({ series, width = 520, height = 200, color = '#0B0B0B', color2 = '#9C9B95', labels = [] }) => {
  const all = series.flatMap(s => s.values);
  const min = Math.min(...all), max = Math.max(...all), span = (max - min) || 1;
  const px = (i: number, n: number) => 30 + (i / (n - 1)) * (width - 50);
  const py = (v: number) => (height - 30) - ((v - min) / span) * (height - 50);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line key={i} x1={30} x2={width - 10} y1={height - 30 - t * (height - 50)} y2={height - 30 - t * (height - 50)} stroke={N.line} strokeDasharray="2 3" />
      ))}
      {series.map((s, si) => {
        const d = s.values.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i, s.values.length)},${py(v)}`).join(' ');
        const dFill = `${d} L${px(s.values.length - 1, s.values.length)},${height - 30} L${px(0, s.values.length)},${height - 30} Z`;
        const c = si === 0 ? color : color2;
        return (
          <g key={si}>
            {si === 0 && <path d={dFill} fill={c} opacity="0.08" />}
            <path d={d} stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {labels.map((l, i) => (
        <text key={i} x={px(i, labels.length)} y={height - 10} fontSize="10" fontFamily={ATLAS_MONO} fill={N.muted} textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

const Donut: React.FC<{ value?: number; label?: string; size?: number; color?: string; track?: string }> = ({ value = 0.72, label, size = 110, color = '#0B0B0B', track = '#EEEAE0' }) => {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const dash = value * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth="7" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${c}`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: ATLAS_FONT, color: N.ink }}>{Math.round(value * 100)}<span style={{ fontSize: 10, color: N.muted, fontFamily: ATLAS_MONO }}>%</span></div>
        {label && <div style={{ fontSize: 9, color: N.muted, fontFamily: ATLAS_MONO, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.6 }}>{label}</div>}
      </div>
    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; color?: string; soft?: string; dot?: boolean }> = ({ children, color, soft, dot = false }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5,
    padding: '3px 8px', borderRadius: 999, fontSize: 10.5,
    fontFamily: ATLAS_MONO, fontWeight: 500, letterSpacing: 0.2,
    background: soft || 'rgba(0,0,0,0.04)', color: color || N.body,
  }}>
    {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: color || N.body }} />}
    {children}
  </span>
);

const HeroBg: React.FC<{ preset: PresetConfig; children: React.ReactNode; style?: React.CSSProperties }> = ({ preset, children, style = {} }) => (
  <div style={{
    width: '100%', height: '100%', background: preset.tint,
    backgroundImage: `radial-gradient(circle at 20% 0%, ${preset.accent}15, transparent 50%), radial-gradient(circle at 80% 100%, ${preset.accent2}20, transparent 60%)`,
    position: 'relative', overflow: 'hidden', ...style,
  }}>{children}</div>
);

// ============================================================
// DEVICE FRAME CONTAINERS
// ============================================================
export const LaptopFrame: React.FC<{ children: React.ReactNode; width?: number }> = ({ children, width = 720 }) => {
  const h = width * 0.62;
  return (
    <div style={{ width, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '100%', background: '#1c1b18', borderRadius: '14px 14px 4px 4px',
        padding: '10px 10px 12px', position: 'relative', boxSizing: 'border-box'
      }}>
        <div style={{
          background: '#0a0a09', borderRadius: 4, overflow: 'hidden',
          width: '100%', height: h - 22, position: 'relative',
        }}>
          <div style={{ position: 'absolute', left: '50%', top: 4, transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: 999, background: '#000', border: '1px solid #2a2a28', zIndex: 2 }} />
          <div style={{ position: 'absolute', inset: '12px 6px 6px', background: '#fff', borderRadius: 2, overflow: 'hidden' }}>
            {children}
          </div>
        </div>
      </div>
      <div style={{ width: '108%', height: 9, background: 'linear-gradient(180deg, #c5c2bb 0%, #8e8b84 100%)', borderRadius: '0 0 9px 9px' }} />
      <div style={{ width: '60px', height: 4, background: '#5a5751', borderRadius: '0 0 4px 4px', marginTop: -1 }} />
    </div>
  );
};

export const TabletFrame: React.FC<{ children: React.ReactNode; width?: number; vertical?: boolean }> = ({ children, width = 580, vertical = false }) => {
  const ratio = vertical ? (4/3) : (3/4);
  const h = width * ratio;
  return (
    <div style={{
      width, height: h, background: '#15140f', borderRadius: 22, padding: 11,
      position: 'relative', boxSizing: 'border-box'
    }}>
      <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
        {children}
      </div>
      {!vertical && <div style={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', width: 5, height: 5, borderRadius: 999, background: '#3a3933' }} />}
    </div>
  );
};

export const PhoneFrame: React.FC<{ children: React.ReactNode; width?: number }> = ({ children, width = 280 }) => {
  const h = width * (844/390);
  return (
    <div style={{
      width, height: h, background: '#0e0d0a', borderRadius: 34, padding: 8,
      position: 'relative', boxShadow: 'inset 0 0 0 1px #2a2925', boxSizing: 'border-box'
    }}>
      <div style={{ background: '#fff', borderRadius: 28, overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', width: 78, height: 20, borderRadius: 999, background: '#0e0d0a', zIndex: 5 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 22px 0', fontSize: 11, fontFamily: ATLAS_FONT, fontWeight: 600, color: N.ink, zIndex: 4 }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center', opacity: 0.9 }}>
            <span style={{ fontSize: 9 }}>📶</span>
            <span style={{ width: 18, height: 9, border: '1px solid currentColor', borderRadius: 2, position: 'relative' }}>
              <span style={{ position: 'absolute', inset: 1, width: '70%', background: 'currentColor', borderRadius: 1 }} />
            </span>
          </span>
        </div>
        <div style={{ paddingTop: 32, height: '100%', boxSizing: 'border-box' }}>{children}</div>
      </div>
    </div>
  );
};

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
// GENERIC HERO VIEW FOR FALLBACK / OTHER PRESETS
// ============================================================
export const GenericHero: React.FC<{ preset: PresetConfig }> = ({ preset }) => {
  return (
    <HeroBg preset={preset} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40, boxSizing: 'border-box', color: N.ink, fontFamily: ATLAS_FONT }}>
      <div style={{ background: '#FFF', padding: 40, borderRadius: 20, maxWidth: 500, border: `1px solid ${preset.accent}40`, boxShadow: `0 12px 32px ${preset.accent}15`, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '6px 14px', background: preset.accentSoft, color: preset.accentInk, borderRadius: 999, fontSize: 11, fontFamily: ATLAS_MONO, fontWeight: 700, marginBottom: 16 }}>
          {preset.name.toUpperCase()}
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 700, fontFamily: ATLAS_SERIF, margin: '0 0 10px' }}>{preset.tagline}</h3>
        <p style={{ fontSize: 14.5, color: N.body, lineHeight: 1.5, margin: '0 0 24px' }}>{preset.description}</p>
        <div style={{ height: 6, background: `linear-gradient(90deg, ${preset.accent}, ${preset.accent2})`, borderRadius: 3, marginBottom: 20 }} />
        <div style={{ fontSize: 12, fontFamily: ATLAS_MONO, color: N.muted }}>Módulos específicos activos listos para desplegar</div>
      </div>
    </HeroBg>
  );
};

// ============================================================
// MAIN COMPONENT: INTERACTIVE PRESET DEMOS INTERACTIVE PLAYER
// ============================================================
export const AtlasOneDemosPlayer: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>("pos");
  const [activeScreen, setActiveScreen] = useState<string>("desktop");

  const preset = PRESETS[activePreset] || PRESETS.pos;

  // Render content depending on active screen and active preset
  const renderScreen = () => {
    // Top 4 presets have complete layouts
    if (activePreset === "pos") {
      if (activeScreen === "desktop") return <PosDesktop />;
      if (activeScreen === "tablet") return <PosTouch />;
      if (activeScreen === "mobile") return <PosMobile />;
    } else if (activePreset === "retail") {
      if (activeScreen === "desktop") return <RetailDesktop />;
      if (activeScreen === "tablet") return <RetailTouch />;
      if (activeScreen === "mobile") return <RetailMobile />;
    } else if (activePreset === "barber") {
      if (activeScreen === "desktop") return <BarberDesktop />;
      if (activeScreen === "tablet") return <BarberTouch />;
      if (activeScreen === "mobile") return <PosMobile />; // Fallback to POS Mobile with barber colors
    } else if (activePreset === "restaurant") {
      if (activeScreen === "desktop") return <RestaurantDesktop />;
      if (activeScreen === "tablet") return <RestaurantDesktop />; // Fallback
      if (activeScreen === "mobile") return <PosMobile />; // Fallback
    }

    // Default Fallback
    return <GenericHero preset={preset} />;
  };

  // Adjust layout frame depending on active screen
  const renderFrame = () => {
    // Other presets just show Hero view, no frames needed
    const hasComplexScreens = ["pos", "retail", "barber", "restaurant"].includes(activePreset);
    if (!hasComplexScreens || activeScreen === "hero") {
      return (
        <div style={{ width: "100%", height: 500, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <GenericHero preset={preset} />
        </div>
      );
    }

    if (activeScreen === "desktop") {
      return (
        <LaptopFrame width={760}>
          <div style={{ width: 1440, height: 900, transform: "scale(0.527)", transformOrigin: "top left" }}>
            {renderScreen()}
          </div>
        </LaptopFrame>
      );
    }

    if (activeScreen === "tablet") {
      return (
        <TabletFrame width={600}>
          <div style={{ width: 1280, height: 800, transform: "scale(0.468)", transformOrigin: "top left" }}>
            {renderScreen()}
          </div>
        </TabletFrame>
      );
    }

    if (activeScreen === "mobile") {
      return (
        <PhoneFrame width={250}>
          <div style={{ width: 390, height: 844, transform: "scale(0.597)", transformOrigin: "top left" }}>
            {renderScreen()}
          </div>
        </PhoneFrame>
      );
    }

    return null;
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
                  // Default to hero for presets without complex screen mockups
                  if (!["pos", "retail", "barber", "restaurant"].includes(key)) {
                    setActiveScreen("hero");
                  } else if (activeScreen === "hero") {
                    setActiveScreen("desktop");
                  }
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
        
        {/* Step 2: Screen selector (only show if preset has multiple screens) */}
        {["pos", "retail", "barber", "restaurant"].includes(activePreset) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 10, fontFamily: ATLAS_MONO, color: "rgba(255,255,255,0.4)" }}>
              Paso 2: Cambiar vista
            </div>
            <div style={{ display: "flex", background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 3, border: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { key: "desktop", label: "Desktop 🖥" },
                { key: "tablet", label: "Touch 📱" },
                { key: "mobile", label: "Móvil 📱" },
                { key: "hero", label: "Ficha 📄" }
              ].map((scr) => {
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
        )}
      </div>

      {/* Frame Rendering Container */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 480, background: "rgba(0,0,0,0.15)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.03)" }}>
        {renderFrame()}
      </div>
    </div>
  );
};
