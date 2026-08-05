import styles from './landing.module.css';

// A phone. The frame, its glow and the corner radius are CSS; only what sits inside
// the bezel is a bitmap — a real capture from the app, in public/moviest/.
//
// `big` and `glow` pick the frame treatment: the hero one is larger and lit.
//
// The reveal lives on a wrapper around this rather than on the element itself,
// because the scroll pass writes `transform` straight onto this node for the hero's
// drift. Both on one element and the inline transform simply wins, so the phone
// would fade in without ever moving; on two they compose. See Landing.js.
export function Device({ src, alt, big, glow, className, driftRef }) {
  return (
    <div
      ref={driftRef}
      className={`${styles.device} ${big ? styles.big : ''} ${glow ? styles.glow : ''} ${className || ''}`}
    >
      <div className={styles.frame}>
        <div className={styles.holder}>
          {/* next/image would want a layout pass per phone to do nothing useful: the
              export is unoptimized, the sizes are fixed by the frame, and the four
              files are already sized and encoded for the largest slot they fill. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.shot} src={src} alt={alt} draggable="false" />
        </div>
      </div>
    </div>
  );
}
