import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { describeArc, drawArc, polarToCartesian, DEGREES_TO_RADIANS } from '../../utils/svg-utils';

// https://codepen.io/anon/pen/vjoqzb
// http://jsbin.com/kopisonewi/2/edit?html,js,output

const describeKnobDonut = ({
  innerRadius, outerRadius, startAngle, endAngle,
}) => {
  const start1 = polarToCartesian(outerRadius, endAngle);
  const end1 = polarToCartesian(outerRadius, startAngle);
  const start2 = polarToCartesian(innerRadius, endAngle);
  const end2 = polarToCartesian(innerRadius, startAngle);
  const outerArc = drawArc(end1, outerRadius, 1, 0);
  const innerArc = drawArc(start2, innerRadius, 1, 1);
  const line1 = `M ${start2.x} ${start2.y} L ${start1.x} ${start1.y}`;
  const line2 = `L ${end2.x} ${end2.y}`;
  return `${line1} ${outerArc} ${line2} ${innerArc}`;
};

/* Will return an x, y position based on the type of
   event, e.g. TouchEvent vs MouseEvent
*/
const getEventCoords = (e) => {
  let clientRoot = e;
  if (e.changedTouches && e.changedTouches.length) {
    [clientRoot] = e.changedTouches;
  }
  return { x: clientRoot.clientX, y: clientRoot.clientY };
};

class RotaryKnob extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    value: 0,
    min: 0,
    max: 128,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInteracting: false,
      mouseMoveListener: e => this.onMouseMove(e),
      mouseUpListener: e => this.onMouseUp(e),
      touchMoveListener: e => this.onMouseMove(e),
      touchEndListener: e => this.onMouseUp(e),
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

  onMouseDown(e) {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    // console.log('mousedown');
    this.calcValueChange(getEventCoords(e));
    const {
      mouseMoveListener, mouseUpListener, touchMoveListener, touchEndListener,
    } = this.state;
    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);
    document.addEventListener('touchmove', touchMoveListener);
    document.addEventListener('touchend', touchEndListener);
    this.setState({
      isInteracting: true,
    });
  }

  onMouseUp(e) {
    e.preventDefault();
    // console.log('mouseup');
    this.killListenersIfNeeded();
  }

  onMouseMove(e) {
    const { isInteracting } = this.state;
    if (isInteracting) {
      e.preventDefault();
      // console.log('mousemove');
      this.calcValueChange(getEventCoords(e));
    }
  }

  killListenersIfNeeded() {
    const { isInteracting } = this.state;
    if (isInteracting) {
      const {
        mouseMoveListener, mouseUpListener, touchMoveListener, touchEndListener,
      } = this.state;
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
      document.removeEventListener('touchmove', touchMoveListener);
      document.removeEventListener('touchend', touchEndListener);
      this.setState({ isInteracting: false });
    }
  }

  calcValueChange({ x, y }) {
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
      value, min, max, label, disabled,
    } = this.props;
    const { isInteracting } = this.state;
    const valueRatio = (value - min) / (max - min); // TODO: Check this for -ve!
    const valueAngle = Math.round((valueRatio * (endAngle - startAngle))) + startAngle;
    const arcLine = ((outerRadius - innerRadius) / 2) + innerRadius;
    const valuePath = describeArc(arcLine, startAngle, valueAngle);
    const maskStyle = {
      fill: '#fff',
    };
    return (
      <div className={`RotaryKnob${disabled ? ' RotaryKnob--disabled' : ''}`}
      >
        <svg
          ref={
            node => this.node = node // eslint-disable-line no-return-assign
          }
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="-50 -50 100 100"
          width="50"
          height="50"
          onMouseDown={e => this.onMouseDown(e)}
          onTouchStart={e => this.onMouseDown(e)}
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
        <p className="RotaryKnob__Label">
          {label}
          <br />{Math.round(value)}
        </p>
      </div>
    );
  }
}

export default RotaryKnob;
