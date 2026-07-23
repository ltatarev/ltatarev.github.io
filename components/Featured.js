import Link from 'next/link';
import { featured, posters, subtitles } from '@/lib/featured';

function BrowserMock({ url, children }) {
  return (
    <div className="bmock">
      <div className="bmock-bar">
        <span className="bmock-dots">
          <i style={{ background: 'var(--tl-red)' }} />
          <i style={{ background: 'var(--tl-yellow)' }} />
          <i style={{ background: 'var(--tl-green)' }} />
        </span>
        <span className="bmock-url">{url}</span>
      </div>
      <div className="bmock-body">{children}</div>
    </div>
  );
}

function Preview({ item }) {
  if (item.preview === 'moviest') {
    return (
      <BrowserMock url={item.url}>
        <div className="mk-h" />
        <div className="posters">
          {posters.map((bg) => (
            <span key={bg} className="poster" style={{ background: bg }} />
          ))}
        </div>
      </BrowserMock>
    );
  }

  if (item.preview === 'translatia') {
    return (
      <BrowserMock url={item.url}>
        <div className="mk-h" style={{ width: '34%' }} />
        <div className="subs">
          {subtitles.map((s) => (
            <div key={s.at} className={`sub-row${s.active ? ' active' : ''}`}>
              <span className="tc">{s.at}</span>
              <span className="tx" style={s.w ? { width: s.w } : undefined} />
            </div>
          ))}
        </div>
      </BrowserMock>
    );
  }

  return (
    <div className="term">
      <div>
        <span className="p">➜</span> <span className="dim">~</span> npx react-native init{' '}
        <span className="f">MyApp</span>
      </div>
      <div>
        <span className="dim">{'  --template'}</span> ltatarev/react-native-template
      </div>
      <div>
        <span className="ok">✓</span> redux + navigation wired
      </div>
      <div>
        <span className="ok">✓</span> eslint & prettier configured
      </div>
      <div>
        <span className="p">➜</span> ready in 42s
        <span className="cur" />
      </div>
    </div>
  );
}

export function Featured() {
  return (
    <div className="pin-grid">
      {featured.map((item) => (
        <article key={item.name} className="win pin">
          <div className="titlebar">
            <div className="lights">
              <span className="light l-r" />
              <span className="light l-y" />
              <span className="light l-g" />
            </div>
            <span className="title-txt">{item.window}</span>
          </div>
          <div className="pin-preview" aria-hidden="true">
            <Preview item={item} />
          </div>
          <div className="pin-body">
            <div className="pin-top">
              <h3>{item.name}</h3>
              <span className="pin-kind">{item.kind}</span>
            </div>
            <p>{item.desc}</p>
            <div className="pin-tags">
              {item.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="pin-links">
              {item.links.map((l) =>
                l.internal ? (
                  <Link key={l.label} className={l.muted ? 'muted' : undefined} href={l.href}>
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    className={l.muted ? 'muted' : undefined}
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
        </article>
      ))}
    </div>
  );
}
