import React from 'react';
import PropTypes from 'prop-types';

const ControlGroup = props => (
  <div className={`ControlGroup clear ${props.extraClasses}`}>
    {props.children}
  </div>
);

ControlGroup.defaultProps = {
  extraClasses: '',
};

ControlGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  extraClasses: PropTypes.string,
};

export default ControlGroup;
