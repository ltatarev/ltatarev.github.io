'use client';

import { useEffect, useState } from 'react';
import { filters, projects } from '@/lib/projects';
import { FolderIcon } from './FolderIcon';
import { ProjectWindow } from './ProjectWindow';

function count(key) {
  return key === 'all' ? projects.length : projects.filter(p => p.cat === key).length;
}

export function Finder() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function openWin(project) {
    setActive(project);
    setOpen(true);
  }

  return (
    <>
      <div className="win finder">
        <aside className="fsidebar">
          <div className="fs-group">Favorites</div>
          {filters.map(f => (
            <button
              key={f.key}
              className={`fs-item${filter === f.key ? ' active' : ''}`}
              type="button"
              onClick={() => setFilter(f.key)}
            >
              <span className="dot" style={{ background: f.dot }}>
                {f.star ? '★' : ''}
              </span>{' '}
              {f.label} <span className="fs-count">{count(f.key)}</span>
            </button>
          ))}
        </aside>
        <div className="fmain">
          <div className="fgrid">
            {projects.map(p => (
              <button
                key={p.name}
                className={`folder-btn${filter === 'all' || p.cat === filter ? '' : ' hide'}`}
                type="button"
                onClick={() => openWin(p)}
              >
                <FolderIcon c={p.c} d={p.d} emo={p.emo} />
                <span className="folder-lbl">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProjectWindow open={open} project={active} onClose={() => setOpen(false)} />
    </>
  );
}
