import { Reveal } from './Reveal';

const SEND_URL = 'https://github.com/ltatarev';

function ToolIcons() {
  return (
    <div className="mail-toolbar" aria-hidden="true">
      <span className="mail-tool">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 3L3 10.5l7.5 3 3 7.5L21 3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="mail-sep" />
      <span className="mail-tool">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 12.5l-6.5 6.5a4.2 4.2 0 01-6-6l7.5-7.5a2.8 2.8 0 014 4L9.5 17a1.4 1.4 0 01-2-2l6.5-6.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="mail-tool">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19h14M8 15l4-11 4 11M9.5 11h5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="mail-tool">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M8.8 13.5a3.6 3.6 0 006.4 0M9.5 10h.01M14.5 10h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

export function Contact() {
  return (
    <>
      <Reveal className="statement">
        <h2>
          i like building things that people <span className="it">actually enjoy</span> using
          <span className="semi">;</span>
        </h2>
        <p>
          if that sounds like your kind of project, the draft below is already written — you just
          have to hit send.
        </p>
      </Reveal>

      <Reveal className="win mail">
        <div className="titlebar">
          <div className="lights">
            <span className="light l-r" />
            <span className="light l-y" />
            <span className="light l-g" />
          </div>
          <span className="title-txt">New Message</span>
        </div>
        <ToolIcons />
        <div className="mail-row">
          <span className="lbl">To:</span>
          <span className="token">
            <span className="av">l</span>Lucija Tatarević
          </span>
        </div>
        <div className="mail-row">
          <span className="lbl">Subject:</span>
          <span className="subj">
            let&apos;s build something<span className="semi">;</span>
          </span>
          <span className="cursor" />
        </div>
        <div className="mail-body">
          Hi Lucija — I&apos;ve got <b>a project</b>, <b>a role</b>, or just{' '}
          <b>a strong opinion about React Native</b>, and I&apos;d really like your take on it.
          <div className="sig">— someone with good taste</div>
        </div>
        <div className="mail-foot">
          <a className="mail-send" href={SEND_URL} target="_blank" rel="noopener noreferrer">
            Send
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 3L3 10.5l7.5 3 3 7.5L21 3z"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <span className="mail-note">usually replies within a day ☕</span>
        </div>
      </Reveal>
    </>
  );
}
