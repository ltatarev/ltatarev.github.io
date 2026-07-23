'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

// A CSS `cursor:` image is a bitmap the OS blits, so it can never rotate. This
// draws the same charm as an inline SVG instead, pinned to the pointer, so the
// pointer can lean into the movement and the keychain can swing off its tail
// like the two-link pendulum it looks like.
//
// The bitmap in globals.css stays the fallback: this only takes over on a real
// mouse, and only when the visitor hasn't asked for reduced motion.

// --- geometry, in the 220x350 user units of public/pointer-charm.svg ---
const LEAN = 'rotate(-8 120 190)'; // the jaunty tilt the whole charm is drawn at
const TIP = [23.6, 50.1]; // arrow tip: the click point, and the body's pivot
const RING = [140.3, 240.7]; // where the keychain hangs off the pointer's tail
const LINK = [146.9, 258.9]; // where the sparkle hangs off the first ring
const SCALE = 0.1777; // ~46px of artwork, matching the bitmap it replaces

// Everything the charm travels over is light — cream paper, white windows,
// pastel wallpaper — so it's outlined dark rather than rimmed white. White
// scored 1.0:1 against the panels, i.e. invisible; this plum is 8.6:1 on paper
// and 9.9:1 on white. Keep it in step with public/pointer-charm.svg.
const RIM = '#6d2e42';

// --- feel ---
// Each moving part is a damped spring: `hz` is how fast it wants to swing back,
// `damp` how quickly it gives up (below 1 it overshoots, which is the whole
// point). `trail` turns pointer speed into the angle the part is pulled to —
// negative because everything lags behind the direction of travel.
// `max` caps the pull, so slamming the mouse across the screen swings no wider
// than an ordinary flick: a fast flick peaks near 34deg of ring / 44deg of
// sparkle and settles in about 1.3s, an unhurried drift sways about 15deg.
const BODY = { hz: 3.1, damp: 0.6, trail: 0.016, max: 13 };
const CHAIN = { hz: 2.2, damp: 0.32, trail: 0.026, max: 26 };
const CHARM = { hz: 3.0, damp: 0.28, trail: 0.032, max: 34 };
const SCALE_SPRING = { hz: 4.2, damp: 0.7 };
const HOVER_SCALE = 1.15; // stands in for the old --charm-lg cursor
const PRESS_SCALE = 0.86;
const PRESS_KICK = 360; // deg/s a click jolts down the keychain
const REST_V = 0.5; // deg/s (and px/s) below which a part counts as settled
const REST_A = 0.05; // ...as long as it's also this close to hanging straight

const HOVERABLE = 'a, button, [role="button"], select, summary, label';
const TEXTUAL =
  "input:not([type='button']):not([type='submit']), textarea, [contenteditable='true']";

const clamp = (v, max) => (v > max ? max : v < -max ? -max : v);

export function Cursor() {
  const [live, setLive] = useState(false);
  const wrapRef = useRef(null);
  const bodyRef = useRef(null);
  const chainRef = useRef(null);
  const charmRef = useRef(null);

  // Only a mouse gets the drawn cursor: a touch screen has none to replace, and
  // reduced-motion means the swinging is exactly what's not wanted.
  useEffect(() => {
    const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setLive(mouse.matches && !still.matches);
    sync();
    mouse.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      mouse.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!live) return undefined;

    const wrap = wrapRef.current;
    const bodyG = bodyRef.current;
    const chainG = chainRef.current;
    const charmG = charmRef.current;
    if (!wrap) return undefined;

    document.documentElement.classList.add('charm');

    // pointer position, and the position it had on the previous frame
    let x = 0;
    let y = 0;
    let lastX = 0;
    let vx = 0; // smoothed horizontal speed, px/s — what drives the swing
    // angle + angular velocity for each link, in degrees and deg/s
    let body = 0;
    let bodyV = 0;
    let chain = 0;
    let chainV = 0;
    let charm = 0;
    let charmV = 0;
    let scale = 1;
    let scaleV = 0;
    let want = 1; // scale the pointer state (hover / press) is asking for
    let hovering = false;
    let seen = false; // has the pointer been anywhere yet?
    let frame = 0;
    let last = 0;

    // one semi-implicit Euler step of a damped spring: stable at any frame rate
    const step = (a, v, target, { hz, damp }, dt) => {
      const w = 2 * Math.PI * hz;
      const nv = v + (w * w * (target - a) - 2 * damp * w * v) * dt;
      return [a + nv * dt, nv];
    };

    const tick = (now) => {
      // a tab that was backgrounded comes back with a huge gap; cap it so
      // nothing gets flung across the screen
      const dt = Math.min(Math.max((now - last) / 1000, 1 / 240), 1 / 30);
      last = now;

      // Only sideways movement swings a pendulum — gravity already points the
      // way vertical movement would pull, so it barely turns the charm at all.
      vx += ((x - lastX) / dt - vx) * 0.3;
      lastX = x;

      [body, bodyV] = step(body, bodyV, clamp(-vx * BODY.trail, BODY.max), BODY, dt);
      [chain, chainV] = step(chain, chainV, clamp(-vx * CHAIN.trail, CHAIN.max), CHAIN, dt);
      // the sparkle hangs off the ring, so it chases the ring as well as the drag
      const charmTo = clamp(-vx * CHARM.trail, CHARM.max) * 0.6 + chain * 0.5;
      [charm, charmV] = step(charm, charmV, charmTo, CHARM, dt);
      [scale, scaleV] = step(scale, scaleV, want, SCALE_SPRING, dt);

      wrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      bodyG.setAttribute('transform', `rotate(${body.toFixed(2)} ${TIP[0]} ${TIP[1]})`);
      chainG.setAttribute('transform', `rotate(${chain.toFixed(2)} ${RING[0]} ${RING[1]})`);
      charmG.setAttribute('transform', `rotate(${charm.toFixed(2)} ${LINK[0]} ${LINK[1]})`);

      // idle: stop burning frames until the pointer moves again
      const settled =
        Math.abs(vx) < REST_V &&
        Math.abs(bodyV) < REST_V &&
        Math.abs(chainV) < REST_V &&
        Math.abs(charmV) < REST_V &&
        Math.abs(body) < REST_A &&
        Math.abs(chain) < REST_A &&
        Math.abs(charm) < REST_A &&
        Math.abs(scaleV) < 0.01 &&
        Math.abs(scale - want) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const run = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        lastX = x;
        wrap.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        wrap.classList.add(styles.visible);
      }
      // a text field keeps its own caret, so step out of the way over one
      const overText = !!e.target.closest?.(TEXTUAL);
      wrap.classList.toggle(styles.hidden, overText);
      hovering = !overText && !!e.target.closest?.(HOVERABLE);
      want = hovering ? HOVER_SCALE : 1;
      run();
    };

    const onDown = () => {
      want = PRESS_SCALE;
      chainV += PRESS_KICK; // the ring swings one way, the sparkle the other
      charmV -= PRESS_KICK * 1.5;
      run();
    };
    const onUp = () => {
      want = hovering ? HOVER_SCALE : 1;
      run();
    };
    // leaving the window (or the tab losing focus) hands control back to the
    // real cursor, wherever it went
    const onLeave = () => wrap.classList.add(styles.hidden);
    const onEnter = () => wrap.classList.remove(styles.hidden);

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    window.addEventListener('blur', onLeave);

    return () => {
      document.documentElement.classList.remove('charm');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('blur', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [live]);

  if (!live) return null;

  return (
    <div ref={wrapRef} className={styles.cursor} aria-hidden="true">
      <svg
        className={styles.art}
        viewBox="0 0 220 350"
        width={220 * SCALE}
        height={350 * SCALE}
        style={{ left: `${-TIP[0] * SCALE}px`, top: `${-TIP[1] * SCALE}px` }}
      >
        <defs>
          <linearGradient id="cc-pink" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#ffc4d8" />
            <stop offset="0.35" stopColor="#f291b4" />
            <stop offset="0.75" stopColor="#d2718f" />
            <stop offset="1" stopColor="#b8536f" />
          </linearGradient>
          <linearGradient id="cc-gloss" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cc-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ded2b8" />
            <stop offset="0.45" stopColor="#9c907a" />
            <stop offset="1" stopColor="#635a49" />
          </linearGradient>
          <linearGradient id="cc-charm" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#ffe6ae" />
            <stop offset="0.5" stopColor="#eeba61" />
            <stop offset="1" stopColor="#b9822f" />
          </linearGradient>
        </defs>

        {/* body -> chain -> charm: each link rotates about where it hangs from
            the one above, so the swings compound the way a keychain's do */}
        <g ref={bodyRef}>
          <g transform={LEAN}>
            {/* paint-order puts the stroke under the fill, so the whole 12
                units of rim sit outside the shape and the pink stays full size */}
            <path
              d="M44 38L44 218L89 173L116 236L143 227L116 164L170 164Z"
              fill="url(#cc-pink)"
              stroke={RIM}
              strokeWidth="12"
              strokeLinejoin="round"
              paintOrder="stroke"
            />
            <path d="M52 58L52 196L74 174L58 140Z" fill="url(#cc-gloss)" opacity="0.85" />
            <path d="M124 176L136 176L128 214L120 196Z" fill="#ffffff" opacity="0.22" />
          </g>

          <g ref={chainRef}>
            <g transform={LEAN}>
              <circle
                cx="133"
                cy="252"
                r="9"
                fill="none"
                stroke="url(#cc-metal)"
                strokeWidth="4.6"
              />
              <circle
                cx="133"
                cy="252"
                r="9"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.5"
                strokeDasharray="9 22"
                transform="rotate(-40 133 252)"
              />
            </g>

            <g ref={charmRef}>
              <g transform={LEAN}>
                <circle
                  cx="141"
                  cy="272"
                  r="8"
                  fill="none"
                  stroke="url(#cc-metal)"
                  strokeWidth="4.2"
                />
                <circle
                  cx="141"
                  cy="272"
                  r="8"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.4"
                  opacity="0.5"
                  strokeDasharray="8 20"
                  transform="rotate(-40 141 272)"
                />
                <path
                  d="M151 282C153.7 292.8 156.3 295.4 167 298C156.3 300.6 153.7 303.2 151 314C148.3 303.2 145.7 300.6 135 298C145.7 295.4 148.3 292.8 151 282Z"
                  fill="url(#cc-charm)"
                  stroke={RIM}
                  strokeWidth="6"
                  strokeLinejoin="round"
                  paintOrder="stroke"
                />
                <path
                  d="M147.5 292.5C148.6 296 149.4 296.8 152 297.6C149 298.4 148.4 299.2 147.5 302C146.6 299.2 146 298.4 143 297.6C145.8 296.8 146.6 296 147.5 292.5Z"
                  fill="#ffffff"
                  opacity="0.75"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
