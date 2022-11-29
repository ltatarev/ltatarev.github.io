import React from 'react';
import { Experience, Header, Projects } from '../components';

export default function IndexPage() {
  return (
    <div className="ease m-auto mb-20 flex min-w-min max-w-screen-xl flex-col items-center p-10 transition-all duration-75">
      <Header />
      <Experience />
      <Projects />
    </div>
  );
}

export function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta content="index,follow" name="robots" />
      <meta content="lucija, tatarević" name="keywords" />
      <meta content="learn more about me :)" name="description" />
      <meta
        content="personal landing page built with gatsbyjs"
        name="subject"
      />
      <meta content="lucija tatarević" name="og:title" />
      <meta content="website" name="og:type" />
      <meta content="https://ltatarev.github.io/" name="og:url" />
      <meta
        content="https://user-images.githubusercontent.com/38048916/200418641-5b4c86bb-d495-4367-8515-1bbe758b73d4.png"
        name="og:image"
      />

      <meta
        content="personal landing page built with gatsbyjs"
        name="og:description"
      />
      <title>lucija tatarević</title>
      <link href="https://ltatarev.github.io/" rel="canonical" />
    </>
  );
}
