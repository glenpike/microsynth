import React, { Component } from 'react';
import PropTypes from 'prop-types';

// https://codepen.io/anon/pen/vjoqzb
// http://jsbin.com/kopisonewi/2/edit?html,js,output

const DEGREES_TO_RADIANS = Math.PI / 180.0;
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * DEGREES_TO_RADIANS;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
};

const drawArc = (end, radius, largeArcFlag, sweep) => {
  return `A ${radius} ${radius} 0 ${largeArcFlag} ${sweep} ${end.x} ${end.y}`;
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = 0;
  if (endAngle >= startAngle) {
    largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  } else {
    largeArcFlag = (endAngle + 360.0) - startAngle <= 180 ? 0 : 1;
  }
  const arc = drawArc(end, radius, largeArcFlag, 0);
  return `M ${start.x} ${start.y} ${arc}`;
};

const describeDonut = (innerRadius, outerRadius, startAngle, endAngle) => {
  const start1 = polarToCartesian(0, 0, outerRadius, endAngle);
  const end1 = polarToCartesian(0, 0, outerRadius, startAngle);
  const outerArc = drawArc(end1, outerRadius, 1, 0);
  const start2 = polarToCartesian(0, 0, innerRadius, endAngle);
  const end2 = polarToCartesian(0, 0, innerRadius, startAngle);
  const innerArc = drawArc(start2, innerRadius, 1, 1);
  const l1 = `M ${start2.x} ${start2.y} L ${start1.x} ${start1.y}`;
  const l2 = `L ${end2.x} ${end2.y}`;
  const donut = `${l1} ${outerArc} ${l2} ${innerArc}`;

  return donut;
};

class RotaryKnob extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    // onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 0,
    min: 0,
    max: 128,
  };

  componentWillMount() {
    this.d = describeDonut(28, 48, 30, 330);
  }

  render() {
    const {
      value, min, max, label,
    } = this.props;
    const valueRatio = (value - min) / (max - min); // Check this for -ve!
    const valueAngle = Math.round((valueRatio * 300)) + 30;
    const valuePath = describeArc(0, 0, 38, 30, valueAngle);
    const maskStyle = {
      fill: '#fff',
    };
    return (
      <div>
        <svg
          className="RotaryKnob"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-50 -50 100 100"
          width="50"
          height="50"
        >
          <g transform="rotate(180)">
            <g>
              <path
                className="RotaryKnob__Track"
                d={this.d}
                strokeLinecap="square"
              />
            </g>
            <g mask="url(#knob2)">
              <path className="RotaryKnob__Value" d={valuePath} />
            </g>
            <mask id="knob">
              <path id="mask" d={this.d} style={maskStyle} />
            </mask>
            <g>
              <path
                className="RotaryKnob__Outline"
                d={this.d}
                strokeLinecap="square"
              />
            </g>
          </g>
        </svg>
        <div className="RotaryKnob__label">{label} {value}</div>
        { /* <p className="RotaryKnob__Debug">
          {min}, {max}, {value}, {valueRatio}, {valueAngle}
        </p> */ }
      </div>
    );
  }
}

export default RotaryKnob;
