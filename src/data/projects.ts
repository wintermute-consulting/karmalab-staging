export interface Project {
  client?: string;
  title?: string;
  /** Path or URL to an MP4 for the projects grid. If omitted the cell renders empty (black). */
  video: string;
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
    tags: ['Projection mapping', 'Interactive displays', 'Scenography'],
    projects: [
      {
        client: 'Strike Against the Archive @ ADAGP',
        title: 'Interactive installations',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/strike.mp4',
        modal: true,
      },
      {
        client: 'Sanofi',
        title: 'Sensorial digital experience',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/sanofi.mp4',
        modal: true,
      },
    ],
  },
  {
    slug: 'digital-experiences',
    n: '03',
    label: 'Digital experiences',
    copy: 'Online experiences designed to be explored, played with, and shared.',
    tags: ['Websites', 'Mobile apps', 'Workflow automation'],
    projects: [
      {
        client: 'Peter Lindbergh',
        title: 'Design by David Polonia',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/peter_lindbergh.mp4',
        modal: true,
      },
      {
        client: 'Kenzo',
        title: 'Design by Kim Boutin',
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/kenzo.mp4',
        modal: true,
      },
      {
        video: 'https://karmalab-cdn.s3.us-east-1.amazonaws.com/madame_c.mp4',
        modal: true,
      },
    ],
  },
];
