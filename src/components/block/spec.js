import React from 'react'
import renderer from 'react-test-renderer'
import Block from './Block'
import BlockSwatches from './BlockSwatches'
import { simpleCheckForValidColor} from '../../helpers/color'
import { render, fireEvent } from '@testing-library/react';
import CanvasRenderingContext2D from "jest-canvas-mock";

test('Block renders correctly', () => {
  const tree = renderer.create(
    <Block />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})




test('Block onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render(<Block onChange={ changeSpy } />);
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const firstSwatch = queryByTitle("#D9E3F0");
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
});

test('Block onChange events incorrectly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  render(<Block onChange={ changeSpy } />);
  const input = document.querySelector(".block-picker").children[2].children[1]; // edit input
  fireEvent.change(input.children[0], { target: { value: 'notcolorvalid' } });
  expect(changeSpy).not.toHaveBeenCalled();

});


test('Block with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })

  const {queryByTitle} = render(<Block onSwatchHover={ hoverSpy } />);
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const firstSwatch = queryByTitle("#D9E3F0")
  fireEvent(firstSwatch, event);
  expect(hoverSpy).toHaveBeenCalled();
})

test('Block `triangle="hide"`', () => {
  const tree = renderer.create(
    <Block triangle="hide" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Block `triangle="hide"`', () => {
  const tree = renderer.create(
    <Block triangle="hide" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('BlockSwatches renders correctly', () => {
  const tree = renderer.create(
    <BlockSwatches colors={ ['#fff', '#999', '#000'] } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Block renders custom styles correctly', () => {
  const tree = renderer.create(
    <Block styles={{ default: { card: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})


test('Block transparent', () => {
  render(<Block hex='transparent' />);
  const div = document.querySelector(".block-picker").children[1]; // title
  expect(div.children.length).toBe(2);
  expect(div.children[1].textContent).toBe('TRANSPARENT');
});

test('Block without function', () => {
  const { container } = render(
    <BlockSwatches colors={ ['#fff', '#999', '#000'] } />
  );
  
  const div = document.querySelector("div").children[0]; //swatches
  fireEvent.click(div.children[0].children[0]);
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(div.children[0].children[0], event);
  
  expect(container).toMatchSnapshot();
});