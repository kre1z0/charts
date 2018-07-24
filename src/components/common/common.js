import React from "react";
import cn from "classnames";

import styles from "./common.scss";

export const HorizontalTick = ({ top, tickColor }) => (
  <div className={styles.horizontalTick} style={{ top: `${top}%`, backgroundColor: tickColor }} />
);

export const VerticalTick = ({ left, tickColor, height }) => (
  <div className={styles.verticalTick} style={{ left, backgroundColor: tickColor, height }} />
);

export const InteractiveTooltip = ({
  color,
  tooltipValue,
  tooltipPrefix,
  selected,
  classNamePrefix,
}) => {
  return (
    <div
      className={cn(styles.interactiveTooltip, {
        [styles.selected]: selected,
        [`${classNamePrefix}-active-single`]: selected,
      })}
      style={{ backgroundColor: color }}
    >
      {`${tooltipValue}${tooltipPrefix}`}
      <div className={styles.triangle} style={{ borderTopColor: color }} />
    </div>
  );
};

export const MultiTooltip = ({ colors, values, tooltipPrefix, selected, classNamePrefix }) => {
  return (
    <div
      className={cn(styles.multiTooltip, {
        [styles.selected]: selected,
        [`${classNamePrefix}-multi-active`]: selected,
      })}
    >
      <div>
        {values.map((value, index) => (
          <div
            className={styles.multiTooltipItem}
            key={`${value}-${index}`}
            style={{ backgroundColor: colors[index] }}
          >
            {`${value}${tooltipPrefix}`}
          </div>
        ))}
      </div>
      <div className={styles.triangle} style={{ borderTopColor: colors[colors.length - 1] }} />
    </div>
  );
};
