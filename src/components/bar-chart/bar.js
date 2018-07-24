import React from "react";
import cn from "classnames";

import { InteractiveTooltip } from "../common/common";
import { hexToRGBA } from "../../utils/color";

import styles from "./bar.scss";

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
  classNamePrefix,
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
              classNamePrefix={classNamePrefix}
              selected={selected}
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
