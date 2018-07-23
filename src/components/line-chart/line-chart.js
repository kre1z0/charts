import React, { Component } from "react";
import cn from "classnames";

import { line } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { getScaleTicks } from "../../utils/utils";
import { HorizontalTick, VerticalTick } from "../../components/common/common";
import { YScale } from "../../components/y-scale/y-scale";
import { Svg } from "../../components/svg/svg";
import { DEFAULT_COLORS } from "../../assets/theme/colors";
import { getRandomColor } from "../../utils/color";
import { calcRercentagesFromMaxValue } from "../../utils/number";

import styles from "./line-chart.scss";

const Label = ({ label, left, width, height }) => {
  return (
    <div className={styles.label} style={{ width, left, height }}>
      {label}
    </div>
  );
};

export class LineChart extends Component {
  static propTypes = types;

  static defaultProps = props;

  renderSVG = () => {
    const {
      svgChildren,
      responsive,
      height,
      data,
      sectionWidth,
      lineWidth,
      yMinTicks,
      colors,
      centering,
      xScaleHeight,
    } = this.props;
    const length = centering ? data.length : data.length - 1;
    const width = length ? length * sectionWidth : sectionWidth;
    const h = height - xScaleHeight;

    const ticks = getScaleTicks(data, yMinTicks);

    const paths = [];
    const circles = [];

    let x = centering ? -sectionWidth / 2 : -sectionWidth;
    let y = 0;

    calcRercentagesFromMaxValue(data, ticks[0]).forEach((n, index) => {
      let d = "";
      d += `M ${x},${index === 0 && !centering ? h - Math.ceil((h * n) / 100) : y}`;
      x += sectionWidth;
      y = h - Math.ceil((h * n) / 100);
      d += `L ${x},${y}`;

      if (index === 0) return;
      paths.push(
        <path
          key={`${n}-${index}-line-chart-path`}
          d={d}
          fill="rgb(0,0,0)"
          fillOpacity={0}
          stroke={colors[0] || DEFAULT_COLORS[0] || getRandomColor()}
          strokeWidth={lineWidth}
        />,
      );
    });
    return (
      <Svg width={width} height={height} responsive={responsive}>
        {paths}
        {svgChildren}
      </Svg>
    );
  };

  render() {
    const {
      data,
      children,
      className,
      yMinTicks,
      style,
      responsive,
      xScaleHeight,
      tickColor,
      height,
      sectionWidth,
      labels,
      yScaleWidth,
    } = this.props;

    const h = height - xScaleHeight;

    const ticks = getScaleTicks(data, yMinTicks);

    const topValue = 100 / (ticks.length - 1);

    return (
      <div className={cn(styles.lineChartContainer, className, line)}>
        <YScale
          {...this.props}
          height={h}
          ticks={ticks}
          topValue={topValue}
          classNamePrefix={line}
        />
        <div className={styles.overflow} style={{ paddingLeft: yScaleWidth }}>
          <div
            className={styles.lineChart}
            style={{
              marginBottom: xScaleHeight,
              width: responsive ? "100%" : "auto",
              ...style,
            }}
          >
            <div
              className={styles.container}
              style={{ borderColor: tickColor, height: h, width: responsive ? "100%" : "auto" }}
            >
              {ticks.map(
                (tick, index) =>
                  index !== 0 && (
                    <HorizontalTick
                      key={`${tick}-${index}-horizontal`}
                      top={topValue * index}
                      tickColor={tickColor}
                    />
                  ),
              )}
              {data.map((value, index) => {
                return (
                  <div key={`${value}-${index}-vertical`}>
                    {index !== 0 && (
                      <VerticalTick
                        left={index * sectionWidth}
                        height={h}
                        index={index}
                        tickColor={tickColor}
                      />
                    )}
                    <Label
                      width={sectionWidth}
                      label={labels[index]}
                      left={index * sectionWidth}
                      height={xScaleHeight}
                    />
                  </div>
                );
              })}
              {this.renderSVG()}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
