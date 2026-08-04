'use client';

import Link from 'next/link';
import { Children, useEffect, useRef, useState } from 'react';
import styles from './legal.module.css';

// The prose arrives from the server components as fragments — `<><p/><p/></>` — and a
// fragment crossing the RSC boundary is flattened into a bare array by the time it
// reaches this client component. Dropping that array straight into JSX is what React
// warns about ("each child in a list should have a unique key"), since it can't tell a
// flattened document from a mapped list. Children.toArray assigns the keys.
const keyed = (node) => Children.toArray(node);

// A field that still has to be filled in before launch. Kept visible on purpose —
// a placeholder that looks like finished copy is how a "[legal name]" ships.
export function Ph({ children }) {
  return <span className={styles.ph}>{children}</span>;
}

// Pulls one clause out of the flow of the prose. Used for the warning that deletion
// becomes permanent, which is the only paragraph in either document a reader is
// actively harmed by missing.
export function Callout({ children }) {
  return <div className={styles.callout}>{children}</div>;
}

// The chrome shared by the privacy policy and the terms: sticky nav, reading
// progress, reveal-on-enter, a scroll-spied table of contents and the footer.
// Both the TOC and the document body are rendered from the same `sections` array,
// so a heading can never appear in one and not the other.
//
// Props:
//   title        — document title, also the <h1>
//   lastUpdated  — node dropped into the "Last updated …" line
//   draft        — optional pre-launch banner; omit it and the banner disappears
//   shortVersion — body of the "The short version" card
//   sections     — [{ id, title, body }], body is JSX
export function LegalDoc({ title, lastUpdated, draft, shortVersion, sections }) {
  const rootRef = useRef(null);
  const fillRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const revealables = rootRef.current.querySelectorAll('[data-reveal]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      revealables.forEach((el) => el.classList.add(styles.isIn));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isIn);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    revealables.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // One rAF-throttled handler drives the progress bar, the nav's stuck border and
  // the TOC highlight — they all need the same scroll position, and three separate
  // listeners would measure the page three times per frame.
  useEffect(() => {
    const sectionEls = Array.from(rootRef.current.querySelectorAll('[data-section]'));
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (fillRef.current) {
          fillRef.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        }
        setStuck(window.scrollY > 12);

        // whichever section has crossed the upper third of the viewport
        const line = window.innerHeight * 0.3;
        let next = 0;
        sectionEls.forEach((el, i) => {
          if (el.getBoundingClientRect().top <= line) next = i;
        });
        setCurrent(next);

        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.legal}>
      <div className={styles.progress} aria-hidden="true">
        <span ref={fillRef} className={styles.progressFill} />
      </div>

      <header className={`${styles.nav} ${stuck ? styles.isStuck : ''}`}>
        <div className={styles.navInner}>
          <Link className={styles.brand} href="/photo-cleanup/">
            <span className={styles.brandMark} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/photo-cleanup.png" alt="" draggable="false" />
            </span>
            Photo Cleanup
          </Link>
          <Link className={styles.navBack} href="/photo-cleanup/">
            ← Back to the app
          </Link>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.docHead}>
          <p className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
            Legal
          </p>
          <h1 className={styles.reveal} data-reveal>
            {title}
          </h1>
          <p className={`${styles.docHeadDate} ${styles.reveal}`} data-reveal>
            Last updated {lastUpdated} · Applies to Photo Cleanup for iPhone
          </p>

          {draft ? (
            <div className={`${styles.draft} ${styles.reveal}`} data-reveal>
              {keyed(draft)}
            </div>
          ) : null}

          <div className={`${styles.tldr} ${styles.reveal}`} data-reveal>
            <h2>The short version</h2>
            {keyed(shortVersion)}
          </div>
        </div>

        <div className={styles.doc}>
          <nav className={styles.toc} aria-label="On this page">
            <p>On this page</p>
            <ol>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={i === current ? styles.isCurrent : undefined}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.prose}>
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
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <span className={styles.footerCopy}>© 2026 Photo Cleanup</span>
          <nav className={styles.footerLinks} aria-label="Legal">
            <Link href="/photo-cleanup/">Home</Link>
            <Link href="/photo-cleanup/privacy-policy/">Privacy policy</Link>
            <Link href="/photo-cleanup/terms-of-service/">Terms of service</Link>
            <a href="mailto:cistern_scooter.8r@icloud.com">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
