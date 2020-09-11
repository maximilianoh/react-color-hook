import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react';
import { red, yel, br } from '../../example_color';
import Slider from './Slider'
import SliderPointer from './SliderPointer'
import SliderSwatch from './SliderSwatch'
import SliderSwatches from './SliderSwatches'

test('Slider renders correctly', () => {
  const tree = renderer.create(
    <Slider { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Slider renders custom styles correctly', () => {
  const tree = renderer.create(
    <Slider styles={{ default: { wrap: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})


test('SliderPointer renders correctly', () => {
  const tree = renderer.create(
    <SliderPointer />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SliderSwatch renders correctly', () => {
  const tree = renderer.create(
    <SliderSwatch { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('SliderSwatches renders correctly', () => {
  const tree = renderer.create(
    <SliderSwatches { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
});


test('SliderSwatch empty event', () => {
  render(<SliderSwatch { ...red } />);
  const d = document.querySelector("div");
  fireEvent.click(d.children[0]);
})


test('SliderSwatches empty event', () => {
  render(<SliderSwatches { ...red } />);
  const d = document.querySelector("div div");
  expect(d.children.length).toBe(6);
  fireEvent.click(d.children[0].children[0]);
});

test('SliderSwatches color epsilon', () => {
  render(<SliderSwatches { ...yel } />);
  const d = document.querySelector("div div");
  expect(d.children.length).toBe(6);
  fireEvent.click(d.children[0].children[0]);
});

test('SliderSwatches color epsilon 2', () => {
  render(<SliderSwatches { ...br } />);
  const d = document.querySelector("div div");
  expect(d.children.length).toBe(6);
  fireEvent.click(d.children[0].children[0]);
});