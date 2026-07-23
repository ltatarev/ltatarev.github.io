'use client';

import { useEffect } from 'react';
import ui from '@/styles/shared.module.css';
import { FolderIcon } from './FolderIcon';
import styles from './ProjectWindow.module.css';
import { TitleBar, Window } from './Window';

export function ProjectWindow({ project, open, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    // The scrim stays mounted so the project keeps rendering through the close transition.
    <div
      className={`${styles.scrim} ${open ? styles.open : ''}`.trim()}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <Window
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
