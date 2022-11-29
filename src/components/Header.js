import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

export function Header() {
  return (
    <div className="m-auto mt-10 flex flex-col transition-all duration-100 ease-in-out lg:mt-52 lg:flex-row">
      <StaticImage
        itemType
        alt="Header"
        height={200}
        itemScope="image"
        layout="constrained"
        objectFit="contain"
        placeholder="blurred"
        quality={100}
        src="../images/memoji.png"
      />
      <div
        itemScope
        className="ml-3 mt-auto items-start md:ml-10"
        itemType="headline"
      >
        <h2 className="my-1 text-7xl font-bold">
          hi, i&apos;m{' '}
          <p
            itemScope
            className="inline font-bold text-accent-pink"
            itemType="author"
          >
            lucija
          </p>
          ;
        </h2>
        <span className="leading-loose">
          I&apos;m a software developer based in Croatia. Interested in&nbsp;
          <p className="inline text-lg font-bold text-accent-purple">
            full stack development
          </p>
          ,
          <br />
          <p className="inline text-lg font-bold text-accent-peach">
            cross platform mobile development
          </p>
          , and everything&nbsp;
          <p className="inline text-lg font-bold text-accent-blue">
            JavaScript
          </p>
          .
        </span>
      </div>
    </div>
  );
}
