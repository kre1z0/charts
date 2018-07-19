import React, { Component } from "react";

import { bar } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { calcRercentagesFromMaxValue } from "../../utils/number";
import { getScaleTicks } from "../../utils/utils";
import { YScale } from "../../components/y-scale/y-scale";
import { Bar, Label, MultiTooltip } from "./bar";

import styles from "./bar-chart.scss";
import barStyles from "./bar.scss";
import cn from "classnames";
import { DEFAULT_COLORS } from "../../assets/theme/colors";
import { getRandomColor } from "../../utils/color";

const Tick = ({ topValue, index, tickColor }) => {
  if (index === 0) return null;
  return (
    <div
      className={styles.tick}
      style={{ top: `${topValue * index}%`, backgroundColor: tickColor }}
    />
  );
};

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
    } = this.props;

    const ticks = getScaleTicks(data, yMinTicks);

    const topValue = 100 / (ticks.length - 1);

    return (
      <div className={cn(styles.barChartContainer, className, bar)}>
        <YScale {...this.props} ticks={ticks} topValue={topValue} />
        <div className={styles.overflow}>
          <div
            className={styles.barChart}
            style={{
              marginBottom: xScaleHeight,
              width: responsive ? "100%" : "auto",
              ...style,
            }}
          >
            <div
              className={styles.container}
              style={{ borderColor: tickColor, height, width: responsive ? "100%" : "auto" }}
            >
              {ticks.map((tick, index) => (
                <Tick
                  key={`${tick}-${index}`}
                  index={index}
                  topValue={topValue}
                  tickColor={tickColor}
                />
              ))}
              {calcRercentagesFromMaxValue(data, ticks[0]).map((value, index) => {
                const barProps = {
                  selected: hoveredIndex === index,
                  onMouseEnter: () => this.onMouseEnter(index),
                  onMouseLeave: () => this.setState({ hoveredIndex: null }),
                  barContainerWidth: responsive
                    ? `${100 / data[index].length}%`
                    : barContainerWidth,
                  topValue: topValue,
                };

                if (Array.isArray(value)) {
                  return (
                    <div
                      key={`${index}-stack`}
                      className={barStyles.stackBar}
                      style={{ borderColor: tickColor }}
                    >
                      {value.map((item, i) => {
                        return (
                          <Bar
                            {...this.props}
                            {...barProps}
                            stacked={value.length > 1}
                            multiStackTooltip={
                              value.length > 1 &&
                              i === 0 && (
                                <MultiTooltip
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
