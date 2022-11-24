import React from 'react';
import cn from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';

const keyExtractor = (elem) => (_.isObject(elem) ? elem.props.children : elem);

function Text({ className, text }) {
  const classes = cn('', className);

  if (Array.isArray(text)) {
    return text.map((child) => (
      <div key={keyExtractor(child)} className={classes}>
        {child}
      </div>
    ));
  }

  return <div className={classes}>{text} </div>;
}

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: null,
};

export default React.memo(Text);
