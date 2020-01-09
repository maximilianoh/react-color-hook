import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { hueStyle } from './commonStyles';
import calculateChange from '../../helpers/hue';

const Hue = (props) => {
  const inputRef = useRef();
  const handleChange = (e) => {
    const change = calculateChange(e, props.direction, props.hsl, inputRef.current);
    if (change && typeof props.onChange === 'function') props.onChange(change, e);
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


  useEffect(() => () => handleMouseUp(), []);

  const {
    direction, radius, shadow, hsl, pointer,
  } = props;

  const styles = hueStyle(direction, radius, shadow, hsl);

  const Pointer = pointer;
  return (
    <div style={styles.hue}>
      <div
        role="button"
        tabIndex={0}
        className={`hue-${direction}`}
        style={styles.container}
        ref={inputRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <style>
          {`
          .hue-horizontal {
            background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
              33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to right, #f00 0%, #ff0
              17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }

          .hue-vertical {
            background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
              #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
              #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
          }
        ` }
        </style>
        <div style={styles.pointer}>
          {Pointer ? (
            <Pointer {...props} />
          ) : (
            <div style={styles.slider} />
          )}
        </div>
      </div>
    </div>
  );
};

Hue.defaultProps = {
  direction: 'horizontal',
  shadow: '',
  radius: '',
  pointer: null,
};

Hue.propTypes = {
  direction: PropTypes.string,
  hsl: PropTypes.shape({
    h: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  radius: PropTypes.string,
  shadow: PropTypes.string,
  pointer: PropTypes.func,
};

export default Hue;
