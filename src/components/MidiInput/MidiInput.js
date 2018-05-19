import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listMidiDevices, selectMidiDevice } from '../../utils/midi-input';


class MidiInput extends Component {
  componentWillMount() {
    const { midiInputDevicesUpdate } = this.props;
    this.selectedInput = null;
    listMidiDevices().then((devices) => {
      midiInputDevicesUpdate(devices.inputs);
    });
  }

  componentWillReceiveProps(props) {
    // if the selectedInput changes...
    const {
      selectedInput,
      noteOn, noteOff,
      midiControlMessage: controlChange,
    } = props;
    if (selectedInput && selectedInput !== this.selectedInput) {
      const handler = {
        noteOff,
        noteOn,
        controlChange,
      };
      selectMidiDevice(selectedInput, handler);
    }
  }

  componentWillUnmount() {

  }

  onMidiDeviceSelect(event) {
    const { selectMidiInputDevice } = this.props;
    selectMidiInputDevice(event.target.value);
  }

  // processEvent(event) {
  // }

  render() {
    // Add a dropdown to show the chosen device,,,
    const { inputs, selectedInput } = this.props;
    const options = inputs.map(({ id, name }) => (<option key={id} value={id}>{name}</option>));
    if (options.length) {
      return (
        <div>
          <label className="MidiInput__Label" htmlFor="midiSelect">MIDI Input:
            <select className="MidiInput__Select" id="midiSelect" value={selectedInput} onChange={e => this.onMidiDeviceSelect(e)} >
              <option value="none">Select</option>
              {options}
            </select>
          </label>
        </div>
      );
    }
    return null;
  }
}

MidiInput.defaultPropTypes = {
  selectedInput: null,
};

MidiInput.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedInput: PropTypes.any, // eslint-disable-line
  noteOn: PropTypes.func.isRequired,
  noteOff: PropTypes.func.isRequired,
  midiControlMessage: PropTypes.func.isRequired,
  selectMidiInputDevice: PropTypes.func.isRequired,
  midiInputDevicesUpdate: PropTypes.func.isRequired,
};

export default MidiInput;
