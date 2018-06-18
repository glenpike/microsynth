import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { noteOn, noteOff } from '../actions';
import VirtualKeyboard from '../components/VirtualKeyboard/VirtualKeyboard';

const mapStateToProps = state => ({
  contentRect: state.appReducer.get('contentRect'),
  notesOn: state.synthControls.get('notesOn'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ noteOn, noteOff }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VirtualKeyboard);
