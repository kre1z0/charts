import { DEFAULT_COLORS } from "../assets/theme/colors";

export const props = {
  data: [60.73, 11.6, 10.4, 6.13, 3.49, 2.28, 1.4, 0.92, 0.73, 2.32],
  labels: [
    "Chrome",
    "Opera",
    "Firefox",
    "Safari",
    "Yandex Browser",
    "IE",
    "Android",
    "Edge",
    "Samsung Internet",
    "Other",
  ],
  colors: DEFAULT_COLORS,
  size: 200,
  strokeWidth: 32,
  fill: "transparent",
  responsive: false,
  tooltip: true,
  textProps: {},
  precision: 1,
  percentages: true,
  prefix: "%",
  interactiveLegend: true,
  // pie
  offset: 1,
  offsetColor: "#fff",
  // bar
  multiColors: false,
  yMinTicks: 5,
  xScaleHeight: 40,
  tickColor: "#dce1e6",
  barContainerWidth: 65,
  barWidth: 30,
  firsTickHidden: true,
};
