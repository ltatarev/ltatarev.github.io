import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { ACCENT_COLORS } from '../common';

export function Title({ color, title }) {
  const classNames = cn(
    'mt-2 w-max border-b-4 border-transparent text-4xl font-bold hover:border-b-4 hover:cursor-crosshair hover:transition hover:duration-100 ease',
    { 'text-accent-purple hover:border-accent-purple': color === 'purple' },
    { 'text-accent-blue hover:border-accent-blue ': color === 'blue' },
  );

  return <p className={classNames}>{`(${title})`}</p>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.oneOf(ACCENT_COLORS),
};

Title.defaultProps = {
  color: ACCENT_COLORS[0],
};
