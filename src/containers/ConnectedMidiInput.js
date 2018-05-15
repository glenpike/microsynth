import { connect } from 'react-redux';
import { noteOn, noteOff, controlChange, selectMidiInputDevice, /* midiControlMessage, */ midiInputDevicesUpdate } from '../actions';
import MidiInput from '../components/MidiInput/MidiInput';

const mapStateToProps = state => ({
  inputs: state.midiControls.get('inputs'),
  selectedInput: state.midiControls.get('selectedInput'),
  midiMap: state.midiControls.get('midiMap'),
});

const mapDispatchToProps = dispatch => ({
  noteOn: noteNum => dispatch(noteOn(noteNum)),
  noteOff: noteNum => dispatch(noteOff(noteNum)),
  // midiControlMessage: (control, value) => dispatch(midiControlMessage(control, value)),
  controlChange: (control, value, channel) => dispatch(controlChange(control, value, channel)),
  selectMidiInputDevice: id => dispatch(selectMidiInputDevice(id)),
  midiInputDevicesUpdate: inputs => dispatch(midiInputDevicesUpdate(inputs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MidiInput);
