import type { CSSProperties, ReactNode } from 'react';

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
