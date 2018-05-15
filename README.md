# Introduction

A JavaScript web-app for a WebAudio based synthesizer.

Written in React + Redux starting with the [create-react-app](https://github.com/facebook/create-react-app) project.

Uses SCSS for styling as an additional to the React stuff: [Adding Sass or Scss to Create-React-App](https://medium.com/@Connorelsea/using-sass-with-create-react-app-7125d6913760)

Also uses [Eslint](https://eslint.org/) along with the [Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)


# To Run

Use `npm install` or `yarn` to setup the packages.

First build the CSS with `npm run build-css` or `yarn build-css`.

Then run `npm start` or `yarn start` will start the create-react-app gubbins and launch the page in you r browser.

To watch and recompile CSS changes, also run `npm run watch-css` or `yarn watch-css`

# Tests

No unit tests...

* Chromium 65.0.3325.181 (Linux) behaving
* Firefox 59.0.2 (Linux) behaving - no Midi
* MotoG3 Chrome Browser - plays notes, slightly laggy with lots of input.

# Todo

Things that I'd like to do.

- Some testing see https://github.com/glenpike/react-maths/blob/develop/src/components/Game.test.js for an early start on component testing with create-react-app

- Functionality
  - Only the keyboard works on touch-screen, the other controls are quite small.
  - Better rotary controls - these don't feel right in browser.  They might be okay on a touch screen, but don't respond to touch.
  - Ability to save and load a 'patch' - use local-storage or similar.

- Code
  - Change to use Immutable props in the components rather than converting these to POJO's

- Consider drying up repetition of components where we could just build them from a config in an automatic way.  Dry isn't necessarily the right word
  because some 'consistent repetition' is okay - following patterns, etc.

- Styling:
  - Consider a more tight framework approach.  The alignment of components and their style works okay and it's moving towards an ITCSS approach.
  - Midi device selector (it's a select and needs to be progressively enhanced)
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
  - Drop in synth configurations, e.g. a JSON graph describing the modules and settings (modular heaven or hell?)