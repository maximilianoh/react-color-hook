import React, { useRef, useEffect } from 'react';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import calculateChange from '../../helpers/saturation';
import { saturationStyle } from './commonStyles';

const Saturation = (props) => {
  const inputRef = useRef();
  const throttleLocal = throttle((fn, data, e) => {
    fn(data, e);
  }, 50);

  const handleChange = (e) => {
    throttleLocal(
      props.onChange,
      calculateChange(e, props.hsl, inputRef.current),
      e,
    );
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleChange);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e) => {
    handleChange(e);
    window.addEventListener('mousemove', handleChange);
    window.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => () => {
    throttleLocal.cancel();
    handleMouseUp();
  }, []);

  const {
    style, hsl, radius, shadow, hsv, pointer,
  } = props;
  const {
    color, white, black, circle,
  } = style;
  const styles = saturationStyle(hsl, radius, shadow, hsv, color,
    white, black, circle, style.pointer, style);
  const Pointer = pointer;
  return (
    <div
      role="button"
      tabIndex={0}
      style={styles.color}
      ref={inputRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      <style>
        {`
        .saturation-white {
          background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
          background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        }
        .saturation-black {
          background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
          background: linear-gradient(to top, #000, rgba(0,0,0,0));
        }
      `}
      </style>
      <div style={styles.white} className="saturation-white">
        <div style={styles.black} className="saturation-black" />
        <div style={styles.pointer}>
          {Pointer ? (
            <Pointer {...props} />
          ) : (
            <div style={styles.circle} />
          )}
        </div>
      </div>
    </div>
  );
};

Saturation.defaultProps = {
  radius: '',
  shadow: '',
  style: {
    pointer: '',
    color: '',
    white: '',
    black: '',
    circle: '',
  },
  pointer: null,
  onChange: () => {},
};

Saturation.propTypes = {
  onChange: PropTypes.func,
  hsl: PropTypes.shape({
    h: PropTypes.number,
    v: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
  style: PropTypes.shape({
    pointer: PropTypes.string,
    color: PropTypes.string,
    white: PropTypes.string,
    black: PropTypes.string,
    circle: PropTypes.string,
  }),
  hsv: PropTypes.shape({
    v: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
  pointer: PropTypes.func,
  shadow: PropTypes.string,
  radius: PropTypes.string,
};

export default Saturation;
