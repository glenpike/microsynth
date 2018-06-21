import { combineReducers } from 'redux';
import appReducer from './appReducer';
import synthControls from './synthControls';
import midiControls from './midiControls';
import keyboardControls from './keyboardControls';

export default combineReducers({
  appReducer,
  synthControls,
  midiControls,
  keyboardControls,
});
