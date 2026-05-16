import type { ReactNode } from 'react';

export const KLTag = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[11px] tracking-[0.06em] text-kl-ash px-3 py-1.5 border border-white/8 rounded-pill bg-[rgba(20,20,23,0.5)]">
    {children}
  </span>
);
