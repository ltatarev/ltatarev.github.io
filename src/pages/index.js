import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/index.css';
import { Experience, Header, Projects } from '../components';

export default function IndexPage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>lucija tatarević</title>
        <link href="https://ltatarev.github.io/" rel="canonical" />
      </Helmet>
      <div className="main-container">
        <Header />
        <Experience />
        <Projects />
      </div>
    </>
  );
}
