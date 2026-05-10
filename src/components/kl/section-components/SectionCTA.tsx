import { KLButton, KLSectionNumber } from '../Primitives';
import { IconArrowRight, IconArrowUpRight } from '../Icons';
import { sectionWrap } from './shared';

interface SectionCTAProps {
  onContact: () => void;
}

export const SectionCTA = ({ onContact }: SectionCTAProps) => (
  <section id="cta" style={{
    ...sectionWrap,
    paddingTop: 192, paddingBottom: 192,
    borderTop: '1px solid var(--border-1)',
  }}>
    <div style={{ marginBottom: 80 }}>
      <KLSectionNumber n="06" label="Start a project" />
    </div>

    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 300,
      fontSize: 'clamp(48px, 8vw, 128px)',
      lineHeight: 0.95, letterSpacing: '-0.05em',
      color: 'var(--kl-bone)',
    }}>
      Let us bring your <span style={{ color: 'var(--kl-pink)' }}>idea</span> to life.
    </div>

    <div style={{ marginTop: 64, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <KLButton size="lg" onClick={onContact}>
        Contact us <IconArrowUpRight size={16} />
      </KLButton>
      <KLButton variant="text" size="md" onClick={() => window.open('https://instagram.com/karmalab.tech', '_blank')}>
        or follow us on Instagram <IconArrowRight size={14} />
      </KLButton>
    </div>
  </section>
);
