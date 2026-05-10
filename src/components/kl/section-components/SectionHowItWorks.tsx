import { KLMeta, KLSectionNumber, KLBorderedGrid, KLBorderedCell } from '../Primitives';
import { sectionWrap } from './shared';

const phases = [
  {
    n: '01', label: 'Pipeline design',
    lead: 'You come with something vague, partial, or broken.',
    lines: ['You leave with clarity.', 'But you can also stay and build it with us.'],
  },
  {
    n: '02', label: 'Production',
    lead: 'Then we build it together.',
    lines: ['We assemble the team.', 'We direct the process.', 'We keep the whole thing coherent.'],
  },
  {
    n: '03', label: 'Technology',
    lead: 'We design with transparency and the right tool for the job.',
    lines: [
      'What matters for us is to show and explain to you how it works, how it is trained and optimized, what it produces, and what it removes at scale.',
      'This knowledge is part of the process.',
    ],
  },
];

export const SectionHowItWorks = () => (
  <section id="how-it-works" style={sectionWrap}>
    <div style={{ marginBottom: 56 }}>
      <KLSectionNumber n="02" label="How it works" />
    </div>

    <KLBorderedGrid columns={3}>
      {phases.map((p, i) => (
        <KLBorderedCell key={p.n} hasRight={i < phases.length - 1} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <KLMeta color="var(--kl-pink)">Phase {p.n}</KLMeta>
          <div style={{
            marginTop: 24,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400, fontSize: 28,
            letterSpacing: '-0.02em', color: 'var(--kl-bone)', lineHeight: 1.12,
          }}>{p.label}</div>
          <p style={{
            marginTop: 20, color: 'var(--kl-bone)', fontSize: 17,
            lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300,
          }}>{p.lead}</p>
          {p.lines.map((line, li) => (
            <p key={li} style={{ marginTop: li === 0 ? 16 : 6, color: 'var(--kl-fog)', fontSize: 15, lineHeight: 1.55 }}>
              {line}
            </p>
          ))}
        </KLBorderedCell>
      ))}
    </KLBorderedGrid>
  </section>
);
