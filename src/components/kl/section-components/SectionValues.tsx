import { KLMeta, KLSectionNumber, KLBorderedGrid, KLBorderedCell } from '../Primitives';
import { sectionWrap } from './shared';

const values = [
  { n: '01', t: 'Hybrid by design', d: 'Human-led, technology-extended.' },
  { n: '02', t: 'Knowledge is part of the product', d: 'The more you know, the better you decide.' },
  { n: '03', t: 'Respect the people who build', d: 'Craft matters, people matter.' },
];

export const SectionValues = () => (
  <section id="values" style={{ ...sectionWrap, paddingTop: 192 }}>
    <div style={{ marginBottom: 56 }}>
      <KLSectionNumber n="04" label="Values" />
    </div>

    <KLBorderedGrid columns={3} style={{ marginTop: 80 }}>
      {values.map((v, i) => (
        <KLBorderedCell key={v.n} hasRight={i < values.length - 1}>
          <KLMeta color="var(--kl-pink)" style={{ fontSize: 13 }}>{v.n}</KLMeta>
          <div style={{
            marginTop: 24,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400, fontSize: 26,
            letterSpacing: '-0.02em', color: 'var(--kl-bone)', lineHeight: 1.15,
          }}>{v.t}</div>
          <p style={{ marginTop: 14, color: 'var(--kl-fog)', fontSize: 16, lineHeight: 1.55 }}>{v.d}</p>
        </KLBorderedCell>
      ))}
    </KLBorderedGrid>
  </section>
);
