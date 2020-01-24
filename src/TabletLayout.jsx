import React from 'react';
import PropTypes from 'prop-types';
import {
  AlphaPicker, BlockPicker, ChromePicker, CirclePicker,
  CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker,
  SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker,
} from './index';

const TabletLayout = (props) => {
  const { color, handleChangeComplete } = props;
  return (
    <>
      <div className="columns is-centered">
        <div className="column is-half">
          <p className="title is-5">HuePicker</p>
          <HuePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-half">
          <p className="title is-5">AlphaPicker</p>
          <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <p className="title is-5">SliderPicker</p>
          <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-half">
          <p className="title is-5">GithubPicker</p>
          <div style={{ boxSizing: 'content-box' }}>
            <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <p className="title is-5">CirclePicker</p>
          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <p className="title is-5">CompactPicker</p>
          <CompactPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <p className="title is-5">MaterialPicker</p>
          <div style={{ boxSizing: 'content-box', marginLeft: '30%', marginRight: '30%' }}>
            <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <p className="title is-5">TwitterPicker</p>
          <div>
            <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <p className="title is-5">BlockPicker</p>
          <div style={{ marginLeft: '15%', marginRight: '15%' }}>
            <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <p className="title is-5">ChromePicker</p>
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <p className="title is-5">SketchPicker</p>
          <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <p className="title is-5">SwatchesPicker</p>
          <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-full  is-offset-one-quarter">
          <p className="title is-5">PhotoshopPicker</p>
          <PhotoshopPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
    </>
  );
};
TabletLayout.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
};
export default TabletLayout;
