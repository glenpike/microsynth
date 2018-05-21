/*
    Very simplistic module for listing, getting MIDI devices.
    Will also allow handlerping of an input to
    See https://webaudio.github.io/web-midi-api
    & https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess
*/

// Store our MIDI inputs / outputs here.
// We don't listen for disconnect, which could happen!
let inputs;
let outputs;

// Asks the browser for a list of devices, stores the
// results and returns iterators to loop through these.
const listMidiDevices = () => {
  // Get lists of available MIDI controllers
  if (!navigator.requestMIDIAccess) {
    return Promise.resolve({ inputs: [], outputs: [] });
  }

  return navigator.requestMIDIAccess().then((access) => {
    /* eslint-disable prefer-destructuring */
    inputs = access.inputs;
    outputs = access.outputs;
    /* eslint-enable prefer-destructuring */
    return {
      // Returning generators - we can only iterate them once!
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
      inputs: inputs.values(),
      outputs: outputs.values(),
    };
  });
};

const onMIDIMessage = (event, handler) => {
  const byte0 = event.data[0] & 0xf0; // eslint-disable-line no-bitwise
  switch (byte0) {
    case 0xf0:
      return;
    case 0x90: {
      if (event.data[2] !== 0 && handler.noteOn) {
        // if velocity != 0, this is a note-on message
        handler.noteOn(event.data[1], event.data[2]);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    }
    case 0x80: { // eslint-disable-line no-fallthrough
      if (handler.noteOff) {
        handler.noteOff(event.data[1]);
      }
      return;
    }
    case 0xb0: { // continuous controller.
      const byte1 = event.data[1] & 0xff; // eslint-disable-line no-bitwise
      // console.log(`byte1 ${byte1} (${byte1.toString(16)})`); // eslint-disable-line no-console
      if (handler.controlChange) {
        handler.controlChange({ controller: byte1, value: event.data[2] });
      }
      return;
    }
    default: {
      let str = `MIDI message ${byte0} [${event.data.length} bytes]:`;
      for (let i = 0; i < event.data.length; i += 1) {
        str += ` 0x${event.data[i].toString(16)}`;
      }
      console.log(str); // eslint-disable-line no-console
    }
  }
};
const unselectMidiDevice = (input) => {
  if (input) {
    // eslint-disable-next-line no-param-reassign
    input.onmidimessage = null;
  }
};

const selectMidiDevice = (input, handler) => {
  // eslint-disable-next-line no-param-reassign
  input.onmidimessage = e => onMIDIMessage(e, handler);
};

module.exports = {
  listMidiDevices,
  selectMidiDevice,
  unselectMidiDevice,
};
