import Immutable from 'immutable';
import {
  KEYBOARD_OCTAVE_CHANGE,
  ARPEGGIATOR_TOGGLE,
  ARPEGGIO_SELECT,
  ARPEGGIO_BPM,
} from '../actions';

export const initialState = Immutable.fromJS({
  octave: 2,
  arpeggiator: {
    isActive: false,
    currentPattern: 0,
    bpm: 140,
    defaultPatterns: [
      [0, 4, 7, 'skip', 4, 7, 0, 7],
      [0, 2, 4, 6, 7, 6, 4, 2],
      [0, 0, 7, 7, 0, 0, 7, 7],
      [0, 2, 0, 4, 0, 2, 0, 7],
      [0, 3, 5, 7, 3, 0, 5, 7],
      [7, 6, 4, 1, 7, 6, 4, 1],
      [0, -2, 0, -2, 0, 4, 0, 4],
      [7, 5, 3, 0, -2, 0, 3, 5],
    ],
  },
});

const keyboardControls = (state = initialState, action) => {
  switch (action.type) {
    case KEYBOARD_OCTAVE_CHANGE: {
      const { octave } = action;
      return state.set('octave', octave);
    }
    case ARPEGGIATOR_TOGGLE: {
      const { isActive } = action;
      return state.setIn(['arpeggiator', 'isActive'], isActive);
    }
    case ARPEGGIO_SELECT: {
      const { currentPattern } = action;
      return state.setIn(['arpeggiator', 'currentPattern'], currentPattern);
    }
    case ARPEGGIO_BPM: {
      const { bpm } = action;
      return state.setIn(['arpeggiator', 'bpm'], bpm);
    }
    default:
      return state;
  }
};

export default keyboardControls;
