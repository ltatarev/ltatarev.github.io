import React from 'react';
import { getAccentColorByIndex } from '../common';
import { timeline } from '../data';
import { TimelineItem } from './TimelineItem';
import { Title } from './Title';

export function Experience() {
  return (
    <div itemScope className="mt-48 md:mt-64" itemType="articleBody">
      <Title color="purple" title="experience" />
      <div className="max-w-5xl py-12">
        {timeline.map((item, index) => (
          <TimelineItem
            key={item.title + item.year}
            accentColor={getAccentColorByIndex(index)}
            description={item.description}
            details={item.details}
            title={item.title}
            year={item.year}
          />
        ))}
      </div>
    </div>
  );
}
