import { apps, iconSrc } from '@/lib/apps';
import { experience } from '@/lib/experience';
import { featured } from '@/lib/featured';
import { projects } from '@/lib/projects';
import { Clip, Tape, Arrow, GitHubMark } from './Bits';
import { Header } from './Header';
import { Reveal } from './Reveal';
import { WorkFolder } from './WorkFolder';
import s from './paper.module.css';

const GITHUB = 'https://github.com/ltatarev';

const CAPABILITIES = [
  'React Native',
  'TypeScript',
  'Node / APIs',
  'Expo',
  'Native Modules',
  'Germany-based',
];

const TOOLBOX = [
  'React Navigation',
  'Reanimated',
  'Redux Toolkit',
  'GraphQL',
  'Jest',
  'Maestro',
  'Sentry',
  'Claude Code',
];

// Years since the internship in 2018, so the stat ages on its own.
const YEARS = new Date().getFullYear() - 2018;

function Eyebrow({ children, tone = 'blush' }) {
  return <span className={`${s.eyebrow} ${s[`eyebrow_${tone}`]}`}>{children}</span>;
}

function SectionHead({ eyebrow, title, lead, tone }) {
  return (
    <Reveal className={s.sectionHead}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={s.h2}>{title}</h2>
      {lead && <p className={s.lead}>{lead}</p>}
    </Reveal>
  );
}

/* ---------- hero ---------- */

function PhoneCutout() {
  // a little home screen: greeting widget + the real app icons
  return (
    <div className={s.phone} aria-hidden="true">
      <div className={s.phoneScreen}>
        <div className={s.phoneBar}>
          <span>9:42</span>
          <span className={s.phoneIsland} />
          <span>●●●</span>
        </div>
        <div className={s.widget}>
          <small>good morning</small>
          <b>
            hey, lucija<span className={s.semi}>;</span>
          </b>
          <span className={s.widgetBar}>
            <span style={{ width: '62%' }} />
          </span>
          <small>3 of 5 builds green</small>
        </div>
        <div className={s.iconGrid}>
          {apps.map((app) => (
            <span key={app.name} className={s.iconCell}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconSrc(app)} alt="" width="56" height="56" />
              <small>{app.name.split(' ')[0]}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className={s.hero} id="top">
      <div className={s.heroCard}>
        <div className={s.heroText}>
          <Reveal>
            <h1 className={s.display}>
              hi, i&apos;m
              <br />
              lucija<span className={s.semi}>;</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className={s.heroLead}>
              Software developer based in Germany. I build <b>mobile apps</b> and experiences —
              mostly with <b>React Native</b> and a whole lot of <b>JavaScript</b>.
            </p>
          </Reveal>
          <Reveal delay={160} className={s.heroCtas}>
            <a className={`${s.btn} ${s.btnBlush}`} href="#work">
              View my work <Arrow />
            </a>
            <a className={`${s.btn} ${s.btnGhost}`} href={GITHUB} target="_blank" rel="noopener noreferrer">
              <GitHubMark /> GitHub
            </a>
          </Reveal>
        </div>

        <div className={s.heroArt}>
          <span className={s.heroBadge}>
            <i className={s.dot} /> shipping since 2018
          </span>
          <div className={s.heroPhoneWrap}>
            <Clip className={s.heroClip} />
            <PhoneCutout />
          </div>
          <figure className={`${s.polaroid} ${s.heroPolaroid}`}>
            <Tape className={s.polaroidTape} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/memoji.png" alt="Lucija's memoji" width="160" height="160" />
            <figcaption>hello :)</figcaption>
          </figure>
          <div className={`${s.cutout} ${s.heroSmiski}`} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/smiski.png" alt="" width="120" height="120" />
          </div>
          <div className={`${s.cutout} ${s.heroTama}`} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tamagochi.png" alt="" width="120" height="120" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- apps ---------- */

function AppShelf() {
  return (
    <section className={s.section} id="apps">
      <SectionHead
        eyebrow="✦ App Store"
        title="Apps I've shipped"
        lead="Small, carefully made iOS apps — some live, some almost there."
      />
      <Reveal className={s.shelf}>
        {apps.map((app, i) => {
          const card = (
            <>
              <span className={s.appIcon}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconSrc(app)} alt="" width="96" height="96" />
              </span>
              <span className={s.appName}>{app.name}</span>
              {app.badge && (
                <span className={`${s.tag} ${app.badge.live ? s.tagLive : ''}`}>
                  {app.badge.live && <i className={s.dot} />}
                  {app.badge.text.replace('!', '')}
                </span>
              )}
            </>
          );
          const style = { '--tilt': `${[-2, 1.5, -1, 2, -1.5][i % 5]}deg` };
          // product pages bring their own stylesheet, so crossing into one is a
          // plain <a> (full document load) — see lib/routes.js
          return app.href ? (
            <a key={app.name} className={s.appCard} href={app.href} style={style}>
              {card}
            </a>
          ) : (
            <span key={app.name} className={s.appCard} style={style}>
              {card}
            </span>
          );
        })}
      </Reveal>
    </section>
  );
}

/* ---------- pinned (case-study style) ---------- */

function Pinned() {
  const tones = ['butter', 'blush', 'ink'];
  return (
    <section className={s.section} id="featured">
      <SectionHead
        eyebrow="📌 Pinned"
        tone="butter"
        title="Featured projects"
        lead="The ones I'd show you first — what they are, why they exist, and what they run on."
      />
      <div className={s.pinned}>
        {featured.map((p, i) => {
          const project = projects.find((x) => x.name === p.name);
          return (
            <Reveal key={p.name} delay={i * 80} className={`${s.pin} ${s[`pin_${tones[i % 3]}`]}`}>
              <div className={s.pinPreview} style={{ '--c': project?.c, '--d': project?.d }}>
                <span className={s.pinEmoji} aria-hidden="true">
                  {project?.emo}
                </span>
                <span className={`${s.tag} ${s.pinTag}`}>{p.kind}</span>
                <span className={s.pinUrl}>{p.url || p.window}</span>
              </div>
              <h3 className={s.h3}>{p.name}</h3>
              <dl className={s.pinFacts}>
                <div>
                  <dt>The idea</dt>
                  <dd>{p.desc}</dd>
                </div>
                <div>
                  <dt>Built with</dt>
                  <dd className={s.chips}>
                    {p.tags.map((t) => (
                      <span key={t} className={s.chip}>
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className={s.pinLinks}>
                {p.links
                  .filter((l) => !l.internal)
                  .map((l) => (
                    <a
                      key={l.label}
                      className={`${s.btn} ${l.muted ? s.btnGhost : s.btnInk} ${s.btnSm}`}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label.replace(' ↗', '')} <Arrow diagonal />
                    </a>
                  ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- numbers ---------- */

function Numbers() {
  const live = apps.filter((a) => a.badge?.live).length;
  return (
    <section className={s.section} id="numbers">
      <SectionHead eyebrow="▮▮ By the numbers" title="A little proof of work" lead="Receipts, not adjectives." />
      <div className={s.stats}>
        <Reveal className={`${s.stat} ${s.stat_butter}`} style={{ '--tilt': '-1.5deg' }}>
          <b className={s.statNum}>{YEARS}+</b>
          <span className={s.statLabel}>years writing React Native</span>
          <ol className={s.timeline}>
            {[...experience].reverse().map((e) => (
              <li key={e.role + e.when}>
                <i style={{ background: e.c }} />
                <span>{e.co}</span>
                <small>{e.when}</small>
              </li>
            ))}
          </ol>
          <span className={s.statFoot}>from intern to senior · 3 companies</span>
        </Reveal>

        <Reveal delay={80} className={`${s.stat} ${s.stat_blush}`} style={{ '--tilt': '1deg' }}>
          <b className={s.statNum}>{apps.length}</b>
          <span className={s.statLabel}>apps on the shelf</span>
          <div className={s.statIcons}>
            {apps.map((a) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={a.name} src={iconSrc(a)} alt="" width="52" height="52" />
            ))}
          </div>
          <span className={s.statFoot}>
            {live} live · {apps.length - live} on the way
          </span>
        </Reveal>

        <Reveal delay={160} className={`${s.stat} ${s.stat_cream}`} style={{ '--tilt': '-0.5deg' }}>
          <b className={s.statNum}>{projects.length}</b>
          <span className={s.statLabel}>open-source projects</span>
          <div className={s.chips}>
            {[...new Set(projects.flatMap((p) => p.tags))].slice(0, 12).map((t) => (
              <span key={t} className={s.chip}>
                {t}
              </span>
            ))}
          </div>
          <span className={s.statFoot}>all on github.com/ltatarev</span>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section className={s.section} id="about">
      <Reveal className={s.aboutCard}>
        <div className={s.aboutArt}>
          <figure className={s.portrait}>
            <Tape className={s.portraitTape} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/memoji.png" alt="Lucija's memoji" width="320" height="320" />
          </figure>
          <a className={s.handle} href={GITHUB} target="_blank" rel="noopener noreferrer">
            <GitHubMark /> @ltatarev
          </a>
        </div>
        <div className={s.aboutText}>
          <Eyebrow>☺ About me</Eyebrow>
          <h2 className={s.h2}>Nice to meet you</h2>
          <p className={s.aboutLead}>
            I build apps that feel effortless — even when the work behind them isn&apos;t.
          </p>
          <p className={s.body}>
            {YEARS}+ years of React Native and full-stack JavaScript, on everything from fintech
            wallets to native modules and shared component libraries. I care about the details:
            smooth interactions, tidy code, and interfaces that make your life easier.
          </p>
          <div className={s.pills}>
            {CAPABILITIES.map((c) => (
              <span key={c} className={s.pill}>
                {c}
              </span>
            ))}
          </div>
          <div className={s.toolbox}>
            <span className={s.mono}>Toolbox</span>
            <span>{TOOLBOX.join(' · ')}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- experience ---------- */

function Experience() {
  return (
    <section className={s.section} id="experience">
      <SectionHead eyebrow="✎ Experience" tone="butter" title="Where I've worked" />
      <Reveal className={s.jobs}>
        {experience.map((e, i) => (
          <details key={e.role + e.when} className={s.job} open={i === 0}>
            <summary>
              <i className={s.jobDot} style={{ background: e.c }} />
              <span className={s.jobRole}>
                <b>{e.role}</b>
                <span>{e.co}</span>
              </span>
              <span className={s.jobWhen}>{e.when}</span>
              <span className={s.jobPlus} aria-hidden="true" />
            </summary>
            <ul>
              {e.items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </details>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  return (
    <section className={s.section} id="contact">
      <Reveal className={s.contactCard}>
        <div className={s.contactText}>
          <Eyebrow tone="paper">✉ Contact</Eyebrow>
          <h2 className={s.contactTitle}>
            Let&apos;s build
            <br />
            something<span className={s.semi}>;</span>
          </h2>
          <p className={s.body}>
            If you&apos;d like to say hi, swap ideas, or talk React Native — my door (and my
            GitHub) is open.
          </p>
          <div className={s.contactRow}>
            <span className={s.contactField}>
              <span className={s.mono}>github.com/ltatarev</span>
              <a className={`${s.btn} ${s.btnInk} ${s.btnSm}`} href={GITHUB} target="_blank" rel="noopener noreferrer">
                Say hi <Arrow diagonal />
              </a>
            </span>
          </div>
          <p className={s.contactNote}>
            <i className={s.dot} /> Based in Germany 🇩🇪 · always up for talking apps
          </p>
        </div>
        <div className={s.contactArt} aria-hidden="true">
          <div className={s.note}>
            <Clip className={s.noteClip} />
            <span className={s.mono}>P.S.</span>
            <p>Got an app idea that won&apos;t leave you alone? Those are my favourite kind.</p>
          </div>
          <div className={`${s.cutout} ${s.contactTama}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tamagochi.png" alt="" width="120" height="120" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footGrid}>
        <div>
          <span className={s.footHead}>Get in touch</span>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            <GitHubMark /> github.com/ltatarev
          </a>
        </div>
        <div>
          <span className={s.footHead}>Jump to</span>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Say hi</a>
        </div>
        <div className={s.footRight}>
          {/* plain <a>: "/" runs on a different stylesheet, see lib/routes.js */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className={`${s.footPill} ${s.footPillButter}`} href="/">
            Desktop theme <span className={s.footPillArrow}><Arrow /></span>
          </a>
          <a className={`${s.footPill} ${s.footPillBlush}`} href="#top">
            Back to top <span className={s.footPillArrow}><Arrow up /></span>
          </a>
          <small>© {new Date().getFullYear()} Lucija Tatarevic · made with ♥ & javascript</small>
        </div>
      </div>
      <div className={s.wordmark} aria-hidden="true">
        lucija tatarevic
      </div>
    </footer>
  );
}

export default function PaperPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppShelf />
        <WorkFolder projects={projects} />
        <Pinned />
        <Numbers />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
