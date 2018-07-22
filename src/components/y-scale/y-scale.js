import React from "react";
import cn from "classnames";

import styles from "./y-scale.scss";

export const YScale = ({ ticks, yScaleWidth, tickColor, topValue, height, classNamePrefix }) => {
  return (
    <div
      className={cn(styles.yScale, `${classNamePrefix}-yScale`)}
      style={{ borderColor: tickColor, height, width: yScaleWidth }}
    >
      {ticks.map((tick, index) => {
        if (index === 0) return null;
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
