import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.css';

export function Card({
  backgroundColor,
  overlayColor,
  imgSrc,
  url,
  title,
  description,
}) {
  const cardStyle = useMemo(() => ({ backgroundColor }), [backgroundColor]);

  const overlayClass = classNames({
    'card__main-container': true,
    'card__main-container-pink': overlayColor === 'pink',
    'card__main-container-blue': overlayColor === 'blue',
    'card__main-container-peach': overlayColor === 'peach',
  });

  return (
    <a href={url} rel="noreferrer" target="_blank">
      <div className="card__container">
        <div className={overlayClass} style={cardStyle}>
          <div className="card__image-box">
            <img alt="movie" border="0" src={imgSrc} />
          </div>
          <div className="card__content-box">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

Card.propTypes = {
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  overlayColor: PropTypes.oneOf(['pink', 'peach', 'blue']),
};

Card.defaultProps = {
  backgroundColor: null,
  overlayColor: null,
};

export default React.memo(Card);
