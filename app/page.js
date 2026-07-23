import { Contact } from '@/components/Contact';
import { ControlCenter } from '@/components/ControlCenter';
import { Featured } from '@/components/Featured';
import { Finder } from '@/components/Finder';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Reminders } from '@/components/Reminders';
import { Reveal } from '@/components/Reveal';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="pinned wrap" id="featured">
        <Reveal>
          <div className="eyebrow">/ pinned</div>
          <h2 className="h-sec">
            start <span className="it">here</span>
            <span className="semi">;</span>
          </h2>
        </Reveal>
        <Reveal>
          <Featured />
        </Reveal>
      </section>

      <section className="work wrap" id="work">
        <Reveal className="work-head">
          <div className="eyebrow">/ projects</div>
          <h2 className="h-sec">
            all <span className="it">projects</span>
            <span className="semi">;</span>
          </h2>
        </Reveal>
        <Reveal>
          <Finder />
        </Reveal>
      </section>

      <section className="about wrap" id="about">
        <Reveal>
          <div className="eyebrow">/ control center</div>
          <h2 className="h-sec">
            a bit <span className="it">about me</span>
            <span className="semi">;</span>
          </h2>
        </Reveal>
        <Reveal>
          <ControlCenter />
        </Reveal>
      </section>

      <section className="exp wrap" id="experience">
        <Reveal>
          <div className="eyebrow">/ reminders</div>
          <h2 className="h-sec">
            where i&apos;ve <span className="it">worked</span>
            <span className="semi">;</span>
          </h2>
        </Reveal>
        <Reveal>
          <Reminders />
        </Reveal>
      </section>

      <Marquee />

      <section className="contact wrap" id="contact">
        <Contact />
      </section>
    </>
  );
}
