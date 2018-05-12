import React from 'react';
import PropTypes from 'prop-types';

const ControlGroup = props => (
  <div className="ControlGroup clear">
    {props.controls}
  </div>
);

ControlGroup.propTypes = {
  controls: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ControlGroup;
