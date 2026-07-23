import ui from '@/styles/shared.module.css';
import styles from './Contact.module.css';
import { Reveal } from '@/components/ui/Reveal';
import { TitleBar, windowStyles } from '@/components/ui/Window';

const SEND_URL = 'https://github.com/ltatarev';

function ToolIcons() {
  return (
    <div className={styles.toolbar} aria-hidden="true">
      <span className={styles.tool}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 3L3 10.5l7.5 3 3 7.5L21 3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.sep} />
      <span className={styles.tool}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 12.5l-6.5 6.5a4.2 4.2 0 01-6-6l7.5-7.5a2.8 2.8 0 014 4L9.5 17a1.4 1.4 0 01-2-2l6.5-6.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.tool}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19h14M8 15l4-11 4 11M9.5 11h5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.tool}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M8.8 13.5a3.6 3.6 0 006.4 0M9.5 10h.01M14.5 10h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

export function Contact() {
  return (
    <>
      <Reveal className={styles.statement}>
        <h2>
          i like building things that people{' '}
          <span className={styles.statementIt}>actually enjoy</span> using
          <span className={ui.semi}>;</span>
        </h2>
      </Reveal>

      {/* the window chrome hangs off <Reveal>, since that's the element the
          intersection observer needs a ref to */}
      <Reveal className={`${windowStyles.win} ${styles.mail}`}>
        <TitleBar title="New Message" />
        <ToolIcons />
        <div className={styles.row}>
          <span className={styles.label}>To:</span>
          <span className={styles.token}>
            <span className={styles.avatar}>l</span>Lucija tatarevic
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Subject:</span>
          <span className={styles.subject}>
            let&apos;s build something<span className={ui.semi}>;</span>
          </span>
          <span className={styles.caret} />
        </div>
        <div className={styles.body}>
          if you&apos;d like to say hi, swap ideas, or talk React Native!
          <div className={styles.sig}>— someone with good taste</div>
        </div>
        <div className={styles.foot}>
          <a className={styles.send} href={SEND_URL} target="_blank" rel="noopener noreferrer">
            Send
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 3L3 10.5l7.5 3 3 7.5L21 3z"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <span className={styles.note}>☕</span>
        </div>
      </Reveal>
    </>
  );
}
