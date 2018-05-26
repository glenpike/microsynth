import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgKnob from 'svg-knob';

// See: https://github.com/francoisgeorgy/svg-knob#simple-svgknob-component-2-files
const config = {
  label: false,

  default_value: 0,
  initial_value: 0,
  value_min: 0.0,
  value_max: 100.0,
  value_resolution: 1, // null means ignore

  // background disk:
  bg_radius: 32,
  bg_border_width: 1,

  // track background:
  track_bg_radius: 40,
  track_bg_width: 20,

  // track:
  track_radius: 40,
  track_width: 20,

  // cursor
  cursor_radius: 18, // same unit as radius
  cursor_length: 10,
  cursor_width: 4,

  palette: 'light',
  bg: false,
  track_bg: true,
  track: true,
  cursor: false,
  // CSS class names
  linecap: 'butt', // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
  value_text: false,
  value_position: 50 + 8, // empirical value: HALF_HEIGHT + config.font_size / 3
  format: v => v, // formatting of the displayed value
  font_family: 'sans-serif',
  font_size: 25,

};

class Knob extends Component {
  static propTypes = {
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: 'Knob',
    value: 0,
    min: 0,
    max: 128,
  };

  componentDidMount() {
    const {
      min, max, value, className,
    } = this.props;
    config.default_value = value;
    config.initial_value = value;
    config.value_min = min;
    config.value_max = max;

    config.class_bg = `${className}__background`;
    config.class_track_bg = `${className}__track-background`;
    config.class_track = `${className}__track`;
    config.class_cursor = `${className}__cursor`;

    this.k = new SvgKnob(this.dom, config);
    this.k.enableDebug();
    this.dom.addEventListener('change', this.handleChange);
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.k.value !== nextProps.value;
  // }

  // componentDidUpdate() {
  //   const { value } = this.props;
  //   this.k.value = value;
  // }

  handleChange = (e) => { this.props.onChange(e.detail); };

  render() {
    return (
      <svg ref={elem => this.dom = elem} /> // eslint-disable-line no-return-assign
    );
  }
}

export default Knob;
