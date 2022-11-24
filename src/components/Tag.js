import React from 'react';
import PropTypes from 'prop-types';
import { generateRandomBackgroundColor } from '../common';

export function Tag({ title }) {
  return (
    <p
      className="mr-2 inline rounded-2xl bg-pink-400 py-2 px-4 text-xs font-semibold lowercase text-dark"
      style={generateRandomBackgroundColor()}
    >
      {title}
    </p>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
};
