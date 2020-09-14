import React from 'react'
import renderer from 'react-test-renderer'
import  { simpleCheckForValidColor } from '../../helpers/color';
import { red } from '../../example_color';
import { render, fireEvent } from '@testing-library/react';
import Swatches from './Swatches'
import SwatchesColor from './SwatchesColor'
import SwatchesGroup from './SwatchesGroup'

test('Swatches renders correctly', () => {
  const tree = renderer.create(
    <Swatches hex={ red.hex } colors={ [['#fff'], ['#333']] } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Swatches renders custom styles correctly', () => {
  const tree = renderer.create(
    <Swatches hex={ red.hex } colors={ [['#fff'], ['#333']] } styles={{ default: { picker: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('0 0 10px red')
})

test('Swatches onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  });

  const {queryByTitle} = render(<Swatches onChange={ changeSpy } />);
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const firstSwatch = queryByTitle("#b71c1c")
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();

})

test('Swatches with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })

  const {queryByTitle} = render(<Swatches onSwatchHover={ hoverSpy } 
    colors={ [['#004d40'], ['#333'], ['#b71c1c'], ['#hhhhhh']] } />);
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const swatch3 = queryByTitle("#b71c1c");
  fireEvent(swatch3, event);
  expect(hoverSpy).toHaveBeenCalledTimes(1);
  
})

test('SwatchesColor renders correctly', () => {
  const tree = renderer.create(
    <SwatchesColor />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SwatchesColor renders with props', () => {
  const tree = renderer.create(
    <SwatchesColor active first last />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SwatchesGroup renders correctly', () => {
  const tree = renderer.create(
    <SwatchesGroup active={ red.hex } group={ ['#fff'] } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('Swatches empty events', () => {
  render(<SwatchesGroup active={ red.hex } group={ ['#ffffff','#000000'] }  />);
  const d = document.querySelector("div").children[0].children;
  expect(d.length).toBe(2);
  fireEvent.click(d[0].children[0]);
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(d[0].children[0], event);
})


test('SwatchesColor empty events', () => {
  render(<SwatchesColor active first last />);
  const d = document.querySelector("div").children[0].children[0];
  fireEvent.click(d);
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(d, event);
})