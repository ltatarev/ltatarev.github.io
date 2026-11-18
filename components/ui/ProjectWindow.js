'use client';

import { useEffect, useRef } from 'react';
import ui from '@/styles/shared.module.css';
import { FolderIcon } from './FolderIcon';
import styles from './ProjectWindow.module.css';
import { TitleBar, Window } from './Window';

export function ProjectWindow({ project, open, onClose }) {
  const winRef = useRef(null);
  // Finder passes a new onClose on each render; a ref keeps the effect tied to `open` only.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    // Move focus into the window, and give it back to the folder on close.
    const opener = document.activeElement;
    winRef.current?.querySelector('button')?.focus({ preventScroll: true });

    function onKey(e) {
      if (e.key === 'Escape') closeRef.current();
    }

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    // The scrim stays mounted so the project keeps rendering through the close transition.
    <div
      className={`${styles.scrim} ${open ? styles.open : ''}`.trim()}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
      // closed, the window stays mounted for the fade, so take it out of the tab order
      inert={!open}
    >
      <Window
        ref={winRef}
        className={styles.pwin}
        role="dialog"
        aria-modal="true"
        aria-label={project?.name ?? ''}
      >
        <TitleBar title={project ? `${project.name} — Finder` : 'project'} onClose={onClose} />
        <div className={styles.body}>
          <div className={styles.hero}>
            {project && <FolderIcon c={project.c} d={project.d} emo={project.emo} />}
            <div>
              <h3>{project?.name}</h3>
              <div className={styles.kind}>{project?.kind}</div>
            </div>
          </div>
          <p>{project?.desc}</p>
          <div className={styles.tags}>
            {project?.tags.map((t) => (
              <span key={t} className={ui.chip}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.actions}>
            {project?.demo && (
              <a
                className={`${styles.btn} ${styles.primary}`}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open demo
              </a>
            )}
            {project?.code && (
              <a
                className={`${styles.btn} ${styles.ghost}`}
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                View code
              </a>
            )}
          </div>
        </div>
      </Window>
    </div>
  );
}
