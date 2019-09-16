import React from "react";
import classnames from "classnames";

import styles from "./StirJauge.module.css";

export default ({ value, className }) => {
  return (
    <div className={styles.stirJauge}>
      <div className={styles.middleBar} />
      <div
        className={styles.leftWheel}
        style={{ transform: `rotate(${value}deg)` }}
      />
      <div
        className={styles.rightWheel}
        style={{ transform: `rotate(${value}deg)` }}
      />
    </div>
  );
};
