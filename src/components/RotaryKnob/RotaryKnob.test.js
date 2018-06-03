/* global jest */
import React from 'react';
import { shallow } from 'enzyme';
import RotaryKnob from './RotaryKnob';

describe('RotaryKnob', () => {
  const onChange = jest.fn();
  const create = label =>
    shallow( // eslint-disable-line function-paren-newline
      <RotaryKnob label={label} onChange={onChange} />);

  it('should render a `.RotaryKnob`', () => {
    const wrapper = create('test');
    expect(wrapper.find('.RotaryKnob')).to.have.length(1);
  });
});
