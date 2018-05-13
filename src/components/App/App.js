import React from 'react';
import ConnectedWebAudioSynth from '../../containers/ConnectedWebAudioSynth';
import ConnectedVirtualKeyboard from '../../containers/ConnectedVirtualKeyboard';
import ConnectedControls from '../../containers/ConnectedControls';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">microsynth</h1>
    </header>
    <ConnectedControls />
    <ConnectedWebAudioSynth />
    <ConnectedVirtualKeyboard />
  </div>
);

export default App;
