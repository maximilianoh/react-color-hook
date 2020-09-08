import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor, red } from '../../helpers/color'
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
