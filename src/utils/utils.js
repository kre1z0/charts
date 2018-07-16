import ceil from "lodash/ceil";

export const browser = (() => {
  let ua = navigator.userAgent,
    tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return "IE " + (tem[1] || "");
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem != null) return "Opera " + tem[1];
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(" ");
})();

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const turnOffValue = (index, values) => {
  const isContain = values.some(value => value === index);

  if (isContain) {
    return { turnOffValues: values.filter(value => value !== index) };
  } else {
    return {
      turnOffValues: values.concat(index),
    };
  }
};

export const getScaleTicks = (data, yMinTicks) => {
  const max = Math.max(...data);

  const ticks = [0];
  let value = 0;

  const ceiled = ceil(max / (yMinTicks - 1));
  const length = ceiled.toString().length;
  const tickValue = ceil(ceiled, -length + 2);

  Array.from({ length: yMinTicks - 1 }, () => {
    value += tickValue;
    ticks.push(value);
  });

  return ticks.reverse();
};
