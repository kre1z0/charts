import React from "react";
import cn from "classnames";

import { types } from "../../default/types";
import { calcRercentages } from "../../utils/number";
import { getRandomColor } from "../../utils/color";
import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./Legend.scss";

const Prefix = ({ prefix }) => <span>{prefix}</span>;

export const Item = ({
  backgroundColor,
  label,
  onTurnOffValue,
  index,
  isContain,
  precision,
  data,
  percentages,
  prefix,
  interactiveLegend,
  classNamePrefix,
}) => {
  return (
    <li
      className={cn(styles.item, `${classNamePrefix}-legend-item`, {
        [styles.strike]: isContain,
        [styles.interactiveLegend]: interactiveLegend,
      })}
      onClick={interactiveLegend ? () => onTurnOffValue(index) : null}
    >
      <span
        className={cn(styles.colorBlock, `${classNamePrefix}-legend-color-block`)}
        style={{
          backgroundColor,
        }}
      />
      <span className={cn(styles.value, `${classNamePrefix}-legend-value`)}>
        {parseFloat(data[index].toFixed(precision))}
        <Prefix prefix={prefix} />
      </span>
      <span className={cn(styles.label, `${classNamePrefix}-legend-label`)}>{label}</span>
    </li>
  );
};

export const Legend = props => {
  const { data, percentages, turnOffValues, labels, colors, prefix, classNamePrefix } = props;
  return (
    <ul className={cn(styles.legend, `${classNamePrefix}-legend`)}>
      {data.map((value, index) => (
        <Item
          {...props}
          data={percentages ? calcRercentages(data) : data}
          prefix={percentages && prefix}
          isContain={turnOffValues.some(_ => _ === index)}
          index={index}
          label={labels[index]}
          key={`${value}-${index}`}
          backgroundColor={colors[index] || DEFAULT_COLORS[index] || getRandomColor()}
        />
      ))}
    </ul>
  );
};

Legend.propTypes = types;
