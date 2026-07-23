import styles from './FolderIcon.module.css';

export function FolderIcon({ c, d, emo }) {
  return (
    <span className={styles.folder}>
      <svg viewBox="0 0 74 60">
        <path
          d="M4 12h20l6 7h36a6 6 0 016 6v27a6 6 0 01-6 6H10a6 6 0 01-6-6V18a6 6 0 016-6z"
          fill={d}
        />
        <path
          className={styles.front}
          d="M2 26a6 6 0 016-6h58a6 6 0 016 6v22a6 6 0 01-6 6H8a6 6 0 01-6-6z"
          fill={c}
        />
      </svg>
      <span className={styles.emoji}>{emo}</span>
    </span>
  );
}
