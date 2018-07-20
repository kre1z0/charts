import React, { Component } from "react";
import cn from "classnames";

import { line } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { getScaleTicks } from "../../utils/utils";
import { Tick } from "../../components/common/common";
import { YScale } from "../../components/y-scale/y-scale";

import styles from "./line-chart.scss";

export class LineChart extends Component {
  static propTypes = types;

  static defaultProps = props;

  render() {
    const {
      data,
      className,
      yMinTicks,
      style,
      responsive,
      xScaleHeight,
      tickColor,
      height,
    } = this.props;

    const ticks = getScaleTicks(data, yMinTicks);

    const topValue = 100 / (ticks.length - 1);

    return (
      <div className={cn(styles.lineChartContainer, className, line)}>
        <YScale {...this.props} ticks={ticks} topValue={topValue} classNamePrefix={line} />
        <div className={styles.overflow}>
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
              <svg>
                <polygon points="15,100 17,100 77,55 57,79" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
