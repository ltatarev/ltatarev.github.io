'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { apps, iconSrc } from '@/lib/apps';
import { isProductRoute } from '@/lib/routes';
import styles from './AppDock.module.css';

// How much of the remaining distance each icon closes per frame. Lower is a
// slower, gentler ramp; toward 1 it snaps to the cursor.
const LERP = 0.18;
// Below this the icon is close enough — snap it and let the loop settle.
const EPSILON = 0.0008;
// Long enough for the bounce to read before the page changes under it.
const LAUNCH_MS = 580;

// A macOS-dock shelf of the apps in lib/apps.js: icons magnify around the cursor
// and open that app's page.
//
// The magnification never touches React state — a setState per frame would
// re-render the whole dock 60×/second. Every value the loop needs lives in a ref,
// and the loop writes `transform` straight onto the icon elements. The component
// renders once and then stays put for the rest of its life.
export function AppDock() {
  const router = useRouter();
  const dockRef = useRef(null);
  // one entry per app, filled by the ref callbacks below
  const itemRefs = useRef([]);
  const icRefs = useRef([]);
  const innerRefs = useRef([]);

  // Geometry, measured on enter/resize and then read from cache. Calling
  // getBoundingClientRect() inside the loop would force a synchronous reflow every
  // frame, which is where dock jank comes from.
  const geom = useRef({ base: 84, bump: 28, reach: 170, gap: 16, left: 0, width: 0, centers: [] });
  // magnification per icon, 0..1: where it's heading, and where it is now
  const target = useRef(apps.map(() => 0));
  const curr = useRef(apps.map(() => 0));
  const pointerX = useRef(null);
  const rafId = useRef(0);
  const running = useRef(false);
  const launchTimer = useRef(null);
  // set on mount — matchMedia needs a window
  const fisheye = useRef(false);
  const reduced = useRef(false);

  const measure = useCallback(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const cs = getComputedStyle(dock);
    const g = geom.current;
    g.base = parseFloat(cs.getPropertyValue('--base')) || 84;
    g.bump = parseFloat(cs.getPropertyValue('--bump')) || 28;
    g.reach = parseFloat(cs.getPropertyValue('--reach')) || 170;
    g.gap = parseFloat(cs.getPropertyValue('--gap')) || 16;

    const rect = dock.getBoundingClientRect();
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    // the fixed content box the icons have to stay inside
    g.left = rect.left + padL;
    g.width = rect.width - padL - padR;
    g.centers = itemRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2;
    });
  }, []);

  // The only thing that touches the DOM per frame, and it only writes `transform` —
  // animating width/height instead would re-run layout on every tick.
  const paint = useCallback(() => {
    const g = geom.current;
    const n = apps.length;
    const sizes = [];
    let sum = 0;
    for (let i = 0; i < n; i += 1) {
      sizes[i] = g.base + g.bump * curr.current[i];
      sum += sizes[i];
    }

    // The row always occupies exactly the dock's fixed inner width: as icons grow
    // the gaps between them shrink to absorb it, instead of the row spreading past
    // the dock. The first icon's left edge and the last one's right edge stay
    // pinned to the padding box, so nothing ever overflows.
    const effGap = n > 1 ? (g.width - sum) / (n - 1) : 0;

    let x = g.left;
    for (let i = 0; i < n; i += 1) {
      const center = x + sizes[i] / 2;
      x += sizes[i] + effGap;
      const dx = center - g.centers[i];
      const scale = sizes[i] / g.base;
      const ic = icRefs.current[i];
      // translate comes first, so it isn't multiplied by the scale
      if (ic) ic.style.transform = `translateX(${dx.toFixed(2)}px) scale(${scale.toFixed(4)})`;
      // the tooltip rides above the *scaled* icon, so it needs the grown height
      const item = itemRefs.current[i];
      if (item) item.style.setProperty('--grow', `${(sizes[i] - g.base).toFixed(1)}px`);
    }
  }, []);

  // One loop for the whole dock — it eases every icon toward its target and stops
  // itself once everything has settled and the cursor has left. Scheduling a frame
  // per pointer event instead would pile up several per tick.
  const loop = useCallback(
    function step() {
      let moving = false;
      for (let i = 0; i < apps.length; i += 1) {
        const diff = target.current[i] - curr.current[i];
        if (Math.abs(diff) > EPSILON) {
          curr.current[i] += diff * LERP;
          moving = true;
        } else {
          curr.current[i] = target.current[i];
        }
      }
      paint();

      if (moving || pointerX.current !== null) rafId.current = requestAnimationFrame(step);
      else running.current = false;
    },
    [paint],
  );

  const start = useCallback(() => {
    if (running.current) return;
    running.current = true;
    rafId.current = requestAnimationFrame(loop);
  }, [loop]);

  const rest = useCallback(() => {
    pointerX.current = null;
    target.current.fill(0);
    start();
  }, [start]);

  // Smoothstep falloff over --reach: neighbours ease along with the hovered icon
  // instead of the linear ramp's visible kink at the edge of the influence radius.
  const aimAt = useCallback((mx) => {
    const g = geom.current;
    for (let i = 0; i < apps.length; i += 1) {
      const t = Math.max(0, 1 - Math.abs(g.centers[i] - mx) / g.reach);
      target.current[i] = t * t * (3 - 2 * t);
    }
  }, []);

  // Keyboard equivalent: the focused icon magnifies as if the cursor sat on it,
  // with the same falloff stepped out in whole slots.
  const aimAtIndex = useCallback((idx) => {
    const g = geom.current;
    for (let i = 0; i < apps.length; i += 1) {
      const t = Math.max(0, 1 - (Math.abs(i - idx) * (g.base + g.gap)) / g.reach);
      target.current[i] = t * t * (3 - 2 * t);
    }
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    fisheye.current = window.matchMedia('(hover: hover)').matches && !reduced.current;
    if (!fisheye.current) return undefined;

    measure();
    paint();

    const onResize = () => {
      measure();
      pointerX.current = null;
      target.current.fill(0);
      curr.current.fill(0);
      paint();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId.current);
      running.current = false;
    };
  }, [measure, paint]);

  // Separate from the loop's cleanup because the bounce runs on touch too, where
  // the effect above bails out early.
  useEffect(() => () => clearTimeout(launchTimer.current), []);

  const onEnter = (e) => {
    if (!fisheye.current) return;
    measure();
    pointerX.current = e.clientX;
    aimAt(e.clientX);
    start();
  };

  const onMove = (e) => {
    if (!fisheye.current) return;
    pointerX.current = e.clientX;
    aimAt(e.clientX);
    start();
  };

  const onLeave = () => {
    if (!fisheye.current) return;
    rest();
  };

  const onFocus = (i) => {
    if (!fisheye.current) return;
    measure();
    pointerX.current = geom.current.centers[i];
    aimAtIndex(i);
    itemRefs.current[i]?.classList.add(styles.showName);
    start();
  };

  const onBlur = (i) => {
    itemRefs.current[i]?.classList.remove(styles.showName);
    if (!fisheye.current) return;
    rest();
  };

  // Bounce first, navigate after — but only for a plain click. Cmd/Ctrl/Shift and
  // the middle button fall through to whatever the browser normally does with a link.
  const onClick = (e, i, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
    if (reduced.current) return;

    e.preventDefault();
    const inner = innerRefs.current[i];
    if (inner) {
      inner.classList.remove(styles.launch);
      void inner.offsetWidth; // reflow, so the animation restarts rather than resuming
      inner.classList.add(styles.launch);
    }
    // Apps with a page of their own design system need the document swapped out
    // rather than the route patched, or the desktop's stylesheet rides along —
    // see lib/routes.js.
    const go = isProductRoute(href) ? () => window.location.assign(href) : () => router.push(href);
    launchTimer.current = setTimeout(go, LAUNCH_MS);
  };

  return (
    <>
      <div className={styles.dockwrap}>
        <div
          ref={dockRef}
          className={styles.appdock}
          onMouseEnter={onEnter}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {apps.map((app, i) => {
            // next/link soft-navigates, which is wrong across the shell boundary
            // (lib/routes.js) — those apps get a plain anchor so every way of
            // opening them, including cmd-click and the reduced-motion path
            // below, loads a fresh document.
            const Anchor = isProductRoute(app.href) ? 'a' : Link;
            return (
              <Anchor
                key={app.slug}
                href={app.href}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={styles.appItem}
                aria-label={app.name}
                onFocus={() => onFocus(i)}
                onBlur={() => onBlur(i)}
                onClick={(e) => onClick(e, i, app.href)}
              >
                <span className={styles.appName}>{app.name}</span>
                <span
                  ref={(el) => {
                    icRefs.current[i] = el;
                  }}
                  className={styles.appIc}
                >
                  <span
                    ref={(el) => {
                      innerRefs.current[i] = el;
                    }}
                    className={styles.appInner}
                  >
                    {app.badge && (
                      <span className={`${styles.appBadge} ${app.badge.live ? styles.live : ''}`}>
                        {app.badge.text}
                      </span>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={iconSrc(app)} alt="" draggable="false" />
                  </span>
                </span>
              </Anchor>
            );
          })}
        </div>
      </div>
    </>
  );
}
