import React from "react";
import cn from "classnames";

import { hexToRGBA } from "../../utils/color";

import styles from "./bar.scss";

export const InteractiveTooltip = ({
  color,
  percent,
  height,
  tooltipHeight,
  tooltipValue,
  tooltipPrefix,
}) => {
  return (
    <div className={styles.interactiveTooltip} style={{ backgroundColor: color }}>
      {`${tooltipValue}${tooltipPrefix}`}
      <div className={styles.triangle} style={{ borderTopColor: color }} />
    </div>
  );
};

export const MultiTooltip = ({ colors, values, tooltipPrefix }) => {
  return (
    <div className={styles.multiTooltip}>
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

export const StaticToolTip = ({ tooltipAboveBar, height, tooltipValue, tooltipPrefix }) => {
  return (
    <div
      className={cn(styles.tooltip, { [styles.tooltipAboveBar]: tooltipAboveBar })}
      style={{ height }}
    >
      {tooltipValue}
      <span>{tooltipPrefix}</span>
    </div>
  );
};

export const Label = ({ height, label }) => {
  return (
    <div className={styles.label} style={{ height }}>
      {label}
    </div>
  );
};

export const Bar = ({
  percent,
  color,
  label,
  height,
  marginBottom,
  barContainerWidth,
  barWidth,
  tickColor,
  tooltipValue,
  tooltipHeight,
  responsive,
  tooltip,
  tooltipPrefix,
  interactiveBars,
  stacked,
  multiStackTooltip,
  onMouseEnter,
  onMouseLeave,
  selected,
}) => {
  return (
    <div
      className={styles.barContainer}
      style={{
        width: barContainerWidth,
        marginBottom,
        borderColor: tickColor,
      }}
    >
      <div
        className={cn(styles.bar, {
          [styles.interactiveBars]: interactiveBars,
          [styles.selected]: selected,
        })}
        style={{
          width: responsive ? "80%" : barWidth,
          height: `${(height * percent) / 100}px`,
          backgroundColor: color,
          boxShadow: `0px 2px 4px 0 ${hexToRGBA(color, 0.5)}`,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {multiStackTooltip}
        {interactiveBars &&
          !stacked && (
            <InteractiveTooltip
              color={color}
              percent={percent}
              height={height}
              tooltipHeight={tooltipHeight}
              tooltipValue={tooltipValue}
              tooltipPrefix={tooltipPrefix}
            />
          )}
        {!interactiveBars &&
          tooltip && (
            <StaticToolTip
              tooltipValue={tooltipValue}
              tooltipPrefix={tooltipPrefix}
              percent={percent}
              height={tooltipHeight}
              tooltipAboveBar={(percent / 100) * height < tooltipHeight}
            />
          )}
      </div>
      {label}
    </div>
  );
};
