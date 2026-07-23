'use client';

import { useReveal } from '@/lib/useReveal';

export function Reveal({ children, className = '' }) {
  const ref = useReveal();

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
