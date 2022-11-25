import React from 'react';
import { Experience, Header, Projects } from '../components';

export default function IndexPage() {
  return (
    <div className="ease m-auto mb-20 flex min-w-min max-w-screen-xl animate-fadeIn flex-col items-center p-10 transition-all duration-75">
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
      <title>lucija tatarević</title>
      <link href="https://ltatarev.github.io/" rel="canonical" />
    </>
  );
}
