import { KLButton, KLSectionNumber } from '../Primitives';
import { IconArrowUpRight } from '../Icons';
import { sectionWrap } from './shared';

const portraitNoiseSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='.45'/></svg>"
);

export const SectionWhoWeAre = () => (
  <section id="who-we-are" style={{ ...sectionWrap, paddingTop: 192 }}>
    <div style={{ marginBottom: 56 }}>
      <KLSectionNumber n="05" label="Who we are" />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, alignItems: 'start' }}>
      {/* Portrait placeholder */}
      <div style={{
        width: '100%', aspectRatio: '3 / 4',
        borderRadius: 14, overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(135deg, hsl(320 30% 18%) 0%, hsl(320 20% 8%) 60%, #000 100%)',
        border: '1px solid var(--border-1)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml;utf8,${portraitNoiseSvg}")`,
          mixBlendMode: 'overlay', opacity: 0.35,
        }} />
        <div style={{
          position: 'absolute', left: 14, top: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--kl-ash)',
        }}>portrait / placeholder</div>
        <div style={{ position: 'absolute', left: 14, bottom: 14, right: 14 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400, fontSize: 17, color: 'var(--kl-bone)', letterSpacing: '-0.01em',
          }}>Rony Efrat</div>
          <div style={{ color: 'var(--kl-ash)', fontSize: 12, marginTop: 2 }}>Founder</div>
        </div>
      </div>

      {/* Bio text */}
      <div>
        <p style={{
          color: 'var(--kl-bone)', fontSize: 20, lineHeight: 1.55, maxWidth: 640, margin: 0,
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
        }}>
          KarmaLab was founded by <span style={{ color: 'var(--kl-pink)' }}>Rony Efrat</span>, a filmmaker working across film, code, and hybrid production, with parallel work in policy and in teaching how technology is built and shapes systems.
        </p>
        <p style={{
          marginTop: 28, color: 'var(--kl-bone)', fontSize: 20, lineHeight: 1.55, maxWidth: 640,
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
        }}>
          KarmaLab turns this into a working structure.
        </p>
        <p style={{ marginTop: 28, color: 'var(--kl-fog)', fontSize: 16, lineHeight: 1.55, maxWidth: 560 }}>
          We work with a multi-cultural network of 20+ professionals across disciplines and languages.
        </p>
        <div style={{ marginTop: 36 }}>
          <KLButton size="md" onClick={() => {}}>
            Watch the interview <IconArrowUpRight size={14} />
          </KLButton>
        </div>
      </div>
    </div>
  </section>
);
