'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './Dock.module.css';

const ITEMS = [
  {
    href: '/#home',
    tip: 'Home',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10.5L12 3l9 7.5"
          stroke="#1c1a17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 9.5V20h14V9.5"
          stroke="#1c1a17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: '/#featured',
    tip: 'Work',
    svg: (
      <svg width="24" height="24" viewBox="0 0 74 60">
        <path
          d="M4 12h20l6 7h36a6 6 0 016 6v27a6 6 0 01-6 6H10a6 6 0 01-6-6V18a6 6 0 016-6z"
          fill="#7fb2ef"
        />
        <path d="M2 26a6 6 0 016-6h58a6 6 0 016 6v22a6 6 0 01-6 6H8a6 6 0 01-6-6z" fill="#a7cef5" />
      </svg>
    ),
  },
  {
    href: '/#about',
    tip: 'About',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#1c1a17" strokeWidth="2" />
        <path
          d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
          stroke="#1c1a17"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: '/#experience',
    tip: 'Experience',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="#1c1a17" strokeWidth="2" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="#1c1a17" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/#contact',
    tip: 'Contact',
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#1c1a17" strokeWidth="2" />
        <path
          d="M4 7l8 6 8-6"
          stroke="#1c1a17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function Dock() {
  const dockRef = useRef(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduced || !window.matchMedia('(hover:hover)').matches) return undefined;

    const btns = Array.from(dock.querySelectorAll(`.${styles.btn}`));

    function onMove(e) {
      btns.forEach((btn) => {
        const r = btn.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const dist = Math.abs(e.clientX - center);
        const s = Math.max(1, 1.42 - dist / 150);
        btn.style.transform = `scale(${s}) translateY(${-(s - 1) * 12}px)`;
      });
    }

    function onLeave() {
      btns.forEach((btn) => {
        btn.style.transform = '';
      });
    }

    dock.addEventListener('mousemove', onMove);
    dock.addEventListener('mouseleave', onLeave);

    return () => {
      dock.removeEventListener('mousemove', onMove);
      dock.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <nav ref={dockRef} className={styles.dock} aria-label="Primary">
      {ITEMS.map((item) => (
        <Link key={item.href} className={styles.btn} href={item.href}>
          <span className={styles.tip}>{item.tip}</span>
          {item.svg}
        </Link>
      ))}
    </nav>
  );
}
