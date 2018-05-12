import React from 'react';
import OscillatorControls from '../OscillatorControls/OscillatorControls';

const SynthControls = props => (
  <div className="clear">
    <OscillatorControls label="Oscillator 1" controlName="oscillator-1" {...props} />
    <OscillatorControls label="Oscillator 2" controlName="oscillator-2" {...props} />
  </div>
);


export default SynthControls;
