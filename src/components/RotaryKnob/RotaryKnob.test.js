/* global jest */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import RotaryKnob from './RotaryKnob';
import {jsdom} from 'jsdom';

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
const doc = jsdom(documentHTML);

describe('RotaryKnob', () => {
  const onChange = jest.fn();
  const create = (params) => {
    const { label = 'test', disabled = false, value = 0 } = params || {};
    return mount( // eslint-disable-line function-paren-newline
      <RotaryKnob label={label} onChange={onChange} disabled={disabled} value={value} />,
      { attachTo: doc.getElementById('root') },
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

  // it('should send a value on mouseDown', () => {
  //   const wrapper = create({ value: 40 });
  //   const top = doc.querySelector('svg');
  //   // const top = wrapper.find('svg').at(0).getElement();
  //   const mouseMove = new Event('mousedown');  // creates a new event
  //   mouseMove.clientX = 20;
  //   mouseMove.clientY = 25;
  //   top.dispatchEvent(mouseMove);
  //   expect(onChange).to.have.been.called();
  // });
});
