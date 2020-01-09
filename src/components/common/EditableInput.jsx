import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { editableInputStyle } from './commonStyles';

const DEFAULT_ARROW_OFFSET = 1;

const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const VALID_KEY_CODES = [
  UP_KEY_CODE,
  DOWN_KEY_CODE,
];
const isNumber = (value) => !Number.isNaN(parseFloat(value));
const isValidKeyCode = (keyCode) => VALID_KEY_CODES.indexOf(keyCode) > -1;

const getFormattedPercentage = (number) => `${number}%`;
const getNumberValue = (value) => Number(String(value).replace(/%/g, ''));
const getIsPercentage = (value) => String(value).indexOf('%') > -1;

const EditableInput = (props) => {
  const { value } = props;
  const [valueState, setValueState] = useState(String(value).toUpperCase());
  const [blurValueState, setBlurValueState] = useState(String(value).toUpperCase());
  const inputRef = useRef(null);

  const getValueObjectWithLabel = (v) => ({ [props.label]: v });

  const handleDrag = (e) => {
    if (props.dragLabel) {
      const newValue = Math.round(props.value + e.movementX);
      if (newValue >= 0 && newValue <= props.dragMax) {
        if (props.onChange) props.onChange(getValueObjectWithLabel(newValue), e);
      }
    }
  };

  const setUpdatedValue = (v, e) => {
    const onChangeValue = props.label ? getValueObjectWithLabel(v) : v;
    if (props.onChange) props.onChange(onChangeValue, e);

    const isPercentage = getIsPercentage(e.target.value);
    setValueState(isPercentage ? getFormattedPercentage(v) : v);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e) => {
    if (props.dragLabel) {
      e.preventDefault();
      handleDrag(e);
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleBlur = () => {
    if (blurValueState) {
      setValueState(blurValueState);
      setBlurValueState(null);
    }
  };

  const handleChange = (e) => {
    setUpdatedValue(e.target.value, e);
  };

  const getArrowOffset = () => props.arrowOffset || DEFAULT_ARROW_OFFSET;

  const handleKeyDown = (e) => {
    // In case `e.target.value` is a percentage remove the `%` character
    // and update accordingly with a percentage
    // https://github.com/casesandberg/react-color/issues/383
    const v = getNumberValue(e.target.value);
    if (isNumber(v) && isValidKeyCode(e.keyCode)) {
      const offset = getArrowOffset();
      const updatedValue = e.keyCode === UP_KEY_CODE ? v + offset : v - offset;

      setUpdatedValue(updatedValue, e);
    }
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current.input === document.activeElement) {
      setBlurValueState(String(props.value).toUpperCase());
    } else {
      setBlurValueState(!blurValueState && String(props.value).toUpperCase());
      setValueState(String(props.value).toUpperCase());
    }
  }, [value]);

  useEffect(() => () => handleMouseUp(), []);

  const { style } = props;

  const styles = editableInputStyle(props, style);

  const { placeholder, hideLabel, label } = props;
  return (
    <div style={styles.wrap}>
      <input
        style={styles.input}
        ref={inputRef}
        value={valueState}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        spellCheck="false"
      />
      {label && !hideLabel ? (
        <span style={styles.label} onMouseDown={handleMouseDown} role="button" tabIndex={0}>
          {label}
        </span>
      ) : null}
    </div>
  );
};


export default EditableInput;


EditableInput.defaultProps = {
  style: {
    wrap: '',
    input: {},
    label: '',
  },
  arrowOffset: DEFAULT_ARROW_OFFSET,
  placeholder: '',
  hideLabel: false,
  dragMax: '',
  dragLabel: '',
  label: '',
};

EditableInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  dragLabel: PropTypes.string,
  dragMax: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hideLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  arrowOffset: PropTypes.number,
  style: PropTypes.shape({
    wrap: PropTypes.shape({}),
    label: PropTypes.shape({}),
    input: PropTypes.shape({}),
  }),
};
