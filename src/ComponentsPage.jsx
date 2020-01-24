import React, { useState } from 'react';

import {
  AlphaPicker, BlockPicker, ChromePicker, CirclePicker,
  CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker,
  SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker,
} from './index';

const ComponentsPage = () => {
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
    <div className="container is-fluid">
      {/* Desktop */}
      <div className="is-hidden-touch">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <HuePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-third">
            <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-third">
            <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-one-quarter">
            <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-quarter">
            <CompactPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column auto" style={{ boxSizing: 'content-box' }}>
            <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-quarter">
            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-one-quarter">
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-quarter">
            <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-quarter">
            <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-one-quarter">
            <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />

          </div>
        </div>
        <div className="columns is-centered">
          <div className="column is-half">
            <PhotoshopPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
          <div className="column is-half">
            <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="is-hidden-desktop">
        <div className="columns is-centered">
          <div className="column is-half">
            <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>


      {/*

      <div className="mui-row" style={{ marginBottom: '2%' }}>
        <div className="mui-col-xs-12 mui-col-md-6">
          <div className="spaceComponent">
          </div>
          <div className="spaceComponent" style={{ marginTop: '2%' }}>
          </div>
          <div style={{ marginTop: '2%' }}>
          </div>
        </div>
        <div className="mui-col-xs-12 mui-col-md-5 spaceComponent">
        </div>
      </div>
      <div className="mui-row" style={{ marginBottom: '2%' }}>
        <div className="mui-col-xs-12 mui-col-md-4 spaceComponent">
        </div>
        <div className="mui-col-xs-12 mui-col-md-4">
        </div>
        <div className="mui-col-xs-12 mui-col-md-4 spaceComponent">

        </div>
      </div>

      <div className="mui-row" style={{ marginBottom: '2%' }}>
        <div className="mui-col-xs-12 mui-col-md-4 spaceComponent">
        </div>
        <div className="mui-col-xs-12 mui-col-md-4 spaceComponent">
        </div>
        <div className="mui-col-xs-12 mui-col-md-4 spaceComponent">
        </div>
      </div>
      <div className="mui-row" style={{ marginBottom: '2%' }}>
        <div className="mui-col-xs-12 mui-col-md-8 spaceComponent">
        </div>
        <div className="mui-col-xs-12 mui-col-md-4 spaceComponent">
        </div>


      </div>

      <div className="mui-row" style={{ marginBottom: '2%' }}>
        <div className="mui-col-xs-12 mui-col-md-12 spaceComponent">
        </div>
      </div>
    */}

    </div>
  );
};

export default ComponentsPage;
