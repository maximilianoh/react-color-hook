import React from 'react';
import PropTypes from 'prop-types';
import { checkboardStyle } from './commonStyles';

const Checkboard = ({
  white, grey, size, renderers, borderRadius, boxShadow,
}) => {
  const styles = checkboardStyle(white, grey, size, renderers, borderRadius, boxShadow);

  return (
    <div style={styles.grid} />
  );
};


export default Checkboard;

Checkboard.defaultProps = {
  borderRadius: '',
  boxShadow: '',
  size: 8,
  white: 'transparent',
  grey: 'rgba(0,0,0,.08)',
  renderers: {},
};

Checkboard.propTypes = {
  white: PropTypes.string,
  grey: PropTypes.string,
  size: PropTypes.number,
  renderers: PropTypes.shape({}),
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
};
