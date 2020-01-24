import React from 'react';
import PropTypes from 'prop-types';
import {
  AlphaPicker, BlockPicker, ChromePicker, CirclePicker,
  CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker,
  SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker,
} from './index';

const DesktopLayout = (props) => {
  const { color, handleChangeComplete } = props;
  return (
    <>
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
        <div className="column is-one-third has-text-centered" style={{ boxSizing: 'content-box' }}>
          <div style={{ marginLeft: '20%' }}>
            <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-one-third">
          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-one-third">
          <div style={{ marginLeft: '10%', marginRight: '10%' }}>
            <CompactPicker color={color} onChangeComplete={handleChangeComplete} />

          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-one-third" style={{ boxSizing: 'content-box' }}>
          <div style={{ marginLeft: '30%', marginRight: '30%' }}>
            <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-one-third">
          <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-one-third">
          <div style={{ marginLeft: '15%', marginRight: '15%' }}>
            <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>

        <div className="column is-one-third">
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-one-third">
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

DesktopLayout.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
};
export default DesktopLayout;
