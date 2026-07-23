'use client';

import { useState } from 'react';
import { experience } from '@/lib/experience';

function ReminderItem({ entry, open, onToggle }) {
  return (
    <div className={`rem-item${open ? ' open' : ''}`}>
      <button
        className="rem-row"
        type="button"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="rem-check done" style={{ background: entry.c, color: entry.c }}>
          ✓
        </span>
        <span className="rem-meta">
          <span className="role">{entry.role}</span>
          <span className="co">{entry.co}</span>
        </span>
        <span className="rem-when">{entry.when}</span>
        <svg className="rem-chev" viewBox="0 0 24 24" fill="none">
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
      <div className="rem-body" aria-hidden={!open}>
        <div className="rem-body-inner">
          <ul>
            {entry.items.map((item, i) => (
              <li key={item} className="rem-sub" style={{ '--i': i }}>
                <span className="c" />
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
    <div className="win rem">
      <div className="titlebar">
        <div className="lights">
          <span className="light l-r" />
          <span className="light l-y" />
          <span className="light l-g" />
        </div>
        <span className="title-txt">Experience — Reminders</span>
      </div>
      <div className="rem-list">
        {experience.map((entry, i) => (
          <ReminderItem
            key={entry.role + entry.when}
            entry={entry}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </div>
  );
}
