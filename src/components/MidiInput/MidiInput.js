import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { selectMidiDevice, unselectMidiDevice } from '../../utils/midi-input';


class MidiInput extends Component {
  static propTypes = {
    inputs: ImmutablePropTypes.list.isRequired,
    selectedInputId: PropTypes.any, // eslint-disable-line
    selectedInput: PropTypes.any, // eslint-disable-line
    noteOn: PropTypes.func.isRequired,
    noteOff: PropTypes.func.isRequired,
    controlChange: PropTypes.func.isRequired,
    midiMap: ImmutablePropTypes.map.isRequired,
    selectMidiInputDevice: PropTypes.func.isRequired,
    listMidiDevices: PropTypes.func.isRequired,
  };

  static defaultPropTypes = {
    selectedInput: null,
  };


  componentWillMount() {
    const { listMidiDevices } = this.props;
    this.selectedInput = null; // Change to state?
    listMidiDevices();
  }

  componentWillUpdate(nextProps) {
    // if the selectedInput changes...
    const {
      selectedInput,
      noteOn, noteOff,
    } = this.props;
    const { selectedInput: newSelectedInput } = nextProps;
    if (newSelectedInput && newSelectedInput !== selectedInput) {
      const handler = {
        noteOff,
        noteOn,
        controlChange: msg => this.onMidiControlChange(msg),
      };
      selectMidiDevice(newSelectedInput, handler);
    }
  }


  componentWillUnmount() {
    const { selectedInput } = this.props;
    unselectMidiDevice(selectedInput);
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

  render() {
    // Add a dropdown to show the chosen device,,,
    const { inputs, selectedInputId } = this.props;
    const options = inputs.map(({ id, name }) =>
      (<option key={id} value={id}>{name}</option>)).toJS();
    if (options.length) {
      return (
        <div>
          <label className="MidiInput__Label" htmlFor="midiSelect">MIDI Input:
            <select className="MidiInput__Select" id="midiSelect" value={selectedInputId || ''} onChange={e => this.onMidiDeviceSelect(e)} >
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

export default MidiInput;
