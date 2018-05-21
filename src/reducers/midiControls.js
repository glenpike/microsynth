import Immutable from 'immutable';
import {
  MIDI_NOT_SUPPORTED,
  MIDI_DEVICES_LIST_SUCCESS,
  MIDI_DEVICES_LIST_ERROR,
  MIDI_INPUT_DEVICE_SELECT,
} from '../actions';

export const initialState = Immutable.fromJS({
  midiNotSupported: false,
  midiListError: null,
  inputs: Immutable.List(),
  outputs: Immutable.List(),
  selectedInput: null,
  selectedInputId: null,
  // TODO: This is separated from the synth state, but we know about it!
  // Also doesn't map values to the ranges we want - see
  // https://github.com/glenpike/web-midi-test/blob/master/src/tone-simple-synth.js#L28
  // The 'actual' values need to be reflected in the interface too, so we need to
  // map when we turn the event into a controlChange action.
  // We're also separating our min & max vals here - the midimap + synthControls needs
  // almost to be defined as one thing...
  midiMap: {
    10: { groupName: 'volume', controlType: 'pan', map: val => Math.round((val * (200 / 127))) - 100 },
    71: { groupName: 'filter', controlType: 'resonance', map: val => Math.round(val * (20 / 127)) },
    72: { groupName: 'envelope', controlType: 'release', map: val => Math.round(val * (100 / 127)) },
    73: { groupName: 'envelope', controlType: 'attack', map: val => Math.round(val * (100 / 127)) },
    74: { groupName: 'filter', controlType: 'cutoff', map: val => Math.round(val * (10000 / 127)) },
  },
});

const midiControls = (state = initialState, action) => {
  switch (action.type) {
    case MIDI_NOT_SUPPORTED: {
      return state.set('midiNotSupported', true);
    }
    case MIDI_DEVICES_LIST_SUCCESS: {
      const { deviceList: { inputs, outputs } } = action;
      // ImmutableList isn't quite right as we have a Map iterator?
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
      // Also, may need to manually iterate and store them?
      return state.set('inputs', new Immutable.List(inputs.values()))
        .set('outputs', new Immutable.List(outputs.values()));
    }
    case MIDI_DEVICES_LIST_ERROR: {
      const { error } = action;
      return state.set('midiListerror', error);
    }
    case MIDI_INPUT_DEVICE_SELECT: {
      const { id } = action;
      const input = state.get('inputs').filter(({ id: inputId }) => inputId === id);
      if (input.size) {
        return state.set('selectedInputId', id).set('selectedInput', input.get(0));
      }
      return state;
    }
    default:
      return state;
  }
};

export default midiControls;
