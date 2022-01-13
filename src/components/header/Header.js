import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import './style.css';

export function Header() {
  return (
    <div className="header__header-container">
      <StaticImage
        alt="Header"
        height={200}
        layout="constrained"
        objectFit="contain"
        placeholder="blurred"
        quality={100}
        src="./memoji.png"
      />
      <div className="header__text-container">
        <h2 className="header__title">
          hi, i&apos;m <p className="header__inline-color">lucija</p>;
        </h2>
        <p className="header__text">
          I&apos;m a software developer based in Croatia.
          Interested in&nbsp;
          <p className="header__text-inline-color">full stack development</p>,
          <br />
          <p className="header__text-inline-color">
            cross platform mobile development
          </p>,
          and everything&nbsp;
          <p className="header__text-inline-color">JavaScript</p>.
        </p>
      </div>
    </div>
  );
}

export default React.memo(Header);
