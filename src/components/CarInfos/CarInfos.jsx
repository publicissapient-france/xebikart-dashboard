import React from 'react';
import classnames from 'classnames';

import styles from './CarInfos.module.css';

export default ({className}) => {
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
          <div className={styles.title}>Chrono <span className={styles.rank}>1er</span></div>
          <div className={styles.numLap}>1. <span className={styles.timeLap}>00:00:00</span></div>
          <div className={styles.numLap}>2. <span className={styles.timeLap}>00:00:00</span></div>
          <div className={styles.numLap}>3. <span className={styles.timeLap}>00:00:00</span></div>
          <div className={styles.numLap}>4. <span className={styles.timeLap}>00:00:00</span></div>
        </div>
      </div>
    </div>
  );
}