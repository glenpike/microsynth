import { combineReducers } from 'redux';
import synthControls from './synthControls';
import midiControls from './midiControls';

export default combineReducers({
  synthControls,
  midiControls,
});
