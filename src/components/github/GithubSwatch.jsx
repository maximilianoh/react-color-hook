import React from 'react';
import reactCSS, { handleHover } from 'reactcss';
import PropTypes from 'prop-types';
import Swatch from '../common/Swatch';

const GithubSwatch = ({
  hover, color, onClick, onSwatchHover,
}) => {
  const hoverSwatch = {
    position: 'relative',
    zIndex: '2',
    outline: '2px solid #fff',
    boxShadow: '0 0 5px 2px rgba(0,0,0,0.25)',
  };

  const styles = reactCSS({
    default: {
      swatch: {
        width: '25px',
        height: '25px',
        fontSize: '0',
      },
    },
    hover: {
      swatch: hoverSwatch,
    },
  }, { hover });

  return (
    <div style={styles.swatch}>
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={hoverSwatch}
      />
    </div>
  );
};

GithubSwatch.propTypes = {
  hover: PropTypes.bool.isRequired,
  onSwatchHover: PropTypes.func,
  onClick: PropTypes.func,
  color: PropTypes.string.isRequired,
};

GithubSwatch.defaultProps = {
  onSwatchHover: () => {},
  onClick: () => {},
};

export default handleHover(GithubSwatch);
