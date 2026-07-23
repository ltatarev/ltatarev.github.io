import Link from 'next/link';
import { featured, posters, subtitles } from '@/lib/featured';
import styles from './Featured.module.css';
import { TitleBar, Window } from '@/components/ui/Window';

function BrowserMock({ url, children }) {
  return (
    <div className={styles.bmock}>
      <div className={styles.bmockBar}>
        <span className={styles.bmockDots}>
          <i style={{ background: 'var(--tl-red)' }} />
          <i style={{ background: 'var(--tl-yellow)' }} />
          <i style={{ background: 'var(--tl-green)' }} />
        </span>
        <span className={styles.bmockUrl}>{url}</span>
      </div>
      <div className={styles.bmockBody}>{children}</div>
    </div>
  );
}

function Preview({ item }) {
  if (item.preview === 'moviest') {
    return (
      <BrowserMock url={item.url}>
        <div className={styles.mockHeading} />
        <div className={styles.posters}>
          {posters.map((bg) => (
            <span key={bg} className={styles.poster} style={{ background: bg }} />
          ))}
        </div>
      </BrowserMock>
    );
  }

  if (item.preview === 'translatia') {
    return (
      <BrowserMock url={item.url}>
        <div className={styles.mockHeading} style={{ width: '34%' }} />
        <div className={styles.subs}>
          {subtitles.map((s) => (
            <div key={s.at} className={`${styles.subRow} ${s.active ? styles.active : ''}`.trim()}>
              <span className={styles.stamp}>{s.at}</span>
              <span className={styles.text} style={s.w ? { width: s.w } : undefined} />
            </div>
          ))}
        </div>
      </BrowserMock>
    );
  }

  return (
    <div className={styles.term}>
      <div>
        <span className={styles.prompt}>➜</span> <span className={styles.dim}>~</span> npx
        react-native init <span className={styles.arg}>MyApp</span>
      </div>
      <div>
        <span className={styles.dim}>{'  --template'}</span> ltatarev/react-native-template
      </div>
      <div>
        <span className={styles.ok}>✓</span> redux + navigation wired
      </div>
      <div>
        <span className={styles.ok}>✓</span> eslint & prettier configured
      </div>
      <div>
        <span className={styles.prompt}>➜</span> ready in 42s
        <span className={styles.caret} />
      </div>
    </div>
  );
}

export function Featured() {
  return (
    <div className={styles.grid}>
      {featured.map((item) => (
        <Window key={item.name} as="article" className={styles.pin}>
          <TitleBar title={item.window} compact />
          <div className={styles.preview} aria-hidden="true">
            <Preview item={item} />
          </div>
          <div className={styles.body}>
            <div className={styles.top}>
              <h3>{item.name}</h3>
              <span className={styles.kind}>{item.kind}</span>
            </div>
            <p>{item.desc}</p>
            <div className={styles.tags}>
              {item.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className={styles.links}>
              {item.links.map((l) =>
                l.internal ? (
                  <Link key={l.label} className={l.muted ? styles.muted : undefined} href={l.href}>
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    className={l.muted ? styles.muted : undefined}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                ),
              )}
            </div>
          </div>
        </Window>
      ))}
    </div>
  );
}
