import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { DEFAULT_COLORS } from "../../assets/theme/colors";

import styles from "./Legend.scss";

export const Item = ({ backgroundColor, label, onTurnOffValue, index, turnOffValues }) => {
  const isContain = turnOffValues.some(_ => _ === index);

  return (
    <div
      className={cn(styles.item, { [styles.strike]: isContain })}
      onClick={() => onTurnOffValue(index)}
    >
      <div
        className={styles.colorBlock}
        style={{
          backgroundColor,
        }}
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export const Legend = ({ data, colors, labels, onTurnOffValue, turnOffValues }) => {
  return (
    <div className={styles.legend}>
      {data.map((value, index) => (
        <Item
          index={index}
          label={labels[index]}
          key={`${value}-${index}`}
          backgroundColor={colors[index] ? colors[index] : DEFAULT_COLORS[index]}
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
