import React, { Component } from 'react';

class WebAudioSynth extends Component {
  componentWillMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this._playingNotes = [];
  }
  componentWillUnmount() {
    this.audioContext.close();
  }

  componentWillReceiveProps(props) {
    const { synthEvents } = props;
    if (synthEvents.length) {
      synthEvents.forEach((event) => {
        this.processEvent(event);
      });
    }
    props.clearEventQueue();
  }

  processEvent(event) {
    switch (event.type) {
      case 'NOTE_ON':
        var osc = this.audioContext.createOscillator();
        osc.frequency.value = this.noteNumberToFrequency(event.noteNum);
        osc.start(this.audioContext.currentTime);
        osc.type = 'sawtooth';
        osc.connect(this.audioContext.destination);
        this._playingNotes.push({
          key: event.key,
          osc,
        });
        break;
      case 'NOTE_OFF':
        this._playingNotes
          .filter((note) => {
            return note.key === event.key;
          })
          .forEach((note) => {
            note.osc.stop(this.audioContext.currentTime);
          });
        break;
    }
  }
  render() {
    return null;
  }

  noteNumberToFrequency(num) {
    // from https://github.com/danigb/midi-freq
    return Math.pow(2, (num - 69) / 12) * 440;
  }
}

export default WebAudioSynth;
