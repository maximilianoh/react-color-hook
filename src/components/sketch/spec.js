import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor, red } from '../../helpers/color'
import Sketch from './Sketch'
import SketchFields from './SketchFields'
import SketchPresetColors from './SketchPresetColors'
import CanvasRenderingContext2DEvent from "jest-canvas-mock";
import { render, fireEvent } from '@testing-library/react';

test('Sketch renders correctly', () => {
  const tree = renderer.create(
    <Sketch {...red} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sketch renders on server correctly', () => {
  const tree = renderer.create(
    <Sketch renderers={CanvasRenderingContext2DEvent} {...red} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('Sketch onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render( <Sketch onChange={ changeSpy } />)
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const firstSwatch = queryByTitle("#D0021B");
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
})

test('Sketch with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render( <Sketch onSwatchHover={ hoverSpy } />)
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const firstSwatch = queryByTitle("#D0021B")
  fireEvent(firstSwatch, event);
  expect(hoverSpy).toHaveBeenCalled();
})

test('Sketch renders custom styles correctly', () => {
  const tree = renderer.create(
    <Sketch styles={{ default: { picker: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})

test('SketchFields renders correctly', () => {
  const tree = renderer.create(
    <SketchFields {...red} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SketchPresetColors renders correctly', () => {
  const tree = renderer.create(
    <SketchPresetColors colors={['#fff', '#999', '#000']} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SketchPresetColors with custom titles renders correctly', () => {
  const colors = [
    {
      color: '#fff',
      title: 'white',
    },
    {
      color: '#999',
      title: 'gray',
    },
    {
      color: '#000',
    },
    '#f00',
  ]
  const tree = renderer.create(
    <SketchPresetColors colors={colors} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
