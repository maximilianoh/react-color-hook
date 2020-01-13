import React, { useState } from 'react';

import Alpha from './components/alpha/Alpha';
import Block from './components/block/Block';
import Circle from './components/circle/Circle';
import Chrome from './components/chrome/Chrome';
import Compact from './components/compact/Compact';
import Github from './components/github/Github';
import Hue from './components/hue/Hue';
import Material from './components/material/Material';
import Photoshop from './components/photoshop/Photoshop';
import Sketch from './components/sketch/Sketch';
import Slider from './components/slider/Slider';
import Swatches from './components/swatches/Swatches';
import Twitter from './components/twitter/Twitter';

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
      <Alpha color={color} onChangeComplete={handleChangeComplete} />
      <Block color={color} onChangeComplete={handleChangeComplete} />
      <Circle color={color} onChangeComplete={handleChangeComplete} />
      <Chrome color={color} onChangeComplete={handleChangeComplete} />
      <Compact color={color} onChangeComplete={handleChangeComplete} />
      <Github color={color} onChangeComplete={handleChangeComplete} />
      <Hue color={color} onChangeComplete={handleChangeComplete} />
      <Material color={color} onChangeComplete={handleChangeComplete} />
      <Photoshop color={color} onChangeComplete={handleChangeComplete} />
      <div style={{ flexFlow: 'wrap', width: '500px' }}>
        <Sketch color={color} onChangeComplete={handleChangeComplete} />
      </div>
      <div style={{ flexFlow: 'wrap', width: '500px' }}>
        <Slider color={color} onChangeComplete={handleChangeComplete} />
      </div>
      <Swatches color={color} onChangeComplete={handleChangeComplete} />

      <Twitter color={color} onChangeComplete={handleChangeComplete} />
    </div>
  );
};

export default CallerComponents;
