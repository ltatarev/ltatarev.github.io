import React from 'react';
import './style.css';
import data from '../../data';
import TimelineItem from '../TimelineItem';

export function Timeline() {
  return (
    <ul className="space-y-12 py-8">
      {data.map((item) => (
        <li key={item.id + item.title} className="flex space-x-3">
          <TimelineItem
            description={item.description}
            details={item.details}
            title={item.title}
            year={item.year}
          />
        </li>
      ))}
    </ul>
  );
}
