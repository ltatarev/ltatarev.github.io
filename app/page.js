import { Contact } from '@/components/Contact';
import { ControlCenter } from '@/components/ControlCenter';
import { Finder } from '@/components/Finder';
import { Hero } from '@/components/Hero';
import { Reminders } from '@/components/Reminders';
import { Reveal } from '@/components/Reveal';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="work wrap" id="work">
        <Reveal className="work-head">
          <div className="eyebrow">/ projects</div>
          <h2 className="h-sec">
            selected <span className="it">work</span>
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

      <section className="contact wrap" id="contact">
        <Contact />
      </section>
    </>
  );
}
