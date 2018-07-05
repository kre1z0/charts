import React, { Component } from "react";
import PropTypes from "prop-types";

import { SvgRender } from "../painter/SvgRender";

import styles from "./donut-chart.scss";

const DEFAULT_COLORS = [
  "rgba(231,76,60,1)",
  "rgba(169,50,38,1)",
  "rgba(171,96,202,1)",
  "rgba(125,60,152,1)",
  "rgba(59,150,209,1)",
  "rgba(20,95,144,1)",
  "rgba(36,190,160,1)",
  "rgba(12,146,120,1)",
  "rgba(241,196,15,1)",
  "rgba(230,126,34,1)",
];

export class DonutChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    fill: PropTypes.string,
    stroke: PropTypes.string,
    responsive: PropTypes.string,
  };

  static defaultProps = {
    data: [144, 27, 88, 12],
    size: 200,
    strokeWidth: 30,
    colors: DEFAULT_COLORS,
    fill: "#fff",
    stroke: "green",
    responsive: false,
  };

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  describeArc(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
      " ",
    );

    return d;
  }

  renderSVG() {
    const { data, strokeWidth, stroke, fill, colors, responsive } = this.props;

    const size = this.props.size - strokeWidth;

    const radius = size / 2;
    const r2 = size + strokeWidth;
    const c = radius + strokeWidth / 2;

    const sum = data.reduce((a, b) => a + b, 0);

    const convertValuesToDeg = values => {
      return values.map(n => parseFloat(((360 * n) / sum).toFixed(1)));
    };

    let startAngle = 0;
    let endAngle = 0;

    const paths = [];

    convertValuesToDeg(data).map((value, index) => {
      endAngle += value;
      paths.push(
        <path
          key={`${value}-${index}`}
          d={this.describeArc(c, c, radius, startAngle, endAngle)}
          fill="rgb(0,0,0)"
          fillOpacity={0}
          stroke={colors[index] ? colors[index] : DEFAULT_COLORS[index]}
          strokeWidth={strokeWidth}
          width={r2}
          height={r2}
          viewBox={[0, 0, r2, r2].join(" ")}
        />,
      );
      startAngle += value;
    });

    return (
      <svg
        width={responsive ? "100%" : r2}
        height={responsive ? "100%" : r2}
        viewBox={[0, 0, r2, r2].join(" ")}
      >
        <circle
          r={radius}
          cx={c}
          cy={c}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          width={r2}
          height={r2}
          viewBox={[0, 0, r2, r2].join(" ")}
        />
        {paths}
      </svg>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.donutChart}>
        {this.renderSVG()}
        {children}
      </div>
    );
  }
}
