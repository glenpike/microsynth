import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';

// TODO: this might need to be somewhere else?
const waveTypes = [
  {
    label: 'Sawtooth',
    value: 'sawtooth',
  },
  {
    label: 'Square',
    value: 'square',
  },
  {
    label: 'Triangle',
    value: 'triangle',
  },
  {
    label: 'Sine',
    value: 'sine',
  },
];

const WaveButton = (props) => {
  const {
    id, type: { label, value }, isChecked, onChange,
  } = props;
  const inputId = `WaveButton-${value}-${id}`;
  return (
    <div className="WaveButton">
      <label className={`WaveButton__label${isChecked ? '--checked' : ''}`} htmlFor={inputId}>
        <input className="WaveButton__radio" type="radio" id={inputId} onChange={onChange} name="wavebutton" value={value} checked={isChecked} />
        {label}
      </label>
    </div>
  );
};

WaveButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

class OscillatorControls extends Component {
  componentWillMount() {
  }
  onShapeChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'shape', e.target.value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const activeType = controlValues[controlName].shape;
    const buttons = waveTypes.map(type => (
      <WaveButton
        key={`${type.value}-${controlName}`}
        onChange={e => this.onShapeChange(e)}
        type={type}
        isChecked={type.value === activeType}
        id={controlName}
      />));
    return (
      <ControlGroup label={label} controls={buttons} />
    );
  }
}

OscillatorControls.propTypes = {
  label: PropTypes.string.isRequired,
  controlName: PropTypes.string.isRequired,
  controlChange: PropTypes.func.isRequired,
  controlValues: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OscillatorControls;
