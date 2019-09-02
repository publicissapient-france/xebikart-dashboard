import React from "react";
import classnames from "classnames";

import styles from "./ThrottleJauge.module.css";

export default ({ min, max, value, className }) => {
  return (
    <div className={styles.throttleJauge}>
      <span className={styles.speedometer}></span>
      <span
        className={styles.needle}
        style={{ transform: `rotate(${value}deg)` }}
      ></span>
    </div>
  );
};
