import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RadioButton from '../RadioButton/RadioButton';

class ModulationControls extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    controlName: PropTypes.string.isRequired,
    controlChange: PropTypes.func.isRequired,
    controlValues: ImmutablePropTypes.map.isRequired,
  };

  componentWillMount() {
  }
  onTypeChange(e) {
    const { controlChange, controlName } = this.props;
    controlChange(controlName, 'type', e.target.value);
  }
  render() {
    const { controlValues, label, controlName } = this.props;
    const type = controlValues.getIn([controlName, 'type']);
    return (
      <ControlGroup label={label}>
        <RadioButton
          key={`$ring-${controlName}`}
          onChange={e => this.onTypeChange(e)}
          label="Multiply"
          value="ring"
          isChecked={type === 'ring'}
          id={controlName}
        />
        <RadioButton
          key={`$add-${controlName}`}
          onChange={e => this.onTypeChange(e)}
          label="Add"
          value="add"
          isChecked={type === 'add'}
          id={controlName}
        />
      </ControlGroup>
    );
  }
}

export default ModulationControls;
