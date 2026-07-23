'use client';

import { useEffect, useRef, useState } from 'react';
import { PhoneClock } from './HeroClock';

const TASKS = [
  { id: 'build', label: 'ship a new build', emoji: '🚀', color: 'var(--rose)', done: true },
  { id: 'pr', label: 'review a PR', emoji: '👀', color: '#7fb2ef', done: true },
  { id: 'plants', label: 'water the plants', emoji: '🌱', color: '#9ed8b6', done: false },
];

export function Scrapbook() {
  const boardRef = useRef(null);
  const tidyRef = useRef(null);
  const [tasks, setTasks] = useState(TASKS);

  const doneCount = tasks.filter((t) => t.done).length;

  function toggleTask(id) {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;
    const hero = board.closest('.hero') || board.parentElement;
    const tidy = tidyRef.current;
    const trinkets = Array.from(board.querySelectorAll('.tk'));
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
        if (e.target.closest && e.target.closest('.task')) return;
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
        el.classList.add('dragging', 'moved');
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
          if (tidy) tidy.classList.add('show');
        }
      };

      const onUp = (e) => {
        if (!dragging || (e && e.pointerId !== pid)) return;
        dragging = false;
        pid = null;
        el.classList.remove('dragging');
        if (!reduce && Math.hypot(vx, vy) > 0.04) glide();
        else settle();
      };

      const onCancel = () => {
        if (!dragging) return;
        dragging = false;
        pid = null;
        el.classList.remove('dragging');
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
        el.classList.remove('moved');
      });
      anyMoved = false;
      tidy.classList.remove('show');
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
      <div className="scrapbook" ref={boardRef} aria-hidden="true">
        {/* polaroid (behind) */}
        <div className="tk tk-polaroid">
          <div className="polaroid">
            <div className="pic" />
            <div className="cap">hello :)</div>
          </div>
        </div>

        {/* washi tape */}
        <div className="tk tk-washi">
          <div className="washi" />
        </div>

        {/* virtual-pet egg */}
        <div className="tk tk-pet tk-shadow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tamagochi.png" alt="pink virtual-pet egg" />
        </div>

        {/* phone */}
        <div className="tk tk-phone">
          <div className="phone">
            <div className="screen">
              <div className="island" />
              <div className="scr-status">
                <PhoneClock />
                <span className="bat">
                  <i />
                </span>
              </div>
              <div className="scr-head">
                <div className="greet">
                  hey, <b>lucija</b> ✿
                </div>
                <div className="sub">
                  {doneCount} of {tasks.length} done today
                </div>
              </div>
              <div className="scr-progress">
                <i style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
              </div>
              <div className="scr-list">
                {tasks.map((t) => (
                  <button
                    key={t.id}
                    className={`task${t.done ? ' done' : ''}`}
                    type="button"
                    tabIndex={-1}
                    onClick={() => toggleTask(t.id)}
                  >
                    <span className="bar" style={{ background: t.color }} />
                    <span
                      className={`tc${t.done ? '' : ' o'}`}
                      style={t.done ? { background: t.color } : undefined}
                    >
                      {t.done ? '✓' : ''}
                    </span>
                    <span className="tl">{t.label}</span>
                    <span className="emj">{t.emoji}</span>
                  </button>
                ))}
              </div>
              <div className="scr-tab">
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
        <div className="tk tk-figure tk-shadow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/smiski.png" alt="little green figurine at a laptop" />
        </div>

        {/* film canister */}
        <div className="tk tk-film tk-shadow">
          <svg width="60" height="80" viewBox="0 0 60 80">
            <path d="M8 40h30l14-8v34l-14-6H8z" fill="#efe7d6" />
            <g fill="#141210">
              <rect x="38" y="30" width="1.5" height="3" />
              <rect x="42" y="28" width="1.5" height="3" />
              <rect x="46" y="26" width="1.5" height="3" />
              <rect x="38" y="59" width="1.5" height="3" />
              <rect x="42" y="61" width="1.5" height="3" />
              <rect x="46" y="63" width="1.5" height="3" />
            </g>
            <rect x="10" y="20" width="26" height="52" rx="5" fill="#2a2622" />
            <rect x="10" y="34" width="26" height="24" rx="2" fill="#efe7d6" />
            <rect x="14" y="40" width="18" height="3" rx="1.5" fill="#ca718d" />
            <rect x="14" y="46" width="12" height="2.4" rx="1.2" fill="#7fb2ef" />
            <rect x="14" y="14" width="18" height="8" rx="3" fill="#3a352e" />
          </svg>
        </div>

        {/* cassette */}
        <div className="tk tk-tape tk-shadow">
          <svg width="104" height="66" viewBox="0 0 104 66">
            <rect x="1" y="1" width="102" height="64" rx="8" fill="#f0b9cf" />
            <rect x="1" y="1" width="102" height="64" rx="8" fill="url(#casG)" opacity=".4" />
            <rect x="12" y="12" width="80" height="26" rx="5" fill="#fbf6ec" />
            <rect x="20" y="18" width="64" height="3" rx="1.5" fill="#ca718d" />
            <rect x="20" y="25" width="44" height="2.6" rx="1.3" fill="#8f8a7e" />
            <rect x="16" y="44" width="72" height="16" rx="4" fill="#2a2622" />
            <circle cx="34" cy="52" r="6" fill="#fbf6ec" />
            <circle cx="70" cy="52" r="6" fill="#fbf6ec" />
            <circle cx="34" cy="52" r="2.4" fill="#2a2622" />
            <circle cx="70" cy="52" r="2.4" fill="#2a2622" />
            <defs>
              <linearGradient id="casG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".6" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* paperclip */}
        <div className="tk tk-clip">
          <svg className="die" width="26" height="60" viewBox="0 0 26 60" fill="none">
            <path
              d="M18 14v30a6 6 0 01-12 0V12a9 9 0 0118 0v34"
              stroke="#b9b3a6"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* stickers */}
        <div className="tk tk-star">
          <span className="die">🌟</span>
        </div>
        <div className="tk tk-heart">
          <span className="die">💗</span>
        </div>
      </div>

      <button className="tidy" ref={tidyRef} type="button">
        <span className="a">✦ drag the trinkets</span>
        <span className="b">↺ tidy up</span>
      </button>
    </>
  );
}
