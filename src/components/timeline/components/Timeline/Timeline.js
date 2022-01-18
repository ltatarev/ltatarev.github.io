import React from 'react';
import './style.css';
import data from '../../data';
import TimelineItem from '../TimelineItem';

function Timeline() {
  return (
    <div className="rb-container">
      <ul className="rb">
        {data.map((item) => (
          <li key={item.id} className="rb-item">
            <TimelineItem
              description={item.description}
              details={item.details}
              title={item.title}
              year={item.year}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Timeline);
