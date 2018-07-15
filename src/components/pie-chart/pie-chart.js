import React, { Component } from "react";
import cn from "classnames";

import { types } from "../../default/types";
import { props } from "../../default/props";
import { Circle } from "../../components/svg/circle";
import { Legend } from "../../components/legend/Legend";
import { browser } from "../../utils/utils";
import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./pie-chart.scss";
import { coordsFromAngle, calcRercentages } from "../../utils/number";

export class PieChart extends Component {
  static propTypes = types;

  static defaultProps = props;

  state = {
    turnOffValues: [],
  };

  calculateSectors = ({ data, size }) => {
    const sectors = [];

    const l = size / 2;
    let a = 0; // Angle
    let aRad = 0; // Angle in Rad
    let startAngle = 0;
    let endAngle = 0;
    let centerPathAngle = 0;
    let pathDeg = 0;
    let z = 0; // Size z
    let x = 0; // Side x
    let y = 0; // Side y
    let X = 0; // SVG X coordinate
    let Y = 0; // SVG Y coordinate
    let R = 0; // Rotation

    calcRercentages(data).forEach(percent => {
      const angle = 360 * (percent / 100);
      endAngle += angle;
      pathDeg = endAngle - startAngle;
      centerPathAngle = parseFloat((startAngle + pathDeg / 2).toFixed(1));
      a = angle;
      let aCalc = a > 180 ? 360 - a : a;
      aRad = (aCalc * Math.PI) / 180;
      z = Math.sqrt(2 * l * l - 2 * l * l * Math.cos(aRad));
      if (aCalc <= 90) {
        x = l * Math.sin(aRad);
      } else {
        x = l * Math.sin(((180 - aCalc) * Math.PI) / 180);
      }

      y = Math.sqrt(z * z - x * x);
      Y = y;

      let arcSweep = 0;

      if (a <= 180) {
        X = l + x;
        arcSweep = 0;
      } else {
        X = l - x;
        arcSweep = 1;
      }

      sectors.push({
        arcSweep: arcSweep,
        centerPathAngle,
        pathDeg,
        L: l,
        X: X,
        Y: Y,
        R: R,
      });
      startAngle += angle;
      R = R + a;
    });

    return sectors;
  };

  renderSVG = () => {
    const { turnOffValues } = this.state;
    const { data, responsive, size, colors, textProps, tooltip } = this.props;
    const isIE11 = browser === "IE 11";

    const paths = [];
    const tooltips = [];

    const filteredData = data.filter((_, index) => !turnOffValues.some(value => value === index));

    const filteredColors = colors.filter(
      (_, index) => !turnOffValues.some(value => value === index),
    );

    const textXOffset = size / 10;

    this.calculateSectors({ data: filteredData, size }).forEach(
      ({ R, L, X, Y, percentage, arcSweep, centerPathAngle, pathDeg }, index, array) => {
        const arrayHasOneItem = array.length === 1;

        const { x, y } = coordsFromAngle(centerPathAngle, L, L - textXOffset);

        tooltip &&
          pathDeg > 9 &&
          tooltips.push(
            <text
              key={`${percentage}-${index}-text`}
              textAnchor="middle"
              alignmentBaseline="central"
              x={x}
              y={arrayHasOneItem ? coordsFromAngle(0, L, L - textXOffset).y : y}
              {...textProps}
            >
              {filteredData[index]}
            </text>,
          );

        if (arrayHasOneItem) {
          paths.push(
            <Circle
              size={size}
              key={`${percentage}-${index}`}
              r={size / 2}
              fill={filteredColors[index] || DEFAULT_COLORS[index]}
            />,
          );
        } else {
          paths.push(
            <path
              key={`${percentage}-${index}`}
              fill={filteredColors[index] || DEFAULT_COLORS[index]}
              d={`M${L},${L} L${L},0 A${L},${L} 0 ${arcSweep},1 ${X}, ${Y} z`}
              transform={`rotate(${R}, ${L}, ${L})`}
            />,
          );
        }
      },
    );

    return (
      <svg
        style={{ flex: isIE11 ? "0 1 auto" : "1 1" }}
        width={responsive && !isIE11 ? "100%" : size}
        height={responsive && !isIE11 ? "100%" : size}
        viewBox={[0, 0, size, size].join(" ")}
      >
        {paths}
        {tooltips}
      </svg>
    );
  };

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
    const { style, className, children } = this.props;

    return (
      <div className={cn(styles.pieChart, className)} style={style}>
        {this.renderSVG()}
        {children}
        <Legend
          {...this.props}
          turnOffValues={turnOffValues}
          onTurnOffValue={this.onTurnOffValue}
        />
      </div>
    );
  }
}