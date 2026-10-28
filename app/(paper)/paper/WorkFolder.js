'use client';

import { useEffect, useRef, useState } from 'react';
import { filters } from '@/lib/projects';
import { Arrow, GitHubMark } from './Bits';
import { Reveal } from './Reveal';
import s from './paper.module.css';

// The "spec work" folder from the reference, filled with every project in
// lib/projects.js. Tabs filter by category; the row scrolls sideways with
// snap points, and the arrow buttons page through it.
export function WorkFolder({ projects }) {
  const [tab, setTab] = useState('all');
  const [edge, setEdge] = useState({ start: true, end: false });
  const rail = useRef(null);

  const list = tab === 'all' ? projects : projects.filter((p) => p.cat === tab);

  const measure = () => {
    const el = rail.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
    });
  };

  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    el.scrollTo({ left: 0 });
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [tab]);

  const page = (dir) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className={`${s.section} ${s.workSection}`} id="work">
      <Reveal className={s.sectionHead}>
        <span className={`${s.eyebrow} ${s.eyebrow_blush}`}>▸ Projects</span>
        <h2 className={s.h2}>Things I&apos;ve built</h2>
        <p className={s.lead}>Open-source apps, tools and tinkering — mobile, web and desktop.</p>
      </Reveal>

      <Reveal className={s.folder}>
        <div className={s.tabs} role="tablist" aria-label="Filter projects">
          {filters.map((f) => {
            const count =
              f.key === 'all' ? projects.length : projects.filter((p) => p.cat === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={tab === f.key}
                className={`${s.tabBtn} ${tab === f.key ? s.tabOn : ''}`}
                onClick={() => setTab(f.key)}
              >
                {f.label}
                <small>{count}</small>
              </button>
            );
          })}
        </div>

        <div className={s.folderBody}>
          <div className={s.railWrap}>
            <ul className={s.rail} ref={rail}>
              {list.map((p) => (
                <li key={p.name} className={s.proj}>
                  <div className={s.projArt} style={{ '--c': p.c, '--d': p.d }}>
                    <span className={s.tag}>{p.kind}</span>
                    <span className={s.projEmoji} aria-hidden="true">
                      {p.emo}
                    </span>
                    <b className={s.projName}>{p.name}</b>
                  </div>
                  <p className={s.projDesc}>{p.desc}</p>
                  <div className={s.chips}>
                    {p.tags.map((t) => (
                      <span key={t} className={s.chip}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={s.projLinks}>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer">
                        Demo <Arrow diagonal />
                      </a>
                    )}
                    {p.code && (
                      <a href={p.code} target="_blank" rel="noopener noreferrer" className={s.muted}>
                        Code <Arrow diagonal />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`${s.railBtn} ${s.railPrev}`}
              onClick={() => page(-1)}
              disabled={edge.start}
              aria-label="Previous projects"
            >
              <Arrow up={false} />
            </button>
            <button
              type="button"
              className={`${s.railBtn} ${s.railNext}`}
              onClick={() => page(1)}
              disabled={edge.end}
              aria-label="More projects"
            >
              <Arrow />
            </button>
          </div>

          <div className={s.folderFoot}>
            <span>
              Like what you see? <b>Let&apos;s build something together.</b>
            </span>
            <a className={s.contactField} href="https://github.com/ltatarev" target="_blank" rel="noopener noreferrer">
              <span className={s.mono}>
                <GitHubMark /> github.com/ltatarev
              </span>
              <span className={`${s.btn} ${s.btnInk} ${s.btnSm}`}>Open</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
