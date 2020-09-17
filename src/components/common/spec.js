import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { simpleCheckForValidColor } from '../../helpers/color';
import { red } from '../../example_color';
import Alpha from "./Alpha";
import Block from "../block/Block";
import Compact from "../compact/Compact";
import CanvasRenderingContext2DEvent from "jest-canvas-mock";
import Hue from './Hue';
import Swatch from "./Swatch";
import Saturation from "./Saturation";

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    value: 16,
  });
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { 
    configurable: true, value: 310 
  });
});



jest.mock("lodash/debounce", () =>
  jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  })
);

test('common Alpha empty event not change', () => {
  const { rerender } = render(<Alpha {...red} a={1} />);
  const event = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(event, 'pageX', {get: () => 0});
  Object.defineProperty(event, 'pageY', {get: () => 10});
  let alphaPointer = document.querySelector("div").children[0].children[2];
  fireEvent(alphaPointer, event);
  rerender(<Alpha {...red} a={0} />);
  alphaPointer = document.querySelector("div").children[0].children[2];
  fireEvent(alphaPointer, event);
});

test('Block onChangeComplete events correctly', async () => {
  let times = 0;
  const handleChangeComplete = () => { times+=1; };
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  });
  //crear function onchange
  const {queryByTitle} = render(<Block onChange={ changeSpy } 
    onChangeComplete={handleChangeComplete} 
  />);
  
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const firstSwatch = queryByTitle("#D9E3F0");
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
  expect(times).toBe(1);
  const secondSwatch = queryByTitle("#F47373");
  fireEvent.click(secondSwatch);
  expect(times).toBe(2);

  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(firstSwatch, event);
});


test('Compact onChange events correctly', async () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  });
  render(<Compact { ...red } onChange={ changeSpy } />);
  const inp = document.querySelector("input"); 
  fireEvent.change(inp, { target: { value: 'notcolorvalid' } });
  expect(changeSpy).not.toHaveBeenCalled();
});


test('common Alpha empty event not change', () => {
  const { rerender } = render(<Hue {...red} a={1} />);
  const event = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(event, 'pageX', {get: () => 0});
  Object.defineProperty(event, 'pageY', {get: () => 10});
  let alphaPointer = document.querySelector("div").children[0].children[0];
  fireEvent(alphaPointer, event);
  
  rerender(<Hue {...red} a={0.5} />);
  const event2 = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(event2, 'pageX', {get: () => 100});
  Object.defineProperty(event2, 'pageY', {get: () => 10});
  alphaPointer = document.querySelector("div").children[0].children[0];
  fireEvent(alphaPointer, event2);
});


test('Swatch empty events', async () => {
  render(<Swatch color='transparent' focus={true} />);
  const but = document.querySelector("[role='button']"); 
  fireEvent.click(but);
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(but, event);
  fireEvent.keyDown(but, { key: 'Enter', code: 'Enter' });
  fireEvent.keyDown(but, { key: 'A', code: 'keyA' });

});


test('Saturation empty events', async () => {
  render(<Saturation hsv={{h:100, s:50, v:50}} hsl={{h:100, s:66.67, l:75}} />);
  const but = document.querySelector("[role='button']"); 
  const touchs = [{ pageX: 90, pageY: 15 }];
  fireEvent.touchStart(but, { touches: touchs});
});
