import React from 'react';
import classnames from 'classnames';

import styles from './RaceStatus.module.css';

export default ({status, className}) => {
  console.log('STATUS', status);
  return (
    <div className={classnames(styles.container, className)}>
      <div className={classnames(styles.statusButton, styles.AWAITING, status === 'AWAITING' ? styles.active : undefined)}>
        <span className={styles.text}>AWAITING</span>
      </div>
      <div className={classnames(styles.statusButton, styles.STARTED, status === 'STARTED' ? styles.active : undefined)}>
      <span className={styles.text}>STARTED</span>
      </div>
      <div className={classnames(styles.statusButton, styles.FINISHED, status === 'FINISHED' ? styles.active : undefined)}>
        <span className={styles.text}>FINISHED</span>
      </div>
    </div>
  );
}