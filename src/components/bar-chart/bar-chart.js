import React, { Component } from "react";

import { prefix } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { calcRercentagesFromMaxValue } from "../../utils/number";
import { getScaleTicks } from "../../utils/utils";
import { YScale } from "../../components/y-scale/y-scale";
import { Bar } from "./bar";

import styles from "./bar-chart.scss";
import cn from "classnames";
import { DEFAULT_COLORS } from "../../assets/theme/colors";
import { getRandomColor } from "../../utils/color";

const Tick = ({ topValue, index, tickColor, firsTickHidden }) => {
  if (firsTickHidden && index === 0) return null;
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

  render() {
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
      firsTickHidden,
    } = this.props;

    const ticks = getScaleTicks(data, yMinTicks);

    const topValue = 100 / (ticks.length - 1);

    return (
      <div className={cn(styles.barChartContainer, className)}>
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
                  firsTickHidden={firsTickHidden}
                />
              ))}
              {calcRercentagesFromMaxValue(data, ticks[0]).map((percent, index) => {
                return (
                  <Bar
                    {...this.props}
                    tooltipValue={data[index]}
                    topValue={topValue}
                    index={index}
                    barContainerWidth={responsive ? `${100 / data.length}%` : barContainerWidth}
                    key={`${percent}-${index}`}
                    percent={percent}
                    color={
                      colors[multiColors ? index : 0] || DEFAULT_COLORS[index] || getRandomColor()
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}