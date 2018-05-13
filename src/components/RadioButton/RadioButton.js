import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = (props) => {
  const {
    id, label, value, isChecked, onChange,
  } = props;
  const inputId = `RadioButton-${value}-${id}`;
  return (
    <div className="RadioButton">
      <label className={`RadioButton__label${isChecked ? '--checked' : ''}`} htmlFor={inputId}>
        <input className="RadioButton__radio" type="radio" id={inputId} onChange={onChange} name="RadioButton" value={value} checked={isChecked} />
        {label}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default RadioButton;
