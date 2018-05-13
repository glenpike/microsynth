import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';

class EnvelopeControls extends Component {
  onValueChange(e, param) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, param, e.target.value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const {
      attack, decay, sustain, release,
    } = controlValues[controlName];

    // TODO: dry up...
    return (
      <ControlGroup label={label}>
        <RangeControl
          label="Attack"
          controlName={`attack-${controlName}`}
          onChange={e => this.onValueChange(e, 'attack')}
          value={attack}
        />
        <RangeControl
          label="Decay"
          controlName={`decay-${controlName}`}
          onChange={e => this.onValueChange(e, 'decay')}
          value={decay}
        />
        <RangeControl
          label="Sustain"
          controlName={`sustain-${controlName}`}
          onChange={e => this.onValueChange(e, 'sustain')}
          value={sustain}
        />
        <RangeControl
          label="Release"
          controlName={`release-${controlName}`}
          onChange={e => this.onValueChange(e, 'release')}
          value={release}
        />
      </ControlGroup>
    );
  }
}

EnvelopeControls.propTypes = {
  label: PropTypes.string.isRequired,
  controlName: PropTypes.string.isRequired,
  controlChange: PropTypes.func.isRequired,
  controlValues: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EnvelopeControls;
