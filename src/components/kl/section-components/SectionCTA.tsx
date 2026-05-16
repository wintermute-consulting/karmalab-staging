import { KLButton } from '../KLButton';
import { IconArrowRight, IconArrowUpRight } from '../Icons';
import { sectionWrapClass } from './shared';

interface SectionCTAProps {
  onContact: () => void;
}

export const SectionCTA = ({ onContact }: SectionCTAProps) => (
  <section
    id="cta"
    className={sectionWrapClass}
    style={{
      borderTop: '1px solid var(--border-1)',
    }}
  >
    <div className="flex items-center gap-[clamp(32px,5vw,80px)] max-md:flex-col max-md:gap-10">
      <div className="flex-none basis-[40%] max-w-[40%] max-md:flex-none max-md:max-w-[min(280px,72vw)] max-md:w-full max-md:mx-auto">
        <img src="/assets/dog.png" alt="" className="w-full h-auto block rounded-2xl" />
      </div>

      <div className="flex-1 max-md:max-w-full">
        <div
          className="font-sans font-light text-kl-bone leading-tight tracking-tighter"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          Bring your <span className="text-kl-pink">ideas</span>
        </div>

        <div className="mt-16 flex gap-4 items-center flex-wrap max-md:flex-col max-md:items-start max-md:gap-2.5">
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
