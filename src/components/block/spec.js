import React from 'react'
import renderer from 'react-test-renderer'
import Block from './Block'
import BlockSwatches from './BlockSwatches'
import { simpleCheckForValidColor} from '../../helpers/color'
import { render, fireEvent } from '@testing-library/react';

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
  const firstSwatch = queryByTitle("#D9E3F0")
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
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
