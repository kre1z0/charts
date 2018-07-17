import React from "react";
import cn from "classnames";

import { hexToRGBA } from "../../utils/color";

import styles from "./bar.scss";

export const Bar = ({
  percent,
  color,
  labels,
  index,
  height,
  xScaleHeight,
  barContainerWidth,
  barWidth,
  topValue,
  firsTickHidden,
  tickColor,
  tooltipValue,
  tooltipHeight,
  responsive,
  tooltip,
  tooltipPrefix,
  interactiveBars,
}) => {
  const percentWithHiddentick = (percent * (100 - topValue)) / 100;
  const tooltipAboveBar = (percent / 100) * height < tooltipHeight;

  return (
    <div
      className={styles.barContainer}
      style={{
        width: barContainerWidth,
        marginBottom: xScaleHeight,
        borderColor: tickColor,
      }}
    >
      <div
        className={cn(styles.bar, { [styles.interactiveBars]: interactiveBars })}
        style={{
          width: responsive ? "80%" : barWidth,
          height: `${firsTickHidden ? percentWithHiddentick : percent}%`,
          backgroundColor: color,
          boxShadow: `0px 2px 4px 0 ${hexToRGBA(color, 0.5)}`,
        }}
      >
        {interactiveBars && (
          <div className={styles.interactiveTooltip} style={{ backgroundColor: color }}>
            {tooltipValue} <span>{tooltipPrefix}</span>
            <div className={styles.triangle} style={{ borderTopColor: color }} />
          </div>
        )}
        {tooltip && (
          <div
            className={cn(styles.tooltip, { [styles.tooltipAboveBar]: tooltipAboveBar })}
            style={{ height: tooltipHeight }}
          >
            {tooltipValue}
            <span>{tooltipPrefix}</span>
          </div>
        )}
      </div>
      <div className={styles.label} style={{ height: xScaleHeight }}>
        {labels[index]}
      </div>
    </div>
  );
};
