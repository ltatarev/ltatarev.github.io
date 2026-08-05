'use client';

import Link from 'next/link';
import { Children, useEffect, useRef, useState } from 'react';
import styles from './legal.module.css';

export const EMAIL = 'rushed-marble-3q@icloud.com';

// The prose arrives from the server components as fragments — `<><p/><p/></>` — and a
// fragment crossing the RSC boundary is flattened into a bare array by the time it
// reaches this client component. Dropping that array straight into JSX is what React
// warns about ("each child in a list should have a unique key"), since it can't tell a
// flattened document from a mapped list. Children.toArray assigns the keys.
const keyed = (node) => Children.toArray(node);

// A value that still has to be filled in before launch. Kept visible on purpose —
// a placeholder that looks like finished copy is how a "[legal name]" ships.
export function Fill({ children }) {
  return <span className={styles.fill}>{children}</span>;
}

// The third-party table on the privacy policy. Wrapped in its own scroll box so a
// narrow phone scrolls the table rather than the whole document.
export function Table({ head, rows }) {
  return (
    <div className={styles.tblScroll}>
      <table className={styles.tbl}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              {row.cells.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The chrome shared by the privacy policy and the terms: the ambient field, the
// reading-progress hairline, a sticky nav, reveal-on-enter, a scroll-spied table of
// contents and the footer.
//
// The TOC and the document body are rendered from the same `sections` array, so a
// heading can never appear in one and not the other. "The short version" is the
// first entry in both — it's a card at the top of the prose column, not a preamble
// above it, so it is a spy target like any other section.
//
// Props:
//   title        — document title, also the <h1>
//   lede         — the paragraph under the title
//   lastUpdated  — the date shown in the stamp
//   shortVersion — body of the "short version" card
//   sections     — [{ id, title, body }], body is JSX
//   alt          — swap the ambient field to the terms' arrangement
export function LegalDoc({ title, lede, lastUpdated, shortVersion, sections, alt }) {
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const progRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // "The short version" is a real destination, so it leads the contents list.
  const entries = [{ id: 'short', title: 'The short version' }, ...sections];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pending = Array.from(root.querySelectorAll('[data-reveal]'));

    if (reduced || !('IntersectionObserver' in window)) {
      pending.forEach((el) => el.classList.add(styles.isIn));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entriesIn) => {
        entriesIn.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isIn);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));

    // Anything already on screen when the effect runs is swept in by rect, in case
    // the observer's first callback lands before layout has settled.
    const sweep = () => {
      for (let i = pending.length - 1; i >= 0; i -= 1) {
        const rect = pending[i].getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          pending[i].classList.add(styles.isIn);
          observer.unobserve(pending[i]);
          pending.splice(i, 1);
        }
      }
    };
    sweep();
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);
    window.addEventListener('load', sweep);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      window.removeEventListener('load', sweep);
    };
  }, []);

  // One rAF-throttled pass drives the progress hairline, the ambient parallax, the
  // nav's stuck state and the TOC highlight — they all need the same scroll
  // position, and separate listeners would measure the page several times a frame.
  // Only the highlight actually changes markup, so it is the only one in state.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pars = Array.from(root.querySelectorAll('[data-par]'));
    const targets = Array.from(root.querySelectorAll('[data-section]'));
    let ticking = false;

    const frame = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (progRef.current) {
        progRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      navRef.current?.classList.toggle(styles.isStuck, y > 24);

      if (!reduced) {
        pars.forEach((el) => {
          el.style.transform = `translate3d(0,${y * parseFloat(el.dataset.par)}px,0)`;
        });
      }

      // whichever section has crossed the upper third of the viewport
      const line = window.innerHeight * 0.35;
      let next = 0;
      targets.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) next = i;
      });
      setCurrent(next);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={`${styles.legal} ${alt ? styles.toneAlt : ''}`} ref={rootRef}>
      <div className={styles.prog} ref={progRef} aria-hidden="true" />

      <div className={styles.field} aria-hidden="true">
        <div className={`${styles.blob} ${styles.b1}`} data-par=".05" />
        <div className={`${styles.blob} ${styles.b2}`} data-par="-.04" />
        <div className={`${styles.blob} ${styles.b3}`} data-par=".06" />
      </div>
      <div className={styles.washtop} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav} ref={navRef}>
        <div className={styles.navIn}>
          <Link className={styles.mark} href="/moviest/">
            <span className={styles.markIcon} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/moviest.png" alt="" draggable="false" />
            </span>
            moviest
          </Link>
          <Link className={styles.back} href="/moviest/">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Moviest
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.dochead}>
            <span className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
              <i />
              Legal
            </span>
            <h1 className={styles.reveal} data-reveal data-d="1">
              {title}
            </h1>
            <p className={styles.reveal} data-reveal data-d="2">
              {lede}
            </p>
            <div className={styles.reveal} data-reveal data-d="3">
              <span className={styles.stamp}>Last updated {lastUpdated}</span>
            </div>
          </div>

          <div className={styles.cols}>
            <aside className={`${styles.toc} ${styles.reveal}`} data-reveal>
              <p className={styles.tocLabel}>On this page</p>
              {entries.map((entry, i) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className={i === current ? styles.isCurrent : undefined}
                >
                  {entry.title}
                </a>
              ))}
            </aside>

            <div className={styles.prose}>
              <div
                className={`${styles.keybox} ${styles.reveal}`}
                id="short"
                data-reveal
                data-section
              >
                <h2>The short version</h2>
                {keyed(shortVersion)}
              </div>

              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={styles.reveal}
                  data-reveal
                  data-section
                >
                  <h2>{section.title}</h2>
                  {keyed(section.body)}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.foot}>
          <span>© 2026 Moviest — a hobby project.</span>
          <nav className={styles.footLinks} aria-label="Legal">
            <Link href="/moviest/">Home</Link>
            <Link href="/moviest/privacy-policy/">Privacy</Link>
            <Link href="/moviest/terms-of-service/">Terms</Link>
            {/* a plain anchor, not next/link: the desktop is the other design
                system and crossing to it needs a fresh document — lib/routes.js */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">← Back to ltatarev.github.io</a>
            <a href={`mailto:${EMAIL}`}>Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
