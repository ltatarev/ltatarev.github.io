'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './landing.module.css';

// Where to email about the launch. One constant so the nav, the hero and the
// closing card can't drift apart.
const MAILTO = 'mailto:brief-fennecs8a@icloud.com?subject=Tell%20me%20when%20Lumee%20launches';

// The two marker strokes, drawn as open paths so they can be dashed on and look
// hand-made. preserveAspectRatio="none" lets each one stretch to whatever word it
// is annotating, and non-scaling-stroke keeps the nib an even weight while it does.
const MARKS = {
  circle: {
    viewBox: '0 0 300 100',
    d: 'M291 27C252 6 148 1 82 10 20 19 3 45 9 65c7 22 53 32 143 31 89-1 143-14 146-36 2-18-26-32-61-38',
  },
  underline: {
    viewBox: '0 0 300 24',
    d: 'M5 13c76-9 205-10 291-4-66 6-176 9-276 12',
  },
};

// A word with a marker stroke around or under it. The stroke is invisible until the
// heading it sits in is revealed — see the effect in Landing for how it is measured
// and released.
function Note({ kind, children }) {
  const mark = MARKS[kind];
  return (
    <span className={`${styles.note} ${styles[kind]}`} data-note>
      {children}
      <svg viewBox={mark.viewBox} preserveAspectRatio="none" aria-hidden="true">
        <path vectorEffect="non-scaling-stroke" d={mark.d} />
      </svg>
    </span>
  );
}

const AppleGlyph = () => (
  <svg width="20" height="24" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
    <path d="M318.7 268c-.5-58 47.4-85.9 49.5-87.2-27-39.4-69-44.8-83.9-45.4-35.7-3.6-69.7 21-87.8 21-18 0-46-20.5-75.6-19.9-38.9.6-74.7 22.6-94.7 57.4-40.4 70-10.3 173.5 29 230.3 19.2 27.8 42.1 59 72.1 57.9 28.9-1.2 39.8-18.7 74.8-18.7s44.8 18.7 75.4 18.1c31.1-.5 50.8-28.3 69.8-56.3 22-32.1 31-63.2 31.4-64.9-.7-.3-60.3-23.1-60.9-91.6zM260.8 97c16-19.4 26.7-46.3 23.8-73.1-23 .9-50.8 15.3-67.3 34.7-14.8 17.2-27.7 44.6-24.2 70.9 25.6 2 51.7-13 67.7-32.5z" />
  </svg>
);

// The four rows below the hero. Each alternates the phone from left to right and
// carries the screenshot that belongs to it — `cut` marks the frames whose content
// runs off the bottom of the shot, which the stylesheet fades out.
const FEATURES = [
  {
    slug: 'grid',
    eyebrow: 'Grid',
    title: 'Move things until it feels right',
    body: 'Hold a post and drag it anywhere. Everything else shifts around it, exactly the way your profile will. For the shots you haven’t taken yet, drop in a coloured placeholder and keep the row balanced.',
    src: '/lumee/grid.webp',
    alt: 'A post being dragged to a new position in the Lumee grid, with the surrounding photos shifting to make room.',
    cut: true,
  },
  {
    slug: 'captions',
    eyebrow: 'Captions',
    title: (
      <>
        Write it now, <Note kind="underline">post it later</Note>
      </>
    ),
    body: 'The caption, the hashtag set and the date all live with the photo, so nothing gets rewritten in the Notes app at midnight. Pick a day and Lumee reminds you when it’s time.',
    src: '/lumee/captions.webp',
    alt: 'A planned post in Lumee showing its photo, caption, scheduled date and hashtag set together on one screen.',
    flip: true,
  },
  {
    slug: 'icloud',
    eyebrow: 'iCloud',
    title: 'Your plans stay yours',
    body: 'There is no Lumee account and no Lumee server. Your posts, captions and photos sit on your device and back up through your own iCloud — which is also how they turn up on your iPad.',
    src: '/lumee/icloud.webp',
    alt: 'Lumee’s iCloud settings, showing the plan syncing through the user’s own iCloud account.',
    cut: true,
  },
  {
    slug: 'widgets',
    eyebrow: 'Widgets',
    title: 'What’s next, on your home screen',
    body: 'Put the next few posts where you already look. The widget updates as you plan, so you can see what’s coming without opening anything.',
    src: '/lumee/widgets.webp',
    alt: 'Two Lumee home-screen widgets on iOS, one showing the number of posts planned and one showing the next three photos.',
    flip: true,
  },
];

// The nine squares in the closing card. The empty one is the placeholder the whole
// product is built around, so it is the one that breathes.
const MINIGRID = [
  '#D4BCE9',
  '#CCEAF3',
  '#F1DD81',
  '#FDD6D4',
  null,
  '#D8F5B4',
  '#F293BF',
  '#EFE2F9',
  '#E3D2F3',
];

export function Landing() {
  const rootRef = useRef(null);

  // Reveal-on-enter, and the marker strokes that ride along with it.
  //
  // An observer handles the smooth case, but anything already in the viewport is
  // swept in by rect on load, resize and scroll too: the observer's first callback
  // can legitimately arrive before layout has settled and report "not visible",
  // then not fire again until the first scroll — which would strand the whole hero
  // at opacity 0.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // Seed every marker stroke with its own length, so the dash and the offset
    // both start at exactly the length of the line and it reads as fully retracted.
    // getTotalLength() needs the path laid out, which is why this waits for an
    // effect rather than being a style on the element. The +4 hides the seam where
    // the two ends of the dash meet.
    root.querySelectorAll('[data-note] path').forEach((path) => {
      path.style.setProperty('--len', `${Math.ceil(path.getTotalLength()) + 4}`);
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pending = Array.from(root.querySelectorAll('[data-reveal]'));

    // Releasing a heading also releases any marker inside it — the annotation is
    // part of the sentence, so it should never arrive on its own.
    const show = (el) => {
      el.classList.add(styles.isIn);
      if (el.querySelector('[data-note]')) el.classList.add(styles.drawn);
    };

    if (reduced || !('IntersectionObserver' in window)) {
      pending.forEach(show);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));

    const sweep = () => {
      for (let i = pending.length - 1; i >= 0; i -= 1) {
        const rect = pending[i].getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          show(pending[i]);
          observer.unobserve(pending[i]);
          pending.splice(i, 1);
        }
      }
    };
    sweep();
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);
    // Fonts and screenshots landing after hydration can push an element that was
    // below the fold at effect time up into view without any scroll happening.
    window.addEventListener('load', sweep);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      window.removeEventListener('load', sweep);
    };
  }, []);

  // Scroll-linked parallax: each phone drifts against the page as its row crosses
  // the viewport, so the screenshots don't feel pasted onto the background. Written
  // straight to the DOM and rAF-throttled — this changes every frame, and routing it
  // through state would re-render the page on every tick.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const layers = Array.from(root.querySelectorAll('[data-parallax]'));
    if (!layers.length) return undefined;

    let ticking = false;

    const frame = () => {
      const vh = window.innerHeight;
      layers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Anything comfortably off screen isn't worth a write.
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        // -1 while the element is entering from the bottom, +1 as it leaves the top.
        const raw = 1 - (rect.top + rect.height / 2) / (vh / 2 + rect.height / 2);
        const p = Math.max(-1, Math.min(1, raw));
        const d = parseFloat(el.dataset.parallax) * p;
        el.style.transform = `translate3d(0,${d.toFixed(2)}px,0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(frame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.guides} aria-hidden="true">
        <div>
          <span />
          <span />
          <span />
        </div>
      </div>

      <header className={styles.wrap}>
        <nav className={styles.nav}>
          <a className={styles.mark} href="#top">
            <span className={styles.icon} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/lumee.png" alt="" draggable="false" />
            </span>
            lumee
          </a>
          <div className={styles.navLinks}>
            <a className={styles.hideSm} href="#features">
              Features
            </a>
            <Link className={styles.hideSm} href="/lumee/privacy-policy/">
              Privacy
            </Link>
            <a className={styles.btnSm} href="#get">
              Get the app
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.heroCopy}>
            <p className={`${styles.eyebrow} ${styles.rise}`} data-reveal>
              iPhone &amp; iPad
            </p>
            <h1 className={styles.rise} data-reveal data-d="1">
              See your feed
              <br />
              <Note kind="circle">before</Note> you post.
            </h1>
            <p className={`${styles.lede} ${styles.rise}`} data-reveal data-d="2">
              A quiet little planner for your grid. Drag posts into place, keep a spot for the photo
              you haven’t taken yet, and see how the whole profile reads before anything goes live.
            </p>
            <p className={`${styles.ctaRow} ${styles.rise}`} data-reveal data-d="3">
              <a className={styles.btn} id="get" href={MAILTO}>
                <AppleGlyph />
                Email me when it’s out
              </a>
            </p>
            <p className={`${styles.fineprint} ${styles.rise}`} data-reveal data-d="3">
              Free to try &middot; No account, no sign-up
            </p>
          </div>

          <div className={`${styles.heroPhone} ${styles.rise}`} data-reveal data-d="2">
            <svg
              className={`${styles.spark} ${styles.sparkA} ${styles.float}`}
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M20 3v34M3 20h34M8 8l24 24M32 8L8 32" />
            </svg>
            <svg
              className={`${styles.spark} ${styles.sparkB} ${styles.float}`}
              style={{ animationDelay: '-3s' }}
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M20 4v32M4 20h32" />
            </svg>
            <img
              className={styles.cut}
              data-parallax="-26"
              src="/lumee/hero-grid.webp"
              alt="Lumee open on an iPhone, showing a planned Instagram grid of nine photos with two coloured placeholders among them."
            />
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.features}`} id="features">
          {FEATURES.map((feature) => (
            <article
              key={feature.slug}
              className={`${styles.feature} ${feature.flip ? styles.flip : ''}`}
            >
              <div className={`${styles.shot} ${styles.rise}`} data-reveal>
                <img
                  data-parallax="34"
                  className={feature.cut ? styles.cut : undefined}
                  src={feature.src}
                  alt={feature.alt}
                />
              </div>
              <div className={styles.featureCopy}>
                <p className={`${styles.eyebrow} ${styles.rise}`} data-reveal>
                  {feature.eyebrow}
                </p>
                <h2 className={styles.rise} data-reveal data-d="1">
                  {feature.title}
                </h2>
                <p className={`${styles.bodyText} ${styles.rise}`} data-reveal data-d="2">
                  {feature.body}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.wrap}>
          <div className={`${styles.final} ${styles.rise}`} data-reveal>
            <div className={styles.finalCopy}>
              <h2>Start with an empty grid</h2>
              <p className={styles.bodyText}>
                Nine squares and a good idea is enough. Lumee keeps the rest in order.
              </p>
              <p className={styles.ctaRow}>
                <a className={styles.btn} href={MAILTO}>
                  <AppleGlyph />
                  Email me when it’s out
                </a>
              </p>
            </div>
            <div className={styles.minigrid} aria-hidden="true">
              {MINIGRID.map((fill, i) =>
                fill ? (
                  <i key={i} style={{ background: fill }} />
                ) : (
                  <i key={i} className={`${styles.empty} ${styles.pulse}`}>
                    📷
                  </i>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <a className={styles.mark} href="#top">
          <span className={styles.icon} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/lumee.png" alt="" draggable="false" />
          </span>
          lumee
        </a>
        <div className={styles.footLinks}>
          <Link href="/lumee/privacy-policy/">Privacy Policy</Link>
          <Link href="/lumee/terms-of-service/">Terms of Service</Link>
          {/* a plain anchor, not next/link: the desktop is the other design
              system and crossing to it needs a fresh document — lib/routes.js */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">← Back to ltatarev.github.io</a>
          <a href="mailto:brief-fennecs8a@icloud.com">Support</a>
        </div>
        <p className={styles.copy}>© 2026 Lumee</p>
      </footer>
    </div>
  );
}
