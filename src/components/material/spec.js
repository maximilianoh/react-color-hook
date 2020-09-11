import React from 'react'
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { red } from '../../example_color';
import Material from './Material'

test('Material renders correctly', () => {
  const tree = renderer.create(
    <Material { ...red } />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Material renders custom styles correctly', () => {
  const tree = renderer.create(
    <Material { ...red } styles={{ default: { wrap: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON();
  expect(tree.props.style.boxShadow).toBe('0 0 10px red');
});

test('Material onChange', () => {
  render(<Material { ...red }  />);
  const field_h = document.querySelector(".material-picker").children[0];
  expect(field_h.children[0].style.borderBottom).toBe('2px solid #ff0000');
  fireEvent.change(field_h.children[0], { target: {value : '#FF0001' }});
  expect(field_h.children[0].style.borderBottom).toBe('2px solid #ff0001');
  
  const field_r = document.querySelector(".material-picker .flexbox-fix").children[0].children[0];
  fireEvent.change(field_r.children[0], { target: {value : '250' }});
  expect(field_r.children[0].value).toBe('250');
  expect(field_h.children[0].style.borderBottom).toBe('2px solid #fa0001');  

  const field_g = document.querySelector(".material-picker .flexbox-fix").children[1].children[0];
  fireEvent.change(field_g.children[0], { target: {value : '250' }});
  expect(field_g.children[0].value).toBe('250');
  expect(field_h.children[0].style.borderBottom).toBe('2px solid #fafa01');


  fireEvent.change(field_h.children[0], { target: {value : '#FF00hhh' }});
  expect(field_h.children[0].style.borderBottom).toBe('2px solid #fafa01');

});

