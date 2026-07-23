'use client';

import { useClock } from '@/lib/useClock';

export function HeroClock() {
  const { time, dateLong } = useClock();

  return (
    <div className="today">
      <div className="d">{dateLong}</div>
      <div className="t">{time}</div>
    </div>
  );
}

export function PhoneClock() {
  const { time } = useClock();

  return <span>{time}</span>;
}
