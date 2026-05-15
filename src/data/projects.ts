export interface Project {
  client: string;
  title: string;
  /** Path or URL to an MP4 for the projects grid. If omitted the cell renders empty (black). */
  video?: string;
  /** When true, clicking the cell opens the video in a fullscreen modal. */
  modal?: boolean;
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
    tags: ['Concept', 'Production', 'CGI', 'Post-production'],
    projects: [
      {
        client: 'ARTE',
        title: 'Urban Motion',
        video: 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4',
        modal: true,
      },
      {
        client: 'Cinétévé',
        title: 'Aerial Drift',
        video: 'https://videos.pexels.com/video-files/1321208/1321208-hd_1920_1080_30fps.mp4',
        modal: true,
      },
      {
        client: 'France Télévisions',
        title: 'Neon Nights',
        video: 'https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4',
        modal: true,
      },
      {
        client: 'Canal+',
        title: 'Fluid Dynamics',
        video: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4',
        modal: true,
      },
    ],
  },
  {
    slug: 'interactive-installations',
    n: '02',
    label: 'Interactive installations',
    copy: 'Spaces that react, transform, and invite people to participate.',
    tags: [
      'Projection mapping',
      'Interactive exhibitions',
      'Real-time visuals',
      'Spatial experiences',
    ],
    projects: [
      {
        client: 'Centre Pompidou',
        title: 'Abstract Forms',
        video: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
        modal: true,
      },
      {
        client: 'Gaîté Lyrique',
        title: 'Natural Textures',
        video: 'https://videos.pexels.com/video-files/2499611/2499611-hd_1920_1080_30fps.mp4',
        modal: true,
      },
    ],
  },
  {
    slug: 'digital-experiences',
    n: '03',
    label: 'Digital experiences',
    copy: 'Online experiences designed to be explored, played with, and shared.',
    tags: ['Websites', 'Mobile apps', 'Interactive platforms', 'Live experiences'],
    projects: [
      {
        client: 'Peter Lindergh',
        title: 'Design by David Polonia',
        video: '/videos/peter_lindbergh.mp4',
        modal: true,
      },
      {
        client: 'Kenzo',
        title: 'Design by Kim Boutin',
        video: '/videos/kenzo.mp4',
        modal: true,
      },
    ],
  },
  {
    slug: 'ai-and-generative-systems',
    n: '04',
    label: 'AI & generative systems',
    copy: 'Creative tools and visuals powered by generative technologies.',
    tags: ['AI generation', 'Generative video', 'Conversational systems', 'Creative automation'],
    projects: [
      {
        client: 'Arte Creative',
        title: 'Soft Architecture',
        video: 'https://videos.pexels.com/video-files/4434094/4434094-hd_1920_1080_25fps.mp4',
        modal: true,
      },
      {
        client: 'Renault',
        title: 'Studio Session',
        video: 'https://videos.pexels.com/video-files/3571251/3571251-hd_1920_1080_30fps.mp4',
        modal: false,
      },
    ],
  },
];
