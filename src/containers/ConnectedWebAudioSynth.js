import { connect } from 'react-redux';
import { clearEventQueue } from '../actions';
import WebAudioSynth from '../components/WebAudioSynth/WebAudioSynth';

const mapStateToProps = state => ({
    synthEvents: state.synthControls.get('synthEvents').toJS(),
});

const mapDispatchToProps = dispatch => ({
    clearEventQueue: () => dispatch(clearEventQueue()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WebAudioSynth);