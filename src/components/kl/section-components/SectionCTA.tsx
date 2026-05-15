import { KLButton, KLSectionNumber } from '../Primitives';
import { IconArrowRight, IconArrowUpRight } from '../Icons';
import { sectionWrap, sectionWrapClass } from './shared';

interface SectionCTAProps {
  onContact: () => void;
}

export const SectionCTA = ({ onContact }: SectionCTAProps) => (
  <section
    id="cta"
    className={`kl-section-wrap ${sectionWrapClass}`}
    style={{
      ...sectionWrap,
      paddingTop: 192,
      paddingBottom: 192,
      borderTop: '1px solid var(--border-1)',
    }}
  >
    <div className="kl-cta-inner flex items-center" style={{ gap: 'clamp(32px, 5vw, 80px)' }}>
      <div className="kl-cta-image" style={{ flex: '0 0 40%', maxWidth: '40%' }}>
        <img src="/assets/dog.png" alt="" className="w-full h-auto block rounded-2xl" />
      </div>

      <div className="kl-cta-text" style={{ flex: '1 1 0' }}>
        <div
          className="font-sans font-light text-kl-bone leading-[0.95] tracking-tighter"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          Bring your <span className="text-kl-pink">ideas</span>
        </div>

        <div className="kl-cta-text-btns mt-16 flex gap-4 items-center flex-wrap">
          <KLButton size="lg" onClick={onContact}>
            Contact us <IconArrowUpRight size={16} />
          </KLButton>
          <KLButton
            variant="text"
            size="md"
            onClick={() => window.open('https://instagram.com/karmalab.tech', '_blank')}
          >
            or follow us on Instagram <IconArrowRight size={14} />
          </KLButton>
        </div>
      </div>
    </div>
  </section>
);
