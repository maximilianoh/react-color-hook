import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor } from '../../helpers/color';
import { red } from '../../example_color';
import Sketch from './Sketch'
import SketchFields from './SketchFields'
import SketchPresetColors from './SketchPresetColors'
import CanvasRenderingContext2D from "jest-canvas-mock";
import { render, fireEvent } from '@testing-library/react';

test('Sketch renders correctly', () => {
  const tree = renderer.create(
    <Sketch {...red} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Sketch renders on server correctly', () => {
  const { container } = render(
    <Sketch renderers={CanvasRenderingContext2D} {...red} />
  );
  expect(container).toMatchSnapshot();
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
});

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
  render(<SketchPresetColors colors={colors} />);
  const b = document.querySelectorAll('[role="button"]');
  expect(b.length).toBe(colors.length);
  
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(b[0], event);
  fireEvent.click(b[0]);
});

test('SketchFields empty events', () => {
  render(<SketchFields {...red} />);
  const inp = document.querySelectorAll('input');
  expect(inp.length).toBe(5);
  fireEvent.change(inp[0], { target: {value : 'FFFFFF' }});
})

test('SketchFields events', () => {
  const changeSpy = jest.fn(() => {});
  render(<SketchFields { ...red } onChange={changeSpy} />);
  const inp = document.querySelectorAll('input'); //7
  expect(changeSpy).toHaveBeenCalledTimes(0);
  fireEvent.change(inp[0], { target: {value : 'FFFFFF' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  fireEvent.change(inp[0], { target: {value : 'wrong' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  fireEvent.change(inp[1], { target: {value : '10' }});
  expect(changeSpy).toHaveBeenCalledTimes(2);
  fireEvent.change(inp[2], { target: {value : '110' }});
  expect(changeSpy).toHaveBeenCalledTimes(3);
  fireEvent.change(inp[3], { target: {value : '250' }});
  expect(changeSpy).toHaveBeenCalledTimes(4);
  fireEvent.change(inp[4], { target: {value : '50' }});
  expect(changeSpy).toHaveBeenCalledTimes(5);
  fireEvent.change(inp[4], { target: {value : '-10' }});
  expect(changeSpy).toHaveBeenCalledTimes(6);
  fireEvent.change(inp[4], { target: {value : '150' }});
  expect(changeSpy).toHaveBeenCalledTimes(7);
})