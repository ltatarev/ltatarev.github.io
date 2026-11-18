'use client';

import { useEffect, useRef, useState } from 'react';
import { PhoneClock } from '@/components/ui/HeroClock';
import styles from './Scrapbook.module.css';

const TASKS = [
  { id: 'moviest', label: 'ship moviest 1.0', done: true },
  { id: 'plants', label: 'water the plants', done: true },
  { id: 'redesign', label: 'play with tamagotchi', done: false },
];

const CONFETTI_COLORS = ['var(--rose)', '#7fb2ef', '#9ed8b6', '#f2c14e', '#c79ae0', '#f28f7a'];

/* hand-tuned rather than random so the pieces never clump and the markup stays
   identical between server and client — it's only ever 18 of them */
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  x: 4 + ((i * 37) % 92),
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  delay: ((i * 7) % 11) / 22,
  dur: 1.5 + ((i * 5) % 7) / 10,
  drift: (i % 2 ? 1 : -1) * (14 + ((i * 13) % 40)),
  spin: (i % 2 ? 1 : -1) * (360 + ((i * 53) % 360)),
  size: 5 + (i % 3) * 2,
  round: i % 3 === 0,
}));

/* a touch past the slowest piece's delay + duration, so the layer unmounts
   only once every piece has fallen out of frame */
const CONFETTI_MS = 2800;

export function Scrapbook() {
  const boardRef = useRef(null);
  const tidyRef = useRef(null);
  const [tasks, setTasks] = useState(TASKS);
  const [burst, setBurst] = useState(0);

  const doneCount = tasks.filter((t) => t.done).length;
  const allDone = doneCount === tasks.length;

  function toggleTask(id) {
    const next = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTasks(next);
    // celebrate only on the crossing into "all done", so re-ticking the last
    // task fires a fresh burst but a list that was already complete stays quiet
    if (!allDone && next.every((t) => t.done)) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setBurst((b) => b + 1);
      }
    }
  }

  useEffect(() => {
    if (!burst) return undefined;
    const t = setTimeout(() => setBurst(0), CONFETTI_MS);
    return () => clearTimeout(t);
  }, [burst]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;
    // the board sits directly inside the hero, which is what the drag is clamped to
    const hero = board.parentElement;
    const tidy = tidyRef.current;
    const trinkets = Array.from(board.querySelectorAll(`.${styles.tk}`));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let zTop = 40;
    let anyMoved = false;

    /* ---- soft, synthesized peel & stick sounds (no assets) ---- */
    let audio = null;
    const ac = () => {
      if (audio) return audio;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audio = new Ctx();
      } catch (err) {
        audio = null;
      }
      return audio;
    };
    const peel = (vol = 0.09) => {
      const ctx = ac();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime;
      const dur = 0.18;
      const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 1.5;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.value = 0.8;
      bp.frequency.setValueAtTime(850, t);
      bp.frequency.exponentialRampToValueAtTime(2600, t + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(bp).connect(g).connect(ctx.destination);
      src.start(t);
      src.stop(t + dur + 0.02);
    };
    const stick = () => {
      const ctx = ac();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime;
      const dur = 0.13;
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(330, t);
      o.frequency.exponentialRampToValueAtTime(140, t + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.11, t + 0.014);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
    };

    /* the collage is CSS-scaled on smaller screens — keep drags 1:1 with the cursor */
    const scaleOf = () => {
      const w = board.offsetWidth;
      return w ? board.getBoundingClientRect().width / w || 1 : 1;
    };

    /* clamp a proposed translate so the trinket stays fully inside the hero
       (never behind the Finder window below, never off the sides) */
    const clampXY = (el, nx, ny, sc) => {
      const cx = parseFloat(el.dataset.x || 0);
      const cy = parseFloat(el.dataset.y || 0);
      const r = el.getBoundingClientRect();
      const hb = hero.getBoundingClientRect();
      const pad = 6;
      let dxs = (nx - cx) * sc;
      let dys = (ny - cy) * sc;
      let hitX = false;
      let hitY = false;
      const left = r.left + dxs;
      const right = r.right + dxs;
      const top = r.top + dys;
      const bottom = r.bottom + dys;
      if (left < hb.left + pad) {
        dxs += hb.left + pad - left;
        hitX = true;
      } else if (right > hb.right - pad) {
        dxs -= right - (hb.right - pad);
        hitX = true;
      }
      if (top < hb.top + pad) {
        dys += hb.top + pad - top;
        hitY = true;
      } else if (bottom > hb.bottom - pad) {
        dys -= bottom - (hb.bottom - pad);
        hitY = true;
      }
      return { x: cx + dxs / sc, y: cy + dys / sc, hitX, hitY };
    };

    const cleanups = [];

    trinkets.forEach((el) => {
      let dragging = false;
      let pid = null;
      let sc = 1;
      let startX = 0;
      let startY = 0;
      let baseX = 0;
      let baseY = 0;
      let vx = 0;
      let vy = 0;
      let lastT = 0;
      let lastX = 0;
      let lastY = 0;
      let raf = 0;
      el.dataset.x = el.dataset.x || 0;
      el.dataset.y = el.dataset.y || 0;

      const apply = (x, y) => {
        el.style.translate = `${x}px ${y}px`;
      };

      const settle = () => {
        stick();
      };

      const glide = () => {
        const friction = 0.94;
        const stopV = 0.02;
        let last = performance.now();
        const step = () => {
          const now = performance.now();
          const dt = Math.min(40, now - last);
          last = now;
          const x = parseFloat(el.dataset.x || 0) + vx * dt;
          const y = parseFloat(el.dataset.y || 0) + vy * dt;
          const c = clampXY(el, x, y, scaleOf());
          if (c.hitX) vx *= -0.42;
          if (c.hitY) vy *= -0.42;
          el.dataset.x = c.x;
          el.dataset.y = c.y;
          apply(c.x, c.y);
          vx *= friction;
          vy *= friction;
          if (Math.hypot(vx, vy) > stopV) {
            raf = requestAnimationFrame(step);
          } else {
            raf = 0;
            settle();
          }
        };
        raf = requestAnimationFrame(step);
      };

      const onDown = (e) => {
        if (e.button && e.button !== 0) return;
        // the phone's todo list is tappable — don't hijack it into a drag
        if (e.target.closest && e.target.closest(`.${styles.task}`)) return;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        dragging = true;
        pid = e.pointerId;
        sc = scaleOf();
        startX = e.clientX;
        startY = e.clientY;
        baseX = parseFloat(el.dataset.x || 0);
        baseY = parseFloat(el.dataset.y || 0);
        vx = 0;
        vy = 0;
        lastT = performance.now();
        lastX = baseX;
        lastY = baseY;
        el.classList.add(styles.dragging, styles.moved);
        el.style.rotate = ''; // let .dragging straighten it (peel off the page)
        el.style.zIndex = Math.min(60, (zTop += 1));
        try {
          el.setPointerCapture(pid);
        } catch (err) {
          /* no-op */
        }
        peel();
        e.preventDefault();
      };

      const onMove = (e) => {
        if (!dragging || e.pointerId !== pid) return;
        const rawx = baseX + (e.clientX - startX) / sc;
        const rawy = baseY + (e.clientY - startY) / sc;
        const c = clampXY(el, rawx, rawy, sc);
        el.dataset.x = c.x;
        el.dataset.y = c.y;
        apply(c.x, c.y);
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0) {
          vx = vx * 0.6 + ((c.x - lastX) / dt) * 0.4;
          vy = vy * 0.6 + ((c.y - lastY) / dt) * 0.4;
          lastT = now;
          lastX = c.x;
          lastY = c.y;
        }
        if (!anyMoved && (Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3)) {
          anyMoved = true;
          if (tidy) tidy.classList.add(styles.show);
        }
      };

      const onUp = (e) => {
        if (!dragging || (e && e.pointerId !== pid)) return;
        dragging = false;
        pid = null;
        el.classList.remove(styles.dragging);
        if (!reduce && Math.hypot(vx, vy) > 0.04) glide();
        else settle();
      };

      const onCancel = () => {
        if (!dragging) return;
        dragging = false;
        pid = null;
        el.classList.remove(styles.dragging);
        settle();
      };

      const prevent = (e) => e.preventDefault();

      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onCancel);
      el.addEventListener('dragstart', prevent);

      cleanups.push(() => {
        if (raf) cancelAnimationFrame(raf);
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onCancel);
        el.removeEventListener('dragstart', prevent);
      });
    });

    const onTidy = () => {
      if (!anyMoved) return;
      trinkets.forEach((el) => {
        el.dataset.x = 0;
        el.dataset.y = 0;
        el.style.translate = '';
        el.style.zIndex = '';
        el.style.rotate = '';
        el.classList.remove(styles.moved);
      });
      anyMoved = false;
      tidy.classList.remove(styles.show);
    };
    if (tidy) tidy.addEventListener('click', onTidy);

    return () => {
      cleanups.forEach((fn) => fn());
      if (tidy) tidy.removeEventListener('click', onTidy);
      if (audio) audio.close().catch(() => {});
    };
  }, []);

  return (
    <>
      <div className={styles.scrapbook} ref={boardRef} aria-hidden="true">
        {/* book (behind) */}
        <div className={`${styles.tk} ${styles.tkPolaroid}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.book} src="/book.png" alt="Dungeon Crawler Carl paperback" />
        </div>

        {/* washi tape */}
        <div className={`${styles.tk} ${styles.tkWashi}`}>
          <div className={styles.washi} />
        </div>

        {/* a secret tucked under the egg — static, not a .tk, so dragging other
            trinkets never exposes it. only moving the egg itself does. */}
        <a
          className={styles.tkFact}
          href="https://ltatarev.github.io/funfacts/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.fact}>a random fact, if you dare →</span>
        </a>

        {/* virtual-pet egg */}
        <div className={`${styles.tk} ${styles.tkPet} ${styles.shadow}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tamagochi.png" alt="pink virtual-pet egg" />
        </div>

        {/* phone */}
        <div className={`${styles.tk} ${styles.tkPhone}`}>
          <div className={styles.phone}>
            <div className={styles.screen}>
              {burst > 0 && (
                <div className={styles.confetti} key={burst} aria-hidden="true">
                  {CONFETTI.map((c, i) => (
                    <i
                      key={i}
                      style={{
                        left: `${c.x}%`,
                        width: c.size,
                        height: c.round ? c.size : c.size * 1.7,
                        background: c.color,
                        borderRadius: c.round ? '50%' : '1px',
                        animationDelay: `${c.delay}s`,
                        animationDuration: `${c.dur}s`,
                        '--drift': `${c.drift}px`,
                        '--spin': `${c.spin}deg`,
                      }}
                    />
                  ))}
                </div>
              )}
              <div className={styles.island} />
              <div className={styles.status}>
                <PhoneClock />
                <span className={styles.battery}>
                  <i />
                </span>
              </div>
              <div className={styles.head}>
                <div className={styles.greet}>hey, lucija</div>
                <div className={styles.sub}>
                  {doneCount} of {tasks.length} done today
                </div>
              </div>
              <div className={styles.progress}>
                <i style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
              </div>
              <div className={styles.list}>
                {tasks.map((t) => (
                  <button
                    key={t.id}
                    className={`${styles.task} ${t.done ? styles.done : ''}`.trim()}
                    type="button"
                    tabIndex={-1}
                    onClick={() => toggleTask(t.id)}
                  >
                    <span
                      className={`${styles.taskCheck} ${t.done ? '' : styles.open}`.trim()}
                      aria-hidden="true"
                    >
                      {t.done && (
                        <svg viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6.2l2.3 2.3 4.7-5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className={styles.taskLabel}>{t.label}</span>
                  </button>
                ))}
              </div>
              <div className={styles.tabs}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 10.5L12 3l9 7.5M5 9.5V20h14V9.5"
                    stroke="#1c1a17"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="6"
                    height="6"
                    rx="1.6"
                    stroke="#bdb7ab"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="4"
                    width="6"
                    height="6"
                    rx="1.6"
                    stroke="#bdb7ab"
                    strokeWidth="2"
                  />
                  <rect
                    x="4"
                    y="14"
                    width="6"
                    height="6"
                    rx="1.6"
                    stroke="#bdb7ab"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="6"
                    height="6"
                    rx="1.6"
                    stroke="#bdb7ab"
                    strokeWidth="2"
                  />
                </svg>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z"
                    stroke="#bdb7ab"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.4" stroke="#bdb7ab" strokeWidth="2" />
                  <path
                    d="M5.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"
                    stroke="#bdb7ab"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* figurine */}
        <div className={`${styles.tk} ${styles.tkFigure} ${styles.shadow}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/smiski.png" alt="little green figurine at a laptop" />
        </div>

        {/* film canister */}
        <div className={`${styles.tk} ${styles.tkFilm} ${styles.shadow}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/film.png" alt="roll of colour film" />
        </div>

        {/* cassette */}
        <div className={`${styles.tk} ${styles.tkTape} ${styles.shadow}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cassette.png" alt="pink and black audio cassette" />
        </div>

        {/* paperclip */}
        <div className={`${styles.tk} ${styles.tkClip}`}>
          <svg className={styles.die} width="26" height="60" viewBox="0 0 26 60" fill="none">
            <path
              d="M18 14v30a6 6 0 01-12 0V12a9 9 0 0118 0v34"
              stroke="#b9b3a6"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* stickers */}
        <div className={`${styles.tk} ${styles.tkStar}`}>
          <span className={styles.die}>🌟</span>
        </div>
        <div className={`${styles.tk} ${styles.tkHeart}`}>
          <span className={styles.die}>💗</span>
        </div>
      </div>

      <button className={styles.tidy} ref={tidyRef} type="button">
        <span className={styles.before}>✦ drag the trinkets</span>
        <span className={styles.after}>↺ tidy up</span>
      </button>
    </>
  );
}
