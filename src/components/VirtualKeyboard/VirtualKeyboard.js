import React, { Component } from 'react';
import PropTypes from 'prop-types';

const keyMap = [
  {
    number: 48,
    label: 'C',
  },
  {
    number: 49,
    label: 'C#',
  },
  {
    number: 50,
    label: 'D',
  },
  {
    number: 51,
    label: 'D#',
  },
  {
    number: 52,
    label: 'E',
  },
  {
    number: 53,
    label: 'F',
  },
  {
    number: 54,
    label: 'F#',
  },
  {
    number: 55,
    label: 'G',
  },
  {
    number: 56,
    label: 'G#',
  },
  {
    number: 57,
    label: 'A',
  },
  {
    number: 58,
    label: 'Bb',
  },
  {
    number: 59,
    label: 'B',
  },
];

class VirtualKeyboard extends Component {
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
  render() {
    const { notesOn } = this.props;
    const noteOnValues = notesOn.map(noteOn => noteOn.noteNum);
    return (
      <div className="VirtualKeyboard clear">
        {keyMap.map((k) => {
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
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
}

VirtualKeyboard.propTypes = {
  noteOn: PropTypes.func.isRequired,
  noteOff: PropTypes.func.isRequired,
  notesOn: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VirtualKeyboard;
