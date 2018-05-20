import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { controlChange } from '../actions';
import SynthControls from '../components/SynthControls/SynthControls';

const mapStateToProps = state => ({
  controlValues: state.synthControls.get('controlValues'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ controlChange }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SynthControls);
