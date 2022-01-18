import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Text } from '../../../text';

export function TimelineItem({
  title, year, description, details,
}) {
  return (
    <div>
      <div className="timestamp">{year}</div>
      <div className="timeline__content-container ">
        <div className="timeline__main-container">
          <Text className="item-title" text={title} />
          {!!description && (
            <Text className="item-description" text={description} />
          )}
        </div>
        <div className="timeline__details-container">
          {!!details && (
            <Text className="item-detailed-description" text={details} />
          )}
        </div>
      </div>
    </div>
  );
}

TimelineItem.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string,
  details: PropTypes.string,
};

TimelineItem.defaultProps = {
  description: '',
  details: '',
};

export default React.memo(TimelineItem);
