export const NOTE_ON = 'NOTE_ON';
export const NOTE_OFF = 'NOTE_OFF';
export const CONTROL_CHANGE = 'CONTROL_CHANGE';
export const CLEAR_EVENT_QUEUE = 'CLEAR_EVENT_QUEUE';

export const noteOn = (noteNum, velocity = 1.0, channel = 1) => ({
    type: NOTE_ON,
    noteNum,
    velocity,
    channel,
});

export const noteOff = (noteNum, channel = 1) => ({
    type: NOTE_OFF,
    noteNum,
    channel,
});

export const controlChange = (control, value, channel = 1) => ({
    type: CONTROL_CHANGE,
    control,
    value,
    channel,
});

export const clearEventQueue = () => ({
    type: CLEAR_EVENT_QUEUE,
});