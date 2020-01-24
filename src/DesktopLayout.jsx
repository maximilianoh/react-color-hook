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
          <p className="title is-5">HuePicker</p>
          <HuePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-one-third">
          <p className="title is-5">AlphaPicker</p>
          <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-one-third">
          <p className="title is-5">SliderPicker</p>
          <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <p className="title is-5">GithubPicker</p>
          <div style={{ marginLeft: '20%', boxSizing: 'content-box' }}>
            <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-one-third">
          <p className="title is-5">CirclePicker</p>
          <div style={{ marginLeft: '5%', marginRight: '5%' }}>
            <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-one-third">
          <p className="title is-5">CompactPicker</p>
          <div style={{ marginLeft: '10%', marginRight: '10%', boxSizing: 'content-box' }}>
            <CompactPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <p className="title is-5">MaterialPicker</p>
          <div style={{ marginLeft: '30%', marginRight: '30%', boxSizing: 'content-box' }}>
            <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
        <div className="column is-one-third">
          <p className="title is-5">TwitterPicker</p>
          <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-one-third">
          <p className="title is-5">BlockPicker</p>
          <div style={{ marginLeft: '15%', marginRight: '15%' }}>
            <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-one-third">
          <p className="title is-5">ChromePicker</p>
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>

        <div className="column is-one-third">
          <p className="title is-5">SketchPicker</p>
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
        <div className="column is-one-third">
          <p className="title is-5">SwatchesPicker</p>
          <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-half is-offset-two-quarter">
          <p className="title is-5">PhotoshopPicker</p>
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
