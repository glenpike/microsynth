import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';

class EnvelopeControls extends Component {
  onValueChange(value, param) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, param, value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const {
      attack, decay, sustain, release,
    } = controlValues[controlName];

    // TODO: dry up...
    return (
      <ControlGroup label={label}>
        <div className="column">
          <RangeControl
            label="Attack"
            controlName={`attack-${controlName}`}
            onChange={e => this.onValueChange(e, 'attack')}
            value={attack}
          />
        </div>
        <div className="column pad-left">
          <RangeControl
            label="Decay"
            controlName={`decay-${controlName}`}
            onChange={e => this.onValueChange(e, 'decay')}
            value={decay}
          />
        </div>
        <div className="column pad-left">
          <RangeControl
            label="Sustain"
            controlName={`sustain-${controlName}`}
            onChange={e => this.onValueChange(e, 'sustain')}
            value={sustain}
          />
        </div>
        <div className="column pad-left">
          <RangeControl
            label="Release"
            controlName={`release-${controlName}`}
            onChange={e => this.onValueChange(e, 'release')}
            value={release}
          />
        </div>
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
