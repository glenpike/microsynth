import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noteOn, noteOff, keyboardOctaveChange, arpeggiatorToggle, arpeggioSelect } from '../actions';
import VirtualKeyboard from '../components/VirtualKeyboard/VirtualKeyboard';

const mapStateToProps = state => ({
  contentRect: state.appReducer.get('contentRect'),
  notesOn: state.synthControls.get('notesOn'),
  octave: state.keyboardControls.get('octave'),
  arpeggiator: state.keyboardControls.get('arpeggiator'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  noteOn, noteOff, keyboardOctaveChange, arpeggiatorToggle, arpeggioSelect,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VirtualKeyboard);
