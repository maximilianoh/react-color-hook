import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import Hue from '../common/Hue';
import SliderSwatches from './SliderSwatches';
import SliderPointer from './SliderPointer';

const Slider = ({
  hsl, onChange, pointer,
  styles: passedStyles, className,
}) => {
  const styles = reactCSS(merge({
    default: {
      hue: {
        height: '12px',
        position: 'relative',
      },
      Hue: {
        radius: '2px',
      },
    },
  }, passedStyles));
  return (
    <div style={styles.wrap || {}} className={`slider-picker ${className}`}>
      <div style={styles.hue}>
        <Hue
          style={styles.Hue}
          hsl={hsl}
          pointer={pointer}
          onChange={onChange}
        />
      </div>
      <div style={styles.swatches}>
        <SliderSwatches hsl={hsl} onClick={onChange} />
      </div>
    </div>
  );
};

Slider.propTypes = {
  styles: PropTypes.shape({}),
  pointer: PropTypes.func,
  hsl: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Slider.defaultProps = {
  pointer: SliderPointer,
  styles: {},
  className: '',
};

export default ColorWrap(Slider);
