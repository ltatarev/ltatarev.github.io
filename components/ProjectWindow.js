'use client';

import { useEffect } from 'react';
import { FolderIcon } from './FolderIcon';

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
      className={`scrim${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div className="win pwin" role="dialog" aria-modal="true" aria-label={project?.name ?? ''}>
        <div className="titlebar">
          <div className="lights">
            <button
              className="light l-r"
              type="button"
              title="Close"
              aria-label="Close"
              onClick={onClose}
            />
            <span className="light l-y" />
            <span className="light l-g" />
          </div>
          <span className="title-txt">{project ? `${project.name} — Finder` : 'project'}</span>
        </div>
        <div className="pwin-body">
          <div className="pwin-hero">
            {project && <FolderIcon c={project.c} d={project.d} emo={project.emo} />}
            <div>
              <h3>{project?.name}</h3>
              <div className="kind">{project?.kind}</div>
            </div>
          </div>
          <p>{project?.desc}</p>
          <div className="pwin-tags">
            {project?.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <div className="pwin-actions">
            {project?.demo && (
              <a
                className="mbtn primary"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open demo
              </a>
            )}
            {project?.code && (
              <a
                className="mbtn ghost"
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                View code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
