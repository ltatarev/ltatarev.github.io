import React from 'react';
import { getAccentColorByIndex } from '../common';
import { timeline } from '../data';
import { TimelineItem } from './TimelineItem';

export function Timeline() {
  return (
    <div className="py-12">
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
  );
}
