'use client';

import { useReveal } from '@/lib/useReveal';
import styles from './Reveal.module.css';

export function Reveal({ children, className = '' }) {
  const ref = useReveal(styles.in);

  return (
    <div ref={ref} className={`${styles.reveal} ${className}`.trim()}>
      {children}
    </div>
  );
}
