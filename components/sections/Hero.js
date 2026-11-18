import ui from '@/styles/shared.module.css';
import { HeroClock } from '@/components/ui/HeroClock';
import styles from './Hero.module.css';
import { Scrapbook } from './Scrapbook';
import { experience } from '@/lib/experience';

const [now, before] = experience;

export function Hero() {
  return (
    <header className={styles.hero} id="home">
      <div className={styles.inner}>
        <div className={styles.hi}>
          <div className={styles.memoji}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/memoji.png" alt="" />
          </div>
          <HeroClock />
        </div>
        <h1 className={styles.headline}>
          hi, i&apos;m
          <br />
          <span className={styles.headlineIt}>
            <span className={ui.sel}>lucija</span>
          </span>
          <span className={ui.semi}>;</span>
        </h1>
        <p className={styles.lede}>
          software developer based in Germany 🇩🇪. i love building <b>mobile apps</b> and experiences
          — mostly with <b>React Native</b> and a whole lot of <b>JavaScript</b>.
        </p>
        {/* currently / previously come from lib/experience, so a job change updates the hero too */}
        <dl className={styles.status}>
          <div>
            <dt>currently</dt>
            <dd>
              {now.role} @ {now.co}
            </dd>
          </div>
          <div>
            <dt>previously</dt>
            <dd>
              {before.role} @ {before.co}
            </dd>
          </div>
        </dl>
        <a className={styles.scrollCue} href="#apps">
          <svg className={styles.arrow} width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          see what i&apos;ve shipped
        </a>
      </div>

      <Scrapbook />
    </header>
  );
}
