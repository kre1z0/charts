import React, { Component } from "react";
import PropTypes from "prop-types";

import { Legend } from "../../components/legend/Legend";
import { coordsFromAngle, convertValuesToDeg } from "../../utils/number";
import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./donut-chart.scss";

export class DonutChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    diameter: PropTypes.number,
    strokeWidth: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    fill: PropTypes.string,
    responsive: PropTypes.bool,
    tooltips: PropTypes.bool,
    textProps: PropTypes.object,
  };

  static defaultProps = {
    data: [144, 27, 88, 12],
    colors: DEFAULT_COLORS,
    diameter: 200,
    strokeWidth: 32,
    fill: "transparent",
    responsive: false,
    tooltips: true,
    textProps: {},
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
    const {
      data,
      colors,
      strokeWidth,
      diameter,
      fill,
      responsive,
      textProps,
      tooltips,
    } = this.props;

    const size = diameter - strokeWidth;

    const radius = size / 2;
    const r2 = size + strokeWidth;
    const c = radius + strokeWidth / 2;

    let startAngle = 0;
    let endAngle = 0;

    const paths = [];
    const labels = [];

    convertValuesToDeg(data).forEach((value, index) => {
      endAngle += value;

      const centerPathAngle = parseFloat((startAngle + (endAngle - startAngle) / 2).toFixed(1));

      const { x, y } = coordsFromAngle(centerPathAngle, diameter / 2, radius);

      tooltips &&
        labels.push(
          <text
            key={`${value}-${index}-text`}
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="central"
            {...textProps}
          >
            {data[index]}
          </text>,
        );
      paths.push(
        <path
          key={`${value}-${index}-path`}
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
          r={diameter / 2}
          cx={c}
          cy={c}
          fill={fill}
          width={r2}
          height={r2}
          viewBox={[0, 0, r2, r2].join(" ")}
        />
        {paths}
        {labels}
      </svg>
    );
  }

  render() {
    const { children, data, colors } = this.props;

    return (
      <div className={styles.donutChart}>
        {this.renderSVG()}
        {children}
        <Legend data={data} colors={colors} />
      </div>
    );
  }
}
