export const MIDI_NOT_SUPPORTED = 'MIDI_NOT_SUPPORTED';
export const MIDI_DEVICES_LIST_SUCCESS = 'MIDI_DEVICES_LIST_SUCCESS';
export const MIDI_DEVICES_LIST_ERROR = 'MIDI_DEVICES_LIST_ERROR';
// export const MIDI_DEVICE_DISCONNECT = 'MIDI_DEVICE_DISCONNECT';
// export const MIDI_DEVICE_RECONNECT = 'MIDI_DEVICE_RECONNECT';
export const MIDI_INPUT_DEVICE_SELECT = 'MIDI_INPUT_DEVICE_SELECT';


export const midiNotSuppported = () => ({
    type: MIDI_NOT_SUPPORTED,
  });
  
  export const midiDevicesListSuccess = deviceList => ({
    type: MIDI_DEVICES_LIST_SUCCESS,
    deviceList,
  });
  
  export const midiDevicesListError = error => ({
    type: MIDI_DEVICES_LIST_ERROR,
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
  