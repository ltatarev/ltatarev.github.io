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
