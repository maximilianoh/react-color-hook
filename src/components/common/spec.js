import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { simpleCheckForValidColor } from '../../helpers/color';
import { red } from '../../example_color';
import Alpha from "./Alpha";
import Block from "../block/Block";
import Compact from "../compact/Compact";
import CanvasRenderingContext2DEvent from "jest-canvas-mock";

jest.mock("lodash/debounce", () =>
  jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  })
);

test('common Alpha empty event not change', () => {
  const { rerender } = render(<Alpha {...red} a={1} />);
  const event = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(event, 'pageX', {get: () => 100});
  Object.defineProperty(event, 'pageY', {get: () => 10});
  let alphaPointer = document.querySelector("div").children[0].children[2];
  fireEvent(alphaPointer, event);
  
  rerender(<Alpha {...red} />);
  alphaPointer = document.querySelector("div").children[0].children[2];
  fireEvent(alphaPointer, event);
})

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


