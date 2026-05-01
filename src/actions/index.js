export * from './appActions';
export * from './midiInputActions';

export const NOTE_ON = 'NOTE_ON';
export const NOTE_OFF = 'NOTE_OFF';
export const CONTROL_CHANGE = 'CONTROL_CHANGE';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';

export const KEYBOARD_OCTAVE_CHANGE = 'KEYBOARD_OCTAVE_CHANGE';
export const ARPEGGIATOR_TOGGLE = 'ARPEGGIATOR_TOGGLE';
export const ARPEGGIO_SELECT = 'ARPEGGIO_SELECT';
export const ARPEGGIO_BPM = 'ARPEGGIO_BPM';

export const keyboardOctaveChange = octave => ({
  type: KEYBOARD_OCTAVE_CHANGE,
  octave,
});

export const arpeggiatorToggle = isActive => ({
  type: ARPEGGIATOR_TOGGLE,
  isActive,
});

export const arpeggioSelect = currentPattern => ({
  type: ARPEGGIO_SELECT,
  currentPattern,
});

export const arpeggioBPM = bpm => ({
  type: ARPEGGIO_BPM,
  bpm,
});

export const noteOn = (noteNum, velocity = 1.0, channel = 1) => ({
  type: NOTE_ON,
  noteNum,
  velocity,
  channel,
});

export const noteOff = (noteNum, channel = 1) => ({
  type: NOTE_OFF,
  noteNum,
  channel,
});

export const controlChange = (groupName, controlType, value, channel = 1) => ({
  type: CONTROL_CHANGE,
  groupName,
  controlType,
  value,
  channel,
});

export const clearEventQueue = () => ({
  type: CLEAR_EVENT_QUEUE,
});
