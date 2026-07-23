'use client';

import Link from 'next/link';
import { useClock } from '@/lib/useClock';
import styles from './MenuBar.module.css';

export function MenuBar() {
  const { time, dayShort } = useClock();

  return (
    <div className={styles.menubar}>
      <span className={styles.logo}>l</span>
      <span className={styles.name}>lucija tatarevic</span>
      <Link className={styles.item} href="/#featured">
        Work
      </Link>
      <Link className={styles.item} href="/#about">
        About
      </Link>
      <Link className={styles.item} href="/#experience">
        Experience
      </Link>
      <Link className={styles.item} href="/#contact">
        Contact
      </Link>
      <div className={styles.right}>
        <span className={styles.ico} aria-hidden="true">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <path d="M8.5 10.4a1.3 1.3 0 100-2.6 1.3 1.3 0 000 2.6z" fill="#6c665b" />
            <path
              d="M4 6.6a6.4 6.4 0 019 0"
              stroke="#6c665b"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M1.4 4a9.6 9.6 0 0114.2 0"
              stroke="#6c665b"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="1" y="1.5" width="20" height="9" rx="2.5" stroke="#6c665b" strokeWidth="1.2" />
            <rect x="3" y="3.5" width="14" height="5" rx="1" fill="#6c665b" />
            <rect x="22.2" y="4" width="1.6" height="4" rx=".8" fill="#6c665b" />
          </svg>
        </span>
        <span className={styles.clock}>{`${dayShort} ${time}`}</span>
      </div>
    </div>
  );
}
