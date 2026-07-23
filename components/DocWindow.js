import Link from 'next/link';

export function DocWindow({ title, eyebrow, children }) {
  return (
    <section className="doc wrap">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="h-sec">
        {title}
        <span className="semi">;</span>
      </h2>
      <div className="win">
        <div className="titlebar">
          <div className="lights">
            <span className="light l-r" />
            <span className="light l-y" />
            <span className="light l-g" />
          </div>
          <span className="title-txt">{title}</span>
        </div>
        <div className="doc-body">{children}</div>
      </div>
      <Link className="doc-back" href="/">
        ← back home
      </Link>
    </section>
  );
}
