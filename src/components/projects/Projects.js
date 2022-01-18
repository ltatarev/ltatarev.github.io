import React from 'react';
import './style.css';
import { Card } from '../card';
import { Title } from '../section-title';
import projects from './data';

export function Projects() {
  return (
    <div>
      <Title color="#6099C2" title="projects" />
      <div className="projects__grid-container">
        {projects.map((project) => (
          <Card
            key={project.id}
            description={project.description}
            imgSrc={project.image}
            overlayColor={project.color}
            title={project.title}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(Projects);
