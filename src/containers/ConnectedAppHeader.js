import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeApp } from '../actions';
import AppHeader from '../components/AppHeader/AppHeader';

const mapStateToProps = state => ({
  contentRect: state.synthControls.get('contentRect'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ resizeApp }, dispatch);
const ConnectedAppHeader = connect(mapStateToProps, mapDispatchToProps)(AppHeader);

export default ConnectedAppHeader;
