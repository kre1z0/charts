import React, { Component } from "react";
import PropTypes from "prop-types";

import { browser } from "../../utils/utils";
import { Legend } from "../../components/legend/Legend";
import { coordsFromAngle, convertValuesToDeg } from "../../utils/number";
import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./donut-chart.scss";

export class DonutChart extends Component {
  static propTypes = {
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
  };

  static defaultProps = {
    data: [60.74, 11.6, 10.4, 6.13, 3.49, 2.28, 1.4, 0.92, 0.73, 2.32],
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
    diameter: 200,
    strokeWidth: 32,
    fill: "transparent",
    responsive: false,
    tooltip: true,
    textProps: {},
    precision: 1,
    stroke: "rgba(51, 51, 51, 0.2)",
  };

  state = {
    turnOffValues: [],
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
    const { turnOffValues } = this.state;
    const {
      data,
      colors,
      strokeWidth,
      diameter,
      fill,
      responsive,
      textProps,
      tooltip,
      precision,
      stroke,
      svgChildren,
    } = this.props;

    const isIE11 = browser === "IE 11";

    const size = diameter - strokeWidth;

    const radius = size / 2;
    const r2 = size + strokeWidth;
    const c = radius + strokeWidth / 2;

    let startAngle = 0;
    let endAngle = 0;

    const paths = [];
    const tooltips = [];

    const filteredData = data.filter((_, index) => !turnOffValues.some(value => value === index));
    const filteredColors = colors.filter(
      (_, index) => !turnOffValues.some(value => value === index),
    );

    convertValuesToDeg(filteredData).forEach((value, index, array) => {
      endAngle += value;

      const pathDeg = endAngle - startAngle;

      const centerPathAngle = parseFloat((startAngle + pathDeg / 2).toFixed(1));

      const arrayHasOneItem = array.length === 1;

      const { x, y } = coordsFromAngle(centerPathAngle, diameter / 2, radius);

      tooltip &&
        pathDeg > 9 &&
        tooltips.push(
          <text
            key={`${value}-${index}-text`}
            x={x}
            y={arrayHasOneItem ? coordsFromAngle(0, diameter / 2, radius).y : y}
            textAnchor="middle"
            alignmentBaseline="central"
            {...textProps}
          >
            {filteredData[index].toFixed(precision)}
          </text>,
        );

      if (arrayHasOneItem) {
        paths.push(
          <circle
            stroke={filteredColors[index] ? filteredColors[index] : DEFAULT_COLORS[index]}
            strokeWidth={strokeWidth}
            r={(diameter - strokeWidth) / 2}
            cx={c}
            cy={c}
            fill={fill}
            width={r2}
            height={r2}
            viewBox={[0, 0, r2, r2].join(" ")}
          />,
        );
      } else {
        paths.push(
          <path
            key={`${value}-${index}-path`}
            d={this.describeArc(c, c, radius, startAngle, endAngle)}
            fill="rgb(0,0,0)"
            fillOpacity={0}
            stroke={filteredColors[index] ? filteredColors[index] : DEFAULT_COLORS[index]}
            strokeWidth={strokeWidth}
            width={r2}
            height={r2}
            viewBox={[0, 0, r2, r2].join(" ")}
          />,
        );
      }

      startAngle += value;
    });

    return (
      <svg
        style={{ flex: isIE11 ? "0 1 auto" : "1 1" }}
        width={responsive && !isIE11 ? "100%" : r2}
        height={responsive && !isIE11 ? "100%" : r2}
        viewBox={[0, 0, r2, r2].join(" ")}
      >
        <circle
          stroke={stroke}
          strokeWidth={strokeWidth}
          r={(diameter - strokeWidth) / 2}
          cx={c}
          cy={c}
          fill={fill}
          width={r2}
          height={r2}
          viewBox={[0, 0, r2, r2].join(" ")}
        />
        {paths}
        {tooltips}
        {svgChildren}
      </svg>
    );
  }

  onTurnOffValue = index => {
    const { turnOffValues } = this.state;
    const isContain = turnOffValues.some(value => value === index);

    if (isContain) {
      this.setState({
        turnOffValues: turnOffValues.filter(value => value !== index),
      });
    } else {
      this.setState({
        turnOffValues: turnOffValues.concat(index),
      });
    }
  };

  render() {
    const { turnOffValues } = this.state;
    const { children, data, colors, labels } = this.props;
    console.info("--> turnOffValues", turnOffValues);
    return (
      <div className={styles.donutChart}>
        {this.renderSVG()}
        {children}
        <Legend
          data={data}
          colors={colors}
          labels={labels}
          turnOffValues={turnOffValues}
          onTurnOffValue={this.onTurnOffValue}
        />
      </div>
    );
  }
}
