import Immutable from 'immutable';
import {
  NOTE_ON,
  NOTE_OFF,
  CONTROL_CHANGE,
  CLEAR_EVENT_QUEUE,
} from '../actions';

export const initialState = Immutable.fromJS({
  notesOn: [], // TODO: handle channels?
  controlValues: {
    'oscillator-1': {
      shape: 'sawtooth',
      detune: 0,
      pulseWidth: 0.5,
      offset: 0,
    },
    'oscillator-2': {
      shape: 'custom',
      detune: 0,
      pulseWidth: 0.5,
      offset: 0,
    },
    modulation: {
      type: 'ring',
    },
    filter: {
      type: 'lowpass',
      cutoff: 3000,
      resonance: 2,
    },
    envelope: {
      attack: 1,
      decay: 10,
      sustain: 75,
      release: 50,
    },
    volume: {
      level: 50,
      pan: 0.0,
    },
  },
  synthEvents: [],
});

const synthControls = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_ON: {
      const { noteNum, velocity } = action;
      return state
        .update('notesOn', notesOn =>
          notesOn.push({
            noteNum,
            velocity,
          }))
        .update('synthEvents', synthEvents => synthEvents.push(action));
    }
    case NOTE_OFF: {
      return state
        .update('notesOn', notesOn =>
          notesOn.filter(noteOn => noteOn.noteNum !== action.noteNum))
        .update('synthEvents', synthEvents => synthEvents.push(action));
    }
    case CONTROL_CHANGE: {
      const { groupName, controlType, value } = action;
      return state.setIn(['controlValues', groupName, controlType], value)
        .update('synthEvents', synthEvents => synthEvents.push(action));
    }
    case CLEAR_EVENT_QUEUE: {
      return state.set('synthEvents', new Immutable.List());
    }
    default:
      return state;
  }
};

export default synthControls;
