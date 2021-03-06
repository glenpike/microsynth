import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noteOn, noteOff, controlChange, listMidiDevices, selectMidiInputDevice/* , midiControlMessage */ } from '../actions';
import MidiInput from '../components/MidiInput/MidiInput';

const mapStateToProps = state => ({
  inputs: state.midiControls.get('inputs'),
  selectedInputId: state.midiControls.get('selectedInputId'),
  selectedInput: state.midiControls.get('selectedInput'),
  midiMap: state.midiControls.get('midiMap'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  noteOn,
  noteOff,
  listMidiDevices,
  selectMidiInputDevice,
  controlChange,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MidiInput);
