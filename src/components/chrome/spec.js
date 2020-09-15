import React from 'react'
import { simpleCheckForValidColor, isValidHex } from '../../helpers/color';
import { red } from '../../example_color';
import Chrome from './Chrome'
import ChromeFields from './ChromeFields'
import ChromePointer from './ChromePointer'
import ChromePointerCircle from './ChromePointerCircle'
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CanvasRenderingContext2DEvent from "jest-canvas-mock";

test('Chrome renders correctly', () => {
  const tree = renderer.create(
    <Chrome {...red} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
})

test('Chrome onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(simpleCheckForValidColor(data)).toBeTruthy()
  });
  const { rerender } = render(<Chrome {...red} onChange={changeSpy} color={{
    r: 25, g: 77, b: 51, a: 1
  }} />);
  expect(changeSpy).toHaveBeenCalledTimes(0)


  // root divs elements
  const flexboxFix = document.querySelector(".flexbox-fix").children;
  const chromePicker = document.querySelector(".chrome-picker").children;

  // Event mousedown
  let mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
  Object.defineProperty(mousedownEvent, 'pageX', { get: () => 90 });
  Object.defineProperty(mousedownEvent, 'pageY', { get: () => 15 });

  // check the Alpha component
  const alphaPointer = flexboxFix[1].children[1].children[0].children[2];
  fireEvent(alphaPointer, mousedownEvent);
  expect(changeSpy).toHaveBeenCalledTimes(1);

  // check the Hue component
  const huePointer = flexboxFix[1].children[0].children[0].children[0];
  fireEvent(huePointer, mousedownEvent);
  expect(changeSpy).toHaveBeenCalledTimes(2);


  // check Saturation
  const saturationPointer = chromePicker[0].children[0];
  fireEvent(saturationPointer, mousedownEvent);
  expect(changeSpy).toHaveBeenCalledTimes(3);

  // check the ChromeFields
  const chromePointer = chromePicker[1].children[1].children[1].children[0];
  let chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  fireEvent.click(chromePointer);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  rerender(<Chrome {...red} onChange={changeSpy} />);
  chromeFields = document.querySelector("#chromeFields");
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  fireEvent.click(chromePointer);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  rerender(<Chrome {...red} onChange={changeSpy} />);
  chromeFields = document.querySelector("#chromeFields");
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  fireEvent.click(chromePointer);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  rerender(<Chrome {...red} onChange={changeSpy} />);
  chromeFields = document.querySelector("#chromeFields");
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
});


test('Chrome view hsl correctly', () => {
  render(<Chrome {...red} defaultView="hsl" />);
  let chromePicker = document.querySelector(".chrome-picker").children;
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('flex'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
});

test('Chrome view rgb correctly', () => {
  render(<Chrome {...red} defaultView="rgb" />);
  let chromePicker = document.querySelector(".chrome-picker").children;
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('flex'); //rgb
});

test('Chrome view hex correctly', () => {
  render(<Chrome {...red} defaultView="hex" />);
  let chromePicker = document.querySelector(".chrome-picker").children;
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
});

test('Chrome renders on server correctly', () => {
  const tree = renderer.create(
    <Chrome renderers={CanvasRenderingContext2DEvent} {...red} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})


test('ChromePointer renders correctly', () => {
  const tree = renderer.create(
    <ChromePointer />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ChromePointerCircle renders correctly', () => {
  const tree = renderer.create(
    <ChromePointerCircle />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ChromeFields view hsl  correctly', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={()=>{}} view="hsl" />);
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('flex'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
})

test('ChromeFields view rgb  correctly', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={()=>{}} view="rgb" />);
    const chromeFields = document.querySelector("#chromeFields");
    // childrens: 0 rgb, hsl 1, hex 2
    expect(chromeFields.children[2].style.display).toBe('none'); //hex
    expect(chromeFields.children[1].style.display).toBe('none'); //hsl
    expect(chromeFields.children[0].style.display).toBe('flex'); //rgb
})

test('ChromeFields view hex  correctly', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={()=>{}} view="hex" />);
    const chromeFields = document.querySelector("#chromeFields");
    // childrens: 0 rgb, hsl 1, hex 2
    expect(chromeFields.children[2].style.display).toBe('flex'); //hex
    expect(chromeFields.children[1].style.display).toBe('none'); //hsl
    expect(chromeFields.children[0].style.display).toBe('none'); //rgb
})

test('ChromeFields renders correctly', () => {
  const tree = renderer.create(
    <ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={()=>{}} />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Chrome renders custom styles correctly', () => {
  const tree = renderer.create(
    <Chrome styles={{ default: { picker: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})

test('Chrome renders correctly with width', () => {
  const tree = renderer.create(
    <Chrome width={300} />,
  ).toJSON()
  expect(tree.props.style.width).toBe(300)
});

test('ChromeFields change view default', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={()=>{}} />);
  let flex = document.querySelector(".flexbox-fix");
  let toggleV = flex.children[flex.children.length-1].children[0];
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  fireEvent.click(toggleV);
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('flex'); //rgb
  fireEvent.click(toggleV);
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('flex'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  fireEvent.click(toggleV);
  expect(chromeFields.children[2].style.display).toBe('flex'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  
})

test('ChromeFields change view ', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:0.5}} rgb={{r:25, g:77, b:51, a:0.5}}
    hex="#194D33" onChange={()=>{}} view="hsl" />);
  let flex = document.querySelector(".flexbox-fix");
  let toggleV = flex.children[flex.children.length-1].children[0];
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('flex'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
  fireEvent.click(toggleV);
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('none'); //hsl
  expect(chromeFields.children[0].style.display).toBe('flex'); //rgb
  fireEvent.click(toggleV);
  expect(chromeFields.children[2].style.display).toBe('none'); //hex
  expect(chromeFields.children[1].style.display).toBe('flex'); //hsl
  expect(chromeFields.children[0].style.display).toBe('none'); //rgb
})



test('ChromeFields swap event', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={()=>{}} />);
  const flex = document.querySelector(".flexbox-fix");
  const swap = flex.children[flex.children.length-1].children[0].children[0];
  fireEvent.focus(swap);
  expect(swap.style.background).toBe('rgb(238, 238, 238)'); //'#eee'
  fireEvent.blur(swap);
  expect(swap.style.background).toBe('transparent'); 
})

test('ChromeFields set rgb', () => {
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:0.5}} rgb={{r:25, g:77, b:51, a:0.5}}
    hex="#194D33" onChange={()=>{}} />);
    const chromeFields = document.querySelector("#chromeFields");
    // childrens: 0 rgb, hsl 1, hex 2
    expect(chromeFields.children[2].style.display).toBe('none'); //hex
    expect(chromeFields.children[1].style.display).toBe('none'); //hsl
    expect(chromeFields.children[0].style.display).toBe('flex'); //rgb
})

test('ChromeFields hex change', () => {
  const changeSpy = jest.fn((data) => {
    expect(isValidHex(data.hex)).toBeTruthy()
  });

  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={changeSpy} />);
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  const edit = chromeFields.children[2].children[0].children[0].children[0];
  fireEvent.change(edit.children[0], { target: {value : '#ff0000' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(edit.children[0].value).toBe('#ff0000');
  fireEvent.change(edit.children[0], { target: {value : '#ff00tt' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(edit.children[0].value).toBe('#ff00tt');
});


test('ChromeFields rgb change', () => {
  const changeSpy = jest.fn(() => {});

  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={changeSpy} view="rgb" />);
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  const edit = chromeFields.children[0].children[0].children[0].children[0];
  fireEvent.change(edit.children[0], { target: {value : '26' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(edit.children[0].value).toBe('26');
  const edit2 = chromeFields.children[0].children[0].children[2].children[0];
  fireEvent.change(edit2.children[0], { target: {value : '76' }});
  expect(changeSpy).toHaveBeenCalledTimes(2);
  expect(edit2.children[0].value).toBe('76');
});

test('ChromeFields hsl change', () => {
  const changeSpy = jest.fn(() => {});
  render(<ChromeFields hsl={{h:150, l:20, s:0.51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={changeSpy} view="hsl" />);
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  const edit = chromeFields.children[1].children[0].children[0].children[0];
  const edit2 = chromeFields.children[1].children[0].children[1].children[0];
  const edit3 = chromeFields.children[1].children[0].children[2].children[0];

  expect(edit.children[0].value).toBe('150');
  expect(edit2.children[0].value).toBe('51%');
  expect(edit3.children[0].value).toBe('20%'); 

  fireEvent.change(edit.children[0], { target: {value : '149' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(edit.children[0].value).toBe('149');

  fireEvent.change(edit2.children[0], { target: {value : '52%' }});
  expect(changeSpy).toHaveBeenCalledTimes(2);
  expect(edit2.children[0].value).toBe('52%'); 
  fireEvent.change(edit2.children[0], { target: {value : '0.5' }});
  expect(changeSpy).toHaveBeenCalledTimes(3);
  expect(edit2.children[0].value).toBe('0.5'); 

  fireEvent.change(edit3.children[0], { target: {value : '21%' }});
  expect(changeSpy).toHaveBeenCalledTimes(4);
  expect(edit3.children[0].value).toBe('21%');
});

test('ChromeFields alpha change', () => {
  const changeSpy = jest.fn(() => {});
  render(<ChromeFields hsl={{h:150, l:20, s:51, a:1}} rgb={{r:25, g:77, b:51, a:1}}
    hex="#194D33" onChange={changeSpy} view="rgb" />);
  const chromeFields = document.querySelector("#chromeFields");
  // childrens: 0 rgb, hsl 1, hex 2
  const edit = chromeFields.children[0].children[0].children[3].children[0];
  fireEvent.change(edit.children[0], { target: {value : '2' }});
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(edit.children[0].value).toBe('2');

  fireEvent.change(edit.children[0], { target: {value : '-2' }});
  expect(changeSpy).toHaveBeenCalledTimes(2);
  expect(edit.children[0].value).toBe('-2');

  fireEvent.change(edit.children[0], { target: {value : '1' }});
  expect(changeSpy).toHaveBeenCalledTimes(3);
  expect(edit.children[0].value).toBe('1');
});
