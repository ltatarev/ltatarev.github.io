import { Contact } from '@/components/sections/Contact';
import { ControlCenter } from '@/components/sections/ControlCenter';
import { Featured } from '@/components/sections/Featured';
import { Finder } from '@/components/sections/Finder';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Reminders } from '@/components/sections/Reminders';
import { Reveal } from '@/components/ui/Reveal';
import ui from '@/styles/shared.module.css';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className={styles.pinned} id="featured">
        <Reveal>
          <div className={ui.eyebrow}>/ pinned</div>
          <h2 className={ui.hSec}>
            featured <span className={ui.it}>projects</span>
            <span className={ui.semi}>;</span>
          </h2>
        </Reveal>
        <Reveal>
          <Featured />
        </Reveal>
      </section>

      <section className={styles.work} id="work">
        <Reveal className={styles.workHead}>
          <div className={ui.eyebrow}>/ projects</div>
          <h2 className={ui.hSec}>
            all <span className={ui.it}>projects</span>
            <span className={ui.semi}>;</span>
          </h2>
        </Reveal>
        <Reveal>
          <Finder />
        </Reveal>
      </section>

      <section className={styles.about} id="about">
        <Reveal>
          <div className={ui.eyebrow}>/ control center</div>
          <h2 className={ui.hSec}>
            a bit <span className={ui.it}>about me</span>
            <span className={ui.semi}>;</span>
          </h2>
        </Reveal>
        <Reveal>
          <ControlCenter />
        </Reveal>
      </section>

      <section className={styles.exp} id="experience">
        <Reveal>
          <div className={ui.eyebrow}>/ reminders</div>
          <h2 className={ui.hSec}>
            where i&apos;ve <span className={ui.it}>worked</span>
            <span className={ui.semi}>;</span>
          </h2>
        </Reveal>
        <Reveal>
          <Reminders />
        </Reveal>
      </section>

      <Marquee />

      <section className={styles.contact} id="contact">
        <Contact />
      </section>
    </>
  );
}
