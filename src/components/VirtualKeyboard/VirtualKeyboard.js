import React, { Component } from 'react';


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
    onMouseDown = (number, event) => {
        const { noteOn } = this.props;
        event.preventDefault();
        noteOn(number);
    }

    onMouseUp = (number, event) => {
        const { noteOff } = this.props;
        event.preventDefault();
        noteOff(number);
    }
    render() {
        const { notesOn } = this.props;
        const noteOnValues = notesOn.map(noteOn => {
            return noteOn.noteNum;
        })
        return (
            <div className="VirtualKeyboard">
                {keyMap.map((k) => {
                    const { number, label } = k;
                    return (
                        <div
                            className={'VirtualKeyboard__Key' + noteOnValues.indexOf(number) !== -1 ? '__Down' : ''}
                            key={number}
                            onMouseDown={(e) => this.onMouseDown(number, e)}
                            onMouseUp={(e) => this.onMouseUp(number, e)}>
                            {label}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default VirtualKeyboard;