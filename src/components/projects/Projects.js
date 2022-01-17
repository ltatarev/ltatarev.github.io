import React from 'react';
import { Card } from '../card';
import { Title } from '../section-title';

export function Projects() {
  return (
    <div>
      <Title color="#6099C2" title="projects" />
      <div>
        <Card />
      </div>
    </div>
  );
}

Projects.propTypes = {};

Projects.defaultProps = {};

export default React.memo(Projects);
