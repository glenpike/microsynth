import { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// from https://github.com/danigb/midi-freq
const noteNumberToFrequency = num =>
  ((2 ** (num - 69)) / 12) * 440;

class WebAudioSynth extends Component {
  componentWillMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.playingNotes = [];
  }

  componentWillReceiveProps(props) {
    const { synthEvents } = props;
    if (synthEvents.length) {
      synthEvents.forEach(event => this.processEvent(event));
    }
    props.clearEventQueue();
  }

  componentWillUnmount() {
    this.audioContext.close();
  }

  processEvent(event) {
    switch (event.type) {
      case 'NOTE_ON': {
        const osc = this.audioContext.createOscillator();
        osc.frequency.value = noteNumberToFrequency(event.noteNum);
        osc.start(this.audioContext.currentTime);
        osc.type = 'sawtooth';
        osc.connect(this.audioContext.destination);
        this.playingNotes.push({
          key: event.key,
          osc,
        });
        break;
      }
      case 'NOTE_OFF': {
        this.playingNotes
          .filter(note => note.key === event.key)
          .forEach(note => note.osc.stop(this.audioContext.currentTime));
        break;
      }
      default:
        break;
    }
  }

  render() {
    return null;
  }
}

WebAudioSynth.propTypes = {
  clearEventQueue: PropTypes.func.isRequired,
  synthEvents: ImmutablePropTypes.map.isRequired, // eslint-disable-line react/no-typos
};

export default WebAudioSynth;
