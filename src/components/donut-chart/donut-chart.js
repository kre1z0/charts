import React, { Component } from "react";
import cn from "classnames";

import { Svg } from "../../components/svg/svg";
import { Circle } from "../../components/svg/circle";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { Legend } from "../../components/legend/Legend";
import { coordsFromAngle, convertValuesToDeg } from "../../utils/number";
import { turnOffValue } from "../../utils/utils";
import { getRandomColor } from "../../utils/color";
import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./donut-chart.scss";

export class DonutChart extends Component {
  static propTypes = types;

  static defaultProps = props;

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
      size: diameter,
      fill,
      responsive,
      textProps,
      tooltip,
      svgChildren,
    } = this.props;

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
            {filteredData[index]}
          </text>,
        );

      if (arrayHasOneItem) {
        paths.push(
          <Circle
            size={r2}
            key={`${value}-${index}-circle`}
            stroke={filteredColors[index] || DEFAULT_COLORS[index] || getRandomColor()}
            strokeWidth={strokeWidth}
            r={(diameter - strokeWidth) / 2}
            cx={c}
            cy={c}
            fill={fill}
          />,
        );
      } else {
        paths.push(
          <path
            key={`${value}-${index}-path`}
            d={this.describeArc(c, c, radius, startAngle, endAngle)}
            fill="rgb(0,0,0)"
            fillOpacity={0}
            stroke={filteredColors[index] || DEFAULT_COLORS[index] || getRandomColor()}
            strokeWidth={strokeWidth}
          />,
        );
      }

      startAngle += value;
    });

    return (
      <Svg size={r2} responsive={responsive}>
        {paths}
        {tooltips}
        {svgChildren}
      </Svg>
    );
  }

  render() {
    const { turnOffValues } = this.state;
    const { children, style, className } = this.props;

    return (
      <div className={cn(styles.donutChart, className)} style={style}>
        {this.renderSVG()}
        {children}
        <Legend
          {...this.props}
          turnOffValues={turnOffValues}
          onTurnOffValue={index => this.setState(turnOffValue(index, turnOffValues))}
        />
      </div>
    );
  }
}
