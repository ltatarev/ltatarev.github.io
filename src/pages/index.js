import React from 'react';
import '../styles/index.css';
import { Experience, Header } from '../components';

export default function IndexPage() {
  return (
    <div className="main-container">
      <Header />
      <Experience />
    </div>
  );
}
