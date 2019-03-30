import React from 'react';
import classnames from 'classnames';

import styles from './RaceTurns.module.css';

export default ({className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      TOURS
      <div className={styles.counter}>
        1/3
      </div>
    </div>
  );
}