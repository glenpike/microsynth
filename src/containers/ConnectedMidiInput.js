import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noteOn, noteOff, selectMidiInputDevice, midiControlMessage, midiInputDevicesUpdate } from '../actions';
import MidiInput from '../components/MidiInput/MidiInput';

const mapStateToProps = state => ({
  inputs: state.midiControls.get('inputs'),
  selectedInput: state.midiControls.get('selectedInput'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  noteOn, noteOff, selectMidiInputDevice, midiControlMessage, midiInputDevicesUpdate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MidiInput);
