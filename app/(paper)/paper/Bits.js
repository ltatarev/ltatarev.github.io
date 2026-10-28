// Small decorative pieces shared across the paper theme: a paper clip, a strip
// of washi tape, arrows and the GitHub mark. All inline SVG, colour from tokens.

export function Clip({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 110" width="40" height="110" aria-hidden="true">
      <path
        d="M27 18v62a11 11 0 01-22 0V14a8 8 0 0116 0v60a4 4 0 01-8 0V22"
        fill="none"
        stroke="var(--clip)"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M27 18v62a11 11 0 01-22 0V14a8 8 0 0116 0v60a4 4 0 01-8 0V22"
        fill="none"
        stroke="var(--clip-hi)"
        strokeWidth="1.3"
        strokeLinecap="round"
        transform="translate(-.8 -.8)"
      />
    </svg>
  );
}

export function Tape({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 34" width="120" height="34" aria-hidden="true">
      <path
        d="M3 4l4 3-3 4 4 3-3 4 4 3-3 4 4 3-3 4h108l-3-4 4-3-3-4 4-3-3-4 4-3-3-4 4-3-3-4H3z"
        fill="var(--tape)"
      />
    </svg>
  );
}

export function Arrow({ diagonal, up }) {
  const rot = up ? -90 : diagonal ? -45 : 0;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GitHubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 00.5 12a11.5 11.5 0 007.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0023.5 12 11.5 11.5 0 0012 .5z" />
    </svg>
  );
}
