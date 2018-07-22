import React from "react";

import styles from "./common.scss";

export const HorizontalTick = ({ top, tickColor }) => (
  <div className={styles.horizontalTick} style={{ top: `${top}%`, backgroundColor: tickColor }} />
);

export const VerticalTick = ({ left, tickColor, height }) => (
  <div className={styles.verticalTick} style={{ left, backgroundColor: tickColor, height }} />
);
