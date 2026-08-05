'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Device } from './Device';
import { POSTERS, posterSrc } from './posters';
import styles from './landing.module.css';

// Where to email about the launch. One constant so the nav, the hero and the
// closing card can't drift apart.
const EMAIL = 'rushed-marble-3q@icloud.com';
const MAILTO = `mailto:${EMAIL}?subject=Tell%20me%20when%20Moviest%20launches`;
const TESTFLIGHT = `mailto:${EMAIL}?subject=Moviest%20TestFlight`;

// Circumference of the 78px ring's r=33 circle, which is also the dasharray the
// stylesheet seeds it with. The scrub below drives the offset between C and 0.
const RING_C = 207.3;
// The score the ring settles on — the same figure the phone beside it is showing.
const RING_SCORE = 8.5;

// The ribbon has to be wider than the viewport plus the 420px it slides, which at
// 96px a tile and a 14px gap means about twenty of them. The pick list in
// posters.js is repeated to reach that, so it can be any length — with fifteen
// titles the five repeats land 1,650px from their twin, well off the far edge.
const RIBBON_TILES = 20;
const RIBBON = Array.from({ length: RIBBON_TILES }, (_, i) => POSTERS[i % POSTERS.length]);

const MORE = [
  {
    title: 'Return dates',
    body: 'Upcoming episodes and releases, grouped by month, so a season you forgot about turns up on its own.',
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="16.5" rx="3" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      </>
    ),
  },
  {
    title: 'Search by mood',
    body: 'By title, by person, or by the feeling you’re after when you don’t have a title in mind.',
    icon: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="M20 20l-4.4-4.4" />
      </>
    ),
  },
  {
    title: 'Lists you make yourself',
    body: 'Name it, fill it, keep it in the order you built. The ten you’d hand someone. The ones for October.',
    icon: (
      <>
        <path d="M11 12H3M16 6H3M11 18H3" />
        <path d="M18 9v6M21 12h-6" />
      </>
    ),
  },
  {
    title: 'Where to watch',
    body: 'Streaming, rent and buy for your country, with your own subscriptions marked.',
    icon: (
      <>
        <rect x="2.5" y="4.5" width="19" height="12.5" rx="2.5" />
        <path d="M8 20.5h8" />
      </>
    ),
  },
  {
    title: 'Bring your history',
    body: 'Import your IMDb ratings and watchlist export, review whatever doesn’t match, and carry on.',
    icon: (
      <>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <path d="M7 10l5 5 5-5M12 15V3" />
      </>
    ),
  },
  {
    title: 'Yours, offline',
    body: 'No account, no sync, no ads. Your library is a file on your phone and it opens in airplane mode.',
    icon: <path d="M12 22s7.5-4 7.5-10V5.2L12 2.5 4.5 5.2V12c0 6 7.5 10 7.5 10z" />,
  },
];

const CellIcon = ({ children }) => (
  <span className={styles.cellIcon} aria-hidden="true">
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </span>
);

const Mark = ({ className }) => (
  <>
    <span className={`${styles.markIcon} ${className || ''}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/moviest.png" alt="" draggable="false" />
    </span>
    moviest
  </>
);

export function Landing() {
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const progRef = useRef(null);
  const ribbonRef = useRef(null);
  const heroRef = useRef(null);
  const ringRef = useRef(null);
  const ringFillRef = useRef(null);
  const ringDotRef = useRef(null);
  const ringNumRef = useRef(null);

  // Reveal-on-enter. An observer handles the smooth case, but anything already in
  // the viewport is swept in by rect on load, resize and scroll too: the observer's
  // first callback can legitimately arrive before layout has settled and report
  // "not visible", then not fire again until the first scroll — which would strand
  // the whole hero at opacity 0.
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
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isIn);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
    pending.forEach((el) => observer.observe(el));

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
    // Fonts landing after hydration can push an element that was below the fold at
    // effect time up into view without any scroll happening.
    window.addEventListener('load', sweep);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      window.removeEventListener('load', sweep);
    };
  }, []);

  // Every scroll-linked effect on the page in one rAF-throttled pass: the progress
  // hairline, the nav's stuck state, the ambient blobs, the hero phone's drift, the
  // poster ribbon and the score ring. They all need the same scroll position, and
  // separate listeners would measure the page several times a frame. Written
  // straight to the DOM — routing values that change every frame through state
  // would re-render the whole page on every tick.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pars = Array.from(root.querySelectorAll('[data-par]'));
    const clamp = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

    // With motion off the ring still has to arrive at its value — it carries the
    // number the caption is talking about, so it can't sit at zero.
    if (reduced) {
      if (ringFillRef.current) {
        ringFillRef.current.style.strokeDashoffset = String(RING_C * (1 - RING_SCORE / 10));
      }
      if (ringDotRef.current) {
        ringDotRef.current.style.transform = `rotate(${(RING_SCORE / 10) * 360}deg)`;
        ringDotRef.current.style.opacity = '1';
      }
      if (ringNumRef.current) ringNumRef.current.textContent = RING_SCORE.toFixed(1);
    }

    let ticking = false;

    const frame = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;

      const max = document.documentElement.scrollHeight - vh;
      if (progRef.current) {
        progRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      navRef.current?.classList.toggle(styles.isStuck, y > 24);

      if (reduced) return;

      pars.forEach((el) => {
        el.style.transform = `translate3d(0,${y * parseFloat(el.dataset.par)}px,0)`;
      });

      // The hero phone drifts up slightly slower than the page.
      if (heroRef.current && y < vh * 1.4) {
        heroRef.current.style.transform = `translate3d(0,${y * -0.055}px,0)`;
      }

      // The poster ribbon slides sideways with the page's scroll position.
      const track = ribbonRef.current;
      const box = track?.parentElement;
      if (box) {
        const rb = box.getBoundingClientRect();
        if (rb.bottom > 0 && rb.top < vh) {
          const p = clamp((vh - rb.top) / (vh + rb.height));
          track.style.transform = `translate3d(${-p * 420 - 120}px,0,0)`;
        }
      }

      // The signature: the score ring fills as its section crosses the viewport.
      const ring = ringRef.current;
      if (ring) {
        const rr = ring.getBoundingClientRect();
        if (rr.bottom > 0 && rr.top < vh) {
          const t = clamp((vh * 0.9 - rr.top) / (vh * 0.55));
          const score = t * RING_SCORE;
          if (ringFillRef.current) {
            ringFillRef.current.style.strokeDashoffset = String(RING_C * (1 - score / 10));
          }
          if (ringDotRef.current) {
            ringDotRef.current.style.transform = `rotate(${(score / 10) * 360}deg)`;
            ringDotRef.current.style.opacity = score > 0.15 ? '1' : '0';
          }
          if (ringNumRef.current) ringNumRef.current.textContent = score.toFixed(1);
        }
      }
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
    <div className={styles.page} ref={rootRef}>
      <div className={styles.prog} ref={progRef} aria-hidden="true" />

      <div className={styles.field} aria-hidden="true">
        <div className={`${styles.blob} ${styles.b1}`} data-par=".06" />
        <div className={`${styles.blob} ${styles.b2}`} data-par="-.05" />
        <div className={`${styles.blob} ${styles.b3}`} data-par=".08" />
        <div className={`${styles.blob} ${styles.b4}`} data-par="-.06" />
      </div>
      <div className={styles.washtop} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav} ref={navRef}>
        <div className={styles.navIn}>
          <a className={styles.mark} href="#top">
            <Mark />
          </a>
          <nav className={styles.navLinks} aria-label="Sections">
            <a href="#watchlist">Watchlist</a>
            <a href="#episodes">Episodes</a>
            <a href="#rate">Rating</a>
            <a href="#more">More</a>
          </nav>
          <a className={`${styles.pill} ${styles.primary}`} href={MAILTO}>
            Email me when it’s out
          </a>
        </div>
      </header>

      <main className={styles.main} id="top">
        <div className={styles.wrap}>
          {/* ============ HERO ============ */}
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
                <i />
                Coming to iPhone
              </span>
              <h1 className={styles.reveal} data-reveal data-d="1">
                Films and shows.
                <br />
                <em>One watchlist.</em>
              </h1>
              <p className={`${styles.lede} ${styles.reveal}`} data-reveal data-d="2">
                Moviest keeps the whole queue in one place — the film you keep meaning to watch and
                the show you’re seven episodes into. Everything lives on your phone, and it opens
                instantly.
              </p>
              <p className={`${styles.ctas} ${styles.reveal}`} data-reveal data-d="3">
                <a className={`${styles.pill} ${styles.primary}`} href={MAILTO}>
                  Email me when it’s out
                </a>
                <a className={`${styles.pill} ${styles.ghost}`} href="#watchlist">
                  See what it does
                </a>
              </p>
              <p className={`${styles.heronote} ${styles.reveal}`} data-reveal data-d="4">
                Free, no account, <b>no ads</b>. Data from TMDB.
              </p>
            </div>

            <div className={styles.revealDev} data-reveal>
              <Device
                big
                glow
                driftRef={heroRef}
                src="/moviest/hero.webp"
                alt="Moviest open on an iPhone at the page for Severance, showing the artwork, a rating of 8.4, the synopsis, an “In watchlist” button and the trailer."
              />
            </div>
          </section>

          {/* ============ RIBBON ============ */}
          {/* Decorative: the strip says "a lot of films and shows" and nothing the
              copy around it doesn't. Twenty title names read aloud would be noise,
              so the whole band is hidden from the accessibility tree. */}
          <div className={`${styles.ribbon} ${styles.reveal}`} data-reveal aria-hidden="true">
            <div className={styles.ribbonTrack} ref={ribbonRef}>
              {RIBBON.map((poster, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  className={styles.tile}
                  src={posterSrc(poster)}
                  alt=""
                  draggable="false"
                />
              ))}
            </div>
          </div>

          {/* ============ F1 · WATCHLIST ============ */}
          <section className={styles.feature} id="watchlist">
            <div className={styles.fcopy}>
              <span className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
                <i />
                Library
              </span>
              <h2 className={styles.reveal} data-reveal data-d="1">
                Stop juggling two apps
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                Films and series sit in the same watchlist, sorted and filtered together. Pick a
                night, pick a genre, pick a runtime — the answer doesn’t depend on which app you
                happened to open.
              </p>
              <p className={`${styles.fmeta} ${styles.reveal}`} data-reveal data-d="3">
                <span>Grid or rows</span>
                <span>Sort &amp; filter in one sheet</span>
                <span>Long press to act</span>
              </p>
            </div>
            <div className={styles.revealDev} data-reveal>
              <Device
                src="/moviest/library.webp"
                alt="The Library tab on the Watchlist filter, showing a grid of posters — Sinners, Severance, Dune: Part Three and Shōgun — films and series side by side."
              />
            </div>
          </section>

          {/* ============ F2 · EPISODES ============ */}
          <section className={`${styles.feature} ${styles.flip}`} id="episodes">
            <div className={styles.fcopy}>
              <span className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
                <i />
                Watching
              </span>
              <h2 className={styles.reveal} data-reveal data-d="1">
                Always know where you left off
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                Tick off episodes as you go. Shows with something new waiting sit above the ones
                you’re caught up on, and return dates for the rest turn up before you’d have thought
                to look.
              </p>
              <p className={`${styles.fmeta} ${styles.reveal}`} data-reveal data-d="3">
                <span>Per-episode ticks</span>
                <span>Ready to watch first</span>
                <span>Return dates</span>
              </p>
            </div>
            <div className={styles.revealDev} data-reveal>
              <Device
                src="/moviest/episodes.webp"
                alt="The Watching filter under a “Ready to watch” heading, listing Andor, Silo, Severance and The Last of Us with the next episode and a progress bar on each."
              />
            </div>
          </section>

          {/* ============ F3 · RATE ============ */}
          <section className={styles.feature} id="rate">
            <div className={styles.fcopy}>
              <span className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
                <i />
                Your record
              </span>
              <h2 className={styles.reveal} data-reveal data-d="1">
                Rate it while it’s fresh
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                A score, a few lines, done before the credits finish. Everything you rate builds a
                record you actually own — kept on the phone, readable with no signal, never traded
                to anyone.
              </p>
              <div className={`${styles.ringwrap} ${styles.reveal}`} data-reveal data-d="3">
                <div className={styles.ring} ref={ringRef} aria-hidden="true">
                  <svg width="78" height="78" viewBox="0 0 78 78">
                    <circle className={styles.ringTrack} cx="39" cy="39" r="33" />
                    <circle className={styles.ringFill} ref={ringFillRef} cx="39" cy="39" r="33" />
                  </svg>
                  <svg
                    className={styles.ringDot}
                    ref={ringDotRef}
                    width="78"
                    height="78"
                    viewBox="0 0 78 78"
                  >
                    <circle cx="39" cy="6" r="4.5" fill="var(--accent-soft)" />
                  </svg>
                  <b className={styles.ringNum} ref={ringNumRef}>
                    0
                  </b>
                </div>
                <p className={styles.ringcap}>
                  <b>Scroll to score</b>
                  The same ring the app fills in when you rate something.
                </p>
              </div>
            </div>
            <div className={styles.revealDev} data-reveal>
              <Device
                src="/moviest/rate.webp"
                alt="The rating sheet open over the Severance page: a row of stars set to eight and a half, a score of 8.5 labelled “One of the greats”, and a Save rating button."
              />
            </div>
          </section>

          {/* ============ MORE ============ */}
          <section className={styles.more} id="more">
            <span className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
              <i />
              Also in the box
            </span>
            <h2 className={styles.reveal} data-reveal data-d="1">
              Small things that add up
            </h2>
            <div className={styles.grid}>
              {MORE.map((cell, i) => (
                <article
                  key={cell.title}
                  className={`${styles.cell} ${styles.reveal}`}
                  data-reveal
                  data-d={String((i % 3) + 1)}
                >
                  <CellIcon>{cell.icon}</CellIcon>
                  <h3>{cell.title}</h3>
                  <p>{cell.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ============ CLOSER ============ */}
          <section className={`${styles.closer} ${styles.reveal}`} data-reveal id="get">
            <span className={styles.eyebrow}>
              <i />
              TestFlight opens soon
            </span>
            <h2>Put the whole queue in one place</h2>
            <p>
              Moviest is a hobby project built in the open. Free on the App Store, iPhone first,
              Android when it’s ready.
            </p>
            <p className={styles.ctas}>
              <a className={`${styles.pill} ${styles.primary}`} href={MAILTO}>
                Email me when it’s out
              </a>
              <a className={`${styles.pill} ${styles.ghost}`} href={TESTFLIGHT}>
                Ask for a TestFlight invite
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.foot}>
          <div>
            <a className={`${styles.mark} ${styles.footMark}`} href="#top">
              <Mark />
            </a>
            <div className={styles.attrib}>
              <span className={`${styles.badge} ${styles.tmdb}`}>TMDB</span>
              <span className={`${styles.badge} ${styles.jw}`}>JUSTWATCH</span>
              <span>
                This product uses the TMDB API but is not endorsed or certified by TMDB. Streaming
                availability provided by JustWatch.
              </span>
            </div>
          </div>
          <div className={styles.footRight}>
            <nav className={styles.footLinks} aria-label="Legal">
              <Link href="/moviest/privacy-policy/">Privacy</Link>
              <Link href="/moviest/terms-of-service/">Terms</Link>
              {/* a plain anchor, not next/link: the desktop is the other design
                  system and crossing to it needs a fresh document — lib/routes.js */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">← Back to ltatarev.github.io</a>
              <a href={`mailto:${EMAIL}`}>Contact</a>
            </nav>
            <span>© 2026 Moviest</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
