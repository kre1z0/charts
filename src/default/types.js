import PropTypes from "prop-types";

export const types = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.number])),
  labels: PropTypes.arrayOf(PropTypes.string),
  diameter: PropTypes.number,
  strokeWidth: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  fill: PropTypes.string,
  responsive: PropTypes.bool,
  tooltips: PropTypes.bool,
  textProps: PropTypes.object,
  precision: PropTypes.number,
  tooltip: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  percentages: PropTypes.bool,
  prefix: PropTypes.string,
  interactiveLegend: PropTypes.bool,
  // pie
  offset: PropTypes.number,
  offsetColor: PropTypes.string,
  // bar
  interactiveBars: PropTypes.bool,
  height: PropTypes.number,
  tooltipPrefix: PropTypes.string,
  tooltipHeight: PropTypes.number,
  multiColors: PropTypes.bool,
  yMinTicks: PropTypes.number,
  xScaleHeight: PropTypes.number,
  tickColor: PropTypes.string,
  barContainerWidth: PropTypes.number,
  barWidth: PropTypes.number,
};
