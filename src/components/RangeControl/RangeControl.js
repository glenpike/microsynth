import React from 'react';
import PropTypes from 'prop-types';
import Knob from './Knob';
// import * as skins from 'react-rotary-knob-skin-pack';

// const knobstyle = {
//   width: '48px',
//   height: '48px',
// };

const RangeControl = (props) => {
  const {
    label, value = 0, onChange, min = 0, max = 128,
  } = props;
  return (
    <div className="RangeControl">
      <Knob className="RangeControl__Knob" onChange={onChange} defaultValue={value} min={min} max={max} />
      <div className="RangeControl__label">{label} {Math.round(value)}</div>
    </div>
  );
};

RangeControl.defaultProps = {
  value: 0,
  min: 0,
  max: 128,
};

RangeControl.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default RangeControl;
