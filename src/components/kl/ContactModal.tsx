import { KLIconButton } from './KLIconButton';
import { KLMeta } from './KLMeta';
import { IconClose, IconArrowUpRight } from './Icons';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const CONTACTS = [
  { label: 'Email', value: 'start@karmalab.tech', href: 'mailto:start@karmalab.tech' },
  { label: 'Instagram', value: '@karmalab.tech', href: 'https://instagram.com/karmalab.tech' },
];

export const ContactModal = ({ open, onClose }: ContactModalProps) => {
  if (!open) return null;
  return (
  <>
    <div
      onClick={onClose}
      className="fixed inset-0 z-90"
      style={{
        background: 'rgba(0,0,0,.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    />

    <div
      className="fixed top-1/2 left-1/2 z-91 bg-kl-ink border border-white/14 rounded-xl p-8 pb-7 md:px-11 md:pt-11 md:pb-10"
      style={{
        transform: 'translate(-50%, -50%)',
        width: 'min(560px, 92vw)',
        boxShadow: '0 40px 120px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.06)',
      }}
    >
      <div className="flex justify-between items-start mb-12">
        <div
          className="font-sans font-light leading-none tracking-[-0.04em] text-kl-bone"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
        >
          Say hi.
        </div>
        <KLIconButton onClick={onClose} accent="pink" size={40} title="Close">
          <IconClose size={18} stroke={2.2} />
        </KLIconButton>
      </div>

      <div className="flex flex-col gap-0">
        {CONTACTS.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center py-5.5 border-t border-white/8 no-underline text-kl-lime cursor-pointer gap-3 transition-colors duration-180"
            style={{
              borderBottom: i === CONTACTS.length - 1 ? '1px solid var(--border-1)' : 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--kl-lime)';
            }}
          >
            <KLMeta style={{ color: 'var(--kl-ash)' }}>{c.label}</KLMeta>
            <div className="font-sans font-light text-[22px] tracking-[-0.02em]">{c.value}</div>
            <IconArrowUpRight size={16} stroke={1.75} style={{ opacity: 0.5 }} />
          </a>
        ))}
      </div>
    </div>
  </>
  );
};
