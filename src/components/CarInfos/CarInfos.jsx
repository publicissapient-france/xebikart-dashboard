import React, { useState, useEffect } from "react";
import classnames from "classnames";

import styles from "./CarInfos.module.css";
import ThrottleJauge from "../ThrottleGauge/ThrottleJauge";

export default ({ className }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setValue(Math.random() * 200 - 100),
      1000
    );
    return () => clearInterval(interval);
  });
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.carInfos}>
        <div>
          <div className={styles.carColor}></div>
          <div className={styles.carImage}>
            <img src="./car_top.png" alt="" />
          </div>
          <div className={styles.laps}>
            <span className={styles.green}></span>
            <span className={styles.orange}></span>
            <span className={styles.red}></span>
            <span className={styles.grey}></span>
          </div>
        </div>
        <div className={styles.lapsBoard}>
          <ThrottleJauge min={0} max={100} value={value} />
        </div>
      </div>
    </div>
  );
};
