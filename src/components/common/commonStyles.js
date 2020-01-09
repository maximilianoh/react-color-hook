import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import * as checkboard from '../../helpers/checkboard';

export const alphaStyle = (props, rgb) => reactCSS({
  default: {
    alpha: {
      absolute: '0px 0px 0px 0px',
      borderRadius: props.radius,
    },
    checkboard: {
      absolute: '0px 0px 0px 0px',
      overflow: 'hidden',
      borderRadius: props.radius,
    },
    gradient: {
      absolute: '0px 0px 0px 0px',
      background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
             rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
      boxShadow: props.shadow,
      borderRadius: props.radius,
    },
    container: {
      position: 'relative',
      height: '100%',
      margin: '0 3px',
      outline: 'none',
    },
    pointer: {
      position: 'absolute',
      left: `${rgb.a * 100}%`,
    },
    slider: {
      width: '4px',
      borderRadius: '1px',
      height: '8px',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
      background: '#fff',
      marginTop: '1px',
      transform: 'translateX(-2px)',
    },
  },
  vertical: {
    gradient: {
      background: `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
             rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
    },
    pointer: {
      left: 0,
      top: `${rgb.a * 100}%`,
    },
  },
  overwrite: {
    ...props.style,
  },
}, {
  vertical: props.direction === 'vertical',
  overwrite: true,
});

export const checkboardStyle = (white, grey, size, renderers, borderRadius, boxShadow) => reactCSS({
  default: {
    grid: {
      borderRadius,
      boxShadow,
      absolute: '0px 0px 0px 0px',
      background: `url(${checkboard.get(white, grey, size, renderers.canvas)}) center left`,
    },
  },
});

export const editableInputStyle = (props, style) => {
  const { wrap, input } = style;
  return reactCSS({
    default: {
      wrap: {
        position: 'relative',
      },
    },
    'user-override': {
      wrap: style && wrap ? wrap : {},
      input: style && input ? input : {},
      label: style && style.label ? style.label : {},
    },
    'dragLabel-true': {
      label: {
        cursor: 'ew-resize',
      },
    },
  }, {
    'user-override': true,
  }, props);
};

export const hueStyle = (direction, radius, shadow, hsl) => reactCSS({
  default: {
    hue: {
      absolute: '0px 0px 0px 0px',
      borderRadius: radius,
      boxShadow: shadow,
    },
    container: {
      padding: '0 2px',
      position: 'relative',
      height: '100%',
      borderRadius: radius,
      outline: 'none',
    },
    pointer: {
      position: 'absolute',
      left: `${(hsl.h * 100) / 360}%`,
    },
    slider: {
      marginTop: '1px',
      width: '4px',
      borderRadius: '1px',
      height: '8px',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
      background: '#fff',
      transform: 'translateX(-2px)',
    },
  },
  vertical: {
    pointer: {
      left: '0px',
      top: `${-((hsl.h * 100) / 360) + 100}%`,
    },
  },
}, { vertical: direction === 'vertical' });

export const raisedStyle = (zDepth, radius, background, passedStyles) => reactCSS(merge({
  default: {
    wrap: {
      position: 'relative',
      display: 'inline-block',
    },
    content: {
      position: 'relative',
    },
    bg: {
      absolute: '0px 0px 0px 0px',
      boxShadow: `0 ${zDepth}px ${zDepth * 4}px rgba(0,0,0,.24)`,
      borderRadius: radius,
      background,
    },
  },
  'zDepth-0': {
    bg: {
      boxShadow: 'none',
    },
  },

  'zDepth-1': {
    bg: {
      boxShadow: '0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)',
    },
  },
  'zDepth-2': {
    bg: {
      boxShadow: '0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)',
    },
  },
  'zDepth-3': {
    bg: {
      boxShadow: '0 17px 50px rgba(0,0,0,.19), 0 12px 15px rgba(0,0,0,.24)',
    },
  },
  'zDepth-4': {
    bg: {
      boxShadow: '0 25px 55px rgba(0,0,0,.21), 0 16px 28px rgba(0,0,0,.22)',
    },
  },
  'zDepth-5': {
    bg: {
      boxShadow: '0 40px 77px rgba(0,0,0,.22), 0 27px 24px rgba(0,0,0,.2)',
    },
  },
  square: {
    bg: {
      borderRadius: '0',
    },
  },
  circle: {
    bg: {
      borderRadius: '50%',
    },
  },
}, passedStyles), { 'zDepth-1': zDepth === 1 });


export const saturationStyle = (hsl, radius, shadow, hsv, color,
  white, black, circle, point, style) => reactCSS({
  default: {
    color: {
      absolute: '0px 0px 0px 0px',
      background: `hsl(${hsl.h},100%, 50%)`,
      borderRadius: radius,
    },
    white: {
      absolute: '0px 0px 0px 0px',
      borderRadius: radius,
    },
    black: {
      absolute: '0px 0px 0px 0px',
      boxShadow: shadow,
      borderRadius: radius,
    },
    pointer: {
      position: 'absolute',
      top: `${-(hsv.v * 100) + 100}%`,
      left: `${hsv.s * 100}%`,
      cursor: 'default',
    },
    circle: {
      width: '4px',
      height: '4px',
      boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
        0 0 1px 2px rgba(0,0,0,.4)`,
      borderRadius: '50%',
      cursor: 'hand',
      transform: 'translate(-2px, -2px)',
    },
  },
  custom: {
    color,
    white,
    black,
    point,
    circle,
  },
}, { custom: !!style });

export const swatchStyle = (style, focus, focusStyle, color) => reactCSS({
  default: {
    swatch: {
      background: color,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      ...style,
      ...(focus ? focusStyle : {}),
    },
  },
});
