import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

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
