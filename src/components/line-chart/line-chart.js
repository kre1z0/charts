import React, { Component } from "react";
import cn from "classnames";

import { line } from "../../utils/const";
import { types } from "../../default/types";
import { props } from "../../default/props";
import { getScaleTicks } from "../../utils/utils";
import { Tick } from "../../components/common/common";
import { YScale } from "../../components/y-scale/y-scale";
import { Svg } from "../../components/svg/svg";
import { DEFAULT_COLORS } from "../../assets/theme/colors";
import { getRandomColor } from "../../utils/color";
import { calcRercentagesFromMaxValue } from "../../utils/number";

import styles from "./line-chart.scss";

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
    } = this.props;
    const width = data.length * sectionWidth;
    console.info("--> values <--", data);

    const ticks = getScaleTicks(data, yMinTicks);

    const paths = [];

    let x = centering ? -sectionWidth / 2 : 0;
    let y = 0;
    let d = "";

    calcRercentagesFromMaxValue(data, ticks[0]).forEach((n, index) => {
      console.info("***************************");
      console.info("--> DATA <--", data[index]);
      console.info("--> x", x);
      console.info("--> y", y);
      console.info("***************************");
      let d = "";

      if (index > 0 && centering) {
        d += `M ${x},${y}`;
        x += sectionWidth;
        y = height - Math.ceil((height * n) / 100);
        d += `L ${x},${y}`;
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
      } else {
        d += `M ${centering ? x + sectionWidth : x},${
          index === 0 ? height - Math.ceil((height * n) / 100) : y
        }`;
        x += Math.ceil(sectionWidth);
        y = height - Math.ceil((height * n) / 100);
        d += `L ${x},${y}`;
        console.info("&&&&&&&&&", index);
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
      }
    });
    return (
      <Svg width={width} height={height} responsive={responsive}>
        {/*<path stroke="skyblue" strokeWidth={lineWidth} d="M 0,200 L 100,0" />*/}
        {/*<circle cx="10" cy="10" r="2" fill="red" />*/}
        {/*<path*/}
        {/*key="line-chart-path"*/}
        {/*// d={d}*/}
        {/*d={`M 20,63 L 60,161 M 60,161 L 140,101`}*/}
        {/*fill="rgb(0,0,0)"*/}
        {/*fillOpacity={0}*/}
        {/*stroke={colors[0] || DEFAULT_COLORS[0] || getRandomColor()}*/}
        {/*strokeWidth={lineWidth}*/}
        {/*/>*/}
        {/*<path*/}
        {/*key="line-chart-path-2"*/}
        {/*d={d}*/}
        {/*fill="rgb(0,0,0)"*/}
        {/*fillOpacity={0}*/}
        {/*stroke="green"*/}
        {/*strokeWidth={lineWidth}*/}
        {/*/>*/}
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
              {this.renderSVG()}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
