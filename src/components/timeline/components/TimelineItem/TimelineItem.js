import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Text } from '../../../text';

export function TimelineItem({ title, year, description, details }) {
  return (
    <div className="grid gap-4 py-3 sm:grid-cols-12">
      <div className="col-span-12 sm:col-span-3">
        <div className="text-center before:mx-auto before:mb-5 before:block before:h-2 before:w-24 before:rounded-md before:dark:bg-accent-pink sm:text-left sm:before:mx-0">
          <h3 className="text-2xl font-bold">{title}</h3>
          <span className="text-xs font-bold uppercase tracking-wider dark:text-gray-500">
            {description}
          </span>
          <div>
            <time className="text-xs uppercase tracking-wide dark:text-gray-400">
              {year}
            </time>
          </div>
        </div>
      </div>
      <div className="relative col-span-12 px-4 sm:col-span-9">
        <div className="relative col-span-12 space-y-3 px-4 before:bg-neutral-300 sm:col-span-8 sm:space-y-5 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:-left-3 sm:before:w-0.5">
          {details.map((item) => (
            <div
              key={item.description}
              className="flex flex-col pb-1 before:bg-accent-pink sm:relative sm:before:absolute sm:before:top-1 sm:before:left-[-33px] sm:before:z-[1] sm:before:h-3 sm:before:w-3 sm:before:rounded-full"
            >
              <span className="inline">
                {!!item.title && (
                  <h2 className="inline font-semibold">{item.title}</h2>
                )}{' '}
                {!!item.subtitle && (
                  <p className="inline text-sm font-medium">
                    ({item.subtitle})
                  </p>
                )}
              </span>
              <Text text={item.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
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
