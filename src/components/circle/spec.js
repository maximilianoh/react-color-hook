import React from 'react'
import renderer from 'react-test-renderer'

import Circle from './Circle'
import CircleSwatch from './CircleSwatch'
import {simpleCheckForValidColor} from '../../helpers/color'
import { render, fireEvent } from '@testing-library/react';

test('Circle renders correctly', () => {
  const tree = renderer.create(
    <Circle />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Circle onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render( <Circle onChange={ changeSpy } />)
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const circleSwatch = queryByTitle("#f44336");
  fireEvent.click(circleSwatch);
  expect(changeSpy).toHaveBeenCalled();
})


test('Circle with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  });
  const {queryByTitle} = render( <Circle onSwatchHover={ hoverSpy } />);
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const circleSwatch = queryByTitle("#f44336");
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(circleSwatch, event);
  expect(hoverSpy).toHaveBeenCalled();

})

test('Circle renders custom styles correctly', () => {
  const tree = renderer.create(
    <Circle styles={{ default: { card: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})

test('CircleSwatch renders correctly', () => {
  const tree = renderer.create(
    <CircleSwatch />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('CircleSwatch renders with sizing and spacing', () => {
  const tree = renderer.create(
    <CircleSwatch circleSize={ 40 } circleSpacing={ 40 } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
