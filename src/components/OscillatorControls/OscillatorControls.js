import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';
import RadioButton from '../RadioButton/RadioButton';

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

class OscillatorControls extends Component {
  componentWillMount() {
  }
  // TODO: combine these into a handler that returns a
  // function which can be called in the event handler?
  onShapeChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'shape', e.target.value);
  }
  onDetuneChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'detune', e.target.value / 100);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const { shape, detune } = controlValues[controlName];
    const buttons = waveTypes.map(({ label: buttonLabel, value }) => (
      <RadioButton
        key={`${value}-${controlName}`}
        onChange={e => this.onShapeChange(e)}
        label={buttonLabel}
        value={value}
        isChecked={value === shape}
        id={controlName}
      />));

    return (
      <ControlGroup label={label}>
        {buttons}
        <RangeControl
          label="Detune"
          controlName={`detune-${controlName}`}
          onChange={e => this.onDetuneChange(e)}
          value={detune * 100}
          min="-100"
          max="100"
        />
      </ControlGroup>
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
