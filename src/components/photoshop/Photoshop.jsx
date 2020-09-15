import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import Saturation from '../common/Saturation';
import Hue from '../common/Hue';
import PhotoshopFields from './PhotoshopFields';
import PhotoshopPointerCircle from './PhotoshopPointerCircle';
import PhotoshopPointer from './PhotoshopPointer';
import PhotoshopButton from './PhotoshopButton';
import PhotoshopPreviews from './PhotoshopPreviews';

const Photoshop = ({
  styles: passedStyles, className,
  header, onChange, hsl, hsv, rgb, onAccept, onCancel, hex,
}) => {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');

  const styles = reactCSS(merge({
    default: {
      picker: {
        background: '#DCDCDC',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)',
        boxSizing: 'initial',
        width: '513px',
      },
      head: {
        backgroundImage: 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
        borderBottom: '1px solid #B1B1B1',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)',
        height: '23px',
        lineHeight: '24px',
        borderRadius: '4px 4px 0 0',
        fontSize: '13px',
        color: '#4D4D4D',
        textAlign: 'center',
      },
      body: {
        padding: '15px 15px 0',
        display: 'flex',
      },
      saturation: {
        width: '256px',
        height: '256px',
        position: 'relative',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
        overflow: 'hidden',
      },
      hue: {
        position: 'relative',
        height: '256px',
        width: '19px',
        marginLeft: '10px',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
      },
      controls: {
        width: '180px',
        marginLeft: '10px',
      },
      top: {
        display: 'flex',
      },
      previews: {
        width: '60px',
      },
      actions: {
        flex: '1',
        marginLeft: '20px',
      },
    },
  }, passedStyles));

  useEffect(() => setCurrentColor(hex), []);
  return (
    <div style={styles.picker} className={`photoshop-picker ${className}`}>
      <div style={styles.head}>{header}</div>
      <div style={styles.body} className="flexbox-fix">
        <div style={styles.saturation}>
          <Saturation
            hsl={hsl}
            hsv={hsv}
            pointer={PhotoshopPointerCircle}
            onChange={onChange}
          />
        </div>
        <div style={styles.hue}>
          <Hue
            direction="vertical"
            hsl={hsl}
            pointer={PhotoshopPointer}
            onChange={onChange}
          />
        </div>
        <div style={styles.controls}>
          <div style={styles.top} className="flexbox-fix">
            <div style={styles.previews}>
              <PhotoshopPreviews
                rgb={rgb}
                currentColor={currentColor}
              />
            </div>
            <div style={styles.actions}>
              <PhotoshopButton label="OK" onClick={onAccept} active />
              <PhotoshopButton label="Cancel" onClick={onCancel} />
              <PhotoshopFields
                onChange={onChange}
                rgb={rgb}
                hsv={hsv}
                hex={hex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Photoshop.propTypes = {
  header: PropTypes.string,
  styles: PropTypes.shape({
    picker: PropTypes.string,
    head: PropTypes.string,
    body: PropTypes.string,
    saturation: PropTypes.string,
    controls: PropTypes.string,
    top: PropTypes.string,
    previews: PropTypes.string,
    actions: PropTypes.string,
    hue: PropTypes.string,
  }),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  hsl: PropTypes.shape({}).isRequired,
  hsv: PropTypes.shape({}).isRequired,
  rgb: PropTypes.shape({}).isRequired,
  hex: PropTypes.string.isRequired,
};

Photoshop.defaultProps = {
  header: 'Color Picker',
  styles: {},
  onCancel: () => {},
  onAccept: () => {},
  className: '',
};

export default ColorWrap(Photoshop);
