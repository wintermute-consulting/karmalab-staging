import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface KLEyebrowProps {
  children: ReactNode;
  muted?: boolean;
  style?: CSSProperties;
}

export const KLEyebrow = ({ children, muted, style }: KLEyebrowProps) => (
  <div
    className={`font-mono text-xs uppercase font-medium tracking-[0.14em] ${muted ? 'text-kl-ash' : 'text-kl-pink'}`}
    style={style}
  >
    {children}
  </div>
);

interface KLButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  accent?: 'lime' | 'pink';
  href?: string;
  target?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export const KLButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  accent = 'lime',
  href,
  target,
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
  const a =
    accent === 'pink'
      ? { base: '#FB48C4', hot: '#FD7BD8', deep: '#C12E9A', glow: 'rgba(251, 72, 196,.5)' }
      : { base: '#85FF00', hot: '#AFFF56', deep: '#5BB300', glow: 'rgba(133,255,0,.5)' };
  const base: CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 500,
    fontSize: s.fs,
    padding: s.pad,
    border: '2px solid transparent',
    transition: 'all 180ms cubic-bezier(.22,1,.36,1)',
    transform: p ? 'scale(.98)' : 'scale(1)',
    gap: 8,
    letterSpacing: '-0.005em',
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: h ? a.hot : 'transparent',
      borderColor: h ? a.hot : a.base,
      color: p ? a.deep : h ? '#000' : a.base,
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
  const sharedProps = {
    className:
      'inline-flex items-center no-underline whitespace-nowrap rounded-pill cursor-pointer font-sans font-medium',
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: { ...base, ...variants[variant], ...style },
  };
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...sharedProps}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      {...sharedProps}
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

export const KLIconButton = ({
  children,
  onClick,
  accent = 'pink',
  size = 44,
  title,
  style,
}: KLIconButtonProps) => {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const a =
    accent === 'lime'
      ? { base: '#85FF00', hot: '#AFFF56', glow: 'rgba(133,255,0,.45)' }
      : { base: '#FB48C4', hot: '#FD7BD8', glow: 'rgba(251, 72, 196,.45)' };
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="inline-flex items-center justify-center rounded-pill cursor-pointer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => {
        setH(false);
        setP(false);
      }}
      onMouseDown={() => setP(true)}
      onMouseUp={() => setP(false)}
      style={{
        width: size,
        height: size,
        background: h ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: `2px solid ${h ? a.hot : a.base}`,
        color: h ? a.hot : a.base,
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
  className?: string;
}

export const KLMeta = ({ children, color, style, className }: KLMetaProps) => (
  <span
    className={`font-mono text-[11px] tracking-[0.12em] uppercase${className ? ` ${className}` : ''}`}
    style={{ color: color || 'var(--kl-ash)', ...style }}
  >
    {children}
  </span>
);

interface KLSectionNumberProps {
  n: string;
  label: string;
  accent?: 'pink' | 'lime';
}

export const KLSectionNumber = ({ n, label, accent = 'pink' }: KLSectionNumberProps) => (
  <div
    className="flex items-baseline gap-5 font-sans font-light tracking-tight"
    style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
  >
    {/* <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(12px, 1.1vw, 16px)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: accent === 'lime' ? 'var(--kl-lime)' : 'var(--kl-pink)',
      }}
    >
      {n}
    </span> */}
    <span className="text-kl-bone">{label}</span>
  </div>
);

// ---------------------------------------------------------------------------
// KLTag — mono pill label for keywords / discipline tags
// ---------------------------------------------------------------------------
export const KLTag = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[11px] tracking-[0.06em] text-kl-ash px-3 py-1.5 border border-white/8 rounded-pill bg-[rgba(20,20,23,0.5)]">
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// KLBorderedGrid + KLBorderedCell — bordered grid layout used across sections
// ---------------------------------------------------------------------------
interface KLBorderedGridProps {
  columns?: number | string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const KLBorderedGrid = ({
  columns = 1,
  children,
  style,
  className,
}: KLBorderedGridProps) => (
  <div
    className={`grid gap-0 border border-white/8 rounded-3xl overflow-hidden${className ? ` ${className}` : ''}`}
    style={{
      gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
      ...style,
    }}
  >
    {children}
  </div>
);

interface KLBorderedCellProps {
  children: ReactNode;
  hasRight?: boolean;
  lastRow?: boolean;
  style?: CSSProperties;
}

export const KLBorderedCell = ({
  children,
  hasRight = false,
  lastRow = false,
  style,
}: KLBorderedCellProps) => (
  <div
    className="px-7 py-8"
    style={{
      borderBottom: lastRow ? 'none' : '1px solid var(--border-1)',
      borderRight: hasRight ? '1px solid var(--border-1)' : 'none',
      ...style,
    }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// ParallaxImage — scrolls at a fraction of page speed, creating a depth effect
// ---------------------------------------------------------------------------
interface ParallaxImageProps {
  src: string;
  alt?: string;
  /** Parallax intensity: 0 = static, 0.15 = subtle (default), 0.3 = strong */
  speed?: number;
  style?: CSSProperties;
  /** Enable a slow floating (up/down) animation */
  float?: boolean;
}

export const ParallaxImage = ({
  src,
  alt = '',
  speed = 0.15,
  style,
  float = false,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);
  // Stable random values per instance (generated once on mount)
  const floatParams = useRef({
    duration: 6 + Math.random() * 10, // 6–16 s
    delay: -(Math.random() * 10), // negative = already mid-cycle on mount
  });

  useEffect(() => {
    if (float) return; // float mode: CSS animation handles movement, no scroll listener needed
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = (el.parentElement ?? el).getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [speed, float]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={{
        ...style,
        ...(float
          ? {
              animation: `kl-float ${floatParams.current.duration}s ${floatParams.current.delay}s cubic-bezier(0.45, 0, 0.55, 1) infinite`,
              willChange: 'transform',
            }
          : { transform: `translateY(${offset}px)`, willChange: 'transform' }),
      }}
    />
  );
};
