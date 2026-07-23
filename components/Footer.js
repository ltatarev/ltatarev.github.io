import Link from 'next/link';
import { featured } from '@/lib/featured';
import { projects } from '@/lib/projects';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-in">
        <span className="fl">
          <span className="flogo" aria-hidden="true">
            l
          </span>{' '}
          lucija tatarević © {new Date().getFullYear()}
        </span>
        <span className="fmid">
          {`${projects.length} items · ${featured.length} pinned · 0 bugs (allegedly)`}
        </span>
        <span className="fr">
          <span>made with ♥ & javascript</span>
          <Link className="to-top" href="/#home">
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
