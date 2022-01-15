import React from 'react';
import './style.css';
import { Text } from '../text';
import data from './data';

function Timeline() {
  return (
    <div className="rb-container">
      <ul className="rb">
        {data.map((item) => (
          <li key={item.id} className="rb-item">
            <div className="timestamp">{item.year}</div>
            {!!item.title && <Text className="item-title" text={item.title} />}
            {!!item.description && (
              <Text className="item-description" text={item.description} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Timeline);
