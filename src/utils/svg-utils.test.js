import { polarToCartesian, describeArc } from './svg-utils';

describe('svg-utils', () => {
  const radius = 2;
  const sqrt2 = Math.sqrt(radius).toFixed(3);

  describe('polarToCartesian', () => {
    function checkCartesianXY(angle, isNegative = false, axis = 'x') {
      const multiplier = isNegative ? -1 : 1;
      const expected = multiplier * sqrt2;
      const result = polarToCartesian(radius, angle);
      expect(+result[axis].toFixed(3)).toEqual(expected);
    }

    it('should return correct x value quadrant 1`', () => {
      checkCartesianXY(45);
    });

    it('should return correct x value quadrant 2`', () => {
      checkCartesianXY(135);
    });

    it('should return correct x value quadrant 3`', () => {
      checkCartesianXY(-135, true);
    });

    it('should return correct x value quadrant 4`', () => {
      checkCartesianXY(-45, true);
    });

    it('should return correct y value quadrant 1`', () => {
      checkCartesianXY(45, true, 'y');
    });

    it('should return correct y value quadrant 2`', () => {
      checkCartesianXY(135, false, 'y');
    });

    it('should return correct y value quadrant 3`', () => {
      checkCartesianXY(-135, false, 'y');
    });

    it('should return correct y value quadrant 4`', () => {
      checkCartesianXY(-45, true, 'y');
    });
  });

  // Do we care about this if we can render a knob correctly? (Test the things we don't with that)
  describe('describeArc', () => {
    // test small angle and large angle?
    it('can describe an arc correctly ', () => {
      const arc = describeArc(radius, 0, 45);
      const match = /M ([^\s]+) ([^\s]+) A ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+) ([^\s]+)/.exec(arc);
      expect(match).to.not.equal(null);
      const [ whole, x, y, rad1, rad2, ignore, sweep, largeArc, endX, endY ] = match;
      expect((+x).toFixed(3)).to.equal(sqrt2);
      expect((-y).toFixed(3)).to.equal(sqrt2);
      expect(+rad1).to.equal(radius);
      expect(+rad2).to.equal(radius);
      expect(+ignore).to.equal(0);
      expect(+sweep).to.equal(0);
      expect(+largeArc).to.equal(0);
      expect(Math.round(+endX)).to.equal(0);
      expect(Math.round(+endY)).to.equal(-2);
    });
  });
});
