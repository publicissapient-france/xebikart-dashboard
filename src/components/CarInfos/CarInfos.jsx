import React from 'react';
import classnames from 'classnames';

import styles from './CarInfos.module.css';

export default ({className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.carinfos}>
        <div>
          <div className={styles.carcolor}></div>
          <div className={styles.carimage}>
            <img src="car_top.png" />
          </div>
          <div className={styles.laps}>
            <span className={styles.green}></span>
            <span className={styles.orange}></span>
            <span className={styles.red}></span>
            <span className={styles.grey}></span>
          </div>
        </div>
        <div className={styles.lapsboard}>
          <div className={styles.title}>Chrono <span className={styles.rank}>1er</span></div>
          <div className={styles.numlap}>1. <span className={styles.timelap}>00:00:00</span></div>
          <div className={styles.numlap}>2. <span className={styles.timelap}>00:00:00</span></div>
          <div className={styles.numlap}>3. <span className={styles.timelap}>00:00:00</span></div>
          <div className={styles.numlap}>4. <span className={styles.timelap}>00:00:00</span></div>
        </div>
      </div>
    </div>
  );
}