import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../../../data/projects';
import { KLIconButton } from '../Primitives';
import { IconClose } from '../Icons';

interface ProjectsGridProps {
  projects: Project[];
}

const TARGET_COLS = 2;

interface VideoModalProps {
  src: string | null;
  client: string | null;
  title: string | null;
  onClose: () => void;
}

const VideoModal = ({ src, client, title, onClose }: VideoModalProps) => {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [src, onClose]);

  if (typeof document === 'undefined') return null;
  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0"
        style={{
          background: 'rgba(0,0,0,.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          opacity: src ? 1 : 0,
          pointerEvents: src ? 'auto' : 'none',
          transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
          zIndex: 92,
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Project video"
        className="fixed top-1/2 left-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${src ? 1 : 0.96})`,
          opacity: src ? 1 : 0,
          pointerEvents: src ? 'auto' : 'none',
          transition:
            'opacity 320ms cubic-bezier(.22,1,.36,1), transform 420ms cubic-bezier(.22,1,.36,1)',
          zIndex: 200,
          width: 'min(1100px, 94vw)',
        }}
      >
        {/* Close button sits above the video */}
        <div className="flex justify-end mb-3">
          <KLIconButton onClick={onClose} accent="pink" size={40} title="Close video">
            <IconClose size={18} stroke={2.2} />
          </KLIconButton>
        </div>

        {/* Video — aspect-ratio container ensures correct size even before/after load */}
        <div
          className="relative w-full rounded-2xl overflow-hidden bg-kl-black"
          style={{ aspectRatio: '16 / 9', boxShadow: '0 40px 120px rgba(0,0,0,.8)' }}
        >
          <video
            key={src ?? ''}
            src={src ?? undefined}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full block"
          />
          {client || title ? (
            <div
              className="absolute bottom-0 left-0 w-full text-white font-sans text-sm"
              style={{
                padding: '60px 16px 12px',
                background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              }}
            >
              {client && <div className="font-bold text-[18px] mb-1">{client}</div>}
              {title && <div>{title}</div>}
            </div>
          ) : null}
        </div>
      </div>
    </>,
    document.body,
  );
};

export const SectionProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const activeVideo = activeProject?.video ?? null;

  const paddedCount =
    projects.length === 0
      ? TARGET_COLS
      : Math.ceil(Math.max(projects.length, 1) / TARGET_COLS) * TARGET_COLS;

  type GridCell = Project | null;
  const gridCells: GridCell[] = [
    ...projects,
    ...Array<null>(paddedCount - projects.length).fill(null),
  ];

  return (
    <>
      <section aria-label="Projects" className="relative bg-kl-black">
        <div
          className="grid gap-0.75"
          style={{ gridTemplateColumns: `repeat(${TARGET_COLS}, 1fr)` }}
        >
          {gridCells.map((cell, i) => {
            const clickable = Boolean(cell?.modal && cell?.video);
            return (
              <div
                key={i}
                onClick={() => {
                  if (clickable) setActiveProject(cell!);
                }}
                aria-label={clickable ? `Play ${cell!.title}` : undefined}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') setActiveProject(cell!);
                      }
                    : undefined
                }
                className="relative overflow-hidden outline-none"
                style={{
                  aspectRatio: '16 / 9',
                  background: '#000',
                  cursor: clickable ? 'pointer' : 'default',
                  transition: 'filter 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (cell) (e.currentTarget as HTMLElement).style.filter = 'brightness(1.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = '';
                }}
                onFocus={(e) => {
                  if (clickable)
                    (e.currentTarget as HTMLElement).style.outline = '2px solid var(--kl-lime)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.outline = 'none';
                }}
              >
                {cell?.video && (
                  <video
                    src={cell.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <VideoModal
        src={activeVideo}
        client={activeProject?.client ?? null}
        title={activeProject?.title ?? ''}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
};
