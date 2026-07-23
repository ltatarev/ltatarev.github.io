'use client';

import { useState } from 'react';
import { experience } from '@/lib/experience';
import styles from './Reminders.module.css';
import { TitleBar, Window } from '@/components/ui/Window';

function ReminderItem({ entry, open, onToggle }) {
  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`.trim()}>
      <button className={styles.row} type="button" aria-expanded={open} onClick={onToggle}>
        <span
          className={`${styles.check} ${styles.done}`}
          style={{ background: entry.c, color: entry.c }}
        >
          ✓
        </span>
        <span className={styles.meta}>
          <span className={styles.role}>{entry.role}</span>
          <span className={styles.co}>{entry.co}</span>
        </span>
        <span className={styles.when}>{entry.when}</span>
        <svg className={styles.chev} viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* grid 0fr -> 1fr animates to the real content height, so the easing curve
          maps onto what's actually visible instead of a padded max-height */}
      <div className={styles.body} aria-hidden={!open}>
        <div className={styles.bodyInner}>
          <ul>
            {entry.items.map((item, i) => (
              <li key={item} className={styles.sub} style={{ '--i': i }}>
                <span className={styles.subDot} />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Reminders() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Window className={styles.rem}>
      <TitleBar title="Experience" />
      <div className={styles.list}>
        {experience.map((entry, i) => (
          <ReminderItem
            key={entry.role + entry.when}
            entry={entry}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </Window>
  );
}
