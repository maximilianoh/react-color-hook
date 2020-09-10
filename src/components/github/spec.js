import React from 'react'
import renderer from 'react-test-renderer'
import { simpleCheckForValidColor, red } from '../../helpers/color'
import { render, fireEvent } from '@testing-library/react';
import Github from './Github'
import GithubSwatch from './GithubSwatch'

test('Github renders correctly', () => {
  const tree = renderer.create(
    <Github { ...red } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Github onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render( <Github onChange={ changeSpy } />)
  expect(changeSpy).toHaveBeenCalledTimes(0);
  const firstSwatch = queryByTitle("#B80000");
  fireEvent.click(firstSwatch);
  expect(changeSpy).toHaveBeenCalled();
})

test('Github with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  })
  const {queryByTitle} = render( <Github onSwatchHover={ hoverSpy } />)
  expect(hoverSpy).toHaveBeenCalledTimes(0);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const firstSwatch = queryByTitle("#B80000")
  fireEvent(firstSwatch, event);
  expect(hoverSpy).toHaveBeenCalled();
})


test('Github `triangle="hide"`', () => {
  const tree = renderer.create(
    <Github { ...red } triangle="hide" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Github `triangle="top-right"`', () => {
  const tree = renderer.create(
    <Github { ...red } triangle="top-right" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Github renders custom styles correctly', () => {
  const tree = renderer.create(
    <Github { ...red } styles={{ default: { card: { boxShadow: '0 0 10px red' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('0 0 10px red')
})

test('GithubSwatch renders correctly', () => {
  const tree = renderer.create(
    <GithubSwatch color="#333" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('GithubSwatch renders correctly', () => {
  const {queryByTitle} = render(<GithubSwatch color="#B80000" />);
  const event = new MouseEvent('mouseover', { bubbles: true });
  const firstSwatch = queryByTitle("#B80000")
  fireEvent(firstSwatch, event);
  fireEvent.click(firstSwatch);
})