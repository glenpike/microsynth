export const RESIZE_APP = 'RESIZE_APP';
export const NOTE_ON = 'NOTE_ON';
export const NOTE_OFF = 'NOTE_OFF';
export const CONTROL_CHANGE = 'CONTROL_CHANGE';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';

export const MIDI_NOT_SUPPORTED = 'MIDI_NOT_SUPPORTED';
export const MIDI_DEVICES_LIST = 'MIDI_DEVICES_LIST';
export const MIDI_DEVICES_LIST_SUCCESS = 'MIDI_DEVICES_LIST_SUCCESS';
export const MIDI_DEVICES_LIST_ERROR = 'MIDI_DEVICES_LIST_ERROR';
// export const MIDI_DEVICE_DISCONNECT = 'MIDI_DEVICE_DISCONNECT';
// export const MIDI_DEVICE_RECONNECT = 'MIDI_DEVICE_RECONNECT';
export const MIDI_INPUT_DEVICE_SELECT = 'MIDI_INPUT_DEVICE_SELECT';

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

export const resizeApp = contentRect => ({
  type: RESIZE_APP,
  contentRect,
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

export const midiNotSuppported = () => ({
  type: MIDI_NOT_SUPPORTED,
});

export const midiDevicesListSuccess = deviceList => ({
  type: MIDI_DEVICES_LIST_SUCCESS,
  deviceList,
});

export const midiDevicesListError = error => ({
  type: MIDI_DEVICES_LIST_SUCCESS,
  error,
});

export const listMidiDevices = () => (dispatch) => {
  if (!navigator.requestMIDIAccess) {
    dispatch(midiNotSuppported());
    return Promise.resolve();
  }
  return navigator.requestMIDIAccess()
    .then((deviceList) => {
      dispatch(midiDevicesListSuccess(deviceList));
    })
    .catch((error) => {
      dispatch(midiDevicesListError(error));
    });
};

export const selectMidiInputDevice = id => ({
  type: MIDI_INPUT_DEVICE_SELECT,
  id,
});
