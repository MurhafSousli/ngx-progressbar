export const PositionMethod = {
  TRANSLATE: 'translate',
  TRANSLATE_3D: 'translate3d',
  MARGIN: 'margin',
};

export const clamp = (n, min, max) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};
