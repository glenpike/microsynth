import React from 'react';
import PropTypes from 'prop-types';

const ControlGroup = props => (
  <div className="ControlGroup clear">
    {props.children}
  </div>
);

ControlGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ControlGroup;
