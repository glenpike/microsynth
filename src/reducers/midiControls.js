import Immutable from 'immutable';
import {
  MIDI_CONTROL_MESSAGE,
  MIDI_INPUT_DEVICES_UPDATE,
  MIDI_INPUT_DEVICE_SELECT,
} from '../actions';

export const initialState = Immutable.fromJS({
  inputs: [],
  selectedInput: null,
});

const midiControls = (state = initialState, action) => {
  switch (action.type) {
    case MIDI_INPUT_DEVICES_UPDATE: {
      const { inputs } = action;
      const midiInputs = [];
      /* eslint-disable no-restricted-syntax */
      for (const { id, name } of inputs) {
        midiInputs.push({ id, name });
      }
      /* eslint-enable no-restricted-syntax */
      return state.set('inputs', new Immutable.List(midiInputs));
    }
    case MIDI_CONTROL_MESSAGE: {
      console.log('MIDI_CONTROL_MESSAGE ', action);
      return state;
    }
    case MIDI_INPUT_DEVICE_SELECT: {
      const { id } = action;
      return state.set('selectedInput', id);
    }
    default:
      return state;
  }
};

export default midiControls;
