import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

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
  const backdropStyle: CSSProperties = {
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: h ? a.hot : 'transparent',
      borderColor: h ? a.hot : a.base,
      color: p ? a.deep : h ? '#000' : a.base,
      boxShadow: h ? `0 0 0 1px ${a.glow}, 0 0 28px ${a.glow}` : 'none',
      ...backdropStyle,
    },
    ghost: {
      background: 'transparent',
      color: h ? '#fff' : 'var(--kl-bone)',
      borderColor: 'rgba(255,255,255,.14)',
      ...backdropStyle,
    },
    text: {
      background: 'transparent',
      color: h ? a.hot : a.base,
      border: 'none',
      padding: `${s.pad.split(' ')[0]} 0px`,
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
