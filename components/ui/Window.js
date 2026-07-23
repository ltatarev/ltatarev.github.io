import styles from './Window.module.css';

// The mac window chrome, shared by every panel on the site. `styles.win` is
// exported too, for the one caller that needs to put the class on an element it
// doesn't render itself (Contact hangs it off <Reveal>).
export { styles as windowStyles };

export function Window({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`${styles.win} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

// `compact` shrinks the bar for card-sized windows; passing `onClose` turns the
// red light into a real close button.
export function TitleBar({ title, compact = false, onClose }) {
  return (
    <div className={`${styles.titlebar} ${compact ? styles.compact : ''}`.trim()}>
      <div className={styles.lights}>
        {onClose ? (
          <button
            className={`${styles.light} ${styles.red} ${styles.close}`}
            type="button"
            title="Close"
            aria-label="Close"
            onClick={onClose}
          />
        ) : (
          <span className={`${styles.light} ${styles.red}`} />
        )}
        <span className={`${styles.light} ${styles.yellow}`} />
        <span className={`${styles.light} ${styles.green}`} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
