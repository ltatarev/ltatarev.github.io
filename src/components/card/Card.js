import React, { useMemo } from 'react';
import classNames from 'classnames';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from './Link';
import { Tag } from './Tag';

export function Card({
  backgroundColor,
  description,
  overlayColor,
  imgSrc,
  demoUrl,
  sourceUrl,
  title,
  tags,
}) {
  const cardStyle = useMemo(() => ({ backgroundColor }), [backgroundColor]);

  const overlayClass = classNames({
    'card__main-container': true,
    'card__main-container-pink': overlayColor === 'pink',
    'card__main-container-blue': overlayColor === 'blue',
    'card__main-container-peach': overlayColor === 'peach',
  });

  return (
    <div className="card__container">
      <div className={overlayClass} style={cardStyle}>
        <div className="card__image-box">
          <GatsbyImage
            alt={title}
            height={200}
            image={imgSrc}
            layout="constrained"
            objectFit="cover"
          />
        </div>
        <div className="card__content-box">
          <div className="card__tags-container">
            <h2 className="card__content-title">{title}</h2>
            {!!description && (
              <p className="card__description">{description}</p>
            )}
          </div>
          <div className="card__links-container">
            {!!demoUrl && <Link href={demoUrl} type="Demo" url={demoUrl} />}
            {!!sourceUrl && (
              <Link href={sourceUrl} type="GitHub" url={sourceUrl} />
            )}
          </div>
        </div>
        <div className="card__tags-row">
          {tags.map((tag) => (
            <Tag key={title + tag} color={overlayColor} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  demoUrl: PropTypes.string,
  description: PropTypes.string,
  overlayColor: PropTypes.oneOf(['pink', 'peach', 'blue', 'purple']),
};

Card.defaultProps = {
  backgroundColor: null,
  demoUrl: null,
  description: null,
  overlayColor: 'purple',
};

export default React.memo(Card);
