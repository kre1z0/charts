import React from "react";

import styles from "./bar.scss";

export const Bar = ({
  percent,
  color,
  labels,
  index,
  xScaleHeight,
  barContainerWidth,
  barWidth,
  topValue,
  firsTickHidden,
  tickColor,
}) => {
  const percentWithHiddentick = (percent * (100 - topValue)) / 100;

  return (
    <div
      className={styles.barContainer}
      style={{ width: barContainerWidth, marginBottom: xScaleHeight, borderColor: tickColor }}
    >
      <div
        className={styles.bar}
        style={{
          width: barWidth,
          height: `${firsTickHidden ? percentWithHiddentick : percent}%`,
          backgroundColor: color,
        }}
      />
      <div className={styles.label} style={{ height: xScaleHeight }}>
        {labels[index]}
      </div>
    </div>
  );
};
