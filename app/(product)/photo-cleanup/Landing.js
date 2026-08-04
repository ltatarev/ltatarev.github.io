'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SCREENS } from './DeviceScreens';
import styles from './landing.module.css';

// Where to email about the launch. One constant so the hero and the price card
// can't drift apart.
const MAILTO = 'mailto:cistern_scooter.8r@icloud.com?subject=Tell%20me%20when%20Photo%20Cleanup%20launches';

// The tour. Each step is paired by index with the screen of the same index in
// SCREENS — scrolling a step past the trigger line swaps the phone to its screen,
// so the two arrays must stay the same length and the same order.
const STEPS = [
  {
    label: 'Clean',
    dot: 'Clean',
    title: 'See what’s actually taking up space',
    body: 'One scan sorts your library into duplicates, near-identical shots, blurry photos, screenshots and big videos — each with a real size next to it.',
    meta: 'Sizes are measured, not guessed. If a category will only free 40 MB, it says 40 MB.',
  },
  {
    label: 'Clean · Duplicates',
    dot: 'Duplicates',
    title: 'Keep the good one, drop the rest',
    body: 'Go through a set one photo at a time. Swipe right to keep, left to delete. The sharpest shot of each set is marked for you, and undo is always one tap away.',
    meta: 'Prefer a grid? Switch the whole app to grid view in Settings.',
  },
  {
    label: 'Clean · Review',
    dot: 'Review',
    title: 'Nothing goes anywhere until you say so',
    body: 'Every deletion ends at a review screen with the exact count and size before anything happens. Photos then move to Recently Deleted, where iOS keeps them for 30 days.',
    meta: 'You’ll also see an iOS confirmation prompt. Two checks, on purpose.',
  },
  {
    label: 'Sort',
    dot: 'Sort',
    title: 'Empty the inbox, not just the bin',
    body: 'Anything that isn’t in an album lands in your Inbox. Sort it with the same swipe, and watch the unsorted count go down. No streaks, no badges, no guilt when you skip a day.',
    meta: 'Sorting, Inbox and Progress are free forever — they’re not behind the unlock.',
  },
];

const TRUST = [
  {
    title: 'Everything happens on your iPhone',
    body: 'Photos are analysed on-device with Apple’s Vision framework. There are no servers and no accounts — because there’s nowhere to sign in to.',
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: 'One payment, then nothing',
    body: '$6.99 once, Family Sharing included. No subscription, no weekly trial, no banner following you around the app asking for more.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5h5M9.5 14.5h5" />
      </>
    ),
  },
  {
    title: '“Data Not Collected”',
    body: 'That’s the App Store privacy label the app ships with — the strongest one Apple offers. You can check it before you install.',
    icon: (
      <>
        <path d="M12 3 4 6.5v5c0 4.6 3.2 8.6 8 9.5 4.8-.9 8-4.9 8-9.5v-5Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

const Tick = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export function Landing() {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const navRef = useRef(null);
  const deviceRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  // matchMedia needs a window, so this is false until the effect below runs.
  const [reduced, setReduced] = useState(false);

  const goToStep = useCallback(
    (i) => {
      stepRefs.current[i]?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'center',
      });
    },
    [reduced],
  );

  // Reveal-on-enter. An observer handles the smooth case, but anything already in
  // the viewport is swept in by rect on load, resize and scroll too: the observer's
  // first callback can legitimately arrive before layout has settled and report
  // "not visible", then not fire again until the first scroll, stranding an
  // element at opacity 0.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(isReduced);

    const pending = Array.from(root.querySelectorAll('[data-reveal]'));

    if (isReduced || !('IntersectionObserver' in window)) {
      pending.forEach((el) => el.classList.add(styles.isIn));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isIn);
            observer.unobserve(entry.target);
          }
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
    // Fonts and images landing after hydration can push an element that was below
    // the fold at effect time up into view without any scroll happening.
    window.addEventListener('load', sweep);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      window.removeEventListener('load', sweep);
    };
  }, []);

  // One scroll listener for the progress bar, the nav's border and the step the
  // phone is showing. The first two are written straight to the DOM — routing a
  // value that changes every frame through state would re-render the whole page
  // on every tick, and only the active step actually changes the markup.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (progressRef.current) {
          progressRef.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
        }
        navRef.current?.classList.toggle(styles.isStuck, window.scrollY > 12);

        const line = window.innerHeight * 0.55;
        let next = 0;
        stepRefs.current.forEach((step, i) => {
          if (step && step.getBoundingClientRect().top <= line) next = i;
        });
        setActive(next);

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // The storage bars fill and the headline figure counts up the first time the
  // phone comes into view — running them at load would spend the animation while
  // the hero is still on screen.
  useEffect(() => {
    const device = deviceRef.current;
    if (!device) return undefined;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const run = () => {
      device.querySelectorAll('[data-fill]').forEach((bar) => {
        const pct = `${bar.dataset.fill}%`;
        if (isReduced) {
          bar.style.width = pct;
          return;
        }
        bar.style.transition = 'width 1.1s cubic-bezier(.2,.7,.3,1) .15s';
        requestAnimationFrame(() => {
          bar.style.width = pct;
        });
      });

      device.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (isReduced) {
          el.textContent = target.toFixed(1) + suffix;
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / 1100);
          const eased = 1 - (1 - p) ** 3;
          el.textContent = (target * eased).toFixed(1) + suffix;
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
    };

    if (!('IntersectionObserver' in window)) {
      run();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(device);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div id="top" ref={rootRef}>
      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressFill} ref={progressRef} />
      </div>

      <header className={styles.nav} ref={navRef}>
        <div className={styles.navInner}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandMark} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/photo-cleanup.png" alt="" draggable="false" />
            </span>
            Photo Cleanup
          </a>
          <nav className={styles.navLinks} aria-label="Sections">
            <a href="#tour">What it does</a>
            <a href="#trust">Privacy</a>
            <a href="#price">Price</a>
          </nav>
          <span className={styles.chip}>
            <span className={styles.chipDot} />
            Coming to iPhone
          </span>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroWash} aria-hidden="true" />
          <div className={styles.wrap}>
            <p className={`${styles.eyebrow} ${styles.reveal}`} data-reveal>
              iPhone · On-device · One-time purchase
            </p>
            <h1 className={`${styles.heroTitle} ${styles.reveal}`} data-reveal data-delay="1">
              Tidy your camera roll. Keep your photos <em>yours</em>.
            </h1>
            <p className={`${styles.heroSub} ${styles.reveal}`} data-reveal data-delay="2">
              Photo Cleanup finds duplicates, near-identical shots, blurry photos and old
              screenshots — all on your iPhone. Nothing is uploaded. Nothing is deleted until you
              say so.
            </p>
            <div className={`${styles.heroCta} ${styles.reveal}`} data-reveal data-delay="3">
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={MAILTO}>
                Email me when it’s out
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#tour">
                See how it works
              </a>
            </div>
            <p className={`${styles.heroNote} ${styles.reveal}`} data-reveal data-delay="4">
              $6.99 once. No subscription, no account, no ads.
            </p>  
            <div className={`${styles.heroChips} ${styles.reveal}`} data-reveal data-delay="5">
              <span className={styles.chip}>No cloud, no servers</span>
              <span className={styles.chip}>“Data Not Collected” privacy label</span>
              <span className={styles.chip}>Works with Family Sharing</span>
            </div>
          </div>
        </section>

        <div className={styles.wrap}>
          <section className={styles.tour} id="tour">
            <div className={styles.tourStage}>
              <div className={`${styles.device} ${styles.reveal}`} data-reveal ref={deviceRef}>
                <div className={styles.deviceScreen}>
                  <div className={styles.deviceNotch} aria-hidden="true" />
                  {SCREENS.map((Screen, i) => (
                    <div
                      key={STEPS[i].dot}
                      className={`${styles.screen} ${i === active ? styles.isActive : ''}`}
                      aria-hidden="true"
                    >
                      <Screen />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.tourDots} role="tablist" aria-label="Jump to a step">
                {STEPS.map((step, i) => (
                  <button
                    key={step.dot}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={step.dot}
                    className={`${styles.tourDot} ${i === active ? styles.isActive : ''}`}
                    onClick={() => goToStep(i)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.tourSteps}>
              {STEPS.map((step, i) => (
                <article
                  key={step.dot}
                  className={`${styles.step} ${styles.reveal}`}
                  data-reveal
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  style={{ opacity: i === active || reduced ? 1 : 0.42 }}
                >
                  <span className={styles.stepLabel}>{step.label}</span>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  <p className={styles.stepMeta}>{step.meta}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.section} id="trust">
          <div className={styles.wrap}>
            <div className={`${styles.sectionHead} ${styles.reveal}`} data-reveal>
              <p className={styles.eyebrow}>Why it’s built this way</p>
              <h2>Most photo cleaners make money from your worry. This one doesn’t.</h2>
              <p>
                A one-time price removes the reason to trap you, and on-device processing removes
                the reason to trust us.
              </p>
            </div>

            <div className={styles.cards}>
              {TRUST.map((card, i) => (
                <article
                  key={card.title}
                  className={`${styles.card} ${styles.reveal}`}
                  data-reveal
                  data-delay={String(i + 1)}
                >
                  <span className={styles.cardIcon} aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {card.icon}
                    </svg>
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.priceSection}`} id="price">
          <div className={styles.wrap}>
            <div className={styles.price}>
              <div className={`${styles.priceLead} ${styles.reveal}`} data-reveal>
                <p className={styles.eyebrow}>Price</p>
                <h2>Try it properly first. Pay once if you keep it.</h2>
                <ul className={styles.tiers}>
                  <li>
                    <span className={styles.tick}>
                      <Tick />
                    </span>
                    <span>
                      <b>Free:</b> scan your whole library and delete your first 50 photos.
                    </span>
                  </li>
                  <li>
                    <span className={styles.tick}>
                      <Tick />
                    </span>
                    <span>
                      <b>Free forever:</b> sorting, Inbox and progress — no limit, no unlock.
                    </span>
                  </li>
                  <li>
                    <span className={`${styles.tick} ${styles.tickStar}`}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="m12 3 2.6 5.7 6.4.7-4.8 4.2 1.4 6.4L12 16.8 6.4 20l1.4-6.4L3 9.4l6.4-.7Z" />
                      </svg>
                    </span>
                    <span>
                      <b>Unlocked:</b> delete as much as you like, as often as you like.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={`${styles.priceCard} ${styles.reveal}`} data-reveal data-delay="2">
                <span className={styles.priceBadge}>No subscription · No trial · No account</span>
                <p className={styles.priceValue}>$6.99</p>
                <p className={styles.priceOnce}>once · yours for life</p>
                <a className={`${styles.btn} ${styles.priceBtn}`} href={MAILTO}>
                  Email me when it’s out
                </a>
                <p className={styles.priceFoot}>
                  Works with Family Sharing · Restore anytime · Local currency set by the App Store
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerInner}`}>
          <span className={styles.footerCopy}>© 2026 Photo Cleanup</span>
          <nav className={styles.footerLinks} aria-label="Legal">
            <Link href="/photo-cleanup/privacy-policy/">Privacy policy</Link>
            <Link href="/photo-cleanup/terms-of-service/">Terms of service</Link>
            {/* a plain anchor, not next/link: the desktop is the other design
                system and crossing to it needs a fresh document — lib/routes.js */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">← Back to ltatarev.github.io</a>
            <a href="mailto:cistern_scooter.8r@icloud.com">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
