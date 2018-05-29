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

const describeKnobDonut = ({
  innerRadius, outerRadius, startAngle, endAngle,
}) => {
  const start1 = polarToCartesian(0, 0, outerRadius, endAngle);
  const end1 = polarToCartesian(0, 0, outerRadius, startAngle);
  const start2 = polarToCartesian(0, 0, innerRadius, endAngle);
  const end2 = polarToCartesian(0, 0, innerRadius, startAngle);
  const outerArc = drawArc(end1, outerRadius, 1, 0);
  const innerArc = drawArc(start2, innerRadius, 1, 1);
  const line1 = `M ${start2.x} ${start2.y} L ${start1.x} ${start1.y}`;
  const line2 = `L ${end2.x} ${end2.y}`;
  return `${line1} ${outerArc} ${line2} ${innerArc}`;
};

class RotaryKnob extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 0,
    min: 0,
    max: 128,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInteracting: false,
      mouseMoveListener: e => this.onMouseMove(e),
      mouseUpListener: e => this.onMouseUp(e),
      // touchMoveListener: e => this.onTouchMove(e),
      // touchEndListener: e => this.onMouseUp(e),
      x: 0,
      y: 0,
    };
    // Radius should account for border - we
    // could inline style that?
    // Should this be in state?
    this.config = {
      startAngle: 30,
      endAngle: 330,
      outerRadius: 48,
      innerRadius: 28,
    };
  }

  componentWillMount() {
    this.d = describeKnobDonut(this.config);
  }

  componentWillUnmount() {
    this.killListenersIfNeeded();
  }

  // onTouchStart(e) {
  //   e.preventDefault();
  //   this.handleChangeStart(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  // }

  onMouseDown(e) {
    e.preventDefault();
    this.handleChangeStart(e.clientX, e.clientY);
  }

  onMouseUp(e) {
    e.preventDefault();
    this.killListenersIfNeeded();
  }

  // onTouchMove(e) {
  //   const { isInteracting } = this.state;
  //   if (isInteracting) {
  //     e.preventDefault();
  //     this.calcValueChange(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  //   }
  // }

  onMouseMove(e) {
    const { isInteracting } = this.state;
    if (isInteracting) {
      e.preventDefault();
      this.calcValueChange(e.clientX, e.clientY);
    }
  }

  handleChangeStart(x, y) {
    this.calcValueChange(x, y);
    const {
      mouseMoveListener, mouseUpListener, touchMoveListener, touchEndListener,
    } = this.state;
    window.addEventListener('mousemove', mouseMoveListener);
    window.addEventListener('mouseup', mouseUpListener);
    window.addEventListener('touchmove', touchMoveListener);
    window.addEventListener('touchend', touchEndListener);
    this.setState({
      isInteracting: true,
    });
  }

  killListenersIfNeeded() {
    const { isInteracting } = this.state;
    if (isInteracting) {
      const {
        mouseMoveListener, mouseUpListener, touchMoveListener, touchEndListener,
      } = this.state;
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('mouseup', mouseUpListener);
      window.removeEventListener('touchmove', touchMoveListener);
      window.removeEventListener('touchend', touchEndListener);
      this.setState({ isInteracting: false });
    }
  }

  calcValueChange(x, y) {
    /*
      Works out the angle of the mouse position
      relative to the centre of the Knob, then
      maps this back to a value.
    */
    const { startAngle, endAngle } = this.config;
    const pos = this.node.getBoundingClientRect();
    const centreX = pos.x + (pos.width / 2);
    const centreY = pos.y + (pos.height / 2);
    const dX = x - centreX;
    const dY = y - centreY;
    // Because we rotated the SVG 180, we remap the angle (mouse 0 is +x axis)
    let valueAngle = ((Math.atan2(dY, dX) / DEGREES_TO_RADIANS) + 270) % 360;
    valueAngle = Math.min(endAngle, Math.max(startAngle, valueAngle));
    // console.log(`calcValueChange: ${dX}, ${dY} = ${valueAngle}`);
    const valueRatio = (valueAngle - startAngle) / (endAngle - startAngle);
    const {
      min, max, onChange,
    } = this.props;
    const value = (valueRatio * (max - min)) + min;
    // console.log(`calcValueChange: ${valueRatio}, ${value}`);
    onChange(value);
  }


  render() {
    const {
      startAngle, endAngle, innerRadius, outerRadius,
    } = this.config;
    const {
      value, min, max, label,
    } = this.props;
    const { isInteracting, x, y } = this.state;
    const valueRatio = (value - min) / (max - min); // TODO: Check this for -ve!
    const valueAngle = Math.round((valueRatio * (endAngle - startAngle))) + startAngle;
    const arcLine = ((outerRadius - innerRadius) / 2) + innerRadius;
    const valuePath = describeArc(0, 0, arcLine, startAngle, valueAngle);
    const maskStyle = {
      fill: '#fff',
    };
    return (
      <div>
        <svg
          ref={
            node => this.node = node // eslint-disable-line no-return-assign
          }
          className="RotaryKnob"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-50 -50 100 100"
          width="50"
          height="50"
          onMouseDown={e => this.onMouseDown(e)}
          onTouchStart={null /* e => this.onMouseDown(e) */}
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
                className={`RotaryKnob__Outline${isInteracting ? '--active' : ''}`}
                d={this.d}
                strokeLinecap="square"
              />
            </g>
          </g>
        </svg>
        <p className="RotaryKnob__label">
          {label}
          <br />{Math.round(value)}
        </p>
        {
          /* <p className="RotaryKnob__Debug">
            {x}, {y}
          </p> */
        }
      </div>
    );
  }
}

export default RotaryKnob;
