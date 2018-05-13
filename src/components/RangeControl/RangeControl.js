import React from 'react';
import PropTypes from 'prop-types';

const RangeControl = (props) => {
  const {
    controlName, label, value = 0, min = 0, max = 128, onChange,
  } = props;
  return (
    <div className="RangeControl">
      <label htmlFor={controlName}>
        <span className="RangeControl__label">{label}</span>
        <span className="RangeControl__value clear">{value}</span>
        <input className="RangeControl__slider" type="range" onChange={onChange} name={controlName} id={controlName} value={value} min={min} max={max} />
      </label>
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
  controlName: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default RangeControl;
