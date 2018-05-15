import Immutable from 'immutable';
import {
  // MIDI_CONTROL_MESSAGE,
  MIDI_INPUT_DEVICES_UPDATE,
  MIDI_INPUT_DEVICE_SELECT,
} from '../actions';

export const initialState = Immutable.fromJS({
  inputs: [],
  selectedInput: null,
  // TODO: This is separated from the synth state, but we know about it!
  // Also doesn't map values to the ranges we want - see
  // https://github.com/glenpike/web-midi-test/blob/master/src/tone-simple-synth.js#L28
  // The 'actual' values need to be reflected in the interface too, so we need to
  // map when we turn the event into a controlChange action.
  // We're also separating our min & max vals here - the midimap + synthControls needs
  // almost to be defined as one thing...
  midiMap: {
    71: { groupName: 'filter', controlType: 'resonance', map: val => val * (10000 / 128) },
    74: { groupName: 'filter', controlType: 'cutoff', map: val => val * (20 / 128) },
  },
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
    case MIDI_INPUT_DEVICE_SELECT: {
      const { id } = action;
      return state.set('selectedInput', id);
    }
    default:
      return state;
  }
};

export default midiControls;
