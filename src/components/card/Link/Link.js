import React, { useMemo } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.css';

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
      src="./assets/github.png"
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
      src="./assets/arrow.png"
    />
  );
}

export function Link({ url, type }) {
  const ImgComponent = useMemo(
    () => (type === TYPES.LINK ? <LinkImage /> : <GitHubImage />),
    [type],
  );

  return (
    <a className="link__container" href={url} rel="noreferrer" target="_blank">
      <p className="link__title">{type}</p>
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

export default React.memo(Link);
