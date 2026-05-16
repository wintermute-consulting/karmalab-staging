import type { CSSProperties, ReactNode } from 'react';

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
    className={`grid gap-0 border-y md:border-x border-white/8 md:rounded-3xl overflow-hidden${className ? ` ${className}` : ''}`}
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
    className="px-4 md:px-7 py-6 md:py-8"
    style={{
      borderBottom: lastRow ? 'none' : '1px solid var(--border-1)',
      borderRight: hasRight ? '1px solid var(--border-1)' : 'none',
      ...style,
    }}
  >
    {children}
  </div>
);
