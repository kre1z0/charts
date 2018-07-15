import React from "react";
import cn from "classnames";

import { types } from "../../default/types";
import { calcRercentages } from "../../utils/number";
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
}) => {
  return (
    <li
      className={cn(styles.item, {
        [styles.strike]: isContain,
        [styles.interactiveLegend]: interactiveLegend,
      })}
      onClick={interactiveLegend ? () => onTurnOffValue(index) : null}
    >
      <span
        className={styles.colorBlock}
        style={{
          backgroundColor,
        }}
      />
      <span className={styles.value}>
        {parseFloat(data[index].toFixed(precision))}
        <Prefix prefix={prefix} />
      </span>
      <span className={styles.label}>{label}</span>
    </li>
  );
};

export const Legend = props => {
  const { data, percentages, turnOffValues, labels, colors, legendClassName } = props;
  return (
    <ul className={cn(styles.legend, legendClassName)}>
      {data.map((value, index) => (
        <Item
          {...props}
          data={percentages ? calcRercentages(data) : data}
          isContain={turnOffValues.some(_ => _ === index)}
          index={index}
          label={labels[index]}
          key={`${value}-${index}`}
          backgroundColor={colors[index] || DEFAULT_COLORS[index]}
        />
      ))}
    </ul>
  );
};

Legend.propTypes = types;
