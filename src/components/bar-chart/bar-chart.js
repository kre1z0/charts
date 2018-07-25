import React, { Component } from "react";
import cn from "classnames";

import { bar } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { calcRercentagesFromMaxValue } from "../../utils/number";
import { getScaleTicks } from "../../utils/utils";
import { YScale } from "../../components/y-scale/y-scale";
import { HorizontalTick, MultiTooltip } from "../../components/common/common";
import { Bar, Label } from "./bar";

import { DEFAULT_COLORS } from "../../assets/theme/colors";
import { getRandomColor } from "../../utils/color";

import styles from "./bar-chart.scss";
import barStyles from "./bar.scss";

export class BarChart extends Component {
  static propTypes = types;

  static defaultProps = props;

  state = {
    hoveredIndex: null,
  };

  onMouseEnter = hoveredIndex => this.setState({ hoveredIndex });

  render() {
    const { hoveredIndex } = this.state;

    const {
      height,
      style,
      className,
      data,
      colors,
      multiColors,
      yMinTicks,
      tickColor,
      responsive,
      barContainerWidth,
      xScaleHeight,
      labels,
      tooltipPrefix,
      yScaleWidth,
    } = this.props;

    const ticks = getScaleTicks(data, yMinTicks);
    const h = height - xScaleHeight;
    const w = Array.isArray(data[0])
      ? data.reduce((prev, curr) => {
          if (curr.length > prev || prev.length) {
            return curr.length;
          } else return prev.length ? prev.length : prev;
        }, 0) * barContainerWidth
      : data.length * barContainerWidth;

    const topValue = 100 / (ticks.length - 1);

    return (
      <div className={cn(styles.barChartContainer, className, bar)}>
        <YScale
          {...this.props}
          height={h}
          ticks={ticks}
          topValue={topValue}
          classNamePrefix={bar}
        />
        <div className={styles.overflow}>
          <div
            className={styles.barChart}
            style={{
              marginBottom: xScaleHeight,
              width: responsive ? "100%" : w,
              ...style,
            }}
          >
            <div
              className={styles.container}
              style={{ borderColor: tickColor, height: h, width: responsive ? "100%" : w }}
            >
              {ticks.map(
                (tick, index) =>
                  index !== 0 && (
                    <HorizontalTick
                      key={`${tick}-${index}`}
                      top={topValue * index}
                      tickColor={tickColor}
                    />
                  ),
              )}
              {calcRercentagesFromMaxValue(data, ticks[0]).map((value, index) => {
                const barProps = {
                  selected: hoveredIndex === index,
                  onMouseEnter: () => this.onMouseEnter(index),
                  onMouseLeave: () => this.setState({ hoveredIndex: null }),
                  barContainerWidth: responsive
                    ? `${100 / data[index].length}%`
                    : barContainerWidth,
                  topValue: topValue,
                  height: h,
                  classNamePrefix: bar,
                };

                if (Array.isArray(value)) {
                  return (
                    <div
                      key={`${index}-stack`}
                      className={barStyles.stackBar}
                      style={{ borderColor: tickColor }}
                    >
                      {value.map((item, i, array) => {
                        return (
                          <Bar
                            {...this.props}
                            {...barProps}
                            stacked={value.length > 1}
                            multiStackTooltip={
                              value.length > 1 &&
                              i === array.length - 1 && (
                                <MultiTooltip
                                  classNamePrefix={bar}
                                  selected={hoveredIndex === index}
                                  colors={value.map(
                                    (_, i) => colors[i] || DEFAULT_COLORS[i] || getRandomColor(),
                                  )}
                                  values={value.map((_, i) => data[i][index])}
                                  tooltipPrefix={tooltipPrefix}
                                />
                              )
                            }
                            tooltipValue={data[i][index]}
                            index={i}
                            key={`${item}-${data[i][index]}-${index}-${i}`}
                            percent={item}
                            color={colors[i] || DEFAULT_COLORS[i] || getRandomColor()}
                          />
                        );
                      })}
                      <Label label={labels[index] || ""} height={xScaleHeight} />
                    </div>
                  );
                } else {
                  return (
                    <Bar
                      {...this.props}
                      {...barProps}
                      marginBottom={xScaleHeight}
                      label={<Label label={labels[index] || ""} height={xScaleHeight} />}
                      tooltipValue={data[index]}
                      index={index}
                      key={`${value}-${index}`}
                      percent={value}
                      barContainerWidth={responsive ? `${100 / data.length}%` : barContainerWidth}
                      color={
                        colors[multiColors ? index : 0] || DEFAULT_COLORS[index] || getRandomColor()
                      }
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
