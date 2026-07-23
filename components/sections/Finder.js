'use client';

import { useEffect, useState } from 'react';
import { filters, projects } from '@/lib/projects';
import styles from './Finder.module.css';
import { FolderIcon } from '@/components/ui/FolderIcon';
import { ProjectWindow } from '@/components/ui/ProjectWindow';
import { Window } from '@/components/ui/Window';

function count(key) {
  return key === 'all' ? projects.length : projects.filter((p) => p.cat === key).length;
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
      <Window className={styles.finder}>
        <aside className={styles.sidebar}>
          <div className={styles.group}>Favorites</div>
          {filters.map((f) => (
            <button
              key={f.key}
              className={`${styles.item} ${filter === f.key ? styles.active : ''}`.trim()}
              type="button"
              onClick={() => setFilter(f.key)}
            >
              <span className={styles.dot} style={{ background: f.dot }}>
                {f.star ? '★' : ''}
              </span>{' '}
              {f.label} <span className={styles.count}>{count(f.key)}</span>
            </button>
          ))}
        </aside>
        <div className={styles.main}>
          <div className={styles.grid}>
            {projects.map((p) => (
              <button
                key={p.name}
                className={`${styles.folderBtn} ${
                  filter === 'all' || p.cat === filter ? '' : styles.hide
                }`.trim()}
                type="button"
                onClick={() => openWin(p)}
              >
                <FolderIcon c={p.c} d={p.d} emo={p.emo} />
                <span className={styles.folderLabel}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Window>

      <ProjectWindow open={open} project={active} onClose={() => setOpen(false)} />
    </>
  );
}
