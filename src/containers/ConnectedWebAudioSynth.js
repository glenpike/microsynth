import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearEventQueue } from '../actions';
import WebAudioSynth from '../components/WebAudioSynth/WebAudioSynth';

const mapStateToProps = state => ({
  synthEvents: state.synthControls.get('synthEvents'),
  controlValues: state.synthControls.get('controlValues'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ clearEventQueue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WebAudioSynth);
