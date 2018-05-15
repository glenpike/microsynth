import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';

class FilterControls extends Component {
  onValueChange(value, param) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, param, value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const { cutoff, resonance } = controlValues[controlName];
    const controls = [];

    controls.push();

    controls.push();

    return (
      <ControlGroup label={label}>
        <div className="column">
          <RangeControl
            label="Cutoff"
            controlName={`cutoff-${controlName}`}
            onChange={e => this.onValueChange(e, 'cutoff')}
            value={cutoff}
            max="10000"
          />
        </div>
        <div className="column pad-left">
          <RangeControl
            label="Rez"
            controlName={`resonance-${controlName}`}
            onChange={e => this.onValueChange(e, 'resonance')}
            value={resonance}
            min="9"
            max="50"
          />
        </div>
      </ControlGroup>
    );
  }
}

FilterControls.propTypes = {
  label: PropTypes.string.isRequired,
  controlName: PropTypes.string.isRequired,
  controlChange: PropTypes.func.isRequired,
  controlValues: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FilterControls;
