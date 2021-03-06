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

export const convertValuesToDeg = values =>
  values.map(n => parseFloat(((360 * n) / sum(values)).toFixed(1)));

export const calcRercentages = values => {
  const sumValues = sum(values);
  return values.map(n => (n * 100) / sumValues);
};

export const calcRercentagesFromMaxValue = (values, max) => {
  const newData = [];
  if (Array.isArray(values[0])) {
    values.forEach(data => {
      data.forEach((n, i) => {
        if (newData[i]) {
          newData[i].push((n * 100) / max);
        } else {
          newData.push([(n * 100) / max]);
        }
      });
    });
  } else {
    values.forEach(n => newData.push((n * 100) / max));
  }
  return newData;
};

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
