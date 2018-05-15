import React from 'react';
import PropTypes from 'prop-types';
import { Knob } from 'react-rotary-knob';
import * as skins from 'react-rotary-knob-skin-pack';

const knobstyle = {
  width: '48px',
  height: '48px',
};

const RangeControl = (props) => {
  const {
    label, value = 0, min = 0, max = 128, onChange,
  } = props;
  return (
    <div className="RangeControl">
      <Knob style={knobstyle} className="RangeControl__knob" skin={skins.s11} defaultValue={value} min={min} max={max} onChange={onChange} unlockDistance="25" />
      <div className="RangeControl__label">{label}</div>
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
