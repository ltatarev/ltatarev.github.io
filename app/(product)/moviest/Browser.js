import styles from './landing.module.css';

// A desktop browser window, the counterpart to Device.js. Same idea — the chrome is
// CSS and only the page inside it is a bitmap — but it exists for a different reason
// than the phone does: every other visual on the landing page is a portrait iPhone,
// so a landscape window is the one image whose shape says "this also runs somewhere
// that isn't your phone" before the copy next to it gets a chance to.
//
// The traffic lights are deliberately not red/amber/green. Coloured ones read as a
// screenshot of macOS rather than as part of this page, and the dots plus the URL
// pill are already unmistakably a browser without borrowing someone else's palette.
export function Browser({ src, alt, url }) {
  return (
    <div className={styles.browser}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {/* Decorative: the real address is on the link below the frame, and a screen
            reader announcing a URL it can't follow is just noise. */}
        <span className={styles.urlbar} aria-hidden="true">
          {url}
        </span>
      </div>
      <div className={styles.viewport}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.shot} src={src} alt={alt} draggable="false" />
      </div>
    </div>
  );
}
