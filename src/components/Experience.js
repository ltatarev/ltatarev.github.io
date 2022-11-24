import React from 'react';
import { Timeline } from './Timeline';
import { Title } from './Title';

export function Experience() {
  return (
    <div className="mt-48 md:mt-64">
      <Title color="purple" title="experience" />
      <Timeline />
    </div>
  );
}
