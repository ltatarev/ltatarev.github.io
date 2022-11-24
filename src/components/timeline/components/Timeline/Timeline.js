import React from 'react';
import './style.css';
import data from '../../data';
import { TimelineItem } from '../TimelineItem';

export function Timeline() {
  return (
    <div className="py-12">
      {data.map((item) => (
        <TimelineItem
          key={item.title + item.year}
          description={item.description}
          details={item.details}
          title={item.title}
          year={item.year}
        />
      ))}
    </div>
  );
}
