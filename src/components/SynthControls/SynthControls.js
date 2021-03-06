import React from 'react';
import OscillatorControls from '../OscillatorControls/OscillatorControls';
import FilterControls from '../FilterControls/FilterControls';
import EnvelopeControls from '../EnvelopeControls/EnvelopeControls';
import ModulationControls from '../ModulatorControls/ModulatorControls';
import VolumeControls from '../VolumeControls/VolumeControls';
import ControlGroup from '../ControlGroup/ControlGroup';

const SynthControls = props => (
  <ControlGroup extraClasses="ControlGroup--alt ControlGroup--gradient">
    <OscillatorControls label="Oscillator 1" controlName="oscillator-1" {...props} />
    <ModulationControls label="Oscillator Mix" controlName="modulation" {...props} />
    <OscillatorControls label="Oscillator 2" controlName="oscillator-2" {...props} />
    <FilterControls label="Filter" controlName="filter" {...props} />
    <EnvelopeControls label="Envelop" controlName="envelope" {...props} />
    <VolumeControls label="Volume" controlName="volume" {...props} />
  </ControlGroup>
);


export default SynthControls;
