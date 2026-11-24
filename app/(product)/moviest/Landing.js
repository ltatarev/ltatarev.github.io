'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { APP_STORE } from './appstore';
import { Browser } from './Browser';
import { Device } from './Device';
import { FAQ, WEBAPP, WEBAPP_HOST } from './facts';
import { POSTERS, posterSrc } from './posters';
import styles from './landing.module.css';

// Where to write about the app. One constant so the nav, the hero and the closing
// card can't drift apart.
const EMAIL = 'rushed-marble-3q@icloud.com';
const FEEDBACK = `mailto:${EMAIL}?subject=Moviest%20feedback`;

// Circumference of the ring's r=33 circle in its 78-unit viewBox, which is also the
// dasharray the stylesheet seeds it with. The fill is the offset between C and 0.
const RING_C = 207.3;
// The score the ring settles on — the same figure the phone beside it is showing.
const RING_SCORE = 8.5;
// The visitor scores in half points, the same step as the stars in the app.
const RING_STEP = 0.5;

// Draw a score on the ring: the arc, the dot at its end, the number and the slider
// value. The scroll scrub and the visitor's drag both come through here.
function paintRing(refs, score) {
  if (refs.fill.current) {
    refs.fill.current.style.strokeDashoffset = String(RING_C * (1 - score / 10));
  }
  if (refs.dot.current) {
    refs.dot.current.style.transform = `rotate(${(score / 10) * 360}deg)`;
    refs.dot.current.style.opacity = score > 0.15 ? '1' : '0';
  }
  if (refs.num.current) refs.num.current.textContent = score.toFixed(1);
  if (refs.ring.current) {
    refs.ring.current.setAttribute('aria-valuenow', String(score));
    refs.ring.current.setAttribute('aria-valuetext', `${score.toFixed(1)} out of 10`);
  }
}

// The FAQ answers that stay open on a phone. The rest sit behind one button there;
// on wider screens all of them are open.
const FAQ_OPEN_ON_PHONE = 4;

// The ribbon has to be wider than the viewport plus the 420px it slides, which at
// 96px a tile and a 14px gap means about twenty of them. The pick list in
// posters.js is repeated to reach that, so it can be any length — with fifteen
// titles the five repeats land 1,650px from their twin, well off the far edge.
const RIBBON_TILES = 20;
const RIBBON = Array.from({ length: RIBBON_TILES }, (_, i) => POSTERS[i % POSTERS.length]);

// Four cells, not six: return dates and offline use already have their own
// sections and lines above, so the grid only holds what the page has not said.
const MORE = [
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
    body: 'Import your ratings and watchlist from IMDb or Trakt, review whatever doesn’t match, and carry on.',
    icon: (
      <>
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <path d="M7 10l5 5 5-5M12 15V3" />
      </>
    ),
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

// The corner arrow that marks a link leaving the page. It is decorative: the label
// names the web version, and hidden text in the link announces the new tab.
const ExtIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 5h11v11M19 5L5 19" />
  </svg>
);

// Apple's own "Download on the App Store" lockup, not a pill in the page's own style.
// Apple's marketing guidelines require the supplied artwork, unaltered and in
// proportion, so the file is served as-is and only its height is set — see
// public/moviest/README.md. The white variant is the one for a dark background.
//
// `size` is that height in pixels. Apple's floor for the web is 40px, so nothing here
// goes below it, and the badge carries the link's accessible name in its alt text.
const StoreBadge = ({ size = 52 }) => (
  <a
    className={styles.storeBadge}
    style={{ height: `${size}px` }}
    href={APP_STORE}
    target="_blank"
    rel="noopener noreferrer"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/moviest/app-store-badge.svg" alt="Download on the App Store" draggable="false" />
  </a>
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
  // Set once the visitor drags the ring or uses the keys, so the scroll stops
  // driving it and their own score stays.
  const ringTouchedRef = useRef(false);
  const ringScoreRef = useRef(0);
  const [faqOpen, setFaqOpen] = useState(false);

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

    // Automated browsers (navigator.webdriver) get everything at once: an AI agent
    // or a preview service that reads the page from screenshots must not catch the
    // sections mid-fade or still at opacity 0.
    if (reduced || navigator.webdriver || !('IntersectionObserver' in window)) {
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
    const ringRefs = { ring: ringRef, fill: ringFillRef, dot: ringDotRef, num: ringNumRef };
    if (reduced) {
      ringScoreRef.current = RING_SCORE;
      paintRing(ringRefs, RING_SCORE);
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
      // After the visitor scores it themselves, the scroll leaves it alone.
      const ring = ringRef.current;
      if (ring && !ringTouchedRef.current) {
        const rr = ring.getBoundingClientRect();
        if (rr.bottom > 0 && rr.top < vh) {
          const t = clamp((vh * 0.9 - rr.top) / (vh * 0.55));
          const score = Math.round(t * RING_SCORE * 10) / 10;
          ringScoreRef.current = score;
          paintRing(ringRefs, score);
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

  // The visitor's own score. A press or a drag sets the score from the angle of the
  // pointer around the centre, in half points. A press can land anywhere. During a
  // drag, a jump of more than half the scale is the pointer crossing the top of
  // the ring, so the score holds at 0 or 10 there and does not wrap.
  const ringRefs = { ring: ringRef, fill: ringFillRef, dot: ringDotRef, num: ringNumRef };
  const setRing = (next) => {
    const score = Math.min(10, Math.max(0, Math.round(next / RING_STEP) * RING_STEP));
    ringTouchedRef.current = true;
    ringScoreRef.current = score;
    paintRing(ringRefs, score);
  };
  const scoreAt = (e, dragging) => {
    const r = ringRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const turn = (Math.atan2(dx, -dy) / (2 * Math.PI) + 1) % 1;
    const next = turn * 10;
    const prev = ringScoreRef.current;
    if (dragging && Math.abs(next - prev) > 5) return prev > 5 ? 10 : 0;
    return next;
  };
  const onRingDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.focus({ preventScroll: true });
    setRing(scoreAt(e, false));
  };
  const onRingMove = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    setRing(scoreAt(e, true));
  };
  const onRingKey = (e) => {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (step) setRing(ringScoreRef.current + step * RING_STEP);
    else if (e.key === 'Home') setRing(0);
    else if (e.key === 'End') setRing(10);
    else return;
    e.preventDefault();
  };

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
            <a href="#rate">Ratings</a>
            <a href="#more">More</a>
            <a href="#web">Web version</a>
            <a href="#faq">FAQ</a>
          </nav>
          <StoreBadge size={42} />
        </div>
      </header>

      <main className={styles.main} id="top">
        <div className={styles.wrap}>
          {/* ============ HERO ============ */}
          {/* The hero runs a CSS entrance on first paint and does not wait for the
              JS reveal. On a slow phone the reveal can arrive late, and the first
              screen would stay empty until then. */}
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroIn}>
                Films and shows.
                <br />
                <em>One watchlist.</em>
              </h1>
              <p className={`${styles.lede} ${styles.heroIn}`} data-d="2">
                Moviest keeps the whole queue in one place — the film you keep meaning to watch and
                the show you’re seven episodes into. Everything lives on your device, and it opens
                instantly.
              </p>
              <p className={`${styles.ctas} ${styles.heroIn}`} data-d="3">
                <StoreBadge />
                <a className={`${styles.pill} ${styles.ghost}`} href="#watchlist">
                  See what it does
                </a>
              </p>
              <p className={`${styles.heronote} ${styles.heroIn}`} data-d="4">
                Free on iPhone and iPad. No account, <b>no ads</b>. Moviest Plus adds smart lists
                and more widgets.
              </p>
            </div>

            <div className={styles.heroDev}>
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
              <h2 className={styles.reveal} data-reveal data-d="1">
                Stop juggling two apps
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                Films and series sit in the same watchlist, sorted and filtered together. Pick a
                night, pick a genre, pick a runtime — the answer doesn’t depend on which app you
                happened to open.
              </p>
              <p className={`${styles.fmeta} ${styles.reveal}`} data-reveal data-d="3">
                <span>Posters or a tidy list</span>
                <span>Filter by genre or runtime</span>
                <span>Hold a poster for quick actions</span>
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
              <h2 className={styles.reveal} data-reveal data-d="1">
                Always know where you left off
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                Tick off episodes as you go. Shows with something new waiting sit above the ones
                you’re caught up on, and return dates for the rest turn up before you’d have thought
                to look.
              </p>
              <p className={`${styles.fmeta} ${styles.reveal}`} data-reveal data-d="3">
                <span>Tick off each episode</span>
                <span>New episodes float to the top</span>
                <span>Know when a show comes back</span>
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
              <h2 className={styles.reveal} data-reveal data-d="1">
                Rate it while it’s fresh
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                A score, a few lines, done before the credits finish. Everything you rate builds a
                record you actually own — kept on the phone, readable with no signal, never traded
                to anyone.
              </p>
              <div className={`${styles.ringwrap} ${styles.reveal}`} data-reveal data-d="3">
                <div
                  className={styles.ring}
                  ref={ringRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Your score"
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-valuenow={0}
                  aria-valuetext="0.0 out of 10"
                  onPointerDown={onRingDown}
                  onPointerMove={onRingMove}
                  onKeyDown={onRingKey}
                >
                  <svg viewBox="0 0 78 78" aria-hidden="true">
                    <circle className={styles.ringTrack} cx="39" cy="39" r="33" />
                    <circle className={styles.ringFill} ref={ringFillRef} cx="39" cy="39" r="33" />
                  </svg>
                  <svg
                    className={styles.ringDot}
                    ref={ringDotRef}
                    viewBox="0 0 78 78"
                    aria-hidden="true"
                  >
                    <circle cx="39" cy="6" r="3.6" fill="var(--accent-soft)" />
                  </svg>
                  <b className={styles.ringNum} ref={ringNumRef} aria-hidden="true">
                    0.0
                  </b>
                </div>
                <p className={styles.ringcap}>
                  <b>Now give it your own score</b>
                  The same ring the app fills in when you rate something. Drag it round, or use the
                  arrow keys.
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
            <h2 className={styles.reveal} data-reveal data-d="1">
              Small things that add up
            </h2>
            <div className={styles.grid}>
              {MORE.map((cell, i) => (
                <article
                  key={cell.title}
                  className={`${styles.feat} ${styles.reveal}`}
                  data-reveal
                  data-d={String((i % 2) + 1)}
                >
                  <h3>
                    <CellIcon>{cell.icon}</CellIcon>
                    {cell.title}
                  </h3>
                  <p>{cell.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ============ WEB APP ============ */}
          {/* Placed after the feature tour rather than up in the hero: sending someone
              off-site from above the fold loses them before they've seen a screenshot,
              and the App Store button is the one the hero wants carrying its weight.
              By here they know what it does, so the browser version reads as a second
              way in rather than a detour — and it hands off into the closer.

              The copy has to be straight about the split, or "web app" beside an App
              Store button reads as two names for the same thing. It is the browsing
              half only: the watchlist and the scores live in the app. */}
          <section className={styles.web} id="web">
            <div className={styles.webCopy}>
              <h2 className={styles.reveal} data-reveal data-d="1">
                Or have a look in your browser
              </h2>
              <p className={styles.reveal} data-reveal data-d="2">
                There’s a web version doing the browsing half too — search, film and show pages,
                cast, where to watch, and every episode of a show rated season by season. The
                watchlist, the episode ticks and the scores you keep are what the app adds.
              </p>
              <p className={`${styles.ctas} ${styles.reveal}`} data-reveal data-d="3">
                <a
                  className={`${styles.pill} ${styles.ghost}`}
                  href={WEBAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the web version
                  <span className={styles.srOnly}> (opens in a new tab)</span>
                  <ExtIcon />
                </a>
              </p>
            </div>
            <div className={styles.revealDev} data-reveal>
              <Browser
                url={WEBAPP_HOST}
                src="/moviest/web.webp"
                alt="The Moviest web app in a browser window, showing a wall of film and show posters under a search bar."
              />
            </div>
          </section>

          {/* ============ FAQ ============ */}
          {/* Plain questions with the answers always open. Search engines and AI
              assistants quote short answers like these, and an agent that reads the
              page from screenshots cannot open a collapsed one. The words come from
              facts.js, which also feeds the FAQPage JSON-LD in page.js. */}
          <section className={styles.faq} id="faq">
            <h2 className={styles.reveal} data-reveal data-d="1">
              The short answers
            </h2>
            {/* On a phone the first four answers stay open and the rest wait behind
                one button, so the page is not 2,000px of cards. The text of every
                answer is still in the markup and in the FAQPage JSON-LD. */}
            <div className={styles.faqGrid} data-open={faqOpen || undefined}>
              {FAQ.map((item, i) => (
                <article
                  key={item.q}
                  id={`faq-${i + 1}`}
                  className={`${styles.cell} ${styles.reveal} ${
                    i >= FAQ_OPEN_ON_PHONE ? styles.faqExtra : ''
                  }`}
                  data-reveal
                  data-d={String((i % 2) + 1)}
                >
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
            <button
              type="button"
              className={`${styles.pill} ${styles.ghost} ${styles.faqToggle}`}
              aria-expanded={faqOpen}
              aria-controls={FAQ.slice(FAQ_OPEN_ON_PHONE)
                .map((_, i) => `faq-${i + FAQ_OPEN_ON_PHONE + 1}`)
                .join(' ')}
              onClick={() => setFaqOpen((open) => !open)}
            >
              {faqOpen
                ? 'Show fewer questions'
                : `Show ${FAQ.length - FAQ_OPEN_ON_PHONE} more questions`}
            </button>
            <p className={`${styles.faqMore} ${styles.reveal}`} data-reveal>
              <Link href="/moviest/features/">All features</Link>
              <Link href="/moviest/import/">Import from IMDb or Trakt</Link>
              <Link href="/moviest/compare/">Moviest compared</Link>
              <Link href="/moviest/facts/">Product facts</Link>
            </p>
          </section>

          {/* ============ CLOSER ============ */}
          <section className={`${styles.closer} ${styles.reveal}`} data-reveal id="get">
            <h2>Put the whole queue in one place</h2>
            <p>
              Films, shows, episodes and scores in one app for iPhone and iPad, with layouts for
              both displays of iPhone Duo.
            </p>
            <p className={styles.ctas}>
              <StoreBadge />
            </p>
            <p className={styles.closeNote}>Free · No account · No ads · iOS 17 or later</p>
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
            <nav className={styles.footLinks} aria-label="Moviest">
              <a href={APP_STORE} target="_blank" rel="noopener noreferrer">
                App Store
              </a>
              <a href={WEBAPP} target="_blank" rel="noopener noreferrer">
                Web version
              </a>
              <Link href="/moviest/features/">Features</Link>
              <Link href="/moviest/import/">Import</Link>
              <Link href="/moviest/compare/">Compare</Link>
              <Link href="/moviest/facts/">Facts</Link>
              <Link href="/moviest/privacy-policy/">Privacy</Link>
              <Link href="/moviest/terms-of-service/">Terms</Link>
              {/* a plain anchor, not next/link: the desktop is the other design
                  system and crossing to it needs a fresh document — lib/routes.js */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">← Back to ltatarev.github.io</a>
              <a href={FEEDBACK}>Send feedback</a>
            </nav>
            <span>© 2026 Moviest</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
