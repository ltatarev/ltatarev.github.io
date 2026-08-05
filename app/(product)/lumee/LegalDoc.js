import Link from 'next/link';
import styles from './legal.module.css';

export const EMAIL = 'brief-fennecs8a@icloud.com';

// A field that still has to be filled in before launch. Kept visible on purpose —
// a placeholder that looks like finished copy is how a "[legal name]" ships.
export function Fill({ children }) {
  return <span className={styles.fill}>{children}</span>;
}

// The chrome shared by the privacy policy and the terms: the nav back to the app,
// the title block, the "short version" card and the footer.
//
// Unlike Photo Cleanup's equivalent this is a server component — the Lumee
// documents have no scroll-spied table of contents and no reading-progress bar, so
// nothing here needs the client. The one animation, the document fading up on
// arrival, is a CSS keyframe on the root.
//
// Props:
//   title        — document title, also the <h1>
//   lastUpdated  — the date shown under the title
//   draft        — optional pre-launch banner; omit it and the banner disappears
//   shortVersion — body of the "short version" card
//   sections     — [{ id, title, body }], body is JSX
//   numbered     — number the clauses, for a document meant to be cited from
export function LegalDoc({ title, lastUpdated, draft, shortVersion, sections, numbered }) {
  return (
    <div className={styles.legal}>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <Link className={styles.mark} href="/lumee/">
            <span className={styles.icon} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/lumee.png" alt="" draggable="false" />
            </span>
            lumee
          </Link>
          <Link className={styles.back} href="/lumee/">
            ← Back to Lumee
          </Link>
        </nav>
      </div>

      <header className={`${styles.wrap} ${styles.docHead}`}>
        <p className={styles.eyebrow}>Legal</p>
        <h1>{title}</h1>
        <p className={styles.updated}>Last updated {lastUpdated}</p>
      </header>

      <main className={`${styles.wrap} ${styles.doc} ${numbered ? styles.numbered : ''}`}>
        {draft ? <div className={styles.draft}>{draft}</div> : null}

        <div className={styles.summary}>{shortVersion}</div>

        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.title}</h2>
            {section.body}
          </section>
        ))}
      </main>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <div className={styles.footLinks}>
          <Link href="/lumee/">Home</Link>
          <Link href="/lumee/privacy-policy/">Privacy Policy</Link>
          <Link href="/lumee/terms-of-service/">Terms of Service</Link>
          {/* a plain anchor, not next/link: the desktop is the other design
              system and crossing to it needs a fresh document — lib/routes.js */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">← Back to ltatarev.github.io</a>
          <a href={`mailto:${EMAIL}`}>Support</a>
        </div>
        <p className={styles.copy}>© 2026 Lumee</p>
      </footer>
    </div>
  );
}
