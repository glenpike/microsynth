# Introduction

A JavaScript web-app for a WebAudio based synthesizer.

Written in React + Redux starting with the [create-react-app](https://github.com/facebook/create-react-app) project.

Uses SCSS for styling as an additional to the React stuff: [Adding Sass or Scss to Create-React-App](https://medium.com/@Connorelsea/using-sass-with-create-react-app-7125d6913760)

Also uses [Eslint](https://eslint.org/) along with the [Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)


# To Run

Use `npm install` or `yarn` to setup the packages.

`npm start` or `yarn start` will start the create-react-app gubbins and launch the page in your browser.

To watch and recompile CSS changes, also run `npm run watch-css` or `yarn watch-css`

# Tests

None yet...

# Todo

- Functionality
  - Only the keyboard works on touch-screen.
  - Better rotary controls - these don't feel right in browser, but check in mobile...

- Consider drying up repetition of components where we could just build them from a config in an automatic way?

- Styling:
  - Midi device selector.
  - Nicer buttons - indicators for wave shape, etc. (Icons & leds like https://darker-things.glitch.me/ ?)
  - More responsive - keyboard doesn't collapse because we scroll it.

- MIDI
  - MIDI controller inputs - make these 'configurable', but default to standards.
  - Move the midi device lookup into the actions (as a thunk)
  - Move the other midi actions out of the midi-input (need to keep the event listeners somewhere though!)
  - needs to handle disconnect and reconnect possibly.
  - Normalise value ranges - probably between 0 & 128 so these map nicely to Midi.

- Audio
  - Some audio FX on the synth...
  - Fatten up the oscillator sounds.
  - Add an LFO
  - Polyphony (with Envelopes for each!)?