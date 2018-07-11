export function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

export function coordsFromAngle(degree, center, radius) {
  const x = Math.floor(center + radius * Math.sin(degreesToRadians(degree)));
  const y = Math.floor(center + radius * -Math.cos(degreesToRadians(degree)));
  return { x, y };
}

export const sum = values => values.reduce((a, b) => a + b, 0);

// export const convertValuesToDeg = values =>
//   values.map(n => parseFloat(((360 * n) / sum(values)).toFixed(1)));

export const convertValuesToDeg = values => {
  console.info("--> convertValuesToDeg", values);
  console.info("--> return ", values.map(n => parseFloat(((360 * n) / sum(values)).toFixed(1))));
  return values.map(n => parseFloat(((360 * n) / sum(values)).toFixed(1)));
};
