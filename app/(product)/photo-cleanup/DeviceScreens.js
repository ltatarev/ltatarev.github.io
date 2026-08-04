import styles from './landing.module.css';

// The four screens inside the phone on the tour. They're a drawing of the app in
// HTML rather than a screenshot, so the type stays crisp at any zoom and the
// numbers below are the only place they need editing.
//
// The whole device is aria-hidden: it illustrates the prose beside it, and read
// aloud it would just be a stream of unanchored numbers.

const Check = ({ size = 8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m20 6-11 11-5-5" />
  </svg>
);

// `selected` marks the photos staged for deletion on the review screen.
const REVIEW_PHOTOS = [
  { tone: 'a', selected: true },
  { tone: 'd', selected: true },
  { tone: 'f', selected: false },
  { tone: 'c', selected: true },
  { tone: 'b', selected: false },
  { tone: 'e', selected: true },
  { tone: 'd', selected: true },
  { tone: 'a', selected: false },
  { tone: 'c', selected: true },
];

const FOUND = [
  { tone: 'a', count: '412', title: 'Duplicates', size: 'up to 1.8 GB' },
  { tone: 'b', count: '1,204', title: 'Similar photos', size: 'up to 3.1 GB' },
  { tone: 'd', count: '96', title: 'Blurry photos', size: 'up to 240 MB' },
  { tone: 'c', count: '738', title: 'Screenshots', size: 'up to 1.1 GB' },
];

const ALBUMS = [
  { tone: 'b', name: 'Rooftop shoot', count: '142 photos' },
  { tone: 'c', name: 'Recipes', count: '58 photos' },
  { tone: 'a', name: 'Receipts', count: '211 photos' },
  { tone: 'f', name: 'Family', count: '1,003 photos' },
];

const ph = (tone) => ({ background: `var(--ph-${tone})` });

function Dock({ active }) {
  return (
    <div className={styles.sDock}>
      {['Clean', 'Sort', 'Progress', 'Settings'].map((item) => (
        <span
          key={item}
          className={`${styles.sDockItem} ${item === active ? styles.isActive : ''}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function CleanScreen() {
  return (
    <>
      <div className={styles.sRow}>
        <div>
          <p className={styles.sEyebrow}>Photo Cleanup</p>
          <p className={styles.sTitle}>Good morning</p>
        </div>
        <span className={styles.sAvatar}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#57534C"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.35.4.65.73.85" />
          </svg>
        </span>
      </div>

      <div className={styles.sHero}>
        <p className={styles.sHeroLabel}>You could free up</p>
        <p className={styles.sHeroValue}>
          <span data-count="6.3" data-suffix=" GB">
            6.3 GB
          </span>
        </p>
        <p className={styles.sHeroNote}>12,480 photos looked at · never leaves this phone</p>
        <span className={styles.sPill}>Start cleaning</span>
      </div>

      <div className={styles.sStorage}>
        <div className={styles.sStorageLabels}>
          <span>182 GB used</span>
          <span>256 GB total</span>
        </div>
        <div className={styles.sTrack}>
          <span className={styles.sTrackFill} data-fill="71" />
        </div>
      </div>

      <p className={styles.sSection}>What we found</p>
      <div className={styles.sGrid}>
        {FOUND.map((tile) => (
          <div key={tile.title} className={styles.sTile}>
            <div className={styles.sTileTop}>
              <span className={styles.sThumb} style={ph(tile.tone)} />
              <span className={styles.sBadge}>{tile.count}</span>
            </div>
            <p className={styles.sTileTitle}>{tile.title}</p>
            <p className={styles.sTileMeta}>{tile.size}</p>
          </div>
        ))}
      </div>

      <Dock active="Clean" />
    </>
  );
}

function TriageScreen() {
  return (
    <>
      <div className={styles.sRow}>
        <p className={styles.sTitle} style={{ fontSize: '13px' }}>
          ‹ Duplicates
        </p>
        <span className={styles.sBadge}>212 of 412</span>
      </div>
      <div className={`${styles.sTrack} ${styles.sTrackThin}`} style={{ marginTop: '9px' }}>
        <span className={styles.sTrackFill} style={{ width: '51%' }} />
      </div>

      <div className={styles.sCardStack}>
        <div className={`${styles.sCard} ${styles.sCardBack}`} />
        <div className={`${styles.sCard} ${styles.sCardFront}`}>
          <span className={styles.sTag}>BEST SHOT</span>
          <div className={styles.sMetaChip}>
            <strong>IMG_4471.HEIC</strong>
            12 May 2026 · 4.1 MB · 1 of 3 near-identical
          </div>
        </div>
      </div>

      <div className={styles.sActions}>
        <span className={`${styles.sCircle} ${styles.sCircleDelete}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
        <span className={`${styles.sCircle} ${styles.sCircleUndo}`}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
          </svg>
        </span>
        <span className={`${styles.sCircle} ${styles.sCircleKeep}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7.5-4.7-9.3-9A5.2 5.2 0 0 1 12 6.6 5.2 5.2 0 0 1 21.3 12c-1.8 4.3-9.3 9-9.3 9Z" />
          </svg>
        </span>
      </div>
      <p className={styles.sCaption}>Swipe left to delete · right to keep</p>

      <Dock active="Clean" />
    </>
  );
}

function ReviewScreen() {
  return (
    <>
      <p className={styles.sTitle}>Review before deleting</p>
      <p style={{ fontSize: '8px', color: 'var(--text-2)', margin: '4px 0 0' }}>
        These move to Recently Deleted, where iOS keeps them for 30 days.
      </p>

      <div className={styles.sPhotoGrid}>
        {REVIEW_PHOTOS.map((photo, i) => (
          // A fixed nine-photo mock — nothing is added, removed or reordered, so
          // the index is a stable identity here.
          <span key={i} className={styles.sPhoto} style={ph(photo.tone)}>
            {photo.selected && (
              <span className={styles.sCheck}>
                <Check />
              </span>
            )}
          </span>
        ))}
      </div>

      <div className={styles.sSummary}>
        <div className={styles.sSummaryRow}>
          <span>Photos selected</span>
          <span>186 of 412</span>
        </div>
        <div className={styles.sSummaryRow}>
          <span>Space you’ll free</span>
          <span>0.9 GB</span>
        </div>
        <div className={styles.sSummaryRow}>
          <span>Kept automatically</span>
          <span>Best shot of each set</span>
        </div>
      </div>

      <span className={`${styles.sCta} ${styles.sCtaDanger}`}>
        Move 186 photos to Recently Deleted
      </span>
      <span className={`${styles.sCta} ${styles.sCtaQuiet}`}>Keep everything</span>
    </>
  );
}

function OrganizeScreen() {
  return (
    <>
      <p className={styles.sEyebrow}>Inbox zero, for photos</p>
      <p className={styles.sTitle}>Organize</p>

      <div className={styles.sSegment}>
        {['Inbox', 'Albums', 'Stacks'].map((item) => (
          <span
            key={item}
            className={`${styles.sSegmentItem} ${item === 'Inbox' ? styles.isActive : ''}`}
          >
            {item}
          </span>
        ))}
      </div>

      <div className={styles.sHero}>
        <div className={styles.sRow}>
          <p className={styles.sHeroLabel}>Photo inbox</p>
          <span
            className={styles.sBadge}
            style={{ background: 'rgba(255,255,255,.2)', color: '#fff' }}
          >
            82% done
          </span>
        </div>
        <p className={styles.sHeroValue} style={{ fontSize: '24px' }}>
          1,432
        </p>
        <p className={styles.sHeroNote}>unsorted photos</p>
        <div
          className={styles.sTrack}
          style={{ background: 'rgba(255,255,255,.25)', marginBottom: '10px' }}
        >
          <span className={styles.sTrackFill} style={{ background: '#fff' }} data-fill="82" />
        </div>
        <span className={styles.sPill}>Sort today’s 36 →</span>
      </div>

      <p className={styles.sSection}>Albums</p>
      <div className={styles.sAlbumGrid}>
        {ALBUMS.map((album) => (
          <div key={album.name} className={styles.sAlbum}>
            <span className={styles.sAlbumDot} style={ph(album.tone)} />
            <p className={styles.sAlbumName}>{album.name}</p>
            <p className={styles.sAlbumCount}>{album.count}</p>
          </div>
        ))}
      </div>

      <Dock active="Sort" />
    </>
  );
}

export const SCREENS = [CleanScreen, TriageScreen, ReviewScreen, OrganizeScreen];
