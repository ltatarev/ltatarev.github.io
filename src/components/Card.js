import React from 'react';
import classNames from 'classnames';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
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
  const overlayClass = classNames(
    'rounded-xl bg-pale-purple shadow-lg overflow-hidden relative transition-all duration-75 ease-in-out',
    'hover:shadow-xl hover:-translate-y-0.5 hover:transition-all hover:duration-75 hover:ease-in',
    'hover:after:bg-pale-purple hover:after:transition-all hover:after:duration-100 hover:after:ease',
    {
      'bg-pale-pink': overlayColor === 'pink',
      'bg-pale-blue': overlayColor === 'blue',
      'bg-pale-peach': overlayColor === 'peach',
    },
  );

  return (
    <div className="relative m-2 inline-block flex-grow hover:cursor-crosshair">
      <div className={overlayClass} style={{ backgroundColor }}>
        <GatsbyImage
          alt={title}
          className="w-100 h-52 object-cover"
          height={200}
          image={imgSrc}
          layout="constrained"
          objectFit="cover"
        />
        <div className="mx-5 my-2 flex flex-row flex-nowrap place-content-between items-start">
          <div className="card__tags-container">
            <h2 className="text-xl font-extrabold text-dark">{title}</h2>
            {!!description && <p className="text-sm">{description}</p>}
          </div>
          <div className="flex flex-shrink-0 flex-col">
            {!!demoUrl && <Link href={demoUrl} type="Demo" url={demoUrl} />}
            {!!sourceUrl && (
              <Link href={sourceUrl} type="GitHub" url={sourceUrl} />
            )}
          </div>
        </div>
        <div className="mx-5 mb-3 flex flex-row">
          {tags.map((tag) => (
            <Tag key={title + tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
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
