const isNumber = (value) => !Number.isNaN(parseFloat(value));
const calculateChange = (e, hsl, container) => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  }
  if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  const saturation = left / containerWidth;
  const bright = 1 - (top / containerHeight);
  return {
    h: hsl.h,
    s: isNumber(saturation) ? saturation : 0,
    v: isNumber(bright) ? bright : 0,
    a: hsl.a,
    source: 'hsv',
  };
};

export default calculateChange;
