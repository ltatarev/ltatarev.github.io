import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export function Title({ color, title }) {
  const style = useMemo(
    () => ({
      color,
    }),
    [color],
  );

  const resolvedTitle = useMemo(() => `(${title})`, [title]);

  return (
    <p className="section-title__title" style={style}>
      {resolvedTitle}
    </p>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Title.defaultProps = {
  color: '#CA718D',
};

export default React.memo(Title);
