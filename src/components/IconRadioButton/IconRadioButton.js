import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icons/Icons';

// https://codepen.io/AngelaVelasquez/pen/BWXbxP/
const IconRadioButton = (props) => {
  const {
    id, label, value, isChecked, onChange, defaultClass, icon,
  } = props;
  const inputId = `${defaultClass}-${value}-${id}`;
  return (
    <div className={defaultClass}>
      <input className={`${defaultClass}__radio`} type="radio" id={inputId} onChange={onChange} name="IconRadioButton" value={value} checked={isChecked} />
      <label className={`${defaultClass}__label${isChecked ? '--checked' : ''} ${defaultClass}__${value}`} htmlFor={inputId}>
        <Icon icon={icon} title={label}/>
      </label>
    </div>
  );
};

IconRadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  defaultClass: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

IconRadioButton.defaultProps = {
  defaultClass: 'IconRadioButton',
}

export default IconRadioButton;
