import { connect } from 'react-redux';
import { noteOn, noteOff, selectMidiInputDevice, midiControlMessage, midiInputDevicesUpdate } from '../actions';
import MidiInput from '../components/MidiInput/MidiInput';

const mapStateToProps = state => ({
  inputs: state.midiControls.get('inputs').toJS(),
  selectedInput: state.midiControls.get('selectedInput'),
});

const mapDispatchToProps = dispatch => ({
  noteOn: noteNum => dispatch(noteOn(noteNum)),
  noteOff: noteNum => dispatch(noteOff(noteNum)),
  midiControlMessage: (control, value) => dispatch(midiControlMessage(control, value)),
  selectMidiInputDevice: id => dispatch(selectMidiInputDevice(id)),
  midiInputDevicesUpdate: inputs => dispatch(midiInputDevicesUpdate(inputs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MidiInput);
