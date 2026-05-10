export interface ProjectImage {
  /** CSS gradient string for placeholder bg */
  color?: string;
  /** Path to actual image (overrides color placeholder) */
  src?: string;
  caption: string;
}

export interface Project {
  client: string;
  title: string;
  description: string;
  keywords: string[];
  link?: { label: string; href: string };
  images: ProjectImage[];
}

export interface Category {
  slug: string;
  n: string;
  label: string;
  copy: string;
  tags: string[];
  projects: Project[];
}

export const categories: Category[] = [
  {
    slug: 'films-and-commercials',
    n: '01',
    label: 'Films & commercials',
    copy: 'Ideas brought to screen through film, motion, and visual storytelling.',
    tags: ['concept', 'production', 'CGI', 'post-production'],
    projects: [
      {
        client: 'ARTE',
        title: 'Placeholder project title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short film exploring the intersection of archival footage and generative imagery.',
        keywords: ['documentary', 'CGI', 'post-production'],
        link: { label: 'Watch on ARTE.tv', href: 'https://www.arte.tv' },
        images: [
          { color: 'linear-gradient(135deg, hsl(280 30% 15%), hsl(280 20% 6%))', caption: 'still 1 / placeholder' },
          { color: 'linear-gradient(135deg, hsl(320 30% 15%), hsl(320 20% 6%))', caption: 'still 2 / placeholder' },
          { color: 'linear-gradient(135deg, hsl(200 30% 15%), hsl(200 20% 6%))', caption: 'still 3 / placeholder' },
        ],
      },
      {
        client: 'Cinétévé',
        title: 'Placeholder project title',
        description:
          'Lorem ipsum dolor sit amet. A commercial campaign combining live-action footage with procedural CGI environments and real-time compositing.',
        keywords: ['commercial', 'concept', 'CGI', 'real-time'],
        link: { label: 'Visit website', href: '#' },
        images: [
          { color: 'linear-gradient(135deg, hsl(160 25% 14%), hsl(160 18% 6%))', caption: 'frame 1 / placeholder' },
          { color: 'linear-gradient(135deg, hsl(40 30% 15%), hsl(40 20% 6%))', caption: 'frame 2 / placeholder' },
        ],
      },
      {
        client: 'France Télévisions',
        title: 'Placeholder project title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A series of broadcast segments integrating motion graphics and hybrid production techniques.',
        keywords: ['broadcast', 'motion graphics', 'production'],
        images: [
          { color: 'linear-gradient(135deg, hsl(220 28% 15%), hsl(220 20% 7%))', caption: 'capture 1 / placeholder' },
          { color: 'linear-gradient(135deg, hsl(350 25% 14%), hsl(350 18% 6%))', caption: 'capture 2 / placeholder' },
          { color: 'linear-gradient(135deg, hsl(90 20% 12%), hsl(90 15% 5%))', caption: 'capture 3 / placeholder' },
          { color: 'linear-gradient(135deg, hsl(260 22% 13%), hsl(260 16% 6%))', caption: 'capture 4 / placeholder' },
        ],
      },
    ],
  },
  {
    slug: 'interactive-installations',
    n: '02',
    label: 'Interactive installations',
    copy: 'Spaces that react, transform, and invite people to participate.',
    tags: ['projection mapping', 'interactive exhibitions', 'real-time visuals', 'spatial experiences'],
    projects: [],
  },
  {
    slug: 'digital-experiences',
    n: '03',
    label: 'Digital experiences',
    copy: 'Online experiences designed to be explored, played with, and shared.',
    tags: ['websites', 'mobile apps', 'interactive platforms', 'live experiences'],
    projects: [],
  },
  {
    slug: 'ai-and-generative-systems',
    n: '04',
    label: 'AI & generative systems',
    copy: 'Creative tools and visuals powered by generative technologies.',
    tags: ['AI generation', 'generative video', 'conversational systems', 'creative automation'],
    projects: [],
  },
  {
    slug: 'creative-technology',
    n: '05',
    label: 'Creative technology',
    copy: 'Custom systems connecting code, visuals, sound, and physical space.',
    tags: ['creative coding', 'XR / AR', 'computer vision', 'custom pipelines'],
    projects: [],
  },
];
