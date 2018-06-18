import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RotaryKnob from '../RotaryKnob/RotaryKnob';

class EnvelopeControls extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    controlName: PropTypes.string.isRequired,
    controlChange: PropTypes.func.isRequired,
    controlValues: ImmutablePropTypes.map.isRequired,
  };

  onValueChange(value, param) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, param, value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const {
      attack, decay, sustain, release,
    } = controlValues.get(controlName).toJS();

    // TODO: dry up...
    return (
      <ControlGroup label={label}>
        <div className="column">
          <RotaryKnob
            label="Attack"
            controlName={`attack-${controlName}`}
            onChange={e => this.onValueChange(e, 'attack')}
            value={attack}
          />
        </div>
        <div className="column pad-left">
          <RotaryKnob
            label="Decay"
            controlName={`decay-${controlName}`}
            onChange={e => this.onValueChange(e, 'decay')}
            value={decay}
          />
        </div>
        <div className="column pad-left">
          <RotaryKnob
            label="Sustain"
            controlName={`sustain-${controlName}`}
            onChange={e => this.onValueChange(e, 'sustain')}
            value={sustain}
          />
        </div>
        <div className="column pad-left">
          <RotaryKnob
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

export default EnvelopeControls;
