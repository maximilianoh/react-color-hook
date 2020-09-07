import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import {
  simpleCheckForValidColor, toState, chromaValidation, isValidToChange, hsvParse,
} from '../../helpers/color';

const ColorWrap = (Picker) => {
  const ColorPicker = (props) => {
    const { color } = props;
    const [colorState, setColorState] = useState(toState(color, 0));
    const localDebounce = debounce((fn, data, event) => {
      fn(data, event);
    }, 100);

    useEffect(() => {
      setColorState(toState(color, colorState.oldHue));
    }, [color]);

    useEffect(() => {
      if(props.hex){
        setColorState(toState({hex: props.hex}, colorState.oldHue));
      }
    }, []);

    const handleChange = (data, event) => {
      const isValidColor = simpleCheckForValidColor(data);
      if (isValidColor && chromaValidation(isValidColor)) {
        const preColors = toState(data, data.h || colorState.oldHue);
        if (isValidToChange(data, preColors[data.source], data.source)) {
          let colors = preColors;
          if (data.source === 'hsv') colors = hsvParse(preColors, data);
          setColorState(colors);
          if (props.onChangeComplete) localDebounce(props.onChangeComplete, colors, event);
          if (props.onChange) props.onChange(colors, event);
        }
      }
    };

    const handleSwatchHover = (data, event) => {
      const isValidColor = simpleCheckForValidColor(data);
      if (isValidColor) {
        const colors = toState(data, data.h || colorState.oldHue);
        if (props.onSwatchHover) props.onSwatchHover(colors, event);
      }
    };

    const optionalEvents = {};
    const { onSwatchHover } = props;
    if (onSwatchHover) optionalEvents.onSwatchHover = handleSwatchHover;

    return (
      <Picker
        {...props}
        {...colorState}
        onChange={handleChange}
        {...optionalEvents}
      />
    );
  };
  ColorPicker.propTypes = {
    ...Picker.propTypes,
    onChange: PropTypes.func,
  };

  ColorPicker.defaultProps = {
    ...Picker.defaultProps,
    color: {
      h: 250,
      s: 0.50,
      l: 0.20,
      a: 1,
    },
    hex: '',
    className: '',
    onChange: () => { },
    onSwatchHover: () => { },
    hsl: { h: 0, s: 0, l: 0 },
    rgb: {
      r: 0, g: 0, b: 0, a: 0,
    },
    hsv: { h: 0, s: 0, v: 0 },
    renderers: {},
  };
  return ColorPicker;
};

export default ColorWrap;
