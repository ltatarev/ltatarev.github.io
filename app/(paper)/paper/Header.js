'use client';

import { useEffect, useState } from 'react';
import { Arrow } from './Bits';
import s from './paper.module.css';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
];

export function Header() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`${s.head} ${scrolled ? s.headScrolled : ''}`}>
      <div className={s.headIn}>
        <a className={s.wordmarkSm} href="#top" onClick={() => setOpen(false)}>
          Lucija Tatarevic <span className={s.sep}>·</span>{' '}
          <span className={s.role}>Software developer</span>
        </a>

        <nav className={`${s.nav} ${open ? s.navOpen : ''}`} aria-label="Sections">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? s.navActive : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {/* plain <a>: the desktop theme is a separate stylesheet, see lib/routes.js */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className={s.navTheme} href="/">
            ◐ Desktop theme
          </a>
        </nav>

        <div className={s.headRight}>
          <a className={`${s.btn} ${s.btnInk} ${s.btnSm} ${s.headCta}`} href="#contact">
            Say hi <Arrow />
          </a>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}
