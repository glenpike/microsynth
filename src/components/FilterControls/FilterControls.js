import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';
import RotaryKnob from '../RotaryKnob/RotaryKnob';

class FilterControls extends Component {
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
    const { cutoff, resonance } = controlValues.get(controlName).toJS();
    return (
      <ControlGroup label={label}>
        <div className="column">
          <RangeControl
            label="Cutoff"
            controlName={`cutoff-${controlName}`}
            onChange={e => this.onValueChange(e, 'cutoff')}
            value={cutoff}
            max={10000}
          />
        </div>
        <div className="column pad-left">
          <RangeControl
            label="Rez"
            controlName={`resonance-${controlName}`}
            onChange={e => this.onValueChange(e, 'resonance')}
            value={resonance}
            min={0}
            max={20}
          />
        </div>
        <div className="column pad-left">
          <RotaryKnob
            label="Rez"
            controlName={`resonance-${controlName}`}
            onChange={e => this.onValueChange(e, 'cutoff')}
            value={cutoff}
            max={10000}
          />
        </div>
        <div className="column pad-left">
          <RotaryKnob
            label="Rez"
            controlName={`resonance-${controlName}`}
            onChange={e => this.onValueChange(e, 'cutoff')}
            value={resonance}
            min={0}
            max={20}
          />
        </div>
      </ControlGroup>
    );
  }
}

export default FilterControls;
