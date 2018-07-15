import PropTypes from "prop-types";

export const types = {
  data: PropTypes.arrayOf(PropTypes.number),
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
  stroke: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  legendClassName: PropTypes.string,
  percentages: PropTypes.bool,
  prefix: PropTypes.string,
  interactiveLegend: PropTypes.bool,
};
