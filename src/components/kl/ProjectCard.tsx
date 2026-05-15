import { KLMeta } from './Primitives';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article style={{ borderBottom: '1px solid var(--border-1)', padding: '64px 0' }}>
      <KLMeta color="var(--kl-pink)">{project.client}</KLMeta>
      <h3
        style={{
          marginTop: 16,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 400,
          fontSize: 28,
          letterSpacing: '-0.02em',
          color: 'var(--kl-bone)',
          lineHeight: 1.15,
        }}
      >
        {project.title}
      </h3>
    </article>
  );
};
