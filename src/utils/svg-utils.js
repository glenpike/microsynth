const DEGREES_TO_RADIANS = Math.PI / 180.0;
// We've shifted the rotation by 90 degrees here!  0 is up,
// whereas normally it would be on the rh x axis.
const polarToCartesian = (radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * DEGREES_TO_RADIANS;

  return {
    x: (radius * Math.cos(angleInRadians)),
    y: (radius * Math.sin(angleInRadians)),
  };
};


const drawArc = (end, radius, largeArcFlag, sweep) => `A ${radius} ${radius} 0 ${largeArcFlag} ${sweep} ${end.x} ${end.y}`;

const describeArc = (radius, startAngle, endAngle) => {
  const start = polarToCartesian(radius, endAngle);
  const end = polarToCartesian(radius, startAngle);

  let largeArcFlag = 0;
  if (endAngle >= startAngle) {
    largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  } else {
    largeArcFlag = (endAngle + 360.0) - startAngle <= 180 ? 0 : 1;
  }
  const arc = drawArc(end, radius, largeArcFlag, 0);
  return `M ${start.x} ${start.y} ${arc}`;
};

export {
  DEGREES_TO_RADIANS,
  polarToCartesian,
  drawArc,
  describeArc,
};
