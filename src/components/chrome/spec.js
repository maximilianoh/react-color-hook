import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor, red } from '../../helpers/color'
import Chrome from './Chrome'
import ChromeFields from './ChromeFields'
import ChromePointer from './ChromePointer'
import ChromePointerCircle from './ChromePointerCircle'
import { render, fireEvent } from '@testing-library/react';
import CanvasRenderingContext2DEvent from "jest-canvas-mock";

test('Chrome renders correctly', () => {
  const tree = renderer.create(
    <Chrome {...red} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

test('Chrome onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const { rerender } = render(<Chrome {...red} onChange={changeSpy} />);
  expect(changeSpy).toHaveBeenCalledTimes(0)


  // root divs elements
  const flexboxFix = document.querySelector(".flexbox-fix").children;
  const chromePicker = document.querySelector(".chrome-picker").children;

  // Event mousedown
  const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(mousedownEvent, 'pageX', { get: () => 100 });
  Object.defineProperty(mousedownEvent, 'pageY', { get: () => 10 });

  // check the Alpha component
  const alphaPointer = flexboxFix[1].children[1].children[0].children[2];
  fireEvent(alphaPointer, mousedownEvent);
  expect(changeSpy).toHaveBeenCalledTimes(1);


  // check Saturation
  const saturationPointer = chromePicker[0].children[0];
  fireEvent(saturationPointer, mousedownEvent);
  expect(changeSpy).toHaveBeenCalledTimes(2);


  // check the Hue component
  const huePointer = flexboxFix[1].children[0].children[0].children[0];
  fireEvent(huePointer, mousedownEvent);
  expect(changeSpy).toHaveBeenCalledTimes(3);


  // check the ChromeFields
  const chromePointer = chromePicker[1].children[1].children[1].children[0];
  expect(chromePicker[1].children[1].textContent).toBe('hex');
  fireEvent.click(chromePointer);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  rerender(<Chrome {...red} onChange={changeSpy} />)
  expect(chromePicker[1].children[1].textContent).toBe('rgba');
  fireEvent.click(chromePointer);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  rerender(<Chrome {...red} onChange={changeSpy} />)
  expect(chromePicker[1].children[1].textContent).toBe('hsla');
  fireEvent.click(chromePointer);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  rerender(<Chrome {...red} onChange={changeSpy} />)
  expect(chromePicker[1].children[1].textContent).toBe('hex');
})

test('Chrome renders on server correctly', () => {
  const tree = renderer.create(
    <Chrome renderers={CanvasRenderingContext2DEvent} {...red} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('ChromePointer renders correctly', () => {
  const tree = renderer.create(
    <ChromePointer />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ChromePointerCircle renders correctly', () => {
  const tree = renderer.create(
    <ChromePointerCircle />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ChromeFields renders correctly', () => {
  const tree = renderer.create(
    <ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}} 
    hex="#194D33" onChange={()=>{}} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Chrome renders custom styles correctly', () => {
  const tree = renderer.create(
    <Chrome styles={{ default: { picker: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})

test('Chrome renders correctly with width', () => {
  const tree = renderer.create(
    <Chrome width={300} />,
  ).toJSON()
  expect(tree.props.style.width).toBe(300)
});
