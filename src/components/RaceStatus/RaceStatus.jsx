import React from 'react';
import classnames from 'classnames';

import styles from './RaceStatus.module.css';

export default ({status}) => {
  return (
    <div className={styles.container}>
      <div className={classnames(styles.statusButton, styles.STARTED, status === 'STARTED' ? styles.active : undefined)}>STARTED</div>
      <div className={classnames(styles.statusButton, styles.AWAITING, status === 'AWAITING' ? styles.active : undefined)}>AWAITING</div>
      <div className={classnames(styles.statusButton, styles.FINISHED, status === 'FINISHED' ? styles.active : undefined)}>FINISHED</div>
    </div>
  );
}