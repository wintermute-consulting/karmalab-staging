import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface KLEyebrowProps {
  children: ReactNode;
  muted?: boolean;
  style?: CSSProperties;
}

export const KLEyebrow = ({ children, muted, style }: KLEyebrowProps) => (
  <div style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: muted ? 'var(--kl-ash)' : 'var(--kl-pink)',
    fontWeight: 500,
    ...style,
  }}>{children}</div>
);

interface KLButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  accent?: 'lime' | 'pink';
  style?: CSSProperties;
  [key: string]: unknown;
}

export const KLButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  accent = 'lime',
  style,
  ...rest
}: KLButtonProps) => {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const sizes = {
    sm: { pad: '8px 16px', fs: 13 },
    md: { pad: '12px 22px', fs: 15 },
    lg: { pad: '16px 30px', fs: 17 },
  };
  const s = sizes[size];
  const a = accent === 'pink'
    ? { base: '#FB48C4', hot: '#FD7BD8', deep: '#C12E9A', glow: 'rgba(251, 72, 196,.5)' }
    : { base: '#85FF00', hot: '#AFFF56', deep: '#5BB300', glow: 'rgba(133,255,0,.5)' };
  const base: CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500,
    fontSize: s.fs,
    padding: s.pad,
    borderRadius: 999,
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 180ms cubic-bezier(.22,1,.36,1)',
    transform: p ? 'scale(.98)' : 'scale(1)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    letterSpacing: '-0.005em',
    whiteSpace: 'nowrap',
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: h ? a.hot : 'transparent',
      borderColor: h ? a.hot : a.base,
      color: p ? a.deep : (h ? '#000' : a.base),
      boxShadow: h ? `0 0 0 1px ${a.glow}, 0 0 28px ${a.glow}` : 'none',
    },
    ghost: {
      background: 'transparent',
      color: h ? '#fff' : 'var(--kl-bone)',
      borderColor: 'rgba(255,255,255,.14)',
    },
    text: {
      background: 'transparent',
      color: h ? a.hot : a.base,
      border: 'none',
      padding: `${s.pad.split(' ')[0]} 8px`,
    },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

interface KLIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  accent?: 'pink' | 'lime';
  size?: number;
  title?: string;
  style?: CSSProperties;
}

export const KLIconButton = ({ children, onClick, accent = 'pink', size = 44, title, style }: KLIconButtonProps) => {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const a = accent === 'lime'
    ? { base: '#85FF00', hot: '#AFFF56', glow: 'rgba(133,255,0,.45)' }
    : { base: '#FB48C4', hot: '#FD7BD8', glow: 'rgba(251, 72, 196,.45)' };
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setP(false); }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      style={{
        width: size, height: size,
        borderRadius: 999,
        background: h ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: `2px solid ${h ? a.hot : a.base}`,
        color: h ? a.hot : a.base,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 180ms cubic-bezier(.22,1,.36,1)',
        transform: p ? 'scale(.94)' : 'scale(1)',
        boxShadow: h ? `0 0 24px ${a.glow}` : 'none',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

interface KLMetaProps {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}

export const KLMeta = ({ children, color, style }: KLMetaProps) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: color || 'var(--kl-ash)',
    ...style,
  }}>{children}</span>
);

interface KLSectionNumberProps {
  n: string;
  label: string;
  accent?: 'pink' | 'lime';
}

export const KLSectionNumber = ({ n, label, accent = 'pink' }: KLSectionNumberProps) => (
  <div style={{
    display: 'flex', gap: 20, alignItems: 'baseline',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 'clamp(28px, 3vw, 44px)',
    fontWeight: 300,
    letterSpacing: '-0.025em',
  }}>
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 'clamp(12px, 1.1vw, 16px)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: accent === 'lime' ? 'var(--kl-lime)' : 'var(--kl-pink)',
      alignSelf: 'center',
    }}>§ {n}</span>
    <span style={{ color: 'var(--kl-bone)' }}>{label}</span>
  </div>
);

// ---------------------------------------------------------------------------
// KLTag — mono pill label for keywords / discipline tags
// ---------------------------------------------------------------------------
export const KLTag = ({ children }: { children: ReactNode }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11, letterSpacing: '0.06em',
    color: 'var(--kl-ash)', padding: '6px 12px',
    border: '1px solid var(--border-1)', borderRadius: 999,
    background: 'rgba(20,20,23,0.5)',
  }}>{children}</span>
);

// ---------------------------------------------------------------------------
// KLBorderedGrid + KLBorderedCell — bordered grid layout used across sections
// ---------------------------------------------------------------------------
interface KLBorderedGridProps {
  columns?: number | string;
  children: ReactNode;
  style?: CSSProperties;
}

export const KLBorderedGrid = ({ columns = 1, children, style }: KLBorderedGridProps) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    gap: 0,
    borderTop: '1px solid var(--border-1)',
    ...style,
  }}>
    {children}
  </div>
);

interface KLBorderedCellProps {
  children: ReactNode;
  hasRight?: boolean;
  style?: CSSProperties;
}

export const KLBorderedCell = ({ children, hasRight = false, style }: KLBorderedCellProps) => (
  <div style={{
    padding: '32px 28px 40px',
    borderBottom: '1px solid var(--border-1)',
    borderRight: hasRight ? '1px solid var(--border-1)' : 'none',
    ...style,
  }}>
    {children}
  </div>
);
