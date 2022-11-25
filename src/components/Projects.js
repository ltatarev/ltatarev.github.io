import React from 'react';
import { projects } from '../data';
import { Card } from './Card';
import { Title } from './Title';

export function Projects() {
  return (
    <div className="my-10">
      <Title color="blue" title="projects" />
      <div className="mt-5 grid max-w-5xl grid-cols-1 place-content-between gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            demoUrl={project.demoUrl}
            description={project.description}
            imgSrc={project.image}
            overlayColor={project.color}
            sourceUrl={project.sourceUrl}
            tags={project.tags}
            title={project.title}
          />
        ))}
      </div>
    </div>
  );
}
