import Immutable from 'immutable';
import {
  NOTE_ON,
  NOTE_OFF,
  CONTROL_CHANGE,
  CLEAR_EVENT_QUEUE,
} from '../actions';

export const initialState = Immutable.fromJS({
  notesOn: [], // TODO: handle channels?
  controlValues: [],
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
      const { control, value } = action;
      return state.update('controlValues', controlValues =>
        controlValues
          .push({
            control,
            value,
          }))
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
