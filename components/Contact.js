'use client';

import { useReveal } from '@/lib/useReveal';

export function Contact() {
  const ref = useReveal();

  return (
    <div ref={ref} className="win95 reveal" role="dialog" aria-label="Contact">
      <div className="win95-bar">
        <span className="wt">Let&apos;s work together.exe</span>
        <span className="win95-x" aria-hidden="true">
          ×
        </span>
      </div>
      <div className="win95-body">
        <div className="win95-ico" aria-hidden="true">
          ♥
        </div>
        <div className="win95-msg">
          Got a project, a role, or just want to talk shop about <b>React&nbsp;Native</b> and clean
          UI? I&apos;d love to hear from you.
        </div>
      </div>
      <div className="win95-btns">
        <a
          className="win95-btn def"
          href="https://github.com/ltatarev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Say hi
        </a>
        <button
          className="win95-btn"
          type="button"
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
