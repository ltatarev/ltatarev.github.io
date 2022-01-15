import React from 'react';
import './style.css';
import { Title } from '../section-title';
import { Timeline } from '../timeline';

function Experience() {
  return (
    <div className="experience__container">
      <Title color="#AE7DB8" title="experience" />
      <Timeline />
    </div>
  );
}

export default React.memo(Experience);
