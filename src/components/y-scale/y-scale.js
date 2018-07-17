import React from "react";

import styles from "./y-scale.scss";

export const YScale = ({ ticks, tickColor, topValue, firsTickHidden, height }) => {
  return (
    <div className={styles.yScale} style={{ borderColor: tickColor, height }}>
      {ticks.map((tick, index) => {
        if (firsTickHidden && index === 0) return null;
        return (
          <div
            key={`${index}-${tick}`}
            className={styles.yScaleLabel}
            style={{ top: `${topValue * index}%` }}
          >
            {tick}
          </div>
        );
      })}
    </div>
  );
};
