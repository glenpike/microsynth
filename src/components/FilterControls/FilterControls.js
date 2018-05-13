import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';

class FilterControls extends Component {
  onCutoffChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'cutoff', e.target.value);
  }
  onResonanceChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'resonance', e.target.value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const { cutoff, resonance } = controlValues[controlName];
    const controls = [];

    controls.push();

    controls.push();

    return (
      <ControlGroup label={label}>
        <RangeControl
          label="Cutoff"
          controlName={`cutoff-${controlName}`}
          onChange={e => this.onCutoffChange(e)}
          value={cutoff}
          max="10000"
        />
        <RangeControl
          label="Resonance"
          controlName={`resonance-${controlName}`}
          onChange={e => this.onResonanceChange(e)}
          value={resonance}
          min="9"
          max="50"
        />
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
