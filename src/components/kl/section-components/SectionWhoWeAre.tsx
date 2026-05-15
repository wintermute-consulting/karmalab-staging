import { KLButton, KLSectionNumber } from '../Primitives';
import { IconArrowUpRight } from '../Icons';
import { sectionWrap, sectionWrapClass } from './shared';

const portraitNoiseSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='.45'/></svg>",
);

export const SectionWhoWeAre = () => (
  <section
    id="who-we-are"
    className={`kl-section-wrap ${sectionWrapClass}`}
    style={{ ...sectionWrap, paddingTop: 192 }}
  >
    <div className="mb-14">
      <KLSectionNumber n="05" label="Who we are" />
    </div>

    <div
      className="kl-who-grid grid items-start"
      style={{ gridTemplateColumns: '340px 1fr', gap: 64 }}
    >
      {/* Portrait placeholder */}
      <div
        className="kl-who-portrait w-full aspect-[3/4] rounded-md overflow-hidden relative border border-white/8"
        style={{
          background:
            'linear-gradient(135deg, hsl(320 30% 18%) 0%, hsl(320 20% 8%) 60%, #000 100%)',
        }}
      >
        <div
          className="absolute inset-0 mix-blend-overlay opacity-35"
          style={{ backgroundImage: `url("data:image/svg+xml;utf8,${portraitNoiseSvg}")` }}
        />
        <div className="absolute left-3.5 top-3.5 font-mono text-[10px] tracking-[0.12em] uppercase text-kl-ash">
          portrait / placeholder
        </div>
        <div className="absolute left-3.5 bottom-3.5 right-3.5">
          <div className="font-sans font-normal text-[17px] text-kl-bone tracking-[-0.01em]">
            Rony Efrat
          </div>
          <div className="text-kl-ash text-xs mt-0.5">Founder</div>
        </div>
      </div>

      {/* Bio text */}
      <div>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[640px] m-0 mb-7">
          KarmaLab was founded by <span className="text-kl-pink">Rony Efrat</span>, a filmmaker
          working across film, code, and hybrid production, with parallel work in policy and in
          teaching how technology is built and shapes systems.
        </p>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[640px] m-0 mb-7">
          She was joined by <span className="text-kl-pink">Pierre de Milly</span>, a software
          engineer and AI researcher with an insatiable curiosity for creating digital experiences.
        </p>
        <p className="font-sans font-light text-xl text-kl-bone leading-[1.55] max-w-[640px] mb-7">
          <span className="text-kl-pink">KarmaLab</span> turns our ideas into a working structure.
        </p>
        <p className="text-kl-fog text-base leading-[1.55] max-w-[560px]">
          We work with a multi-cultural network of 20+ professionals across disciplines and
          languages.
        </p>
        <div className="mt-9">
          <KLButton
            size="md"
            href="https://www.arte.tv/fr/videos/133035-000-A/rencontre-avec-rony-efrat/"
            target="_blank"
          >
            Watch the interview <IconArrowUpRight size={14} />
          </KLButton>
        </div>
      </div>
    </div>
  </section>
);
