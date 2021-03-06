import React from 'react';
import PropTypes from 'prop-types';

function Text({ className, text }) {
  if (Array.isArray(text)) {
    return text.map((child) => (
      <div key={child} className={className}>
        {child}
      </div>
    ));
  }

  return <div className={className}>{text} </div>;
}

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: null,
};

export default React.memo(Text);
