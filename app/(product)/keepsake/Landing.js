'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Board, PIECE_COUNT } from './Board';
import { Glyph } from './Glyph';
import styles from './landing.module.css';

// Where to email about the launch. One constant so the footer and the legal pages
// can't drift apart.
export const EMAIL = 'rushed-marble-3q@icloud.com';

const FACTS = ['No account', 'No cloud', 'No analytics', 'No purchases', 'Export whenever'];

const Mark = () => (
  <>
    <span className={styles.markIcon} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/keepsake.png" alt="" draggable="false" />
    </span>
    <span className={styles.markName}>Keepsake</span>
    <span className={styles.markSub}>Journal</span>
  </>
);

export function Landing() {
  const rootRef = useRef(null);
  const progRef = useRef(null);
  const heroRef = useRef(null);
  const boardRef = useRef(null);

  // Reveal-on-enter. An observer handles the smooth case, but anything already in the
  // viewport is swept in by rect on load, resize and scroll too: the observer's first
  // callback can legitimately arrive before layout has settled and report "not
  // visible", then not fire again until the first scroll — which would strand a whole
  // section at opacity 0.
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

  // The signature, and the reading hairline above it, in one rAF-throttled pass: both
  // need the same scroll position, and separate listeners would measure the page
  // several times a frame.
  //
  // The hero is a tall scroll track with a sticky stage in it, so the board holds
  // still while the month fills in underneath the cursor. Progress through the track
  // is the fraction of the month that has been written. Written straight to the DOM —
  // routing a value that changes every frame through state would re-render 31 pieces
  // and 35 sockets on every tick.
  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const board = boardRef.current;
    if (!root || !hero || !board) return undefined;

    const pieces = board.querySelectorAll('[data-piece]');
    const sockets = board.querySelectorAll('[data-socket]');
    const countEl = board.querySelector('[data-count]');

    let shown = -1;
    const place = (placed) => {
      if (placed === shown) return;
      shown = placed;
      for (let i = 0; i < pieces.length; i += 1) {
        pieces[i].classList.toggle(styles.isPlaced, i < placed);
      }
      // The next hole is dashed, so there is always somewhere the eye is going.
      for (let i = 0; i < sockets.length; i += 1) {
        sockets[i].classList.toggle(styles.isNext, i === placed);
      }
      if (countEl) {
        countEl.textContent =
          `August 2026 · ${placed} of ${PIECE_COUNT}` +
          (placed === PIECE_COUNT ? ' — a month' : ' placed');
      }
    };

    let ticking = false;
    const frame = () => {
      ticking = false;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) {
        progRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }

      // With motion off the stylesheet collapses the track to the stage's own height,
      // so there is no range to scrub and the month simply arrives whole.
      const range = hero.offsetHeight - window.innerHeight;
      if (range <= 0) {
        place(PIECE_COUNT);
        return;
      }
      const p = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / range));
      place(Math.round(p * PIECE_COUNT));
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

      <header className={styles.head}>
        <div className={`${styles.wrap} ${styles.headIn}`}>
          <a className={styles.mark} href="#top">
            <Mark />
          </a>
          <nav className={styles.navLinks} aria-label="Sections">
            <a href="#question">Question</a>
            <a href="#quiet">Quiet day</a>
            <a href="#sealed">Sealed</a>
            <a href="#private">Private</a>
          </nav>
          <span className={styles.headNote}>Coming soon to iPhone</span>
        </div>
      </header>

      <main id="top">
        {/* ============ HERO ============ */}
        <section className={styles.hero} ref={heroRef}>
          <div className={styles.heroStage}>
            <div className={`${styles.wrap} ${styles.heroGrid}`}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Keepsake Journal</p>
                <h1>
                  <em>A month is a puzzle.</em>
                  <em>A day is a piece.</em>
                </h1>
                <p className={styles.heroLede}>
                  One question each evening. Write an answer and the day’s piece drops into place.
                  By the 31st you have a picture of the month, and a month of writing behind it.
                </p>
                <span className={styles.chip}>
                  <span className={styles.chipWax} />
                  Coming soon to iPhone
                </span>
              </div>

              <Board rootRef={boardRef} />
            </div>
          </div>
        </section>

        <div className={styles.wrap}>
          {/* ============ THE DAY'S QUESTION ============ */}
          <section className={`${styles.feat} ${styles.reveal}`} id="question" data-reveal>
            <div className={styles.featCopy}>
              <p className={styles.eyebrow}>The day’s question</p>
              <h2>Something to answer, not a blank page.</h2>
              <p>
                A new question every evening, so you never open the app to a blinking cursor.
                Shuffle it if it doesn’t fit the day you actually had.
              </p>
              <p>
                Add a photo and it becomes the face of that piece — the board fills with the month
                as much as with the writing.
              </p>
            </div>
            <div className={styles.featArt}>
              <div className={styles.mock}>
                <div className={styles.promptCard}>
                  <p className={styles.promptEyebrow}>Today · Wednesday, August 5</p>
                  <p className={styles.promptQ}>What did you learn by accident today?</p>
                  <div className={styles.promptBtn}>Write</div>
                </div>
                <p className={styles.promptHint}>The day’s question, at 8 in the evening.</p>
              </div>
            </div>
          </section>

          {/* ============ QUIET DAY ============ */}
          <section
            className={`${styles.feat} ${styles.flip} ${styles.reveal}`}
            id="quiet"
            data-reveal
          >
            <div className={styles.featCopy}>
              <p className={styles.eyebrow}>Quiet day</p>
              <h2>Missing a day doesn’t break anything.</h2>
              <p>
                There is no streak to lose. A day you skip stays a quiet day — pale on the board,
                still yours, still part of the month.
              </p>
              <p>
                And yesterday’s piece stays loose for a while, so a late night or a long flight
                isn’t a hole you can never fill.
              </p>
            </div>
            <div className={styles.featArt}>
              <div className={`${styles.mock} ${styles.loose}`}>
                <Glyph kind="loose" size={92} className={styles.loosePiece} />
                <div>
                  <p className={styles.looseT}>Yesterday</p>
                  <p className={styles.looseB}>
                    Yesterday’s piece is still loose. There’s time to write it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ SEALED ============ */}
          <section className={`${styles.feat} ${styles.reveal}`} id="sealed" data-reveal>
            <div className={styles.featCopy}>
              <p className={styles.eyebrow}>Sealed</p>
              <h2>Seal the entries you’d rather not reread.</h2>
              <p>
                Some things are worth writing down and not worth opening again next week. Seal a
                piece and it closes with a drop of wax: it still counts, it still sits on the board,
                and it stays shut until you decide otherwise.
              </p>
            </div>
            <div className={styles.featArt}>
              <div className={`${styles.mock} ${styles.sealed}`}>
                <Glyph kind="bigseal" size={150} />
                <p className={styles.sealedCap}>Sealed · August 6</p>
              </div>
            </div>
          </section>

          {/* ============ PRIVATE ============ */}
          <section className={`${styles.priv} ${styles.reveal}`} id="private" data-reveal>
            <div className={styles.privBox}>
              <p className={styles.eyebrow}>On your phone</p>
              <h2>It never leaves the device.</h2>
              <p>
                No account, no sign-in, no server to go down. Every entry, photo and finished puzzle
                lives in the app’s own storage on your phone. Nothing is uploaded, nothing is
                measured, and there is nothing to buy. Export the whole journal to a file any time
                you want it somewhere else.
              </p>
              <ul className={styles.privFacts}>
                {FACTS.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.foot}`}>
          <a className={styles.mark} href="#top">
            <Mark />
          </a>
          <nav className={styles.footLinks} aria-label="Legal">
            <Link href="/keepsake/privacy-policy/">Privacy</Link>
            <Link href="/keepsake/terms-of-service/">Terms</Link>
            {/* a plain anchor, not next/link: the desktop is the other design system
                and crossing to it needs a fresh document — lib/routes.js */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">← Back to ltatarev.github.io</a>
            <a href={`mailto:${EMAIL}`}>Contact</a>
          </nav>
          <small>© 2026 Lucija Tatarević</small>
        </div>
      </footer>
    </div>
  );
}
