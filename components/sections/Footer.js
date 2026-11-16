import Link from 'next/link';
import { featured } from '@/lib/featured';
import { projects } from '@/lib/projects';
import styles from './Footer.module.css';

// The site is a static export, so this date is the build date: each deploy refreshes it.
const UPDATED = new Date()
  .toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Berlin',
  })
  .toLowerCase();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.left}>
          <span className={styles.logo} aria-hidden="true">
            l
          </span>{' '}
          lucija tatarevic © {new Date().getFullYear()}
        </span>
        <span className={styles.mid}>
          {`${projects.length} items · ${featured.length} pinned · last updated ${UPDATED}`}
        </span>
        <span className={styles.right}>
          <span>made with ♥ & javascript · 0 bugs (allegedly)</span>
          {/* plain <a>: /paper/ runs on its own stylesheet, see lib/routes.js */}
          <a className={styles.toTop} href="/paper/">
            ◐ paper theme
          </a>
          <Link className={styles.toTop} href="/#home">
            back to top
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20V5M6 11l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </span>
      </div>
    </footer>
  );
}
