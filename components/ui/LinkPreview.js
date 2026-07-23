'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { linkPreviews } from '@/lib/linkPreviews';
import styles from './LinkPreview.module.css';

// A floating hover card for the outbound links in the experience list. The links
// are injected as raw HTML (dangerouslySetInnerHTML), so there's nothing to hang
// a React onMouseEnter on — instead one delegated listener on the document
// matches the hovered <a> by href against lib/linkPreviews and portals a card to
// <body>, tethered to the link by a dotted line + diamond. pointer-events stay
// off the card so it can never steal the hover from the link underneath.

const WIDTH = 264; // keep in step with .wrap width in the stylesheet
const MARGIN = 10; // min gap from the viewport edge
const CONN = 30; // dotted-tether length; keep in step with --conn below
const SHOW_DELAY = 130;
const HIDE_DELAY = 110;
// above the link unless it sits too near the top for the card to fit
const FLIP_ABOVE = 168;

const metaFor = (a) =>
  linkPreviews[a.href] || linkPreviews[a.getAttribute('href')] || null;

export function LinkPreview() {
  const [data, setData] = useState(null);
  const showT = useRef(0);
  const hideT = useRef(0);
  const current = useRef(null); // the <a> the card is currently tracking

  useEffect(() => {
    // hover cards are a mouse affordance — a touch screen has no hover to preview
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const place = (a, meta) => {
      const rect = a.getBoundingClientRect();
      const vw = window.innerWidth;
      const center = rect.left + rect.width / 2;
      const left = Math.max(MARGIN, Math.min(center - WIDTH / 2, vw - MARGIN - WIDTH));
      const caret = Math.max(20, Math.min(center - left, WIDTH - 20));
      // the wrap is anchored by its edge and the CONN-long tether sits inside its
      // padding, so the anchor is the link edge itself — the padding adds the gap
      const above = rect.top >= FLIP_ABOVE;
      setData({
        meta,
        left,
        top: above ? rect.top : rect.bottom,
        caret,
        place: above ? 'above' : 'below',
      });
    };

    const onOver = (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const meta = metaFor(a);
      if (!meta) return;
      clearTimeout(hideT.current);
      if (current.current === a) return; // already showing for this link
      current.current = a;
      clearTimeout(showT.current);
      showT.current = setTimeout(() => place(a, meta), SHOW_DELAY);
    };

    const onOut = (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a || a !== current.current) return;
      if (a.contains(e.relatedTarget)) return; // still moving within the link
      clearTimeout(showT.current);
      current.current = null;
      hideT.current = setTimeout(() => setData(null), HIDE_DELAY);
    };

    // fixed-positioned card can't follow the page — drop it the moment it moves
    const drop = () => {
      clearTimeout(showT.current);
      current.current = null;
      setData(null);
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('scroll', drop, true);
    window.addEventListener('resize', drop);
    return () => {
      clearTimeout(showT.current);
      clearTimeout(hideT.current);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('scroll', drop, true);
      window.removeEventListener('resize', drop);
    };
  }, []);

  if (!data) return null;

  return createPortal(
    <div
      className={`${styles.wrap} ${styles[data.place]}`}
      style={{
        left: `${data.left}px`,
        top: `${data.top}px`,
        '--caret': `${data.caret}px`,
        '--conn': `${CONN}px`,
        '--accent': data.meta.accent,
      }}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <div className={styles.card}>
          <span className={styles.spark}>✦</span>
          <div className={styles.eyebrow}>{data.meta.eyebrow}</div>
          <div className={styles.title}>{data.meta.title}</div>
          <div className={styles.sub}>{data.meta.sub}</div>
        </div>
      </div>
      <span className={styles.conn} />
    </div>,
    document.body
  );
}
