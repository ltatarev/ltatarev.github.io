import Link from 'next/link';
import ui from '@/styles/shared.module.css';
import styles from './DocWindow.module.css';
import { TitleBar, Window } from './Window';

export function DocWindow({ title, eyebrow, children }) {
  return (
    <section className={styles.doc}>
      <div className={ui.eyebrow}>{eyebrow}</div>
      <h2 className={ui.hSec}>
        {title}
        <span className={ui.semi}>;</span>
      </h2>
      <Window className={styles.win}>
        <TitleBar title={title} />
        <div className={styles.body}>{children}</div>
      </Window>
      <Link className={styles.back} href="/">
        ← back home
      </Link>
    </section>
  );
}

// A stacked list of links inside a DocWindow body.
export function DocLinks({ children }) {
  return <div className={styles.links}>{children}</div>;
}
