import { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { NOTE_ON, NOTE_OFF, CONTROL_CHANGE } from '../../actions/index';


// TODO: use setValueAtTime(value, now) instead of .value

const getPitch = (note) => {
  const G0 = 24.5; // G0 = note number 0  = 24.5Hz
  return G0 * (2.0 ** ((1.0 * Math.max(0, Math.min(note, 88))) / 12));
};

class WebAudioSynth extends Component {
  static propTypes = {
    clearEventQueue: PropTypes.func.isRequired,
    synthEvents: ImmutablePropTypes.list.isRequired,
    controlValues: ImmutablePropTypes.map.isRequired,
  };
  componentWillMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.createSynth();
    this.setupControlHandlers();
  }

  componentWillReceiveProps(props) {
    const { synthEvents } = props;
    if (synthEvents.size) {
      synthEvents.toJS().forEach(event => this.processEvent(event));
    }
    props.clearEventQueue();
  }

  componentWillUnmount() {
    this.destroySynth();
    this.audioContext.close();
  }

  setupControlHandlers() {
    /* eslint-disable no-return-assign */
    this.controlHandlers = {
      'oscillator-1-shape': type => this.osc1.type = type,
      'oscillator-1-detune': value => this.osc1.detune.value = value,
      'oscillator-2-shape': type => this.osc2.type = type,
      'oscillator-2-detune': value => this.osc2.detune.value = value,
      'modulation-type': type => this.setupModType(type),
      'filter-type': (type) => { this.filter1.type = type; this.filter2.type = type; },
      'filter-cutoff': (cutoff) => { this.filter1.frequency.value = cutoff; this.filter2.frequency.value = cutoff; },
      'filter-resonance': (resonance) => { this.filter1.Q.value = resonance; this.filter2.Q.value = resonance; },
      'volume-level': level => this.volume.gain.value = level,
      'volume-pan': pan => this.panner.pan.value = pan,
    };
    /* eslint-enable no-return-assign */
  }

  setupModType(modType = 'ring') {
    if (modType === 'ring') {
      this.osc1.connect(this.multiplier.gain);
    } else {
      this.multiplier.gain.value = 1.0;
      this.osc1.connect(this.multiplier);
    }
  }

  createSynth() {
    const {
      controlValues,
    } = this.props;
    const {
      'oscillator-1': osc1,
      'oscillator-2': osc2,
      modulation: {
        type: modType,
      },
      filter,
      volume: {
        level,
        pan,
      },
    } = controlValues.toJS();
    const ctx = this.audioContext;

    this.osc1 = this.createOscillator(osc1);
    this.osc2 = this.createOscillator(osc2);

    this.multiplier = ctx.createGain();
    this.multiplier.gain.value = 1.0;

    this.filter1 = this.createFilter(filter);
    this.filter2 = this.createFilter(filter);

    this.vca = ctx.createGain();
    this.vca.gain.value = 0;

    this.volume = ctx.createGain();
    this.volume.gain.value = level;
    this.panner = ctx.createStereoPanner();
    this.panner.pan.value = pan;

    // Connect the Nodes together.
    this.setupModType(modType);
    this.osc2.connect(this.multiplier);
    this.multiplier.connect(this.filter1);
    this.filter1.connect(this.filter2);
    this.filter2.connect(this.vca);
    // TODO: consider combining these 2.
    this.vca.connect(this.volume);
    this.volume.connect(this.panner);
    this.panner.connect(ctx.destination);
  }

  createOscillator({ shape = 'sawtooth', detune = 0.0, frequency = 440 }) {
    const osc = this.audioContext.createOscillator();
    osc.type = shape;
    osc.detune.setValueAtTime(detune, this.audioContext.currentTime);
    osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    osc.start();
    return osc;
  }

  createFilter({ type = 'lowpass', cutoff = 10000, resonance = 1.0 }) {
    const filter = this.audioContext.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = cutoff;
    filter.Q.value = resonance;
    return filter;
  }

  destroySynth() {
    this.controlHandlers = null;
    ['osc1', 'osc2', 'multiplier', 'filter1', 'filter2', 'vca', 'volume', 'panner'].forEach((node) => {
      this[node].disconnect();
      this[node] = null;
    });
  }

  processEvent(event) {
    const {
      controlValues,
    } = this.props;
    const {
      envelope: {
        attack,
        decay,
        sustain,
        release,
      },
    } = controlValues.toJS();
    const now = this.audioContext.currentTime;

    switch (event.type) {
      case NOTE_ON: {
        const frequency = getPitch(event.noteNum);
        this.osc1.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        this.osc2.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        // fire up the EG.
        const { gain } = this.vca;
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(0, now);
        // TODO map these from 0-128 to more log kind of scale
        // (attack: 0-20s, decay & release 1ms - 60s(?)
        gain.linearRampToValueAtTime(1.0, now + (attack / 100));
        gain.linearRampToValueAtTime((sustain / 100), now + (attack / 100) + (decay / 100));
        break;
      }
      case NOTE_OFF: {
        const { gain } = this.vca;
        gain.linearRampToValueAtTime(0, now + (release / 100));
        break;
      }
      case CONTROL_CHANGE: {
        const { groupName, controlType, value } = event;
        const func = this.controlHandlers[`${groupName}-${controlType}`];
        if (func) {
          func(value);
        }
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

export default WebAudioSynth;
