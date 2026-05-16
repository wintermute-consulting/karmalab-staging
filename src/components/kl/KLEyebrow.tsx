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
