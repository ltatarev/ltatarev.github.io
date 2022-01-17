import React from 'react';
import './style.css';
import { Card } from '../card';
import { Title } from '../section-title';

export function Projects() {
  return (
    <div>
      <Title color="#6099C2" title="projects" />
      <div className="projects__grid-container">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default React.memo(Projects);
