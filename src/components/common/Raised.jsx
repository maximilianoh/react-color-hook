import React from 'react';
import PropTypes from 'prop-types';
import { raisedStyle } from './commonStyles';

const Raised = ({
  zDepth, radius, background, children,
  styles: passedStyles,
}) => {
  const styles = raisedStyle(zDepth, radius, background, passedStyles);
  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />
      <div style={styles.content}>
        { children }
      </div>
    </div>
  );
};

Raised.propTypes = {
  background: PropTypes.string,
  zDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  radius: PropTypes.number,
  styles: PropTypes.shape({
    wrap: PropTypes.string,
    bg: PropTypes.string,
    content: PropTypes.string,
  }),
  children: PropTypes.shape({}).isRequired,
};

Raised.defaultProps = {
  background: '#fff',
  zDepth: 1,
  radius: 2,
  styles: {
    wrap: '',
    bg: '',
    content: '',
  },
};

export default Raised;
