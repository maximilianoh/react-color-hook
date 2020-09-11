import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor } from '../../helpers/color';
import { red } from '../../example_color';
import { render, fireEvent } from '@testing-library/react';
import Compact from './Compact'
import CompactColor from './CompactColor'
import CompactFields from './CompactFields'


test('Compact renders correctly', () => {
  const tree = renderer.create(
    <Compact { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Compact with onSwatchHover renders correctly', () => {
  const { container } = render(
    <Compact { ...red } onSwatchHover={ () => {} } />
  );
  expect(container).toMatchSnapshot();
})


test('Compact onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  });
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const {queryByTitle} = render(<Compact { ...red } onChange={ changeSpy } />);
  const firstSwatch = queryByTitle('#4D4D4D');
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
  const field_h = document.querySelector(".compact-picker .flexbox-fix").children[1];
  fireEvent.change(field_h.children[0], { target: {value : '#4D4D44' }});
  expect(changeSpy).toHaveBeenCalledTimes(2);
  const field_r = document.querySelector(".compact-picker .flexbox-fix").children[2];
  fireEvent.change(field_r.children[0], { target: {value : '78' }});
  expect(changeSpy).toHaveBeenCalledTimes(3);
  const field_g = document.querySelector(".compact-picker .flexbox-fix").children[3];
  fireEvent.change(field_g.children[0], { target: {value : '78' }});
  expect(changeSpy).toHaveBeenCalledTimes(4);
})


test('Compact with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const {queryByTitle} = render(<Compact { ...red } onSwatchHover={ hoverSpy } />);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const firstSwatch = queryByTitle('#4D4D4D');
  fireEvent(firstSwatch, event);
  expect(hoverSpy).toHaveBeenCalled();
})


test('CompactColor renders correctly', () => {
  const tree = renderer.create(
    <CompactColor />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('CompactFields renders correctly', () => {
  const tree = renderer.create(
    <CompactFields { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Compact renders custom styles correctly', () => {
  const tree = renderer.create(
    <Compact { ...red } styles={{ default: { wrap: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('0 0 10px red')
})


test('CompactColor onChange events empty', () => {
  const {queryByTitle} = render(<CompactColor color='#4D4D4D'  />);
  const firstSwatch = queryByTitle('#4D4D4D');
  fireEvent.click(firstSwatch);
  const event = new MouseEvent('mouseover', { bubbles: true });
  fireEvent(firstSwatch, event);
})

test('CompactField onChange empty', () => {
  render(<CompactFields { ...red }  />);
  const field_g = document.querySelector(".flexbox-fix").children[3];
  fireEvent.change(field_g.children[0], { target: {value : '78' }});
})