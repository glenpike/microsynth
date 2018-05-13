import { connect } from 'react-redux';
import { noteOn, noteOff } from '../actions';
import VirtualKeyboard from '../components/VirtualKeyboard/VirtualKeyboard';

const mapStateToProps = state => ({
  notesOn: state.synthControls.get('notesOn').toJS(),
});

const mapDispatchToProps = dispatch => ({
  noteOn: noteNum => dispatch(noteOn(noteNum)),
  noteOff: noteNum => dispatch(noteOff(noteNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VirtualKeyboard);
