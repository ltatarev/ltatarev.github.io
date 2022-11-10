import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { generateRandomBackgroundColor } from './colorsUtil';

export function Tag({ title }) {
  const style = useMemo(() => generateRandomBackgroundColor(), []);

  return (
    <p className="tag__container" style={style}>
      {title}
    </p>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(Tag);
