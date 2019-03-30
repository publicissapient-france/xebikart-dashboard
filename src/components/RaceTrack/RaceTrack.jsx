import React from 'react';
import classnames from 'classnames';

import styles from './RaceTrack.module.css';

export default ({className}) => {
  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.background}>
        <div className={styles.foreground}>
        </div>
      </div>
    </div>
  );
}