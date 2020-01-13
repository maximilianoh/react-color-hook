import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Alpha from '../common/Alpha';
import ColorWrap from '../common/ColorWrap';
import AlphaPointer from './AlphaPointer';

export const AlphaPicker = ({
  rgb, hsl, width, height, onChange, direction, style,
  renderers, pointer, className = '',
}) => {
  const styles = reactCSS({
    default: {
      picker: {
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
      },
      alpha: {
        radius: '2px',
        style,
      },
    },
  });
  debugger; // eslint-disable-line no-debugger
  return (
    <div style={styles.picker} className={`alpha-picker ${className}`}>
      <Alpha
        {...styles.alpha}
        rgb={rgb}
        hsl={hsl}
        pointer={pointer}
        renderers={renderers}
        onChange={onChange}
        direction={direction}
      />
    </div>
  );
};

AlphaPicker.defaultProps = {
  width: 316,
  height: 16,
  direction: 'horizontal',
  pointer: AlphaPointer,
  renderers: {},
  className: '',
  style: {},
};


AlphaPicker.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
  pointer: PropTypes.func,
  rgb: PropTypes.shape({}).isRequired,
  hsl: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  renderers: PropTypes.shape({}),
  className: PropTypes.string,

};


export default ColorWrap(AlphaPicker);
