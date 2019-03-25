import React from 'react';

import RaceStatus from '../RaceStatus/RaceStatus';
import styles from './RaceInfos.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <RaceStatus status="AWAITING" />
    </div>
  );
}