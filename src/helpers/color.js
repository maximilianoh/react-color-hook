import each from 'lodash/each';
import chroma from 'chroma-js';

const isNumber = (value) => !Number.isNaN(parseFloat(value));

export const simpleCheckForValidColor = (data) => {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
  let checked = 0;
  let passed = 0;
  each(keysToCheck, (letter) => {
    if (data[letter]) {
      checked += 1;
      if (isNumber(data[letter])) {
        passed += 1;
      }
    }
  });
  return (checked === passed) ? data : false;
};

export const chromaValidation = (data) => {
  let validation = false;
  try {
    if (data.hex) chroma(data.hex);
    else chroma(data);
    validation = true;
  } catch (error) {
    validation = false;
  }
  return validation;
};

const valueNaN = (h) => (!isNumber(h) ? 0 : h);
const hslaListToObject = (list) => ({
  h: valueNaN(list[0]), s: valueNaN(list[1]), l: valueNaN(list[2]), a: valueNaN(list[3]),
});
const rgbaListToObject = (list) => ({
  r: list[0], g: list[1], b: list[2], a: list[3],
});
const hsvListToObject = (list) => ({
  h: valueNaN(list[0]),
  s: valueNaN(list[1]),
  v: valueNaN(list[2]),
});

export const hsvParse = (color, data) => {
  const s = data.s > 1 ? data.s / 100 : data.s;
  const v = data.v > 1 ? data.v / 100 : data.v;
  const c = chroma.hsv(Number(data.h), Number(s), Number(v));
  const result = {
    ...color,
    hsv: {
      h: Number(data.h),
      s: Number(s),
      v: Number(v),
    },
    hsl: hslaListToObject(c.hsl()),
    rgb: rgbaListToObject(c.rgba()),
    hex: c.hex(),
  };
  return result;
};

export const toState = (data, oldHue) => {
  let transparent = false;
  let colorChroma;
  let a = data.a >= 0 && data.a <= 1 ? data.a : 1;
  if (data.hex && (data.hex === 'transparent' || data === 'transparent')) {
    colorChroma = chroma('#000000').alpha(0);
    a = 0;
    transparent = true;
  } else if (data.hex) colorChroma = chroma(data.hex);
  else if (data.h && data.s && data.l) {
    const s = data.s > 1 ? data.s / 100 : data.s;
    const l = data.l > 1 ? data.l / 100 : data.l;
    colorChroma = chroma.hsl(data.h, s, l);
  } else {
    try {
      colorChroma = chroma(data);
    } catch (error) {
      colorChroma = chroma('#000000');
    }
  }
  const hsl = hslaListToObject(colorChroma.alpha(a).hsl());
  const hsv = hsvListToObject(colorChroma.hsv());
  const rgba = colorChroma.alpha(a).rgba();
  const rgb = rgbaListToObject(rgba);
  const hex = colorChroma.alpha(1).hex();

  return {
    hsl,
    hex: transparent ? 'transparent' : hex,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  };
};

// disable hex4 and hex8
// const lh = (String(hex).charAt(0) === '#') ? 1 : 0;
// const result = hex.length !== (4 + lh) && hex.length < (7 + lh) && chroma.valid(hex);
// const hasHas = hex.indexOf('#') !== 0 ? '#' : '';
export const isValidHex = (hex) => chroma.valid(hex);

export const getContrastingColor = (data) => {
  if (!data) {
    return '#fff';
  }
  let c = data;
  if (data === 'transparent') c = { hex: 'transparent' };
  const col = toState(c);
  if (col.hex === 'transparent') {
    return 'rgba(0,0,0,0.4)';
  }
  const yiq = ((col.rgb.r * 299) + (col.rgb.g * 587) + (col.rgb.b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};
