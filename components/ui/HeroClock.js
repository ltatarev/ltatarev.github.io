'use client';

import { useClock } from '@/lib/useClock';
import styles from './HeroClock.module.css';

export function HeroClock() {
  const { time, dateLong } = useClock();

  return (
    <div className={styles.today}>
      <div className={styles.date}>{dateLong}</div>
      <div className={styles.time}>{time}</div>
    </div>
  );
}

export function PhoneClock() {
  const { time } = useClock();

  return <span>{time}</span>;
}
