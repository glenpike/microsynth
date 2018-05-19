import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
  static propTypes = {
    label: PropTypes.string.isRequired,
    controlName: PropTypes.string.isRequired,
    controlChange: PropTypes.func.isRequired,
    controlValues: ImmutablePropTypes.map.isRequired,
  };

  componentWillMount() {
  }
  // TODO: combine these into a handler that returns a
  // function which can be called in the event handler?
  onShapeChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'shape', e.target.value);
  }
  onDetuneChange(value) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'detune', value / 100);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const { shape, detune } = controlValues.get(controlName).toJS();
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
        <div className="column">
          <RangeControl
            label="Detune"
            controlName={`detune-${controlName}`}
            onChange={e => this.onDetuneChange(e)}
            value={Math.round(detune * 100)}
            min="-100"
            max="100"
          />
        </div>
        <div className="column pad-left">
          {buttons}
        </div>
      </ControlGroup>
    );
  }
}

export default OscillatorControls;
