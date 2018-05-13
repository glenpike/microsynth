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

Dry up repetition of components where we could just build them from a config in an automatic way.
Add keyboard & midi input / control.
Extend the virtual keyboard.
Styling:
    Nicer sliders - consider rotary controls, but only if they work in a non-confusing way.
    Nicer buttons - indicators for wave shape, etc. (Icons & leds like https://darker-things.glitch.me/ ?)
    Cleanup generally - colour mixins might be nice to make the interface pop a little more.  Not too skeumorphic though.
    More responsive.
Does it work on touch-screen?!
Normalise value ranges - probably between 0 & 128 so these map nicely to Midi.
Some audio FX on the synth...
Polyphony (with Envelopes for each!)