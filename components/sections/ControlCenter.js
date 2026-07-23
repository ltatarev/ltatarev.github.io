import ui from '@/styles/shared.module.css';
import styles from './ControlCenter.module.css';

const SKILLS = [
  { name: 'JavaScript', level: 100 },
  { name: 'React Native', level: 95 },
  { name: 'React / Next', level: 92 },
  { name: 'Node / APIs', level: 80 },
];

const TOOLBOX = [
  'React Native',
  'TypeScript',
  'Redux',
  'Claude Code',
  'Swift',
  'NextJS',
  'Vite',
  'Stripe',
  'MongoDB',
  'GraphGL',
];

export function ControlCenter() {
  return (
    <div className={styles.cc}>
      <div className={`${styles.tile} ${styles.lg}`}>
        <div className={styles.head}>the short version</div>
        <h3>
          i build apps that feel <span className={ui.it}>effortless</span> — even when the work
          behind them isn&apos;t.
        </h3>
        <p>
          <b>8+ years of React Native</b> and <b>full-stack JavaScript</b>, on everything from
          fintech wallets to native code, and shared component libraries. i care about the details —
          smooth interactions, tidy code, and interfaces that make your life easier.
        </p>
      </div>

      <div className={`${styles.tile} ${styles.h2}`}>
        <div className={styles.head}>Top skills</div>
        <div className={styles.skills}>
          {SKILLS.map((s) => (
            <div key={s.name} className={styles.skill}>
              <span>{s.name}</span>
              <span className={styles.track}>
                <span className={styles.fill} style={{ width: `${s.level}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.tile} ${styles.h2}`}>
        <div className={styles.head}>Toolbox</div>
        <div className={styles.chips}>
          {TOOLBOX.map((t) => (
            <span key={t} className={ui.chip}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={`${styles.tile} ${styles.w2} ${styles.locTile}`}>
        <div className={styles.head}>Location</div>
        <div className={styles.locBig}>
          <span>🇩🇪</span> Germany
        </div>
      </div>

      <a
        className={`${styles.tile} ${styles.w2} ${styles.ghTile}`}
        href="https://github.com/ltatarev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.ghMark} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 .5A11.5 11.5 0 00.5 12a11.5 11.5 0 007.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0023.5 12 11.5 11.5 0 0012 .5z" />
          </svg>
        </span>
        <span>
          <small>find my code</small>
          <b>github.com/ltatarev</b>
        </span>
      </a>
    </div>
  );
}
