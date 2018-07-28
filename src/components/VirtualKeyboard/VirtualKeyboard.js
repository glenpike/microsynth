import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';
import RadioButton from '../RadioButton/RadioButton';

// TODO: This is based on $baseLineHeight in CSS!
const KEY_WIDTH = 36;

const labels = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const noteKeys = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K', 'O', 'L', 'P', 'Semicolon', 'Quote', 'BracketRight', 'Backslash'];
const generateNoteMap = () => {
  const notes = {};
  let noteNum = 0;

  noteKeys.forEach((key) => {
    if (key.length === 1) {
      key = `Key${key}`; // eslint-disable-line no-param-reassign
    }
    notes[key] = noteNum;
    noteNum += 1;
  });

  return notes;
};

class VirtualKeyboard extends Component {
  static propTypes = {
    contentRect: ImmutablePropTypes.map.isRequired,
    noteOn: PropTypes.func.isRequired,
    noteOff: PropTypes.func.isRequired,
    notesOn: ImmutablePropTypes.list.isRequired,
    octave: PropTypes.number.isRequired,
    keyboardOctaveChange: PropTypes.func.isRequired,
    arpeggiator: ImmutablePropTypes.map.isRequired,
    arpeggiatorToggle: PropTypes.func.isRequired,
    arpeggioSelect: PropTypes.func.isRequired,
    arpeggioBPM: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { keysDown: {}, currentNote: null };
  }
  componentWillMount() {
    this.setupKeyboard();
  }

  componentDidUpdate(prevProps) {
    const { arpeggiator } = this.props;
    const { arpeggiator: prevArpeggiator } = prevProps;
    if (arpeggiator.get('currentPattern') !== prevArpeggiator.get('currentPattern') ||
      arpeggiator.get('bpm') !== prevArpeggiator.get('bpm')) {
      // stop & restart arpeggiator with current noteNum
      const { currentNote } = this.state;
      if (currentNote) {
        this.stopArpeggiator();
        this.startArpeggiator(currentNote);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
    document.removeEventListener('keyup');
  }

  onMouseDown(note, event) {
    const { noteOn, arpeggiator } = this.props;
    event.preventDefault();
    if (arpeggiator.get('isActive')) {
      this.startArpeggiator(note);
    } else {
      noteOn(note);
    }
    this.setState({
      currentNote: note,
    });
  }

  onMouseUp(note, event) {
    const { noteOff, arpeggiator } = this.props;
    event.preventDefault();
    if (arpeggiator.get('isActive')) {
      this.stopArpeggiator();
    }
    noteOff(note);
  }

  onMouseOut(note, event) {
    const { noteOff, arpeggiator } = this.props;
    const { currentNote } = this.state;
    event.preventDefault();
    if (currentNote === note) {
      if (arpeggiator.get('isActive')) {
        this.stopArpeggiator();
      }
      noteOff(note);
    }
  }

  onOctaveChange(amount) {
    const { octave, keyboardOctaveChange } = this.props;
    const newOctave = Math.min(Math.max(0, (octave + amount)), 5);
    keyboardOctaveChange(newOctave);
  }

  onKeyDown(e) {
    const { keysDown } = this.state;
    if (keysDown[e.code]) {
      return;
    }
    const newKeysDown = { ...keysDown };
    newKeysDown[e.code] = true;
    const { noteOn, octave, arpeggiator } = this.props;
    let note = this.keyboardToNotes[e.code];
    if (typeof note !== 'undefined') {
      note += octave * 12;
      if (arpeggiator.get('isActive')) {
        this.startArpeggiator(note);
      } else {
        noteOn(note);
      }
    }
    this.setState({
      keysDown: newKeysDown,
      currentNote: note,
    });
  }

  onKeyUp(e) {
    const { keysDown } = this.state;
    const { noteOff, octave, arpeggiator } = this.props;
    let note = this.keyboardToNotes[e.code];
    if (typeof note !== 'undefined') {
      note += octave * 12;
      if (arpeggiator.get('isActive')) {
        this.stopArpeggiator();
      }
      noteOff(note);
    } else if (e.code === 'PageUp') {
      this.onOctaveChange(1);
    } else if (e.code === 'PageDown') {
      this.onOctaveChange(-1);
    }
    const newKeysDown = { ...keysDown };
    delete newKeysDown[e.code];
    this.setState({
      keysDown: newKeysDown,
      currentNote: null,
    });
  }

  onArpeggiatorToggle(e) {
    const { arpeggiatorToggle } = this.props;
    arpeggiatorToggle(+e.target.value === 1);
  }

  onArpeggioSelect(event) {
    const { arpeggioSelect } = this.props;
    arpeggioSelect(event.target.value);
  }

  onArpeggioBPM(event) {
    const { arpeggioBPM } = this.props;
    arpeggioBPM(event.target.value || 10);
  }

  setupKeyboard() {
    this.keyMap = [];
    for (let i = 0; i < 89; i += 1) {
      const note = labels[i % 12];
      this.keyMap.push({ number: i, label: note });
    }
    this.keyboardToNotes = generateNoteMap();
    document.addEventListener('keydown', (e) => {
      this.onKeyDown(e);
    });
    document.addEventListener('keyup', (e) => {
      this.onKeyUp(e);
    });
  }

  startArpeggiator(noteNum) {
    const {
      noteOn,
      noteOff,
      // octave,
      arpeggiator,
    } = this.props;
    const {
      currentPattern,
      bpm,
      defaultPatterns,
    } = arpeggiator.toJS();
    const patternNotes = defaultPatterns[currentPattern];
    const time = 60000 / (bpm * 4);
    let noteIdx = 1;
    let { arpeggiatorInterval, lastNote } = this.state;
    const triggerNextNote = () => {
      const patternNote = patternNotes[noteIdx];
      if (lastNote && patternNote !== 'skip') {
        noteOff(lastNote);
      }
      if (typeof patternNote === 'number') {
        const nextNote = noteNum + patternNote;
        noteOn(nextNote);
        lastNote = nextNote;
        this.setState({
          lastNote,
        });
      }
      noteIdx += 1;
      if (noteIdx === patternNotes.length) {
        noteIdx = 0;
      }
    };
    if (arpeggiatorInterval) {
      clearInterval(arpeggiatorInterval);
    }
    // should be internal state?
    arpeggiatorInterval = setInterval(triggerNextNote, time);

    this.setState({
      lastNote,
      arpeggiatorInterval,
    });
  }

  stopArpeggiator() {
    const { noteOff } = this.props;
    const { arpeggiatorInterval, lastNote } = this.state;
    if (arpeggiatorInterval) {
      clearInterval(arpeggiatorInterval);
    }
    if (lastNote) {
      noteOff(lastNote);
    }
    this.setState({
      lastNote: null,
      arpeggiatorInterval: null,
    });
  }

  render() {
    const PADDING = 24; // need to get this from the CSS?
    const {
      notesOn, contentRect, octave,
      arpeggiator,
    } = this.props;
    const {
      isActive: arpeggiatorActive,
      defaultPatterns,
      currentPattern,
      bpm,
    } = arpeggiator.toJS();
    const patternOptions = defaultPatterns.map((pattern, index) =>
      (<option key={pattern} value={index}>{pattern.join(' ')}</option>));
    const width = contentRect.getIn(['client', 'width'], 100) - PADDING;
    // const { octave } = this.state;
    const noteOnValues = notesOn.map(noteOn => noteOn.noteNum).toJS();
    const offset = KEY_WIDTH * 12 * octave;
    const displayOctave = (octave - 2) > 0 ? `+${(octave - 2)}` : (octave - 2);
    return (
      <ControlGroup extraClasses="ControlGroup--gradient">
        <div className="VirtualKeyboard" style={{ width: `${width}px` }}>
          <div className="VirtualKeyboard__Controls clear">
            <button className="VirtualKeyboard__Button" onClick={() => this.onOctaveChange(-1)}>octave -</button>
            <button className="VirtualKeyboard__Button" onClick={() => this.onOctaveChange(1)}>octave +</button>
            <span className="VirtualKeyboard__Octave">{displayOctave}</span>
            <div className="VirtualKeyboard__Arpeggiator">
              <span className="VirtualKeyboard__Arpeggiator_text">Arpeggiator</span>
              <label className="VirtualKeyboard__Arpeggiator_Label" htmlFor="patternSelect">Pattern:
                <select className="VirtualKeyboard__Arpeggiator_Pattern styled-select" id="patternSelect" value={currentPattern} onChange={e => this.onArpeggioSelect(e)} >
                  {patternOptions}
                </select>
              </label>
              <label className="VirtualKeyboard__Arpeggiator_Label" htmlFor="bpmSelect">BPM:
                <input type="number" className="VirtualKeyboard__Arpeggiator_Number styled-input" id="bpmSelect" value={bpm} min="10" max="240" onChange={e => this.onArpeggioBPM(e)} />
              </label>
              <RadioButton
                id="ArpeggiatorOn"
                label="On"
                value={1}
                isChecked={arpeggiatorActive}
                onChange={e => this.onArpeggiatorToggle(e)}
              />
              <RadioButton
                id="ArpeggiatorOff"
                label="Off"
                value={0}
                isChecked={!arpeggiatorActive}
                onChange={e => this.onArpeggiatorToggle(e)}
              />
            </div>
          </div>
          <div className="VirtualKeyboard__KeysWrapper">
            <div className="VirtualKeyboard__Keys" style={{ left: `${-offset}px` }}>
              {this.keyMap.map((k) => {
                const { number, label } = k;
                return (
                  <button
                    tabIndex={number}
                    className={`VirtualKeyboard__Key${
                      noteOnValues.indexOf(number) !== -1 ? '--down' : ''
                    }`}
                    key={number}
                    onMouseDown={e => this.onMouseDown(number, e)}
                    onMouseUp={e => this.onMouseUp(number, e)}
                    onMouseOut={e => this.onMouseOut(number, e)}
                    onBlur={e => this.onMouseUp(number, e)}
                    onTouchStart={e => this.onMouseDown(number, e)}
                    onTouchEnd={e => this.onMouseUp(number, e)}
                    onTouchCancel={e => this.onMouseUp(number, e)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ControlGroup>
    );
  }
}

export default VirtualKeyboard;
