import { HeroClock } from './HeroClock';
import { Scrapbook } from './Scrapbook';

export function Hero() {
  return (
    <header className="hero wrap" id="home">
      <div className="hero-inner">
        <div className="hi">
          <div className="memoji">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/memoji.png" alt="Lucija's memoji" />
          </div>
          <HeroClock />
        </div>
        <h1 className="headline">
          hi, i&apos;m
          <br />
          <span className="it">
            <span className="sel">lucija</span>
          </span>
          <span className="semi">;</span>
        </h1>
        <p className="lede">
          software developer based in Croatia 🇭🇷. i build things for the <b>web</b> and your{' '}
          <b>pocket</b> — full-stack, cross-platform mobile, and everything <b>JavaScript</b>.
        </p>
        <a className="hero-scroll" href="#work">
          <svg className="arw" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          open the finder below
        </a>
      </div>

      <Scrapbook />
    </header>
  );
}
