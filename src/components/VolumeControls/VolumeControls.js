import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';

class VolumeControls extends Component {
  onValueChange(e, param) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, param, e.target.value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const { level, pan } = controlValues[controlName];

    // TODO: dry up...
    return (
      <ControlGroup label={label}>
        <RangeControl
          label="Volume"
          controlName={`level-${controlName}`}
          onChange={e => this.onValueChange(e, 'level')}
          value={level}
        />
        <RangeControl
          label="Pan"
          controlName={`pan-${controlName}`}
          onChange={e => this.onValueChange(e, 'pan')}
          value={pan}
          min={-100}
          max={100}
        />
      </ControlGroup>
    );
  }
}

VolumeControls.propTypes = {
  label: PropTypes.string.isRequired,
  controlName: PropTypes.string.isRequired,
  controlChange: PropTypes.func.isRequired,
  controlValues: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VolumeControls;
