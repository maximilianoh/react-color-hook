import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor } from '../../helpers/color';
import { red } from '../../example_color';
import Twitter from './Twitter'
import { render, fireEvent } from '@testing-library/react';

test('Twitter renders correctly', () => {
  const tree = renderer.create(
    <Twitter { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Material renders custom styles correctly', () => {
  const tree = renderer.create(
    <Twitter { ...red } styles={{ default: { card: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('0 0 10px red')
})

test('Twitter `triangle="hide"`', () => {
  const tree = renderer.create(
    <Twitter { ...red } triangle="hide" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Twitter `triangle="top-right"`', () => {
  const tree = renderer.create(
    <Twitter { ...red } triangle="top-right" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('Twitter onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })

  const { queryByTitle } = render( <Twitter { ...red } onChange={ changeSpy } />)
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const firstSwatch = queryByTitle("#FF6900");
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
})

test('Twitter with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render( <Twitter { ...red } onSwatchHover={ hoverSpy } />)
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const firstSwatch = queryByTitle("#FF6900")
  fireEvent(firstSwatch, event);
  expect(hoverSpy).toHaveBeenCalled();

})
