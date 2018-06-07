/* global jest */
import React from 'react';
import { mount } from 'enzyme';
import simulant from 'jsdom-simulant';
import RotaryKnob from './RotaryKnob';

describe('RotaryKnob', () => {
  const create = (params) => {
    const {
      onChange = () => {},
      label = 'test',
      disabled = false,
      value = 0,
      min = 0,
      max = 100,
    } = params || {};
    return mount( // eslint-disable-line function-paren-newline
      <RotaryKnob
        label={label}
        onChange={onChange}
        disabled={disabled}
        value={value}
        min={min}
        max={max}
      />,
      { attachTo: document.getElementById('root') },
    );
  };

  it('should render a `.RotaryKnob`', () => {
    const wrapper = create();
    expect(wrapper.find('.RotaryKnob')).to.have.length(1);
  });

  const testChildren = (childName, disabled = false) => {
    const wrapper = create({ disabled });
    expect(wrapper.find(childName)).to.have.length(1);
  };

  it('should render a `.RotaryKnob__Label`', () => {
    testChildren('.RotaryKnob__Label');
  });

  it('should render a `.RotaryKnob__Track`', () => {
    testChildren('.RotaryKnob__Track');
  });

  it('should render a `.RotaryKnob__Outline`', () => {
    testChildren('.RotaryKnob__Outline');
  });

  it('should render a `.RotaryKnob__Value`', () => {
    testChildren('.RotaryKnob__Value');
  });

  it('should render disabled correctly', () => {
    testChildren('.RotaryKnob--disabled', true);
  });

  it('should render my label text', () => {
    const labelText = 'my label';
    const wrapper = create({ label: labelText });
    const label = wrapper.find('.RotaryKnob__Label');
    expect(label.text()).to.contain(labelText);
  });

  it('should render my label value', () => {
    const value = 50;
    const wrapper = create({ value });
    const label = wrapper.find('.RotaryKnob__Label');
    expect(label.text()).to.contain(value);
  });

  const sendDownEvent = (type = 'mousedown', disabled = false) => {
    const onChange = jest.fn();
    const wrapper = create({ value: 40, onChange, disabled });
    const svg = wrapper.find('svg');
    let params = { clientX: 45, clientY: 25 };
    if (type === 'touchstart') {
      params = {
        changedTouches: [params],
      };
    }
    // if we click it top-centre, that's halfway
    svg.simulate(type, params);
    if (disabled) {
      expect(onChange).toHaveBeenCalledTimes(0);
    } else {
      expect(onChange).toHaveBeenCalledWith(80);
    }
    return { wrapper, onChange };
  };

  it('should send a value on mouseDown', () => {
    sendDownEvent('mousedown');
  });

  it('should send a value on touchStart', () => {
    sendDownEvent('touchstart');
  });

  it('shouldn\'t send a value on mouseDown if disabled', () => {
    sendDownEvent('mousedown', true);
  });

  it('shouldn\'t send a value on mouseDown if disabled', () => {
    sendDownEvent('touchstart', true);
  });

  it('should become active on mouseDown', () => {
    const { wrapper } = sendDownEvent('mousedown');
    expect(wrapper.find('.RotaryKnob__Outline--active')).to.have.length(1);
  });

  it('should become active on touchStart', () => {
    const { wrapper } = sendDownEvent('touchstart');
    expect(wrapper.find('.RotaryKnob__Outline--active')).to.have.length(1);
  });

  it('shouldn\'t  become active on mouseDown if disabled', () => {
    const { wrapper } = sendDownEvent('mousedown', true);
    expect(wrapper.find('.RotaryKnob__Outline--active')).to.have.length(0);
  });

  it('shouldn\'t  become active on touchStart if disabled', () => {
    const { wrapper } = sendDownEvent('touchstart', true);
    expect(wrapper.find('.RotaryKnob__Outline--active')).to.have.length(0);
  });

  it('should send a value on mouseMove', () => {
    const { onChange } = sendDownEvent('mousedown');
    simulant.fire(document, 'mousemove', { clientX: 25, clientY: -20 });
    expect(onChange).toHaveBeenLastCalledWith(50);
  });

  it('should send a value on touchMove', () => {
    const { onChange } = sendDownEvent('touchstart');
    const touchPosition = {
      changedTouches: [{
        clientX: 25,
        clientY: -20,
      }],
    };
    simulant.fire(document, 'touchmove', touchPosition);
    expect(onChange).toHaveBeenLastCalledWith(50);
  });

  it('should become inactive on mouseUp', () => {
    const { wrapper } = sendDownEvent('mousedown');
    simulant.fire(document, 'mouseup');
    wrapper.update();
    expect(wrapper.find('.RotaryKnob__Outline--active')).to.have.length(0);
  });

  it('should become inactive on touchEnd', () => {
    const { wrapper } = sendDownEvent('touchstart');
    simulant.fire(document, 'touchend');
    wrapper.update();
    expect(wrapper.find('.RotaryKnob__Outline--active')).to.have.length(0);
  });
});
