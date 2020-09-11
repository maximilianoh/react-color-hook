import React from 'react'
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { red } from '../../example_color';
import Photoshop from './Photoshop'
import PhotoshopButton from './PhotoshopButton'
import PhotoshopFields from './PhotoshopFields'
import PhotoshopPointer from './PhotoshopPointer'
import PhotoshopPointerCircle from './PhotoshopPointerCircle'
import PhotoshopPreviews from './PhotoshopPreviews'

test('Photoshop renders correctly', () => {
  const tree = renderer.create(
    <Photoshop { ...red } onAccept={ () => {} } onCancel={ () => {} } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Photoshop renders custom styles correctly', () => {
  const tree = renderer.create(
    <Photoshop { ...red } styles={{ default: { picker: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('0 0 10px red');
})

test('PhotoshopButton renders correctly', () => {
  const tree = renderer.create(
    <PhotoshopButton label="accept" onClick={ () => {} } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('PhotoshopFields renders correctly', () => {
  const tree = renderer.create(
    <PhotoshopFields { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot();
})

test('PhotoshopPointer renders correctly', () => {
  const tree = renderer.create(
    <PhotoshopPointer />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('PhotoshopPointerCircle renders correctly', () => {
  const tree = renderer.create(
    <PhotoshopPointerCircle { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('PhotoshopPreviews renders correctly', () => {
  const tree = renderer.create(
    <PhotoshopPreviews { ...red } currencColor="#aeee00" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('Photoshop empty events', () => {
  render( <Photoshop { ...red }  />);
  const act = document.querySelector(".photoshop-picker .flexbox-fix .flexbox-fix").children[1];
  fireEvent.click(act.children[0]);
  fireEvent.click(act.children[1]);  
})


test('PhotoshopButton renders children', () => {
  render(<PhotoshopButton label="" children={<strong>children</strong>} />);
  const st = document.querySelector('strong');
  expect(st !== null && st !== undefined).toBe(true);
  expect(st.textContent).toBe('children');
  const div = document.querySelector('div div');
  fireEvent.click(div);
})

test('PhotoshopFields empty event', () => {
  render(<PhotoshopFields { ...red } />);
  const inp = document.querySelectorAll('input');
  fireEvent.change(inp[inp.length-1], { target: {value : 'FFFFFF' }});
})


test('PhotoshopFields event', () => {
  const changeSpy = jest.fn(() => {});
  render(<PhotoshopFields { ...red } onChange={changeSpy} />);
  const inp = document.querySelectorAll('input'); //7
  expect(changeSpy).toHaveBeenCalledTimes(0);
  fireEvent.change(inp[inp.length-1], { target: {value : 'FFFFFF' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  fireEvent.change(inp[inp.length-1], { target: {value : 'wrong' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  fireEvent.change(inp[0], { target: {value : '10' }});
  expect(changeSpy).toHaveBeenCalledTimes(2);
  fireEvent.change(inp[1], { target: {value : '110' }});
  expect(changeSpy).toHaveBeenCalledTimes(3);
  fireEvent.change(inp[3], { target: {value : '250' }});
  expect(changeSpy).toHaveBeenCalledTimes(4);
  fireEvent.change(inp[4], { target: {value : '50' }});
  expect(changeSpy).toHaveBeenCalledTimes(5);
})


