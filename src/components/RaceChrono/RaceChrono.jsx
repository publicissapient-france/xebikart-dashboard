import React from 'react';
import classnames from 'classnames';

import styles from './RaceChrono.module.css';

export default ({className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      CHRONO
      <div className={styles.time}>
        00:00:00
      </div>
    </div>
  );
}