import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { percentages } from "../../utils/number";
import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./Legend.scss";

export const Item = ({
  backgroundColor,
  label,
  onTurnOffValue,
  index,
  isContain,
  precision,
  percentages,
}) => {
  return (
    <div
      className={cn(styles.item, { [styles.strike]: isContain })}
      onClick={() => onTurnOffValue(index)}
    >
      <span
        className={styles.colorBlock}
        style={{
          backgroundColor,
        }}
      />
      <span className={styles.value}>{parseFloat(percentages[index].toFixed(precision))}%</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export const Legend = ({ data, colors, labels, onTurnOffValue, turnOffValues, precision }) => {
  return (
    <div className={styles.legend}>
      {data.map((value, index) => (
        <Item
          precision={precision}
          percentages={percentages(data)}
          isContain={turnOffValues.some(_ => _ === index)}
          index={index}
          label={labels[index]}
          key={`${value}-${index}`}
          backgroundColor={colors[index] || DEFAULT_COLORS[index]}
          onTurnOffValue={onTurnOffValue}
          turnOffValues={turnOffValues}
        />
      ))}
    </div>
  );
};

Legend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  colors: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.arrayOf(PropTypes.string),
  onTurnOffValue: PropTypes.func,
  turnOffValues: PropTypes.arrayOf(PropTypes.number),
};
