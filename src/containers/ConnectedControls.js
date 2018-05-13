import { connect } from 'react-redux';
import { controlChange } from '../actions';
import SynthControls from '../components/SynthControls/SynthControls';

const mapStateToProps = state => ({
  controlValues: state.synthControls.get('controlValues').toJS(),
});

const mapDispatchToProps = dispatch => ({
  controlChange: (control, value, channel) => dispatch(controlChange(control, value, channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SynthControls);
