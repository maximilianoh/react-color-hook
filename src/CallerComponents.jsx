import React, { useState } from 'react';

import {
  AlphaPicker, BlockPicker, ChromePicker, CirclePicker,
  CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker,
  SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker,
} from './index';

const CallerComponents = () => {
  const [color, setColor] = useState({
    r: 25,
    g: 77,
    b: 51,
    a: 1,
  });
  const handleChangeComplete = (c) => {
    setColor(c.rgb);
  };
  return (
    <div style={{ display: 'flex', flexFlow: 'wrap' }}>
      <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
      <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
      <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
      <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
      <CompactPicker color={color} onChangeComplete={handleChangeComplete} />
      <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
      <HuePicker color={color} onChangeComplete={handleChangeComplete} />
      <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
      <PhotoshopPicker color={color} onChangeComplete={handleChangeComplete} />
      <div style={{ flexFlow: 'wrap', width: '500px' }}>
        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      </div>
      <div style={{ flexFlow: 'wrap', width: '500px' }}>
        <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
      </div>
      <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />

      <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
    </div>
  );
};

export default CallerComponents;
