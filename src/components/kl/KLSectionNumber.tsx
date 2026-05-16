interface KLSectionNumberProps {
  n: string;
  label: string;
  accent?: 'pink' | 'lime';
}

export const KLSectionNumber = ({ n, label }: KLSectionNumberProps) => (
  <div className="flex items-baseline gap-5 font-sans font-light text-kl-fog text-sm sm:text-md tracking-wide uppercase">
    {label}
  </div>
);
