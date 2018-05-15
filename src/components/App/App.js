import React from 'react';
import ConnectedWebAudioSynth from '../../containers/ConnectedWebAudioSynth';
import ConnectedVirtualKeyboard from '../../containers/ConnectedVirtualKeyboard';
import ConnectedControls from '../../containers/ConnectedControls';
import ConnectedMidiInput from '../../containers/ConnectedMidiInput';

const App = () => (
  <div className="App">
    <header className="App-header clear">
      <h1 className="App-title">microsynth</h1>
      <div className="App-rhs">
        <ConnectedMidiInput/>
      </div>
    </header>
    <ConnectedControls />
    <ConnectedWebAudioSynth />
    <ConnectedVirtualKeyboard />
  </div>
);

export default App;
