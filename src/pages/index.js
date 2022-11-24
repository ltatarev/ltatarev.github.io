import React from 'react';
import '../styles/index.css';
import { Experience, Header, Projects } from '../components';

export default function IndexPage() {
  return (
    <div className="main-container">
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
