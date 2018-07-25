import React, { Component } from "react";
import cn from "classnames";

import { line } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { getScaleTicks, isIE11 } from "../../utils/utils";
import { HorizontalTick, VerticalTick, InteractiveTooltip } from "../../components/common/common";
import { YScale } from "../../components/y-scale/y-scale";
import { Svg } from "../../components/svg/svg";
import { DEFAULT_COLORS } from "../../assets/theme/colors";
import { getRandomColor } from "../../utils/color";
import { calcRercentagesFromMaxValue } from "../../utils/number";

import styles from "./line-chart.scss";

const Label = ({ label, left, width, height, selected, centering, index }) => {
  return (
    <div
      className={cn(styles.label, { [styles.selected]: selected })}
      style={{
        width,
        left,
        height,
        transform: `translate(${centering || index === 0 ? "0" : "-50%"}, 100%)`,
        justifyContent: !centering && index === 0 && "flex-start",
      }}
    >
      {label}
    </div>
  );
};

const Point = ({
  pointSize,
  pointBorderwidth,
  left,
  centering,
  top,
  onMouseLeave,
  onMouseEnter,
  tooltip,
}) => {
  const isNegative = !centering ? "-" : "";

  return (
    <div
      className={styles.point}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        width: pointSize,
        height: pointSize,
        borderWidth: pointBorderwidth,
        left,
        top,
        transform: `translate(${isNegative}50%, -50%)`,
      }}
    >
      {tooltip}
    </div>
  );
};

export class LineChart extends Component {
  static propTypes = types;

  static defaultProps = props;

  state = {
    selectedIndex: null,
  };

  renderSVG = () => {
    const {
      svgChildren,
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
      <Svg width={width} height={height}>
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
      xScaleHeight,
      tickColor,
      height,
      sectionWidth,
      labels,
      yScaleWidth,
      centering,
      colors,
      tooltipPrefix,
      pointSize,
    } = this.props;

    const { selectedIndex } = this.state;

    const h = height - xScaleHeight;

    const length = centering ? data.length : data.length - 1;

    const width = (length ? length : 1) * sectionWidth;

    const ticks = getScaleTicks(data, yMinTicks);

    const topValue = 100 / (ticks.length - 1);

    const calculatedData = calcRercentagesFromMaxValue(data, ticks[0]);

    return (
      <div className={cn(styles.lineChartContainer, className, line)}>
        <YScale
          {...this.props}
          height={h}
          ticks={ticks}
          topValue={topValue}
          classNamePrefix={line}
        />
        <div className={styles.overflow} style={{ width: width + sectionWidth / (isIE11 ? 1 : 2) }}>
          <div
            className={styles.container}
            style={{
              borderRight: centering || data.length === 1 ? "1px solid" : "none",
              borderColor: tickColor,
              height: h,
              width,
              marginBottom: xScaleHeight,
            }}
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
              const offset = centering ? yScaleWidth / 2 : index === 0 ? pointSize / 2 : 0;
              const left = index * sectionWidth;
              const pointleft = index * sectionWidth + offset;
              const top = h - (calculatedData[index] * h) / 100;

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
                    index={index}
                    centering={centering}
                    selected={selectedIndex === index}
                    width={sectionWidth}
                    label={labels[index]}
                    left={left}
                    height={xScaleHeight}
                  />
                  <Point
                    key={`${value}-${index}-point`}
                    {...this.props}
                    onMouseEnter={() => this.setState({ selectedIndex: index })}
                    onMouseLeave={() => this.setState({ selectedIndex: null })}
                    value={value}
                    left={pointleft}
                    top={top}
                    centering={centering}
                    tooltip={
                      <InteractiveTooltip
                        centering={centering}
                        index={index}
                        tooltipValue={data[index]}
                        classNamePrefix={line}
                        selected={index === selectedIndex}
                        tooltipPrefix={tooltipPrefix}
                        color={colors[0] || DEFAULT_COLORS[0] || getRandomColor()}
                      />
                    }
                  />
                </div>
              );
            })}
            {this.renderSVG()}
            {children}
          </div>
        </div>
      </div>
    );
  }
}
