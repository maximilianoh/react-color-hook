import React from 'react';
import PropTypes from 'prop-types';
import {
  AlphaPicker, BlockPicker, ChromePicker, CirclePicker,
  CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker,
  SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker,
} from './index';

const MobileLayout = (props) => {
  const { color, handleChangeComplete } = props;
  return (
    <>
      <div className="columns is-centered">
        <div className="column is-half">
          <HuePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-half">
          <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-half" style={{ boxSizing: 'content-box' }}>
          <div style={{ marginLeft: '20%' }}>
            <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            <CompactPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half" style={{ boxSizing: 'content-box' }}>
          <div style={{ marginLeft: '30%', marginRight: '30%' }}>
            <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half">
          <div style={{ marginLeft: '15%', marginRight: '15%' }}>
            <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-half">
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-half">
          <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-half">
          <PhotoshopPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
    </>
  );
};
MobileLayout.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
};
export default MobileLayout;
