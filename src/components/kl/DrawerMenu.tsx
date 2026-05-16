import { KLIconButton } from './KLIconButton';
import { KLButton } from './KLButton';
import { IconClose, IconArrowRight, IconArrowUpRight } from './Icons';

interface DrawerMenuLink {
  href: string;
  id?: string;
  n: string;
  label: string;
}

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

const DRAWER_LINKS: DrawerMenuLink[] = [
  { href: '/', id: 'what-we-do', n: '01', label: 'What we do' },
  { href: '/projects', n: '02', label: 'Projects' },
  { href: '/', id: 'clients', n: '03', label: 'Clients' },
  { href: '/', id: 'who-we-are', n: '04', label: 'Who we are' },
  { href: '/', id: 'cta', n: '05', label: 'Contact us' },
];

function handleNavClick(e: React.MouseEvent, link: DrawerMenuLink, onClose: () => void) {
  e.preventDefault();
  onClose();
  const anchor = link.id ? `#${link.id}` : '';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const targetPath = base + link.href;
  if (window.location.pathname === targetPath || window.location.pathname === link.href) {
    // Already on the right page — scroll to anchor
    if (link.id) {
      const el = document.getElementById(link.id);
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 48,
          behavior: 'smooth',
        });
        return;
      }
    }
  }
  // Navigate to the page (with anchor — browser will scroll after load)
  window.location.href = targetPath + anchor;
}

export const DrawerMenu = ({ open, onClose, onOpenContact }: DrawerMenuProps) => (
  <>
    {/* backdrop */}
    <div
      onClick={onClose}
      className="fixed inset-0 z-80"
      style={{
        background: 'rgba(0,0,0,.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
      }}
    />

    {/* drawer */}
    <aside
      className="fixed inset-y-0 left-0 flex flex-col z-81 bg-kl-ink border-r border-white/8 py-7 px-8"
      style={{
        width: 'min(520px, 92vw)',
        transform: open ? 'translateX(0)' : 'translateX(-104%)',
        transition: 'transform 420ms cubic-bezier(.22,1,.36,1)',
        boxShadow: '30px 0 80px rgba(0,0,0,.6)',
      }}
    >
      <div className="flex justify-between items-center shrink-0">
        <a href={import.meta.env.BASE_URL} onClick={onClose}>
          <img
            src={`${import.meta.env.BASE_URL}uploads/horizontal_logo.png`}
            alt="KarmaLab"
            style={{ height: 40, width: 'auto', display: 'block' }}
          />
        </a>
        <KLIconButton onClick={onClose} accent="pink" size={40} title="Close menu">
          <IconClose size={18} stroke={2.2} />
        </KLIconButton>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto overflow-x-hidden">
        <nav>
          {DRAWER_LINKS.map((l) => (
            <a
              key={l.id ?? l.href}
              href={l.href + (l.id ? `#${l.id}` : '')}
              onClick={(e) => handleNavClick(e, l, onClose)}
              className="grid items-baseline gap-3.5 py-4 border-b border-white/8 text-kl-bone no-underline"
              style={{
                gridTemplateColumns: '44px 1fr 20px',
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--kl-bone)';
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-kl-ash">{l.n}</span>
              <span className="font-sans font-light text-[30px] tracking-[-0.03em]">{l.label}</span>
              <IconArrowRight
                size={14}
                stroke={1.25}
                style={{ color: 'currentColor', opacity: 0.6 }}
              />
            </a>
          ))}
        </nav>
      </div>

      <div className="pt-6 shrink-0 relative z-1">
        <KLButton
          size="lg"
          onClick={() => {
            onClose();
            onOpenContact();
          }}
        >
          Start a project <IconArrowUpRight size={16} />
        </KLButton>
      </div>

      <img
        src={`${import.meta.env.BASE_URL}assets/menu_shape.png`}
        alt=""
        className="absolute bottom-0 right-0 pointer-events-none block h-auto"
        style={{ width: 'clamp(120px, 60%, 260px)' }}
      />
    </aside>
  </>
);
