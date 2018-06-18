import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import ConnectedMidiInput from '../../containers/ConnectedMidiInput';

class AppHeader extends Component {
  static propTypes = {
    resizeApp: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Measure client onResize={contentRect => this.props.resizeApp(contentRect)}>
        {({ measureRef }) => (
          <header ref={measureRef} className="App-header clear">
            <h1 className="App-title">microsynth</h1>
            <div className="App-rhs">
              <ConnectedMidiInput />
            </div>
          </header>
        )}
      </Measure>
    );
  }
}

export default AppHeader;
