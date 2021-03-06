import React, {
  useEffect, useState, useRef,
} from 'react';
import reactCSS from 'reactcss';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import PropTypes from 'prop-types';
import { isValidHex } from '../../helpers/color';
import EditableInput from '../common/EditableInput';

const ChromeFields = (props) => {
  const {
    view, hex, rgb, hsl,
  } = props;
  const [viewState, setViewState] = useState(view);
  const inputRef = useRef();

  useEffect(() => {
    if (props.hsl.a !== 1 && props.view === 'hex') {
      setViewState('rgb');
    } else {
      setViewState(props.view);
    }
  }, []);

  useEffect(() => {
    if (props.hsl.a !== 1 && viewState === 'hex') {
      setViewState('rgb');
    }
  }, [hsl.a, hsl.h, hsl.l, hsl.s]);

  const toggleViews = () => {
    if (viewState === 'hex') {
      setViewState('rgb');
    } else if (viewState === 'rgb') {
      setViewState('hsl');
    } else if (props.hsl.a === 1) {
      setViewState('hex');
    } else {
      setViewState('rgb');
    }
  };

  const handleChange = (originalData, e) => {
    const data = { ...originalData };
    if (data.r || data.g || data.b) {
      props.onChange({
        r: data.r || props.rgb.r,
        g: data.g || props.rgb.g,
        b: data.b || props.rgb.b,
        source: 'rgb',
      }, e);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 1) {
        data.a = 1;
      }

      props.onChange({
        h: props.hsl.h,
        s: props.hsl.s,
        l: props.hsl.l,
        a: Math.round(data.a * 100) / 100,
        source: 'hsl',
      }, e);
    } else if (data.h || data.s || data.l) {
      // Remove any occurances of '%'.
      if (typeof (data.s) === 'string' && data.s.includes('%')) { data.s = data.s.replace('%', ''); }
      if (typeof (data.l) === 'string' && data.l.includes('%')) { data.l = data.l.replace('%', ''); }

      props.onChange({
        h: data.h || props.hsl.h,
        s: Number(data.s || props.hsl.s),
        l: Number(data.l || props.hsl.l),
        source: 'hsl',
      }, e);
    } else if (isValidHex(data.hex)) {
      props.onChange({
        hex: data.hex,
        source: 'hex',
      }, e);
    }
    originalData = { ...data }; // eslint-disable-line no-param-reassign
  };

  const showHighlight = (e) => {
    e.currentTarget.style.background = '#eee';
  };

  const hideHighlight = (e) => {
    e.currentTarget.style.background = 'transparent';
  };

  const styles = reactCSS({
    default: {
      wrap: {
        paddingTop: '16px',
        display: 'flex',
      },
      fields: {
        flex: '1',
        display: 'flex',
        marginLeft: '-6px',
      },
      field: {
        paddingLeft: '6px',
        width: '100%',
      },
      alpha: {
        paddingLeft: '6px',
        width: '100%',
      },
      toggle: {
        width: '32px',
        textAlign: 'right',
        position: 'relative',
      },
      icon: {
        marginRight: '-4px',
        marginTop: '12px',
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
      },
      iconHighlight: {
        position: 'absolute',
        width: '24px',
        height: '28px',
        background: '#eee',
        borderRadius: '4px',
        top: '10px',
        left: '12px',
        display: 'none',
      },
      input: {
        fontSize: '11px',
        color: '#333',
        width: '100%',
        borderRadius: '2px',
        border: 'none',
        boxShadow: 'inset 0 0 0 1px #dadada',
        height: '21px',
        textAlign: 'center',
      },
      label: {
        textTransform: 'uppercase',
        fontSize: '11px',
        lineHeight: '11px',
        color: '#969696',
        textAlign: 'center',
        display: 'block',
        marginTop: '12px',
      },
      svg: {
        fill: '#333',
        width: '24px',
        height: '24px',
        border: '1px transparent solid',
        borderRadius: '5px',
      },
    },
    disableAlpha: {
      alpha: {
        display: 'none',
      },
    },
  }, props, viewState);

  const hexFields = (
    <div style={styles.fields} className="flexbox-fix">
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="hex"
          value={`${hex}`}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const rgbFields = (
    <div style={styles.fields} className="flexbox-fix">
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="r"
          value={`${rgb.r}`}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="g"
          value={`${rgb.g}`}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="b"
          value={`${rgb.b}`}
          onChange={handleChange}
        />
      </div>
      <div style={styles.alpha}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="a"
          value={`${rgb.a}`}
          arrowOffset={0.01}
          onChange={handleChange}
        />
      </div>
    </div>
  );
  const s = hsl.s > 1 ? hsl.s / 100 : hsl.s;
  const l = hsl.l > 1 ? hsl.l / 100 : hsl.l;
  const hslFields = (
    <div style={styles.fields} className="flexbox-fix">
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="h"
          value={`${Math.round(hsl.h)}`}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="s"
          value={`${Math.round(s * 100)}%`}
          onChange={handleChange}
        />
      </div>
      <div style={styles.field}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="l"
          value={`${Math.round(l * 100)}%`}
          onChange={handleChange}
        />
      </div>
      <div style={styles.alpha}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="a"
          value={`${hsl.a}`}
          arrowOffset={0.01}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div style={styles.wrap} className="flexbox-fix" id="chromeFields">
      <div
        style={{ ...styles.fields, display: viewState === 'rgb' ? 'flex' : 'none' }}
        className="flexbox-fix"
      >
        {rgbFields}
      </div>

      <div
        style={{ ...styles.fields, display: viewState === 'hsl' ? 'flex' : 'none' }}
        className="flexbox-fix"
      >
        {hslFields}
      </div>

      <div
        style={{ ...styles.fields, display: viewState === 'hex' ? 'flex' : 'none' }}
        className="flexbox-fix"
      >
        {hexFields}
      </div>
      <div style={styles.toggle}>
        <div
          style={styles.icon}
          onKeyDown={toggleViews}
          onClick={toggleViews}
          ref={inputRef}
          role="button"
          tabIndex={0}
        >
          <SwapHoriz
            style={styles.svg}
            onMouseOver={showHighlight}
            onFocus={showHighlight}
            onMouseEnter={showHighlight}
            onMouseOut={hideHighlight}
            onBlur={hideHighlight}
          />
        </div>
      </div>
    </div>
  );
};

ChromeFields.propTypes = {
  hsl: PropTypes.shape({
    h: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
  rgb: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  hex: PropTypes.string.isRequired,
  view: PropTypes.oneOf([
    'hex',
    'rgb',
    'hsl',
  ]),
};

ChromeFields.defaultProps = {
  view: 'hex',
};

export default ChromeFields;
