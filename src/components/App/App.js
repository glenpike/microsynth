import React from 'react';
import ConnectedWebAudioSynth from '../../containers/ConnectedWebAudioSynth';
import ConnectedVirtualKeyboard from '../../containers/ConnectedVirtualKeyboard';
import ConnectedControls from '../../containers/ConnectedControls';
import ConnectedAppHeader from '../../containers/ConnectedAppHeader';


const App = () => (
  <div className="App">
    <ConnectedAppHeader />
    <ConnectedControls />
    <ConnectedWebAudioSynth />
    <ConnectedVirtualKeyboard />
  </div>
);

export default App;
