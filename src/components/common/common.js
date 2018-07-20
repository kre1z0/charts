import React from 'react';

import styles from './common.scss';

export const Tick = ({ topValue, index, tickColor }) => {
  if (index === 0) return null;
  return (
    <div
      className={styles.tick}
      style={{ top: `${topValue * index}%`, backgroundColor: tickColor }}
    />
  );
};
