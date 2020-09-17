import React from 'react';
import PropTypes from 'prop-types';
import handleFocus from '../../helpers/interaction';
import Checkboard from './Checkboard';
import { swatchStyle } from './commonStyles';

const Swatch = ({
  color, style, onClick, onHover, title,
  children, focus, focusStyle,
}) => {
  const styles = swatchStyle(style, focus, focusStyle, color);
  const Checkb = color === 'transparent' ? (
    <Checkboard
      borderRadius={styles.swatch.borderRadius}
      boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
    />
  ) : (<></>);
  const handleClick = (e) => onClick(color, e);
  const handleKeyDown = (e) => (e.key === 'Enter' ? onClick(color, e) : null);
  const handleHover = (e) => onHover(color, e);

  const optionalEvents = {
    onMouseOver: handleHover,
  };

  const showTitle = title || color;
  return (
    <div
      style={styles.swatch}
      onClick={handleClick}
      title={showTitle}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
    >
      { children }
      { Checkb }
    </div>
  );
};

Swatch.defaultProps = {
  focusStyle: {},
  children: null,
  focus: false,
  title: '',
  onHover: () => {},
  style: {},
  onClick: () => {},
  color: '',
};

Swatch.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  focusStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  focus: PropTypes.bool,
  children: PropTypes.shape({}),
};

export default handleFocus(Swatch);
