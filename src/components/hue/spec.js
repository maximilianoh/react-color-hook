import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react';
import { red } from '../../helpers/color'
import Hue from './Hue'
import HuePointer from './HuePointer'

test('Hue renders correctly', () => {
  const tree = renderer.create(
    <Hue { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Hue renders vertically', () => {
  const tree = renderer.create(
    <Hue { ...red } width={ 20 } height={ 200 } direction="vertical" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Hue renders custom styles correctly', () => {
  const tree = renderer.create(
    <Hue { ...red } styles={{ default: { picker: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('0 0 10px red')
})

test('HuePointer renders correctly', () => {
  const tree = renderer.create(
    <HuePointer />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('Hue onChange events correctly', () => {
  const changeSpy = jest.fn(() => {});
  render(<Hue { ...red } onChange={ changeSpy } />);
  const hue = document.querySelector(".hue-picker").children[0];
  const event = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(event, 'pageX', {get: () => 100});
  Object.defineProperty(event, 'pageY', {get: () => 10});
  console.dir(hue.children[0]);
  fireEvent(hue.children[0], event);
  expect(changeSpy).toHaveBeenCalledTimes(1);
})
