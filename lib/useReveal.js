'use client';

import { useEffect, useRef } from 'react';

// Adds `activeClass` once the element scrolls into view. Returns a ref to attach
// to whichever element should carry the reveal styles — using the real element
// rather than a wrapper div matters wherever the parent is a flex/grid container.
// The class is passed in because it's a CSS-module name, not a literal.
export function useReveal(activeClass) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    io.observe(el);

    return () => io.disconnect();
  }, [activeClass]);

  return ref;
}
