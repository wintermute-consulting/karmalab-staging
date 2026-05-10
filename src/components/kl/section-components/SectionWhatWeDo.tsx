import { KLButton, KLMeta, KLSectionNumber, KLTag, KLBorderedGrid } from '../Primitives';
import { IconArrowRight } from '../Icons';
import { sectionWrap } from './shared';

const disciplines = [
  {
    n: '01', label: 'Films & commercials',
    copy: 'Ideas brought to screen through film, motion, and visual storytelling.',
    tags: ['concept', 'production', 'CGI', 'post-production'],
    caseStudy: '/projects/films-and-commercials',
  },
  {
    n: '02', label: 'Interactive installations',
    copy: 'Spaces that react, transform, and invite people to participate.',
    tags: ['projection mapping', 'interactive exhibitions', 'real-time visuals', 'spatial experiences'],
    caseStudy: false as false,
  },
  {
    n: '03', label: 'Digital experiences',
    copy: 'Online experiences designed to be explored, played with, and shared.',
    tags: ['websites', 'mobile apps', 'interactive platforms', 'live experiences'],
    caseStudy: false as false,
  },
  {
    n: '04', label: 'AI & generative systems',
    copy: 'Creative tools and visuals powered by generative technologies.',
    tags: ['AI generation', 'generative video', 'conversational systems', 'creative automation'],
    caseStudy: false as false,
  },
  {
    n: '05', label: 'Creative technology',
    copy: 'Custom systems connecting code, visuals, sound, and physical space.',
    tags: ['creative coding', 'XR / AR', 'computer vision', 'custom pipelines'],
    caseStudy: false as false,
  },
];

export const SectionWhatWeDo = () => (
  <section id="what-we-do" style={sectionWrap}>
    <div style={{ marginBottom: 56 }}>
      <KLSectionNumber n="01" label="What we do" />
    </div>

    <div style={{ maxWidth: 780, marginBottom: 80 }}>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300,
        fontSize: 'clamp(22px, 2.8vw, 32px)',
        lineHeight: 1.4,
        letterSpacing: '-0.02em',
        color: 'var(--kl-bone)',
        margin: 0,
      }}>
        You come to us when something needs to take shape.{' '}
        <span style={{ color: 'var(--kl-pink)' }}>With just an idea.</span>
      </p>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300,
        fontSize: 'clamp(22px, 2.8vw, 32px)',
        lineHeight: 1.4,
        letterSpacing: '-0.02em',
        color: 'var(--kl-fog)',
        marginTop: 16,
      }}>
        We design the hybrid pipeline that makes it work.
      </p>
    </div>

    <KLBorderedGrid>
      {disciplines.map((d) => (
        <article key={d.n} style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr 1.2fr',
          gap: 24,
          alignItems: 'baseline',
          padding: '28px 0',
          borderBottom: '1px solid var(--border-1)',
        }}>
          <KLMeta color="var(--kl-pink)">§ {d.n}</KLMeta>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400, fontSize: 24,
              letterSpacing: '-0.02em', color: 'var(--kl-bone)', lineHeight: 1.15,
            }}>{d.label}</div>
            <p style={{
              color: 'var(--kl-fog)', fontSize: 15, lineHeight: 1.55,
              marginTop: 8, maxWidth: 440, fontWeight: 300
            }}>{d.copy}</p>
            {d.caseStudy && (
              <div style={{ marginTop: 12 }}>
                <KLButton variant="text" size="sm" onClick={() => { window.location.href = d.caseStudy as string; }}>
                  View projects <IconArrowRight size={12} />
                </KLButton>
              </div>
            )}
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            alignSelf: 'center', justifyContent: 'flex-end',
          }}>
            {d.tags.map((t) => (
              <KLTag key={t}>{t}</KLTag>
            ))}
          </div>
        </article>
      ))}
    </KLBorderedGrid>
  </section>
);
