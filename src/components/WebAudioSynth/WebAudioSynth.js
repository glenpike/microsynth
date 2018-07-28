import { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { DFT } from 'dsp.js';
import StereoPannerNode from 'stereo-panner-node';
import { NOTE_ON, NOTE_OFF, CONTROL_CHANGE } from '../../actions/index';

StereoPannerNode.polyfill();

const getPWMWave = (pulseWidth = 0.5) => {
  const numSamples = 512;
  const pulseLen = Math.round(numSamples * pulseWidth);
  const samples = [];
  for (let i = 0; i < numSamples; i += 1) {
    const sample = i < pulseLen ? 1.0 : 0;
    samples.push(sample);
  }
  const dft = new DFT(numSamples);
  dft.forward(samples);
  const { real, imag } = dft;
  return {
    real: new Float32Array(real),
    imag: new Float32Array(imag),
  };
};

const getPitch = (note) => {
  const G0 = 24.5; // G-nought = MIDI note number 0  = 24.5Hz
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
    this.notesOn = 0;
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

  setupOscType(osc, type, pulseWidth) {
    if (type === 'custom') {
      const { real, imag } = getPWMWave(pulseWidth);
      const pwmWave = this.audioContext.createPeriodicWave(real, imag);
      osc.setPeriodicWave(pwmWave);
    } else {
      osc.type = type; // eslint-disable-line no-param-reassign
    }
  }

  setupControlHandlers() {
    /* eslint-disable no-return-assign */
    this.controlHandlers = {
      'oscillator-1-shape': type =>
        this.setupOscType(this.osc1, type, this.props.controlValues.getIn(['oscillator-1', 'pulseWidth'])),
      'oscillator-1-pulseWidth': value =>
        this.setupOscType(this.osc1, this.props.controlValues.getIn(['oscillator-1', 'shape']), value),
      'oscillator-1-detune': value => this.osc1.detune.setValueAtTime(value, this.audioContext.currentTime),
      'oscillator-2-shape': type =>
        this.setupOscType(this.osc2, type, this.props.controlValues.getIn(['oscillator-2', 'pulseWidth'])),
      'oscillator-2-pulseWidth': value =>
        this.setupOscType(this.osc2, this.props.controlValues.getIn(['oscillator-2', 'shape']), value),
      'oscillator-2-detune': value => this.osc2.detune.setValueAtTime(value, this.audioContext.currentTime),
      'modulation-type': type => this.setupModType(type),
      'filter-type': (type) => { this.filter1.type = type; this.filter2.type = type; },
      'filter-cutoff': (cutoff) => {
        this.filter1.frequency.setValueAtTime(cutoff, this.audioContext.currentTime);
        this.filter2.frequency.setValueAtTime(cutoff, this.audioContext.currentTime);
      },
      'filter-resonance': (resonance) => {
        this.filter1.Q.setValueAtTime(resonance, this.audioContext.currentTime);
        this.filter2.Q.setValueAtTime(resonance, this.audioContext.currentTime);
      },
      'volume-level': level => this.volume.gain.setValueAtTime(level / 100, this.audioContext.currentTime),
      'volume-pan': pan => this.panner.pan.setValueAtTime(pan / 100, this.audioContext.currentTime),
    };
    /* eslint-enable no-return-assign */
  }

  setupModType(modType = 'ring') {
    if (modType === 'ring') {
      try {
        this.osc1.disconnect(this.multiplier);
      } catch (e) {} // eslint-disable-line no-empty
      this.osc1.connect(this.multiplier.gain);
    } else {
      try {
        this.osc1.disconnect(this.multiplier.gain);
      } catch (e) {} // eslint-disable-line no-empty
      this.osc1.connect(this.multiplier);
      this.multiplier.gain.setValueAtTime(1.0, this.audioContext.currentTime);
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
    this.volume.gain.setValueAtTime(level / 100, this.audioContext.currentTime);
    this.panner = ctx.createStereoPanner();
    this.panner.pan.setValueAtTime(pan / 100, this.audioContext.currentTime);

    // Connect the Nodes together.
    this.setupModType(modType);
    this.osc2.connect(this.multiplier);
    this.multiplier.connect(this.filter1);
    this.filter1.connect(this.filter2);
    this.filter2.connect(this.vca);
    this.vca.connect(this.volume);
    this.volume.connect(this.panner);
    this.panner.connect(ctx.destination);
  }

  createOscillator(config) {
    const {
      shape = 'sawtooth', detune = 0.0, frequency = 440, pulseWidth = 0.5,
    } = config;
    const osc = this.audioContext.createOscillator();
    this.setupOscType(osc, shape, pulseWidth);
    osc.detune.setValueAtTime(detune, this.audioContext.currentTime);
    osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    osc.start();
    return osc;
  }

  createFilter({ type = 'lowpass', cutoff = 10000, resonance = 1.0 }) {
    const filter = this.audioContext.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(cutoff, this.audioContext.currentTime);
    filter.Q.setValueAtTime(resonance, this.audioContext.currentTime);
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
        // fire up the EG (always retriggers!)
        const { gain } = this.vca;
        gain.cancelScheduledValues(now);
        gain.setValueAtTime(0, now);
        // TODO map these from 0-128 to more log kind of scale
        // (attack: 0-20s, decay & release 1ms - 60s(?)
        gain.linearRampToValueAtTime(1.0, now + (attack / 100));
        gain.linearRampToValueAtTime((sustain / 100), now + (attack / 100) + (decay / 100));
        this.notesOn += 1;
        break;
      }
      case NOTE_OFF: {
        // TODO? won't return to playing a note that's held down, check on other synths?
        this.notesOn -= 1;
        if (this.notesOn <= 0) {
          const { gain } = this.vca;
          gain.linearRampToValueAtTime(0, now + (release / 100));
          this.notesOn = 0;
        }
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
