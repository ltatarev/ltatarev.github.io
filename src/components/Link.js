import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import PropTypes from 'prop-types';

const TYPES = { LINK: 'Demo', GITHUB: 'GitHub' };

function GitHubImage() {
  return (
    <StaticImage
      alt="GitHub"
      height={14}
      layout="constrained"
      objectFit="contain"
      placeholder="blurred"
      quality={100}
      src="../images/icons/github.png"
    />
  );
}

function LinkImage() {
  return (
    <StaticImage
      alt="Demo"
      height={12}
      layout="constrained"
      objectFit="contain"
      placeholder="blurred"
      quality={100}
      src="../images/icons/arrow.png"
    />
  );
}

export function Link({ url, type }) {
  const ImgComponent = type === TYPES.LINK ? <LinkImage /> : <GitHubImage />;

  return (
    <a
      className="flex h-8 items-center border-0 text-end hover:border-0"
      href={url}
      rel="noreferrer"
      target="_blank"
    >
      <p className="mx-2">{type}</p>
      {ImgComponent}
    </a>
  );
}

Link.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(_.values(TYPES)),
};

Link.defaultProps = {
  type: TYPES.LINK,
};
