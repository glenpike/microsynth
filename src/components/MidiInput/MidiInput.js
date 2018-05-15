import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
    } = props;
    if (selectedInput && selectedInput !== this.selectedInput) {
      const handler = {
        noteOff,
        noteOn,
        controlChange: msg => this.onMidiControlChange(msg),
      };
      selectMidiDevice(selectedInput, handler);
    }
  }


  componentWillUnmount() {
    // TODO: Stop listening!
  }

  onMidiControlChange(msg) {
    const { controller, value } = msg;
    const {
      controlChange,
      midiMap,
    } = this.props;
    const controlledValue = midiMap.get(`${controller}`);
    if (controlledValue && controlledValue.toJS) {
      const { groupName, controlType, map } = controlledValue.toJS();
      const mappedValue = map ? map(value) : value;
      controlChange(groupName, controlType, mappedValue);
    }
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
    return (
      <select value={selectedInput || ''} onChange={e => this.onMidiDeviceSelect(e)}>
        <option value="none">Select</option>
        {options}
      </select>
    );
  }
}

MidiInput.defaultPropTypes = {
  selectedInput: null,
};

MidiInput.propTypes = {
  inputs: ImmutablePropTypes.list.isRequired,
  selectedInput: PropTypes.any, // eslint-disable-line
  noteOn: PropTypes.func.isRequired,
  noteOff: PropTypes.func.isRequired,
  midiMap: ImmutablePropTypes.map.isRequired,
  controlChange: PropTypes.func.isRequired,
  selectMidiInputDevice: PropTypes.func.isRequired,
  midiInputDevicesUpdate: PropTypes.func.isRequired,
};

export default MidiInput;
