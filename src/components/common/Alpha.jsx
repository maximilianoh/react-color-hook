import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import calculateChange from '../../helpers/alpha';
import { alphaStyle } from './commonStyles';
import Checkboard from './Checkboard';

const Alpha = (props) => {
  const inputRef = useRef(null);
  const handleChange = (e) => {
    const change = calculateChange(e, props.hsl, props.direction, props.a, inputRef.current);
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


  useEffect(() => { handleMouseUp(); }, []);

  const { rgb, renderers, pointer } = props;
  const styles = alphaStyle(props, rgb);
  return (
    <div style={styles.alpha}>
      <div style={styles.checkboard}>
        <Checkboard renderers={renderers} />
      </div>
      <div style={styles.gradient} />
      <div
        style={styles.container}
        ref={inputRef}
        role="button"
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <div style={styles.pointer}>
          {pointer ? (
            <props.pointer {...props} />
          ) : (
            <div style={styles.slider} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Alpha;


Alpha.defaultProps = {
  a: null,
  renderers: {},
  direction: 'horizontal',
  pointer: null,
};
Alpha.propTypes = {
  hsl: PropTypes.shape({}).isRequired,
  direction: PropTypes.string,
  a: PropTypes.number,
  rgb: PropTypes.shape({}).isRequired,
  renderers: PropTypes.shape({}),
  pointer: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};
