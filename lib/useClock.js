'use client';

import { useSyncExternalStore } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Rendered on the server and during hydration, so the markup matches on both sides.
// The real time lands as soon as the store subscribes.
const INITIAL = { time: '9:41', dayShort: 'Tue', dateLong: 'Wednesday, July 22' };

function compute() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();

  return {
    time: `${h % 12 || 12}:${m < 10 ? '0' : ''}${m}`,
    dayShort: DAYS[d.getDay()],
    dateLong: `${DAYS_FULL[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`,
  };
}

// One shared ticker for every clock on the page, so the menu bar, hero and phone
// never disagree and we only ever run a single interval.
let snapshot = INITIAL;
let timer = null;
const listeners = new Set();

function tick() {
  const next = compute();
  if (next.time === snapshot.time && next.dateLong === snapshot.dateLong) return;

  snapshot = next;
  listeners.forEach(notify => notify());
}

function subscribe(notify) {
  listeners.add(notify);

  if (timer === null) {
    tick();
    timer = setInterval(tick, 1000);
  }

  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => INITIAL;

export function useClock() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
