import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';

export function Tag({ title, color }) {
  const overlayClass = classNames({
    tag__container: true,
    'tag__container-pink': color === 'pink',
    'tag__container-blue': color === 'blue',
    'tag__container-peach': color === 'peach',
  });

  return <p className={overlayClass}>{title}</p>;
}

Tag.propTypes = {
  color: PropTypes.oneOf(['pink', 'peach', 'blue', 'purple']).isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(Tag);
