import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Text } from '../../../text';

export function TimelineItem({ title, year, description, details }) {
  return (
    <>
      <p className="flex h-8 items-center text-sm font-bold" />
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between space-x-4 text-gray-400">
          <div className="text-smb border-1 my-1 inline-flex items-center space-x-2 rounded-full border border-accent-purple px-3 py-1 hover:bg-violet-200">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-violet-400"
            />
            <span className="font-bold text-dark">{title}</span>
          </div>
          <span className="whitespace-nowrap text-xs">{year}</span>
        </div>
        <div>
          <span className="my-6 font-bold text-dark">{description}</span>
          {!!details && (
            <Text className="item-detailed-description" text={details} />
          )}
        </div>
      </div>
    </>
  );
}

TimelineItem.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

TimelineItem.defaultProps = {
  description: '',
  details: '',
};

export default React.memo(TimelineItem);
