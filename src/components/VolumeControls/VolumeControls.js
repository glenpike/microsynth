import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RangeControl from '../RangeControl/RangeControl';

class VolumeControls extends Component {
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
    const { level, pan } = controlValues.get(controlName).toJS();

    // TODO: dry up...
    return (
      <ControlGroup label={label}>
        <div className="column">
          <RangeControl
            label="Volume"
            controlName={`level-${controlName}`}
            onChange={e => this.onValueChange(e, 'level')}
            value={level}
          />
        </div>
        <div className="column pad-left">
          <RangeControl
            label="Pan"
            controlName={`pan-${controlName}`}
            onChange={e => this.onValueChange(e, 'pan')}
            value={pan}
            min={-100}
            max={100}
          />
        </div>
      </ControlGroup>
    );
  }
}

export default VolumeControls;
