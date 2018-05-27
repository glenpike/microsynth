import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ControlGroup from '../ControlGroup/ControlGroup';

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
  };
  constructor(props) {
    super(props);
    this.state = { octave: 2 };
  }
  componentWillMount() {
    this.setupKeyboard();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
    document.removeEventListener('keyup');
  }

  onMouseDown(number, event) {
    const { noteOn } = this.props;
    event.preventDefault();
    noteOn(number);
  }

  onMouseUp(number, event) {
    const { noteOff } = this.props;
    event.preventDefault();
    noteOff(number);
  }

  onOctaveChange(amount) {
    const { octave } = this.state;
    const newOctave = Math.min(Math.max(0, (octave + amount)), 5);
    this.setState({
      octave: newOctave,
    });
  }

  onKeyDown(e) {
    if (e.repeat) {
      return;
    }
    const { noteOn } = this.props;
    const { octave } = this.state;
    let note = this.keyboardToNotes[e.code];
    if (typeof note !== 'undefined') {
      note += octave * 12;
      noteOn(note);
    }
  }

  onKeyUp(e) {
    const { octave } = this.state;
    const { noteOff } = this.props;
    let note = this.keyboardToNotes[e.code];

    if (typeof note !== 'undefined') {
      note += octave * 12;
      noteOff(note);
    } else if (e.code === 'PageUp') {
      this.onOctaveChange(1);
    } else if (e.code === 'PageDown') {
      this.onOctaveChange(-1);
    }
  }

  setupKeyboard() {
    this.octave = 0;
    this.keyMap = [];
    for (let i = 0; i < 89; i += 1) {
      const note = labels[i % 12];
      this.keyMap.push({ number: i, label: note });
    }
    this.setState({
      octave: 2,
    });
    this.keyboardToNotes = generateNoteMap();
    document.addEventListener('keydown', (e) => {
      this.onKeyDown(e);
    });
    document.addEventListener('keyup', (e) => {
      this.onKeyUp(e);
    });
  }

  render() {
    const PADDING=24; // need to get this from the CSS?
    const { notesOn, contentRect } = this.props;
    const width = contentRect.getIn(['client', 'width'], 100) - PADDING;
    const { octave } = this.state;
    const noteOnValues = notesOn.map(noteOn => noteOn.noteNum).toJS();
    const offset = KEY_WIDTH * 12 * octave;
    const displayOctave = (octave - 2) > 0 ? `+${(octave - 2)}` : (octave - 2);
    return (
      <ControlGroup extraClasses="ControlGroup--gradient">
        <div className="VirtualKeyboard" style={{ width: `${width}px` }}>
          <div className="VirtualKeyboard__Controls">
            <button className="VirtualKeyboard__Button" onClick={() => this.onOctaveChange(-1)}>octave -</button>
            <button className="VirtualKeyboard__Button" onClick={() => this.onOctaveChange(1)}>octave +</button>
            <span className="VirtualKeyboard__Octave">{displayOctave}</span>
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
                    onMouseOut={e => this.onMouseUp(number, e)}
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
