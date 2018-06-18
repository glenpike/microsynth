import React from 'react';
import { shallow } from 'enzyme';
import ControlGroup from './ControlGroup';

describe('ControlGroup', () => {
  const create = extraClasses =>
    shallow( // eslint-disable-line function-paren-newline
      <ControlGroup extraClasses={extraClasses}>
        <p>This is a test</p>
        <span>And another</span>
      </ControlGroup>);

  it('should render a `.ControlGroup`', () => {
    const wrapper = create();
    expect(wrapper.find('.ControlGroup')).to.have.length(1);
  });
  it('should render a `.clear`', () => {
    const wrapper = create();
    expect(wrapper.find('.clear')).to.have.length(1);
  });
  it('should render extra classes', () => {
    const testClass = 'test';
    const wrapper = create(testClass);
    expect(wrapper.find(`.${testClass}`)).to.have.length(1);
  });
  it('should render extra classes', () => {
    const wrapper = create();
    expect(wrapper.children()).to.have.length(2);
  });
});
