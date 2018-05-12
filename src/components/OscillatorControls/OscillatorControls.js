import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';

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

const WaveButton = (props) => {
  const { id, type: { label, value }, isChecked, onChange } = props; // eslint-disable-line react/prop-types
  const inputId = `WaveButton-${id}`;
  return (
    <div>
      <label htmlFor={inputId}>
        <input type="radio" id={inputId} onChange={onChange} name="wavebutton" value={value} checked={isChecked} />
        {label}
      </label>
    </div>
  );
};

let id = 1;

class OscillatorControls extends Component {
  onShapeChange(e) {
    const { controlChange } = this.props;
    // Put these changes as a different type?
    controlChange('shape', e.target.value);
  }

  render() {
    id += 1;
    const buttons = waveTypes.map((type, idx) => <WaveButton key={idx} onChange={this.onShapeChange.bind(this)} type={type} id={id} />);
    return (
      <ControlGroup label="Oscillator 1" controls={buttons} />
    );
  }
}

// OscillatorControls.propTypes = {
//     // noteOn: PropTypes.func.isRequired,
//     // noteOff: PropTypes.func.isRequired,
//     // notesOn: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default OscillatorControls;
