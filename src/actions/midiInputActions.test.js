/* global jest */
import * as midiActions from './midiInputActions';

describe('midi actions', () => {
  it('should create an action for selecting a MIDI device', () => {
    const id = 'SUCKY_KEYBOARD';
    const expectedAction = {
      type: midiActions.MIDI_INPUT_DEVICE_SELECT,
      id,
    };
    expect(midiActions.selectMidiInputDevice(id))
      .to.deep.equal(expectedAction);
  });

  describe('listMidiDevices', () => {
    let originalNavigator;
    beforeEach(() => {
      originalNavigator = global.navigator;
      global.navigator = {};
    });

    afterEach(() => {
      global.navigator = originalNavigator;
    });

    const testListDevices = (expectedAction) => {
      const dispatch = jest.fn();
      return midiActions.listMidiDevices()(dispatch)
        .then(() => {
          expect(dispatch.mock.calls[0][0])
            .to.deep.equal(expectedAction);
        });
    };

    it('listMidiDevices dispatches correct action if midi is not supported', () => {
      const expectedAction = {
        type: midiActions.MIDI_NOT_SUPPORTED,
      };

      return testListDevices(expectedAction);
    });

    it('listMidiDevices dispatches correct action if error occurs', () => {
      const error = 'You\'re MIDI keyboard sucks';
      const expectedAction = {
        type: midiActions.MIDI_DEVICES_LIST_ERROR,
        error,
      };

      global.navigator.requestMIDIAccess = () =>
        new Promise((resolve, reject) => { reject(error); });
      return testListDevices(expectedAction);
    });

    it('listMidiDevices dispatches correct action if devices can be listed', () => {
      const deviceList = ['a', 'b', 'c'];
      const expectedAction = {
        type: midiActions.MIDI_DEVICES_LIST_SUCCESS,
        deviceList,
      };

      global.navigator.requestMIDIAccess = () =>
        new Promise((resolve) => { resolve(deviceList); });

      return testListDevices(expectedAction);
    });
  });
});
