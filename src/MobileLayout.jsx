import React from 'react';
import PropTypes from 'prop-types';
import {
  AlphaPicker, BlockPicker, ChromePicker, CirclePicker,
  CompactPicker, GithubPicker, HuePicker, MaterialPicker,
  SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker,
} from './index';

const MobileLayout = (props) => {
  const { color, handleChangeComplete } = props;
  return (
    <>
      <p className="title is-5">HuePicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <HuePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">AlphaPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <AlphaPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">SliderPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>


      <p className="title is-5">GithubPicker</p>
      <div className="columns is-mobile">
        <div
          className="column is-half is-three-fifths is-offset-one-fifth"
          style={{ boxSizing: 'content-box' }}
        >
          <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">CompactPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <CompactPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">CirclePicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <CirclePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">MaterialPicker</p>
      <div className="columns is-mobile">
        <div
          className="column is-half is-three-fifths is-offset-one-fifth"
          style={{ boxSizing: 'content-box' }}
        >
          <MaterialPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>


      <p className="title is-5">TwitterPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <TwitterPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">BlockPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <BlockPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">ChromePicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">SketchPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>

      <p className="title is-5">SwatchesPicker</p>
      <div className="columns is-mobile">
        <div className="column is-half is-three-fifths is-offset-one-fifth">
          <SwatchesPicker color={color} onChangeComplete={handleChangeComplete} />
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
