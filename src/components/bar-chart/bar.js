import React from "react";
import cn from "classnames";

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
}) => {
  const percentWithHiddentick = (percent * (100 - topValue)) / 100;
  const tooltipAboveBar = (percent / 100) * height < tooltipHeight;
  console.info("--> tooltipAboveBar", tooltipAboveBar);

  return (
    <div
      className={styles.barContainer}
      style={{ width: barContainerWidth, marginBottom: xScaleHeight, borderColor: tickColor }}
    >
      <div
        className={styles.bar}
        style={{
          width: responsive ? "80%" : barWidth,
          height: `${firsTickHidden ? percentWithHiddentick : percent}%`,
          backgroundColor: color,
        }}
      >
        <div
          className={cn(styles.tooltip, { [styles.tooltipAboveBar]: tooltipAboveBar })}
          style={{ height: tooltipHeight }}
        >
          {tooltipValue}
        </div>
      </div>
      <div className={styles.label} style={{ height: xScaleHeight }}>
        {labels[index]}
      </div>
    </div>
  );
};
