'use client';

import { useEffect, useRef, useState } from 'react';
import s from './paper.module.css';

// Fades + lifts its children in the first time they scroll into view.
// Content is visible without JS (the hidden state is only applied once mounted),
// and reduced-motion users get no movement — see .reveal in paper.module.css.
export function Reveal({ children, className = '', delay = 0, style, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [state, setState] = useState('idle'); // idle → armed → shown

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setState('shown');
      return undefined;
    }
    setState('armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${s.reveal} ${state === 'armed' ? s.revealArmed : ''} ${className}`}
      style={{ ...style, '--delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
